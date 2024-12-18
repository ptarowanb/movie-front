import "react-toastify/dist/ReactToastify.css";
import ClientLayout from "@/layout/clientlayout";
// import GoogleAnalytics from "../lib/GoogleAnalytics";

export const metadata = {
  title: "MOATV – 무료 다시보기 사이트",
  description: "MOATV 최신 드라마와 영화를 무료로 다시 보세요.",
  keywords: ["무료 다시보기", "MOATV", "최신 드라마", "영화", "다시보기 사이트"],
  openGraph: {
    title: "MOATV – 무료 다시보기 사이트",
    description: "최신 드라마와 영화를 무료로 다시 보세요.",
    url: "https://newtv1.com",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
        alt: "MOATV 로고",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true, 
    follow: true,
  },
  canonical: "https://newtv1.com", 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null} */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}