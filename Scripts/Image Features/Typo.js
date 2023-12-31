let textCanvas, toggleButton;
let transitionDuration = 2000; // Transition duration in milliseconds
let transitionIn = false;

// Apply the text mask effect to the "after" canvas
function drawImageFeatureCallback() {

	imageCanvas.style.opacity = 0;

	// Create the "after" canvas element
	textCanvas = document.createElement('canvas');

	textCanvas.width = imageWidth;
	textCanvas.height = imageHeight;

	let textCtx = textCanvas.getContext('2d');

	/* Set the canvas Width and Height dynamically */
	textCtx.canvas.width = widthOfImage;
	textCtx.canvas.height = heightOfImage;

	textCtx.drawImage(image, 0, 0, imageWidth, imageHeight, 0, 0, widthOfImage, heightOfImage);

	// Apply the text mask effect on the after canvas
	textCtx.globalCompositeOperation = 'destination-in';
	textCtx.font = 'bold 7rem sans-serif';
	textCtx.textAlign = 'center';
	textCtx.textBaseline = 'middle';

	// Get the size of the text
	let chosenText = '{{11.`Typo-Background`}}'.toUpperCase()
	let textWidth = textCtx.measureText(chosenText).width;

	// Calculate the position to center the text
	let x = widthOfImage / 2;
	let y = heightOfImage / 2;

	textCtx.fillText(chosenText, x, y, widthOfImage);

	// Hide the "after" canvas initially
	textCanvas.style.opacity = 1;
	textCanvas.style.position = "absolute";

	// Create a container for the canvases
	imageCanvas.parentNode.insertBefore(textCanvas, imageCanvas);

	toggleButton = document.createElement('button');
	toggleButton.className = "ui button background-color-third nextButton";
	toggleButton.innerHTML = "Display Image";
	toggleButton.addEventListener('click', toggleCanvas);

	document.getElementById("canvasHolder").appendChild(toggleButton);
}

// Toggle between "before" and "after" canvas with transition
function toggleCanvas() {
	let start = null;

	let textToDisplay = "Display ";
	if (transitionIn) {
		textToDisplay += "Image"
	} else {
		textToDisplay += "Text"
	}
	toggleButton.textContent = textToDisplay;

	if (transitionIn) { // Fade in the "after" canvas            
		imageCanvas.style.opacity = 0;
		textCanvas.style.opacity = 1;
	} else { // Fade out the "after" canvas            
		imageCanvas.style.opacity = 1;
		textCanvas.style.opacity = 0;
	}
	transitionIn = !transitionIn;
	addChatbotMessage();
}