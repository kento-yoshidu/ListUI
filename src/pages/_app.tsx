import { AuthProvider } from "@/context/AuthProvider";
import { SnackbarProvider } from "@/context/SnackBarContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <DndProvider backend={HTML5Backend}>
            <Component {...pageProps} />
          </DndProvider>
        </QueryClientProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
};
