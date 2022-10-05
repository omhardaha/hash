import React, { useState } from "react";
import { MdVerified } from "react-icons/md"
import { AiFillDelete } from "react-icons/ai"
import { IoLocationSharp } from "react-icons/io5"
import { BiComment } from "react-icons/bi"
import { FaShare } from "react-icons/fa"
import { CgShare } from "react-icons/cg"
import { MdOutlineAccessTimeFilled } from "react-icons/md"
import {
    Card,
    Icon,
    Image,
    Divider,
    Segment,
    Button,
    Popup,
    Header,
    Modal
} from "semantic-ui-react";
import PostComments from "./PostComments";
import CommentInputField from "./CommentInputField";
import calculateTime from "../../utils/calculateTime";
import Link from "next/link";
import { deletePost, likePost } from "../../utils/postActions";
import LikesList from "./LikesList";
import ImageModal from "./ImageModal";
import NoImageModal from "./NoImageModal";
import { AiOutlineLike, AiFillLike } from "react-icons/ai"
import { ShareButton } from "react-custom-share";
import baseUrl from "../../utils/baseUrl";


function CardPost({ post, user, setPosts, setShowToastr, usernameProf }) {
    const shareButtonProps = {
        url: baseUrl,
        network: "Twitter",
        text: "A Small Social Media App",
        longtext: "Please Share this Post Twitter."
    };
    const [likes, setLikes] = useState(post.likes);

    const isLiked =
        likes.length > 0 && likes.filter(like => like.user === user._id).length > 0;

    const [comments, setComments] = useState(post.comments);

    const [error, setError] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const addPropsToModal = () => ({
        post,
        user,
        setLikes,
        likes,
        isLiked,
        comments,
        setComments
    });

    return (
        <>
            {showModal && (
                <Modal
                    open={showModal}
                    closeIcon
                    closeOnDimmerClick
                    onClose={() => setShowModal(false)}>
                    <Modal.Content>
                        {post.picUrl ? (
                            <ImageModal {...addPropsToModal()} />
                        ) : (
                            <NoImageModal {...addPropsToModal()} />
                        )}
                    </Modal.Content>
                </Modal>
            )}

            <Segment basic >
                <Card color="transperent" fluid>

                    <Card.Content style={{ backgroundColor: "#f3f2efb3" }} >
                        <Image floated="left" src={post.user.profilePicUrl} avatar circular />

                        {(user.role === "root" || post.user._id === user._id) && (
                            <>
                                <Popup
                                    on="click"
                                    position="top right"
                                    trigger={
                                        <AiFillDelete className="float-right text-2xl hover:text-red-700" />
                                    }>
                                    <Header as="h4" content="Are you sure?" />
                                    <p>This action is irreversible!</p>

                                    <Button
                                        color="red"
                                        icon="trash"
                                        content="Delete"
                                        onClick={() => deletePost(post._id, setPosts, setShowToastr)}
                                    />
                                </Popup>
                            </>
                        )}
                        <Card.Header >

                            <Link href={`/${post.user.username}`}>
                                <a href={`/${post.user.username}`}>
                                    <span>{usernameProf ? usernameProf : post.user.username} <MdVerified className="inline" /></span>
                                </a>
                            </Link>
                        </Card.Header>
                        <span className="flex items-center"> <Card.Meta>{calculateTime(post.createdAt)}</Card.Meta><MdOutlineAccessTimeFilled className="inline text-sm ml-2 text-purple-400" /> </span>

                        {post.location && <span className="flex items-center"><Card.Meta className="inline" content={post.location} /> <IoLocationSharp className="inline text-sm ml-2 text-purple-400" /> </span>}

                    </Card.Content>

                    {post.picUrl && (
                        <Image
                            src={post.picUrl}
                            style={{ cursor: "pointer", objectFit: "cover" }}
                            floated="left"
                            wrapped
                            className="object-cover"
                            ui={false}
                            alt="PostImage"
                            onClick={() => setShowModal(true)}
                        />
                    )}

                    <Card.Description
                        style={{
                            fontSize: "17px",
                            letterSpacing: "0.1px",
                            padding: "1.1vw",
                            wordSpacing: "0.35px"
                        }}>
                        {post.text}
                    </Card.Description>


                    <Card.Content extra style={{ backgroundColor: "#f3f2efb3" }} >
                        <span className="cursor-pointer" >
                            {<span onClick={() =>
                                likePost(post._id, user._id, setLikes, isLiked ? false : true)
                            }>

                                {isLiked ? <AiFillLike className="hover:scale-90 inline text-3xl text-purple-600 ml-2 m-1 hover:text-purple-600 " /> : <AiOutlineLike className="hover:scale-110  hover:text-purple-700 m-1 inline text-3xl " />}</span>}

                            <LikesList
                                postId={post._id}
                                trigger={
                                    likes.length > 0 && (
                                        <span className="spanLikesList  m-1 ">
                                            {`${likes.length} ${likes.length === 1 ? "like" : "likes"}`}
                                        </span>
                                    )
                                }
                            />

                        </span>

                        <span onClick={() => setShowModal(true)} className="hover:text-purple-600">
                            <BiComment className="  m-1  ml-4 inline text-3xl " />
                            <span>{comments.length > 0 && comments.length} comments</span>
                        </span>

                        <span className="hover:text-purple-600">

                            <ShareButton {...shareButtonProps}>
                                <CgShare className="  m-1  ml-4 inline text-3xl " />
                                <span> Share</span>
                            </ShareButton>
                        </span>


                        {comments.length > 0 &&
                            comments.map(
                                (comment, i) =>
                                    i < 3 && (
                                        <PostComments
                                            key={comment._id}
                                            comment={comment}
                                            postId={post._id}
                                            user={user}
                                            setComments={setComments}
                                        />
                                    )
                            )}

                        {comments.length > 3 && (
                            <Button
                                content="View More"
                                className=" mb-3 "
                                color="purple"
                                basic
                                circular
                                onClick={() => setShowModal(true)}
                            />
                        )}

                        <Divider hidden />
                        <div className="mt-3">

                            <CommentInputField
                                user={user}
                                postId={post._id}
                                setComments={setComments}
                            />
                        </div>
                    </Card.Content>
                </Card>
            </Segment>
            <Divider hidden />
        </>
    );
}

export default CardPost;
