(function() {
"use strict";

angular.module("common")
.service("UserService", UserService);

UserService.$inject = ["$http"];
function UserService($http) {
    var service = this;

    var user;

    service.registerUser = function(name, lastName, email, phone, favoriteDish) {
        user = {};
        user.name = name;
        user.lastName = lastName;
        user.email = email;
        user.phone = phone;
        user.favoriteDish = favoriteDish;
    };

    service.getUser = function() {
        return user;
    };
}

})();