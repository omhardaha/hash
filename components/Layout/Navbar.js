import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoLogoSlack } from "react-icons/io"
function Navbar() {
    const router = useRouter();
    const isActive = (currentUrl) => router.asPath === currentUrl;
    return (
        <>
            <div className=' w-full bg-white'>
                <div className='flex flex-col w-full justify-between items-center p-5'>
                    <div>
                        <IoLogoSlack className=" text-[4rem] inline1 pl-1 text-purple-600 " />
                    </div>
                   
                </div>
            </div>
        </>
    );
}

export default Navbar;
