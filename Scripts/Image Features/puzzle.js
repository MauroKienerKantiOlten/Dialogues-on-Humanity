// Array to hold pieces of the puzzle
let pieces = [];

// Height and Width of a piece
let pieceWidth;
let pieceHeight;

// Number of rows/columns to use for the puzzle
const numberOfRows = 3;
const numberOfColumns = 5;

// Important Variables for the placement of the pieces while it is dragged (Relative Values)
let placementOfXHand;
let placementOfYHand;


function getRelativePlacementToCanvas(event) {
	let canvasRect = imageCanvas.getBoundingClientRect();
	return {
		x: event.touches[0].clientX - canvasRect.left,
		y: event.touches[0].clientY - canvasRect.top
	};
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

function parsePixelValue(value) {
	return Number(value.replace(/px$/, ''))
}

function shuffleArr(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var rand = Math.floor(Math.random() * (i + 1));
		[array[i], array[rand]] = [array[rand], array[i]]
	}
	return array;
}

/**
 * Checks if the puzzle is solved. CurrentX/Y should be equal to set x/y
 */
function puzzleIsSolved() {
	for (let piece of pieces) {
		if (piece.x != piece.currentX || piece.y != piece.currentY) {
			return false;
		}
	}
	return true;
}

/**
 * Removes the pieces and displays the image again
 */
function removeElements() {
	for (let piece of pieces) {
		document.getElementById(piece.id).remove();
	}
	imageCanvas.style.opacity = 1;
	addChatbotMessage();
}

/**
 * Hides the pieces before they are actually removed
 */
function hidePieces() {
	for (let piece of pieces) {
		document.getElementById(piece.id).style.opacity = 0;
	}
	setTimeout(removeElements, 1000);
}

// Function to handle the start of the dragging
function handleDragStart(event) {
	event.dataTransfer.setData('text', event.target.id);
}

function drawImageFeatureCallback() {
	imageCanvas.style.opacity = 0;

	pieceWidth = widthOfImage / numberOfRows;
	pieceHeight = heightOfImage / numberOfColumns;


	// Create canvas for each piece and add event listeners
	let randomPlacement = [];
	for (let x = 0; x < numberOfRows; x++) {
		for (let y = 0; y < numberOfColumns; y++) {
			randomPlacement.push([x, y]);
		}
	}
	// Shuffle the random Placements
	randomPlacement = shuffleArr(randomPlacement);

	for (let x = 0; x < numberOfRows; x++) {
		for (let y = 0; y < numberOfColumns; y++) {
			const pieceCanvas = document.createElement("canvas");

			// Style properties of piece canvas
			pieceCanvas.width = pieceWidth;
			pieceCanvas.height = pieceHeight;
			pieceCanvas.style.position = "absolute";
			pieceCanvas.style.outline = "1px solid black";

			let pos = randomPlacement.shift();
			pieceCanvas.style.left = `${(pos[0]*widthOfImage) / numberOfRows}px`;
			pieceCanvas.style.top = `${(pos[1]*heightOfImage) / numberOfColumns}px`;

			// Enable drag and drop
			pieceCanvas.id = numberOfColumns * y + x;
			pieceCanvas.draggable = true;
			pieceCanvas.ondragstart = handleDragStart;
			pieceCanvas.addEventListener('touchstart', handleTouchStart, false);
			pieceCanvas.addEventListener('touchmove', handleTouchMove, false);
			pieceCanvas.addEventListener('touchend', handleTouchEnd, false);

			const pieceContext = pieceCanvas.getContext("2d");

			// Draw piece of image onto piece canvas
			pieceContext.drawImage(image, x * (imageWidth / numberOfRows), y * (imageHeight / numberOfColumns), imageWidth / numberOfRows, imageHeight / numberOfColumns, 0, 0, pieceWidth, pieceHeight);

			// Push to pieces array
			pieces.push({
				id: pieceCanvas.id,
				x: x * pieceWidth,
				y: y * pieceHeight,
				currentX: pos[0] * pieceWidth,
				currentY: pos[1] * pieceHeight
			});

			// Append the canvas to the parent of imageCanvas
			imageCanvas.parentNode.appendChild(pieceCanvas);
		}
	}
}

function movePieces(mousePosition, draggedId) {

	// Get corresponding piece object
	for (let piece of pieces) {
		if (piece.id === draggedId) {
			draggedPiece = piece;
			break;
		}
	}

	// Check if dropped on another piece
	for (let piece of pieces) {
		if (piece.id !== draggedId &&
			mousePosition.x > piece.currentX &&
			mousePosition.x < piece.currentX + pieceWidth &&
			mousePosition.y > piece.currentY &&
			mousePosition.y < piece.currentY + pieceHeight) {

			// Swap positions
			const tempX = piece.currentX;
			const tempY = piece.currentY;
			piece.currentX = draggedPiece.currentX;
			piece.currentY = draggedPiece.currentY;
			draggedPiece.currentX = tempX;
			draggedPiece.currentY = tempY;

			// Update piece positions on screen
			document.getElementById(piece.id).style.left = `${piece.currentX}px`;
			document.getElementById(piece.id).style.top = `${piece.currentY}px`;
			document.getElementById(draggedPiece.id).style.left = `${draggedPiece.currentX}px`;
			document.getElementById(draggedPiece.id).style.top = `${draggedPiece.currentY}px`;

			if (puzzleIsSolved()) {
				hidePieces();
			}
			return;
		}
	}
}

/**
 * Handle Drop event for Computer
 */
function handleDrop(event) {
	event.preventDefault();
	let mousePosition = getMousePos(imageCanvas, event);

	// Get id of dragged piece
	const draggedId = event.dataTransfer.getData("text");
	let draggedPiece;

	movePieces(mousePosition, draggedId);

}

/**
 * Handlers for the Touch Start/Move
 */
function handleTouchStart(event) {

	event.target.setAttribute('data-id', event.target.id);
	event.target.style.zIndex = 1000;

	let coordinates = getRelativePlacementToCanvas(event);
	placementOfXHand = coordinates.x - parsePixelValue(event.target.style.left);
	placementOfYHand = coordinates.y - parsePixelValue(event.target.style.top);
}

function handleTouchMove(event) {
	event.preventDefault();

	let coordinates = getRelativePlacementToCanvas(event);

	// New coordinates for the piece to display
	let touchX = coordinates.x - placementOfXHand;
	let touchY = coordinates.y - placementOfYHand;

	event.target.style.left = `${touchX}px`;
	event.target.style.top = `${touchY}px`;
}

/**
 * TouchEndHandler
 */
function handleTouchEnd(event) {

	event.target.style.zIndex = 1;
	let draggedId = event.target.getAttribute('data-id');

	const canvasRect = imageCanvas.getBoundingClientRect();

	let mousePosition = {
		x: event.changedTouches[0].clientX - canvasRect.left,
		y: event.changedTouches[0].clientY - canvasRect.top
	};

	movePieces(mousePosition, draggedId);
}

// Add event listener for drop event to the parent of imageCanvas
imageCanvas.parentNode.ondrop = handleDrop;
imageCanvas.parentNode.ondragover = function(event) {
	event.preventDefault();
};