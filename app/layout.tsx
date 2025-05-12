import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hubiquiti ",
  description: "Hubiquiti",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster
          toastOptions={{
            unstyled: false,
            classNames: {
              error: "bg-red-400",
              success: "border-border bg-background text-green-400",
              loading: "border-border bg-background text-foreground",
              warning: "border-border bg-background text-yellow-400",
              info: "bg-blue-400",
            },
          }}
        />
      </body>
    </html>
  );
};

export default RootLayout;
