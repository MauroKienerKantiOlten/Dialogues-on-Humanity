let selectedYesOrNo = "{{11.selectWords}}"
let yesOrNo = selectedYesOrNo.split("-");

let leftButton = document.getElementById("LeftYN");
let rightButton = document.getElementById("RightYN");
let nbOfYesOrNoLevels = yesOrNo.length;
let yesOrNoLevel = 0;
let selectedYesOrNoItems = "";

function submitSelectedABValues() {
	leftButton.remove()
	rightButton.remove();
	addChatEntry(selectedYesOrNoItems.replaceAll("-", ", "));
    $.ajax({
        url: 'https://hook.eu1.make.com/g5i3p5du3fvt28x80hy9a13jhldtls6q',
        type: 'POST',
        data: {
            imageKey: imageKey,
            selectedYesOrNoItems: selectedYesOrNoItems
        },
        success: function(response) {
            console.log('Success:', response);
			let emotionList = response.split(";=")[1].replaceAll("-", ",");
			displayBalken(emotionList);
			addChatbotMessage("Thank you for sharing for participating. Below is a bar chart of the selected word from other users.");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error:', textStatus, errorThrown);
        }
    });
}

function yesOrNoClicked(event) {
    let selectedButton = event.currentTarget.id;
    selectedYesOrNoItems += event.currentTarget.innerHTML;
    yesOrNoLevel += 2;
    if (yesOrNoLevel == nbOfYesOrNoLevels) {
        // callback
		submitSelectedABValues();
        return;
    } else {
        selectedYesOrNoItems += "-";
        leftButton.innerHTML = yesOrNo[yesOrNoLevel];
        rightButton.innerHTML = yesOrNo[yesOrNoLevel + 1];
    }
}

function initializeYesNoButtons() {
    leftButton.innerHTML = yesOrNo[yesOrNoLevel];
    rightButton.innerHTML = yesOrNo[yesOrNoLevel + 1];
    leftButton.addEventListener("click", yesOrNoClicked);
    rightButton.addEventListener("click", yesOrNoClicked);
}

if (leftButton) {
    initializeYesNoButtons();
}