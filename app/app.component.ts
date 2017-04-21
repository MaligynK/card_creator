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
        x: 0,
        y: 0,
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

    // отступы между картами и краем листа
    padding_top = 0;
    padding_left = 0;

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

    // коэффициент для перевода мм в пиксели
    get_px_coeff = function():number{
        if(this.selected_type.width > this.selected_type.height){
            return this.list_rect.width() / this.selected_type.width;
        }else{
            return this.list_rect.height() / this.selected_type.height;
        }
    };

    // добавляем карты на лист
    add_cards = function(rows_count:number, cols_count:number, side_count:number, vertical:boolean){
        let mm_in_px:number = this.get_px_coeff();

        let current_card:Kinetic.Rect;
        const CONST_POS_X:number = 1 + LIST_BORDER + this.padding_left*mm_in_px;
        const CONST_POS_Y:number = 1 + LIST_BORDER + this.padding_top*mm_in_px;
        let pos_x:number = CONST_POS_X;
        let pos_y:number = CONST_POS_Y;
        for(let j=0; j<rows_count; j++){
            for(let i=0; i<cols_count; i++){
                if(current_card){
                    current_card = current_card.clone();
                }else{
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
        if(side_count){
            if(vertical){
                pos_x = CONST_POS_X + current_card.width()*cols_count;
                pos_y = CONST_POS_Y + current_card.width();
                //pos_x -= current_card.width();
            }else{
                pos_y += current_card.width();
            }

            current_card = current_card.clone();
            current_card.rotate(-90);
            for(let i=0; i<side_count; i++){
                current_card = current_card.clone();
                current_card.x(pos_x);
                current_card.y(pos_y);
                this.cards_layer.add(current_card);
                if(vertical){
                    pos_y += current_card.width();
                }else{
                    pos_x += current_card.height();
                }
            }
        }

    };

    // запоняем лист картами
    fill_cards = function(){
        let mm_in_px:number = this.get_px_coeff();

        // размеры области, в которой должны поместиться карты
        let list_width:number = (this.selected_width - 2*this.padding_left)*mm_in_px - 2*LIST_BORDER;
        let list_height:number = (this.selected_height - 2*this.padding_top)*mm_in_px - 2*LIST_BORDER;
        let card_width:number = this.card_width * mm_in_px;
        let card_height:number = this.card_height * mm_in_px;


        // определяем, как расположить карты, чтобы их оказалось как можно больше

        // горизонтальное расположение
        // количество рядов
        let h_rows_count:number = Math.floor(list_height/card_height);
        // количество колонок
        let h_cols_count:number = Math.floor(list_width/card_width);
        // количество боком
        //TODO: что если ширина карты больше высоты?
        let h_side_count:number = Math.floor(list_width/card_height);
        let horizontal_count:number = h_cols_count * h_rows_count;
        if(list_height%card_height >= card_width){
            // можно разместить карты "боком"
            horizontal_count += h_side_count;
        }else{
            h_side_count = 0;
        }

        // вертикальное расположение
        // количество рядов
        let v_rows_count:number = Math.floor(list_height/card_width);
        // количество колонок
        let v_cols_count:number = Math.floor(list_width/card_height);
        // количество боком
        let v_side_count:number = Math.floor(list_height/card_height);
        let vertical_count:number = v_cols_count * v_rows_count;
        if(list_width%card_height >= card_width){
            // можно разместить карты "боком"
            vertical_count += v_side_count;
        }else{
            v_side_count = 0;
        }

        this.card_rect.opacity(1);
        this.cards_layer.removeChildren();
        if(horizontal_count >= vertical_count){
            // горизонтальное расположение лучше
            this.card_rect.width(card_width);
            this.card_rect.height(card_height);
            this.add_cards(h_rows_count, h_cols_count, h_side_count, false);
        }else{
            // вертикальное расположение лучше
            //TODO: this.card_rect.rotation(90)
            this.card_rect.width(card_height);
            this.card_rect.height(card_width);
            this.add_cards(v_rows_count, v_cols_count, v_side_count, true);
        }
        this.cards_layer.draw();
    };

    // обновляем лист после его изменения
    update_list = function(){
        let mm_in_px:number = this.get_px_coeff();
        if(this.selected_type.width > this.selected_type.height){
            this.list_rect.width(LIST_WIDTH - 3*LIST_BORDER);
            mm_in_px = this.list_rect.width() / this.selected_type.width;
            this.list_rect.height(this.selected_type.height * mm_in_px);

        }else{
            this.list_rect.height(LIST_HEIGHT - 3*LIST_BORDER);
            mm_in_px = this.list_rect.height() / this.selected_type.height;
            this.list_rect.width(this.selected_type.width * mm_in_px);
        }

        this.list_rect.opacity(1);
        // main_layer.removeChildren();
        // main_layer.add(list_rect);
        // main_layer.add(card_rect);
        this.main_layer.draw();
        this.fill_cards();
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

