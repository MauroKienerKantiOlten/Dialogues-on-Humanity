let blackAndWhiteIsCreated = false;
let colorAdded = true;
let toggleButton;

// Reset the filter values
function toggleColors() {
	let filter = "";
	let toggleButton = document.getElementById("toggleButton");
	if (colorAdded) {
		filter = "grayscale(1)";
		toggleButton.innerHTML = "Add Colors";
		colorAdded = false;
	} else {
		filter = "grayscale(0)"
		toggleButton.innerHTML = "Remove Colors";
		colorAdded = true;
	}

	ctx.clearRect(0, 0, widthOfImage, heightOfImage);

	drawImage(filter);
	addChatbotMessage();
}

// Defines the slider an the toggle Buttons
function drawImageFeatureCallback() {

	if (blackAndWhiteIsCreated) {
		return;
	}

	// Slider creation
	toggleButton = document.createElement('button');
	toggleButton.className = "ui button background-color-third nextButton";
	toggleButton.id = "toggleButton";
	toggleButton.innerHTML = "Add Colors";
	toggleButton.addEventListener('click', toggleColors);

	document.getElementById("canvasHolder").appendChild(toggleButton);

	blackAndWhiteIsCreated = true;
	toggleColors();
}