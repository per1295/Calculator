import styles from "../styles/CalculatorWindow.module.scss";
import { useMemo, useState, useEffect, useRef } from "react";
import { useSelector } from "../customHooks";

import CalculatorWindowExpression from "./CalculatorWindowExpression";

interface CalculatorWindowCached {
    string: string;
    result: string;
}

export default function CalculatorWindow() {
    const calculator = useSelector<"calculator">(state => state.calculator);
    const [ cache, setCache ] = useState<CalculatorWindowCached[]>([]);
    const calculatorWindow = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const storageCache = localStorage.getItem("calculator-cache");

        if ( storageCache ) {
            const parsedStorageCache = JSON.parse(storageCache) as CalculatorWindowCached[];
            setCache(parsedStorageCache);
        }
    }, []);

    const string = useMemo(() => {
        let result = "";

        const numbers = calculator.numbers, operators = calculator.operators;

        for ( let i = 0; i < numbers.length; i++ ) {
            const nowNumber = numbers[i];
            let nowOperator = operators[i];

            if ( nowOperator === "/" ) nowOperator = "÷";
            if ( nowOperator === "*" ) nowOperator = "x";

            if ( typeof nowOperator !== "undefined" ) {
                result += `${nowNumber} ${nowOperator} `;
            } else {
                result += `${nowNumber}`;
            }
        }

        return result;
    }, [calculator.numbers, calculator.operators]);

    useEffect(() => {
        const calcWindow = calculatorWindow.current as HTMLDivElement;

        const timeout = setTimeout(() => {
            calcWindow.scroll({
                top: calcWindow.scrollHeight,
                behavior: "smooth"
            });
        });

        return () => {
            clearTimeout(timeout);
        }
    }, [ string, calculator.result ]);

    useEffect(() => {
        if ( calculator.result ) {
            const newCacheObject = { string, result: `${calculator.result}` };

            setCache(state => [...state, newCacheObject]);

            const storageCache = localStorage.getItem("calculator-cache");

            if ( storageCache ) {
                const parsedStorageCache = JSON.parse(storageCache) as CalculatorWindowCached[];
                parsedStorageCache.push(newCacheObject);
                localStorage.setItem("calculator-cache", JSON.stringify(parsedStorageCache));
            } else {
                localStorage.setItem("calculator-cache", JSON.stringify([ newCacheObject ]));
            }

            const timestap = Date.now();
            localStorage.setItem("calculator-timestap", `${timestap}`);
        }
    }, [ calculator.result ]);

    useEffect(() => {
        const calcWindow = calculatorWindow.current as HTMLDivElement;
        if ( cache.length >= 3 ) {
            calcWindow.classList.add(styles.calculator_windowOverflow);
        }
    }, [ cache ]);

    const expressions = calculator.result ? cache : [ ...cache, { string, result: calculator.result ?? ""} ];

    return(
        <div className={styles.calculator_window} ref={calculatorWindow}>
            {
                expressions.map(({string, result}, index) => (
                    <CalculatorWindowExpression key={index} string={string} result={result} />
                ))
            }
        </div>
    )
}