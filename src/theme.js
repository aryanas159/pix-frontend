import { grey } from "@mui/material/colors";

const getDesignTokens = (mode) => ({
	palette: {
		mode,
		...(mode === "light" ? {
            //palette for light mode
            primary: {
                main: '#231651',
                light: '#2374AB'
            },
            neutral: {
                light: '#fff',
                dark: '#000',
            },
            background: {
                default: grey[400],
                light: grey[200],
                lighter: grey[400],
                button: grey[400],
            },
            navbar: {
                main: '#38AECC'
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
