import { configureStore } from "@reduxjs/toolkit";
import Store from "./types";

import calculator from "./slices/calculator";

const store = configureStore<Store>({
    reducer: {
        calculator
    }
});

export default store;