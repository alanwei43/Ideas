/**
 * Created by Allen on 10/14/2014.
 */

var services = angular.module('app.services', []);
services.factory('ModelSvc', function(){
    var model = {};
    return model;
});
services.factory('UserSvc', function(){
    var service = {
        model :{},
        user: function(u){
            if(u){
                amplify.store('user', u);
                this.model = u;
                return u;
            }
            var user = amplify.store('user') || {name:'Click me'};
            return user;
        },
        name: function(n){
            if(n){
                //set name
                var user = this.user();
                user.name = n;
                this.user(user);
                return n;
            }
            //get name
            var user = this.user();
            return user.name;
        }
    };
    service.model = service.user();
    return service;
});
services.factory("DailySvc", function(){
    var service = {
    };
    return service;
})