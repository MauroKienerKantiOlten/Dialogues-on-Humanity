/** START WHEEL */
let canvasHolder = $("#canvasHolder");
let emotionWheel = $("#selectEmotionsId");
let wheel = emotionWheel.find("svg");
wheel.css("width", `${Math.min(canvasHolder.width()/2, 300)}`);
wheel.css("height", `${Math.min(canvasHolder.width()/2, 300)}`);
wheel.css("margin-top", "3rem");
wheel.css("margin-bottom", "5rem");

function removeWheel() {
    document.getElementById("selectEmotionsId").style.display = "none";
}

function displayWheel() {

    document.getElementById("selectEmotionsId").style.display = "block";

    const vars = [
        ["Angry", "#FF8B94", ["Mad", "Hurt", "Threatened", "Distant"]],
        ["Happy", "#FFE3B0", ["Confused", "Startled", "Amazed", "Excited"]],
        ["Surprised", "#FFB291", ["Joyful", "Proud", "Optimistic", "Peaceful"]],
        [
            "Disgusted",
            "#D1EDAA",
            ["Avoidance", "Disapproval", "Awful", "Disapointed"]
        ],
        ["Sad", "#A1DDE6", ["Bored", "Lonely", "Dispair", "Guilty"]],
        ["Fearfull", "#D9B8E6", ["Insecure", "Rejected", "Anxious", "Scared"]]
    ];
    const items = vars.flatMap((item) => item[2]);

    //-----Create Math Variables-----//
    let r = 0;
    let R = 45;
    let R2 = 80;
    let A = ((360 / vars.length) * Math.PI) / 180;
    let A2 = ((360 / items.length) * Math.PI) / 180;
    let d = `M${r * Math.cos(-A / 2)},${r * Math.sin(-A / 2)} L${
	  R * Math.cos(-A / 2)
	},${R * Math.sin(-A / 2)} A${R},${R} 0 0 1 ${R * Math.cos(A / 2)},${
	  R * Math.sin(A / 2)
	} L${r * Math.cos(A / 2)},${r * Math.sin(A / 2)} A${r},${r} 0 0 0 ${
	  r * Math.cos(-A / 2)
	},${r * Math.sin(-A / 2)}`;
    let d2 = `M${R * Math.cos(-A2 / 2)},${R * Math.sin(-A2 / 2)} L${
	  R2 * Math.cos(-A2 / 2)
	},${R2 * Math.sin(-A2 / 2)} A${R2},${R2} 0 0 1 ${R2 * Math.cos(A2 / 2)},${
	  R2 * Math.sin(A2 / 2)
	} L${R * Math.cos(A2 / 2)},${R * Math.sin(A2 / 2)} A${R},${R} 0 0 0 ${
	  R * Math.cos(-A2 / 2)
	},${R * Math.sin(-A2 / 2)}`;
    (R2 - R) / 2;

    let textR = r + (R - r) / 2;
    let textR2 = R + (R2 - R) / 2;

    //-----Create Other Variables-----//
    let sectorpath = document.getElementById("sectorpath");
    sectorpath.setAttributeNS(null, "d", d);
    let sectorpath2 = document.getElementById("sectorpath2");
    sectorpath2.setAttributeNS(null, "d", d2);

    //-----Loop Outer Circle-----//
    var count = 0;
    for (let i = 0; i < vars.length; i++) {
        var opacity = 0.5;
        for (let j = 0; j < vars[i][2].length; j++) {
            let use = document.createElementNS("http://www.w3.org/2000/svg", "use");
            use.setAttributeNS(
                "http://www.w3.org/1999/xlink",
                "xlink:href",
                "#sectorpath2"
            );
            use.setAttributeNS(null, "fill", vars[i][1]);
            use.setAttributeNS(null, "opacity", opacity);
            use.setAttributeNS(
                null,
                "transform",
                `rotate(${count * (360 / items.length) - (360 / items.length) * 1.5})`
            );
            document.getElementById("pies2").appendChild(use.cloneNode(true));
            opacity += 0.1;
            count += 1;
        }
    }
    //-----Loop Outer Labels-----//
    for (i = 0; i < items.length; i++) {
        var labelElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );
        let x = 50;
        let y = 0;
        labelElement.setAttributeNS(null, "x", x);
        labelElement.setAttributeNS(null, "y", y);
        labelElement.textContent = items[i];

        let sliceAngle = i * (360 / items.length) - (360 / items.length) * 1.5;
        labelElement.setAttributeNS(null, "transform", `rotate(${sliceAngle})`);
        document.getElementById("labels2").appendChild(labelElement.cloneNode(true));
    }
    //-----Loop Inner Circle-----//
    for (let i = 0; i < vars.length; i++) {
        let use = document.createElementNS("http://www.w3.org/2000/svg", "use");
        use.setAttributeNS(
            "http://www.w3.org/1999/xlink",
            "xlink:href",
            "#sectorpath"
        );
        use.setAttributeNS(null, "fill", vars[i][1]);
        use.setAttributeNS(null, "transform", `rotate(${i * (360 / vars.length)})`);
        document.getElementById("pies").appendChild(use.cloneNode(true));
    }
    //-----Loop Inner Labels-----//
    for (i = 0; i < vars.length; i++) {
        var labelElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );
        let x = 20;
        let y = 0;
        labelElement.setAttributeNS(null, "x", x);
        labelElement.setAttributeNS(null, "y", y);
        labelElement.textContent = vars[i][0];

        let sliceAngle = A * i * (180 / Math.PI);
        labelElement.setAttributeNS(null, "transform", `rotate(${sliceAngle} 0,0)`);
        document.getElementById("labels").appendChild(labelElement.cloneNode(true));
    }

    //-----Import and Update Select-----//
    const select = document.getElementById("emotions");
    for (let i = 0; i < vars.length; i++) {
        const groupData = vars[i];
        const optgroupElement = document.createElement("optgroup");
        optgroupElement.style = "background-color:" + vars[i][1];
        optgroupElement.label = groupData[0];
        optgroupElement.setAttribute("name", groupData[0]);
        for (let j = 0; j < groupData[2].length; j++) {
            const optionData = groupData[2][j];
            const optionElement = document.createElement("option");
            optionElement.textContent = optionData;
            optionElement.value = optionData;
            optgroupElement.appendChild(optionElement);
        }
        select.appendChild(optgroupElement);
    }

    var useSlices = document.querySelectorAll("#pies2 use");
    var texts = document.querySelectorAll("#labes2 text");
    for (var i = 0; i < useSlices.length; i++) {
        useSlices[i].addEventListener("click", function() {
            for (var j = 0; j < useSlices.length; j++) {
                if (useSlices[j] === this) {
                    select.selectedIndex = j;
                    break;
                }
            }
        });
    }

    var useElements = document.querySelectorAll("#pies2 use");
    for (var i = 0; i < useElements.length; i++) {
        useElements[i].style.display = "none";
    }
    var textElements = document.querySelectorAll("#labels2 text");
    for (var i = 0; i < textElements.length; i++) {
        textElements[i].style.display = "none";
    }
    var useSlicesInner = document.querySelectorAll("#pies use");
    for (var i = 0; i < useSlicesInner.length; i++) {
        useSlicesInner[i].addEventListener("click", function() {
            var useElements = document.querySelectorAll("#pies2 use");
            for (var i = 0; i < useElements.length; i++) {
                useElements[i].style.display = "none";
            }
            var textElements = document.querySelectorAll("#labels2 text");
            for (var i = 0; i < textElements.length; i++) {
                textElements[i].style.display = "none";
            }
            var clickedFillColor = this.getAttribute("fill");

            var outerPieces = document.querySelectorAll(
                "#pies2 [fill='" + clickedFillColor + "']"
            );
            for (var i = 0; i < outerPieces.length; i++) {
                outerPieces[i].style.display = "block";
                var rotate = outerPieces[i].getAttribute("transform");
                document.querySelector(
                    "#labels2 text[transform*='" + rotate + "']"
                ).style.display = "block";
            }
        });
    }


    function selectedEmotionCallback() {
        let emotionSelect = document.getElementById("emotions");
        var emotion = emotionSelect.value;
        let category = vars.find((element) => element[2].includes(emotion));

        emotionSelect.style.backgroundColor = category[1];

        let selectedCategory = category[0];

        $.ajax({
            url: 'https://hook.eu1.make.com/srsjwqabk89cxxykhlq2jdhto70eifav',
            type: 'POST',
            data: {
                entryKey: entryKey,
                imageKey: imageKey,
                category: selectedCategory,
                interaction: interaction,
                emotion: emotion
            },
            success: function(response) {
                console.log('Success:', response);
                addChatEntry(selectedCategory + "-" + emotion);
                removeWheel();
				displayBalken(response.split(";=")[1]);
                if (interaction == "chatbot") {
                    // Do nothing
                } else {
                    addChatbotMessage("Thank you for sharing.")
                }
                entryKey = response;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error:', textStatus, errorThrown);
            }
        });
    };

    toggleButton = document.createElement('button');
    toggleButton.className = "ui button background-color-third nextButton marginTop";
    toggleButton.id = "toggleButton";
    toggleButton.innerHTML = "Submit";
    toggleButton.addEventListener('click', selectedEmotionCallback);
    document.getElementById("selectEmotionsId").appendChild(toggleButton);
}
/** END WHEEL */