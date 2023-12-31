{{100.output}}
const imageCanvas = document.getElementById("imageCanvas");
const messagesContainer = document.getElementById("chatbot");
const content = document.getElementById("content");
const ctx = imageCanvas.getContext("2d");
const image = new Image();
let imageWidth;
let imageHeight;
let widthOfImage; // for the canvas width
let heightOfImage; // fot the canvas height

let initialMessageDisplayed = false; // for the initial Message
let interaction = "{{11.interaction}}";

const inputField = document.getElementById("userInput"); // UserInput Field for messages
let imageKey = "{{1.imageKey}}"; // for callback of images

image.src = '{{11.source}}';
image.crossOrigin = "anonymous";

let entryKey = ""; // ID From stored Data-element
let startTime = new Date();


/** PLACEHOLDER Functions that can be overwritten */
function drawImageFeatureCallback() {
    // Can be Overwritten
}

function addChatEntryCallback() {
    // Can be Overwritten
}

function addChatbotMessageCallback() {
    // Can be Overwritten
}

function addChatbotMessage() {
    // Placeholder if function will not be overwritten
}

function initialMessageCallback() {
    // Can be Overwritten
}

function successFunctionAjaxComment(response) {
    // Placeholder for Callback of User Comment
}
/** END PLACEHOLDERS */
{{123.WheelJS}}
{{125.SelectJs}}
function addRequiredHTML() {
    switch (interaction) {
        case "select":
            displaySelect(emotions);
            break;

        case "words":
            displaySelect(emotions);
            break;

        case "emotion":
            displayWheel();
            break;

        default:
            console.log("Do nothing");
    }
}

addRequiredHTML();

/** TypeWriter Effect to display Chatbot Message */
/** Uses these two global variables */
let textNumber = 0;
let speed = 20;
let chatBotMessageInProgress = false; // For the chatbot
let chatIdNumber = 0; // The id of the chat

function typeWriter(elementId, text) {
    if (textNumber < text.length) {
        document.getElementById(elementId).innerHTML += text.charAt(textNumber);
        textNumber++;
        setTimeout(typeWriter, speed, elementId, text);
    } else {
        textNumber = 0;
        chatBotMessageInProgress = false;
    }
}

/** If a TypeWriter Element is in the document, display Message */
function addMessage() {
    if (initialMessageDisplayed) {
        return;
    }
    initialMessageDisplayed = true;
    addChatbotMessage();
    initialMessageCallback();
}


/** END TYPEWRITER **/

/** AJAX Call for User Comments */
function ajaxCallChatEntry(comment) {
let endTime = new Date();
	let timeElapsed = endTime - startTime;
	let questionText = document.getElementById(`botAnswer_${chatIdNumber - 1}`);
    $.ajax({
        url: 'https://hook.eu1.make.com/yaqjxyapoistnrte44eq3tdk1z5sah43',
        type: 'POST',
        data: {
            chatIdNumber: chatIdNumber,
						timeElapsed: timeElapsed,
						question: questionText.innerHTML,
            imageKey: imageKey,
            comment: comment
        },
        success: function(response) {
            console.log('Success:', response);
            successFunctionAjaxComment(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error:', textStatus, errorThrown);
        }
    });
}

// Draw the splitted view
function drawImage(filter) {
    imageWidth = image.width;
    imageHeight = image.height;
    const containerWidth = imageCanvas.parentNode.offsetWidth;
    const containerHeight = imageCanvas.parentNode.offsetHeight;

    imageCanvas.width = imageWidth;
    imageCanvas.height = imageHeight;

    let relation = imageHeight / imageWidth;

    widthOfImage = Math.min(imageWidth, containerWidth);
    heightOfImage = widthOfImage * relation;

    /* Set the canvas Width and Height dynamically */
    ctx.canvas.width = widthOfImage;
    ctx.canvas.height = heightOfImage;

    // Draw the image on the canvas
    if (filter) {
        ctx.filter = filter;
    }

    ctx.drawImage(image, 0, 0, imageWidth, imageHeight, 0, 0, widthOfImage, heightOfImage);
    ctx.globalCompositeOperation = 'destination-in'

    addMessage();
    drawImageFeatureCallback();
}

image.addEventListener("load", drawImage);

/** JAVASCRIPT FOR CHATBOT */

/** Event Listener, if User writes message*/
if (inputField) {
    inputField.addEventListener("keydown", keyDownEventListener);
    document.getElementById("sendMessage").addEventListener("click", addUserInput);
}


function addChatbotMessage(message) {
    // We need to open the modal first
    if (!message) {
        message = chatText[chatIdNumber];
    }
    if (!message) {
        return;
    };
    chatBotMessageInProgress = true;
    let botRow = document.createElement("div");
    botRow.className = "row";
    let botMessage = document.createElement("div");
    botMessage.className = "column tStart fontItalic";
    let botText = document.createElement("span");
    let elemId = "botAnswer" + "_" + chatIdNumber;
    botText.id = elemId;
    chatIdNumber += 1;
    botText.innerText = '';
    botMessage.append(botText);
    botRow.append(botMessage);
    messagesContainer.append(botRow);
    typeWriter(elemId, message);
    addChatbotMessageCallback();
}

/** The Message from the user is added to the Chat*/
function addChatEntry(input) {
    let userRow = document.createElement("div");
    userRow.className = "row";
    let userMessage = document.createElement("div");
    userMessage.className = "column tEnd";
    let userText = document.createElement("span");
    userText.innerText = `${input}`;
    userMessage.append(userText);
    userRow.append(userMessage);
    messagesContainer.append(userRow);
    ajaxCallChatEntry(input);
    addChatEntryCallback();
}

/** Function to add user input to chatbot */
function keyDownEventListener(e) {
    if (e.code === "Enter") {
        addUserInput();
    }
}

function addUserInput() {
    if (chatBotMessageInProgress) {
        return;
    }
    let input = inputField.value;
    if (!input) {
        return;
    }
    inputField.value = "";
    addChatEntry(input);
    addChatbotMessage();
}

function deleteUserInputElement() {
    let chatbotElement = document.getElementById("chatbot");

    // Remove next sibling
    if (chatbotElement.nextElementSibling) {
        chatbotElement.nextElementSibling.remove();
    }
}

/** END CHATBOT **/
{{126.`WordCloud.js`}}
{{109.output}}
{{111.output}}
{{113.output}}