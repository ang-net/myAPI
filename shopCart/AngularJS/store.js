function store() {
    this.products = [
        new product("APL", "Apple", "iPhone", 50000),
        new product("NOK", "Nokia", "Lumia 720", 17000),
        new product("BLA", "BlackBerry", "Z2", 32000),
        new product("SAM", "Samsung", "S6", 35000),
        new product("XOL", "Xolo", "Speed", 10000),
        new product("LEN", "Lenovo", "Vibe P1", 16000)
        
    ];
}

store.prototype.getProduct = function (code) {
    for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].code == code)
            return this.products[i];
    }
    return null;
}