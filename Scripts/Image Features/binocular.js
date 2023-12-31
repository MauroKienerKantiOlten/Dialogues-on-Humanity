/** Feature Code */
let radius = 75; // Adjust the radius of the binoculars view
const animationSpeed = 2;
let centerX = imageCanvas.width / 2;
let centerY = imageCanvas.height / 2;

function drawImageFeatureCallback() {
	// Apply the clip path to show only a circular portion of the image
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
	ctx.fill();
}

function handleTouchMove(event) {
	event.preventDefault();

	const canvasRect = imageCanvas.getBoundingClientRect();
	const touchX = event.touches[0].clientX - canvasRect.left;
	const touchY = event.touches[0].clientY - canvasRect.top;

	if (touchX >= 0 && touchX <= imageCanvas.width && touchY >= 0 && touchY <= imageCanvas.height) {
		centerX = touchX;
		centerY = touchY;
	} else {
		centerX = Math.min(Math.max(touchX, 0), imageCanvas.width);
		centerY = Math.min(Math.max(touchY, 0), imageCanvas.height);
	}

	drawImage();
};

function handleMouseMove(event) {
	const canvasRect = imageCanvas.getBoundingClientRect();
	const mouseX = event.clientX - canvasRect.left;
	const mouseY = event.clientY - canvasRect.top;

	let minX = ((imageCanvas.width - imageWidth) / 2) + radius;
	let maxX = ((imageCanvas.width - imageWidth) / 2) + imageWidth - radius;
	let minY = radius;
	let maxY = imageCanvas.height - radius;

	if (mouseX >= minX && mouseX <= maxX && mouseY >= minY && mouseY <= maxY) {
		centerX = mouseX;
		centerY = mouseY;
	} else {
		centerX = Math.min(Math.max(mouseX, minX), maxX);
		centerY = Math.min(Math.max(mouseY, minY), maxY);
	}

	drawImage();
}

// Event listener for mouseover canvas
imageCanvas.addEventListener("mousemove", handleMouseMove);

// Event listener for touchmove on mobile devices
imageCanvas.addEventListener("touchmove", handleTouchMove);

// Event listener for the click event on the binocularsCanvas
imageCanvas.addEventListener("click", startAnimation);

// Animation function to gradually increase the radius
function startAnimation() {
	imageCanvas.removeEventListener("mousemove", handleMouseMove);
	imageCanvas.removeEventListener("touchmove", handleTouchMove);
	let maxRadius = imageCanvas.width;
	let animationId = requestAnimationFrame(animate);
	let counter = 0;

	function animate() {
		if (radius < maxRadius) {
			radius += animationSpeed;
			drawImage();
			requestAnimationFrame(animate);
		} else {
			cancelAnimationFrame(animationId);
			if (counter == 0) {
				addChatbotMessage();
			}
			counter += 1;
		}
	}

	animate();
}