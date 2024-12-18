"use client";

import { makeStore } from "@/lib/store";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ToastContainer, Bounce } from "react-toastify";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";

const store = makeStore();
const theme = createTheme();

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="text-white bg-gray-900">
          {children}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </div>
      </ThemeProvider>
    </Provider>
  );
}