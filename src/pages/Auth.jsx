import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	Box,
	Switch,
	Grid,
	alpha,
	useTheme,
	Typography,
	Button,
	useMediaQuery,
} from "@mui/material";
import { setMode } from "../features/userSlice";
import RegistrationForm from "../components/Register";
import LoginForm from "../components/Login";
import darkBg from "../assets/bg_dark.jpg";
import lightBg from "../assets/bg_light.jpg";
import lightLogo from "../assets/logo_light.png";
import darkLogo from "../assets/logo_dark.png";
function Auth() {
	const isMobile = useMediaQuery("(max-width: 600px)");
	const mode = useSelector((state) => state.mode);
	const dispatch = useDispatch();
	const theme = useTheme();
	const [formType, setFormType] = useState("register");
	return (
		<Box
			sx={{
				backgroundImage: `url(${mode === "dark" ? darkBg : lightBg})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundOrigin: "center center",
				minHeight: "100vh",
				display: "flex",
				position: "relative",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Switch
				onChange={() => {
					dispatch(setMode());
				}}
				sx={{ position: "absolute", top: "0px", left: "0px" }}
			/>
			<Grid
				container
				sx={{
					width: { xs: "90vw", sm: "80vw", md: "70vw" },
					background: "transparent",
					border: `2px solid ${alpha(theme.palette.neutral.light, 0.5)}`,
					borderRadius: "20px",
					backdropFilter: "blur(20px)",
					boxShadow: `0 0 30px ${alpha(theme.palette.neutral.dark, 0.2)}`,
					display: "flex",
					flexDirection: { xs: "column", sm: "row" },
					padding: { xs: theme.spacing(3, 0), sm: theme.spacing(4) },
					margin: theme.spacing(4, 0),
					transition: "all 1.5s",
				}}
			>
				<Grid
					item
					xs={12}
					sm={6}
					direction="column"
					sx={{
						display: "flex",
						alignItems: "center",
						gap: "24px",
						padding: {
							xs: theme.spacing(0, 2),
							sm: theme.spacing(0, 0, 0, 10),
						},
						justifyContent: "center",
					}}
				>
					<img
						src={mode === "light" ? lightLogo : darkLogo}
						style={{ height: `${isMobile ? "80px" : "100px"}` }}
					/>

					<Typography
						variant="h4"
						fontWeight={600}
						align="center"
						fontSize={isMobile ? "1.8rem" : "2.125rem"}
						color={"primary"}
					>
						Welcome to PIX
					</Typography>
					<Typography
						align="center"
						lineHeight={2}
						paragraph
						fontSize={isMobile ? "0.9rem" : "1rem"}
					>
						The ultimate social networking platform that empowers you to connect
						with friends, share your life's moments, and explore a world of
						endless possibilities.
					</Typography>
					{formType === "register" ? (
						<Typography variant="h8" fontSize={"small"}>
							Already have an account ?{" "}
							<Button size="small" onClick={() => setFormType("login")}>
								Login
							</Button>
						</Typography>
					) : (
						<Typography variant="h8" fontSize={"small"}>
							Don't have an account ?{" "}
							<Button size="small" onClick={() => setFormType("register")}>
								Register
							</Button>
						</Typography>
					)}
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}
					direction="column"
					sx={{
						display: "flex",
						p: { xs: theme.spacing(3, 0, 1, 5), sm: theme.spacing(3, 0, 1, 0) },
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Box
						width="100%"
						
						sx={{ display: 'flex', alignItems: "center", justifyContent: "center"	}}
					>
						{formType === "register" ? (
							<RegistrationForm isMobile={isMobile} />
						) : (
							<LoginForm isMobile={isMobile} />
						)}
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}

export default Auth;
