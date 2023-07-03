import { Auth, Feed, UserProfile, MobileAllUsers } from "./pages";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import getDesignTokens from "./theme";
import { createTheme, CssBaseline } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import axios from "axios";
import { useEffect } from "react";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
import { setUser } from "./features/userSlice";

const App = () => {
	const mode = useSelector((state) => state.mode);
	const theme = createTheme(getDesignTokens(mode));
	const token = useSelector(state => state.token);
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
	const  user = useSelector(state => state.user)
	const dispatch = useDispatch()
	useEffect(() => {
		if (user) {
			axios.get(`/users/${user._id}`)
		.then(res => dispatch(setUser(res.data.user)))
		}
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline>
				<BrowserRouter>
					<Routes>
						<Route path="/home" element={useSelector(state => state.token ? <Feed /> : <Navigate to="/auth" /> )} />
						<Route path="/all" element={useSelector(state => state.token ? <MobileAllUsers /> : <Navigate to="/auth" /> )} />
						<Route path="/auth" element={<Auth />} />
						<Route path="/:userId" element={useSelector(state => state.token ? <UserProfile /> : <Navigate to="/auth" /> )} />
						<Route path="/" element={useSelector(state => state.token ? <Navigate to="/home" /> : <Navigate to="/auth" /> )} />
					</Routes>
				</BrowserRouter>
			</CssBaseline>
		</ThemeProvider>
	);
};

export default App;
