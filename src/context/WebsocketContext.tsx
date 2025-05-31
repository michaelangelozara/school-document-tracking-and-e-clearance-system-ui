// contexts/WebSocketContext.tsx
import React, {
  createContext,
  useEffect,
  useRef,
  ReactNode,
  useContext,
  useCallback,
} from "react";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useAuth } from "./AuthContext";

type MessagePayload = Record<string, any>;

type WebSocketContextType = {
  client: Client | null;
  sendMessage: (destination: string, body: any) => void;
  subscribe: (destination: string, body: any) => void;
  isConnected: boolean;
};

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const clientRef = useRef<Client | null>(null);
  const subscriptions = useRef<Map<string, (message: IMessage) => void>>(
    new Map()
  );
  const [isConnected, setIsConnected] = React.useState(false);

  const { token, isTokenChecking } = useAuth();
  useEffect(() => {
    if (token) {
      const client = new Client({
        webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
        onConnect: () => {
          setIsConnected(true);
          subscriptions.current.forEach((callback, destination) => {
            client.subscribe(destination, callback);
          });
        },
        onDisconnect: () => setIsConnected(false),
        onStompError: (frame) => {
          console.error("WebSocket Error:", frame.body);
        },
      });

      clientRef.current = client;
      client.activate();

      return () => {
        client.deactivate();
        subscriptions.current.clear();
      };
    }
  }, [isTokenChecking]);

  const sendMessage = useCallback(
    (destination: string, body: MessagePayload) => {
      if (clientRef.current?.connected) {
        clientRef.current.publish({ destination, body: JSON.stringify(body) });
      } else {
        console.error("WebSocket not connected.");
      }
    },
    []
  );

  const subscribe = useCallback(
    (destination: string, callback: (msg: IMessage) => void) => {
      if (clientRef.current?.connected) {
        clientRef.current.subscribe(destination, callback);
      }
      subscriptions.current.set(destination, callback);
    },
    []
  );

  return (
    <WebSocketContext.Provider
      value={{
        client: clientRef.current,
        sendMessage,
        subscribe,
        isConnected,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
