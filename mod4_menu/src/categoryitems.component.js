(function() {
"use strict";

angular.module("MenuApp")
.component("categoryItems", {
    templateUrl: "templates/categoryItems.html",
    bindings: {
        categoryData: "<",
    },
})
;

})();