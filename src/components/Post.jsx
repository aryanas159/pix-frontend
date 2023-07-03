import { useEffect, useState } from "react";
import {
	Box,
	Avatar,
	Typography,
	IconButton,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import UserAvatar from "./UserAvatar";
import { useSelector, useDispatch } from "react-redux";
import CommentIcon from "@mui/icons-material/Comment";
import axios from "axios";
import { setPosts, setPost } from "../features/userSlice";
import { Collapse, CircularProgress } from "@mui/material";
import Comments from "./Comments";
import getImageSource from "./getImageSource";

const Post = ({
	_id,
	userId,
	firstName,
	lastName,
	description,
	likes,
	comments,
}) => {
	const user = useSelector((state) => state.user);
	const theme = useTheme();
	const isMobile = useMediaQuery("(max-width: 600px)");
	const dispatch = useDispatch();
	const [commentsVisible, setCommentsVisible] = useState(false);
	const [loading, setLoading] = useState(true);
	const [postImgSource, setPostImgSource] = useState("");
	useEffect(() => {
		axios
			.get(`/posts/image/${_id}`)
			.then((res) => {
				const base64String = res.data.base64String;
				if (base64String) {
					setPostImgSource(getImageSource(base64String));
				}
			})
			.then(() => setLoading(false))
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	}, []);

	const handleLike = async () => {
		const response = await axios.post(`/posts/${_id}/like`);
		const { post } = response.data;
		dispatch(setPost(post));
	};

	return (
		<Box
			display="flex"
			flexDirection="column"
			p={theme.spacing(1, 2)}
			borderRadius={"25px"}
			backgroundColor={theme.palette.background.light}
			sx={{ width: { xs: "90vw", sm: "35vw" } }}
		>
			<Box display="flex" alignItems="center" paddingBottom="20px">
				<UserAvatar userId={userId} />
				<Typography
					sx={{
						flex: 1,
						fontSize: "1.1rem",
						marginLeft: "10px",
					}}
				>
					{`${firstName} ${lastName}`}
				</Typography>
			</Box>
			<Box>
				<Typography
					sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, fontWeight: "300" }}
				>
					{description}
				</Typography>
			</Box>
			<Box
				width="100%"
				m={theme.spacing(2, 0)}
				display="flex"
				alignItems={"center"}
				justifyContent={"center"}
			>
				{loading ? (
					<CircularProgress />
				) : (
					postImgSource && (
						<img
							src={postImgSource}
							alt={userId}
							style={{
								borderRadius: "25px",
								maxWidth: "100%",
								maxHeight: "100vh",
							}}
						/>
					)
				)}
			</Box>
			<Box display="flex" alignItems="center">
				<IconButton onClick={handleLike}>
					{!!likes[userId] ? (
						<FavoriteIcon
							color="error"
							fontSize={isMobile ? "small" : "medium"}
						/>
					) : (
						<FavoriteBorderIcon
							color="error"
							fontSize={isMobile ? "small" : "medium"}
						/>
					)}
				</IconButton>
				<Typography fontSize={isMobile ? "small" : "medium"}>
					{Object.keys(likes).length}
				</Typography>
				<IconButton
					sx={{ marginLeft: "10px" }}
					onClick={() => setCommentsVisible((prev) => !prev)}
				>
					<ModeCommentIcon
						sx={{ color: "#0090C1" }}
						fontSize={isMobile ? "small" : "medium"}
					/>
				</IconButton>
				<Typography fontSize={isMobile ? "small" : "medium"}>
					{comments.length}
				</Typography>
			</Box>
			<Box>
				<Collapse in={commentsVisible} orientation="vertical">
					<Comments comments={comments} postId={_id} />
				</Collapse>
			</Box>
		</Box>
	);
};

export default Post;
