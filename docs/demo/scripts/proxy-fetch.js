const PROXY = "http://47.52.157.46:8089";

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
export default ProxyFetch;