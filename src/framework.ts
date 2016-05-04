import { Event } from "./common";

export interface IShell {
    site: JQuery;
    components: IShellComponent[];
    
    shown: Event<any>;
    hidden: Event<any>;
    
    init();
    layout();
    destroy();
    
    hide(): JQueryPromise<any>;
    show(): JQueryPromise<any>;
    
    add(component: IShellComponent);
    remove(component: IShellComponent);
}

export interface IShellComponent {
    id: string;
    site: JQuery;
    
    shown: Event<any>;
    hidden: Event<any>;
    
    show(): JQueryPromise<any>;
    hide(): JQueryPromise<any>;
    
    layout(container: JQuery);
    destroy();
}

export abstract class ShellComponent implements IShellComponent {
    private _id: string;    
    private _site: JQuery;
    
    private _shown: Event<any>;
    private _hidden: Event<any>;
    
    constructor(id: string) {
        this._id = id;
                
        this._shown = new Event<any>();
        this._hidden = new Event<any>();
    }
    
    get id(): string {
        return this._id;
    }
    
    get site(): JQuery {
        return this._site;
    }
    
    get shown(): Event<any> {
        return this._shown;
    }
    
    get hidden(): Event<any> {
        return this._hidden;
    }
    
    abstract show(): JQueryPromise<any>;
    abstract hide(): JQueryPromise<any>;
    
    abstract layout(container: JQuery);
    
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
    
    private _shown: Event<any>;
    private _hidden: Event<any>;
    
    constructor(site: JQuery) {
        this._site = site;
        this._shown = new Event<any>();
        this._hidden = new Event<any>();
        
        // Set up some event handlers.        
        $(window).on("scroll", e => {
            this.onScroll(e);
        });
        
        // TODO: Responsive?
    }
    
    get site(): JQuery {
        return this._site;
    }
    
    get components(): IShellComponent[] {
        return this._components;
    }
    
    get shown(): Event<any> {
        return this._shown;
    }
    
    get hidden(): Event<any> {
        return this._hidden;
    }
    
    abstract init();
    
    layout() {
        this._components.forEach(c => {
            c.layout(this.site);
        });
    }
    
    destroy() {
        $(window).off("scroll");
        
        this.hide().done(() => {
            this._components.forEach(c => {
                this.remove(c);
            });
        });        
    }
    
    show(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        
        // TODO: Determine where on the page the user is and get the correct components.
        // TODO: For now, just show the navigation and brand components.
        this.component("navigation").show().done(() => {
            this.component("brand").show().done(() => { d.resolve(); });
        })
        
        return d;
    }
    
    hide(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;
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
    
    private onScroll(handler: any) {
        console.log("scroll");
    }
}