import { useEffect, useState } from "react";
import { Form, useActionData, useNavigate, useNavigation } from "react-router";
import { sendEmail } from "../helper/helper.server";
import {
  CUSTOMER_EMAIL_TEMPLATE,
  SUPPORT_TEAM_EMAIL_TEMPLATE,
} from "../constant";
import { useAppBridge } from "@shopify/app-bridge-react";

export async function action({ request }) {
  try {
    const formData = await request.formData();

    const category = formData.get("category");
    const subject = formData.get("subject");
    const description = formData.get("description");
    const name = formData.get("name");
    const email = formData.get("email");
    const storeUrl = formData.get("storeUrl");

    let errors = {};

    if (!category) errors.category = "Category is required";
    if (!subject) errors.subject = "Subject is required";
    if (!description) errors.description = "Description is required";
    if (!email) errors.email = "Email is required";
    if (!name) errors.name = "Name is required";

    if (Object.keys(errors).length) {
      return { errors };
    }

    const customerHtml = CUSTOMER_EMAIL_TEMPLATE(name);
    const supportHtml = SUPPORT_TEAM_EMAIL_TEMPLATE({
      category,
      subject,
      description,
      name,
      email,
      storeUrl,
    });

    await sendEmail(customerHtml, supportHtml, email);

    return { success: true };
  } catch (error) {
    return {
      error: error,
    };
  }
}

export default function AdditionalPage() {
  const actionData = useActionData();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    category: "",
    subject: "",
    storeUrl: "",
    description: "",
    name: "",
    email: "",
  });

  const shopify = useAppBridge();
  const navigation = useNavigation();
  const redirectTo = useNavigate();

  const loading = navigation.state === "submitting";

  // sync server errors
  useEffect(() => {
    if (actionData?.success) {
      shopify.toast.show("Your request successfully submitted.");
      setFormData({
        category: "",
        subject: "",
        storeUrl: "",
        description: "",
        name: "",
        email: "",
      });
      setErrors({});
    }

    if (actionData?.errors) {
      shopify.toast.show(
        actionData?.errors?.message ||
          actionData?.errors ||
          "Something went wrong",
      );
      setErrors(actionData?.errors);
    }
  }, [actionData, shopify]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // ✅ remove error on change
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  return (
    <div className="page-container">
      <div className="header-section">
        <h1>Help & Support</h1>
        <p>
          Welcome to <strong>Announcement Pro</strong> support center. How can
          we help you today?
        </p>
      </div>

      <div className="support-grid">
        <div className="support-sidebar">
          <div className="card">
            <h2 className="card-title">
              <span className="icon-box">📚</span>
              Common Issues
            </h2>

            <div className="faq-list">
              <div className="faq-item">
                <h4>Bar not showing?</h4>
                <p>
                  Check if your 'App Embed' is enabled in the Shopify theme
                  editor.
                </p>
              </div>

              <div className="faq-item">
                <h4>Mobile Responsive</h4>
                <p>
                  Announcement bars are automatically optimized for mobile
                  views.
                </p>
              </div>

              <div className="faq-item">
                <h4>Z-Index / Overlap</h4>
                <p>
                  If the bar is hidden behind your header, increase the Z-index
                  in settings.
                </p>
              </div>
            </div>

            <button className="btn-secondary">View Documentation</button>
          </div>

          {/* ✅ FIXED style */}
          <div className="card" style={{ marginTop: "20px" }}>
            <h2 className="card-title">
              <span className="icon-box">💬</span>
              Live Status
            </h2>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "14px" }}>Support Team</span>
              <span className="badge-active">Online</span>
            </div>
          </div>
        </div>

        <div className="support-main">
          <div className="card">
            <h2 className="card-title">
              <span className="icon-box">✉️</span>
              Submit a Support Ticket
            </h2>

            <Form method="post">
              <s-stack gap="base">
                <s-text-field
                  name="name"
                  label="Full Name"
                  value={formData.name}
                  onInput={(e) => handleChange("name", e.target.value)}
                  error={errors.name}
                  placeholder="Enter your name"
                  required
                />
                <s-text-field
                  name="email"
                  label="Email"
                  value={formData.email}
                  onInput={(e) => handleChange("email", e.target.value)}
                  error={errors.email}
                  placeholder="john@mail.com"
                  required
                />
                <s-select
                  name="category"
                  label="Support Category"
                  value={formData.category}
                  onInput={(e) => handleChange("category", e.target.value)}
                  error={errors.category}
                  placeholder="Select a category.."
                  required
                >
                  <s-option value="Report a Bug / Issue">
                    Report a Bug / Issue
                  </s-option>
                  <s-option value="Setup Assistance">Setup Assistance</s-option>
                  <s-option value="Feature Request">Feature Request</s-option>
                  <s-option value="Other">Others</s-option>
                </s-select>

                <s-text-field
                  name="subject"
                  label="Subject"
                  value={formData.subject}
                  onInput={(e) => handleChange("subject", e.target.value)}
                  error={errors.subject}
                  placeholder="Briefly describe the issue"
                  required
                />

                <s-text-field
                  name="storeUrl"
                  label="Store URL"
                  value={formData.storeUrl}
                  onInput={(e) => handleChange("storeUrl", e.target.value)}
                  placeholder="https://your-store.myshopify.com"
                />

                <s-text-area
                  name="description"
                  label="Description"
                  value={formData.description}
                  onInput={(e) => handleChange("description", e.target.value)}
                  error={errors.description}
                  rows={6}
                  placeholder="Tell us more about the problem. If you found a bug, please list the steps to reproduce it."
                  required
                />
              </s-stack>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
                <s-button-group>
                  <s-button
                    slot="primary-action"
                    type="submit"
                    loading={loading}
                  >
                    Submit Request
                  </s-button>
                  <s-button
                    slot="secondary-actions"
                    type="button"
                    onClick={() => redirectTo("/app")}
                  >
                    Cancel
                  </s-button>
                </s-button-group>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
