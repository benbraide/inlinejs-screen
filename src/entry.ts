import { GetGlobal, WaitForGlobal } from '@benbraide/inlinejs';

import { ScreenConceptName } from './names';
import { ScreenConcept } from './concept';

import { ScreenMagicHandlerCompact } from './magic/screen';

export function InlineJSScreen(){
    WaitForGlobal().then(() => {
        GetGlobal().SetConcept(ScreenConceptName, new ScreenConcept(GetGlobal().CreateComponent(document.createElement('template'))));
        ScreenMagicHandlerCompact();
    });
}
