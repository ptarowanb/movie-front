"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import ic_search from "@/assets/icons/search.svg"
import { useParams, useRouter } from 'next/navigation';
import useBreakpoint from '@/hook/useBreakpoint';
import CloseIcon from '@mui/icons-material/Close';
import { usePage } from '../ContextPage';

const SearchMovie: React.FC = () => {
    const screenSize = useBreakpoint();
    const { setCurrentPage } = usePage()
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDisplayExpanded,setIsDisplayExpanded] = useState(false)
    const router = useRouter();
    const param = useParams()
    const [inputValue, setInputValue] = useState(!!param ? param.key : '');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (inputValue) {
                router.push(`/search/${inputValue}`);
                setCurrentPage(0)
            }
            else {
                router.replace('/')
                setCurrentPage(0)
            }

        }
    };

    const handleDeleteSearch = () => {
        setInputValue('')
        router.replace('/')
        setCurrentPage(0)
    }

    const handleSearch = () => {
        if (inputValue) {
            router.push(`/search/${inputValue}`);
            setCurrentPage(0)
        }
        else {
            router.replace('/')
            setCurrentPage(0)
        }
    }

    const toggleSearchBar = () =>{
        setIsDisplayExpanded((prev)=>!prev)
    }

    return (
        <>
            {screenSize === 'desktop' ?
                <div className='relative flex items-center justify-end'>
                    <div className={`transition-all duration-300 ease-in-out ${isDisplayExpanded ? 'w-full' : 'w-0'} overflow-hidden`}>
                    <input onKeyDown={handleKeyDown} type="text" className='w-full rounded-[60px] h-9 border-solid border-[1px] border-[#4A688E] bg-[black] px-4 focus:outline-none' placeholder='검색' value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                        }} />
                    {!!inputValue && <div onClick={handleDeleteSearch} className='absolute font-black text-white -translate-y-1/2 cursor-pointer right-11 top-1/2'>
                        <CloseIcon sx={{
                            width: "16px",
                            height: "16px"
                        }} />
                    </div>}
                    </div>
                    <div className='ml-2 cursor-pointer' onClick={toggleSearchBar}>
                        <Image src={ic_search} width={24} height={24} alt='ic_search' />
                    </div>
                </div> :
                <div className="relative flex justify-end w-full">
                    <div className='absolute -translate-y-1/2 cursor-pointer right-4 top-1/2' onClick={handleSearch}>
                        <Image src={ic_search} width={24} height={24} alt='ic_search' />
                    </div>
                    <input
                        type="text"
                        className={`transition-all duration-300 ease-in-out bg-gray-800 text-white py-2 px-4 rounded-full focus:outline-none
                        ${isExpanded ? 'w-full' : 'w-20'}`}
                        onFocus={() => setIsExpanded(true)}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                        }}
                        value={inputValue}
                        onKeyDown={handleKeyDown}
                    />

                </div>
            }
        </>
    );
};

export default SearchMovie;