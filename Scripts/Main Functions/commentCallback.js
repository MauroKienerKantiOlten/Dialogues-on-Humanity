function secondSelect(emotions){
	deleteUserInputElement();
	let selectedEmotions = emotions;
	emotions = selectedEmotions.trim().split(",");
	displaySelect(emotions);
}

function secondEmotion(){
	deleteUserInputElement();
	displayWheel();
}

function secondNone(){
	// do nothing
}

function thirdBalken(){
	deleteUserInputElement();
	console.log("Balken");
}

function thirdWordCloud(enteredComments){
	console.log(enteredComments);
	displayWordCloud(enteredComments);
}

function thirdNone(){
	deleteUserInputElement();
}

function successFunctionAjaxComment(response){
    console.log("response:", response); 
	
	let customResponse = response.split(";=");
	let callback = customResponse[0]
	let data = customResponse[1]

    switch(callback) {
        case "secondSelect":
            secondSelect(data);
            break;

        case "secondEmotion":
            secondEmotion(data);
            break;

        case "secondNone":
            secondNone(data);
            break;

        case "thirdBalken":
            thirdBalken(data);
            break;

        case "thirdWordCloud":
            thirdWordCloud(data);
            break;

        case "thirdNone":
            thirdNone(data);
            break;

        default:
            console.log("No matching function for response:", response);
    }
}