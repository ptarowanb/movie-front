import React from "react";
import "./header-top.css";
import Image from "next/image";
import logo from "@/assets/logo.png";
import SearchMovie from "../SearchMovie";
import ModalLogin from "../ModalLogin";
import { useRouter } from "next/navigation";

import { usePage } from "../ContextPage";

const HeaderTop: React.FC = () => {
  const router = useRouter();
  const { setCurrentPage } = usePage();
  const [openLogin, setOpenLogin] = React.useState(false);
  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleBackHome = () => {
    setCurrentPage(0);
    router.replace("/");
  };

  return (
    <>
      <div className="flex flex-col justify-center al bg-header-top h-[64px]">
        <div className="container mx-auto">
          <div className="flex justify-between gap-4">
            <div className="flex gap-[72px] justify-between items-center w-[100%]">
              <div className="cursor-pointer">
                <Image className="w-[160px]" src={logo} alt="logo" onClick={handleBackHome} />
              </div>
              <SearchMovie />
            </div>
            {/* <div className='flex gap-[5px] items-center w-[30%] justify-end'>
                            {accessToken ? (
                                <LogoutButton />
                            ) : (
                                <>
                                    <Button
                                        onClick={handleOpenLogin}
                                        sx={{
                                            height: "40px",
                                            width: "110px",
                                            background: "#4C3D59",
                                            color: "white",
                                            borderRadius: "5px",
                                            marginTop: "1px",
                                            boxShadow: '0px 2px 5px 0px #1D1327'
                                        }}>
                                        로그인
                                    </Button>
                                    <Button sx={{
                                        height: "40px",
                                        width: "110px",
                                        background: "#5176FF",
                                        color: "white",
                                        borderRadius: "5px",
                                        marginTop: "1px",
                                        boxShadow: '0px 2px 5px 0px #1D1327'
                                    }}>
                                        가입
                                    </Button>
                                </>
                            )}
                        </div> */}
          </div>
        </div>
      </div>
      <ModalLogin handleClose={handleCloseLogin} open={openLogin} />
    </>
  );
};
export default HeaderTop;
