import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './introduceMovieCustom.css';
// import './introduce-desktop.css';
import temp_1 from"@/assets/images/temp-1.png";
import temp_2 from"@/assets/images/temp-2.png";
import temp_3 from"@/assets/images/temp-3.png";
import { Swiper as SwiperClass } from 'swiper/types';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import { Button } from '@mui/material';
import { IMovieIntroduce } from '@/models/movie';
const IntroduceMovieDesktop = ({ introduceHomePage }: { introduceHomePage: IMovieIntroduce[] }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

    const [tempIntro,setTempIntro]= useState<IMovieIntroduce[]>(
        [
            {img:temp_1,title:"aaa",id:1,views:"views"},
            {img:temp_2,title:"bbb",id:2,views:"views"},
            {img:temp_3,title:"ccc",id:3,views:"views"},
            {img:temp_1,title:"ddd",id:4,views:"views"},
            {img:temp_2,title:"eee",id:5,views:"views"},
            {img:temp_3,title:"fff",id:6,views:"views"},
        ]
    )
    

    console.log("aaa",introduceHomePage)
    return (
        <div className='relative swiper-introduce py-5 container m-auto'>

            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                    padding:"0 300px"
                } as React.CSSProperties}
                loop={true}
                centeredSlides={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="customSwiper2"
                slidesPerView={1}
            >
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
                <div className="absolute top-0 left-0 w-1/5 h-full bg-gradient-to-r from-black to-transparent"></div>
                <div className="absolute top-0 right-0 w-1/5 h-full bg-gradient-to-l from-black to-transparent"></div>
            </div>
                {JSON.stringify(introduceHomePage)}
                {introduceHomePage ? introduceHomePage?.map((intro: IMovieIntroduce) => {
                    return (
                        <SwiperSlide key={intro.id}>
                            <div className='relative w-full h-full'>
                                <div className='relative w-full h-[56vh]'>
                                    <Image
                                        src={intro.img}
                                        alt={intro.title}
                                        fill
                                        objectFit='center'
                                        className="top-0 left-0 object-center w-full h-full rounded-2xl"
                                    />
                                </div>
                                {/* <div className='absolute top-1/2 left-7'>
                                    <h4 className='text-white font-normal text-[54px] leading-[66px] text-introduce'>{intro.title}</h4>
                                    {intro.views && <span>{`${intro.views} views`}</span>}
                                    <div className='flex items-center gap-4 mt-9'>
                                        <Button sx={{
                                            background: "red",
                                            color: "white",
                                            fontSize: "24px",
                                            fontWeight: "700",
                                            lineHeight: "30px",
                                            height: "59px",
                                            width: "221px",
                                            textTransform: "none",
                                            borderRadius: "11px"
                                        }}>
                                            Watch now
                                        </Button>
                                        <Button sx={{
                                            background: "transparent",
                                            color: "white",
                                            fontSize: "24px",
                                            fontWeight: "700",
                                            lineHeight: "30px",
                                            height: "59px",
                                            width: "221px",
                                            border: "1px solid #ccc",
                                            textTransform: "none",
                                            borderRadius: "11px"
                                        }}>
                                            Trailer
                                        </Button>
                                    </div>
                                </div> */}

                            </div>
                        </SwiperSlide>
                    )
                }) : tempIntro?.map((intro: IMovieIntroduce) => {
                    return (
                        <SwiperSlide key={intro.id}>
                            <div className='relative w-full h-full'>
                                <div className='relative w-full h-[42vh]'>
                                    <Image
                                        src={intro.img}
                                        alt={intro.title}
                                        fill
                                        objectFit='center'
                                        className="top-0 left-0 object-cover w-full h-full rounded-2xl"
                                    />
                                </div>
                                {/* <div className='absolute top-1/2 left-7'>
                                    <h4 className='text-white font-normal text-[54px] leading-[66px] text-introduce'>{intro.title}</h4>
                                    {intro.views && <span>{`${intro.views} views`}</span>}
                                    <div className='flex items-center gap-4 mt-9'>
                                        <Button sx={{
                                            background: "red",
                                            color: "white",
                                            fontSize: "24px",
                                            fontWeight: "700",
                                            lineHeight: "30px",
                                            height: "59px",
                                            width: "221px",
                                            textTransform: "none",
                                            borderRadius: "11px"
                                        }}>
                                            Watch now
                                        </Button>
                                        <Button sx={{
                                            background: "transparent",
                                            color: "white",
                                            fontSize: "24px",
                                            fontWeight: "700",
                                            lineHeight: "30px",
                                            height: "59px",
                                            width: "221px",
                                            border: "1px solid #ccc",
                                            textTransform: "none",
                                            borderRadius: "11px"
                                        }}>
                                            Trailer
                                        </Button>
                                    </div>
                                </div> */}

                            </div>
                        </SwiperSlide>
                    )
                }) }
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="customSwiper"
            >
                {introduceHomePage?.map((intro: IMovieIntroduce) => {
                    console.log("!!!!id : "+intro.id);
                    return (
                        <SwiperSlide key={intro.id}>
                            <div className='relative w-full h-[120px]'>
                                <Image src={intro.img} alt={intro.title} fill className='object-cover rounded-md' />
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    );
};

export default IntroduceMovieDesktop;