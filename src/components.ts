import { IShellComponent, ShellComponent } from "./framework";

export interface IHeader extends IShellComponent {
    hilight(): JQueryPromise<any>;
    lolight(): JQueryPromise<any>;    
}

export class Header extends ShellComponent implements IHeader {
    private _isHilighted: boolean;
    private _height: number;
    private _glyph: JQuery;
    private _nav: JQuery;
    
    constructor(site: JQuery) {
        super("header", site, false);
    }
    
    init() {
        super.init();
        
        // Cache the height of the site.
        this._height = this.site.outerHeight();
        
        // Cache some of the sites here so we can manipulate them individually.
        this._glyph = this.site.find("> svg");
        this._nav = this.site.find("nav");
    }
    
    hilight(): JQueryPromise<any> {        
        var d = $.Deferred<any>();
        if (this._isHilighted) {
            return d.resolve();
        }
        
        this._isHilighted = true;
        var s = [
            { 
                e: this.site, 
                p: { translateY: -this._height }, 
                o: { duration: 250, easing: "easeOutExpo", complete: () => {
                        this.site.addClass("c-white-bg");
                        this._glyph.addClass("c-graym-f");
                        this._glyph.css({ width: 50, height: 50 });                    
                        this._nav.find("> a").addClass("c-graym");
                    }
                }
            },
            { 
                e: this.site, 
                p: { translateY: 0 }, 
                o: { duration: 250, delay: 250, easing: "easeOutExpo", complete: () => {
                        d.resolve();
                    }
                } 
            }
        ]
        
        $.Velocity.RunSequence(s);        
        return d;        
    }
    
    lolight(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        if (!this._isHilighted) {
            return d.resolve();
        }
        
        this._isHilighted = false;
        
        var s = [
            { 
                e: this.site, 
                p: { translateY: -this._height }, 
                o: { duration: 250, easing: "easeOutExpo", complete: () => {
                        this.site.removeClass("c-white-bg");
                        this._glyph.removeClass("c-graym-f");
                        this._glyph.css({ width: 80, height: 80 });                    
                        this._nav.find("> a").removeClass("c-graym");
                    }
                }
            },
            { 
                e: this.site, 
                p: { translateY: 0 }, 
                o: { duration: 250, delay: 250, easing: "easeOutExpo", complete: () => {
                        d.resolve();
                    }
                } 
            }
        ]
        
        $.Velocity.RunSequence(s);
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