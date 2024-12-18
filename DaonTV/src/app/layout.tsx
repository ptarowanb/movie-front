"use client";
import { makeStore } from "@/lib/store";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "tailwindcss/tailwind.css";
import { ToastContainer, Bounce } from "react-toastify";
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
        <html lang="en">
          {/* SEO 설정 추가  2024-10-02 jun*/}
          <title>TV888 – 무료 다시보기 사이트</title>
          <meta name="description" content="TV888에서 최신 드라마와 영화를 무료로 다시 보세요." />
          <meta name="keywords" content="무료 다시보기, TV888, 최신 드라마, 영화, 다시보기 사이트" />

          {/* Open Graph 태그 (소셜 미디어 공유용) */}
          <meta property="og:title" content="TV888 – 무료 다시보기 사이트" />
          <meta property="og:description" content="최신 드라마와 영화를 무료로 다시 보세요." />
          <meta property="og:image" content="/images/logo.png" />
          <meta property="og:url" content="https://newtv1.com" />

          {/* 트위터 카드 설정 */}
          <meta name="twitter:card" content="summary_large_image" />
          <body className="text-white bg-black">
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
          </body>
        </html>
      </ThemeProvider>
    </Provider>
  );
}