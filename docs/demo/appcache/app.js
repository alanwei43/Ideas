(function () {
    console.log("app.js");
    var name = document.getElementById("name");
    name.innerHTML = "<b>Alan Wei.<b/>";


    window.applicationCache.addEventListener('updateready', function () {
        alert("status: ", window.applicationCache.status);
        window.applicationCache.update();
    });
    window.addEventListener("offline", function () {
        alert("network is offline.");
    }, false);
    window.addEventListener("online", function () {
        alert("network is online.");
    }, false);
})();
