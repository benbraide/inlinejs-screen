import { GetGlobal, AddMagicHandler, CreateMagicHandlerCallback, BuildGetterProxyOptions, CreateInplaceProxy } from "@benbraide/inlinejs";

import { IScreenConcept, IScreenScrollParams } from "../types";
import { ScreenConceptName } from "../names";

function CreateScreenProxy(){
    const getConcept = () => GetGlobal().GetConcept<IScreenConcept>(ScreenConceptName);
    
    let methods = {
        stopListening: () => getConcept()?.StopListening(),
        scroll: (params: IScreenScrollParams) => getConcept()?.Scroll(params),
        scrollTop: (animate?: boolean) => getConcept()?.ScrollTop(animate),
        scrollRight: (animate?: boolean) => getConcept()?.ScrollRight(animate),
        scrollBottom: (animate?: boolean) => getConcept()?.ScrollBottom(animate),
        scrollLeft: (animate?: boolean) => getConcept()?.ScrollLeft(animate),
        getSizeMarkLevel: (mark: string | number) => getConcept()?.GetSizeMarkLevel(mark),
    };

    let properties = {
        scrollOffset: () => getConcept()?.GetScrollOffset(),
        scrollPercentage: () => getConcept()?.GetScrollPercentage(),
        scrollTrend: () => getConcept()?.GetScrollTrend(),
        scrollStreak: () => getConcept()?.GetScrollStreak(),
        size: () => getConcept()?.GetSize(),
        sizeMarks: () => getConcept()?.GetSizeMarks(),
        breakpoint: () => getConcept()?.GetBreakpoint(),
        checkpoint: () => getConcept()?.GetCheckpoint(),
    };

    return CreateInplaceProxy(BuildGetterProxyOptions({
        getter: (prop) => {
            if (prop && methods.hasOwnProperty(prop)){
                return methods[prop];
            }

            if (prop && properties.hasOwnProperty(prop)){
                return properties[prop]();
            }
        },
        lookup: [...Object.keys(methods), ...Object.keys(properties)],
    }));
}

const ScreenProxy = CreateScreenProxy();

export const ScreenMagicHandler = CreateMagicHandlerCallback(ScreenConceptName, () => ScreenProxy);

export function ScreenMagicHandlerCompact(){
    AddMagicHandler(ScreenMagicHandler);
}
