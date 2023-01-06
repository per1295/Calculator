import type { FunctionComponent } from "react";
import { useMemo } from "react";
import styles from "../styles/CalculatorPanelButton.module.scss";
import type { ButtonType } from "./CalculatorPanel";
import { useDispatch } from "../customHooks";
import {
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
} from "../redux/slices/calculator";

interface CalculatorPanelButtonProps {
    type: ButtonType;
    tabIndex: number;
    valueNumber?: number;
}

interface INaNContent {
    [key: string]: any;
}

const NaNContent = Object.freeze<INaNContent>({
    percent: "%",
    period: ".",
    clear: "C",
    devide: "÷",
    multiply: "x",
    minus: "-",
    plus: "+",
    equal: "="
});

const CalculatorPanelButton: FunctionComponent<CalculatorPanelButtonProps> = ({ type, valueNumber, tabIndex }) => {
    const dispatch = useDispatch();

    const buttonClassName =
    type === "percent" ? `${styles.calculator_panel__button} ${styles.calculator_panel__buttonLeftBottom }`
    :
    type === "equal" ? styles.calculator_panel__buttonRightBottom
    :
    styles.calculator_panel__button

    const isOrangeContent = type === "devide" || type === "multiply" || type === "minus" || type === "plus";

    const content = useMemo(() => (
        type === "number"
        ? 
        valueNumber ?? 0
        :
        type === "delete"
        ?
        <svg width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.1067 1.05804H18.2098V9.45536H7.1067H5.61326L0.730988 4.82562L5.58699 1.05804H7.1067Z" stroke="#FFA800" strokeWidth="0.933036"/>
            <path d="M10.7595 7.125L12.1451 5.29858L10.8155 3.56314H11.6343L12.551 4.78775L13.4677 3.56314H14.2584L12.9428 5.29158L14.3494 7.125H13.5237L12.544 5.80942L11.5503 7.125H10.7595Z" fill="#FFA800"/>
        </svg>
        :
        NaNContent[type]
    ), []);

    const onClick = () => {
        switch(type) {
            case "clear":
                dispatch( clear() );
                break;
            case "delete":
                dispatch( deleteFn() );
                break;
            case "devide":
                dispatch( devide() );
                break;
            case "equal":
                dispatch( equal() );
                break;
            case "minus":
                dispatch( minus() );
                break;
            case "multiply":
                dispatch( multiply() );
                break;
            case "number":
                if ( typeof valueNumber !== "undefined" ) dispatch( number(valueNumber) );
                break;
            case "percent":
                dispatch( percent() );
                break;
            case "period":
                dispatch( period() );
                break;
            case "plus":
                dispatch( plus() );
                break;
        }
    };

    return(
        <button className={buttonClassName} onClick={onClick} aria-label={type} tabIndex={tabIndex}>
            <span className={
                isOrangeContent
                ?
                `${styles.calculator_panel__button___content} ${styles.calculator_panel__button___orangeContent}`
                :
                `${styles.calculator_panel__button___content} ${styles.calculator_panel__button___whiteContent}`
                }>
                    {content}
            </span>
        </button>
    )
}

export default CalculatorPanelButton;