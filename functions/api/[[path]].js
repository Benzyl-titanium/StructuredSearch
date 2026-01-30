export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  const TARGET_BASE = "https://marvinjs.chemicalize.com/v1/0bb3e0bda52f49189c286e052b0d1665/marvinjs-backend";

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiPath = url.pathname.replace(/^\/api/, '');
    
    const finalUrlObj = new URL(TARGET_BASE + apiPath);
    
    url.searchParams.forEach((value, key) => {
      finalUrlObj.searchParams.set(key, value);
    });

    if (!finalUrlObj.searchParams.has("sid")) {
      finalUrlObj.searchParams.set("sid", "b8a53138-0382-4293-92ca-49d79fa5534f"); 
    }
    if (!finalUrlObj.searchParams.has("origin")) {
      finalUrlObj.searchParams.set("origin", "");
    }

    let bodyContent = null;
    if (["POST", "PUT", "PATCH"].includes(request.method)) {
      bodyContent = await request.text();
    }

    const newHeaders = new Headers();
    newHeaders.set("Content-Type", request.headers.get("Content-Type") || "application/json");
    newHeaders.set("Origin", "https://marvinjs.chemicalize.com");
    newHeaders.set("Referer", "https://marvinjs.chemicalize.com/");
    newHeaders.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");

    const response = await fetch(finalUrlObj.toString(), {
      method: request.method,
      headers: newHeaders,
      body: bodyContent,
      redirect: "follow"
    });

    const responseBody = await response.text();
    
    return new Response(responseBody, {
      status: response.status,
      headers: {
        ...corsHeaders,
        "Content-Type": response.headers.get("content-type") || "application/json"
      }
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message, stack: e.stack }), { 
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
}