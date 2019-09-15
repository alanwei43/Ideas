const fs = require("fs"),
    path = require("path");

module.exports = {
    publicPath: "/ideas/vue-demo",
    outputDir: "../../docs/vue-demo",
    pages: {
        cnblogs: {
            entry: "src/cnblogs/main.js",
            template: "templates/cnblogs.html",
            filename: "cnblogs.html",
        },
        cnbeta: {
            entry: "src/cnbeta/main.js",
            template: "templates/cnbeta.html",
            filename: "cnbeta.html",
        }
    },
    devServer: {
        // contentBase: path.join(__dirname, "templates"),
        // publicPath: "/ideas/vue-demo",
        before: function (app, server) {
            app.get("/ideas/sw-fetch-proxy.js", function (req, res) {
                res.writeHead(200, {
                    "Content-Type": "application/javascript"
                });
                const data = fs.readFileSync("templates/sw-fetch-proxy.js", {});
                res.end(data);
            });
        }
    },
    configureWebpack: {
    }
};