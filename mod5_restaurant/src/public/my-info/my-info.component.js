(function() {
"use strict";

angular.module('public')
.component("myInfoComponent", {
    templateUrl: "src/public/my-info/my-info.html",
    controller: MyInfoComponentController,
});

MyInfoComponentController.$inject = ["MenuService", "UserService"];
function MyInfoComponentController(MenuService, UserService) {
    var ctrl = this;

    ctrl.user = UserService.getUser();
    ctrl.dish;

    if (ctrl.user && ctrl.user.favoriteDish) {
        MenuService.getItemByDishShortName(ctrl.user.favoriteDish)
        .then(function(dish) {
            if (dish !== null) {
                ctrl.dish = dish;
            }
        });
    }
};

})();