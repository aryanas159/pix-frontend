import {
	AppBar,
	Toolbar,
	Box,
	Typography,
	IconButton,
	useTheme,
	useMediaQuery,
	Collapse,
} from "@mui/material";
import darkLogo from "../assets/logo_dark.png";
import lightLogo from "../assets/logo_light.png";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import { setMode } from "../features/userSlice";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import UserProfile from "./UserProfile";
import React, { useState } from "react";
import SearchResults from "./SearchResults";

const userObj = {
	firstName: "fake",
	lastName: "fake",
	email: "fake@gmail.com",
	password: "2983y8dyn1289y398y12n",
	picturePath: "",
};

const Navbar = () => {
	const mode = useSelector((state) => state.mode);
	const user = useSelector((state) => state.user) || userObj;
	const isMobile = useMediaQuery("(max-width: 600px)");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const theme = useTheme();
	const [search, setSearch] = useState("");
	const [searchFocus, setSearchFocus] = useState(false);
	console.log(search);
	return (
		<>
			<AppBar
				position="sticky"
				sx={{ backgroundColor: theme.palette.navbar.main }}
			>
				<Toolbar
					sx={{
						display: "flex",
						justifyContent: "space-between",
						margin: { xs: "0px", sm: "0px 50px" },
					}}
				>
					<Box
					display="flex"
					gap="20px"
					>
						<Box
							onClick={() => {
								navigate("/home")
								window.location.reload()
							}}
							display="flex"
							alignItems="center"
							justifyContent="center"
							gap="20px"
							sx={{ cursor: "pointer" }}
						>
							<img
								src={mode === "light" ? lightLogo : darkLogo}
								style={{ height: `${isMobile ? "30px" : "40px"}` }}
							/>
							<Typography
								variant="h4"
								fontWeight={700}
								sx={{
									letterSpacing: "2px",
									marginRight: "20px",
									display: { xs: "none", sm: "inline" },
									color: theme.palette.neutral.dark,
								}}
							>
								PIX
							</Typography>
						</Box>
						<SearchInput
							search={search}
							setSearch={setSearch}
							searchFocus={searchFocus}
							setSearchFocus={setSearchFocus}
						/>
					<Collapse in={searchFocus} orientation="horizontal">
						<SearchResults search={search} />
					</Collapse>
					</Box>
					<Box display="flex" alignItems="center" gap="20px">
						<IconButton
							onClick={() => dispatch(setMode())}
							sx={{ display: { xs: "none", sm: "flex" } }}
						>
							{mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
						</IconButton>
						<UserProfile
							picturePath={user.picturePath}
							firstName={user.firstName}
							userId={user._id}
							isMobile={isMobile}
						/>
					</Box>
				</Toolbar>
			</AppBar>
		</>
	);
};
export default Navbar;
