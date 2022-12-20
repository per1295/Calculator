import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Calculator } from "../types";
import { isNumber, setLastSymbol } from "../functions";

const initialState = {
    numbers: [],
    operators: [],
    lastSymbol: null,
    result: null
} as Calculator;

const calculatorSlice = createSlice({
    name: "calculator",
    initialState,
    reducers: {
        number(state, action: PayloadAction<number>) {
            if ( state.result ) {
                state.numbers = [];
                state.operators = [];
                state.lastSymbol = null;
                state.result = null;
            }

            const payload = `${action.payload}`;

            const lastSymbol = state.lastSymbol;
            let lastNumber = state.numbers.at(-1) as number | string;

            if ( isNumber(lastSymbol) || lastSymbol === "." ) {
                let newLastNumber: string;

                if ( isNumber(lastSymbol) ) {
                    newLastNumber = `${lastNumber}${payload}`;
                    state.numbers[state.numbers.length - 1] = newLastNumber;
                } else {
                    lastNumber = state.numbers.at(-2) as string;
                    newLastNumber = `${lastNumber}.${payload}`;
                    Array.from({ length: 2 }).forEach(() => state.numbers.pop());
                    state.numbers.push(newLastNumber);
                }

                setLastSymbol(state, newLastNumber);
            } else {
                state.numbers.push(payload);

                setLastSymbol(state, payload);
            }
        },
        percent(state) {
            const lastSymbol = state.lastSymbol;

            if ( isNumber(lastSymbol) ) {
                const lastNumber = state.numbers.at(-1) as string;
                const newLastNumber = +lastNumber / 100;
                state.numbers[state.numbers.length - 1] = `${newLastNumber}`;

                setLastSymbol(state, newLastNumber);
            }
        },
        period(state) {
            const lastSymbol = state.lastSymbol;

            if ( isNumber(lastSymbol) && !`${lastSymbol}`.includes(".") ) {
                state.numbers.push(".");

                setLastSymbol(state, ".");
            }
        },
        clear(state) {
            state.numbers = [];
            state.operators = [];
            state.lastSymbol = null;
            state.result = null;
        },
        devide(state) {
            if ( isNumber(state.lastSymbol) ) {
                state.operators.push("/");

                setLastSymbol(state, "/");
            }
        },
        multiply(state) {
            if ( isNumber(state.lastSymbol) ) {
                state.operators.push("*");

                setLastSymbol(state, "*");
            }
        },
        deleteFn(state) {
            const lastSymbol = state.lastSymbol;

            if ( isNumber(lastSymbol) ) {
                const lastNumber = state.numbers.at(-1) as string;

                if ( `${lastNumber}`.length > 1 ) {
                    const newLastNumberArray = `${lastNumber}`.split("");
                    newLastNumberArray.pop();
                    const newLastNumber = +newLastNumberArray.join("");

                    state.numbers.pop();
                    state.numbers.push(`${newLastNumber}`);

                    setLastSymbol(state, newLastNumber);
                } else {
                    state.numbers.pop();

                    setLastSymbol(state, state.operators.at(-1) as string);
                }
            } else {
                if ( lastSymbol === "." ) state.numbers.pop();
                else state.operators.pop();

                setLastSymbol(state, state.numbers.at(-1) as string);
            }
        },
        minus(state) {
            if ( isNumber(state.lastSymbol) ) {
                state.operators.push("-");

                setLastSymbol(state, "-");
            }
        },
        plus(state) {
            if ( isNumber(state.lastSymbol) ) {
                state.operators.push("+");

                setLastSymbol(state, "+");
            }
        },
        equal(state) {
            let resultString = "";

            for ( let i = 0; i < state.numbers.length; i++ ) {
                const nowNumber = state.numbers[i];
                const nowOperator = state.operators[i];

                if ( typeof nowOperator !== "undefined" ) {
                    resultString += `${nowNumber} ${nowOperator} `;
                } else {
                    resultString += `${nowNumber}`;
                }
            }

            const getResultFn = new Function(`return ${resultString}`) as () => number;

            state.result = +getResultFn().toFixed(5);

            setLastSymbol(state, null);
        }
    }
});

export default calculatorSlice.reducer;

export const {
    number,
    percent,
    period,
    devide,
    minus,
    plus,
    multiply,
    deleteFn,
    equal,
    clear
} = calculatorSlice.actions;