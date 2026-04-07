import { redirect, Form, useLoaderData } from "react-router";
import { login } from "../../shopify.server";
import styles from "./styles.module.css";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
};

export default function App() {
  const { showForm } = useLoaderData();

  return (
    <>
      <nav>
        <div className="container-l nav-content">
          <a href="#" className="logo">
            <div className="logo-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 5L6 9H2V15H6L11 19V5Z"></path>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
            </div>
            Announcement Pro
          </a>

          <div className="nav-right">
            <span className="nav-install">100% Free App</span>
            <a href="#" className="btn-primary">
              Install Now
            </a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="container-l text-center">
          <div className="badge-free">Totally Free • No Hidden Fees</div>

          <h1>Engage Your Visitors with Professional Bars</h1>

          <p>
            Showcase deals, scrolling updates, and rotating announcements.
            Announcement Pro lets you drive more sales without any coding or
            monthly subscriptions.
          </p>

          <a
            href="#"
            className="btn-primary"
            style={{
              padding: "18px 40px",
              fontSize: "20px",
            }}
          >
            Get Announcement Pro For Free
          </a>

          {showForm && (
            <div class="login-container">
            <Form className="login-form" method="post" action="/auth/login">
              <div class="field-group">
                <label for="shop" class="field-label">
                  Shop domain
                </label>
                <div class="input-wrapper">
                  <input
                    type="text"
                    id="shop"
                    name="shop"
                    class="shop-input"
                    placeholder="my-shop-domain"
                    required
                  />
                </div>
                <p class="helper-text">e.g: my-shop-domain.myshopify.com</p>
              </div>

              <button type="submit" class="submit-btn">
                Log in
              </button>
            </Form>
            </div>
          )}

          <div className="preview-box">
            <div className="browser-bar">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>

            <div className="demo-bar bar-scrolling">
              <div className="scrolling-text">
                ✨ TOTALLY FREE FOREVER! — 🚀 NEW: MULTI-MESSAGE CAROUSEL BARS —
                ⚡ SCROLLING ANNOUNCEMENTS NOW AVAILABLE — 🎁 NO PAYMENT
                REQUIRED ✨
              </div>
            </div>

            <div
              style={{
                height: "320px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9ca3af",
                background: "#fff",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "200px",
                  height: "10px",
                  background: "#f3f4f6",
                  borderRadius: "5px",
                }}
              />
              <div
                style={{
                  width: "150px",
                  height: "10px",
                  background: "#f3f4f6",
                  borderRadius: "5px",
                }}
              />
              <div
                style={{
                  width: "180px",
                  height: "10px",
                  background: "#f3f4f6",
                  borderRadius: "5px",
                }}
              />

              <p style={{ marginTop: "20px", fontStyle: "italic" }}>
                Preview of your Shopify Store
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="features">
        <div className="container-l">
          <div className="text-center">
            <h2 style={{ fontSize: "36px", letterSpacing: "-0.5px" }}>
              Why Merchants Love Us
            </h2>
          </div>

          <div className="grid">
            <div className="feature-card">
              <div className="icon">💎</div>
              <h3>Completely Free</h3>
              <p>
                No trials, no "pro" tiers, and no payment methods needed. Every
                feature is available for free, forever.
              </p>
            </div>

            <div className="feature-card">
              <div className="icon">🎡</div>
              <h3>Dynamic Styles</h3>
              <p>
                Choose from scrolling tickers, rotating carousels, sliding
                messages, or simple static banners.
              </p>
            </div>

            <div className="feature-card">
              <div className="icon">🎨</div>
              <h3>Full Brand Control</h3>
              <p>
                Match your store's theme perfectly. Change colors, fonts,
                speeds, and positions with one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container-l">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "20px",
              color: "white",
            }}
          >
            <div
              className="logo-icon"
              style={{ width: "32px", height: "32px" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 5L6 9H2V15H6L11 19V5Z"></path>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            </div>

            <span style={{ fontWeight: 700 }}>Announcement Pro</span>
          </div>

          <p>
            &copy; 2024 Announcement Pro. The #1 Free Announcement Bar for
            Shopify.
          </p>

          <p style={{ fontSize: "14px", marginTop: "12px" }}>
            Boost your conversions today without the monthly fees.
          </p>
        </div>
      </footer>
    </>
    // <div className={styles.index}>
    //   <div className={styles.content}>
    //     <h1 className={styles.heading}>A short heading about [your app]</h1>
    //     <p className={styles.text}>
    //       A tagline about [your app] that describes your value proposition.
    //     </p>
    //     {showForm && (
    //       <Form className={styles.form} method="post" action="/auth/login">
    //         <label className={styles.label}>
    //           <span>Shop domain</span>
    //           <input className={styles.input} type="text" name="shop" />
    //           <span>e.g: my-shop-domain.myshopify.com</span>
    //         </label>
    //         <button className={styles.button} type="submit">
    //           Log in
    //         </button>
    //       </Form>
    //     )}
    //     <ul className={styles.list}>
    //       <li>
    //         <strong>Product feature</strong>. Some detail about your feature and
    //         its benefit to your customer.
    //       </li>
    //       <li>
    //         <strong>Product feature</strong>. Some detail about your feature and
    //         its benefit to your customer.
    //       </li>
    //       <li>
    //         <strong>Product feature</strong>. Some detail about your feature and
    //         its benefit to your customer.
    //       </li>
    //     </ul>
    //   </div>
    // </div>
  );
}
