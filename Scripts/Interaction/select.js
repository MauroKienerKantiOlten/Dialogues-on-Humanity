/** START SELECT **/
let selectedEmotions = "{{77.output}}";
let emotions = selectedEmotions.trim().split(",");

function displayBalken(response) {

    // Create the canvas element and assign it the id "myChart"
    const canvas = document.createElement('canvas');
    canvas.id = "myChart";

    // Add the class "p-onerem" to the canvas
    canvas.classList.add('p-onerem');

    // Append the canvas to the parent of the "chatbot" element
    const chatbotParent = document.getElementById('chatbot').parentNode;
    chatbotParent.appendChild(canvas);


    const ctx = canvas.getContext('2d');

    // Split the string into an array
    const wordList = response.split(',').map(word => word.trim());

    // Count occurrences of each word
    let wordCounts = {};
    wordList.forEach(word => {
        wordCounts[word] = wordCounts[word] ? wordCounts[word] + 1 : 1;
    });

    // Convert the wordCounts object to an array, sort it by count, and slice it for the top 8
    const sortedWords = Object.entries(wordCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8);

    const words = sortedWords.map(item => item[0]);
    const counts = sortedWords.map(item => item[1]);

    // Retrieve CSS colors
    const styles = getComputedStyle(document.body);
    const secondaryColor = styles.getPropertyValue('--secondary-color').trim();
    const thirdColor = styles.getPropertyValue('--third-color').trim();

    const backgroundColors = words.map((_, index) => {
        if (index < 2) return thirdColor;
        if (index < 5) return secondaryColor;
        return 'black';
    });

    const borderColors = words.map(() => secondaryColor);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: words,
            datasets: [{
                label: 'Count of Words',
                data: counts,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


function removeSelect() {
    document.getElementById("selectWordsId").style.display = "none";
}

function displaySelect(emotions) {

    document.getElementById("selectWordsId").style.display = "block";

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledEmotions = shuffleArray(emotions);
    const feelingsContainer = document.getElementById("feelings-container");

    function updateSelectedWords() {
        let selectedEmotions = [];
        for (let emotion of emotions) {
            if (document.getElementById(emotion).classList.contains("active")) {
                selectedEmotions.push(emotion);
            }
        }

        addChatEntry(selectedEmotions.join(", "));

        $.ajax({
            url: 'https://hook.eu1.make.com/149ynjqc8s385c4ishp6e6fl7ijd1ftd',
            type: 'POST',
            data: {
                entryKey: entryKey,
                imageKey: imageKey,
                interaction: interaction,
                selectedEmotions: selectedEmotions
            },
            success: function(response) {
                console.log('Success:', response);
                removeSelect();
                let emotionList = response.split(";=")[1];

                if (interaction == "chatbot" && chatText[2] != "") {
                    addChatbotMessage();
                } else {
                    addChatbotMessage("Thank you for participating. Below is a bar chart of the selected options by other users.");
                    displayBalken(emotionList);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error:', textStatus, errorThrown);
            }
        });
    };

    let submitButton = document.getElementById("submitSelectedWords");
    if (submitButton) {
        submitButton.addEventListener("click", updateSelectedWords);
    }

    if (feelingsContainer) {
        shuffledEmotions.forEach((emotion, index) => {
            const label = document.createElement("label");
            label.className = "cloud-label " + emotion;
            label.id = emotion;
            label.innerHTML = emotion.charAt(0).toUpperCase() + emotion.slice(1);
            label.addEventListener("click", () => {
                label.classList.toggle("active");
            });
            feelingsContainer.appendChild(label);
        });
    }
}

/** END SELECT */