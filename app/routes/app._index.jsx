import { useEffect, useState } from "react";
import { useFetcher, useLoaderData, useNavigate } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";
import DiscoveryUI from "../components/DiscoveryUI";
import DeleteConfirmation from "../components/DeleteConfirmation";
// import { AnnoucementChart } from "../constant/index";

import { styles } from "../styles/appStyles1";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  const url = new URL(request.url);

  const page = parseInt(url.searchParams.get("page")) || 1;
  const limit = 7;

  const skip = (page - 1) * limit;

  // 1️⃣ Get paginated data (same as before)
  const announcement = await prisma.annSettings.findMany({
    where: {
      shop: session.shop,
    },
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  // 2️⃣ Single aggregation query for all counts
  const result = await prisma.annSettings.aggregateRaw({
    pipeline: [
      {
        $match: {
          shop: session.shop,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          active: {
            $sum: {
              $cond: [{ $eq: ["$status", "active"] }, 1, 0],
            },
          },
          draft: {
            $sum: {
              $cond: [{ $eq: ["$status", "draft"] }, 1, 0],
            },
          },
        },
      },
    ],
  });

  const counts = result[0] || { total: 0, active: 0, draft: 0 };

  const pagination = {
    currentPage: page,
    perPage: limit,
    totalItems: counts.total,
    totalPages: Math.ceil(counts.total / limit),
    hasNextPage: page < Math.ceil(counts.total / limit),
    hasPreviousPage: page > 1,
  };

  return {
    announcement,
    shop: session.shop,
    pagination,
    counts,
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

  const { announcement, shop, pagination, counts } = useLoaderData();
  const hasNext = pagination?.hasNextPage;
  const hasPrevious = pagination?.hasPreviousPage;

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

  const AnnoucementChart = [
    {
      label: "Total Announcements",
      icon: (
        <svg
          width={27}
          height={27}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
        >
          <path d="M525.2 82.9C536.7 88 544 99.4 544 112L544 528C544 540.6 536.7 552 525.2 557.1C513.7 562.2 500.4 560.3 490.9 552L444.3 511.3C400.7 473.2 345.6 451 287.9 448.3L287.9 544C287.9 561.7 273.6 576 255.9 576L223.9 576C206.2 576 191.9 561.7 191.9 544L191.9 448C121.3 448 64 390.7 64 320C64 249.3 121.3 192 192 192L276.5 192C338.3 191.8 397.9 169.3 444.4 128.7L491 88C500.4 79.7 513.9 77.8 525.3 82.9zM288 384L288 384.2C358.3 386.9 425.8 412.7 480 457.6L480 182.3C425.8 227.2 358.3 253 288 255.7L288 384z" />
        </svg>
      ),
    },
    {
      label: "Active Announcements",
      icon: (
        <svg
          width={26}
          height={26}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
        >
          <path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320C528 205.1 434.9 112 320 112zM390.7 233.9C398.5 223.2 413.5 220.8 424.2 228.6C434.9 236.4 437.3 251.4 429.5 262.1L307.4 430.1C303.3 435.8 296.9 439.4 289.9 439.9C282.9 440.4 276 437.9 271.1 433L215.2 377.1C205.8 367.7 205.8 352.5 215.2 343.2C224.6 333.9 239.8 333.8 249.1 343.2L285.1 379.2L390.7 234z" />
        </svg>
      ),
    },
    {
      label: "Draft Announcements",
      icon: (
        <svg
          width={25}
          height={25}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
        >
          <path d="M505 122.9L517.1 135C526.5 144.4 526.5 159.6 517.1 168.9L488 198.1L441.9 152L471 122.9C480.4 113.5 495.6 113.5 504.9 122.9zM273.8 320.2L408 185.9L454.1 232L319.8 366.2C316.9 369.1 313.3 371.2 309.4 372.3L250.9 389L267.6 330.5C268.7 326.6 270.8 323 273.7 320.1zM437.1 89L239.8 286.2C231.1 294.9 224.8 305.6 221.5 317.3L192.9 417.3C190.5 425.7 192.8 434.7 199 440.9C205.2 447.1 214.2 449.4 222.6 447L322.6 418.4C334.4 415 345.1 408.7 353.7 400.1L551 202.9C579.1 174.8 579.1 129.2 551 101.1L538.9 89C510.8 60.9 465.2 60.9 437.1 89zM152 128C103.4 128 64 167.4 64 216L64 488C64 536.6 103.4 576 152 576L424 576C472.6 576 512 536.6 512 488L512 376C512 362.7 501.3 352 488 352C474.7 352 464 362.7 464 376L464 488C464 510.1 446.1 528 424 528L152 528C129.9 528 112 510.1 112 488L112 216C112 193.9 129.9 176 152 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L152 128z" />
        </svg>
      ),
    },
  ];

  const handleCopyClipboard = async (id) => {
    try {
      await navigator.clipboard.writeText(id);
      shopify.toast.show("ID copied to clipboard.");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <s-page title="Announcements">
      {/* Dashboard Stats Overview */}

      <s-grid
        gridTemplateColumns="repeat(3, 1fr)"
        gap="large"
        paddingBlockEnd="base"
      >
        {AnnoucementChart?.map((item) => (
          <s-grid-item gridColumn="span 1" key={item?.label}>
            <s-box background="subdued" border="base" borderRadius="base">
              <s-stack
                direction="block"
                gap="small-300"
                paddingBlock="base"
                paddingInline="base"
              >
                <s-stack direction="inline" gap="small-400" alignItems="center">
                  {/* <s-icon type="megaphone" tone="base" /> */}
                  {item?.icon}
                  <p
                    style={{
                      ...styles.mainTitle,
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {item?.label}
                  </p>
                </s-stack>
                <s-text>
                  <h2 style={styles.statNumberStyle}>{counts?.total ?? 0}</h2>
                </s-text>
              </s-stack>
            </s-box>
          </s-grid-item>
        ))}
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
              <h3 className="main_heading" style={{ fontSize: "16px" }}>
                Announcements
              </h3>
              <s-button
                variant="primary"
                onClick={() => navigate(`/app/announcement/new`)}
              >
                New Announcement
              </s-button>
            </s-stack>
            <s-table
              paginate={counts?.total > 7}
              hasPreviousPage={hasPrevious}
              hasNextPage={hasNext}
              onPreviousPage={() =>
                navigate(`?page=${pagination?.currentPage - 1}`)
              }
              onNextPage={() =>
                navigate(`?page=${pagination?.currentPage + 1}`)
              }
              loading={isLoading}
            >
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
                          <s-button
                            icon="clipboard"
                            onClick={() => handleCopyClipboard(ann?.id)}
                          >
                            Copy ID
                          </s-button>

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
