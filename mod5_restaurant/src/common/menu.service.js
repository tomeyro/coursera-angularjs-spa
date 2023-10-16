(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };


  service.getItem = function (category, item) {
    return $http.get(ApiPath + '/menu_items/' + category + '/menu_items/' + item + '.json').then(function (response) {
      var item = response.data;
      if (item !== null) {
        var dishObj = service.dishShortNameToData(item.short_name);
        item.categoryId = dishObj.categoryId;
        item.itemId = dishObj.itemId;
      }
      return item;
    });
  };

  service.getItemByDishShortName = function(dishShortName) {
    var dish = service.dishShortNameToData(dishShortName);
    return service.getItem(dish.categoryId, dish.itemId);
  };

  service.dishShortNameToData = function(dishShortName) {
    var dish = dishShortName.toUpperCase();
    var dishNumIdx = dish.search(/\d/);
    var dishLetters = dish.slice(0, dishNumIdx);
    var dishNumbers = dish.slice(dishNumIdx);
    return {
      categoryId: dishLetters,
      itemId: parseInt(dishNumbers) - 1,
    }
  }
}



})();
