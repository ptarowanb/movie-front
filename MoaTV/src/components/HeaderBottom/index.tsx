"use client";
import React from "react";
import { IHeaderMovie, movieCategoriesDetails } from "@/models/movie";
import { useRouter } from "next/navigation";
import { usePage } from "../ContextPage";
const HeaderBottom: React.FC = () => {
  const { currentPage, setCurrentPage } = usePage();

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

  return (
    <div className="flex flex-col bg-[black] items-center">
      <div className="container mx-auto">
        <div className="flex items-center gap-9">
          <div
            className={`relative py-4 w-fit text-sm font-semibold transition-colors duration-300 cursor-pointer hover:text-[#FFBB00] ${currentPage === 0 ? "text-[#FFBB00]" : "text-white"
              } after:content-[''] after:absolute after:bottom-0 after:left-0 after:border-b after:border-[#FFBB00] after:border-solid after:border-[1px] after:w-full after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100`}
            onClick={() => handleNavigate()}
          >
            <span>HOME</span>
            {currentPage === 0 && (
              <div className="absolute bottom-0 border-b border-[#FFBB00] border-solid border-[1px] w-full"></div>
            )}
          </div>
          {Object.values(movieCategoriesDetails).map((detail) => {
            return (
              <div key={detail.id} className="relative w-fit">
                <div
                  onClick={() => handleNavigate(detail)}
                  className={`relative py-4 w-fit text-sm font-semibold transition-colors duration-300 cursor-pointer hover:text-[#FFBB00] ${currentPage === detail.id ? "text-[#FFBB00]" : "text-white"
                    } after:content-[''] after:absolute after:bottom-0 after:left-0 after:border-b after:border-[#FFBB00] after:border-solid after:border-[1px] after:w-full after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100`}
                >
                  <span> {detail.title}</span>
                  {currentPage === detail.id && (
                    <div className="absolute bottom-0 border-b border-[#FFBB00] border-solid border-[1px] w-full"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
