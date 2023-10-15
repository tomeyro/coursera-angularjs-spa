(function() {
"use strict";

angular.module("MenuData")
.service("MenuService", MenuService)
.constant("BaseApiURL", "https://coursera-jhu-default-rtdb.firebaseio.com")
;

MenuService.$inject = ["$http", "BaseApiURL"];
function MenuService($http, BaseApiURL) {
    var service = this;

    service.getCategories = function() {
        return $http.get(BaseApiURL + "/categories.json")
            .then(function(response) {
                return response.data;
            })
            .catch(function() {
                console.error("There was an error with the API response.");
                return [];
            });
    };

    service.getCategoryData = function(categoryId) {
        return $http.get(BaseApiURL + "/menu_items/" + categoryId + ".json")
            .then(function(response) {
                return response.data;
            })
            .catch(function() {
                console.error("There was an error with the API response.");
                return {};
            });
    };
}

})();