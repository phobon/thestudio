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
        
        this._glyph.velocity({ opacity: 0 }, { duration: 0 });
        this._nav.velocity({ opacity: 0 }, { duration: 0 });
        
        this.setupLinks();
        
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
                p: { translateY: [0, -this._height], opacity: 1 }, 
                o: { duration: 450, easing: "easeOutExpo" }
            },
            { 
                e: this._nav, 
                p: { translateY: [0, -this._height], opacity: 1 }, 
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
                        this._nav.find("> div, > a").addClass("c-graym");  
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
                        this._nav.find("> div, > a").removeClass("c-graym");
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
    
    private setupLinks() {
        this._nav.find("> div").each((i, e) => {
            let link = $(e);
            let target = link.data("target");
            link.on("click", () => {                
                $(target).velocity("scroll", { duration: 1000, easing: "easeOutExpo" });
            });
        });
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

export abstract class SectionComponent extends ShellComponent {
    private _headline: JQuery;
    private _hr: JQuery;
    private _blurb: JQuery;
    private _items: JQuery;
    
    constructor(id: string, site: JQuery, affectsLayout = true) {
        super(id, site, affectsLayout);
    }
    
    init() {
        super.init();
        
        this._headline = this.site.find("h2");
        this._hr = this.site.find("hr");
        this._items = this.site.find(".items > li");       
        
        this._headline.velocity({ opacity: 0 }, { duration : 0 });
        this._hr.velocity({ opacity: 0 }, { duration : 0 });
        this._items.velocity({ opacity: 0 }, { duration : 0 });
    }
    
    show(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        if (this.isVisible) {
            return d.resolve();
        }
        
        this.isVisible = true;       
        
        var s = [
            { e: this._headline, p: { opacity: 1, translateY: [0, 32] }, o: { duration: 600, easing: "easeOutExpo" }},
            { 
                e: this._hr, 
                p: { opacity: 1, translateY: [0, 16] }, 
                o: { duration: 600, easing: "easeOutExpo", sequenceQueue: false, delay: 100, complete: () => {
                        this._items.velocity("transition.slideUpIn", { stagger: 100, drag: true, complete: () => { d.resolve(); } }); 
                    } 
                }
            }
        ]
        
        $.Velocity.RunSequence(s);
        return d;     
    }
}

export class What extends SectionComponent {    
    constructor(site: JQuery) {
        super("what", site);       
    }
}

export class Map extends ShellComponent {    
    private _mask: JQuery;
    
    constructor(site: JQuery) {
        super("map", site);
        this.scrollBuffer = 300;
    }
    
    init() {
        super.init();    
        this._mask = this.site.find("> div");    
    }
    
    show(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        if (this.isVisible) {
            return d.resolve();
        }
        
        this.isVisible = true;       
        
        this._mask.velocity({ opacity: 0 }, { duration: 1500, easing: "easeOutExpo" });
       
        return d;    
    }
}

export class Where extends ShellComponent {
    private _details: JQuery;
    private _openingTimes: JQuery;
    
    constructor(site: JQuery) {
        super("where", site);       
    }
    
    init() {
        super.init();
        
        this._details = this.site.find(".details > li");
        this._openingTimes = this.site.find(".opening > li");
        
        this._details.velocity({ opacity: 0 }, { duration : 0 });
        this._openingTimes.velocity({ opacity: 0 }, { duration : 0 });
    }
    
    show(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        if (this.isVisible) {
            return d.resolve();
        }
        
        this.isVisible = true;       
        
        this._details.velocity("transition.slideUpIn", { stagger: 100, drag: true, display: null });
        this._openingTimes.velocity("transition.slideUpIn", { delay: 200, stagger: 100, drag: true, display: null, complete: () => { d.resolve(); } });
        
        return d;     
    }
}

export abstract class ServiceComponent extends ShellComponent {
    private _headline: JQuery;
    private _hr: JQuery;
    private _blurb: JQuery;
    private _items: JQuery;
    
    constructor(id: string, site: JQuery, affectsLayout = true) {
        super(id, site, affectsLayout);
    }
    
    init() {
        super.init();
        
        this._headline = this.site.find("h2");
        this._hr = this.site.find("hr");
        this._blurb = this.site.find("p");
        this._items = this.site.find(".items > li");       
        
        this._headline.velocity({ opacity: 0 }, { duration : 0 });
        this._hr.velocity({ opacity: 0 }, { duration : 0 });
        this._blurb.velocity({ opacity: 0 }, { duration : 0 });
        this._items.velocity({ opacity: 0 }, { duration : 0 });
    }
    
    show(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        if (this.isVisible) {
            return d.resolve();
        }
        
        this.isVisible = true;       
        
        var s = [
            { e: this._headline, p: { opacity: 1, translateY: [0, 32] }, o: { duration: 600, easing: "easeOutExpo" }},
            { e: this._hr, p: { opacity: 1, translateY: [0, 16] }, o: { duration: 600, easing: "easeOutExpo" }},
            { 
                e: this._blurb, 
                p: { opacity: 1, translateY: [0, 32] }, 
                o: { duration: 600, easing: "easeOutExpo", sequenceQueue: false, delay: 100, complete: () => {
                        this._items.velocity("transition.slideUpIn", { stagger: 100, drag: true, complete: () => { d.resolve(); } }); 
                    } 
                }
            }
        ]
        
        $.Velocity.RunSequence(s);
        return d;     
    }
}

export class Philosophy extends SectionComponent {    
    constructor(site: JQuery) {
        super("philosophy", site);   
    }
}

export class Physiotherapy extends ServiceComponent {    
    constructor(site: JQuery) {
        super("physiotherapy", site);
    }
}

export class Shop extends ServiceComponent {
    constructor(site: JQuery) {
        super("shop", site);
    }
}

export class Pilates extends ServiceComponent {
    constructor(site: JQuery) {
        super("pilates", site);
    }
}

export class Crew extends SectionComponent {    
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
        this.site.velocity("transition.slideUpIn", { duration: 300, display: null });
        
        return d;
    }
    
    hide(): JQueryPromise<any> {        
        var d = $.Deferred<any>();
        if (!this.isVisible) {
            return d.resolve();
        }
        
        this.isVisible = false;        
        this.site.velocity("transition.slideDownOut", { duration: 300, display: null });
        
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