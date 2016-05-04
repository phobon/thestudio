import { IShellComponent, ShellComponent } from "./framework";

export interface INavigation extends IShellComponent {
    hilight(): JQueryPromise<any>;
    lolight(): JQueryPromise<any>;    
}

export class Navigation extends ShellComponent implements INavigation {
    constructor() {
        super("navigation");
    }
    
    hide(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;
    }
    
    show(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;     
    }
    
    layout(container: JQuery) {
        this.site = $(`<section id='${this.id}' class='o-0 f w-100 fixed'/>`).appendTo(container);
        
        var title = $("<ul/>").appendTo(this.site);
        this.site.append("<div class='f'/>");
        var menu = $("<ul/>").appendTo(this.site);
    }
    
    hilight(): JQueryPromise<any> {        
        var d = $.Deferred<any>();
        d.resolve();
        return d;        
    }
    
    lolight(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;        
    }
}

export class Brand extends ShellComponent {
    constructor() {
        super("brand");
    }
    
    hide(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;
    }
    
    show(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;     
    }
    
    layout(container: JQuery) {
        this.site = $(`<section id='${this.id}' class='o-0'/>`).appendTo(container);
    }
}

export class What extends ShellComponent {
    constructor() {
        super("what");
    }
    
    hide(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;
    }
    
    show(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;     
    }
    
    layout(container: JQuery) {
        this.site = $(`<section id='${this.id}' class='o-0'/>`).appendTo(container);
    }
}

export class Map extends ShellComponent {
    constructor() {
        super("map");
    }
    
    hide(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;
    }
    
    show(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;     
    }
    
    layout(container: JQuery) {
        this.site = $(`<section id='${this.id}' class='o-0'/>`).appendTo(container);
    }
}

export class Contact extends ShellComponent {
    constructor() {
        super("contact");
    }
    
    hide(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;
    }
    
    show(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;     
    }
    
    layout(container: JQuery) {
        this.site = $(`<section id='${this.id}' class='o-0'/>`).appendTo(container);
    }
}

export class Philosophy extends ShellComponent {
    constructor() {
        super("philosophy");
    }
    
    hide(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;
    }
    
    show(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;     
    }
    
    layout(container: JQuery) {
        this.site = $(`<section id='${this.id}' class='o-0'/>`).appendTo(container);
    }
}

export class Services extends ShellComponent {
    constructor() {
        super("services");
    }
    
    hide(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;
    }
    
    show(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;     
    }
    
    layout(container: JQuery) {
        this.site = $(`<section id='${this.id}' class='o-0'/>`).appendTo(container);
    }
}

export class Who extends ShellComponent {
    constructor() {
        super("who");
    }
    
    hide(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;
    }
    
    show(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;     
    }
    
    layout(container: JQuery) {
        this.site = $(`<section id='${this.id}' class='o-0'/>`).appendTo(container);
    }
}

export class Footer extends ShellComponent {
    constructor() {
        super("footer");
    }
    
    hide(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;
    }
    
    show(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;     
    }
    
    layout(container: JQuery) {
        this.site = $(`<section id='${this.id}' class='o-0'/>`).appendTo(container);
    }
}