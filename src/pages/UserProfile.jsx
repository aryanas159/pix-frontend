import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import AllUsersWidget from "../components/AllUsersWidget";
import UserWidget from "../components/UserWidget";
import { useParams } from "react-router-dom";
import { Box, useMediaQuery, Stack, useTheme } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

function UserProfile() {
	const { userId } = useParams();
	const isMobile = useMediaQuery("(max-width: 600px)");
	const { posts } = useSelector((state) => state.posts);
	const theme = useTheme();
	const userPosts = Boolean(posts)
		? posts.filter((post) => post.userId === userId)
		: [];
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Navbar />
			<Box
				display="flex"
				sx={{
					justifyContent: "center",
					alignItems: {xs: 'center', sm: 'flex-start'},
					gap: "32px",
					flexDirection: { xs: "column", sm: "row" },
				}}
			>
				<UserWidget userId={userId} />
				<Stack spacing={2} mt={2} mb={4}>
					{!userPosts.length ? (
						<Box
							display="flex"
							flexDirection="column"
							p={theme.spacing(1, 2)}
							borderRadius={"25px"}
							backgroundColor={theme.palette.background.light}
							sx={{ width: { xs: "90vw", sm: "35vw" }, height: "50vh" }}
						>
							This user has no posts.
						</Box>
					) : (
						userPosts.map((post) => {
							if (post.userId === userId) {
								return <Post {...post} key={post._id} />;
							}
							return <></>;
						})
					)}
				</Stack>
				{!isMobile && <AllUsersWidget />}
			</Box>
		</div>
	);
}

export default UserProfile;
