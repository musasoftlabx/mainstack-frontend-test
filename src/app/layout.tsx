// * Next
import type { Metadata } from "next";

// * Page
import Main from "./main";

//* Fonts & Styles
import localFont from "next/font/local";

const degularFont = localFont({
  src: [
    {
      path: "../../public/fonts/degular/Degular-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/degular/Degular-Bold.otf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-degular",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mainstack",
  description: `Mainstack empowers global service-based businesses (creators, training platforms, consultants,
immigration advisors) with seamless payment, subscription, and client management tools. We
help businesses scale internationally by solving pain points like cross-border payments,
invoicing, and tax compliance.
`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={degularFont.className} suppressHydrationWarning>
      <body>
        <Main>{children}</Main>
      </body>
    </html>
  );
}
