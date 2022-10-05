import { useState } from 'react'
import { MdVerified } from "react-icons/md"
import { CgLogOff } from "react-icons/cg"
import { VscClose } from "react-icons/vsc"
import { IoLogoSlack } from "react-icons/io"

export default function Nav() {
    const [menu, setMenu] = useState(true);

    return (
        <div className='fixed w-full '>

            <nav className='cursor-pointer h-16 drop-shadow p-4 bg-white shadow font-semibold md:flex md:items-center md:justify-between text-larq w-full '>

                <div className='flex justify-between items-center'>
                    <span >
                        <div className="flex">
                            <div>
                                <IoLogoSlack className="hover:text-black text-4xl inline1 pl-1 text-purple-600" />

                            </div>
                            <div className="my-auto pl-3"><input type={"text"} placeholder="Searching Space"></input></div>

                        </div>
                    </span>
                    <span className='text-2xl cursor-pointer mx-2 md:hidden block p-1 rounded-full hover:bg-purple-200'>
                        {menu ? <img className={'h-7 w-7  inline '} src='https://thumbs.dreamstime.com/b/handsome-man-black-suit-white-shirt-posing-studio-attractive-guy-fashion-hairstyle-confident-man-short-beard-125019349.jpg' onClick={() => setMenu(false)} ></img> : <VscClose onClick={() => setMenu(true)} />}
                    </span>
                </div>


                <ul className={"md:flex  z-[1] md:z-auto md:static absolute md:bg-white bg-purple-100 w-full left-0 md:w-auto md:items-end md:py-0 py-4 md:pl-0 pl-7 transition-all ease-in duration-500 md:opacity-100 " + (menu && " top-[-400px] opacity-0 ")} >

                    <li className='text-end  py-1 md:py-0 mr-3 md:mr-1 hover:text-purple-600 p-3'>
                        <img className={'h-7 w-7  inline '} src='https://thumbs.dreamstime.com/b/handsome-man-black-suit-white-shirt-posing-studio-attractive-guy-fashion-hairstyle-confident-man-short-beard-125019349.jpg'></img>
                        &nbsp; omhardaha1 <MdVerified className="inline" />
                    </li>

                    <li className='lg:pl-4 text-end py-1 md:py-0 mr-3 md:mr-0 p-3'>
                        <CgLogOff className='inline text-2xl' /><span className='hover:text-purple-600 '>Logout</span>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
