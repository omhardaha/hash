import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { logoutUser } from "../../utils/authUser";
import Search from "../Layout/Search";
import { useState } from 'react'
import { MdVerified } from "react-icons/md"
import { CgLogOff } from "react-icons/cg"
import { VscClose } from "react-icons/vsc"
import { IoLogoSlack } from "react-icons/io"

function SideMenu({ user: { username, profilePicUrl, email } }) {
    const router = useRouter();

    const isActive = route => router.pathname === route;

    const [menu, setMenu] = useState(true);
    return (
        <>
            <div className='sticky top-0 w-full z-10'>

                <nav className='cursor-pointer drop-shadow p-4 bg-white shadow font-semibold md:flex md:items-center md:justify-around text-larq w-full '>

                    <div className='flex justify-between items-center'>
                        <span >
                            <div className="flex">
                                <div>
                                    <Link href="/">
                                        <IoLogoSlack className="hover:text-black text-5xl inline1 pl-1 text-purple-600" />
                                    </Link>
                                </div>
                                <div className="my-auto pl-3 lg:pl-10 wid-50vw">
                                    <Search />
                                </div>
                            </div>
                        </span>

                        <span className='text-2xl cursor-pointer mx-2 md:hidden  block p-1 rounded-full '>
                            {menu ? <img className={'h-7 w-7  inline rounded-full'} src={profilePicUrl} onClick={() => setMenu(false)} ></img> : <VscClose onClick={() => setMenu(true)} className="hover:bg-gray-300" />}
                        </span>

                    </div>

                    <ul className={"md:flex  z-[1] md:z-auto md:static absolute md:bg-white bg-white w-full left-0 md:w-auto md:items-end md:py-0 py-4 md:pl-0 pl-7 transition-all ease-in duration-500 md:opacity-100 " + (menu && " top-[-400px] opacity-0 ")} >

                        <li className='text-end  py-1 md:py-0 mr-3 md:mr-1 hover:text-purple-600 '>
                            <Link href={`/${username}`}>
                                <span className="flex justify-end items-center">
                                    <img className={' object-cover h-7 w-7  inline rounded-full'} src={profilePicUrl}></img>
                                    &nbsp; {username}
                                    <MdVerified className="inline" />
                                </span>
                            </Link>
                        </li>

                        <li onClick={() => logoutUser(email)} className='lg:pl-4 text-end py-1 md:py-0 mr-3 md:mr-0 hover:text-purple-600 p-3 flex justify-end items-center'>
                            <span className="flex justify-end items-center">
                                <CgLogOff className='inline text-2xl hover:text-black' /> Logout
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default SideMenu;
