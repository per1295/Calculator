export interface Calculator {
    numbers: string[];
    operators: string[];
    lastSymbol: number | string | null;
    result: number | null;
}

export default interface Store {
    calculator: Calculator
}