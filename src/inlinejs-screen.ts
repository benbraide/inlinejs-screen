import { GetGlobal, WaitForGlobal } from '@benbraide/inlinejs';

import { ScreenConceptName } from './names';
import { ScreenConcept } from './concept';

import { ScreenMagicHandlerCompact } from './magic/screen';

WaitForGlobal().then(() => {
    GetGlobal().SetConcept(ScreenConceptName, new ScreenConcept());
    ScreenMagicHandlerCompact();
});
