import { useSelector as us } from "react-redux";
import Store from "./redux/types";

export function useSelector<Key extends keyof Store>(selector: (store: Store) => Store[Key]) {
    return us(selector);
}

export { useDispatch } from "react-redux";