
fetch("https://www.cnbeta.com/backend.php", {
    headers: {
        "x-customer": new Date().toISOString()
    }
}).then(response => response.text()).then(data => {
    let $data = $(data), $list = $("ol.news-list");
    $data.find("item").each((i, ele) => {
        if (!ele) {
            return;
        }
        const $ele = $(ele), $title = $("<a href='javascript:void(0)' />").addClass("title");

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

    fetch(link).then(response => response.text())
        .then(data => $(data))
        .then($response => {
            const $body = $response.find("#artibody");
            $body.find("img").each((i, ele) => {
                const $ele = $(ele);
                const src = $ele.attr("src");
                // $ele.attr("src", ProxyFetch.wrapper(src, link));
                // $ele.attr("data-src", src);
            });
            $content.empty().append($body);
        });
});

window.addEventListener("error", e => alert(e.message));

// fetch("http://www.ituring.com.cn/book?tab=book&sort=new")
//     .then(response => response.text())
//     .then(data => $(data))
//     .then($content => {
//         console.log($content.find(".block-books ul li").map((index, ele) => $(ele).find(".book-info .name").text()))
//     });
