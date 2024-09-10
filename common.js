let slideIndex = 0;

const totalSlides = 23;
const allImages = [
    "image/takashimaya.png", //23
    "image/takashimaya.png", //22
    "image/takashimaya.png", //21
    "image/takashimaya.png", //20
    "image/takashimaya.png", //19
    "image/takashimaya.png", //18
    "image/takashimaya.png", //17
    "image/takashimaya.png", //16
    "image/takashimaya.png", //15
    "image/takashimaya.png", //14
    "image/xiaomi.png", //13
    "image/xiaomi.png", //12
    "image/xiaomi.png", //11
    "image/xiaomi.png", //10
    "image/xiaomi.png", //9
    "image/xiaomi.png", //8
    "image/xiaomi.png", //7
    "image/xiaomi.png", //6
    "image/xiaomi.png", //5
    "image/xiaomi.png", //4
    "image/nespresso.png", // 3
    "image/dji.png", // 2
    "image/dyson.png", // 1
];

const allPrizeText = [
    "#23 $20 Takashimaya Gift Voucher",
    "#22 $20 Takashimaya Gift Voucher",
    "#21 $20 Takashimaya Gift Voucher",
    "#20 $20 Takashimaya Gift Voucher",
    "#19 $20 Takashimaya Gift Voucher",
    "#18 $20 Takashimaya Gift Voucher",
    "#17 $20 Takashimaya Gift Voucher",
    "#16 $20 Takashimaya Gift Voucher",
    "#15 $20 Takashimaya Gift Voucher",
    "#14 $20 Takashimaya Gift Voucher",
    "#13 Xiaomi Mi Wireless Power Bank (10000mAh)",
    "#12 Xiaomi Mi Wireless Power Bank (10000mAh)",
    "#11 Xiaomi Mi Wireless Power Bank (10000mAh)",
    "#10 Xiaomi Mi Wireless Power Bank (10000mAh)",
    "#9 Xiaomi Mi Wireless Power Bank (10000mAh)",
    "#8 Xiaomi Mi Wireless Power Bank (10000mAh)",
    "#7 Xiaomi Mi Wireless Power Bank (10000mAh)",
    "#6 Xiaomi Mi Wireless Power Bank (10000mAh)",
    "#5 Xiaomi Mi Wireless Power Bank (10000mAh)",
    "#4 Xiaomi Mi Wireless Power Bank (10000mAh)",
    "#3 Nespresso Essenza Mini Pure White",
    "#2 DJI Osmo Action 4 Standard",
    "#1 Dyson Supersonic™ Hair Dryer"
];

showSlides();

function showSlides() {
    let slidesLeft = document.querySelectorAll('.slide');

    slideIndex++;

    if (slideIndex > totalSlides) {
        slideIndex = 1;
    }
    slidesLeft[0].style.display = 'block';
    slidesLeft[0].src = allImages[slideIndex - 1];
}

const names = [];
const winners = [
    // {
    //     "item": "",
    //     "name": ""
    // }
]; // load from localstorage immediately

const winnerList = document.getElementById('winnerList');
const rouletteContent = document.getElementById('rouletteContent');
const prevButton = document.getElementById('previousButton');
const nextButton = document.getElementById('nextButton');
const drawButton = document.getElementById('drawButton');

function readSingleFile(evt) {
    var f = evt.target.files[0];
    if (f) {
        var r = new FileReader();
        r.onload = function (e) {
            var contents = e.target.result;

            var lines = contents.split("\n");
            for (var i = 0; i < lines.length; i++) {
                if (lines[i].split(",").join("").trim() !== "") {
                    names.push(lines[i].split(",").join("").trim());
                }
            }
        }
        r.readAsText(f);
    }
}

// function updateNameList() {
//     const nameList = document.getElementById('nameList');
//     nameList.innerHTML = '<h3>Participants:</h3>' + names.map(name => `<p>${name}</p>`).join('');
// }

function updateWinnerList() {
    winnerList.innerHTML = winners.map(winner => `<p>${winner.item}: <b>${winner.name}</b></p>`).join('');
}

