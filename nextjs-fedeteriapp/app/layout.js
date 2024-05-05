import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FedeteriApp",
  description: "Aplicación de Fedetería",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon.ico" sizes="any" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" precedence="default" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin="anonymous"></link>
      </head>
      <body>
        <nav class="navbar fixed-top navbar-expand-lg bg-primary">
          <div class="container-fluid">
              <a class="navbar-brand" href="#"><img src="./Fedeteria_Horizontal.png" width="233" height="35" alt="FedeteriApp"/></a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                      <li class="nav-item">
                          <a class="nav-link" href="./signup.html">Registrarme</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="./login.html">Iniciar sesión</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="/sucursales">Ver sucursales</a>
                      </li>
                  </ul>
                  <form class="d-flex" role="search">
                      <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
                      <button type="submit" class="btn btn-outline-warning">Buscar</button>
                  </form>
              </div>
          </div>
        </nav>
        <main className="d-flex justify-content-center align-items-center min-vw-100 min-vh-100">
          {children}
        </main>
      </body>
    </html>
  );
}
