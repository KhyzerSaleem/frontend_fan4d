import React from 'react'


const SearchInput = () => {
    return <>
        <div className="relative  ">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <img src="/assets/icons/SearchNormal.svg" alt="icon" />
            </div>
            <input type="search" id="default-search" className=" w-full p-2 ps-10 text-md text-gray-900 border border-text-borders rounded-lg focus:ring-normal focus:border-normal  " placeholder="البحث" required />
        </div>
    </>
}

export default SearchInput