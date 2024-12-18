import useBreakpoint from "@/hook/useBreakpoint";
import { IHeaderMovie, movieCategoriesDetails } from "@/models/movie";
import { Container } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { usePage } from "../ContextPage";
import { useGetSiteConfigQuery } from "@/services/siteConfigService";
const Footer: React.FC = () => {
  const { data, status } = useGetSiteConfigQuery({});
  const screenSize = useBreakpoint();
  const { currentPage, setCurrentPage } = usePage();
  const [dataSiteConfig, setDataSiteConfig] = useState([
    {
      siteName: "",
      contact: "",
    },
  ]);
  const router = useRouter();
  const handleNavigate = (detail?: IHeaderMovie) => {
    if (!!detail) {
      router.push(`/category/${detail.id}`);
      setCurrentPage(detail.id);
    } else {
      router.push("/");
      setCurrentPage(0);
    }
  };

  useEffect(() => {
    if (status === "fulfilled") {
      setDataSiteConfig(data.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSiteConfig, status]);

  return (
    <div className="w-full pt-10 pb-[62px] bg-[#12171E]">
      <Container>
        <div className="flex flex-col gap-4">
          {screenSize === "desktop" ? (
            <div className="flex items-center gap-9">
              <div
                className={`relative py-4 w-fit text-sm font-semibold transition-colors duration-300 cursor-pointer hover:text-white ${
                  currentPage === 0 ? "text-white" : "text-[#FFBB00]"
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:border-b after:border-[#FFBB00] after:border-solid after:border-[1px] after:w-full after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100`}
                onClick={() => handleNavigate()}
              >
                <span>HOME</span>
              </div>
              {Object.values(movieCategoriesDetails).map((detail) => {
                return (
                  <div key={detail.id} className="relative py-4 w-fit">
                    <div
                      onClick={() => handleNavigate(detail)}
                      className={`text-sm font-semibold transition-colors duration-300 cursor-pointer hover:text-white ${
                        currentPage === detail.id
                          ? "text-white"
                          : "text-[#FFBB00]"
                      } after:content-[''] after:absolute after:bottom-0 after:left-0 after:border-b after:border-[#FFBB00] after:border-solid after:border-[1px] after:w-full after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100`}
                    >
                      <span> {detail.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="relative w-[100px] h-[40px] object-fill mb-7">
              <Image src={logo} alt="logo" fill />
            </div>
          )}

          <p className="text-[#D9D9D9] text-[12px]">
            <span>{dataSiteConfig[0]?.siteName}</span> 무료 다시보기
            서비스입니다
          </p>
          <p className="text-[#D9D9D9] text-[12px]">
            <span>{dataSiteConfig[0]?.siteName}</span> 링크 제공
            사이트입니다. 이 웹 사이트에는 음악, 비디오, 멀티미디어 파일을
            저장하지 않습니다. 또한 이 사이트에서 제공 되는 콘텐츠는 링크 된
            콘텐츠 이므로 <br />
            저작권, 적법성, 정확성, 규정 준수 또는 기타 측면에 대해{" "}
            <span>{dataSiteConfig[0]?.siteName}</span> 책임이 없습니다.저작권 등
            법적 문제가 있는 경우 적절한 미디어 파일 소유자 또는 호스팅 업체에
            문의하십시오. <br />
            {/* Here is the part where you can dynamically insert the ID. 2024-10-01 jun*/}
            {/* <a href={`https://t.me/${dataSiteConfig[0]?.strID}`} target="_blank" rel="noopener noreferrer">{dataSiteConfig[0]?.contact}</a> */}
            연락처: <a href={`https://t.me/Sinhan777`} target="_blank" rel="noopener noreferrer">{dataSiteConfig[0]?.contact}</a>
          </p>
          <p className="text-[12px]">Copyright © 티비몬 All right reserved.</p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
