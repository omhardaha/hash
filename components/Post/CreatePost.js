import React, { useState, useRef } from "react";
import { Form, Button, Image, Divider, Message, Icon } from "semantic-ui-react";
import uploadPic from "../../utils/uploadPicToCloudinary";
import { submitNewPost } from "../../utils/postActions";
import { BiImageAlt } from "react-icons/bi"
import { IoIosCloseCircle } from "react-icons/io"

function CreatePost({ user, setPosts }) {
    const [newPost, setNewPost] = useState({ text: "", location: "" });
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

    const [error, setError] = useState(null);
    const [highlighted, setHighlighted] = useState(false);

    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);

    const handleChange = e => {
        const { name, value, files } = e.target;

        if (name === "media") {
            setMedia(files[0]);
        }
        console.log(e);
        setNewPost(prev => ({ ...prev, [name]: value }));
    };


    const addStyles = () => ({
    });

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        let picUrl;

        if (media !== null) {
            picUrl = await uploadPic(media);
            if (!picUrl) {
                setLoading(false);
                return setError("Error Uploading Image");
            }
        }

        await submitNewPost(
            newPost.text,
            newPost.location,
            picUrl,
            setPosts,
            setNewPost,
            setError
        );

        setMedia(null);
        setMediaPreview(null);
        setLoading(false);
    };

    return (
        <>
            <Form error={error !== null} onSubmit={handleSubmit} className="bg-white p-8 drop-shadow-md my-10">
                <Message
                    error
                    onDismiss={() => setError(null)}
                    content={error}
                    header="Oops!"
                />
                {/* <div className="mb-8 text-2xl font-bold font-['Cinzel'] text-gray-400 text-center ">  Create A New Post </div> */}
                <Form.Group className="bg-white" >
                    <div className="flex items-center w-full mb-4">

                        <Image src={user.profilePicUrl} circular avatar inline />
                        <Form.TextArea
                            placeholder={"What's on Your Mind, " + user.name + " ?"}
                            name="text"
                            value={newPost.text}
                            onChange={handleChange}
                            rows={8}
                            width={16}
                        />
                    </div>
                </Form.Group>

                {mediaPreview &&
                    <div className="my-4">
                        <IoIosCloseCircle

                            onClick={() => {
                                setMedia(null);
                                setMediaPreview(null);
                            }}
                            className="absolute text-3xl hover:text-purple-700 text-stone-500" />
                        <img className="h-44 inline" src={URL.createObjectURL(mediaPreview)}></img>
                    </div>
                }

                    <div className="flex items-center ml-8">

                        <Form.Input
                            value={newPost.location}
                            name="location"
                            onChange={handleChange}
                            icon="map marker alternate"
                            placeholder="Want to add Location?"
                        />

                        <input ref={inputRef}
                            id="images"
                            name="media"
                            className="hidden"
                            onChange={(e) => {
                                setMedia(e.target.files[0])
                                setMediaPreview(e.target.files[0])
                                // console.log(e.target.files[0]);
                            }}
                            icon="file image"
                            placeholder="Add Images?"
                            type="file"
                            accept="image/*"

                        ></input>

                        <label htmlFor="images"><BiImageAlt className="inline text-4xl hover:text-purple-600 text-gray-400 ml-2" /></label>

                        {newPost.text !== "" && <Button
                            circular
                            disabled={newPost.text === "" || loading}
                            content={<strong>Publish</strong>}
                            style={{ backgroundColor: "rgb(147 51 234)", color: "white", "margin-left": "7px", }}
                            icon="send"
                            loading={loading}
                            className="inline ml-4"
                        />}
                    </div>
            </Form>
        </>
    );
}

export default CreatePost;
