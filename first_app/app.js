(function () {

"use strict";

var app = angular.module("myFirstApp", []);

app.controller("MyFirstController", MyFirstController);

MyFirstController.$inject = ["$scope"];

function MyFirstController($scope) {
    $scope.name = "Pedro";

    $scope.sayHi = function() {
        return "Hello, " + ($scope.name || "You") + "!";
    }
};

})();