import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoLogoSlack } from "react-icons/io"
import { IoIosCloseCircle } from "react-icons/io"
import { RiCloseCircleFill } from "react-icons/ri"
import { FcBusinessman } from "react-icons/fc"
import { FcCheckmark } from "react-icons/fc"
import { VscClose } from "react-icons/vsc"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import baseUrl from "../utils/baseUrl";
import { registerUser } from "../utils/authUser";
import uploadPic from "../utils/uploadPicToCloudinary";
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
let cancel;

import Link from "next/link";
function Signup() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { name, email, password } = user;

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "media") {
            if (files.length === 0) {
                setMedia(null);
                setMediaPreview(null)
            } else {
                setMedia(files[0]);
                setMediaPreview(URL.createObjectURL(files[0]));
            }
        }
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const [errorMsg, setErrorMsg] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const [username, setUsername] = useState("");
    const [usernameLoading, setUsernameLoading] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState(false);

    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);

    useEffect(() => {
        const isUser = Object.values({ name, email, password }).every((item) =>
            Boolean(item)
        );

        console.log("isUser - ", isUser)
        isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
    }, [user]);

    const checkUsername = async () => {
        setUsernameLoading(true);
        try {
            cancel && cancel();

            const CancelToken = axios.CancelToken;
            console.log(username);
            const res = await axios.get(`${baseUrl}/api/signup/${username}`, {
                cancelToken: new CancelToken((canceler) => {
                    cancel = canceler;
                }),
            });

            if (errorMsg !== null) setErrorMsg(null);

            if (res.data === "Available") {
                console.log("gfh")
                setUsernameAvailable(true);
                setUser((prev) => ({ ...prev, username }));
            }
        } catch (error) {
            setErrorMsg("Username Not Available");
            setUsernameAvailable(false);
        }
        setUsernameLoading(false);
    };

    useEffect(() => {
        username === "" ? setUsernameAvailable(false) : checkUsername();
    }, [username]);

    const handleSubmit = async (e) => {
        console.log("handle");
        e.preventDefault();
        setFormLoading(true);

        let profilePicUrl;
        if (media !== null) {
            profilePicUrl = await uploadPic(media);
        }

        if (media !== null && !profilePicUrl) {
            setFormLoading(false);
            return setErrorMsg("Error Uploading Image");
        }

        await registerUser(user, profilePicUrl, setErrorMsg, setFormLoading);
    };

    return (
        <>
            <div style={{ 'font-family': 'Source Code Pro' }} className="flex text-xl items-center flex-col mt-10 ">
                <div className="p-10 drop-shadow-lg bg-white">
                    {formLoading ? <div className="w-96 h-96 flex flex-col items-center justify-center">
                        <IoLogoSlack className=" animate-bounce text-[4rem] inline1 pl-1 text-purple-600 " />
                        <h1> Please Wait... </h1>
                    </div>
                        : <div className="w-96 ">
                            {errorMsg && <div className=" mb-10 border-2 p-3 text-sm text-red-500">
                                <span>OOPs : {errorMsg}</span> <RiCloseCircleFill className="inline" onClick={() => setErrorMsg(null)} />
                            </div>}

                            <label htmlFor="image-up" className=" my-4 border-2 flex flex-col items-center justify-center hover:bg-gray-100  active:bg-gray-300 p-2 ">
                                {mediaPreview ? <>
                                    <div>
                                        <IoIosCloseCircle
                                            onClick={() => {
                                                setMedia(null);
                                                setMediaPreview(null);
                                            }}
                                            className="absolute text-3xl hover:text-purple-700 text-stone-500" />
                                        <img className="h-32 w-32 border-2 rounded-full" src={mediaPreview} ></img>
                                    </div>

                                </> :
                                    <span>
                                        <FcBusinessman style={{ fontSize: "100px" }} className="text-7xl border-2 rounded-full p-2 inline" />
                                        <span className="ml-2">Upload Image</span>
                                    </span>}

                            </label>

                            <input

                                id="image-up"
                                type="file"
                                onChange={handleChange}
                                name="media"
                                className="hidden" />

                            <div className="my-3">
                                <input type="text"
                                    name="name" placeholder="Name" className="p-2 font-['Cabin Sketch'] w-96 focus:border-b-2 no-outline"
                                    value={name}
                                    onChange={handleChange} />
                            </div>

                            <div className="my-3">
                                <input type="text"
                                    className={"p-2 font-['Cabin Sketch'] w-80 focus:border-b-2 no-outline inline "}
                                    required
                                    label="Username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        if (regexUserName.test(e.target.value)) {
                                            setUsernameAvailable(true);
                                        } else {
                                            setUsernameAvailable(false);
                                        }
                                    }} />
                                {usernameLoading && <AiOutlineLoading3Quarters className="inline text-xl animate-spin text-purple-700" />}

                                {!usernameLoading && usernameAvailable && <FcCheckmark className="inline text-xl   text-green-800" />}

                                {!usernameLoading && !usernameAvailable && <VscClose className="inline text-red-400 text-xl" />}

                            </div>

                            <div >
                                <input
                                    required
                                    value={email}
                                    onChange={handleChange}
                                    name="email" type="text" placeholder="Email" className="p-2 font-['Cabin Sketch'] w-96 focus:border-b-2 no-outline" outline-none />
                            </div>


                            <div className="my-3">
                                <input type="password"
                                    name="password" placeholder="Password" className="p-2 font-['Cabin Sketch'] w-96 focus:border-b-2 no-outline"
                                    value={password}
                                    onChange={handleChange} />
                            </div>

                            <div className="pt-2">
                                <button disabled={submitDisabled || !usernameAvailable} onClick={handleSubmit} className={"w-full text-white bg-purple-500  hover:bg-purple-400 p-2 no-outline " + ((submitDisabled || !usernameAvailable) && " bg-gray-500")} >
                                    Create Account
                                </button>
                            </div>
                            <div className="text-center py-3">or</div>
                            <div>
                                <Link href="/login">
                                    <div className="text-center text-purple-600 border-solid p-2 cursor-pointer" >
                                        Login
                                    </div>
                                </Link>
                            </div>
                        </div>}
                </div>
            </div>
        </>
    );
}

export default Signup;
