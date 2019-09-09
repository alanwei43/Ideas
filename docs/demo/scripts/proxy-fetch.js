const params = new URLSearchParams(location.search);
const PROXY = "http://localhost:8089/proxy" //params.get("proxy-url") || "http://47.52.157.46:8089/proxy";
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

/**
 * 
 * @param {String} url 
 * @param {{method: "get" | "post", headers: {}}} options 
 */
const ProxyFetch = function (url, options) {
    options.headers["x-proxy-url"] = url;
    return fetch(PROXY, options);
};
ProxyFetch.wrapper = function (url, origin) {
    const params = new URLSearchParams();
    params.append("x-proxy-url", url);
    if (typeof origin === "string") {
        params.append("x-referrer-url", origin);
    }
    return PROXY + "?" + params.toString();
};
ProxyFetch.get = function (url) {
    return ProxyFetch(url, {
        method: "get",
        headers: {
            "x-cors-headers": "x-proxy-url, x-cors-headers"
        }
    });
};