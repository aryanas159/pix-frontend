import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
	mode: "light",
	user: null,
	token: null,
	posts: [],
};
export const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		setMode: (state) => {
			state.mode = state.mode === "light" ? "dark" : "light";
		},
		setUser: (state, actions) => {
			state.user = actions.payload;
		},
		setUserFriends: (state, actions) => {
			state.user.friends = actions.payload
		},
		setToken: (state, actions) => {
			state.token = actions.payload;
		},
		setLogout: (state) => {
			state.token = null;
			state.user = null;
			state.posts = [];
		},
		setPosts: (state, actions) => {
			state.posts = actions.payload;
		},
		setPost(state, actions) {
			const newPost = actions.payload;
			const updatedPosts = current(state.posts).posts.map((post) => {
				if (post._id === newPost._id) {
					return newPost;
				}
				return post;
			});

			state.posts = { posts: updatedPosts };
		},
		setComments: (state, actions) => {
			const {postId, newComments} = actions.payload;
			console.log(newComments)
			const post = current(state.posts).posts.filter(post => post._id === postId)[0]
			const newPost = {...post, comments: newComments.comments}
			const newPosts = current(state.posts).posts.map(post => {
				if (post._id === postId) {return newPost}
				return post
			})
			state.posts = {posts: newPosts}
		}
	},
});

export const { setMode, setUser, setToken, setLogout, setPosts, setPost, setComments, setUserFriends } =
	userSlice.actions;
export default userSlice.reducer;
