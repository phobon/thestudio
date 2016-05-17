import { IShell, IShellComponent, Shell, RespondType } from "./framework";
import Components = require("./components");

var shell: IShell;

class TheStudio extends Shell {
    private static scrollerThreshold: number = 500;
    private static menuThreshold: number = 350;
    
    show() {        
        // TODO: Determine where on the page the user is and get the correct components.
        // TODO: For now, just show the navigation and brand components.        
        this.component("header").show().done(() => {
            this.currentComponent = this.component("brand");
        });
    }    
    
    protected initComponents() {
        this.add(new Components.Header($("#header")));
        this.add(new Components.Brand($("#brand")));
        this.add(new Components.What($("#what")));
        this.add(new Components.Map($("#map")));
        this.add(new Components.Where($("#where")));
        this.add(new Components.Philosophy($("#philosophy")));
        this.add(new Components.Physiotherapy($("#physiotherapy")));
        this.add(new Components.Pilates($("#clinicalpilates")));
        this.add(new Components.Shop($("#shop")));
        this.add(new Components.Crew($("#crew")));
        this.add(new Components.Footer($("footer")));
        this.add(new Components.Scroller($("#scroller")));
    }
    
    protected onScroll(top: number, bottom: number) {    
        super.onScroll(top, bottom);
                 
        // Handle when the user scrolls down far enough to enable to minimal header.
        if (this.currentRespond === RespondType.Desktop) {
            if (top > TheStudio.menuThreshold) {
                (<Components.IHeader>this.component("header")).hilight();
            } else {
                (<Components.IHeader>this.component("header")).lolight();
            }
        }        
        
        // Handle when the user scrolls down far enough to trigger the scroller.
        if (top > TheStudio.scrollerThreshold) {
            this.component("scroller").show();
        } else {
            this.component("scroller").hide();
        }
    }
}

$(() => {
    shell = new TheStudio($("body"));    
    shell.init();
    shell.show();
});