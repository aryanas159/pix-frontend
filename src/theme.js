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
            }
        } : {
            // palette for dark mode
            primary: {
                main: '#6DB1BF',
                light: '#2374AB'
            },
            neutral: {
                light: '#000',
                dark: '#fff'
            }
        }),
	},
    typography: {
        fontFamily: ['Poppins','Arial','sans-serif'].join(',')
    }
});

export default getDesignTokens;
