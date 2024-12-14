// const token = "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";
const token = "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";
const inputText = document.getElementById("input")
const image = document.getElementById("image")
const button = document.getElementById("btn")
const downloadIcon = document.getElementById("download-icon");


async function query(data) {
    image.src="/loader.gif"
    downloadIcon.style.display = "none"; // Hide the download icon during loading

	const response = await fetch(
		"https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
		{
			headers: {
				Authorization: `Bearer ${token}`
				// "Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({"inputs": inputText.value}),
		}
	);
	const result = await response.blob();
	return result;
}
button.addEventListener('click', async function () {
    
    query().then((response) => {
        const objectURL= URL.createObjectURL(response)
        image.src =objectURL
    })



 const result = await query();
    if (result) {
        const objectURL = URL.createObjectURL(result);
        image.src = objectURL; // Display the generated image
        downloadIcon.style.display = "inline"; // Show the download icon

        // Set up the download icon for the image
        downloadIcon.addEventListener("click", function () {
            const link = document.createElement("a");
            link.href = objectURL;
            link.download = "generated-image.png"; // Default download name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});