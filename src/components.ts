import { RespondType, IShellComponent, ShellComponent } from "./framework";

export interface IHeader extends IShellComponent {
    hilight(): JQueryPromise<any>;
    lolight(): JQueryPromise<any>;   
    
    expand(): JQueryPromise<any>;
    collapse(): JQueryPromise<any>; 
}

export class Header extends ShellComponent implements IHeader {
    private _isHilighted: boolean;
    private _isExpanded: boolean;
    private _height: number;
    
    private _glyph: JQuery;
    private _nav: JQuery;
    private _minimal: JQuery;
    private _booking: JQuery;
    
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
        this._minimal = this.site.find(".minimal");
        this._booking = this.site.find(".booking");
        
        this._glyph.velocity({ opacity: 0 }, { duration: 0 });
        this._booking.velocity({ opacity: 0 }, { duration: 0 });
        
        this._minimal.on("click", () => {
            this._isExpanded ? this.collapse() : this.expand();
        });
        
        this.setupLinks();
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
                e: this._booking, 
                p: { translateY: [0, -this._height], opacity: 1 }, 
                o: { duration: 450, easing: "easeOutExpo", sequenceQueue: false, delay: 200, complete: () => {
                        d.resolve();
                    } 
                }
            }
        ]   
        
        $.Velocity.RunSequence(s);
        return d;     
    }
    
    expand(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        if (this._isExpanded) {
            return d.resolve();
        }
        
        this._isExpanded = true;     
        this._nav.removeClass("pe-none");  
        this._nav.velocity({ opacity: 1 }, { duration: 200, easing: "easeOutExpo", complete: () => { d.resolve(); } });
        return d;
    }    
    
    collapse(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        if (!this._isExpanded) {
            return d.resolve();
        }
        
        this._isExpanded = false;   
        this._nav.velocity({ opacity: 0 }, { duration: 200, easing: "easeOutExpo", complete: () => { d.resolve(); } });
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
    
    respond(type: RespondType) {
        switch (type) {
            case RespondType.Mobile:      
                this.site.removeClass("p-horizontal-huge").addClass("p-horizontal-small");      
                this._glyph.removeClass('c-white-f').addClass('c-graym-f');
                this._glyph.css({ width: 50, height: 50 });
                this._nav.removeClass("f-none f-d-row").addClass("absolute pe-none f f-j-center vw-100 vh-100 c-grayhh-t-bg f-d-column");
                this._nav.css({ left: 0, top: 0 });
                
                this._nav.find("> div").removeClass("m-r-large").addClass("m-b-huge");
                
                this._minimal.removeClass("d-none");
            break;
            case RespondType.Desktop:
                this.site.removeClass("p-horizontal-small").addClass("p-horizontal-huge");      
                this._glyph.removeClass('c-grayl-f').addClass('c-white-f');
                this._glyph.css({ width: 80, height: 80 });
                this._nav.removeClass("absolute o-0 pe-none f vw-100 vh-100 c-grayhh-t-bg f-d-column").addClass("f-none f-d-row");
                this._nav.css({ left: '', top: '' });
                
                this._nav.find("> div").removeClass("m-b-huge").addClass("m-r-large");
                
                this._minimal.addClass("d-none");
            break;
        }
    }
    
    destroy() {
        super.destroy();
        this._minimal.off("click", () => {
            this._isExpanded ? this.collapse() : this.expand();
        });
    }
    
    private setupLinks() {
        this._nav.find("> div").each((i, e) => {
            let link = $(e);
            let target = link.data("target");
            link.on("click", () => {                
                $(target).velocity("scroll", { duration: 1000, easing: "easeOutExpo" });
                this.collapse();
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
        console.debug(`${this.id}: shown`);
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
    
    respond(type: RespondType) {
        var container = this.site.find("> div");
        var i = this.site.find(".items");
        switch (type) {
            case RespondType.Mobile:            
                i.removeClass("l-row f-ai-start").addClass("l-col");
                i.find("> li:nth-child(2)").removeClass("m-horizontal-huge").addClass("m-vertical-large");
                i.find("> li").removeClass("col3");
            break;
            case RespondType.Desktop:
                i.removeClass("l-col").addClass("l-row");
                i.find("> li:nth-child(2)").removeClass("m-vertical-large").addClass("m-horizontal-huge");
                i.find("> li").addClass("col3");
            break;
        }
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
        console.debug(`${this.id}: shown`);
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
        console.debug(`${this.id}: shown`);
        var d = $.Deferred<any>();
        if (this.isVisible) {
            return d.resolve();
        }
        
        this.isVisible = true;       
        
        this._details.velocity("transition.slideUpIn", { stagger: 100, drag: true, display: null });
        this._openingTimes.velocity("transition.slideUpIn", { delay: 200, stagger: 100, drag: true, display: null, complete: () => { d.resolve(); } });
        
        return d;     
    }
    
    respond(type: RespondType) {
        var container = this.site.find("> div");   
        var opening = this.site.find(".opening");
        var details = this.site.find(".details");
        switch (type) {
            case RespondType.Mobile:                
                container.removeClass("f-d-row container").addClass("f-d-column w-100 p-horizontal-large");
                details.addClass("w-100");
                opening.removeClass("col3").addClass("w-100 m-t-huge");
                details.find(".detail").removeClass("f4");                
            break;
            case RespondType.Desktop:
                container.removeClass("f-d-column w-100 p-horizontal-large").addClass("f-d-row container");
                details.removeClass("w-100");                
                opening.removeClass("w-100 m-t-huge").addClass("col3");
                details.find(".detail").addClass("f4");
            break;
        }
    }
}

export abstract class ServiceComponent extends ShellComponent {
    protected _headline: JQuery;
    protected _hr: JQuery;
    protected _blurb: JQuery;
    protected _items: JQuery;
    
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
        console.debug(`${this.id}: shown`);
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
    
    respond(type: RespondType) {
        var container = this.site.find("> div:nth-child(2)");   
        var serviceDescription = this.site.find(".service-description");
        switch (type) {
            case RespondType.Mobile:          
                this.site.removeClass("service-full");
                container.removeClass("container");
                serviceDescription.removeClass("f-none w-70 p-horizontal-huge c-white-bg").addClass("f w-100 p-horizontal-small p-container c-grayhh-t-bg");
                this._items.removeClass("col4").addClass("col3 c-white");     
                this._headline.removeClass("c-graym").addClass("c-white");    
                this._blurb.addClass("c-white");  
            break;
            case RespondType.Desktop:
                this.site.addClass("service-full");
                container.addClass("container");
                serviceDescription.removeClass("f w-100 p-horizontal-small p-container c-grayhh-t-bg").addClass("f-none w-70 p-horizontal-huge c-white-bg");
                this._items.removeClass("col3 c-white").addClass("col4");     
                this._headline.removeClass("c-white").addClass("c-graym");    
                this._blurb.removeClass("c-white");  
            break;
        }
    }
}

export class Philosophy extends SectionComponent {    
    constructor(site: JQuery) {
        super("philosophy", site);   
    }
    
    respond(type: RespondType) {
        var container = this.site.find("> div");   
        var items = this.site.find(".items");
        switch (type) {
            case RespondType.Mobile:            
                items.removeClass("l-row f-ai-start").addClass("l-col");
                items.find("> li:first-child").removeClass("m-r-huge");
                items.find("> li").removeClass("col3").addClass("m-horizontal-huge");
            break;
            case RespondType.Desktop:
                items.removeClass("l-col").addClass("l-row f-ai-start");
                items.find("> li:first-child").addClass("m-r-huge");
                items.find("> li").removeClass("m-horizontal-huge").addClass("col3");
            break;
        }
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
    
    respond(type: RespondType) {
        var container = this.site.find("> div:nth-child(2)");   
        var serviceDescription = this.site.find(".service-description");
        switch (type) {
            case RespondType.Mobile:          
                this.site.removeClass("service-full");
                container.removeClass("container");
                serviceDescription.removeClass("f-none w-70 p-horizontal-huge c-white-bg").addClass("f w-100 p-horizontal-small p-container c-grayhh-t-bg");
                this.site.find(".items").addClass("p-horizontal-large");
                this._items.addClass("c-grayll");     
                this._headline.removeClass("c-graym").addClass("c-white");    
                this._blurb.addClass("c-white");  
            break;
            case RespondType.Desktop:
                this.site.addClass("service-full");
                container.addClass("container");
                serviceDescription.removeClass("f w-100 p-horizontal-small p-container c-grayhh-t-bg").addClass("f-none w-70 p-horizontal-huge c-white-bg");
                this.site.find(".items").removeClass("p-horizontal-large");
                this._items.removeClass("c-grayll")  
                this._headline.removeClass("c-white").addClass("c-graym");    
                this._blurb.removeClass("c-white");  
            break;
        }
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
    
    respond(type: RespondType) {
        var container = this.site.find("> div");   
        var items = this.site.find(".items");
        switch (type) {
            case RespondType.Mobile:            
                items.removeClass("l-row").addClass("l-col");
                items.find("> li").removeClass("col3").addClass("m-t-huge");
                items.find("> li:first-child").removeClass("m-t-huge");
            break;
            case RespondType.Desktop:
                items.removeClass("l-col").addClass("l-row");
                items.find("> li").each((i, e) => {
                    if (i < 3) {
                        $(e).removeClass("m-t-huge");
                    }
                    $(e).addClass("col3");
                });
            break;
        }
    }
}

export class Footer extends ShellComponent {
    constructor(site: JQuery) {
        super("footer", site);        
        this.scrollBuffer = 100;
    }
    
    respond(type: RespondType) {
        var container = this.site.find(".footer-container");   
        var links = this.site.find(".links");   
        var follows = this.site.find(".follows");
        var legal = this.site.find(".legal");
        switch (type) {
            case RespondType.Mobile:    
                container.removeClass("f-d-row").addClass("f-d-column");               
                links.removeClass("col3").addClass("w-100");
                follows.removeClass("col3").addClass("w-100 m-t-huge");     
                legal.removeClass("l-row f-ai-center").addClass("l-col f-ai-start"); 
                
                legal.find("> li").removeClass("m-l-huge"); 
            break;
            case RespondType.Desktop:
                container.removeClass("f-d-column").addClass("f-d-row");               
                links.removeClass("w-100").addClass("col3");
                follows.removeClass("w-100 m-t-huge").addClass("col3");     
                legal.removeClass("l-col f-ai-start").addClass("l-row f-ai-center");   
                legal.find("> li").addClass("m-l-huge"); 
                legal.find("> li:first-child").removeClass("m-l-huge");
            break;
        }
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
    
    respond(type: RespondType) {
        switch (type) {
            case RespondType.Mobile:   
                this.site.removeClass("m-huge").addClass("m-small");         
            break;
            case RespondType.Desktop:
                this.site.removeClass("m-small").addClass("m-huge"); 
            break;
        }
    }
    
    private onClick() {
        $("#brand").velocity("scroll", { duration: 1000, easing: "easeOutExpo" });
    }
}