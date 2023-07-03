const getImageSource = (base64String) => {

	const decodedData = atob(base64String);

	// Create a Uint8Array from the decoded data
	const buffer = new Uint8Array(decodedData.length);
	for (let i = 0; i < decodedData.length; i++) {
		buffer[i] = decodedData.charCodeAt(i);
	}

	// Create a Blob from the buffer
	const blob = new Blob([buffer], { type: "image/png" });

	// Create an object URL for the Blob
	const imageURL = URL.createObjectURL(blob);
	return imageURL;
};

export default getImageSource;