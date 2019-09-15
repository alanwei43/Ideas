const params = new URLSearchParams(location.search);
const PROXY = params.get("proxy-url") || "https://www.alanwei.net/web-proxy";
console.log(`Proxy Url: `, PROXY);

self.addEventListener("install", () => {
    console.log("install");
});
self.addEventListener("fetch", event => {
    const req = event.request;
    let reqUrl = req.url + "";
    if (reqUrl.indexOf(self.origin) == 0) {
        console.log("[ignore] same domain: ", reqUrl);
        return;
    }
    if (!/^https?:\/\//g.test(reqUrl)) {
        console.log("[ignore] not http request: ", reqUrl);
        return;
    }

    const proxyUrlParams = new URLSearchParams();
    if (reqUrl.includes("?")) {
        const reqUrlParams = new URLSearchParams("?" + reqUrl.split("?")[1]);
        ["x-referrer-url", "x-proxy-url", "x-cors-origin", "x-cors-methods"]
            .filter(key => reqUrlParams.has(key))
            .forEach(key => {
                proxyUrlParams.set(key, reqUrlParams.get(key));
                reqUrlParams.delete(key);
            });

        reqUrl = reqUrl.split("?")[0] + "?" + reqUrlParams.toString();
    }
    proxyUrlParams.append("x-proxy-url", reqUrl);

    const headers = {
        "x-proxy-url": reqUrl,
        "x-cors-headers": "x-proxy-url, x-cors-headers, x-cors-methods",
        "x-cors-methods": req.method
    };
    Array.from(req.headers).forEach(kv => headers[kv[0]] = kv[1]);

    event.respondWith(self.fetch(`${PROXY}?${proxyUrlParams.toString()}`, {
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