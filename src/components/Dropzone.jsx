import React from "react";
import { useDropzone } from "react-dropzone";
import { useTheme } from "@emotion/react";
import UploadIcon from "@mui/icons-material/Upload";
const MyDropzone = ({setFieldValue, values, isMobile}) => {
	const theme = useTheme();
	const onDrop = (acceptedFiles, rejectedFiles) => {
		// Handle the acceptedFiles and rejectedFiles arrays
        setFieldValue("picture", acceptedFiles[0]);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: false,
		accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg', '.jpeg', '.webp'],
        }, // Specify the accepted file types here
	});

	return ( 
		<div
			{...getRootProps()}
			className={`dropzone ${isDragActive ? "active" : ""}`}
			style={{
				borderBottom: `1px solid ${theme.palette.neutral.dark}`,
				cursor: "pointer",
				borderRadius: "10px",
				width: `${isMobile ? '80%' : '100%'}`,
				padding: "0px 10px",
				marginTop: "30px",
				display: "flex",
				alignItems: "center",
				gap: "10px",
				fontSize: `${isMobile ? '0.9rem' : '1rem'}`
			}}
		>
			<UploadIcon />
			<input {...getInputProps()} />
			{isDragActive ? (
				<p>Drop the image here...</p>
			) : 
				!values.picture ?
                (<p>Upload your profile picture</p>) 
                :
                (<p>{values.picture.name}</p>)
			}
		</div>
	);
};

export default MyDropzone;
