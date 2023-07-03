import { Auth, Feed, UserProfile, MobileAllUsers } from "./pages";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

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
		console.log(user)
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
						<Route path="/all" element={<MobileAllUsers />} />
						{/* <Route path="/home" element={<Feed />} /> */}
						<Route path="/auth" element={<Auth />} />
						{/* <Route path="/search" element={<SearchResults />} /> */}
						<Route path="/:userId" element={<UserProfile />} />
						<Route path="/" element={useSelector(state => state.token ? <Navigate to="/home" /> : <Navigate to="/auth" /> )} />
					</Routes>
				</BrowserRouter>
			</CssBaseline>
		</ThemeProvider>
	);
};

export default App;

{
	/* <form onSubmit={handleSubmit}>
      <input type="file" />
      <button type="submit">Upload</button>
      </form> */
}
// const handleSubmit = async (values, actions) => {
//     const fileName = values['file'].name;
//     let formData = new FormData();
//     formData.append('picturePath', `${Date.now()}__${fileName}`)
//     Object.keys(values).forEach((key) => {
//         formData.append(key, values[key]);
//     })

//     console.log(formData)

//     const data = await fetch('http://localhost:3000/file', {
//       method: 'POST',
//       body: formData,
//     })

// 		console.log(data)
// 	};
// 	return (
// 		<>
// 			<Formik initialValues={{ file: null }} onSubmit={handleSubmit}>
// 				{(props) => (
// 					<form onSubmit={props.handleSubmit} encType="multipart/form-data">
// 						<input
// 							type="file"
// 							name="file"
// 							onChange={(event) => {
// 								props.setFieldValue("file", event.currentTarget.files[0]);
// 							}}
// 						/>
// 						<button type="submit">Upload</button>
// 					</form>
// 				)}
// 			</Formik>
// 		</>
// 	);
