import UserAvatar from "./UserAvatar";
import { Box, Typography, useTheme } from "@mui/material";
const Comment = ({
	userId,
	postId,
	firstName,
	lastName,
	picturePath,
	content,
}) => {
    const theme = useTheme()
    return (
        <Box 
            display='flex'
            gap='10px'
            backgroundColor={theme.palette.background.lighter}
            p={theme.spacing(1)}
            borderRadius={4}
        >
            <UserAvatar {...{picturePath, userId}} />
            <Box>
                <Typography
                    // fontSize={16}
                >
                    {`${firstName} ${lastName}`}
                </Typography>
                <Typography
                    sx={{fontWeight: '300', fontSize: '0.85rem'}}
                >
                    {content}
                </Typography>
            </Box>
        </Box>
    )
};
export default Comment;