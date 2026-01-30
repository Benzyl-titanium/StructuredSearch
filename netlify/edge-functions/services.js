export default async (request, context) => {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/api/molscribe")) {
    return context.next();
  }

  const TARGET_BASE = "https://marvinjs.chemicalize.com/v1/0bb3e0bda52f49189c286e052b0d1665/marvinjs-backend";
  
  const apiPath = url.pathname.replace(/^\/api/, "");
  
  const targetUrlObj = new URL(TARGET_BASE + apiPath);
  
  url.searchParams.forEach((value, key) => {
    targetUrlObj.searchParams.set(key, value);
  });
  
  if (!targetUrlObj.searchParams.has("sid")) {
    targetUrlObj.searchParams.set("sid", "b8a53138-0382-4293-92ca-49d79fa5534f");
  }
  if (!targetUrlObj.searchParams.has("origin")) {
    targetUrlObj.searchParams.set("origin", "");
  }

  const newHeaders = new Headers();
  const contentType = request.headers.get("Content-Type");
  if (contentType) {
    newHeaders.set("Content-Type", contentType);
  }
  
  newHeaders.set("Origin", "https://marvinjs.chemicalize.com");
  newHeaders.set("Referer", "https://marvinjs.chemicalize.com/");
  newHeaders.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");

  let bodyContent = null;
  if (["POST", "PUT", "PATCH"].includes(request.method)) {
    bodyContent = await request.text();
  }

  try {
    const response = await fetch(targetUrlObj.toString(), {
      method: request.method,
      headers: newHeaders,
      body: bodyContent,
      redirect: "follow"
    });

    const responseBody = await response.text();
    
    const responseHeaders = new Headers(response.headers);
    responseHeaders.set("Access-Control-Allow-Origin", "*");
    
    responseHeaders.delete("Content-Encoding");

    return new Response(responseBody, {
      status: response.status,
      headers: responseHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};