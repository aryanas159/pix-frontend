import { Auth, Feed, SearchResults, UserProfile } from "./pages";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import getDesignTokens from "./theme";
import { createTheme, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@emotion/react";
const App = () => {
	const mode = useSelector((state) => state.mode);
	const theme = createTheme(getDesignTokens(mode));
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline>
				<BrowserRouter>
					<Routes>
						{/* <Route path="/home" element={useSelector(state => state.token ? <Feed /> : <Navigate to="/auth" /> )} /> */}

						<Route path="/home" element={<Feed />} />
						<Route path="/auth" element={<Auth />} />
						<Route path="/search" element={<SearchResults />} />
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
