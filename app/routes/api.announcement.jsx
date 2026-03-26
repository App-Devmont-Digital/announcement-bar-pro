import prisma from "../db.server";

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const loader = async ({ request }) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");

  if (!shop) {
    return new Response(
      JSON.stringify({ message: "Shop parameter is required" }),
      { status: 400, headers: corsHeaders },
    );
  }

  try {
    const announcement = await prisma.annSettings.findMany({
      where: {
        shop: shop, // or just 'shop' if the variable name matches
        status: "active",
      },
    });

    return new Response(
      JSON.stringify({
        status: 200,

        data: announcement,
      }),
      { headers: corsHeaders },
    );
  } catch (error) {
    console.error("API Error:", error);

    return new Response(
      JSON.stringify({
        status: 500,
        message: "Failed to fetch",
        error: error.message,
      }),
      { status: 500, headers: corsHeaders },
    );
  }
};
