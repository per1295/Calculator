import styles from "../styles/CalculatorPanel.module.scss";

import CalculatorPanelButton from "./CalculatorPanelButton";

export type ButtonType =
"number" | "percent" | "period" | "clear" | "devide" | "multiply" | "delete" | "minus" | "plus" | "equal";

export default function CalculatorPanel() {
    const arrayOfButtons = [
        "clear",
        7,
        4,
        1,
        "percent",
        "devide",
        8,
        5,
        2,
        0,
        "multiply",
        9,
        6,
        3,
        "period",
        "delete",
        "minus",
        "plus",
        "equal"
    ] as unknown as (number | ButtonType)[];

    return (
        <div className={styles.calculator_panel}>
            {
                arrayOfButtons.map((item, index) => (
                    <CalculatorPanelButton
                    key={index}
                    type={typeof item === "string" ? item : "number"}
                    valueNumber={typeof item === "number" ? item : undefined} />
                ))
            }
        </div>
    )
}