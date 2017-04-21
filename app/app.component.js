"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var LIST_WIDTH = 500;
var LIST_HEIGHT = 500;
var LIST_BORDER = 2;
var AppComponent = (function () {
    function AppComponent() {
        var _this = this;
        this.background_layer = new Kinetic.Layer();
        this.main_layer = new Kinetic.Layer();
        this.cards_layer = new Kinetic.Layer();
        this.border_rect = new Kinetic.Rect({
            stroke: '#000',
            strokeWidth: LIST_BORDER,
            x: 1,
            y: 1,
            opacity: 0.4,
            width: LIST_WIDTH - LIST_BORDER,
            height: LIST_HEIGHT - LIST_BORDER
        });
        this.list_rect = new Kinetic.Rect({
            stroke: '#FFAA00',
            fill: '#f5eee9',
            strokeWidth: LIST_BORDER,
            x: 1 + LIST_BORDER,
            y: 1 + LIST_BORDER,
            opacity: 1,
            width: 0,
            height: 0
        });
        this.card_rect = new Kinetic.Rect({
            stroke: '#00AAFF',
            strokeWidth: LIST_BORDER,
            x: 1 + LIST_BORDER + this.padding_width,
            y: 1 + LIST_BORDER + this.padding_height,
            opacity: 0,
            width: 0,
            height: 0
        });
        this.lists_types = [
            { name: 'Свой', width: 0, height: 0 },
            { name: 'A0', width: 841, height: 1189 },
            { name: 'A1', width: 594, height: 841 },
            { name: 'A2', width: 420, height: 524 },
            { name: 'A3', width: 297, height: 420 },
            { name: 'A4', width: 210, height: 297 },
            { name: 'A5', width: 148, height: 210 }
        ];
        this.selected_type = this.lists_types[5];
        this.padding_height = 0;
        this.padding_width = 0;
        this.cards_types = [
            { name: 'Свой', width: 0, height: 0 },
            { name: 'Аркхем мини', width: 43, height: 61 },
            { name: 'Аркхем', width: 57, height: 89 },
            { name: 'Колонизаторы', width: 44, height: 67 },
            { name: 'Билет на Поезд', width: 56, height: 87 },
            { name: 'Magic: The Gathering', width: 63, height: 88 },
            { name: 'Диксит', width: 78, height: 120 }
        ];
        this.selected_card = this.cards_types[1];
        this.update_list = function () {
            var mm_in_px = 0;
            if (this.selected_type.width > this.selected_type.height) {
                this.list_rect.width(LIST_WIDTH - 3 * LIST_BORDER);
                mm_in_px = this.list_rect.width() / this.selected_type.width;
                this.list_rect.height(this.selected_type.height * mm_in_px);
            }
            else {
                this.list_rect.height(LIST_HEIGHT - 3 * LIST_BORDER);
                mm_in_px = this.list_rect.height() / this.selected_type.height;
                this.list_rect.width(this.selected_type.width * mm_in_px);
            }
            this.card_rect.x(1 + LIST_BORDER + this.padding_width);
            this.card_rect.y(1 + LIST_BORDER + this.padding_height);
            this.card_rect.width(this.selected_card.width * mm_in_px);
            this.card_rect.height(this.selected_card.height * mm_in_px);
            this.card_rect.opacity(1);
            this.list_rect.opacity(1);
            this.main_layer.draw();
            this.cards_layer.draw();
        };
        this.select_type = function () {
            this.selected_width = this.selected_type.width;
            this.selected_height = this.selected_type.height;
            this.card_width = this.selected_card.width;
            this.card_height = this.selected_card.height;
            this.update_list();
        };
        this.custom_list = function () {
            this.selected_type = this.lists_types[0];
            this.selected_type.width = this.selected_width;
            this.selected_type.height = this.selected_height;
            this.update_list();
        };
        this.select_card = function () {
            this.card_width = this.selected_card.width;
            this.card_height = this.selected_card.height;
            this.update_list();
        };
        this.custom_card = function () {
            this.selected_card = this.cards_types[0];
            this.selected_card.width = this.card_width;
            this.selected_card.height = this.card_height;
            this.update_list();
        };
        this.timeoutId = setTimeout(function () {
            _this.card_list = new Kinetic.Stage({
                container: 'card_list',
                width: LIST_WIDTH,
                height: LIST_HEIGHT
            });
            _this.background_layer.add(_this.border_rect);
            _this.card_list.add(_this.background_layer);
            _this.card_list.add(_this.main_layer);
            _this.card_list.add(_this.cards_layer);
            _this.main_layer.add(_this.list_rect);
            _this.cards_layer.add(_this.card_rect);
            _this.select_type();
        }, 100);
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'card-app',
        styles: ["\n        .container{padding-top: 40px;}\n        .menu-elem{padding-bottom: 20px;}\n        select,input{height: 30px;}\n    "],
        templateUrl: 'templates/main.html'
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map