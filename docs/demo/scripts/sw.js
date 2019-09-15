const params = new URLSearchParams(location.search);
const PROXY = params.get("proxy-url") || "https://www.alanwei.net/web-proxy";
console.log(`Proxy Url: `, PROXY);

self.addEventListener("install", () => {
    console.log("install");
});
self.addEventListener("fetch", event => {
    const reqUrl = event.request.url + "";
    if (reqUrl.indexOf(self.origin) == 0) {
        console.log("same domain: ", reqUrl);
        return;
    }

    const req = event.request;
    const headers = {
        "x-proxy-url": reqUrl,
        "x-cors-headers": "x-proxy-url, x-cors-headers, x-cors-methods",
        "x-cors-methods": req.method
    };
    Array.from(req.headers).forEach(kv => headers[kv[0]] = kv[1]);

    event.respondWith(self.fetch(`${PROXY}?x-proxy-url=${encodeURIComponent(reqUrl)}`, {
        cache: req.cache,
        credentials: req.credentials,
        headers: headers,
        keepalive: req.keepalive,
        method: req.method,
        mode: req.mode,
        // bodyUsed: req.bodyUsed,
        // redirect: req.redirect,
        // referrer: req.referrer
    }));
});