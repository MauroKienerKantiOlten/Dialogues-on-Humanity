const sliderOffset = Math.floor(Math.random() * 100);
let slidersAreCreated = false;
let toggleButton;

const sliderNames = [{
		name: 'grayscale',
		defaultValue: 0
	}, // default value is 0
	{
		name: 'saturate',
		defaultValue: 100
	}, // default value is 1
	{
		name: 'sepia',
		defaultValue: 0
	} // default value is 0
];

// Sets the filter values based on a single slider
function setAllFilterValues() {

	let filter = "";
	let slider = document.getElementById(`imageSlider`);
	sliderNames.forEach(sliderElement => {
		filter += `${sliderElement.name}(${(Math.abs(sliderElement.defaultValue + Math.abs(sliderOffset - slider.value))) / 100}) `
	});

	ctx.clearRect(0, 0, widthOfImage, heightOfImage);

	drawImage(filter);
}

// Reset the filter values
function resetFilters() {
	let slider = document.getElementById(`imageSlider`);
	slider.value = sliderOffset;
	setAllFilterValues();
	addChatbotMessage();
}

// Defines the slider an the toggle Buttons
function drawImageFeatureCallback() {

	if (slidersAreCreated) {
		return;
	}

	// Slider creation

	let sliderWrapper = document.createElement('div');
	let slider = document.createElement('input');

	sliderWrapper.className = 'ui black slider wHundred';
	slider.id = `imageSlider`;
	slider.className = 'wHundred';

	slider.type = 'range';
	slider.min = 0;
	slider.max = 100;
	slider.value = Math.random() * 100; // Initial middle value
	slider.oninput = function() {
		setAllFilterValues();
	};

	sliderWrapper.appendChild(slider);

	document.getElementById("canvasHolder").appendChild(sliderWrapper);

	toggleButton = document.createElement('button');
	toggleButton.className = "ui button background-color-third nextButton";
	toggleButton.innerHTML = "Reset Image";
	toggleButton.addEventListener('click', resetFilters);

	document.getElementById("canvasHolder").appendChild(toggleButton);

	slidersAreCreated = true;
	setAllFilterValues();
}