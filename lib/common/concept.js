"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenConcept = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const DefaultScreenSizeMarkList = [
    ['xs', 576],
    ['sm', 765],
    ['md', 992],
    ['lg', 1200],
    ['xl', 1400],
    ['xx', Number.MAX_SAFE_INTEGER],
];
class ScreenConcept {
    constructor(component_, sizeMarkList_) {
        var _a;
        this.component_ = component_;
        this.sizeMarkList_ = sizeMarkList_;
        this.listeners_ = {
            size: null,
            scroll: null,
        };
        this.id_ = (((_a = this.component_) === null || _a === void 0 ? void 0 : _a.GenerateUniqueId('screen_proxy_')) || '');
        this.sizeMarkList_ = (this.sizeMarkList_ || DefaultScreenSizeMarkList);
        this.size_ = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        this.scrollOffset_ = ScreenConcept.GetScrollOffset();
        this.scrollTrend_ = { horizontal: 0, vertical: 0 };
        this.scrollStreak_ = { horizontal: 0, vertical: 0 };
        this.listeners_.size = () => this.HandleResize_();
        this.listeners_.scroll = () => this.HandleScroll_();
        window.addEventListener('resize', this.listeners_.size, { passive: true });
        window.addEventListener('scroll', this.listeners_.scroll, { passive: true });
    }
    StopListening() {
        if (this.listeners_.size) {
            window.removeEventListener('resize', this.listeners_.size);
            this.listeners_.size = null;
        }
        if (this.listeners_.scroll) {
            window.removeEventListener('scroll', this.listeners_.scroll);
            this.listeners_.scroll = null;
        }
    }
    Scroll({ to, from, animate }) {
        let offset = ScreenConcept.GetScrollOffset();
        to.x = ((typeof to.x === 'number') ? to.x : offset.x);
        to.y = ((typeof to.y === 'number') ? to.y : offset.y);
        if (from) {
            from.x = ((typeof from.x === 'number') ? from.x : offset.x);
            from.y = ((typeof from.y === 'number') ? from.y : offset.y);
        }
        let scroll = () => {
            window.scrollTo({
                left: (to.x || 0),
                top: (to.y || 0),
                behavior: (animate ? 'smooth' : undefined),
            });
        };
        if (from && (from.x !== offset.x || from.y !== offset.y)) {
            window.scrollTo((from.x || 0), (from.y || 0)); //Jump to offset
            queueMicrotask(scroll); //Defer final scroll
        }
        else { //Scroll from current
            scroll();
        }
    }
    ScrollTop(animate) {
        this.Scroll({ animate,
            to: { x: null, y: 0 },
        });
    }
    ScrollRight(animate) {
        this.Scroll({ animate,
            to: { x: document.body.scrollWidth, y: null },
        });
    }
    ScrollBottom(animate) {
        this.Scroll({ animate,
            to: { x: null, y: document.body.scrollHeight },
        });
    }
    ScrollLeft(animate) {
        this.Scroll({ animate,
            to: { x: 0, y: null },
        });
    }
    GetScrollOffset() {
        return this.PassValue_('scrollOffset', Object.assign({}, this.scrollOffset_));
    }
    GetScrollPercentage() {
        return ScreenConcept.ComputeScrollPercentage(this.GetScrollOffset());
    }
    GetScrollTrend() {
        return this.PassValue_('scrollTrend', Object.assign({}, this.scrollTrend_));
    }
    GetScrollStreak() {
        return this.PassValue_('scrollStreak', Object.assign({}, this.scrollStreak_));
    }
    GetSize() {
        return this.PassValue_('size', Object.assign({}, this.size_));
    }
    GetSizeMarks() {
        return this.PassValue_('sizeMarks', this.FindSizeMarks_(this.size_.width));
    }
    GetBreakpoint() {
        return this.GetSizeMarks()[0];
    }
    GetCheckpoint() {
        return this.GetSizeMarks()[1];
    }
    GetSizeMarkLevel(mark) {
        return this.sizeMarkList_.findIndex(([bp, cp]) => ((typeof mark === 'string') ? (mark === bp) : (mark <= cp)));
    }
    PassValue_(prop, value) {
        var _a;
        (_a = (0, inlinejs_1.GetGlobal)().GetCurrentProxyAccessStorage()) === null || _a === void 0 ? void 0 : _a.Put(`${this.id_}.${prop}`);
        return value;
    }
    HandleResize_() {
        var _a, _b;
        (0, inlinejs_1.AddChanges)('set', `${this.id_}.size`, 'size', (_a = this.component_) === null || _a === void 0 ? void 0 : _a.GetBackend().changes);
        let [oldBreakpoint, oldCheckpoint] = this.FindSizeMarks_(this.size_.width);
        this.size_.width = window.innerWidth;
        this.size_.height = window.innerHeight;
        let [breakpoint, checkpoint] = this.FindSizeMarks_(this.size_.width);
        if (breakpoint !== oldBreakpoint || checkpoint != oldCheckpoint) { //Marks changed
            (0, inlinejs_1.AddChanges)('set', `${this.id_}.sizeMarks`, 'sizeMarks', (_b = this.component_) === null || _b === void 0 ? void 0 : _b.GetBackend().changes);
        }
    }
    HandleScroll_() {
        var _a, _b, _c;
        let offset = ScreenConcept.GetScrollOffset();
        if (offset.x == this.scrollOffset_.x && offset.y == this.scrollOffset_.y) {
            return; //No changes
        }
        (0, inlinejs_1.AddChanges)('set', `${this.id_}.scrollOffset`, 'scrollOffset', (_a = this.component_) === null || _a === void 0 ? void 0 : _a.GetBackend().changes);
        let trend = {
            horizontal: ((offset.x <= this.scrollOffset_.x) ? ((offset.x < this.scrollOffset_.x) ? -1 : 0) : 1),
            vertical: ((offset.y <= this.scrollOffset_.y) ? ((offset.y < this.scrollOffset_.y) ? -1 : 0) : 1),
        };
        let delta = {
            x: (offset.x - this.scrollOffset_.x),
            y: (offset.y - this.scrollOffset_.y),
        };
        delta.x = ((delta.x < 0) ? -delta.x : delta.x);
        delta.y = ((delta.y < 0) ? -delta.y : delta.y);
        this.scrollOffset_ = offset;
        if (trend.horizontal != this.scrollTrend_.horizontal) {
            this.scrollStreak_.horizontal = -1;
        }
        else { //Advance streak
            delta.x += this.scrollStreak_.horizontal;
        }
        if (trend.vertical != this.scrollTrend_.vertical) {
            this.scrollStreak_.vertical = -1;
        }
        else { //Advance streak
            delta.y += this.scrollStreak_.vertical;
        }
        if (trend.horizontal != this.scrollTrend_.horizontal || trend.vertical != this.scrollTrend_.vertical) {
            (0, inlinejs_1.AddChanges)('set', `${this.id_}.scrollTrend`, 'scrollTrend', (_b = this.component_) === null || _b === void 0 ? void 0 : _b.GetBackend().changes);
            this.scrollTrend_ = trend;
        }
        if (delta.x != this.scrollStreak_.horizontal || delta.y != this.scrollStreak_.vertical) {
            (0, inlinejs_1.AddChanges)('set', `${this.id_}.scrollStreak`, 'scrollStreak', (_c = this.component_) === null || _c === void 0 ? void 0 : _c.GetBackend().changes);
            this.scrollStreak_.horizontal = delta.x;
            this.scrollStreak_.vertical = delta.y;
        }
    }
    FindSizeMarks_(width) {
        for (let marks of this.sizeMarkList_) {
            if (width < marks[1]) { //Return found
                return [...marks];
            }
        }
        return ['', -1]; //Not found
    }
    static GetScrollOffset() {
        return {
            x: (window.scrollX || window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0),
            y: (window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
        };
    }
    static ComputeScrollPercentage({ x, y }) {
        return {
            x: ((document.body.scrollWidth <= 0) ? 0 : ((x / document.body.scrollWidth) * 100)),
            y: ((document.body.scrollHeight <= 0) ? 0 : ((y / document.body.scrollHeight) * 100)),
        };
    }
}
exports.ScreenConcept = ScreenConcept;
