import $ = require("jquery");
import { IShell, IShellComponent, Shell } from "./framework";
import Components = require("./components");

var shell: IShell;

class TheStudio extends Shell {
    init() {
        this.add(new Components.Navigation());
        this.add(new Components.Brand());
        this.add(new Components.What());
        this.add(new Components.Map());
        this.add(new Components.Contact());
        this.add(new Components.Philosophy());
        this.add(new Components.Services());
        this.add(new Components.Who());
        this.add(new Components.Footer());
    }
}

$(() => {
    shell = new TheStudio($("body"));    
    shell.init();
    shell.layout();
    shell.show();
});