import { grey } from "@mui/material/colors";
import { alpha } from "@mui/material";
const getDesignTokens = (mode) => ({
	palette: {
		mode,
		...(mode === "light" ? {
            //palette for light mode
            primary: {
                main: '#D7263D',
                light: '#2374AB'
            },
            neutral: {
                light: '#fff',
                dark: '#000',
            },
            background: {
                default: grey[400],
                light: grey[200],
                lighter: alpha("#FFCCCB", 1),
                button: grey[300],
            },
            navbar: {
                main: '#D7263D'
            }
        } : {
            // palette for dark mode
            primary: {
                main: '#72DDF7',
                light: '#2374AB'
            },
            neutral: {
                light: '#000',
                dark: '#fff'
            },
            background: {
                default: '#000',
                light: "#181818",
                lighter: grey[900],
                button: grey[900],
            },
            navbar: {
                main: '#101010',
            }
        }),
	},
    typography: {
        fontFamily: ['Poppins','Arial','sans-serif'].join(',')
    }
});

export default getDesignTokens;
