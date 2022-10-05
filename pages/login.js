import React, { useState, useEffect } from "react";
import { loginUser } from "../utils/authUser";
import Link from "next/link";
import { IoLogoSlack } from "react-icons/io"
import { RiCloseCircleFill } from "react-icons/ri"
import cookie from "js-cookie";
function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { email, password } = user;
    const [errorMsg, setErrorMsg] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const isUser = Object.values({ email, password }).every((item) =>
            Boolean(item)
        );
        isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginUser(user, setErrorMsg, setFormLoading);
    };
    const userCred1 = async (e) => {
        setUser({
            email: "elontem1@gmail.com",
            password: "elontem1@gmail.com",
        });
    };
    const userCred2 = async (e) => {
        setUser({
            email: "omdigital2018@gmail.com",
            password: "omdigital2018@gmail.com",
        });
    };

    useEffect(() => {
        document.title = "Welcome Back";
        const userEmail = cookie.get("userEmail");
        if (userEmail) setUser((prev) => ({ ...prev, email: userEmail }));
    }, []);

    return (
        <>{
            <div style={{ 'font-family': 'Source Code Pro' }} className="flex text-xl items-center flex-col mt-10 ">
                <div className="p-8 sm:p-10 drop-shadow-lg bg-white">
                    {formLoading ?
                        <div className="w-full md:w-96 h-96 flex flex-col items-center justify-center">
                            <IoLogoSlack className=" animate-bounce text-[4rem] inline1 pl-1 text-purple-600 " />
                            <h1> Loading... </h1>

                        </div>
                        : <div className="w-full ">
                            {errorMsg && <div className=" mb-10 border-2 p-3 text-sm text-red-500">
                                <span>OOPs : {errorMsg}</span> <RiCloseCircleFill className="inline" onClick={() => setErrorMsg(null)} />
                            </div>}

                            <div >
                                <input
                                    value={email}
                                    onChange={handleChange}
                                    name="email" type="text" placeholder="Email" className="p-2 font-['Cabin Sketch'] w-full md:w-96 focus:border-b-2 no-outline" outline-none />
                            </div>

                            <div className="my-3">
                                <input type="password"
                                    name="password" placeholder="Password" className="p-2 font-['Cabin Sketch'] w-full md:w-96  focus:border-b-2 no-outline"
                                    value={password}
                                    onChange={handleChange} />
                            </div>

                            <div className="pt-2">
                                <button disabled={submitDisabled} onClick={handleSubmit} className={"w-full text-white bg-purple-500  hover:bg-purple-400 p-2 no-outline " + (submitDisabled && " bg-gray-500")} >
                                    Login
                                </button>
                            </div>
                            <div className="pt-2">
                                <button onClick={userCred1} className="w-full text-white bg-purple-500  hover:bg-purple-400 p-2 no-outline " >
                                    Use Creditial 1
                                </button>
                            </div>
                            {/* <div className="pt-2">
                                <button onClick={userCred2} className="w-full text-white bg-purple-500  hover:bg-purple-400 p-2 no-outline " >
                                    Use Creditial 2
                                </button>
                            </div> */}
                            <div className="text-center py-3">or</div>
                            <div>
                                <Link href="/signup">
                                    <div className="text-center text-purple-600 border-solid p-2 cursor-pointer" >
                                        Create a new account
                                    </div>
                                </Link>
                            </div>
                        </div>}
                </div>
            </div>
        }
        </>
    );
}

export default Login;
