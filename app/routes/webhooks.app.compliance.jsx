import { authenticate } from "../shopify.server";

/**
 * This route handles all 3 compliance topics:
 * - customers/data_request
 * - customers/redact
 * - shop/redact
 *
 * Shopify will POST JSON with a valid X-Shopify-Hmac-Sha256 header.
 * authenticate.webhook():
 *  - verifies HMAC
 *  - parses payload
 *  - gives you topic, shop, etc.
 */
export const action = async ({ request }) => {
  // This call verifies the HMAC signature and throws / rejects if it's invalid.
  const { topic, shop } = await authenticate.webhook(request);

  // topic will be one of:
  // "CUSTOMERS_DATA_REQUEST", "CUSTOMERS_REDACT", "SHOP_REDACT"
  switch (topic) {
    case "CUSTOMERS_DATA_REQUEST": {
      // payload structure: https://shopify.dev/docs/apps/build/compliance/privacy-law-compliance#customers-data_request-payload
      // Example keys: payload.shop_id, payload.customer.id, payload.orders_requested
      // TODO: Retrieve the customer's data from your DB and (if required) provide it to the merchant.
      break;
    }

    case "CUSTOMERS_REDACT": {
      // payload structure: https://shopify.dev/docs/apps/build/compliance/privacy-law-compliance#customers-redact-payload
      // TODO: Redact/delete any customer data your app has stored.
      break;
    }

    case "SHOP_REDACT": {
      // payload structure: https://shopify.dev/docs/apps/build/compliance/privacy-law-compliance#shop-redact-payload
      // TODO: Delete all store-level data you’ve stored for this shop.
      break;
    }

    default:
      // Optionally log unexpected topics
      console.warn(
        `Unexpected compliance webhook topic: ${topic} for shop ${shop}`,
      );
  }

  // Respond 200 to acknowledge receipt
  return new Response(null, { status: 200 });
};