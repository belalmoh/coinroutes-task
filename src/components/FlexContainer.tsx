import React, { ReactNode } from 'react';

const FlexContainer = ({children}: { children: ReactNode }) => {
    return (
        <div className='flex flex-col md:flex-row space-x-0 md:space-x-10 justify-between px-8 my-8 h-auto md:h-32'>
            {children}
        </div>
    )
}

export default FlexContainer;