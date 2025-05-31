import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { WebSocketProvider } from "./context/WebsocketContext.tsx";
import { Provider } from "react-redux";
import { store } from "./store/Store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AuthProvider>
      <WebSocketProvider>
        <App />
      </WebSocketProvider>
    </AuthProvider>
  </Provider>
);
