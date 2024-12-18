/* eslint-disable @next/next/no-page-custom-font */
"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import { Bounce } from "react-toastify";
import LayoutCommon from "@/components/LayoutCommon";
import { PageProvider } from "@/components/ContextPage";
const HomepageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Head>
        <div>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Jaro:opsz@6..72&display=swap"
            rel="stylesheet"
          />
        </div>
      </Head>
      <PageProvider>
        <Header />
        <main className="pt-20 lg:pt-24 font-joro">
          <div className="w-full mx-auto bg-[black] pb-[54px] pt-4">
            <LayoutCommon>
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
                transition={Bounce}
              />
            </LayoutCommon>
          </div>
        </main>
        <Footer />
      </PageProvider>
    </div>
  );
};

export default HomepageLayout;
