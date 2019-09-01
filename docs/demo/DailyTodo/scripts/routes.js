/**
 * Created by Allen on 10/14/2014.
 */

var routes = angular.module('app.routes', ['ngRoute']);
routes.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'HomeCtrl',
            templateUrl: 'partials/home.html'
        })
        .when('/list', {
            controller:'ListCtrl',
            templateUrl:'partials/list.html'
        })
        .when('/insert', {
            controller:'InsertCtrl',
            templateUrl:'partials/insert.html'
        })
        .when('/edit/:index', {
            controller:'EditCtrl',
            templateUrl:'partials/edit.html'
        })
        .when('/plains', {
            controller:'PlainsCtrl',
            templateUrl:'partials/plains.html'
        })
        .otherwise({
            redirectTo:'/'
        });
});