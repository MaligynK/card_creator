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
            x: 0,
            y: 0,
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
        this.padding_top = 0;
        this.padding_left = 0;
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
        this.get_px_coeff = function () {
            if (this.selected_type.width > this.selected_type.height) {
                return this.list_rect.width() / this.selected_type.width;
            }
            else {
                return this.list_rect.height() / this.selected_type.height;
            }
        };
        this.add_cards = function (rows_count, cols_count, side_count, vertical) {
            var mm_in_px = this.get_px_coeff();
            var current_card;
            var CONST_POS_X = 1 + LIST_BORDER + this.padding_left * mm_in_px;
            var CONST_POS_Y = 1 + LIST_BORDER + this.padding_top * mm_in_px;
            var pos_x = CONST_POS_X;
            var pos_y = CONST_POS_Y;
            for (var j = 0; j < rows_count; j++) {
                for (var i = 0; i < cols_count; i++) {
                    if (current_card) {
                        current_card = current_card.clone();
                    }
                    else {
                        current_card = this.card_rect;
                    }
                    current_card.x(pos_x);
                    current_card.y(pos_y);
                    this.cards_layer.add(current_card);
                    pos_x += current_card.width();
                }
                pos_x = CONST_POS_X;
                pos_y += current_card.height();
            }
            if (side_count) {
                if (vertical) {
                    pos_x = CONST_POS_X + current_card.width() * cols_count;
                    pos_y = CONST_POS_Y + current_card.width();
                }
                else {
                    pos_y += current_card.width();
                }
                current_card = current_card.clone();
                current_card.rotate(-90);
                for (var i = 0; i < side_count; i++) {
                    current_card = current_card.clone();
                    current_card.x(pos_x);
                    current_card.y(pos_y);
                    this.cards_layer.add(current_card);
                    if (vertical) {
                        pos_y += current_card.width();
                    }
                    else {
                        pos_x += current_card.height();
                    }
                }
            }
        };
        this.fill_cards = function () {
            var mm_in_px = this.get_px_coeff();
            var list_width = (this.selected_width - 2 * this.padding_left) * mm_in_px - 2 * LIST_BORDER;
            var list_height = (this.selected_height - 2 * this.padding_top) * mm_in_px - 2 * LIST_BORDER;
            var card_width = this.card_width * mm_in_px;
            var card_height = this.card_height * mm_in_px;
            var h_rows_count = Math.floor(list_height / card_height);
            var h_cols_count = Math.floor(list_width / card_width);
            var h_side_count = Math.floor(list_width / card_height);
            var horizontal_count = h_cols_count * h_rows_count;
            if (list_height % card_height >= card_width) {
                horizontal_count += h_side_count;
            }
            else {
                h_side_count = 0;
            }
            var v_rows_count = Math.floor(list_height / card_width);
            var v_cols_count = Math.floor(list_width / card_height);
            var v_side_count = Math.floor(list_height / card_height);
            var vertical_count = v_cols_count * v_rows_count;
            if (list_width % card_height >= card_width) {
                vertical_count += v_side_count;
            }
            else {
                v_side_count = 0;
            }
            this.card_rect.opacity(1);
            this.cards_layer.removeChildren();
            if (horizontal_count >= vertical_count) {
                this.card_rect.width(card_width);
                this.card_rect.height(card_height);
                this.add_cards(h_rows_count, h_cols_count, h_side_count, false);
            }
            else {
                this.card_rect.width(card_height);
                this.card_rect.height(card_width);
                this.add_cards(v_rows_count, v_cols_count, v_side_count, true);
            }
            this.cards_layer.draw();
        };
        this.update_list = function () {
            var mm_in_px = this.get_px_coeff();
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
            this.list_rect.opacity(1);
            this.main_layer.draw();
            this.fill_cards();
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