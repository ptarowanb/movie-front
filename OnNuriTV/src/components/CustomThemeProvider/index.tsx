"use client"
import { makeStore } from "@/lib/store";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "tailwindcss/tailwind.css";
import React, { ReactNode } from "react";
const store = makeStore();
const theme = createTheme();
const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <html lang="en">
                    <body className="text-white bg-gray-900">
                        {children}
                    </body>
                </html>
            </ThemeProvider>
        </Provider>
    );
};

export default CustomThemeProvider;