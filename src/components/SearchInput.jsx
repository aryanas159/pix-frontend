import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha, InputBase } from "@mui/material";
import { useMemo } from "react";
const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.black, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.black, 0.25),
	},
	marginLeft: 0,
	marginRight: '20px',
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "20ch",
			"&:focus": {
				width: "30ch",
			},
		},
	},
}));

const SearchInput = ({search, setSearch, searchFocus, setSearchFocus}) => {
	const handleSearch = (e) => {
		if (e.target.value != search) {
			setSearch(e.target.value)
		}
	}
	return (
		<Search>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				placeholder="Search…"
				inputProps={{ "aria-label": "search" }}
				value={search}
				onChange={handleSearch}
				onFocus={() => setSearchFocus(true)}
				onBlur={() => setSearchFocus(false)}
			/>
		</Search>
	);
};

export default SearchInput;
