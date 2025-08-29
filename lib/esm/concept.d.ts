import { IComponent } from "@benbraide/inlinejs";
import { IScreenConcept, IScreenOrientation, IScreenPoint, IScreenScrollParams, IScreenSize, ScreenSizeMarksType } from "./types";
export declare class ScreenConcept implements IScreenConcept {
    protected component_?: IComponent | undefined;
    protected sizeMarkList_?: ScreenSizeMarksType[] | undefined;
    protected id_: string;
    protected size_: IScreenSize;
    protected scrollOffset_: IScreenPoint<number>;
    protected scrollTrend_: IScreenOrientation<-1 | 0 | 1>;
    protected scrollStreak_: IScreenOrientation<number>;
    protected listeners_: {
        size: (() => void) | null;
        scroll: (() => void) | null;
    };
    constructor(component_?: IComponent | undefined, sizeMarkList_?: ScreenSizeMarksType[] | undefined);
    StopListening(): void;
    Scroll({ to, from, animate }: IScreenScrollParams): void;
    ScrollTop(animate?: boolean): void;
    ScrollRight(animate?: boolean): void;
    ScrollBottom(animate?: boolean): void;
    ScrollLeft(animate?: boolean): void;
    GetScrollOffset(): {
        x: number;
        y: number;
    };
    GetScrollPercentage(): IScreenPoint<number>;
    GetScrollTrend(): {
        horizontal: 0 | 1 | -1;
        vertical: 0 | 1 | -1;
    };
    GetScrollStreak(): {
        horizontal: number;
        vertical: number;
    };
    GetSize(): {
        width: number;
        height: number;
    };
    GetSizeMarks(): [string, number];
    GetBreakpoint(): string;
    GetCheckpoint(): number;
    GetSizeMarkLevel(mark: string | number): number;
    protected PassValue_<T>(prop: string, value: T): T;
    protected HandleResize_(): void;
    protected HandleScroll_(): void;
    protected FindSizeMarks_(width: number): [string, number];
    static GetScrollOffset(): IScreenPoint<number>;
    static ComputeScrollPercentage({ x, y }: IScreenPoint<number>): IScreenPoint<number>;
}
