import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Box, Stack, Typography, useTheme, IconButton, MenuList, MenuItem } from "@mui/material";
import axios from "axios";
import UserAvatar from "./UserAvatar";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function SearchResults({search}) {
  const theme = useTheme()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const [searchResults, setSearchResults] = useState([])
  useEffect(() => {
    axios.get(`/users/search?name=${search}`)
    .then(res => setSearchResults(res.data.users))
  }, [search])
  console.log(search)
	return (
		<MenuList
			sx={{
				width: { xs: "70vw", sm: "25vw" },
        top: {xs: '8vh', sm: '4vw'},
        left: {xs: '15vw', sm: '12vw'},
        display: "flex",
			position: "absolute",
      flexDirection: 'column',
      p: theme.spacing(1),
      gap: "16px",
      minHeight: "10px",
      maxHeight: '80vh',
      overflow: 'scroll',
			zIndex: '2',
			borderRadius:  "16px",
      backgroundColor: theme.palette.background.lighter
			}}
		>
			{searchResults.length && searchResults.map(person => {
        return (
          <MenuItem  onClick={() => navigate(`/${person._id}`)} sx={{display: "flex", gap: '16px', alignItems: 'center', borderRadius: '16px'}}>
							<UserAvatar userId={person._id} picturePath={person.picturePath}/>
							<Box flex={1}>
								<Typography color={theme.palette.neutral.dark}>{`${person.firstName} ${person.lastName}`}</Typography>
								<Typography fontSize={14} color={theme.palette.grey[700]}>
									{person.friends.length} Friends
								</Typography>
							</Box>
							{person._id != user._id ? <IconButton color="primary" sx={{backgroundColor: theme.palette.background.button}} onClick={() => {handleFriend(person._id)}}>
								{!user.friends.includes(person._id) ? (
									<PersonAddIcon
										sx={{ p: theme.spacing(1), fontSize: "40px" }}
									/>
								) : (
									<PersonRemoveIcon
										sx={{ p: theme.spacing(1), fontSize: "40px" }}
									/>
								)}
							</IconButton> : <></>}
						</MenuItem>
        )
      })}
		</MenuList>
	);
}

export default SearchResults;
