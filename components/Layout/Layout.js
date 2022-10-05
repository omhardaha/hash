import React, { createRef } from "react";
import HeadTags from "./HeadTags";
import Navbar from "./Navbar";
import Link from "next/link";
import { Container, Visibility } from "semantic-ui-react";
import nprogress from "nprogress";
import Router from "next/router";
import SideMenu from "./SideMenu";

function Layout({ children, user }) {
    const contextRef = createRef();

    Router.onRouteChangeStart = () => nprogress.start();
    Router.onRouteChangeComplete = () => nprogress.done();
    Router.onRouteChangeError = () => nprogress.done();

    return (
        <>
            <HeadTags />
            {user ? (
                <div >
                    <div innerRef={contextRef} className="min-h-screen">
                        <SideMenu user={user} className="z-10" />
                        <Visibility context={contextRef}>{children}</Visibility>
                    </div>
                    <div className="mt-8 text-center bg-white  bottom-0 text-sm font-semibold  font-['Josefin_Sans'] w-full">
                        <span className="bg-white my-1">
                            MADE IN <span className="text-red-400">♥ </span> BY
                            <Link target="_blank" href="https://omhardaha.github.io/portfolio/"> OM HARDAHA </Link>
                        </span>
                    </div>
                </div>
            ) : (
                <div >
                    <Navbar />
                    <Container text style={{ paddingTop: "1rem", minHeight: "80vh" }} >
                        {children}
                    </Container>
                    <div className=" mt-8 text-center bg-white  bottom-0 text-sm font-semibold  font-['Montserrat_Alternates'] w-full">
                        <span className="bg-white tracking-widest" style={{ letterSpacing: ".7vw" }}>
                            MADE IN <span className="text-red-400">♥ </span> BY 
                            <Link target="_blank" href="https://omhardaha.github.io/portfolio/">
                                <span className=" hover:bg-white hover:text-orange-600  mx-2">OM HARDAHA</span>
                            </Link>
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}

export default Layout;
