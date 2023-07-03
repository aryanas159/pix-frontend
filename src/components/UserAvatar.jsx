import { Avatar } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import getImageSource from "./getImageSource";
import { useEffect, useState } from "react";
import axios from "axios";
const UserAvatar = ({userId, picturePath}) => {
	const [imgSource, setImgSource] = useState("");
	useEffect(() => {
		axios
			.get(`/users/image/${userId}`)
			.then((res) => {
				const base64String = res.data.base64String;
				setImgSource(getImageSource(base64String))
			});
	}, []);
    const navigate = useNavigate()
    return (
        <Avatar
				alt={userId}
				src={imgSource}
				sx={{
					cursor: "pointer",
					width: { xs: "35px", sm: "45px" },
					height: { xs: "35px", sm: "45px" },
				}}
				onClick={() => navigate(`/${userId}`)}
			/>
    )
}
export default UserAvatar;