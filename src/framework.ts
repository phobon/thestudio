import { Event } from "./common";

export interface IShell {
    site: JQuery;
    components: IShellComponent[];
    
    shown: Event<any>;
    hidden: Event<any>;
    
    init(): JQueryPromise<any>;
    layout(): JQueryPromise<any>;
    destroy();
    
    hide(): JQueryPromise<any>;
    show(): JQueryPromise<any>;
}

export interface IShellComponent {
    id: string;
    site: JQuery;
    
    shown: Event<any>;
    hidden: Event<any>;
    
    show(): JQueryPromise<any>;
    hide(): JQueryPromise<any>;
    
    layout(): JQueryPromise<any>;
    destroy(): JQueryPromise<any>;
}

export abstract class ShellComponent implements IShellComponent {
    private _id: string;
    private _site: JQuery;
    
    private _shown: Event<any>;
    private _hidden: Event<any>;
    
    constructor() {
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
    
    abstract layout(): JQueryPromise<any>;
    
    destroy(): JQueryPromise<any> {
        return this.hide();
    }
}

export class Shell implements IShell {
    private _site: JQuery;
    private _components: IShellComponent[] = [];
    
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
    
    get shown(): Event<any> {
        return this._shown;
    }
    
    get hidden(): Event<any> {
        return this._hidden;
    }
    
    init(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;
    }
    
    layout(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;
    }
    
    destroy() {
        this.hide().done(() => {
            this._components.forEach(c => {
                c.destroy();
            });
        });        
    }
    
    show(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;
    }
    
    hide(): JQueryPromise<any> {
        var d = $.Deferred<any>();
        d.resolve();
        return d;
    }
}