//declare var Kinetic: any;
declare namespace Kinetic{
    interface Stage {
        add(value: any): void,
    }
    interface Group {
        removeChildren(): void,
        add(value: any): void,
        width(value: number): void,
        height(value: number): void,
        clone(): void,
    }
    interface Layer{
        add(value: any): void,
        width(value: number): void,
        height(value: number): void,
    }
    interface Rect{
        width(value: number): void,
        height(value: number): void,
    }
    interface Text{
        width(value: number): void,
        height(value: number): void,
    }
    interface Image{
        width(value: number): void,
        height(value: number): void,
    }

}