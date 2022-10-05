import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FiCommand } from 'react-icons/fi'
import cookie from "js-cookie";
import { IoLogoSlack } from "react-icons/io"
import axios from "axios";
import { parseCookies } from "nookies";
import Link from "next/link";
import { MdVerified } from "react-icons/md"
import CardPost from "../components/Post/CardPost";
import baseUrl from "../utils/baseUrl";

function ProfilePage({ user, profile, errorLoading }) {
    if (errorLoading) return <>
        <div className="my-10 flex flex-col items-center justify-center">
            <IoLogoSlack className=" text-[8rem] inline1 pl-1 text-black mb-2" />
            <h className="text-xl text-stone-400 font-semibold"> No User Find </h>
        </div>
    </>;

    console.log(profile);
    const [posts, setPosts] = useState([]);
    const [showToastr, setShowToastr] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { username } = router.query;

    useEffect(() => {
        const getPosts = async () => {
            setLoading(true);
            try {
                console.log(username);
                const res = await axios.get(`${baseUrl}/api/profile/posts/${username}`, {
                    headers: { Authorization: cookie.get("token") }
                });
                console.log(res.data);
                setPosts(res.data);
            } catch (error) {
                alert("Error Loading Posts");
            }

            setLoading(false);
        };
        getPosts();
    }, [router.query.username]);

    return (
        <>

            <div className="mt-12 max-w-screen-lg m-auto bg-white">

                <div className="">
                    <div className="border-2 border-transparent text-center ">
                        <div className="my-10">
                            <img className="h-20 w-20 inline rounded-full object-cover" src={profile.user.profilePicUrl}></img>
                            <h1 style={{ color: "#6e11c2" }} className="text-5xl mt-4 capitalize text-purple-700 font-['Josefin_Sans']">{profile.user.name}</h1>
                            <Link href={`/${profile.user.username}`}>
                                <a href={`/${profile.user.username}`}>
                                    <span>@{profile.user.username}</span>
                                    <span><MdVerified className="inline text-purple-600" /></span>
                                </a>
                            </Link>
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="text-xl mb-8 py-3 text-center text-slate-500 border-b-1">
                            <FiCommand className="text-3xl inline drop-shadow-xl" /> <span className="drop-shadow-xl ">All Posts</span>
                        </div>
                        <br />
                        <div className=" max-w-screen-md m-auto">
                            {loading ? (
                                <div className="my-20 flex flex-col items-center justify-center">
                                    <IoLogoSlack className=" animate-bounce text-[4rem] inline1 pl-1 text-purple-600 " />
                                    <h1> Loading... </h1>
                                </div>
                            ) : posts.length > 0 ? (
                                posts.map(post => (
                                    <CardPost
                                        key={post._id}
                                        post={post}
                                        user={user}
                                        setPosts={setPosts}
                                        setShowToastr={setShowToastr}
                                    />
                                ))
                            ) : (
                                <div className="my-10 flex flex-col items-center justify-center">
                                    <IoLogoSlack className=" text-[4rem] inline1 pl-1 text-black mb-2" />
                                    <h1> No Posts </h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
ProfilePage.getInitialProps = async ctx => {
    try {
        const { username } = ctx.query;
        const { token } = parseCookies(ctx);

        const res = await axios.get(`${baseUrl}/api/profile/${username}`, {
            headers: { Authorization: token }
        });

        const { profile } = res.data;

        return { profile };
    } catch (error) {
        return { errorLoading: true };
    }
};

export default ProfilePage;
