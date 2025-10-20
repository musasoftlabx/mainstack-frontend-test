// * Next
import type { Metadata } from "next";

// * Page
import Main from "./main";

//* Fonts & Styles
//import "@fontsource/poppins";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Main>{children}</Main>
      </body>
    </html>
  );
}
