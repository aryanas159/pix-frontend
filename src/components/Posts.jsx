import Post from "./Post";
import { Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../features/userSlice";
import { useEffect } from "react";
import axios from "axios";
import CreatePost from "./CreatePost";
const Posts = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		axios.get("/posts").then((response) => dispatch(setPosts(response.data)));
	}, []);
	const { posts } = useSelector((state) => state.posts);

	return (
		<Stack direction="column" spacing={2} mt={2}>
			<CreatePost />
			{Boolean(posts) && posts.map((post) => <Post {...post} key={post._id}/>)}
		</Stack>
	);
};

export default Posts;
