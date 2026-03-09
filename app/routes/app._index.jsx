import { useEffect, useState } from "react";
import { useFetcher, useLoaderData } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

import useStore from "../zustand/store";

import Content from "../components/Content";
import Design from "../components/Design";
import Placement from "../components/Placement";

import { styles } from "../styles/appStyles1";

export const loader = async ({ request, params }) => {
  const { session } = await authenticate.admin(request);

  const { id } = params; // This gets the ID from the URL

  const announcement = await prisma.annSettings.findUnique({
    where: {
      id: "69a96b321a3abc4665297d59",
      shop: session.shop, // Safety check: ensure it belongs to this shop
    },
  });

  if (!announcement) {
    throw new Response("Not Found", { status: 404 });
  }

  return {
    announcement,
  };
};

export const action = async ({ request }) => {
  try {
    const { session } = await authenticate.admin(request);
    const formData = await request.formData();
    const rawData = formData.get("data");
    const id = formData.get("id");

    if (!rawData) return { error: "No data provided" };

    const { designSettings, content, placement, placementRules } =
      JSON.parse(rawData);

    const dataPayload = {
      designSettings: JSON.stringify(designSettings),
      content: JSON.stringify({ ...content, placement, placementRules }),
      startDate: new Date().toISOString(),
      endDate: new Date("2099-12-31").toISOString(),
    };

    // Upsert: Updates the record if it exists for this shop, otherwise creates it

    let savedSettings;

    if (id && id !== "undefined") {
      // UPDATE: If ID exists, update that specific announcement
      savedSettings = await prisma.annSettings.update({
        where: { id: id },
        data: dataPayload,
      });
    } else {
      // CREATE: If no ID, create a new announcement for this shop
      savedSettings = await prisma.annSettings.create({
        data: { ...dataPayload, shop: session.shop },
      });
    }

    return { success: true, data: savedSettings };
  } catch (error) {
    return {
      error: error,
    };
  }
};

