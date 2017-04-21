//!!! app.component.ts
import { Component } from '@angular/core';
// https://github.com/angular/angular/tree/master/modules/playground/src/async

const LIST_WIDTH = 500;
const LIST_HEIGHT = 500;
const LIST_BORDER = 2;

// let card_list: Kinetic.Stage;
//слой фона
// let background_layer: Kinetic.Layer;
// основной слой
// let main_layer: Kinetic.Layer;
// границы холста
// let border_rect: Kinetic.Rect;
// лист
// let list_rect: Kinetic.Rect;
// карта
// let card_rect: Kinetic.Rect;



@Component({
    selector: 'card-app',
    styles: [`
        .container{padding-top: 40px;}
        .menu-elem{padding-bottom: 20px;}
        select,input{height: 30px;}
    `],
    templateUrl: 'templates/main.html'
    // template: `<label>Введите имя:</label>
    // <input [(ngModel)]="name" placeholder="name">
    // <h1>Добро пожаловать {{name}}!</h1>`
})
export class AppComponent {

    card_list: Kinetic.Stage;
    //слой фона
    background_layer: Kinetic.Layer = new Kinetic.Layer();
    // основной слой
    main_layer: Kinetic.Layer = new Kinetic.Layer();
    // слой с картами
    cards_layer: Kinetic.Layer = new Kinetic.Layer();
    // границы холста
    border_rect: Kinetic.Rect = new Kinetic.Rect({
        stroke: '#000',
        strokeWidth: LIST_BORDER,
        x: 1,
        y: 1,
        opacity: 0.4,
        width: LIST_WIDTH - LIST_BORDER,
        height: LIST_HEIGHT - LIST_BORDER
    });
    // лист
    list_rect: Kinetic.Rect = new Kinetic.Rect({
        stroke: '#FFAA00',
        fill: '#f5eee9',
        strokeWidth: LIST_BORDER,
        x: 1 + LIST_BORDER,
        y: 1 + LIST_BORDER,
        opacity: 1,
        width: 0,
        height: 0
    });
    // карта
    card_rect: Kinetic.Rect = new Kinetic.Rect({
        stroke: '#00AAFF',
        strokeWidth: LIST_BORDER,
        x: 1 + LIST_BORDER + this.padding_width,
        y: 1 + LIST_BORDER + this.padding_height,
        opacity: 0,
        width: 0,
        height: 0
    });

    lists_types: any[] = [
        {name: 'Свой', width: 0, height: 0},
        {name: 'A0', width: 841, height: 1189},
        {name: 'A1', width: 594, height: 841},
        {name: 'A2', width: 420, height: 524},
        {name: 'A3', width: 297, height: 420},
        {name: 'A4', width: 210, height: 297},
        {name: 'A5', width: 148, height: 210}
    ];
    selected_type = this.lists_types[5];

    padding_height = 0;
    padding_width = 0;

    cards_types: any[] = [
        {name: 'Свой', width: 0, height: 0},
        {name: 'Аркхем мини', width: 43, height: 61},
        {name: 'Аркхем', width: 57, height: 89},
        {name: 'Колонизаторы', width: 44, height: 67},
        {name: 'Билет на Поезд', width: 56, height: 87},
        {name: 'Magic: The Gathering', width: 63, height: 88},
        {name: 'Диксит', width: 78, height: 120}
    ];
    selected_card = this.cards_types[1];

    update_list = function(){

        let mm_in_px:number = 0;
        if(this.selected_type.width > this.selected_type.height){
            this.list_rect.width(LIST_WIDTH - 3*LIST_BORDER);
            mm_in_px = this.list_rect.width() / this.selected_type.width;
            this.list_rect.height(this.selected_type.height * mm_in_px);

        }else{
            this.list_rect.height(LIST_HEIGHT - 3*LIST_BORDER);
            mm_in_px = this.list_rect.height() / this.selected_type.height;
            this.list_rect.width(this.selected_type.width * mm_in_px);
        }

        this.card_rect.x(1 + LIST_BORDER + this.padding_width);
        this.card_rect.y(1 + LIST_BORDER + this.padding_height);
        this.card_rect.width(this.selected_card.width * mm_in_px);
        this.card_rect.height(this.selected_card.height * mm_in_px);

        this.card_rect.opacity(1);
        this.list_rect.opacity(1);
        // main_layer.removeChildren();
        // main_layer.add(list_rect);
        // main_layer.add(card_rect);
        this.main_layer.draw();
        this.cards_layer.draw();
        //card_list.add(main_layer);

    };

    // выбран другой тип
    select_type = function(){
        this.selected_width = this.selected_type.width;
        this.selected_height = this.selected_type.height;
        this.card_width = this.selected_card.width;
        this.card_height = this.selected_card.height;
        this.update_list();
    };

    // изменена ширина или высота листа ("свой тип")
    custom_list = function(){
        this.selected_type = this.lists_types[0];
        this.selected_type.width = this.selected_width;
        this.selected_type.height = this.selected_height;
        this.update_list();
    };

    // выбран другой тип карты
    select_card = function(){
        this.card_width = this.selected_card.width;
        this.card_height = this.selected_card.height;
        this.update_list();
    };

    // изменена ширина или высота карты ("свой тип")
    custom_card = function(){
        this.selected_card = this.cards_types[0];
        this.selected_card.width = this.card_width;
        this.selected_card.height = this.card_height;
        this.update_list();
    };

    timeoutId = setTimeout(() =>{

        //создаем объект Kinetic.Stage в который будут сохранятся слои создаваемого изображения
        this.card_list = new Kinetic.Stage({
            container: 'card_list',
            width: LIST_WIDTH,
            height: LIST_HEIGHT
        });

        this.background_layer.add(this.border_rect);
        this.card_list.add(this.background_layer);
        this.card_list.add(this.main_layer);
        this.card_list.add(this.cards_layer);
        this.main_layer.add(this.list_rect);
        this.cards_layer.add(this.card_rect);
        this.select_type();

        // var imageObj = angular.element(new Image());
        // //когда изображение загрузится, добавим его в список к остальным
        // imageObj.bind('load', function () {
        //     Images[name] = imageObj[0];
        //
        // });
        // imageObj[0].src = url;

        // //изображение доски созданное ранее
        // var squares = new Kinetic.Image({
        //     image: Images['board'],
        //     width: boardValue,
        //     height: boardValue,
        //     x: 0,
        //     y: 0,
        //     draggable: false
        // });
        // layer.add(squares);
    }, 100);



}

