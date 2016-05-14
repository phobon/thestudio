import { Event } from "./common";

export interface IShell {
    site: JQuery;
    components: IShellComponent[];
    
    shown: Event<any>;
    hidden: Event<any>;
    
    init();
    destroy();
    
    hide();
    show();
    
    add(component: IShellComponent);
    remove(component: IShellComponent);
}

export interface IShellComponent {
    id: string;
    site: JQuery;    
    
    top: number;
    scrollBuffer: number; 
    affectsLayout: boolean;
    
    isVisible: boolean;
    
    hidden: Event<any>;
    shown: Event<any>;
    
    init();    
    show(): JQueryPromise<any>;
    hide(): JQueryPromise<any>;
    destroy();
}

export abstract class ShellComponent implements IShellComponent {
    private _id: string;    
    private _site: JQuery;
    
    private _top: number;
    private _scrollBuffer: number = 200;
    private _affectsLayout: boolean = true;
    
    private _isVisible: boolean = false;
    
    private _hidden: Event<any>;
    private _shown: Event<any>;
    
    constructor(id: string, site: JQuery, affectsLayout: boolean = true) {
        this._id = id;                
        this._site = site;
        this._affectsLayout = affectsLayout;
        
        this._hidden = new Event<any>();
        this._shown = new Event<any>();
    }
    
    get id(): string {
        return this._id;
    }
    
    get site(): JQuery {
        return this._site;
    }
    
    get top(): number {
        return this._top;
    }
    
    get scrollBuffer(): number {
        return this._scrollBuffer;
    }
    
    set scrollBuffer(value: number) {
        this._scrollBuffer = value;
    }
    
    get affectsLayout(): boolean {
        return this._affectsLayout;
    }
    
    get isVisible(): boolean {
        return this._isVisible;
    }
    
    set isVisible(value: boolean) {
        this._isVisible = value;
    }
    
    get hidden(): Event<any> {
        return this._hidden;
    }
    
    get shown(): Event<any> {
        return this._shown;
    }
    
    init() {
        this._top = this.site.position().top;     
    }
    
    show(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        
        if (this.isVisible) {
            return d.resolve();
        }
        
        this._isVisible = true;
        
        this.site.velocity("stop");
        this.site.velocity(
            { opacity: 1 }, 
            { 
                duration: 250, 
                easing: "easeOutExpo", 
                complete: () => {
                    this.shown.trigger();
                    d.resolve(); 
                } 
            });
        return d;
    }
    
    hide(): JQueryPromise<any> {
        var d = $.Deferred<any>();
                
        if (!this.isVisible) {
            return d.resolve();
        }
        
        this._isVisible = false;
        
        this.site.velocity("stop");
        this.site.velocity(
            { opacity: 0 }, 
            { 
                duration: 250, 
                easing: "easeOutExpo", 
                complete: () => { 
                    this.hidden.trigger();                    
                    d.resolve(); 
                } 
            });
        return d;
    }
    
    destroy() {
        this.hide().done(() => {
            this.site.remove();
        });        
    }
}

export abstract class Shell implements IShell {
    private _site: JQuery;
    private _components: IShellComponent[] = [];
    private _componentsById: { [index: string]: IShellComponent } = {};
    
    private _currentComponent: IShellComponent;
    private _previousComponent: IShellComponent;
    private _nextComponent: IShellComponent;
    
    private _shown: Event<any>;
    private _hidden: Event<any>;
    
    constructor(site: JQuery) {
        this._site = site;
        this._shown = new Event<any>();
        this._hidden = new Event<any>();
    }
    
    get site(): JQuery {
        return this._site;
    }
    
    get components(): IShellComponent[] {
        return this._components;
    }
    
    get currentComponent(): IShellComponent {
        return this._currentComponent;
    }
    
    set currentComponent(value: IShellComponent) {
        if (value === this._currentComponent || !value.affectsLayout) {
            return;
        }
        
        if (this._currentComponent) {
            this._previousComponent = this._currentComponent;
        }
        
        this._currentComponent = value;
        this._currentComponent.show(); 
        
        var index = this.components.indexOf(this._currentComponent);
        var next = this.components[index + 1];
                
        this._nextComponent = next.affectsLayout ? next : null;
    }
    
    get shown(): Event<any> {
        return this._shown;
    }
    
    get hidden(): Event<any> {
        return this._hidden;
    }
    
    init() {
        this.initComponents();
        this.components.forEach(c => {
            c.init();
        });
        
        // Set up some event handlers.
        window.onscroll = e => {
            var w = $(window);
            var top = w.scrollTop();
            var bottom = top + w.height();
            
            this.onScroll(top, bottom);
        };
        
        // TODO: Responsive?
    }
    
    destroy() {
        this._components.forEach(c => {
            this.remove(c);
        });    
    }
    
    show() {
        this.components.forEach(c => {
            c.show();
        });
    }    
    
    hide() {
        this.components.forEach(c => {
            c.hide();
        });
    }
    
    component(id: string): IShellComponent {
        return this._componentsById[id];
    }       
    
    add(component: IShellComponent) {
        this.components.push(component);
        this._componentsById[component.id] = component;
    }
    
    remove(component: IShellComponent) {
        this._components = this.components.splice(this.components.indexOf(component), 1);
        this._componentsById[component.id] = null;
        delete this._componentsById[component.id];        
        component.destroy();
    }
    
    protected abstract initComponents();
    
    protected onScroll(top: number, bottom: number) {        
        if (!this._nextComponent) {
            return;
        }
        
        // Check if we're above the threshold to show the next component.
        if (bottom > this._nextComponent.top + this._nextComponent.scrollBuffer) {
            this.currentComponent = this._nextComponent;
        }
    }
}