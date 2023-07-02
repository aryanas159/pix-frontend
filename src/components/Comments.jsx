import Comment from "./Comment";
import { Stack, Box, TextField, useTheme, InputAdornment, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import UserAvatar from "./UserAvatar";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import axios from "axios";
import { setComments } from "../features/userSlice";
import { useId } from "react";
const Comments = ({ comments, postId }) => {
	const { picturePath, _id: userId } = useSelector((state) => state.user);
	const theme = useTheme();
    const dispatch = useDispatch()
    const [isFocused, setIsFocused] = useState(false)
    const [comment, setComment] = useState('')

    const handleComment = async () => {
        const response = await axios.post(`/posts/${postId}/comment`, {
            content: comment
        })
        const newComments = response.data
        dispatch(setComments({postId, newComments}))
		setComment('')
    }
	return (
		<Stack direction="column" spacing={2} sx={{ padding: "10px 0px" }}>
			<Box
				display="flex"
				gap="10px"
				backgroundColor={theme.palette.background.light}
				p={theme.spacing(1)}
				borderRadius={4}
			>
				<UserAvatar {...{ picturePath, userId }} />
				<TextField
					variant="standard"
					placeholder="Post a comment"
					fullWidth
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    value={comment}
                    onChange={e => setComment(e.target.value)}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={handleComment}>
                                <SendIcon sx={{color: theme.palette.primary.light}}/> 
                                </IconButton>
							</InputAdornment>
						),
					}}
				/>
				
			</Box>
			{!!comments.length &&
				comments.map((comment) => {
					return <Comment {...comment}/>;
				})}
		</Stack>
	);
};
export default Comments;
