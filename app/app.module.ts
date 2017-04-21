//!!! https://metanit.com/web/angular2/2.2.php
import { NgModule }      from '@angular/core';
// модуль, необходимый для работы с браузером
import { BrowserModule } from '@angular/platform-browser';
// модуль, необходимый для работы с формами html и, в частности, с элементами input
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';

@NgModule({
    //declarations: классы представлений (view classes), которые принадлежат модулю. Angular имеет три типа классов представлений: компоненты (components), директивы (directives), каналы (pipes)
    declarations: [ AppComponent ],
    //exports: набор классов представлений, которые должны использоваться в шаблонах компонентов из других модулей

    // imports: другие модули, классы которых необходимы для шаблонов компонентов из текущего модуля
    imports: [ BrowserModule, FormsModule ],
    //providers: классы, создающие сервисы, используемые модулем

    // корневой компонент, который вызывается по умолчанию при загрузке приложения
    bootstrap: [ AppComponent ]
})
export class AppModule { }
