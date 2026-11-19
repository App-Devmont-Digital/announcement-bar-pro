
export const loader = async ({ request }) => {
  const secret = process.env.EGRESS_CHECK_SECRET;

  if (!secret || request.headers.get("x-check-secret") !== secret) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(
      "https://api.ipify.org?format=json",
      {
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      throw new Error("IP lookup failed");
    }

    const { ip } = await response.json();

    return Response.json({
      outboundIP: ip,
      region: process.env.VERCEL_REGION || "unknown",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return Response.json(
      { error: "Unable to check outbound IP" },
      { status: 502 }
    );
  }
};