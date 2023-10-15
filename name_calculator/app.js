(function () {

"use strict";

var app = angular.module("myFirstApp", []);

app.controller("NameCalculatorController", function($scope) {
    $scope.name = "";
    $scope.nameValue = 0;

    $scope.updateNameValue = () => {
        $scope.nameValue = getStringCharCodeValue($scope.name);
    };

    function getStringCharCodeValue(string) {
        var value = 0;
        for (var idx in string) {
            value += string.charCodeAt(idx);
        }
        return value;
    }
});

})();