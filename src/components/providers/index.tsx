import React from "react";
import NextAuthProvider from "./components/next-auth-provider";
import { NextIntlClientProvider, useMessages } from "next-intl";
import ReactQueryProvider from "./components/react-query-provider";
import { MapProvider } from "./components/map-provider";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <MapProvider>
        <NextAuthProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </NextAuthProvider>
      </MapProvider>
    </NextIntlClientProvider>
  );
};

export default Providers;
