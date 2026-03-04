import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";

import Content from "../components/Content";
import Design from "../components/Design";
import Placement from "../components/Placement";
import { styles } from "../styles/appStyles1";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const color = ["Red", "Orange", "Yellow", "Green"][
    Math.floor(Math.random() * 4)
  ];
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($product: ProductCreateInput!) {
        productCreate(product: $product) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        product: {
          title: `${color} Snowboard`,
        },
      },
    },
  );
  const responseJson = await response.json();
  const product = responseJson.data.productCreate.product;
  const variantId = product.variants.edges[0].node.id;
  const variantResponse = await admin.graphql(
    `#graphql
    mutation shopifyReactRouterTemplateUpdateVariant($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkUpdate(productId: $productId, variants: $variants) {
        productVariants {
          id
          price
          barcode
          createdAt
        }
      }
    }`,
    {
      variables: {
        productId: product.id,
        variants: [{ id: variantId, price: "100.00" }],
      },
    },
  );
  const variantResponseJson = await variantResponse.json();

  return {
    product: responseJson.data.productCreate.product,
    variant: variantResponseJson.data.productVariantsBulkUpdate.productVariants,
  };
};

export default function Index() {
  const fetcher = useFetcher();
  const shopify = useAppBridge();
  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";

  useEffect(() => {
    if (fetcher.data?.product?.id) {
      shopify.toast.show("Product created");
    }
  }, [fetcher.data?.product?.id, shopify]);
  const generateProduct = () => fetcher.submit({}, { method: "POST" });

  const [selectedTab, setSelectedTab] = useState("content");
  const [announcementName, setAnnouncementName] = useState("Announcement name");
  const [title, setTitle] = useState(
    "Enjoy a 20% discount on all our products!",
  );

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
            <s-heading variant="headingLg">{announcementName}</s-heading>
            <s-badge tone="attention">Not published</s-badge>
          </div>
          <s-button variant="primary" onClick={() => {}}>
            Publish
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
                <Content
                  announcementName={announcementName}
                  title={title}
                  setAnnouncementName={setAnnouncementName}
                  setTitle={setTitle}
                />
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
            <div style={styles.previewBar}>
              <s-text variant="headingMd" as="p">
                {title || "Enjoy a 20% discount on all our products!"}
              </s-text>
            </div>

            {/* Skeleton content placeholder */}
            <div style={styles.skeletonCard}>
              <div style={styles.skeletonThumb} />
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
