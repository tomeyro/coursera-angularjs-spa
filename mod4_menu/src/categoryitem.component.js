(function() {
"use strict";

angular.module("MenuApp")
.component("categoryItem", {
    templateUrl: "templates/categoryItem.html",
    bindings: {
        category: "<",
        item: "<",
    },
})
;

})();