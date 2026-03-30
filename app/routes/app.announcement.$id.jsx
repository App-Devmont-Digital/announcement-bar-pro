import { useEffect, useState } from "react";
import {
  redirect,
  useFetcher,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";

import { authenticate } from "../shopify.server";
import prisma from "../db.server";

import useStore from "../zustand/store";

import Content from "../components/Content";
import Design from "../components/Design";
import Placement from "../components/Placement";
import LineAnnouncement from "../components/LineAnnouncement";
import SimpleAnnoucement from "../components/SimpleAnnouncement";
import MultipleAnnouncement from "../components/MultipleAnnouncement";
import { handleUploadImage } from "../helper";

import { styles } from "../styles/appStyles1";

export const loader = async ({ request, params }) => {
  const { session } = await authenticate.admin(request);

  const { id } = params; // This gets the ID from the URL

  if (id == "new") {
    return {
      announcement: null,
    };
  }

  const announcement = await prisma.annSettings.findUnique({
    where: {
      id: id,
      shop: session.shop, // Safety check: ensure it belongs to this shop
    },
  });

  if (!announcement) {
    throw new Response("Announcement not found.", { status: 404 });
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

    // 1. Get the intent
    const intent = formData.get("intent");

    // --- DELETE LOGIC ---
    if (intent === "delete") {
      if (!id) return { error: "ID required for deletion" };
      await prisma.annSettings.delete({
        where: { id: id },
      });

      return redirect("/app");
    }

    if (!rawData) return { error: "No data provided" };

    const {
      designSettings,
      content,
      placement,
      placementRules,
      multiContent,
      status,
    } = JSON.parse(rawData);

    const dataPayload = {
      designSettings: JSON.stringify(designSettings),
      content: JSON.stringify({ ...content, placement, placementRules }),
      startDate: new Date().toISOString(),
      endDate: new Date("2099-12-31").toISOString(),
      multiContent: JSON.stringify(multiContent),
      status: status,
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

    return {
      success: true,
      data: savedSettings,
      action: id == "undefined" ? "new" : "updated",
    };
  } catch (error) {
    return {
      error: error,
    };
  }
};

export default function Index() {
  const [selectedTab, setSelectedTab] = useState("content");
  const [loader, setLoader] = useState(false);
  const [publishLoader, setPublishLoader] = useState(false);

  const fetcher = useFetcher();
  const shopify = useAppBridge();

  const navigation = useNavigate();

  const { id } = useParams();

  const { announcement } = useLoaderData();
  const setAll = useStore((state) => state?.setAll);
  const {
    designSettings,
    content,
    placementRules,
    placement,
    setPlacementRules,
    setPlacement,
    multiContent,
    updateContentAt,
  } = useStore();

  const isFetching = fetcher.state !== "idle";

  // Check specifically WHICH button is loading
  const isSavingLive =
    isFetching && fetcher.formData?.get("action") === "publish";
  const isSavingDraft =
    isFetching && fetcher.formData?.get("action") === "save";
  const deleteLoader =
    isFetching && fetcher.formData?.get("intent") === "delete";

  useEffect(() => {
    if (fetcher.data?.success && fetcher.data?.action === "new") {
      shopify.toast.show("Announcement created.");
    }
    if (fetcher.data?.success && fetcher.data?.action === "updated") {
      shopify.toast.show("Settings saved.");
    }
    if (fetcher.data?.action === "delete") {
      navigation(`/app`);
    }
    if (fetcher.data?.action === "new") {
      navigation(`/app`);
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
      let multiContent = JSON.parse(announcement?.multiContent);

      setAll(announcement);
      setPlacementRules(parseData?.placementRules);
      setPlacement(parseData?.placement);

      if (multiContent) {
        multiContent?.forEach((obj, index) => {
          Object.keys(obj).forEach((key) => {
            updateContentAt(index, key, obj[key]);
          });
        });
      }
    }
  }, [announcement]);

  const handleSave = async (status = "draft", action) => {
    try {
      if (status == "draft") {
        setLoader(true);
      } else {
        setPublishLoader(true);
      }

      // 1️⃣ Handle bgImageUrl if it's a File
      let bgImageUrl = designSettings?.bgImageUrl;
      if (typeof bgImageUrl === "object") {
        bgImageUrl = await handleUploadImage(bgImageUrl);
      }

      const payloadDesignSettings = {
        ...designSettings,
        bgImageUrl,
      };

      // 2️⃣ Handle content.icon if it's a File
      let contentIcon = content?.icon;
      if (typeof contentIcon === "object") {
        contentIcon = await handleUploadImage(contentIcon);
      }

      const payloadContent = {
        ...content,
        icon: contentIcon,
      };

      // 3️⃣ Handle multiContent icons
      const updatedMultiContent = await Promise.all(
        multiContent.map(async (item) => {
          let newIcon = item.icon;

          if (newIcon && typeof newIcon === "object") {
            // Upload File object
            newIcon = await handleUploadImage(newIcon);
          }

          return {
            ...item,
            icon: newIcon, // updated URL if uploaded, else keep original
          };
        }),
      );

      // 4️⃣ Submit payload with updated multiContent
      fetcher.submit(
        {
          id: id == "new" ? undefined : id,
          action,
          data: JSON.stringify({
            designSettings: payloadDesignSettings,
            content: payloadContent,
            placement,
            placementRules,
            multiContent: updatedMultiContent,
            status: status,
          }),
        },
        { method: "POST" },
      );

      setLoader(false);
      setPublishLoader(false);
    } catch (error) {
      setLoader(false);
      setPublishLoader(false);
      console.log(error);
    }
  };

  const handleDelete = async () => {
    // 4️⃣ Submit payload with updated multiContent
    fetcher.submit(
      {
        id: id,
        intent: "delete",
      },
      { method: "POST" },
    );
  };

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
  } = designSettings;

  const renderAnnoucementPreview = () => {
    switch (content?.announcementType) {
      case "simple-announce":
        return <SimpleAnnoucement />;
      case "line-announce":
        return <LineAnnouncement />;
      case "multiple-announce":
        return <MultipleAnnouncement />;
      default:
        return <SimpleAnnoucement />;
    }
  };

  const getBackgroundStyle = () => {
    if (cardBg === "single-bg") {
      return singleBgColor;
    }

    if (cardBg === "gradient-bg") {
      return `linear-gradient(${gradientRange[1]}deg, ${gradeintColor1}, ${gradeintColor2})`;
    }

    const image = designSettings?.bgImageUrl;
    // Default: image background
    if (image && typeof image === "object") {
      // image is a File object → create temporary URL
      return `url(${URL.createObjectURL(image)}) center center / cover`;
    }

    // bgFile is a string URL
    return `url(${image || "https://vamxifegjdrgriapwsjg.supabase.co/storage/v1/object/public/main/bg-images/bg-3.jpg"}) center center / cover`;
  };

  return (
    <s-page>
      <div style={styles.pageWrapper}>
        {/* ── Top Bar ── */}
        <div style={styles.topBar}>
          <div style={styles.topBarLeft}>
            <s-button
              variant="primary"
              icon="arrow-left"
              onClick={() => {
                navigation("/app");
              }}
            />
            <s-heading variant="headingLg">{content?.name}</s-heading>
            {announcement?.status && (
              <s-badge
                tone={announcement?.status == "draft" ? "critical" : "success"}
              >
                {announcement?.status?.charAt(0).toUpperCase() +
                  announcement?.status?.slice(1)}
              </s-badge>
            )}
          </div>

          <s-stack direction="inline" gap="small">
            {id !== "new" && (
              <s-button
                variant="primary"
                tone="critical"
                onClick={handleDelete}
                loading={deleteLoader}
              >
                Delete
              </s-button>
            )}

            <s-button
              variant="secondary"
              onClick={() =>
                handleSave(
                  announcement?.status == "active" ? "draft" : "active",
                  "publish",
                )
              }
              loading={isSavingLive || publishLoader}
            >
              {announcement?.status === "active" ? "Unpublish" : "Publish"}
            </s-button>
            <s-button
              variant="primary"
              onClick={() =>
                handleSave(
                  announcement?.status == "active" ? "active" : "draft",
                  "save",
                )
              }
              loading={isSavingDraft || loader}
            >
              Save
            </s-button>
          </s-stack>
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
                <Content setSelectedTab={setSelectedTab} />
              ) : selectedTab === "design" ? (
                <Design setSelectedTab={setSelectedTab} />
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
                background: getBackgroundStyle(),
                border: `${borderSize}px solid ${borderColor}`,
                borderRadius: `${cornerRadius}px`,
                padding:
                  content?.announcementType === "multiple-announce"
                    ? "10px 0px"
                    : "10px 16px",
              }}
            >
              {/* ===== Blur Backround Feature ===== */}
              {blurBackground ? (
                <div style={styles.blurBackground}></div>
              ) : null}

              {renderAnnoucementPreview()}
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
