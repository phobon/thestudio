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
    private _downarrow: JQuery;
    
    constructor(site: JQuery) {
        super("brand", site);
    }
    
    init() {
        this._headline = this.site.find("h1");
        this._tagline = this.site.find("p");
        this._booking = this.site.find(".b-solid");
        this._downarrow = this.site.find(".downarrow");
        
        this._headline.velocity({ opacity: 0 }, { duration : 0 });
        this._tagline.velocity({ opacity: 0 }, { duration : 0 });
        this._booking.velocity({ opacity: 0 }, { duration : 0 });
        this._downarrow.velocity({ opacity: 0 }, { duration : 0 });
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
                p: { opacity: 1, translateY: [0, -32] }, 
                o: { duration: 600, easing: "easeOutExpo" }
            },      
            { 
                e: this._tagline, 
                p: { opacity: 1, translateY: [0, -32] }, 
                o: { duration: 600, easing: "easeOutExpo", delay: 100, sequenceQueue: false }
            },         
            { 
                e: this._booking, 
                p: { opacity: 1, translateY: [0, -32] }, 
                o: { duration: 600, easing: "easeOutExpo", delay: 200, sequenceQueue: false }
            },         
            { 
                e: this._downarrow, 
                p: { opacity: 1, translateY: [0, -16] }, 
                o: { duration: 600, easing: "easeOutExpo", delay: 500, sequenceQueue: false, complete: () => {                                              
                        this._downarrow.velocity("stop").velocity({ translateY: -15 }, { duration: 2000, easing: "easeInOut", loop: true });
                        d.resolve();  
                    } 
                }
            }
        ]   
        
        $.Velocity.RunSequence(s);
        return d;     
    }
    
    destroy() {
        super.destroy();
        this._downarrow.velocity("stop");
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
    
    show(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        if (this.isVisible) {
            return d.resolve();
        }
        
        this.isVisible = true;
        this.site.velocity({ opacity: 1, translateY: [0, 60] }, { duration: 300, easing: "easeOutExpo", complete: () => { d.resolve(); }});
        
        return d;
    }
    
    hide(): JQueryPromise<any> {        
        var d = $.Deferred<any>();
        if (!this.isVisible) {
            return d.resolve();
        }
        
        this.isVisible = false;
        var s = [
            { e: this.site, p: { opacity: 0.01 }, o: { duration: 300 } },
            { e: this.site, p: { translateY: [60, 0] }, o: { duration: 300, easing: "easeOutExpo", sequenceQueue: false, complete: () => { 
                        d.resolve(); 
                        this.site.css({ opacity: 0 });
                    } 
                }
            }
        ];
        
        $.Velocity.RunSequence(s);
        // this.site.velocity({ opacity: 0, translateY: [60, 0] }, { duration: 300, easing: "easeOutExpo", complete: () => { d.resolve(); }})
        
        return d;
    }
    
    destroy() {
        this.site.off("click");
        super.destroy();
    }
    
    private onClick() {
        $("#brand").velocity("scroll", { duration: 1000, easing: "easeOutExpo" });
    }
}