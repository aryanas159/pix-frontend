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
import UploadIcon from "@mui/icons-material/Upload";
import MyDropzone from "./Dropzone";
import axios from "axios";
import { useState } from "react";

const userSchema = yup.object({
	firstName: yup.string().required("Required"),
	lastName: yup.string().required("Required"),
	email: yup.string().email("Please enter a valid email").required("Required"),
	picture: yup.mixed().required("Required"),
	password: yup
		.string()
		.matches(/^(?=.*\d).{5,}$/, {
			message:
				"Password must contain at least 5 characters and at least 1 digit",
		})
		.required("Required"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords must match")
		.required("Required"),
});

const RegistrationForm = ({ isMobile, setFormType }) => {
	const theme = useTheme();
	const [errMsg, setErrMsg] = useState("");
	const [successMsg, setsuccessMsg] = useState("");
	const [loading, setLoading] = useState(false)
	const initialValues = {
		firstName: "",
		lastName: "",
		email: "",
		picture: "",
		password: "",
		confirmPassword: "",
	};
	const toBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader()
			fileReader.readAsDataURL(file)
			fileReader.onload = () => {
				resolve(fileReader.result)
			};
			fileReader.onerror = (error) => {
				reject(error)
			}
		})
	};
	const handleSubmit = async (values) => {
		try {
			setLoading(true)
			const file = values["picture"];
			const base64String = await toBase64(file)
			// const pictureName = values["picture"].name;
			let formData = new FormData();
			// formData.append("picturePath", `${Date.now()}__${pictureName}`);
			formData.append("pictureBase64Url", base64String);
			Object.keys(values).forEach((key) => {
				formData.append(key, values[key]);
			});
			const urlEncoded = new URLSearchParams(formData).toString();
			const data = await axios.post("/auth/register", urlEncoded);
			setLoading(false)
			setFormType("login");
			setsuccessMsg("Successfully registered, login to continue");
		} catch (error) {
			setErrMsg(error.response.data.message);
			setLoading(false)
		}
	};
	return (
		<Formik
			onSubmit={handleSubmit}
			initialValues={initialValues}
			validationSchema={userSchema}
		>
			{({
				values,
				handleSubmit,
				handleBlur,
				touched,
				errors,
				handleChange,
				setFieldValue,
			}) => (
				<form
					onSubmit={handleSubmit}
					style={{ width: `${isMobile ? "100%" : "70%"}` }}
					encType="multipart/form-data"
				>
					<Stack direction="column" spacing={2}>
						<TextField
							id="firstName"
							variant="standard"
							label="First Name"
							value={values.firstName}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.firstName && errors.firstName}
							helperText={touched.firstName && errors.firstName}
							sx={{
								width: { xs: "80%", sm: "100%" },
								"& .MuiInputBase-input": {
									fontWeight: "300",
								},
								"& .MuiFormLabel-root": {
									fontSize: { xs: "0.9rem", sm: "1rem" },
								},
							}}
						/>
						<TextField
							id="lastName"
							variant="standard"
							label="Last Name"
							value={values.lastName}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.lastName && errors.lastName}
							helperText={touched.lastName && errors.lastName}
							sx={{
								width: { xs: "80%", sm: "100%" },
								"& .MuiInputBase-input": {
									fontWeight: "300",
								},
								"& .MuiFormLabel-root": {
									fontSize: { xs: "0.9rem", sm: "1rem" },
								},
							}}
						/>
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
									fontWeight: "300",
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
									fontWeight: "300",
								},
								"& .MuiFormLabel-root": {
									fontSize: { xs: "0.9rem", sm: "1rem" },
								},
							}}
						/>
						<TextField
							id="confirmPassword"
							type="password"
							variant="standard"
							label="Confirm password"
							value={values.confirmPassword}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.confirmPassword && errors.confirmPassword}
							helperText={touched.confirmPassword && errors.confirmPassword}
							sx={{
								width: { xs: "80%", sm: "100%" },
								"& .MuiInputBase-input": {
									fontWeight: "300",
								},
								"& .MuiFormLabel-root": {
									fontSize: { xs: "0.9rem", sm: "1rem" },
								},
							}}
						/>
						<MyDropzone
							setFieldValue={setFieldValue}
							values={values}
							id="picture"
							onBlur={handleBlur}
							isMobile={isMobile}
						/>
						<Typography
							color={"error"}
							fontSize={"small"}
							sx={{ margin: "0px", padding: "0px" }}
						>
							{touched.picture && errors.picture}
						</Typography>
						<Typography
							color={"error"}
							fontSize={"small"}
							sx={{ margin: "0px", padding: "0px" }}
						>
							{errMsg}
						</Typography>
						<Typography
							sx={{
								margin: "0px",
								padding: "0px",
								color: theme.palette.success.main,
							}}
						>
							{successMsg}
						</Typography>
					</Stack>
					<Button
						type="submit"
						variant="contained"
						sx={{
							width: { xs: "150px", sm: "200px" },
							marginTop: "20px",
						}}
					>
						Register
					</Button>
				</form>
			)}
		</Formik>
	);
};

export default RegistrationForm;
