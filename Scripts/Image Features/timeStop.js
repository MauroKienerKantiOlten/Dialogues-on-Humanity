let imageIsDisplayed = true;
let buttonsAreCreated = false;

function toggleImage() {
	if (imageIsDisplayed) {
		imageCanvas.style.opacity = 0;
		document.getElementById('toggleButton').innerHTML = "Display Image";
		imageIsDisplayed = false;
	} else {
		imageCanvas.style.opacity = 1;
		document.getElementById('toggleButton').innerHTML = "Hide Image";
		imageIsDisplayed = true;
	}
};

function createButton() {
	if (buttonsAreCreated) {
		return;
	}
	let toggleButton = document.createElement('button');
	toggleButton.className = "ui button background-color-third nextButton";
	toggleButton.id = "toggleButton";
	toggleButton.innerHTML = "Display Image";
	toggleButton.addEventListener('click', toggleImage);

	document.getElementById("canvasHolder").appendChild(toggleButton);
	buttonsAreCreated = true;
}

// Animation function to gradually increase the radius
function startAnimation() {
	setTimeout(function() {
		toggleImage();
	}, 500);
	createButton();
	addChatbotMessage();
};

function initialMessageCallback() {
	setTimeout(function() {
		startAnimation();
	}, 10000);
};