export default function Index() {
  const [selectedTab, setSelectedTab] = useState("content");

  const fetcher = useFetcher();
  const shopify = useAppBridge();

  const { announcement } = useLoaderData();
  const setAll = useStore((state) => state?.setAll);
  const {
    designSettings,
    content,
    placementRules,
    placement,
    setPlacementRules,
    setPlacement,
  } = useStore();

  const isLoading = ["loading", "submitting"].includes(fetcher.state);

  useEffect(() => {
    if (fetcher.data?.success) {
      shopify.toast.show("Product created");
    }
    if (fetcher.data?.error) {
      shopify.toast.show(
        fetcher.data?.error?.message ||
          fetcher.data?.error ||
          "Something went wrong",
      );
    }
  }, [fetcher.data, shopify]);

  useEffect(() => {
    if (announcement) {
      let parseData = JSON.parse(announcement?.content);

      console.log({parseData});
      
      setAll(announcement);
      setPlacementRules(parseData?.placementRules);
      setPlacement(parseData?.placement);
    }
  }, [announcement]);

  console.log({ isLoading }, fetcher, "===============");

  const handleSave = () => {
    // We send the data as a JSON string under a 'data' key
    fetcher.submit(
      {
        id: "69a96b321a3abc4665297d59",
        data: JSON.stringify({
          designSettings,
          content,
          placement,
          placementRules,
        }),
      },
      { method: "POST" },
    );
  };

  console.log({content});
  

  const {
    cardBg,
    singleBgColor,
    gradeintColor1,
    gradeintColor2,
    gradientRange,
    blurBackground,
    cornerRadius,
    borderColor,
    borderSize,
    textSize,
    textColor,
    btnTextColor,
    btnTextSize,
    btnColor,
    btnRadius,
    subheadingSize,
    subheadingColor,
  } = designSettings;

  console.log({ announcement });

  return (
    <s-page>
      <div style={styles.pageWrapper}>
        {/* ── Top Bar ── */}
        <div style={styles.topBar}>
          <div style={styles.topBarLeft}>
            <s-button
              variant="tertiary"
              icon="ArrowLeftMinor"
              onClick={() => {}}
            />
            <s-heading variant="headingLg">{content?.name}</s-heading>
            <s-badge tone="attention">Not published</s-badge>
          </div>
          <s-button variant="primary" onClick={handleSave} loading={isLoading}>
            Save
          </s-button>
        </div>

        {/* ── Two-column layout ── */}
        <div style={styles.twoCol}>
          {/* ══════════════════════════════
              LEFT PANEL
          ══════════════════════════════ */}
          <div style={styles.leftPanel}>
            {/* Tabs — no Polaris tab web component, custom tabs are fine here */}
            <div style={styles.tabsBar}>
              {["content", "design", "placement"].map((tab) => (
                <button
                  key={tab}
                  style={{
                    ...styles.tabBtn,
                    ...(selectedTab === tab ? styles.tabBtnActive : {}),
                  }}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Scrollable body */}
            <div style={styles.leftBody}>
              {selectedTab === "content" ? (
                <Content />
              ) : selectedTab === "design" ? (
                <Design />
              ) : (
                <Placement />
              )}
            </div>
          </div>
          {/* /leftPanel */}

          {/* ══════════════════════════════
              RIGHT PANEL
          ══════════════════════════════ */}
          <div style={styles.rightPanel}>
            {/* Live preview bar */}
            <div
              style={{
                ...styles.previewBar,
                background:
                  cardBg === "single-bg"
                    ? singleBgColor
                    : cardBg === "gradient-bg"
                      ? `linear-gradient(${gradientRange[1]}deg, ${gradeintColor1}, ${gradeintColor2}`
                      : `url("https://vamxifegjdrgriapwsjg.supabase.co/storage/v1/object/public/main/bg-images/bg-3.jpg") center center / cover`,
                border: `${borderSize}px solid ${borderColor}`,
                borderRadius: `${cornerRadius}px`,
              }}
            >
              {/* ===== Blur Backround Feature ===== */}
              {blurBackground ? (
                <div style={styles.blurBackground}></div>
              ) : null}

              <div style={styles.previewInnerWrapper}>
                <div style={styles.previewBarContent}>
                  <div style={styles.previewTextContent}>
                    {/* ======== Heading of Preview Text =========== */}
                    <h2
                      style={{
                        ...styles.previewText,
                        color: textColor,
                        fontSize: textSize + "px",
                      }}
                    >
                      {content?.title ||
                        "Enjoy a 20% discount on all our products!"}
                    </h2>
                    {/* Subheading content  */}
                    <p
                      style={{
                        ...styles.subHeading,
                        fontSize: subheadingSize + "px",
                        color: subheadingColor,
                      }}
                    >
                      {content?.subheading}
                    </p>
                  </div>

                  {/* ========= Button Preview ========== */}
                  <a
                    href={content?.buttonLink}
                    style={{
                      ...styles.previewButton,
                      color: btnTextColor,
                      backgroundColor: btnColor,
                      padding: "8px 16px",
                      borderRadius: btnRadius + "px",
                      border: "0",
                      fontSize: btnTextSize + "px",
                    }}
                  >
                    {content?.buttonText}
                  </a>
                </div>

                {/* Close icon button  */}
                {content?.showCloseIcon ? (
                  <button type="button" style={styles.closeIcon}>
                    <svg
                      width="12"
                      height="12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m7.414 6 4.293-4.293A.999.999 0 1 0 10.293.293L6 4.586 1.707.293A.999.999 0 1 0 .293 1.707L4.586 6 .293 10.293a.999.999 0 1 0 1.414 1.414L6 7.414l4.293 4.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L7.414 6Z"
                        fill="#6d7175"
                      ></path>
                    </svg>
                  </button>
                ) : null}
              </div>
            </div>

            {/* Skeleton content placeholder */}

            <div style={styles.skeletonCard}>
              <div style={styles.boxGrid}>
                <div style={styles.skeletonThumb} />
                <div style={styles.skeletonThumb} />
              </div>
              <div style={styles.skeletonLines}>
                <div style={{ ...styles.skeletonLine, width: "100%" }} />
                <div style={{ ...styles.skeletonLine, width: "85%" }} />
                <div style={{ ...styles.skeletonLine, width: "55%" }} />
              </div>
            </div>
          </div>
          {/* /rightPanel */}
        </div>
        {/* /twoCol */}

        {/* /container */}
      </div>
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
