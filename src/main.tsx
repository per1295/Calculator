import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

const conteiner = document.getElementById("root") as HTMLDivElement;
const root = createRoot(conteiner);

root.render(
    <StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </StrictMode>
);