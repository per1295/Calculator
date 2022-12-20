import styles from "../styles/Calculator.module.scss";
import { useEffect } from "react";

import CalculatorWindow from "./CalculatorWindow";
import CalculatorPanel from "./CalculatorPanel";

export default function Calculator() {
    useEffect(() => {
        const timestap = localStorage.getItem("calculator-timestap");
        if ( timestap ) {
            const diff = Date.now() - +timestap;
            const seconds = diff / 1000;
            
            if ( seconds >= 604800 ) localStorage.clear();
        }
    }, []);

    return(
        <div className={styles.calculator}>
            <CalculatorWindow/>
            <CalculatorPanel/>
        </div>
    )
}