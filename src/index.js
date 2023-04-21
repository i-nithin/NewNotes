import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { makeServer } from "./server";
import App from "./App";
import {
  AuthProvider,
  ThemeProvider,
  NoteProvider,
  ArchiveProvider,
  FilterProvider,
} from "./frontend/context";
import { BrowserRouter } from "react-router-dom";

import "./styles.css";

makeServer();

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

makeServer();

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <NoteProvider>
            <ArchiveProvider>
              <FilterProvider>
                <App />
              </FilterProvider>
            </ArchiveProvider>
          </NoteProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
