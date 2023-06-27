import { grey } from "@mui/material/colors";

const getDesignTokens = (mode) => ({
	palette: {
		mode,
		...(mode === "light" ? {
            //palette for light mode
            neutral: {
                light: '#fff',
                dark: '#000',
            }
        } : {
            // palette for dark mode
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
