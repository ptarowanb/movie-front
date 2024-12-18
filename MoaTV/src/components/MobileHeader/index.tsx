import React, { useState } from 'react';
import logo from '@/assets/logo.png'
import sort_ic from '@/assets/icons/sort_ic.svg'
import Image from 'next/image';
import { IHeaderMovie, movieCategoriesDetails } from "@/models/movie";
import './mobile-header.css';
import SearchMovie from '../SearchMovie';
import ic_close from '@/assets/icons/ic_close.svg'
import { useRouter } from 'next/navigation';
import { usePage } from '../ContextPage';
// import { Button } from '@mui/material';
const MobileHeader: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const router = useRouter()
    const { currentPage, setCurrentPage } = usePage();

    const handleNavigate = (detail?: IHeaderMovie) => {
        if (!!detail) {
            router.push(`/category/${detail.id}`)
            setCurrentPage(detail.id);
            toggleDropdown()
        }
        else {
            router.push('/')
            setCurrentPage(0)
            toggleDropdown()
        }

    }

    const handleBackNavigateHome = () => {
        router.push('/')
        setCurrentPage(0)
        setIsDropdownOpen(false)
    }

    const toggleDropdown = () => {
        if (isDropdownOpen) {
            setIsAnimating(true);
            setTimeout(() => {
                setIsDropdownOpen(false);
                setIsAnimating(false);
            }, 100);
        } else {
            setIsDropdownOpen(true);
        }
    };
    return (
        <>
            <div className='flex justify-between items-center gap-6 p-4 bg-mobile-header'>
                <div onClick={handleBackNavigateHome} className='relative w-[100px] flex items-center h-10'>
                    <Image src={logo} alt='logo'/>
                </div>
                <div className='flex items-center justify-end flex-1 gap-3'>
                    <SearchMovie />
                    <div className='relative w-10 h-10 cursor-pointer' onClick={toggleDropdown}>
                        <Image src={sort_ic} alt='sort_ic' fill />
                    </div>
                </div>
            </div>
            <div
                className={`absolute top-[70px] right-0 left-0 bg-submenu-header  overflow-hidden transition-all duration-300 ${isDropdownOpen
                    ? 'min-h-[700px] opacity-100 animate-slide-down'
                    : isAnimating
                        ? 'max-h-0 opacity-0 animate-slide-up'
                        : 'max-h-0 opacity-0'
                    }`}
                style={{
                    minHeight: isDropdownOpen ? '700px' : '0px',
                }}
            >
                <Image src={ic_close} alt='ic_close' width={20} height={20} onClick={toggleDropdown} className='absolute right-4 top-6' />
                <ul className='flex flex-col gap-8 py-2 text-white my-7'>
                    <div className={`relative w-full text-sm font-semibold transition-colors duration-300 cursor-pointer hover:text-yellow-500 ${currentPage === 0 ? 'text-[#FFBB00]' : 'text-white'}`} onClick={() => handleNavigate()}>
                        <span className='px-4'>HOME</span>
                        <div className='absolute -bottom-2 border-b border-[#2F4159] border-solid border-[1px] w-full' />
                    </div>
                    {Object.values(movieCategoriesDetails).map((detail) => {
                        return (
                            <div key={detail.id} className='relative w-full'>
                                <div onClick={() => handleNavigate(detail)}
                                    className={`text-sm font-semibold transition-colors duration-300 cursor-pointer hover:text-yellow-500 ${currentPage === detail.id ? 'text-[#FFBB00]' : 'text-white'}`}>
                                    <span className='px-4'> {detail.title}</span>
                                </div>
                                <div className='absolute -bottom-2 border-b border-[#2F4159] border-solid border-[1px] w-full' />
                            </div>
                        )
                    })}
                </ul>

            </div>

        </>
    );
};



export default MobileHeader;