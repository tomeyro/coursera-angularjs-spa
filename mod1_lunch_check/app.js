(function () {

"use strict";

var app = angular.module("LunchCheck", []);

app.controller("LunchCheckController", LunchCheckController);

LunchCheckController.$inject = ["$scope"];

function LunchCheckController($scope) {
    const msg_nothing = "Please enter data first.";
    const msg_ok = "Enjoy!";
    const msg_too_much = "Too much!";

    $scope.items = "";
    $scope.msg = "";

    $scope.checkLunch = () => {
        var items_list = splitByComma($scope.items);
        if (items_list.length == 0) {
            $scope.msg = msg_nothing;
        } else if (items_list.length <= 3) {
            $scope.msg = msg_ok;
        } else {
            $scope.msg = msg_too_much;
        }
    };

    function splitByComma(string) {
        var list = [];
        string.split(",").forEach(function(item) {
            item = item.trim().toLowerCase();
            if (item) {
                list.push(item);
            }
        });
        return list;
    }
};

})();