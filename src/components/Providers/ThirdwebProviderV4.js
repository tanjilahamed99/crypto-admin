"use client";

import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Sepolia, Binance } from "@thirdweb-dev/chains";
import { SessionProvider } from "next-auth/react";
export default function ThirdwebProviderV4({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider
        clientId={"dc77039ae2803c20500acdc580770807"}
        secretKey={
          "Wa2LoaKZ5D6uq1xUt_qw5yOY3DXP4Pdd7h5g9KsiKPhXXVegJnpYiNe0x6Y_hhRcFmqszWwidhBDfhgOZaFuew"
        }
        autoConnect={false}
        activeChain={Binance}
      >
        <SessionProvider>{children}</SessionProvider>
      </ThirdwebProvider>
    </QueryClientProvider>
  );
}
