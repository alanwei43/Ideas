import { parseHtml } from "./utils";

/**
 * 
 * @param {Number} page 第几页
 */
export function getNewsList(page) {
    return fetch("https://news.cnblogs.com/m?page=" + page)
        .then(response => response.text())
        .then(data => {
            const doc = parseHtml(data);
            const lists = doc.querySelectorAll(".list_item");
            return Array.from(lists).map(ele => ({
                title: (ele.textContent || "").trim(),
                link: ele.querySelector("a").getAttribute("href")
            }));
        });
}

export function getNewsDetail(link) {
    return fetch("https://news.cnblogs.com" + link)
        .then(response => response.text())
        .then(data => {
            const doc = parseHtml(data);
            const body = doc.querySelector("#main_body").innerHTML;
            return body.replace(/<a href="(\/\/[^"]+)">\[图片\]<\/a>/g, `<img src="https:$1?x-referrer-url=null" />`);
        });
}