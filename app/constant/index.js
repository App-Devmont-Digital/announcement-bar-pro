export const Templates = [
  {
    id: 1,
    name: "Custom",
  },
  {
    id: 2,
    name: "Dawn",
  },
  {
    id: 3,
    name: "Electric",
  },
  {
    id: 4,
    name: "Forest",
  },
  {
    id: 5,
    name: "Vibrant",
  },
  {
    id: 6,
    name: "Neon",
  },
  {
    id: 7,
    name: "Love",
  },
  {
    id: 8,
    name: "Earth",
  },
  {
    id: 9,
    name: "Valentine",
  },
  {
    id: 10,
    name: "Bubble Gum",
  },
];

export const PAGES = [
  { label: "Home", value: "index" },
  { label: "Collections", value: "collection" },
  { label: "All product pages", value: "product" },
  { label: "Blogs", value: "blogs" },
  { label: "Cart", value: "cart" },
  { label: "Search", value: "search" },
  { label: "404", value: "404" },
];

export const CUSTOMER_EMAIL_TEMPLATE = (name = "Merchant") => `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #303030; max-width: 600px; margin: 20px auto; border: 1px solid #e1e3e5; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <div style="background-color: #008060; padding: 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 0.5px;">Announcement Pro</h1>
    </div>
    <div style="padding: 32px; background-color: #ffffff;">
        <h2 style="font-size: 20px; margin-top: 0; color: #202223;">We've received your request!</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #6d7175;">
            Hi ${name},<br><br>
            Thank you for reaching out to <strong>Announcement Pro</strong> support. We've successfully received your ticket and our team is already looking into it.
        </p>
        <div style="background-color: #f1f8f5; border-left: 4px solid #008060; padding: 16px; margin: 24px 0; border-radius: 4px;">
            <p style="font-size: 14px; margin: 0; color: #004d39;">
                <strong>Estimated response time:</strong> Usually within 12-24 hours.
            </p>
        </div>
        <p style="font-size: 15px; line-height: 1.6; color: #6d7175;">
            In the meantime, please ensure your "App Embed" is enabled in your Shopify Theme Editor to ensure your bars appear correctly.
        </p>
        <p style="font-size: 15px; margin-top: 32px; color: #202223;">
            Best regards,<br>
            <strong>The Announcement Pro Team</strong>
        </p>
    </div>
    <div style="background-color: #fafbfb; padding: 16px; text-align: center; font-size: 12px; color: #8c9196; border-top: 1px solid #e1e3e5;">
        Sent via Announcement Pro Support Portal • Devmont Digital
    </div>
</div>
`;

export const SUPPORT_TEAM_EMAIL_TEMPLATE = (data) => `
<div style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; color: #202223; max-width: 650px; margin: 20px auto; border: 2px solid #303030; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #303030; color: #ffffff; padding: 16px; display: flex; align-items: center; justify-content: space-between;">
        <span style="font-size: 14px; font-weight: bold;">🚨 NEW SUPPORT TICKET</span>
        <span style="font-size: 12px; opacity: 0.8;">Announcement Pro App</span>
    </div>
    <div style="padding: 24px; background-color: #ffffff;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #f1f1f1;">
                <td style="padding: 12px 0; color: #6d7175; width: 140px;">Customer Email:</td>
                <td style="padding: 12px 0; font-weight: bold;">${data.email}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f1f1;">
                <td style="padding: 12px 0; color: #6d7175;">Subject:</td>
                <td style="padding: 12px 0; font-weight: bold;">${data.subject}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f1f1;">
                <td style="padding: 12px 0; color: #6d7175;">Category:</td>
                <td style="padding: 12px 0;"><span style="background: #eee; padding: 2px 6px; border-radius: 4px;">${data.category}</span></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f1f1;">
                <td style="padding: 12px 0; color: #6d7175;">Store URL:</td>
                <td style="padding: 12px 0;"><a href="${data?.storeUrl}" style="color: #005bd3;">${data?.storeUrl || "Not provided"}</a></td>
            </tr>
        </table>

        <div style="margin-top: 24px;">
            <p style="font-size: 13px; color: #6d7175; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Message Details:</p>
            <div style="background-color: #f6f6f6; padding: 20px; border-radius: 8px; border: 1px solid #e1e3e5; line-height: 1.6; white-space: pre-wrap; font-family: sans-serif;">${data?.description}</div>
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px dotted #dfe3e8; text-align: center;">
            <a href="mailto:${data?.email}" style="display: inline-block; background-color: #008060; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-family: sans-serif;">Reply to Merchant</a>
        </div>
    </div>
</div>
`;

export const getInitialState = () => ({
  uploadFile: null,

  designSettings: {
    position: "top-page",
    template: 1,
    cardBg: "single-bg",
    gradientRange: [0, 50],
    singleBgColor: "#ffffff",
    gradeintColor1: "#dddddd",
    gradeintColor2: "#ffffff",
    blurBackground: true,
    cornerRadius: 0,
    borderSize: 0,
    borderColor: "#ffffff",

    textSize: 18,
    textColor: "#202223",
    subheadingSize: 14,
    subheadingColor: "#202223",

    btnColor: "#000000",
    btnTextSize: 14,
    btnTextColor: "#ffffff",
    btnRadius: 0,
    bgImageUrl:
      "https://vamxifegjdrgriapwsjg.supabase.co/storage/v1/object/public/main/bg-images/bg-3.jpg",
  },

  content: {
    announcementType: "simple-announce",
    name: "Announcement name",
    title: "Enjoy a 20% discount on all our products!",
    subheading: "",
    icon: "",
    callToAction: "button",
    showCloseIcon: false,
    buttonText: "Shop Now!",
    buttonLink: "#",
    scheduleStart: "right-now",
    scheduleEnd: "never",
  },

  placement: "every",

  placementRules: {
    include_templates: [],
    exclude_templates: [],
  },

  multiContent: [
    {
      id: crypto.randomUUID(),
      title: "Enjoy 20% off your purchase!",
      subheading: "",
      icon: "",
      callToAction: "button",
      showCloseIcon: false,
      buttonText: "Shop Now!",
      buttonLink: "#",
    },
  ],
});
