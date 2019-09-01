
define("app", ["require", "module", "config", "modules/home"], function(require, module, config, h){
	module.exports = {
		start: function () {
			console.log("Home: ", h);
		}
	};
});