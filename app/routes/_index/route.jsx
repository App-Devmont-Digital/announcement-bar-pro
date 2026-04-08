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
              <img
                src="/logo-ann.png"
                alt="Announcement Pro"
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "contain",
                  borderRadius: "6px",
                }}
              />
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

          {/* {showForm && (
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
          )} */}

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

      <section id="get-started" class="login-section">
        <div class="container text-center">
          <h2 style={{ marginBottom: "12px", fontSize: "32px" }}>
            Ready to Start?
          </h2>
          <p style={{ marginBottom: "40px", color: "#6d7175" }}>
            Enter your shop URL to install the app and create your first bar in
            minutes.
          </p>

          {showForm && (
            <Form className="login-card" method="post" action="/auth/login">
              <div className="form-group">
                <label className="form-label">Shop domain</label>
                <input
                  type="text"
                  id="shop"
                  name="shop"
                  className="form-input"
                  placeholder="my-shop-domain"
                  required
                />

                <span className="form-hint">
                  e.g: my-shop-domain.myshopify.com
                </span>
              </div>
              <button
                className="btn-primary"
                type="submit"
                style={{ width: "100%", padding: "16px", fontSize: "16px" }}
              >
                Log in
              </button>
            </Form>
          )}
        </div>
      </section>

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
              <img
                src="/logo-ann.png"
                alt="Announcement Pro"
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "contain",
                  borderRadius: "6px",
                }}
              />
            </div>

            <span style={{ fontWeight: 700 }}>Announcement Pro</span>
          </div>

          <p>
            &copy; 2026{" "}
            <a
              target="_blank"
              href="https://devmontdigital.io/"
              style={{ color: "#5c5f62", textDecoration: "none" }}
            >
              Devmont Digital
            </a>
            . All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
    
  );
}
