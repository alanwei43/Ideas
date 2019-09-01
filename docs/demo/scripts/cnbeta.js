import ProxyFetch from "./proxy-fetch.js";


ProxyFetch.get("https://www.cnbeta.com/backend.php")
    .then(response => response.text())
    .then(data => {
        let $data = $(data), $list = $("ol.news-list");
        $data.find("item").each((i, ele) => {
            if (!ele) {
                return;
            }
            const $ele = $(ele), $title = $("<p />").addClass("title");

            try {
                const link = /link>(https:\/\/\w+\.cnbeta\.com(\/\w+)+\.htm)/.exec(ele.innerHTML || "")[1];
                $title.data("link", link).text($ele.find("title").text());
            } catch (ex) {
                $title.text(ex.message);
            }
            $list.append($("<li />").append($title).append($("<div />").addClass("content")));
        });
    });

$("body").on("click", ".title", e => {
    const $title = $(e.target);
    const link = $title.data("link"), $content = $title.siblings(".content");
    if (!link) {
        return;
    }

    ProxyFetch.get(link).then(response => response.text())
        .then(data => $(data))
        .then($response => {
            const $body = $response.find("#artibody");
            $body.find("img").each((i, ele) => {
                const $ele = $(ele);
                const src = $ele.attr("src");
                $ele.attr("src", ProxyFetch.wrapper(src, src));
                $ele.attr("data-src", src);
            });
            $content.empty().append($body);
        })
});