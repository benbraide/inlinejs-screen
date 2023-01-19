"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineJSScreen = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const names_1 = require("./names");
const concept_1 = require("./concept");
const screen_1 = require("./magic/screen");
function InlineJSScreen() {
    (0, inlinejs_1.WaitForGlobal)().then(() => {
        (0, inlinejs_1.GetGlobal)().SetConcept(names_1.ScreenConceptName, new concept_1.ScreenConcept((0, inlinejs_1.GetGlobal)().CreateComponent(document.createElement('template'))));
        (0, screen_1.ScreenMagicHandlerCompact)();
    });
}
exports.InlineJSScreen = InlineJSScreen;
