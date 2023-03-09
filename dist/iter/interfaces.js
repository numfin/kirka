export var Order;
(function (Order) {
    Order[Order["Greater"] = 1] = "Greater";
    Order[Order["Equal"] = 0] = "Equal";
    Order[Order["Less"] = -1] = "Less";
})(Order || (Order = {}));
