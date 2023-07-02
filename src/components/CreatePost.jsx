import {
	TextField,
	Box,
	useTheme,
	IconButton,
	Button,
	Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import UserAvatar from "./UserAvatar";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import axios from "axios";
import { setPost, setPosts } from "../features/userSlice";
const ImageUpload = ({ setPicture, picture }) => {
	const onDrop = (acceptedFiles) => {
		setPicture(acceptedFiles[0]);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: false,
		accept: {
			"image/png": [".png"],
			"image/jpg": [".jpg", ".jpeg", ".webp"],
		},
	});

	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<IconButton {...getRootProps()}>
				<AddPhotoAlternateIcon sx={{ fontSize: "2rem" }} color="primary" />
				<input {...getInputProps()} />
			</IconButton>
			{isDragActive ? (
				<Typography sx={{ fontSize: "1rem" }}>
					Drop the image here...
				</Typography>
			) : !picture ? (
				<></>
			) : (
				<Typography sx={{ fontSize: "0.8rem" }}>{picture.name}</Typography>
			)}
		</Box>
	);
};

const CreatePost = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const mode = useSelector((state) => state.mode);
	const theme = useTheme();
	const [description, setDescription] = useState("");
	const [picture, setPicture] = useState({});

	const handlePost = async () => {
		if (description || picture.name) {
			const formData = new FormData();
			if (!!picture.name) {
				formData.append("picturePath", `${Date.now()}__${picture.name}`);
				formData.append("picture", picture);
				formData.append("postPicturePath", `${Date.now()}__${picture.name}`);
			}
			formData.append("description", description);
			const response = await axios.post("/posts", formData);
			const { allPosts } = response.data;
			dispatch(setPosts({ posts: allPosts }));
			setPicture({});
			setDescription("");
			console.log(allPosts);
		}
	};

	return (
		<Box
			display="flex"
			flexDirection="column"
			p={theme.spacing(1, 2)}
			borderRadius={"25px"}
			backgroundColor={theme.palette.background.light}
			sx={{ width: { xs: "90vw", sm: "35vw" } }}
			gap={2}
		>
			<Box display={"flex"} gap={2}>
				<UserAvatar picturePath={user.picturePath} userId={user._id} />
				<TextField
					variant="outlined"
					multiline={true}
					placeholder="What's on your mind?"
					fullWidth
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					sx={{
						borderRadius: "20px",
						"& .MuiInputBase-root": {
							borderRadius: "40px",
							border: "1px solid #000",
						},
						"& .css-ef9o8m-MuiInputBase-input-MuiOutlinedInput-input": {
							fontWeight: "500",
						},
					}}
					inputProps={{
						sx: {
							padding: theme.spacing(0.8),
						},
					}}
				/>
			</Box>
			<Box display={"flex"} justifyContent="space-between" alignItems="center">
				<ImageUpload setPicture={setPicture} picture={picture} />
				<Button
					variant="contained"
					sx={{ borderRadius: "20px" }}
					onClick={handlePost}
				>
					Post
				</Button>
			</Box>
		</Box>
	);
};
export default CreatePost;
