import React, { useEffect, useState } from "react";

import {
	Box,
	Typography,
	useTheme,
	IconButton,
	MenuList,
	MenuItem,
} from "@mui/material";
import axios from "axios";
import UserAvatar from "./UserAvatar";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserFriends } from "../features/userSlice";
function SearchResults({ search }) {
	const dispatch = useDispatch()
	const theme = useTheme();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const [searchResults, setSearchResults] = useState([]);
	useEffect(() => {
		axios
			.get(`/users/search?name=${search}`)
			.then((res) => setSearchResults(res.data.users));
	}, [search, user]);
	const handleFriend = async (friendId) => {
		console.log(user)
        const res = await axios.post(`/users/${friendId}`)
        const newFriends = res.data.friends
        dispatch(setUserFriends( newFriends))
		console.log(user)
    }
	return (
			<MenuList
				sx={{
					minWidth: { xs: "70vw", sm: "25vw" },
					maxWidth: { xs: "70vw", sm: "30vw" },
					top: { xs: "8vh", sm: "4vw" },
					left: { xs: "12vw", sm: "12vw" },
					display: "flex",
					position: "absolute",
					flexDirection: "column",
					p: theme.spacing(1),
					gap: "16px",
					minHeight: "10px",
					maxHeight: "80vh",
					overflowY: "scroll",
					zIndex: "2",
					borderRadius: "16px",
					backgroundColor: theme.palette.background.lighter,
					"&::-webkit-scrollbar": {
						display: "none",
					},
				}}
			>
				{searchResults.length &&
					searchResults.map((person) => {
						return (
							<MenuItem
								sx={{
									display: "flex",
									gap: "16px",
									alignItems: "center",
									borderRadius: "16px",
									position: "relative",
								}}
							>
								<UserAvatar
									userId={person._id}
									picturePath={person.picturePath}
								/>
								<Box width="50%" onClick={() => navigate(`/${person._id}`)}>
									<Box>
										<Typography
											noWrap={true}
											color={theme.palette.neutral.dark}
										>{`${person.firstName} ${person.lastName}`}</Typography>
									</Box>

									<Typography fontSize={14} color={theme.palette.grey[700]}>
										{person.friends.length} Friends
									</Typography>
								</Box>
								{person._id != user._id ? (
									<IconButton
										color="primary"
										sx={{
											backgroundColor: theme.palette.background.button,
											position: "absolute",
											right: "10px",
											zIndex: "3",
										}}
										onClick={() => {
											console.log('clicked')
											handleFriend(person._id);
										}}
									>
										{!user.friends.includes(person._id) ? (
											<PersonAddIcon
												sx={{ p: theme.spacing(1), fontSize: "40px" }}
											/>
										) : (
											<PersonRemoveIcon
												sx={{ p: theme.spacing(1), fontSize: "40px" }}
											/>
										)}
									</IconButton>
								) : (
									<></>
								)}
							</MenuItem>
						);
					})}
			</MenuList>
	);
}

export default SearchResults;
