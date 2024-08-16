import Providers from "@/components/Providers";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
        <Providers>
          <Header/>
          <main>
         
            {children}
          </main>
        </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
