import { Component, Class } from '@angular/core';
import { CardConst, Card } from "./modules/card_elements";
import {log} from "util";



@Component({
    selector: 'card-app',
    styles: [`
        #card_view {
            border: solid 2px #343434;
        }

        .container {
            padding-top: 40px;
        }

        .menu-elem {
            padding-bottom: 20px;
        }

        select, input {
            height: 30px;
        }
    `],
    templateUrl: 'templates/main.html'
    // template: `<label>Введите имя:</label>
    // <input [(ngModel)]="name" placeholder="name">
    // <h1>Добро пожаловать {{name}}!</h1>`
})

export class AppComponent {

    // отображение всего листа
    card_list: Kinetic.Stage;
    // отображение выбранной карты для редактирования
    card_view: Kinetic.Stage;
    //слой фона
    background_layer: Kinetic.Layer = new Kinetic.Layer();
    // основной слой
    main_layer: Kinetic.Layer = new Kinetic.Layer();
    // слой с картами
    view_layer: Kinetic.Layer = new Kinetic.Layer();
    // слой с картами
    cards_layer: Kinetic.Layer = new Kinetic.Layer();
    // границы холста
    border_rect: Kinetic.Rect = new Kinetic.Rect({
        stroke: '#000',
        strokeWidth: CardConst.standard_border,
        x: 1,
        y: 1,
        opacity: 0.4,
        width: CardConst.standard_width - CardConst.standard_border,
        height: CardConst.standard_height - CardConst.standard_border
    });
    // лист
    list_rect: Kinetic.Rect = new Kinetic.Rect({
        stroke: '#FFAA00',
        fill: '#f5eee9',
        strokeWidth: CardConst.standard_border,
        x: 1 + CardConst.standard_border,
        y: 1 + CardConst.standard_border,
        opacity: 1,
        width: 0,
        height: 0
    });
    // карта
    card_elem:Card = new Card();

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
        if(!rows_count || !cols_count){
            // не помещается на лист
            return;
        }
        let mm_in_px:number = this.get_px_coeff();

        let current_card;
        let const_pos_x:number = 1 + CardConst.standard_border + this.padding_left*mm_in_px;
        let const_pos_y:number = 1 + CardConst.standard_border + this.padding_top*mm_in_px;
        if(vertical){
            const_pos_x += this.card_elem.kinetic.height();
        }
        let pos_x:number = const_pos_x;
        let pos_y:number = const_pos_y;
        for(let j=0; j<rows_count; j++){
            for(let i=0; i<cols_count; i++){
                if(current_card){
                    current_card = current_card.clone();
                }else{
                    current_card = this.card_elem;
                    // current_card = this.card_rect;
                }
                current_card.kinetic.x(pos_x);
                current_card.kinetic.y(pos_y);
                this.cards_layer.add(current_card.kinetic);
                if(vertical){
                    pos_x += current_card.kinetic.height();
                }else{
                    pos_x += current_card.kinetic.width();
                }
            }
            pos_x = const_pos_x;
            if(vertical){
                pos_y += current_card.kinetic.width();
            }else {
                pos_y += current_card.kinetic.height();
            }
        }
        if(side_count){
            if(vertical){
                pos_y = const_pos_y;
            }else{
                pos_y += current_card.kinetic.width();
            }

            current_card = current_card.clone();
            current_card.kinetic.rotate(-90);
            for(let i=0; i<side_count; i++){
                current_card = current_card.clone();
                current_card.kinetic.x(pos_x);
                current_card.kinetic.y(pos_y);
                this.cards_layer.add(current_card.kinetic);
                if(vertical){
                    pos_y += current_card.kinetic.height();
                }else{
                    pos_x += current_card.kinetic.height();
                }
            }
        }

    };

    // запоняем лист картами
    fill_cards = function(){
        let mm_in_px:number = this.get_px_coeff();

        // размеры области, в которой должны поместиться карты
        let list_width:number = (this.selected_width - 2*this.padding_left)*mm_in_px - 2*CardConst.standard_border;
        let list_height:number = (this.selected_height - 2*this.padding_top)*mm_in_px - 2*CardConst.standard_border;
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

        this.cards_layer.removeChildren();
        this.card_elem.set_size(card_width, card_height);

        if(horizontal_count >= vertical_count){
            // горизонтальное расположение лучше
            this.card_elem.kinetic.rotation(0);
            this.add_cards(h_rows_count, h_cols_count, h_side_count, false);
        }else{
            // вертикальное расположение лучше
            this.card_elem.kinetic.rotation(90);
            this.add_cards(v_rows_count, v_cols_count, v_side_count, true);
        }
        this.cards_layer.draw();
    };

    // обновляем лист после его изменения
    update_list = function(){
        let mm_in_px:number = this.get_px_coeff();
        if(this.selected_type.width > this.selected_type.height){
            this.list_rect.width(CardConst.standard_width - 3*CardConst.standard_border);
            mm_in_px = this.list_rect.width() / this.selected_type.width;
            this.list_rect.height(this.selected_type.height * mm_in_px);

        }else{
            this.list_rect.height(CardConst.standard_height - 3*CardConst.standard_border);
            mm_in_px = this.list_rect.height() / this.selected_type.height;
            this.list_rect.width(this.selected_type.width * mm_in_px);
        }

        this.list_rect.opacity(1);
        // main_layer.removeChildren();
        // main_layer.add(list_rect);
        this.main_layer.draw();
        this.fill_cards();
        //card_list.add(main_layer);
    };

    // выбран другой тип
    select_type = function(){
        this.selected_width = this.selected_type.width;
        this.selected_height = this.selected_type.height;

        if(!this.selected_card.width){
            this.selected_card.width = this.card_width;
        }
        if(!this.selected_card.height){
            this.selected_card.height = this.card_height;
        }
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

        //создаем объект Kinetic.Stage, в котором будут сохранятся слои создаваемого изображения листа
        this.card_list = new Kinetic.Stage({
            container: 'card_list',
            width: CardConst.standard_width,
            height: CardConst.standard_height
        });

        //создаем объект Kinetic.Stage, в котором будут сохранятся слои создаваемого изображения для управления картой
        this.card_view = new Kinetic.Stage({
            container: 'card_view',
            width: CardConst.standard_view_width + 5,
            height: CardConst.standard_view_height + 5
        });

        this.background_layer.add(this.border_rect);
        this.card_list.add(this.background_layer);
        this.card_list.add(this.main_layer);
        this.card_list.add(this.cards_layer);
        this.main_layer.add(this.list_rect);
        this.cards_layer.add(this.card_elem.kinetic);
        this.select_type();
        let current_card = this.card_elem.clone();
        let new_width:number = current_card.kinetic.width();
        let new_heihgt: number = current_card.kinetic.height();
        if(new_heihgt > new_width){
            new_width = new_width*CardConst.standard_height/new_heihgt;
            new_heihgt = CardConst.standard_height;
        }else{
            new_heihgt = new_heihgt*CardConst.standard_width/new_width;
            new_width = CardConst.standard_width;
        }
        current_card.set_size(new_width, new_heihgt);
        current_card.reload;
        this.view_layer.add(current_card.kinetic);
        this.card_view.add(this.view_layer);

    }, 100);

}

