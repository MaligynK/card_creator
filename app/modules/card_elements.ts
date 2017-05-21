/**
 * Created by Kain on 21.05.2017.
 */

export class CardConst {
    // константы
    public static get standard_width():number { return 500; }
    public static get standard_height():number { return 500; }
    public static get standard_border():number { return 2; }
}


export class Card {
    kinetic: Kinetic.Group;
    reload():void {
        this.kinetic.removeChildren();
        for(let i=0; i<this.elements.length; i++){
            this.kinetic.add(this.elements[i].kinetic);
        }

        // this.kinetic.add(new Kinetic.Rect({
        //     stroke: '#00AAFF',
        //     strokeWidth: LIST_BORDER,
        //     x: 0,
        //     y: 0,
        //     opacity: 1,
        //     width: 30,
        //     height: 30
        // });

    };
    set_size(width:number, height:number):void {
        this.kinetic.width(width);
        this.kinetic.height(height);
        for(let i=0; i<this.elements.length; i++){
            if(!this.elements[i].kinetic){continue;}
            if(this.elements[i].type == 1){
                // рамка карты
                this.elements[i].kinetic.width(width*this.elements[i].w_size/100);
                this.elements[i].kinetic.height(height*this.elements[i].h_size/100);
                this.elements[i].kinetic.x(this.elements[i].x*width/100);
                this.elements[i].kinetic.y(this.elements[i].y*height/100);
            }else{
                // this.elements[i].kinetic.width(width*30/100);
                // this.elements[i].kinetic.height(height*30/100);
                this.elements[i].kinetic.x(0);
                this.elements[i].kinetic.y(0);

            }
        }
        this.reload();
    };
    clone():any {
        let clone_obj:any = Object.create(this);
        clone_obj.elements = [];
        for(let i=0; i<this.elements.length; i++){
            let clone_elem:any = Object.create(this.elements[i]);
            clone_elem.kinetic = this.elements[i].kinetic.clone();
            clone_obj.elements.push(clone_elem);
        }
        clone_obj.kinetic = this.kinetic.clone();
        clone_obj.reload();
        return clone_obj;
    };
    private elements: any[];
    constructor(){
        this.kinetic = new Kinetic.Group();
        this.elements = [
            {
                type: 1, // рамка
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
                url: 'static/images/character_front_1.jpg',
            }
        ];

        for(let i=0; i<this.elements.length; i++){
            if(this.elements[i].type == 3){
                var image_obj = new Image();
                image_obj.src = this.elements[i].url;
                this.elements[i].kinetic = new Kinetic.Image({
                    x: 0,
                    y: 0,
                    image: image_obj,
                    width: 30,
                    height: 50
                });
            }
        }

    };
}

