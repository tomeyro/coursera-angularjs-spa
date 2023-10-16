(function() {
"use strict";

angular.module('public')
.component("signUpComponent", {
    templateUrl: "src/public/sign-up/sign-up.html",
    controller: SignUpComponentController,
});

SignUpComponentController.$inject = ["UserService"];
function SignUpComponentController(UserService) {
    var ctrl = this;

    ctrl.success = false;

    var user = UserService.getUser();
    for (var key in user) {
        ctrl[key] = user[key];
    }

    ctrl.onSubmit = function() {
        UserService.registerUser(
            ctrl.name,
            ctrl.lastName,
            ctrl.email,
            ctrl.phone,
            ctrl.favoriteDish,
        );
        ctrl.success = true;
    };
};

})();