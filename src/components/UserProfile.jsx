import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import { useState } from "react";
import { setLogout } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { setMode } from "../features/userSlice";

const UserProfile = ({ picturePath, firstName, userId, isMobile }) => {
	const mode = useSelector((state) => state.mode)
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
	return (
		<>
			<Avatar
				alt={firstName}
				src={`${import.meta.env.VITE_BASE_URL}/image/${picturePath}`}
				sx={{
					cursor: "pointer",
					width: { xs: "35px", sm: "45px" },
					height: { xs: "35px", sm: "45px" },
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
					dense={isMobile}
					onClick={() => {
						handleClose();
						navigate(`/${userId}`);
					}}
					sx={{ width: {xs: '100px', sm: '120px'}, display: "flex", justifyContent: "center", alignItems: 'center', gap: '10px' }}
				>
					
					Profile
				</MenuItem>
				{isMobile && (
					<MenuItem
					dense={isMobile}
						sx={{ width: {xs: '100px', sm: '120px'}, display: "flex", justifyContent: "center" }}
					>
						<IconButton size="small" onClick={() => dispatch(setMode())}>                            
                            {mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>
					</MenuItem>
				)}
				{isMobile && (
					<MenuItem
					dense={isMobile}
						sx={{ width: {xs: '100px', sm: '120px'}, display: "flex", justifyContent: "center" }}
						onClick={() => navigate('/all')}
					>
						All users
					</MenuItem>
				)}
				<MenuItem
				dense={isMobile}
					onClick={() => {
						handleClose();
						dispatch(setLogout());
					}}
					sx={{ width: {xs: '100px', sm: '120px'}, display: "flex", justifyContent: "center" }}
				>
					Logout
				</MenuItem>
			</Menu>
		</>
	);
};
export default UserProfile;
