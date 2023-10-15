(function () {

"use strict";

var app = angular.module("myFirstApp", []);

app.controller("MyFirstController", function($scope) {
    $scope.name = "Pedro";

    $scope.sayHi = function() {
        return "Hello, " + ($scope.name || "You") + "!";
    }
})

})();