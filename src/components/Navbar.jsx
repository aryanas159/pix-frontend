import { AppBar, Toolbar, Box, Typography, IconButton, useTheme, useMediaQuery } from "@mui/material";
import darkLogo from "../assets/logo_dark.png";
import lightLogo from "../assets/logo_light.png";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import { setMode } from "../features/userSlice";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import UserAvatar from "./UserAvatar";

const userObj = {
	firstName: 'fake',
	lastName: 'fake',
	email: 'fake@gmail.com',
	password: '2983y8dyn1289y398y12n',
	picturePath: ''
}


const Navbar = () => {
	const mode = useSelector((state) => state.mode);
    const user = useSelector((state) => state.user) || userObj
	const isMobile = useMediaQuery("(max-width: 600px)")
    console.log(user)
    const dispatch = useDispatch()
	const navigate = useNavigate();
    const theme = useTheme()
	return (
		<>
			<AppBar position="static" color="neutral" >
				<Toolbar sx={{display: 'flex', justifyContent: 'space-between', margin: {xs: '0px', sm: '0px 50px'}}}>
					<Box
						display="flex"
						alignItems="center"
						// justifyContent="center"
						gap="20px"
						sx={{ cursor: "pointer" }}
						onClick={() => navigate("/home")}
                        
					>
						<img
							src={mode === "light" ? lightLogo : darkLogo}
							style={{ height: `${isMobile ? '25px' : '40px'}` }}
						/>
						<Typography
							variant="h4"
							fontWeight={700}
							sx={{ letterSpacing: "2px", marginRight: '20px', display: {xs: 'none', sm: 'inline'} }}
						>
							PIX
						</Typography>
						<SearchInput />
					</Box>
                    <Box
                        display="flex"
						alignItems="center"
                        gap="20px"
                    >
                        <IconButton onClick={() => dispatch(setMode())} sx={{display : {xs: 'none', sm: 'flex'}}}>                            
                            {mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>
                        <UserAvatar 
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
