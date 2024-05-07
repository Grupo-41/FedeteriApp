import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FedeteriApp",
  description: "Aplicación de Fedetería",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link rel="icon" href="favicon.ico" sizes="any" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" precedence="default" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin="anonymous"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Staatliches&display=swap" rel="stylesheet" />
      </head>
      <body>
          <Navbar />
          <main className="d-flex justify-content-center align-items-center min-vw-100 min-vh-100">
            {children}
          </main>
        <footer style={{position: "fixed", bottom: '0px', right: '20px', color: '#555'}}>
          <p>Code 41 &copy; 2024</p>
        </footer>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin="anonymous"></Script>
      </body>
    </html>
  );
}
