"use strict";
var CardConst = (function () {
    function CardConst() {
    }
    Object.defineProperty(CardConst, "standard_width", {
        get: function () { return 500; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardConst, "standard_height", {
        get: function () { return 500; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardConst, "standard_view_width", {
        get: function () { return 500; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardConst, "standard_view_height", {
        get: function () { return 500; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardConst, "standard_border", {
        get: function () { return 2; },
        enumerable: true,
        configurable: true
    });
    return CardConst;
}());
exports.CardConst = CardConst;
var Card = (function () {
    function Card() {
        this.kinetic = new Kinetic.Group();
        this.elements = [
            {
                type: 1,
                w_size: 100,
                h_size: 100,
                x: 0,
                y: 0,
                kinetic: new Kinetic.Rect({
                    stroke: '#00AAFF',
                    strokeWidth: CardConst.standard_border,
                    x: 0,
                    y: 0,
                    opacity: 1,
                    width: 0,
                    height: 0
                }),
                desc: 'Рамка'
            },
            {
                type: 2,
                size: 40,
                fill: '#FFFFFF',
                kinetic: new Kinetic.Text({
                    fontSize: 30,
                    text: 'E',
                    fill: '#127351',
                    x: 0,
                    y: 0
                }),
                desc: 'Текст'
            },
            {
                type: 3,
                w_size: 35,
                h_size: 40,
                x: 0,
                y: 0,
                desc: 'Портрет',
                url: 'static/images/character_front_1.jpg',
            }
        ];
        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].type == 3) {
                var image_obj = new Image();
                image_obj.src = this.elements[i].url;
                this.elements[i].kinetic = new Kinetic.Image({
                    x: this.elements[i].x,
                    y: this.elements[i].y,
                    image: image_obj,
                    width: this.elements[i].w_size,
                    height: this.elements[i].h_size
                });
            }
        }
    }
    Card.prototype.reload = function () {
        this.kinetic.removeChildren();
        for (var i = 0; i < this.elements.length; i++) {
            this.kinetic.add(this.elements[i].kinetic);
        }
    };
    ;
    Card.prototype.set_size = function (width, height) {
        this.kinetic.width(width);
        this.kinetic.height(height);
        for (var i = 0; i < this.elements.length; i++) {
            if (!this.elements[i].kinetic) {
                continue;
            }
            if (this.elements[i].type == 3) {
                this.elements[i].kinetic.width(width * this.elements[i].w_size / 100);
                this.elements[i].kinetic.height(height * this.elements[i].h_size / 100);
                this.elements[i].kinetic.x(width * this.elements[i].x / 100);
                this.elements[i].kinetic.y(height * this.elements[i].y / 100);
                continue;
            }
            if (this.elements[i].type == 1) {
                this.elements[i].kinetic.width(width * this.elements[i].w_size / 100);
                this.elements[i].kinetic.height(height * this.elements[i].h_size / 100);
                this.elements[i].kinetic.x(this.elements[i].x * width / 100);
                this.elements[i].kinetic.y(this.elements[i].y * height / 100);
                continue;
            }
            this.elements[i].kinetic.x(0);
            this.elements[i].kinetic.y(0);
        }
        this.reload();
    };
    ;
    Card.prototype.clone = function () {
        var clone_obj = Object.create(this);
        clone_obj.elements = [];
        for (var i = 0; i < this.elements.length; i++) {
            var clone_elem = Object.create(this.elements[i]);
            clone_elem.kinetic = this.elements[i].kinetic.clone();
            clone_obj.elements.push(clone_elem);
        }
        clone_obj.kinetic = this.kinetic.clone();
        clone_obj.reload();
        return clone_obj;
    };
    ;
    ;
    return Card;
}());
exports.Card = Card;
//# sourceMappingURL=card_elements.js.map