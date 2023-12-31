let oppositeEmotions = [
    ["{{get(split(11.sliderEmotions[1]; "-"); 1)}}", "{{get(split(11.sliderEmotions[1]; "-"); 2)}}"],
    ["{{get(split(11.sliderEmotions[2]; "-"); 1)}}", "{{get(split(11.sliderEmotions[2]; "-"); 2)}}"],
    ["{{get(split(11.sliderEmotions[3]; "-"); 1)}}", "{{get(split(11.sliderEmotions[3]; "-"); 2)}}"]
]
let interactionSliders = document.getElementById("interactionSliders");
let firstSlider = "";
let secondSlider = "";
let thirdSlider = "";
let submitButtonSliders = "";

function displayRadarChart(data) {
    // 1. Parsing Data
    const records = data.split(',').map(record => record.trim().split('-'));

    let categories = {};

    for (let record of records) {
        for (let i = 0; i < record.length; i += 3) {
            const categoryPair = `${record[i]}-${record[i + 1]}`;
            const value = Number(record[i + 2]);
            if (categories[categoryPair]) {
                categories[categoryPair].push(value);
            } else {
                categories[categoryPair] = [value];
            }
        }
    }

    // 2. Compute Mean
    const means = {};
    for (const [categoryPair, values] of Object.entries(categories)) {
        const sum = values.reduce((acc, val) => acc + val, 0);
        const mean = sum / values.length;
        const [opposite, category] = categoryPair.split('-');
        means[category] = mean;
        means[opposite] = 100 - mean;
    }

    // 3. Arrange labels dynamically
    const pairs = Object.keys(categories);
    let firstHalf = pairs.map(pair => pair.split('-')[0]);
    let secondHalf = pairs.map(pair => pair.split('-')[1]);

    const orderedLabels = [...firstHalf, ...secondHalf];

    // 4. Display Radar Chart

    // Colors
    const styles = getComputedStyle(document.body);
    const secondaryColor = styles.getPropertyValue('--secondary-color').trim();
    const thirdColor = styles.getPropertyValue('--third-color').trim();

    const canvas = document.createElement('canvas');
    document.getElementById('chatbot').parentNode.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: orderedLabels,
            datasets: [{
                label: "Values",
                data: orderedLabels.map(label => means[label]),
                backgroundColor: thirdColor,
                borderColor: secondaryColor,
                pointBackgroundColor: "white"
            }]
        },
        options: {
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 100,
                    display: false
                }
            }
        }
    });
}

function submitSelectedSliders() {
    let sliderValues = firstSlider.id + "-" + firstSlider.value + "-";
    sliderValues += secondSlider.id + "-" + secondSlider.value + "-";
    sliderValues += thirdSlider.id + "-" + thirdSlider.value;
addChatEntry(firstSlider.id + "-" + firstSlider.value);
	addChatEntry(secondSlider.id + "-" + secondSlider.value);
	addChatEntry(thirdSlider.id + "-" + thirdSlider.value);
    $.ajax({
        url: 'https://hook.eu1.make.com/zvj44mqnidom5z9p7dda4qb2tng9hvt7',
        type: 'POST',
        data: {
            imageKey: imageKey,
            sliderValues: sliderValues
        },
        success: function(response) {
            console.log('Success:', response);
			firstSlider.remove();
			secondSlider.remove();
			thirdSlider.remove();
			submitButtonSliders.remove();
			document.getElementById("interactionSliders").remove();
			addChatbotMessage("Thank you for sharing. Below you find how other users set the sliders.")
			displayRadarChart(response.split(";=")[1]);
			
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error:', textStatus, errorThrown);
        }
    });
}

function initializeCallbacksForSliders() {
    firstSlider = document.getElementById(oppositeEmotions[0][0] + "-" + oppositeEmotions[0][1]);
    secondSlider = document.getElementById(oppositeEmotions[1][0] + "-" + oppositeEmotions[1][1]);
    thirdSlider = document.getElementById(oppositeEmotions[2][0] + "-" + oppositeEmotions[2][1]);
    submitButtonSliders = document.getElementById("submitButtonSliders");
    submitButtonSliders.addEventListener("click", submitSelectedSliders);
}

if (interactionSliders) {
    initializeCallbacksForSliders();
}