import React from "react";

const TermsAndConditionPage = () => {
  return (
    <>
      <div className="main-wrapper">
        <h1>Terms and Conditions</h1>
        <p className="last-updated">Last Updated: April 2026</p>

        <p>
          Welcome to <strong>Announcement Pro</strong>. By installing and using
          our Shopify application, you agree to comply with and be bound by the
          following terms and conditions. Please review them carefully.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using Announcement Pro ("the App"), you agree to be
          bound by these Terms and Conditions and our Privacy Policy. If you do
          not agree to these terms, you must uninstall the App immediately.
        </p>

        <h2>2. App Usage & License</h2>
        <p>
          We grant you a non-exclusive, non-transferable, revocable license to
          use the App on your Shopify store. You agree not to:
        </p>
        <ul>
          <li>
            Reverse engineer, decompile, or attempt to extract the source code
            of the App.
          </li>
          <li>Use the App for any illegal or unauthorized purpose.</li>
          <li>
            Modify, adapt, or hack the App to falsely imply association with
            another service.
          </li>
        </ul>

        <h2>3. Service Availability & Support</h2>
        <p>
          While we strive for 99.9% uptime, we do not guarantee that the App
          will be uninterrupted or error-free. Maintenance or updates may
          occasionally cause brief periods of downtime. Support is provided via
          the dashboard for active subscribers.
        </p>

        <h2>4. Subscription & Billing</h2>
        <p>
          Billing is handled through the Shopify Billing API. All charges are
          processed by Shopify and are subject to Shopify's payment terms.
          Refunds are governed by our refund policy and Shopify’s merchant
          policies.
        </p>

        <h2>5. Content Responsibility</h2>
        <p>
          You are solely responsible for the content (text, links, and images)
          displayed in your announcement bars. You must ensure that your content
          does not violate any third-party rights, including trademarks or
          copyrights.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          Announcement Pro shall not be liable for any direct, indirect,
          incidental, or consequential damages resulting from the use or
          inability to use the App, including but not limited to loss of sales,
          data, or customer trust.
        </p>

        <h2>7. Modifications to the App</h2>
        <p>
          We reserve the right to modify or discontinue features of the App at
          any time. We will provide notice via the App dashboard or email
          regarding significant changes that may affect your store's display.
        </p>

        <h2>8. Termination</h2>
        <p>
          We reserve the right to terminate your access to the App without
          notice if we believe you have violated these Terms. You may terminate
          these terms at any time by uninstalling the App from your Shopify
          store.
        </p>

        <div className="contact-box">
          <strong>Questions?</strong>
          <p>
            If you have any questions regarding these Terms and Conditions,
            please reach out to our support team through the App Dashboard or
            email us at{" "}
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

export default TermsAndConditionPage;
