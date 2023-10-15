(function () {

"use strict";

angular.module("ShoppingListCheckOff", [])
.controller("ItemAdderController", ItemAdderController)
.controller("ToBuyController", ToBuyController)
.controller("AlreadyBoughtController", AlreadyBoughtController)
.service("ShoppingListCheckOffService", ShoppingListCheckOffService);

ItemAdderController.$inject = ["ShoppingListCheckOffService"];
function ItemAdderController(ShoppingListCheckOffService) {
    var itemAdderCtrl = this;
    itemAdderCtrl.name = "";
    itemAdderCtrl.quantity = 0;

    itemAdderCtrl.addItem = function() {
        if (itemAdderCtrl.name && itemAdderCtrl.quantity) {
            ShoppingListCheckOffService.addItem(itemAdderCtrl.name, itemAdderCtrl.quantity);
            itemAdderCtrl.name = "";
            itemAdderCtrl.quantity = 0;
        }
    };
};

ToBuyController.$inject = ["ShoppingListCheckOffService"];
function ToBuyController(ShoppingListCheckOffService) {
    var toBuyCtrl = this;
    toBuyCtrl.items = ShoppingListCheckOffService.getToBuy();

    toBuyCtrl.checkItem = function(index) {
        ShoppingListCheckOffService.checkItem(index);
    }
};

AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtCtrl = this;
    boughtCtrl.items = ShoppingListCheckOffService.getBought();

    boughtCtrl.removeItem = function(index) {
        ShoppingListCheckOffService.removeItem(index);
    }
};

function ShoppingListCheckOffService() {
    var list = this;

    var toBuy = [
        {
            name: "apples",
            quantity: 6,
        },
        {
            name: "bananas",
            quantity: 4,
        },
        {
            name: "strawberries",
            quantity: 15,
        },
        {
            name: "pineapples",
            quantity: 2,
        },
        {
            name: "peaches",
            quantity: 5,
        },
    ];

    var bought = [];

    list.addItem = function(name, quantity) {
        toBuy.push({
            name: name,
            quantity: quantity,
        });
    }

    list.checkItem = function(idx) {
        bought.push(toBuy.splice(idx, 1)[0]);
    };

    list.removeItem = function(idx) {
        bought.splice(idx, 1);
    };

    list.getToBuy = function() {
        return toBuy;
    };

    list.getBought = function() {
        return bought;
    };
}

})();