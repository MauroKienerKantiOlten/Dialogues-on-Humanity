let imageIsUnblurring = false;
let blurPx = 100;
// Sets the filter values based on a single slider
function setBlurValue() {
	let filter = `blur(${blurPx}px)`;
	ctx.clearRect(0, 0, widthOfImage, heightOfImage);
	drawImage(filter);
}



// Defines the slider an the toggle Buttons
function drawImageFeatureCallback() {

	if (imageIsUnblurring) {
		return;
	}
	imageIsUnblurring = true;
	setBlurValue();

	let unblurInterval = setInterval(function() {
		blurPx -= 1; // Decrease blur value every 10 milliseconds.
		setBlurValue();

		// After 10 seconds (10,000 ms), stop unblurring and clear the interval.
		if (blurPx <= 0) {
			clearInterval(unblurInterval);
			blurPx = 0;
			addChatbotMessage();
		}
	}, 100); // Redraw every 100 milliseconds to achieve 10 second duration from 100px to 0px.
}