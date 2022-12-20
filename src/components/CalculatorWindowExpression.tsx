import type { FunctionComponent } from "react";
import styles from "../styles/CalculatorWindowExpression.module.scss";

interface CalculatorWindowExpressionProps {
    string: string;
    result: string | number;
}

const CalculatorWindowExpression: FunctionComponent<CalculatorWindowExpressionProps> = ({ string, result }) => {
    return(
        <div className={styles.calculator_window__item}>
            <span className={styles.calculator_window__item___string}>
                {string}
            </span>
            <span className={styles.calculator_window__item___result}>
                {result}
            </span>
        </div>
    )
}

export default CalculatorWindowExpression;