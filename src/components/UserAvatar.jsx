import { Avatar, useTheme } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import getImageSource from "./getImageSource";
import { useEffect, useState } from "react";
import axios from "axios";
const UserAvatar = ({userId, picturePath}) => {
	const [imgSource, setImgSource] = useState("");
	const theme = useTheme()
	useEffect(() => {
		axios
			.get(`/users/image/${userId}`)
			.then((res) => {
				const base64String = res.data.base64String;
				setImgSource(getImageSource(base64String))
			});
	}, [userId]);
    const navigate = useNavigate()
    return (
        <Avatar
				alt={userId}
				src={imgSource}
				sx={{
					cursor: "pointer",
					width: { xs: "35px", sm: "45px" },
					height: { xs: "35px", sm: "45px" },
					// backgroundColor: '#fff',
					color: theme.palette.neutral.dark
				}}
				
				onClick={() => navigate(`/${userId}`)}
			/>
    )
}
export default UserAvatar;