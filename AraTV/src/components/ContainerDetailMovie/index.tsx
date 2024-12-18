import React from 'react';

const ContainerDetailMovie = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='bg-[#12171E] w-full py-6 rounded-md'>
            {children}
        </div>
    );
};

export default ContainerDetailMovie;