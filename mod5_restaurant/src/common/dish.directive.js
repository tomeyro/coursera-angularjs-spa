(function() {
"use strict";

angular.module("common")
.directive("dish", DishDirectiveFactory)
;

DishDirectiveFactory.$inject = ["$q", "MenuService"];
function DishDirectiveFactory($q, MenuService) {
    var ddo = {
        require: "ngModel",
        restrict: "A",
        link: function(scope, el, attrs, ctrl) {
            ctrl.$asyncValidators.dish = function(modelValue, viewValue) {
                var def = $q.defer();
                MenuService.getItemByDishShortName(modelValue)
                .then(function(item) {
                    if (item === null) {
                        def.reject();
                    } else {
                        def.resolve();
                    }
                })
                .then(function() {
                    def.reject();
                });
                return def.promise;
            };
        },
    };
    return ddo;
}

})();