import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, useTheme, useMediaQuery, IconButton } from "@mui/material";
import UserAvatar from "./UserAvatar";
import { useSelector, useDispatch } from "react-redux";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { setUser, setUserFriends } from "../features/userSlice";

const AllUsersWidget = () => {
	const [allUsers, setAllUsers] = useState([]);
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
	const theme = useTheme();
	useEffect(() => {
		axios
			.get("/users/")
			.then((res) => setAllUsers(res.data.users))
			.catch((err) => console.log(err));
	}, [user]);
    const handleFriend = async (friendId) => {
        const res = await axios.post(`/users/${friendId}`)
        const newFriends = res.data.friends
        dispatch(setUserFriends( newFriends))
    }
	return (
		<Box
			display="flex"
			flexDirection="column"
			gap={2}
			p={theme.spacing(1, 2)}
			borderRadius={"25px"}
			backgroundColor={theme.palette.background.light}
			sx={{ width: {xs: '80vw', sm: '20vw'} }}
            mt={2}
		>
			{allUsers.length &&
				allUsers.map((person) => {
                    if (person._id === user._id) {
                        return (
                            <></>
                        )
                    }
					return (
						<Box display="flex" gap={2} alignItems='center'>
							<UserAvatar userId={person._id} picturePath={person.picturePath} />
							<Box flex={1}>
								<Typography>{`${person.firstName} ${person.lastName}`}</Typography>
								<Typography fontSize={14} color={theme.palette.grey[700]}>
									{person.friends.length} Friends
								</Typography>
							</Box>
							<IconButton color="primary" sx={{backgroundColor: theme.palette.background.button}} onClick={() => {handleFriend(person._id)}}>
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
						</Box>
					);
				})}
		</Box>
	);
};
export default AllUsersWidget;
