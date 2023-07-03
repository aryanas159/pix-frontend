import { Avatar, Menu, MenuItem, IconButton, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { setLogout } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { setMode } from "../features/userSlice";
import getImageSource from "./getImageSource";
import axios from "axios";

const UserProfile = ({ firstName, userId, isMobile }) => {
	const theme = useTheme()
	const mode = useSelector((state) => state.mode);
	const [imgSource, setImgSource] = useState("");
	const [anchorEl, setEnchorEl] = useState(null);
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleClick = (event) => {
		setEnchorEl(event.currentTarget);
		setOpen(true);
	};
	const handleClose = () => {
		setEnchorEl(null);
		setOpen(false);
	};
	useEffect(() => {
		axios
			.get(`/users/image/${userId}`)
			.then((res) => {
				const base64String = res.data.base64String;
				setImgSource(getImageSource(base64String))
			});
	}, []);

	return (
		<>
			<Avatar
				alt={firstName}
				src={imgSource}
				sx={{
					cursor: "pointer",
					width: { xs: "35px", sm: "45px" },
					height: { xs: "35px", sm: "45px" },
					color: theme.palette.neutral.dark
				}}
				onClick={handleClick}
			/>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				autoFocus={false}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
			>
				<MenuItem
					
					onClick={() => {
						handleClose();
						navigate(`/${userId}`);
					}}
					sx={{
						width: "120px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						gap: "10px",
					}}
				>
					Profile
				</MenuItem>
				{isMobile && (
					<MenuItem
						
						sx={{
							width: "120px",
							display: "flex",
							justifyContent: "center",
						}}
					>
						<IconButton size="small" onClick={() => dispatch(setMode())}>
							{mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
						</IconButton>
					</MenuItem>
				)}
				{isMobile && (
					<MenuItem
						
						sx={{
							width: "120px",
							display: "flex",
							justifyContent: "center",
						}}
						onClick={() => navigate("/all")}
					>
						All users
					</MenuItem>
				)}
				<MenuItem
					
					onClick={() => {
						handleClose();
						dispatch(setLogout());
					}}
					sx={{
						width: "120px",
						display: "flex",
						justifyContent: "center",
					}}
				>
					Logout
				</MenuItem>
			</Menu>
		</>
	);
};
export default UserProfile;
