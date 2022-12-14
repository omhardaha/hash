import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import CreatePost from "../components/Post/CreatePost";
import CardPost from "../components/Post/CardPost";
import { Segment } from "semantic-ui-react";
import { parseCookies } from "nookies";
import { NoPosts } from "../components/Layout/NoData";
import { PostDeleteToastr } from "../components/Layout/Toastr";
import InfiniteScroll from "react-infinite-scroll-component";
import {
	PlaceHolderPosts,
	EndMessage,
} from "../components/Layout/PlaceHolderGroup";
import cookie from "js-cookie";

function Index({ user, postsData, errorLoading }) {
	const [posts, setPosts] = useState(postsData || []);
	const [showToastr, setShowToastr] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	const [pageNumber, setPageNumber] = useState(2);

	useEffect(() => {
		document.title = `Welcome, ${user.name.split(" ")[0]}`;
	}, []);

	useEffect(() => {
		showToastr && setTimeout(() => setShowToastr(false), 3000);
	}, [showToastr]);

	const fetchDataOnScroll = async () => {
		try {
			const res = await axios.get(`${baseUrl}/api/posts`, {
				headers: { Authorization: cookie.get("token") },
				params: { pageNumber },
			});

			if (res.data.length === 0) setHasMore(false);

			setPosts((prev) => [...prev, ...res.data]);
			setPageNumber((prev) => prev + 1);
		} catch (error) {
			alert("Error fetching Posts");
		}
	};

	return (
		<>
        <div className="max-w-screen-md m-auto ">
            
			{showToastr && <PostDeleteToastr />}
			<Segment  className="bg-prime foradiv">
				<CreatePost user={user} setPosts={setPosts} />
				{posts.length === 0 || errorLoading ? (
					<NoPosts />
				) : (
					<InfiniteScroll
                        style={{ padding: "0" }}
                        className="padd-zeero"
						hasMore={hasMore}
						next={fetchDataOnScroll}
						loader={<PlaceHolderPosts />}
						endMessage={<EndMessage />}
						dataLength={posts.length}
					>
						{posts.map((post) => (
							<CardPost
								key={post._id}
								post={post}
								user={user}
								setPosts={setPosts}
								setShowToastr={setShowToastr}
							/>
						))}
					</InfiniteScroll>
				)}
			</Segment>
        </div>
		</>
	);
}

Index.getInitialProps = async (ctx) => {
	try {
		const { token } = parseCookies(ctx);

		const res = await axios.get(`${baseUrl}/api/posts`, {
			headers: { Authorization: token },
			params: { pageNumber: 1 },
		});

		return { postsData: res.data };
	} catch (error) {
		return { errorLoading: true };
	}
};

export default Index;
