/**
 * Created by Allen on 10/14/2014.
 */

var controllers = angular.module('app.controllers', []);

controllers.controller('BodyCtrl', function ($scope, $rootScope, $routeParams, $location, UserSvc) {
    console.log($location.path());
});
controllers.controller('UserNameCtrl', function ($scope, UserSvc) {
    $scope.user = UserSvc.model;
    $scope.modifing = false;
    if (!$scope.user.name) {
        $scope.modifing = true;
    }
    $scope.modifyName = function () {
        $scope.modifing = true;
    };
    $scope.submitName = function () {
        $scope.modifing = false;
        UserSvc.name($scope.user.name);
    }
});
controllers.controller('HomeCtrl', function ($scope) {
    $scope.task = {
        total: DailyTodo.Model.all().length
    };
});

controllers.controller('ListCtrl', function ($scope) {
    $scope.tasks = DailyTodo.Model.all();
    $scope.delete = function (index) {
        $scope.tasks.splice(index, 1);
        DailyTodo.Model.all($scope.tasks);
    };
});

controllers.controller('InsertCtrl', function ($scope, $location) {
    $scope.task = {
        name: '',
        priority: 1,
        content: '',
        createDate: (new Date()).toISOString()
    };
    $scope.submit = function () {
        $scope.task.createDate = (new Date()).toISOString();
        DailyTodo.Model.insert($scope.task);
        $location.path('/list');
    };
});
controllers.controller('EditCtrl', function ($scope, $location, $routeParams) {
    var index = $routeParams.index;
    $scope.task = DailyTodo.Model.index($routeParams.index);
    $scope.submit = function () {
        DailyTodo.Model.update($scope.task);
        $location.path('/list');
    };
});
controllers.controller('PlainsCtrl', function($scope){

});
