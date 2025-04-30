
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initPromise } from "./lib/i18n";

const root = createRoot(document.getElementById("root")!);

// Wait for i18n to initialize before rendering
initPromise.then(() => {
  root.render(<App />);
}).catch(err => {
  console.error('Failed to initialize i18n:', err);
});
