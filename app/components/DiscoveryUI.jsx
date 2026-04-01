import { useNavigate } from "react-router";

const APPS = [
  {
    title: "Pro Wishlist",
    desc: "Simplify your store with our Pro Wishlist app, designed for easy setup to elevate conversions",
    img: "/wishlist-cover.webp",
    link: "https://apps.shopify.com/quick-wishlist?surface_intra_position=2&surface_type=partners&surface_version=simplified",
    icon: "/wishlist-logo.webp",
  },
  {
    title: "Carousel Reels",
    desc: "Showcase TikTok videos to attract customers, engage visitors, and improve aesthetics.",
    img: "/insta-cover.webp",
    link: "https://apps.shopify.com/carousel-reels?surface_intra_position=1&surface_type=partners&surface_version=simplified",
    icon: "/carousel-logo.webp",
  },
  {
    title: "Bundle Builder",
    desc: "Bundle Builder is currently under review.",
    img: "/bundle-builder.jpg",
    icon: "/bundle-logo.png",
    link: "#",
  },
];

export default function DiscoveryUI({ shop, appEmbedStatus }) {
  const apiKey = "1d31020718c92cc03d5631b069e0bee9"; // app.toml ka client_id
  const handle = "announcement"; // aapki blocks/app-embed.liquid file ka naam

  const url = `https://${shop}/admin/themes/current/editor?context=apps&activateAppId=${apiKey}/${handle}`;

  const navigate = useNavigate();

  return (
    <div className="discovery-wrapper">
      <div className="discovery-container">
        {/* Status Section */}
        {appEmbedStatus?.status == "active" && (
          <div className="status-banner">
            <s-stack direction="inline" alignItems="center" gap="small">
              <s-heading>App embed status</s-heading>
              <s-badge tone="success">Active</s-badge>
            </s-stack>

            <p className="status-right">
              Manage app embed in the online{" "}
              <a href={url} target="_blank" rel="noopener noreferrer">
                store editor
              </a>
            </p>
          </div>
        )}

        {appEmbedStatus?.status == "available" && (
          <div className="status-banner warning-banner">
            <s-stack direction="inline" alignItems="center" gap="small">
              <div className="warning-status">
                <s-icon type="alert-triangle"></s-icon>
              </div>
              <s-text>
                Activate the app by clicking “Activate”, then confirm with
                “Save” to start enhancing your store.
              </s-text>
            </s-stack>
            <s-button href={url} target="_blank">
              Activate
            </s-button>
          </div>
        )}

        {/* Main Content Card */}
        <div className="discovery-main-card">
          <s-stack
            direction="inline"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* <s-heading>Apps you might like</s-heading> */}
            <h3 className="main_heading">Apps you might like</h3>

            <s-button
              icon="menu-horizontal"
              variant="tertiary"
              accessibilityLabel="More actions"
              commandFor="more-actions-menu"
            ></s-button>

            <s-menu id="more-actions-menu" accessibilityLabel="More actions">
              <s-button variant="tertiary">Close</s-button>
            </s-menu>
          </s-stack>

          <div className="app-grid">
            {APPS.map((app, i) => (
              <div key={i} className="app-card">
                <div className="app-image-box">
                  <img src={app.img} alt={app.title} />
                </div>

                <div className="app-card-body">
                  <div className="app-icon-box">
                    <img src={app.icon} alt={app.title} />
                    <h3>{app.title}</h3>
                  </div>
                  <p>{app.desc}</p>

                  <button
                    className="app-outline-btn"
                    onClick={() => window.open(app.link, "_blank")}
                    disabled={app.link === "#"}
                  >
                    View on Shopify app store
                  </button>
                </div>
              </div>
            ))}
          </div>

          <hr className="discovery-divider" />

          <div className="referral-grid">
            <div
              className="referral-mini-card"
              onClick={() => navigate("/app/support")}
            >
              <div className="referral-icon-box">
                <img
                  width="26"
                  height="26"
                  src="/support.png"
                  alt="hotline"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="referral-text">
                <h4>Help & Support</h4>
                <p>Get assistance with your Shopify store and apps.</p>
              </div>
            </div>
            <div
              href="#"
              className="referral-mini-card"
              onClick={() => navigate("/app/guide")}
            >
              <div className="referral-icon-box">
                <img
                  width="26"
                  height="26"
                  src="/guide.png"
                  alt="hotline"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="referral-text">
                <h4>Guide & Tutorials</h4>
                <p>
                  Learn how to get the most out of your Shopify store and apps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
