import type { WritableDraft } from "immer/dist/internal";
import type { Calculator } from "./types";

export function isNumber(value: any) {
    return !isNaN(value) && value !== null;
}

export function setLastSymbol(state: WritableDraft<Calculator>, value: string | number | null) {
    state.lastSymbol = value;
}