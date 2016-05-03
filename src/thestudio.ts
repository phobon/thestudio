import $ = require("jquery");
import { IShell, IShellComponent, Shell } from "./framework";

var shell: IShell;

$(() => {
    shell = new Shell($("body"));
});