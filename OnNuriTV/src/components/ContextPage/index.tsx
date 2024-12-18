import { useParams } from 'next/navigation';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PageContextType {
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider = ({ children }: { children: ReactNode }) => {
    const params = useParams();
    const [currentPage, setCurrentPage] = useState<number>(!params?.id ? 0 : Number(params?.id));
    return (
        <PageContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </PageContext.Provider>
    );
};

export const usePage = () => {
    const context = useContext(PageContext);
    if (!context) {
        throw new Error('usePage must be used within a PageProvider');
    }
    return context;
};