import React from "react";

export default function GuidePage() {
  return (
    <div className="guide-wrapper">
      <div className="guide-header">
        <h1>Getting Started with Announcement Pro</h1>
        <span className="status-badge">Quick Setup Guide</span>
      </div>

      <div className="guide-body">
        <div className="step-container">
          <div className="step-number">1</div>
          <div className="step-content">
            <h3 className="step-title">Enable App in Theme Settings</h3>
            <p className="step-description">
              For your announcements to appear on your store, you must enable
              the App Embed. This is a mandatory Shopify security requirement.
            </p>
            <button className="action-button">Go to Theme Editor</button>
            <div className="visual-aid">
              Once the Theme Editor opens, look for{" "}
              <strong>"App Embeds"</strong> on the left and toggle{" "}
              <strong>"Announcement Pro"</strong> to ON.
            </div>
          </div>
        </div>

        <div className="step-container">
          <div className="step-number">2</div>
          <div className="step-content">
            <h3 className="step-title">Choose Your Display Style</h3>
            <p className="step-description">
              Select how you want your messages to be displayed to customers:
            </p>
            <ul
              style={{
                fontSize: "14px",
                color: "#5c5f62",
                paddingLeft: "20px",
                lineHeight: "1.8",
              }}
            >
              <li>
                <strong>Running Text Line:</strong> Best for single long
                messages that scroll infinitely.
              </li>
              <li>
                <strong>Sliding Announcements:</strong> Perfect if you have
                multiple different offers to show.
              </li>
              <li>
                <strong>Simple Static Bar:</strong> A clean, non-moving bar for
                direct communication.
              </li>
            </ul>
          </div>
        </div>

        <div className="step-container">
          <div className="step-number">3</div>
          <div className="step-content">
            <h3 className="step-title">Customize & Publish</h3>
            <p className="step-description">
              Change the background colors (solid or gradients), adjust the text
              size, and add your "Shop Now" button links. Once satisfied, hit{" "}
              <strong>Save Settings</strong> to go live!
            </p>
          </div>
        </div>

        <div className="docs-section">
          <h3 className="docs-title">Full Documentation</h3>

          <div className="docs-card">
            <h4>Understanding Display Modes</h4>
            <p>
              <strong>Running Text Line:</strong> This mode uses an infinite
              loop. Even if your text is short, it will repeat seamlessly across
              the screen. It's designed to grab attention without taking up
              vertical space.
            </p>
            <p style={{ marginTop: "10px" }}>
              <strong>Sliding Announcements:</strong> If you have 3 different
              messages (e.g., Free Shipping, New Arrivals, and a Discount Code),
              this mode will slide between them automatically every few seconds.
            </p>
          </div>

          <div className="docs-card">
            <h4>Styling & Customization</h4>
            <p>
              You can choose between <strong>Single Colors</strong> for a
              classic look or <strong>Gradients</strong> for a modern feel. You
              can also adjust the 'Corner Radius' to make your bars look sharp
              or rounded to match your brand's theme.
            </p>
          </div>

          <div className="docs-card">
            <h4>Visibility Settings</h4>
            <p>
              By default, announcements can be set to show on all pages or
              restricted to the Home Page only. Use the 'Show Close Icon'
              setting if you want to allow customers to dismiss the message
              after reading it.
            </p>
          </div>

          <div className="tip-box">
            <strong>💡 Pro Tip:</strong>
            <p>
              If you want to catch the customer's eye immediately, try using a{" "}
              <strong>Gradient Background</strong>. It makes your bar look
              modern and premium compared to simple colors.
            </p>
          </div>
        </div>
      </div>

      <div className="help-footer">
        Need more help? Contact support.
      </div>
    </div>
  );
}
