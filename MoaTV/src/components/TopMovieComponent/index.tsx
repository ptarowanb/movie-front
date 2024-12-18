import Image from 'next/image';
import React from 'react';
import ic_news from '@/assets/icons/ic_new.svg'
import { Tooltip } from '@mui/material';
import { encodeData } from '@/utils/utils';
import { useRouter } from 'next/navigation';
const TopMovieComponent = ({ img, title, des, isNew, title_id, number_ep }: { img: string, title: string, des: string, isNew: boolean, title_id: number, number_ep: string }) => {


    const encoded = encodeData({ id: title_id, title: title, number_ep: number_ep })
    const router = useRouter()
    const handleNavigateDetailMovie = () => {
        router.push(`/detail/${encoded}`)
    }

    return (
        <div className='relative cursor-pointer' onClick={handleNavigateDetailMovie}>
            <div className='flex justify-between'>
                <div className='flex gap-5'>
                    <div className='relative w-[60px] h-[86px]'>
                        <Image src={img} alt={title} fill />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='text-[#F1F1F1] font-medium text-sm'>{title}</span>

                        <Tooltip title={des}>
                            <span className='text-[#FFAF51] font-medium text-[10px] line-clamp-1 truncate max-w-[250px]'>{des}</span>
                        </Tooltip>
                    </div>
                </div>
                {isNew &&
                    <div className='relative h-6 w-11'>
                        <Image src={ic_news} alt='ic_news' fill />
                    </div>
                }
            </div>
            <div style={{
                border: "1px solid",
                borderImageSource: "linear-gradient(90deg, #5176FF 0%, #1C232C 100%)",
                borderImageSlice: 1,
                width: "100%",
                position: "absolute",
                bottom: "-10px"
            }}></div>
        </div>
    );
};

export default TopMovieComponent;