function deleteName(nameInput) { // used to remove winner after drawing
    const name = nameInput.trim();
    const index = names.indexOf(name);
    if (index > -1) { // If the name is found
        names.splice(index, 1);
    }
}

function drawWinner() { // index.html
    confetti.stop() // confetti.js
    // stop();
    if (names.length === 0) {
        alert('No participants to draw from!');
        return;
    }

    // disable buttons while spinning
    prevButton.disabled = true;
    nextButton.disabled = true;
    drawButton.disabled = true;

    const itemHeight = 150; // Adjust based on the height of each name item
    const totalHeight = names.length * itemHeight;

    rouletteContent.innerHTML = names.concat( // concat x6 to simulate endless scroll
        names, names, names, names, names
    ).map(name => `<p style="font-size:${name.length > 18 ? 60 - name.length : 50}px">${name}</p>`).join('');
    const spinDuration = 4; // Duration of the spin animation in seconds

    // Randomly select a stopping index
    const randomIndex = Math.floor(Math.random() * names.length);
    const randomOffset = randomIndex * itemHeight;

    // Total height to ensure the picker scrolls through the full list
    const randomHeight = Math.floor(Math.random() * 6); // randomize which name list to use as its concated 6 times
    const totalScrollHeight = (totalHeight * randomHeight) + randomOffset;
    console.log('🚀 ~ drawWinner ~ totalScrollHeight:', totalScrollHeight);

    // Set the transition and scroll the picker
    rouletteContent.style.transition = `transform ${spinDuration}s cubic-bezier(0.25, 0.1, 0.25, 1.0)`;
    rouletteContent.style.transform = `translateY(-${totalScrollHeight}px)`;

    // Calculate and display the final name after the scrolling ends
    setTimeout(() => {
        // Calculate the final visible index
        const finalIndex = Math.floor(totalScrollHeight / itemHeight) % names.length;
        console.log(`Selected Name: ${names[finalIndex]}`);
        winners.push({ item: allPrizeText[slideIndex - 1], name: names[finalIndex]})

        // update and delete name from list
        updateWinnerList();
        deleteName(names[finalIndex]);

        next(); // go to next item

        // re-enable buttons
        prevButton.disabled = false;
        nextButton.disabled = false;
        drawButton.disabled = false;
    }, spinDuration * 1000);
}

// Function to create and append confetti elements
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const numConfetti = 100; // Number of confetti pieces

    for (let i = 0; i < numConfetti; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.style.left = `${Math.random() * 100}vw`;
        confettiPiece.style.top = `-${Math.random() * 30}vh`;
        confettiPiece.style.animationDuration = `${Math.random() * 5 + 3}s`; // Random duration between 3s and 8s
        confettiPiece.style.animationDelay = `${Math.random() * 5}s`; // Random delay
        confettiContainer.appendChild(confettiPiece);
    }
}

createConfetti(); // Initialize confetti effect

// function toggleNameList() {
//     const nameList = document.getElementById('nameList');
//     if (nameList.style.display === 'none') {
//         nameList.style.display = 'block';
//     } else {
//         nameList.style.display = 'none';
//     }
// }

// const start = () => {
//     //setTimeout(function() {
//     const confettiContainer = document.getElementById('confetti');
//     confettiContainer.style.display = "none";
//     confetti.start()
//     setTimeout(function () {
//         stop();
//     }, 10000);
// };

// const stop = () => {
//     setTimeout(function () {
//         const confettiContainer = document.getElementById('confetti');
//         confettiContainer.style.display = "block";
//         confetti.stop()
//     }, 5000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
// };

document.getElementById('fileinput').addEventListener('change', readSingleFile);

function previous() { // prev prize button
    slideIndex--;
    if (slideIndex < 1) {
        slideIndex = totalSlides;
    }
    document.getElementById('slidesLeft').src = allImages[slideIndex - 1];
    document.getElementById('prize_desc').innerHTML = allPrizeText[slideIndex - 1];
}

function next() { // next prize button
    slideIndex++;
    if (slideIndex > totalSlides) {
        slideIndex = 1;
    }
    document.getElementById('slidesLeft').src = allImages[slideIndex - 1];
    document.getElementById('prize_desc').innerHTML = allPrizeText[slideIndex - 1];

}