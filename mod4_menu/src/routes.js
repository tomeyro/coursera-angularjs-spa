(function () {
"use strict";

angular.module("MenuApp")
.config(RoutesConfig)
;

RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("404");
    $urlRouterProvider.when("", "/");

    $stateProvider

    .state({
        name: "home",
        url: "/",
        templateUrl: "templates/home.html",
    })

    .state({
        name: "categories",
        url: "/categories",
        component: "categories",
        resolve: {
            categories: [
                "MenuService",
                function(MenuService) {
                    return MenuService.getCategories();
                }
            ],
        }
    })

    .state({
        name: "categories.items",
        url: "/{categoryId}",
        component: "categoryItems",
        resolve: {
            categoryData: [
                "$stateParams",
                "MenuService",
                function($stateParams, MenuService) {
                    return MenuService.getCategoryData($stateParams.categoryId);
                }
            ],
        }
    })

    .state({
        name: "categories.items.item",
        url: "/{itemId}",
        component: "categoryItem",
        resolve: {
            item: [
                "$stateParams",
                "categoryData",
                function($stateParams, categoryData) {
                    var foundItem = categoryData.menu_items.filter(function(item) {
                        return item.short_name == $stateParams.itemId;
                    })
                    if (foundItem) {
                        foundItem[0].category = categoryData.category;
                        return foundItem[0];
                    }
                    return {};
                }
            ],
        }
    })

    .state({
        name: "404",
        url: "/404",
        templateUrl: "templates/404.html",
    })

    ;
}

})();