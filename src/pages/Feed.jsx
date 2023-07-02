import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import UserWidget from "../components/UserWidget";
import AllUsersWidget from "../components/AllUsersWidget";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import {useMediaQuery} from "@mui/material";
function feed() {
	const user = useSelector(state => state.user)
	const isMobile = useMediaQuery("(max-width: 600px)")
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
					alignItems: 'flex-start',
					gap: '32px'
				}}
			>
				{!isMobile && <UserWidget userId={user._id} />}
				<Posts />
				{!isMobile && <AllUsersWidget />}
			</Box>
		</div>
	);
}

export default feed;
