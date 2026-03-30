const APPS = [
  {
    title: "Essential Free Shipping Upsell",
    desc: "Boost sales and AOV by displaying a free shipping progress bar and upsell.",
    img: "https://placehold.co/600x400/111/fff?text=Free+Shipping",
  },
  {
    title: "Essential Trust Badges & Icons",
    desc: "Showcase your product features and store guarantees with icons and trust badge banners.",
    img: "https://placehold.co/600x400/111/fff?text=Trust+Badges",
  },
  {
    title: "Essential Countdown Timer Bar",
    desc: "Drive Sales by using Urgency. Countdown timer bar is one of the ways to motivate buyers to act.",
    img: "https://placehold.co/600x400/111/fff?text=Timer+Bar",
  },
];

export default function DiscoveryUI() {
  return (
    <div className="discovery-wrapper">
      <div className="discovery-container">
        {/* Status Section */}
        <div className="status-banner">
          <s-stack direction="inline" alignItems="center" gap="small">
            <s-heading>App embed status</s-heading>
            <s-badge tone="success">Active</s-badge>
          </s-stack>

          <p className="status-right">
            Manage app embed in the online <a href="#">store editor</a>
          </p>
        </div>

        {/* Main Content Card */}
        <div className="discovery-main-card">
          <s-stack
            direction="inline"
            justifyContent="space-between"
            alignItems="center"
          >
            <s-heading>Apps you might like</s-heading>
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
                  <h3>{app.title}</h3>
                  <p>{app.desc}</p>

                  <button className="app-outline-btn">
                    View on Shopify app store
                  </button>
                </div>
              </div>
            ))}
          </div>

          <hr className="discovery-divider" />

          <div className="referral-grid">
            <div className="referral-mini-card">
              <div className="referral-icon-box">S</div>
              <div className="referral-text">
                <h4>Your next store only $1</h4>
                <p>
                  Start for free, then first 3 months of Shopify for only $1!
                </p>
              </div>
            </div>
            <div className="referral-mini-card">
              <div className="referral-icon-box">🤑</div>
              <div className="referral-text">
                <h4>Refer a Store - Earn Money</h4>
                <p>Join our affiliate program & earn 30% for every referral</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
