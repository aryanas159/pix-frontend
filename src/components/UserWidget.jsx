import { Box, useMediaQuery, useTheme, Typography, Stack } from "@mui/material";
import UserAvatar from "./UserAvatar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {CircularProgress} from '@mui/material'
const UserWidget = ({ userId }) => {
	const isMobile = useMediaQuery("(max-width: 600px)");
	const [user, setUser] = useState({});
	const [userFriends, setUserFriends] = useState([]);
	const theme = useTheme();
	const currentUser = useSelector((state) => state.user);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		axios
			.get(`/users/${userId}`)
			.then((res) => setUser(res.data.user))
			.catch((err) => console.log(err));
		axios
			.get(`/users/${userId}/friends`)
			.then((res) => {
				setUserFriends(res.data.formattedFriends);
				setLoading(false);
			})
			.catch((err) => setLoading(false));
	}, [currentUser, userId]);

	return (
		<Box
			// display={`${isMobile ? "none" : "flex"}`}
			display="flex"
			flexDirection="column"
			gap={2}
			p={theme.spacing(1, 2)}
			borderRadius={"25px"}
			backgroundColor={theme.palette.background.light}
			sx={{ width: { xs: "90vw", sm: "20vw" } }}
			mt={2}
		>
			<Box display="flex" gap={2}>
				<UserAvatar userId={userId} />
				<Box>
					<Typography>{`${user.firstName} ${user.lastName}`}</Typography>
					<Typography fontSize={14} color={theme.palette.grey[700]}>
						{userFriends.length} Friends
					</Typography>
				</Box>
			</Box>
			<Typography color={theme.palette.grey[700]}>{user.email}</Typography>
			<div
				style={{
					width: "100%",
					height: "2px",
					backgroundColor: theme.palette.background.lighter,
					borderRadius: "2px",
				}}
			></div>
			<Typography>Friends -</Typography>
			{loading ? (
				<CircularProgress />
			) : (
				<Stack spacing={3}>
					{userFriends.length &&
						userFriends.map((friend) => {
							return (
								<Box display="flex" gap={2}>
									<UserAvatar
										userId={friend._id}
										picturePath={friend.picturePath}
									/>
									<Box>
										<Typography>{`${friend.firstName} ${friend.lastName}`}</Typography>
										<Typography fontSize={14} color={theme.palette.grey[700]}>
											{friend.email}
										</Typography>
									</Box>
								</Box>
							);
						})}
				</Stack>
			)}
		</Box>
	);
};
export default UserWidget;
