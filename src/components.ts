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
    // private _glyphTranslate: number;
    // private _navTranslate: number;
    
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
        
        // Cache some dimensions so we can easily transition things.
        // this._glyphTranslate = -(this._glyph.position().left + this._glyph.outerWidth());
        // this._navTranslate = this._nav.outerWidth();
    }
    
    show(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        if (this.isVisible) {
            return d.resolve();
        }
        
        this.isVisible = true;        
        var s = [
            { 
                e: this._glyph, 
                p: { translateY: [0, -this._height] }, 
                o: { duration: 450, easing: "easeOutExpo" }
            },
            { 
                e: this._nav, 
                p: { translateY: [0, -this._height] }, 
                o: { duration: 450, easing: "easeOutExpo", sequenceQueue: false, delay: 100, complete: () => {
                        d.resolve();
                    } 
                }
            },
        ]   
        
        $.Velocity.RunSequence(s);
        return d;     
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
    private _headline: JQuery;
    private _tagline: JQuery;
    private _booking: JQuery;
    
    constructor(site: JQuery) {
        super("brand", site);
    }
    
    init() {
        this._headline = this.site.find("h1");
        this._tagline = this.site.find("p");
        this._booking = this.site.find(".b-solid");
        
        this._headline.velocity({ opacity: 0 }, { duration : 0 });
        this._tagline.velocity({ opacity: 0 }, { duration : 0 });
        this._booking.velocity({ opacity: 0 }, { duration : 0 });
    }
    
    show(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        if (this.isVisible) {
            return d.resolve();
        }
        
        this.isVisible = true;        
        var s = [
            { 
                e: this._headline, 
                p: { translateY: [0, -32], opacity: 1 }, 
                o: { duration: 500, easing: "easeOutExpo" }
            },
            { 
                e: this._tagline, 
                p: { translateY: [0, -32], opacity: 1 }, 
                o: { duration: 500, easing: "easeOutExpo", sequenceQueue: false, delay: 100 }
            },
            { 
                e: this._booking, 
                p: { translateY: [0, -32], opacity: 1 }, 
                o: { duration: 500, easing: "easeOutExpo", sequenceQueue: false, delay: 100, complete: () => {
                        d.resolve();
                    } 
                }
            },
        ]   
        
        $.Velocity.RunSequence(s);
        return d;     
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