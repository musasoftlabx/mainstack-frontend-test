"use client";

// * NPM
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

// * Store
import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";

type Props = Readonly<{
  children: React.ReactNode;
}>;

// * Axios config
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
axios.defaults.timeout = 60000;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.interceptors.request.use(
  (req) => req,
  (err) => Promise.reject(err)
);

const queryClient = new QueryClient();

const system = createSystem(
  defaultConfig,
  defineConfig({
    theme: {
      tokens: {
        colors: {},
      },
    },
  })
);

export default function QueryProvider({ children }: Props) {
  return (
    <ChakraProvider value={system}>
      {/* <Component {...pageProps} /> */}
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ChakraProvider>
  );
}
