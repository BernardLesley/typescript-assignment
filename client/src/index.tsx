/* eslint-disable linebreak-style */
import { createRoot } from "react-dom/client";
import { GlobalProvider } from "./GlobalContext";
import App from "./App";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <GlobalProvider>
        <App />
    </GlobalProvider>
);