"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenMagicHandlerCompact = exports.ScreenMagicHandler = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const names_1 = require("../names");
function CreateScreenProxy() {
    const getConcept = () => (0, inlinejs_1.GetGlobal)().GetConcept(names_1.ScreenConceptName);
    let methods = {
        stopListening: () => { var _a; return (_a = getConcept()) === null || _a === void 0 ? void 0 : _a.StopListening(); },
        scroll: (params) => { var _a; return (_a = getConcept()) === null || _a === void 0 ? void 0 : _a.Scroll(params); },
        scrollTop: (animate) => { var _a; return (_a = getConcept()) === null || _a === void 0 ? void 0 : _a.ScrollTop(animate); },
        scrollRight: (animate) => { var _a; return (_a = getConcept()) === null || _a === void 0 ? void 0 : _a.ScrollRight(animate); },
        scrollBottom: (animate) => { var _a; return (_a = getConcept()) === null || _a === void 0 ? void 0 : _a.ScrollBottom(animate); },
        scrollLeft: (animate) => { var _a; return (_a = getConcept()) === null || _a === void 0 ? void 0 : _a.ScrollLeft(animate); },
        getSizeMarkLevel: (mark) => { var _a; return (_a = getConcept()) === null || _a === void 0 ? void 0 : _a.GetSizeMarkLevel(mark); },
    };
    let properties = {
        scrollOffset: () => { var _a; return (_a = getConcept()) === null || _a === void 0 ? void 0 : _a.GetScrollOffset(); },
        scrollPercentage: () => { var _a; return (_a = getConcept()) === null || _a === void 0 ? void 0 : _a.GetScrollPercentage(); },
        scrollTrend: () => { var _a; return (_a = getConcept()) === null || _a === void 0 ? void 0 : _a.GetScrollTrend(); },
        scrollStreak: () => { var _a; return (_a = getConcept()) === null || _a === void 0 ? void 0 : _a.GetScrollStreak(); },
        size: () => { var _a; return (_a = getConcept()) === null || _a === void 0 ? void 0 : _a.GetSize(); },
        sizeMarks: () => { var _a; return (_a = getConcept()) === null || _a === void 0 ? void 0 : _a.GetSizeMarks(); },
        breakpoint: () => { var _a; return (_a = getConcept()) === null || _a === void 0 ? void 0 : _a.GetBreakpoint(); },
        checkpoint: () => { var _a; return (_a = getConcept()) === null || _a === void 0 ? void 0 : _a.GetCheckpoint(); },
    };
    return (0, inlinejs_1.CreateInplaceProxy)((0, inlinejs_1.BuildGetterProxyOptions)({
        getter: (prop) => {
            if (prop && methods.hasOwnProperty(prop)) {
                return methods[prop];
            }
            if (prop && properties.hasOwnProperty(prop)) {
                return properties[prop]();
            }
        },
        lookup: [...Object.keys(methods), ...Object.keys(properties)],
    }));
}
const ScreenProxy = CreateScreenProxy();
exports.ScreenMagicHandler = (0, inlinejs_1.CreateMagicHandlerCallback)(names_1.ScreenConceptName, () => ScreenProxy);
function ScreenMagicHandlerCompact() {
    (0, inlinejs_1.AddMagicHandler)(exports.ScreenMagicHandler);
}
exports.ScreenMagicHandlerCompact = ScreenMagicHandlerCompact;
