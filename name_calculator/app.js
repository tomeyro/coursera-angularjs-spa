(function () {

"use strict";

var app = angular.module("NameCalculator", []);

app.controller("NameCalculatorController", NameCalculatorController);

NameCalculatorController.$inject = ["$scope"];

function NameCalculatorController($scope) {
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
};

})();