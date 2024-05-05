import { Inter } from "next/font/google";
import "./globals.css";
import ContextProvider from "@/components/ContextProvider/ContextProvider";

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
      </head>
      <body>
        <nav className="navbar fixed-top navbar-expand-lg" style={{background: '#e7ab12 '}}>
          <div className="container-fluid">
              <a className="navbar-brand" href="/"><img src="./Fedeteria_Horizontal.png" width="233" height="35" alt="FedeteriApp"/></a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                          <a className="nav-link" href="./signup">Registrarme</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" href="./login">Iniciar sesión</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" href="/sucursales">Ver sucursales</a>
                      </li>
                  </ul>
                  <form className="d-flex" role="search">
                      <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
                      <button type="submit" className="btn btn-outline-dark">Buscar</button>
                  </form>
              </div>
          </div>
        </nav>
        <main className="d-flex justify-content-center align-items-center min-vw-100 min-vh-100">
          <ContextProvider>
            {children}
          </ContextProvider>
        </main>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}
