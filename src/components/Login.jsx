import * as yup from "yup";
import {
	styled,
	Box,
	TextField,
	Button,
	Stack,
	useTheme,
	alpha,
	Typography,
} from "@mui/material";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser, setToken } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const loginSchema = yup.object({
	email: yup.string().required("Required"),
	password: yup.string().required("Required"),
});

const LoginForm = ({isMobile}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [errMsg, setErrMsg] = useState('')
	const [loading, setLoading] = useState(false)

	const initialValues = {
		email: "",
		password: "",
	};
	const handleSubmit = async (values) => {
		try {
			setLoading(true)
			let formData = new FormData();
			Object.keys(values).forEach((key) => {
				formData.append(key, values[key]);
			});
			const urlEncoded = new URLSearchParams(formData).toString();
			const response = await axios.post("/auth/login", urlEncoded);
			console.log(response);
			const { token, user } = response.data;
			dispatch(setUser(user));
			dispatch(setToken(token));
			setLoading(false)
			if (token) {
				navigate("/home");
			}
		} catch (error) {
			setErrMsg(error.response.data.message)
			setLoading(false)
		}
	};
	return (
		<>
			<Formik
				onSubmit={handleSubmit}
				initialValues={initialValues}
				validationSchema={loginSchema}
			>
				{({
					values,
					handleSubmit,
					handleBlur,
					touched,
					errors,
					handleChange,
				}) => (
					<form onSubmit={handleSubmit} style={{width: `${isMobile ? '100%' : '70%'}`}}>
						<Stack direction="column" spacing={2}>
							<TextField
								id="email"
								variant="standard"
								type="email"
								label="Email"
								value={values.email}
								onChange={handleChange}
								onBlur={handleBlur}
								error={touched.email && errors.email}
								helperText={touched.email && errors.email}
								
								sx={{
									width: { xs: "80%", sm: "100%" },
									"& .MuiInputBase-input": {
										fontWeight: '300'
									},
									"& .MuiFormLabel-root": {
										fontSize: { xs: "0.9rem", sm: "1rem" },
									},
								}}
							/>
							<TextField
								id="password"
								variant="standard"
								type="password"
								label="Password"
								value={values.password}
								onChange={handleChange}
								onBlur={handleBlur}
								error={touched.password && errors.password}
								helperText={touched.password && errors.password}
								sx={{
									width: { xs: "80%", sm: "100%" },
									"& .MuiInputBase-input": {
										fontWeight: '300'
									},
									"& .MuiFormLabel-root": {
										fontSize: { xs: "0.9rem", sm: "1rem" },
									},
								}}
							/>
							<Typography color={'error'} fontSize={'small'} sx={{margin: '0px', padding: '0px'}}>{errMsg}</Typography>
						</Stack>
						<Button
							disabled={loading}
							type="submit"
							variant="contained"
							sx={{
								width: {xs: '150px', sm: '200px'},
								marginTop: "20px",
							}}
						>
							Login
						</Button>
						{/* {loading && <CircularProgress size={24} sx={{}}/>} */}
					</form>
				)}
			</Formik>
		</>
	);
};

export default LoginForm;
