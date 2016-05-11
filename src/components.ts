import { IShellComponent, ShellComponent } from "./framework";

export interface IHeader extends IShellComponent {
    hilight(): JQueryPromise<any>;
    lolight(): JQueryPromise<any>;    
}

export class Header extends ShellComponent implements IHeader {
    constructor(site: JQuery) {
        super("header", site, false);
    }
    
    hilight(): JQueryPromise<any> {        
        var d = $.Deferred<any>();
        this.site.addClass("c-orange-bg");        
        d.resolve();
        return d;        
    }
    
    lolight(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        this.site.removeClass("c-orange-bg");
        d.resolve();
        return d;        
    }
}

export class Brand extends ShellComponent {
    constructor(site: JQuery) {
        super("brand", site);
    }
}

export class What extends ShellComponent {
    constructor(site: JQuery) {
        super("what", site);
    }
}

export class Map extends ShellComponent {
    constructor(site: JQuery) {
        super("map", site);
    }
}

export class Where extends ShellComponent {
    constructor(site: JQuery) {
        super("where", site);
    }
}

export class Philosophy extends ShellComponent {
    constructor(site: JQuery) {
        super("philosophy", site);
    }
}

export class Physiotherapy extends ShellComponent {
    constructor(site: JQuery) {
        super("physiotherapy", site);
    }
}

export class Shop extends ShellComponent {
    constructor(site: JQuery) {
        super("shop", site);
    }
}

export class Pilates extends ShellComponent {
    constructor(site: JQuery) {
        super("pilates", site);
    }
}

export class Crew extends ShellComponent {
    constructor(site: JQuery) {
        super("crew", site);
    }
}

export class Footer extends ShellComponent {
    constructor(site: JQuery) {
        super("footer", site);
        
        this.scrollBuffer = 100;
    }
}

export class Scroller extends ShellComponent {
    constructor(site: JQuery) {
        super("scroller", site, false);
    }
    
    init() {
        super.init();
        this.site.on("click", () => { this.onClick(); })
    }
    
    destroy() {
        this.site.off("click");
        super.destroy();
    }
    
    private onClick() {
        $("#brand").velocity("scroll", { duration: 1000, easing: "easeOutExpo" });
    }
}