import { useEffect, useState } from "react";
import { useFetcher, useLoaderData, useNavigate } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";
import DiscoveryUI from "../components/DiscoveryUI";
import DeleteConfirmation from "../components/DeleteConfirmation";

import { styles } from "../styles/appStyles1";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  const announcement = await prisma.annSettings.findMany({
    where: {
      shop: session.shop,
    },
  });

  if (!announcement) {
    throw new Response("Not Found", { status: 404 });
  }

  return {
    announcement,
    shop: session.shop,
  };
};

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();

    const id = formData.get("id");
    const intent = formData.get("intent");

    // --- DELETE Announcement ---
    if (intent === "delete") {
      if (!id) return { error: "ID required for deletion" };
      await prisma.annSettings.delete({
        where: { id: id },
      });
    }

    return { success: true };
  } catch (error) {
    return {
      error: error,
    };
  }
};

export default function Index() {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [appEmbedStatus, setAppEmbedStatus] = useState(false);

  const fetcher = useFetcher();
  const shopify = useAppBridge();

  const { announcement, shop } = useLoaderData();

  const navigate = useNavigate();

  const checkAppEmbededStatus = async () => {
    const data = await shopify.app.extensions();

    const result = data
      ?.flatMap((item) => item?.activations || [])
      ?.find((act) => act?.name === "Announcementbar Pro");

    setAppEmbedStatus(result);
  };

  const isLoading =
    fetcher.state === "submitting" || fetcher.state === "loading";

  useEffect(() => {
    checkAppEmbededStatus();
    if (fetcher.data?.success) {
      shopify.toast.show("Announcement deleted successfully.");
    }
    if (fetcher.data?.error) {
      shopify.toast.show(
        fetcher.data?.error?.message ||
          fetcher.data?.error ||
          "Something went wrong",
      );
    }
  }, [fetcher.data, shopify]);

  const handleDelete = async () => {
    if (!selectedAnnouncement) return;
    fetcher.submit(
      {
        id: selectedAnnouncement?.id,
        intent: "delete",
      },
      { method: "POST" },
    );
  };

  return (
    <s-page title="Announcements">
      {/* Dashboard Stats Overview */}

      <s-grid
        gridTemplateColumns="repeat(3, 1fr)"
        gap="base"
        paddingBlockEnd="base"
      >
        <s-grid-item gridColumn="span 1">
          <s-box background="subdued" border="base" borderRadius="base">
            <s-stack
              direction="block"
              gap="tight"
              paddingBlock="base"
              paddingInline="base"
            >
              <s-stack direction="inline" gap="tight" alignItems="center">
                <s-icon type="megaphone" tone="base" />
                <s-text tone="subdued">Total Announcements</s-text>
              </s-stack>
              <s-text>
                <h2 style={styles.statNumberStyle}>
                  {announcement?.length ?? 0}
                </h2>
              </s-text>
            </s-stack>
          </s-box>
        </s-grid-item>

        <s-grid-item gridColumn="span 1">
          <s-box background="subdued" border="base" borderRadius="base">
            <s-stack
              direction="block"
              gap="tight"
              paddingBlock="base"
              paddingInline="base"
            >
              <s-stack direction="inline" gap="tight" alignItems="center">
                <s-icon type="check-circle" tone="base" />
                <s-text tone="subdued">Active Announcements</s-text>
              </s-stack>
              <s-text>
                <h2 style={styles.statNumberStyle}>
                  {announcement?.filter((a) => a?.status === "active").length ??
                    0}
                </h2>
              </s-text>
            </s-stack>
          </s-box>
        </s-grid-item>

        <s-grid-item gridColumn="span 1">
          <s-box background="subdued" border="base" borderRadius="base">
            <s-stack
              direction="block"
              gap="tight"
              paddingBlock="base"
              paddingInline="base"
            >
              <s-stack direction="inline" gap="tight" alignItems="center">
                <s-icon type="order-draft" tone="base" />
                <s-text tone="subdued">Drafts Announcement</s-text>
              </s-stack>
              <s-text>
                <h2 style={styles.statNumberStyle}>
                  {announcement?.filter((a) => a?.status !== "active").length ??
                    0}
                </h2>
              </s-text>
            </s-stack>
          </s-box>
        </s-grid-item>
      </s-grid>

      {announcement?.length ? (
        <>
          {/* Announcements Table */}
          <s-card>
            <s-stack
              direction="inline"
              justifyContent="space-between"
              paddingBlock="base"
            >
              {/* <s-heading>Announcements</s-heading> */}
              <h3 className="main_heading">Announcements</h3>
              <s-button
                variant="primary"
                onClick={() => navigate(`/app/announcement/new`)}
              >
                New Announcement
              </s-button>
            </s-stack>
            <s-table>
              <s-table-header-row>
                <s-table-header>Announcement name</s-table-header>
                <s-table-header>Type</s-table-header>
                <s-table-header>Placement</s-table-header>
                <s-table-header>Status</s-table-header>
                <s-table-header>Actions</s-table-header>
              </s-table-header-row>

              <s-table-body>
                {announcement?.map((ann) => {
                  const content = JSON.parse(ann?.content);

                  const menuId = `menu-${ann.id}`;

                  return (
                    <s-table-row key={ann?.id}>
                      <s-table-cell>{content?.name}</s-table-cell>
                      <s-table-cell>
                        {content?.announcementType === "simple-announce"
                          ? "Simple"
                          : "Multiple"}
                      </s-table-cell>
                      <s-table-cell>
                        {content?.placement?.charAt(0).toUpperCase() +
                          content?.placement?.slice(1)}{" "}
                        page
                      </s-table-cell>
                      <s-table-cell>
                        <s-badge
                          tone={ann?.status == "active" ? "success" : "warning"}
                        >
                          {ann?.status === "active" ? "Published" : "Draft"}
                        </s-badge>
                      </s-table-cell>
                      <s-table-cell>
                        <s-button
                          commandFor={menuId}
                          variant="tertiary"
                          icon="menu-horizontal"
                        ></s-button>
                        <s-menu
                          id={menuId}
                          accessibilityLabel="Customer actions"
                        >
                          <s-button icon="clipboard">Copy ID</s-button>

                          <s-button
                            icon="edit"
                            onClick={() => {
                              navigate(`/app/announcement/${ann?.id}`);
                            }}
                          >
                            Edit
                          </s-button>
                          <s-button
                            icon="delete"
                            tone="critical"
                            commandFor="delete-modal"
                            onClick={() => setSelectedAnnouncement(ann)}
                          >
                            Delete
                          </s-button>
                        </s-menu>
                      </s-table-cell>
                    </s-table-row>
                  );
                })}
              </s-table-body>
            </s-table>

            <DeleteConfirmation
              ann={selectedAnnouncement}
              handleDelete={handleDelete}
              isLoading={isLoading}
            />
          </s-card>
        </>
      ) : (
        <s-box background="subdued" border="base" borderRadius="base">
          <div style={styles.emptyStateStyle}>
            {/* Megaphone SVG */}
            <svg
              style={styles.emptyIconStyle}
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M48 10C48 10 36 18 20 20H12C9.79086 20 8 21.7909 8 24V36C8 38.2091 9.79086 40 12 40H16L20 54H28L24 40C38 42 48 50 48 50V10Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M52 18C54.2091 20.2091 55.5 23 55.5 30C55.5 37 54.2091 39.7909 52 42"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M20 20V40"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>

            <div>
              <p style={styles.emptyTitleStyle}>No Announcements Yet</p>
              <p style={styles.emptySubtitleStyle}>
                Create your first announcement to get started
              </p>
            </div>

            <s-button
              variant="primary"
              onClick={() => navigate(`/app/announcement/new`)}
            >
              New Announcement
            </s-button>
          </div>
        </s-box>
      )}

      <DiscoveryUI shop={shop} appEmbedStatus={appEmbedStatus} />
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
