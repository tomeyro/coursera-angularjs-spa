(function () {

"use strict";

angular.module("NarrowItDownApp", [])
.controller("NarrowItDownController", NarrowItDownController)
.service("MenuSearchService", MenuSearchService)
.constant("ApiBaseURL", "https://coursera-jhu-default-rtdb.firebaseio.com")
.directive("foundItems", FoundItemsDirective)
;

function FoundItemsDirective() {
    var ddo = {
        restrict: "E",
        templateUrl: "foundItems.html",
        scope: {
            found: "<",
            onRemove: "&",
        }
    };
    return ddo;
}

NarrowItDownController.$inject = ["MenuSearchService"]
function NarrowItDownController(MenuSearchService) {
    var ctrl = this;
    ctrl.search = "";
    ctrl.searching = false;
    ctrl.searchDone = false;
    ctrl.results = [];

    ctrl.narrowItDown = function() {
        if (ctrl.search) {
            ctrl.searching = true;
            MenuSearchService.getMatchedMenuItems(ctrl.search)
            .then(function(results) {
                ctrl.results = results || [];
                ctrl.searching = false;
                ctrl.searchDone = true;
            });
        } else {
            ctrl.results = [];
            ctrl.searchDone = true;
        }
    };

    ctrl.removeResult = function(index) {
        ctrl.results.splice(index, 1);
    }
}

MenuSearchService.$inject = ["$http", "ApiBaseURL"];
function MenuSearchService($http, ApiBaseURL) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
        return $http.get(ApiBaseURL + "/menu_items.json")
        .then(function (response) {
            var results = [];
            var categories = response.data;
            for (var category_name in categories) {
                var category = categories[category_name];
                category.menu_items.forEach(function(item) {
                    if (item.description.toLowerCase().search(searchTerm.toLowerCase()) > -1) {
                        results.push(item);
                    }
                });
            }
            return results;
        })
        .catch(function (error) {
            console.error("Something went wrong.", error);
            return [];
        });
    };
}

})();