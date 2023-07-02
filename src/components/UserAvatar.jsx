import { Avatar } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

const UserAvatar = ({userId, picturePath}) => {
    const navigate = useNavigate()
    return (
        <Avatar
				alt={userId}
				src={`${import.meta.env.VITE_BASE_URL}/image/${picturePath}`}
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