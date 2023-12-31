let splittedWidth;
let splittedHeight;
let randomPlacement = [];
let currentSplittedImageIdx = 0;
let imageFeatureInitialized = false;
let nextButtonContainer;
let nextButton;

function shuffleArr(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var rand = Math.floor(Math.random() * (i + 1));
		[array[i], array[rand]] = [array[rand], array[i]]
	}
	return array;
}

function drawCurrentSplittedImage() {
	if (currentSplittedImageIdx == randomPlacement.length) {
		nextButtonContainer.remove();
		addChatbotMessage();
		drawImage();
		return;
	};
	let currentCoords = randomPlacement[currentSplittedImageIdx];
	ctx.globalCompositeOperation = 'source-over'
	ctx.drawImage(image, currentCoords[0] * (imageWidth / 2), currentCoords[1] * (imageHeight / 2), imageWidth / 2, imageHeight / 2, splittedWidth / 2, splittedHeight / 2, splittedWidth, splittedHeight);
	currentSplittedImageIdx += 1;
};

function drawImageFeatureCallback() {
	if (imageFeatureInitialized) {
		return;
	}
	splittedWidth = widthOfImage / 2;
	splittedHeight = heightOfImage / 2;

	// Create canvas for each piece and add event listeners
	for (let x = 0; x < 2; x++) {
		for (let y = 0; y < 2; y++) {
			randomPlacement.push([x, y]);
		}
	}
	// Shuffle the random Placements
	randomPlacement = shuffleArr(randomPlacement);
	ctx.clearRect(0, 0, widthOfImage, heightOfImage);
	drawCurrentSplittedImage();


	nextButton = document.createElement('button');
	nextButton.className = "ui button background-color-third nextButton";
	nextButton.innerHTML = "Next";
	nextButton.addEventListener('click', drawCurrentSplittedImage);

	nextButtonContainer = document.createElement("div");
	nextButtonContainer.appendChild(nextButton);

	document.getElementById("canvasHolder").appendChild(nextButtonContainer);
	imageFeatureInitialized = true;
}