import React from "react";

const PrivacyPolicies = () => {
  return (
    <>
      <div class="main-wrapper">
        <h1>Privacy Policy</h1>
        <p class="last-updated">Last Updated: October 2026</p>

        <p>
          This Privacy Policy describes how <strong>Announcement Pro</strong>{" "}
          (the "App") collects, uses, and discloses your personal information
          when you install or use the App in connection with your
          Shopify-supported store.
        </p>

        <h2>1. Personal Information the App Collects</h2>
        <p>
          When you install the App, we are automatically able to access certain
          types of information from your Shopify account via the Shopify API:
        </p>
        <ul>
          <li>
            <strong>Shop Information:</strong> Shop name, email, domain, and
            shop owner details to provide app functionality and communication.
          </li>
          <li>
            <strong>Theme Information:</strong> We access your theme data to
            allow the placement of announcement bars via App Embeds.
          </li>
          <li>
            <strong>Configuration Data:</strong> We store the settings you
            choose for your bars (colors, text, links, and timing).
          </li>
        </ul>

        <h2>2. How We Use Your Personal Information</h2>
        <p>
          We use the personal information we collect from you and your customers
          in order to provide the Service and to operate the App. Specifically:
        </p>
        <ul>
          <li>
            To provide the announcement bar display functionality on your
            storefront.
          </li>
          <li>
            To communicate with you regarding app updates, support requests, or
            billing issues.
          </li>
          <li>
            To optimize and improve the App’s performance and user experience.
          </li>
        </ul>

        <div class="highlight-box">
          <strong>Important:</strong> Announcement Pro does <u>not</u> track
          your individual store customers or collect their personal browsing
          data. Our app is purely decorative and informational for your
          storefront.
        </div>

        <h2>3. Sharing Your Personal Information</h2>
        <p>
          We do not sell, rent, or share your personal information with third
          parties for their marketing purposes. We only share information with
          third parties as necessary to provide the App’s services (e.g.,
          Shopify for billing and API communication).
        </p>

        <h2>4. Data Retention</h2>
        <p>
          When you uninstall the App, we keep your configuration settings in
          case you decide to reinstall. After this period, your data is
          automatically deleted from our servers in compliance with Shopify's
          mandatory webhooks.
        </p>

        <h2>5. Data Security</h2>
        <p>
          We prioritize the security of your data. We implement a variety of
          security measures to maintain the safety of your personal information:
        </p>
        <ul>
          <li>
            <strong>Access Control:</strong> Access to your shop's configuration
            data is strictly limited to authorized personnel who require access
            to perform their duties and provide support.
          </li>
          <li>
            <strong>Regular Audits:</strong> we periodically review our data
            collection, storage, and processing practices to guard against
            unauthorized access to systems.
          </li>
        </ul>

        <h2>6. Changes</h2>
        <p>
          We may update this privacy policy from time to time in order to
          reflect, for example, changes to our practices or for other
          operational, legal, or regulatory reasons.
        </p>

        <div class="contact-info">
          <strong>Contact Us</strong>
          <p>
            For more information about our privacy practices, if you have
            questions, or if you would like to make a complaint, please contact
            us by e-mail at:
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:support@devmontdigital.io?subject=Announcement Pro Support Request">
              support@devmontdigital.io
            </a>
          </p>
        </div>
      </div>

      <footer>&copy; 2026 Announcement Pro | Built by Devmont Digital</footer>
    </>
  );
};

export default PrivacyPolicies;