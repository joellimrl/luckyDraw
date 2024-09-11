let slideIndex = 0;

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
    "$20 Takashimaya Gift Voucher",
    "$20 Takashimaya Gift Voucher",
    "$20 Takashimaya Gift Voucher",
    "$20 Takashimaya Gift Voucher",
    "$20 Takashimaya Gift Voucher",
    "$20 Takashimaya Gift Voucher",
    "$20 Takashimaya Gift Voucher",
    "$20 Takashimaya Gift Voucher",
    "$20 Takashimaya Gift Voucher",
    "$20 Takashimaya Gift Voucher",
    "Xiaomi Mi Wireless Power Bank",
    "Xiaomi Mi Wireless Power Bank",
    "Xiaomi Mi Wireless Power Bank",
    "Xiaomi Mi Wireless Power Bank",
    "Xiaomi Mi Wireless Power Bank",
    "Xiaomi Mi Wireless Power Bank",
    "Xiaomi Mi Wireless Power Bank",
    "Xiaomi Mi Wireless Power Bank",
    "Xiaomi Mi Wireless Power Bank",
    "Xiaomi Mi Wireless Power Bank",
    "Nespresso Essenza Mini",
    "DJI Osmo Action 4 Standard",
    "Dyson Supersonic™ Hair Dryer"
];

const totalSlides = allPrizeText.length;
const names = [];
const winners = [];

const prizeHeader = document.getElementById('prizeHeader');
const winnerList = document.getElementById('winnerList');
const rouletteContent = document.getElementById('rouletteContent');
const prevButton = document.getElementById('previousButton');
const nextButton = document.getElementById('nextButton');
const drawButton = document.getElementById('drawButton');
const slides = document.getElementById('slides');
const prizeDesc = document.getElementById('prize_desc');
const confettiContainer = document.getElementById('confetti');
const fileInput = document.getElementById('fileinput');

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
            rouletteContent.innerHTML = `<p style="font-size:50px">${names[0]}</p>`; // show first name
        }
        r.readAsText(f);
    }
}

fileInput.addEventListener('change', readSingleFile);

function updateWinnerList() {
    let winnerDisplay = winners;
    if (winners.length > 15) {
        winnerDisplay = winners.slice(winners.length - 15);
    }
    winnerList.innerHTML = `<table><tr><th>#</th><th>Prize</th><th>Name</th></tr>${winnerDisplay.map(winner => `<tr><td>${winner.index}</td><td>${winner.item}</td><td><b>${winner.name}</b></td></tr>`).join('')}</table>`;
}

function deleteName(nameInput) { // used to remove winner after drawing
    const name = nameInput.trim();
    const index = names.indexOf(name);
    if (index > -1) { // If the name is found
        names.splice(index, 1);
    }
}

let prevHeight = 0;
function drawWinner() { // draw winner button
    confetti.stop() // stop confetti from prev draw
    if (names.length === 0) {
        alert('No participants to draw from!');
        return;
    }

    // disable buttons while spinning
    prevButton.disabled = true;
    nextButton.disabled = true;
    drawButton.disabled = true;
    // fileInput.disabled = true; // disable changing file after spinning
    fileInput.style = "display:none";

    const itemHeight = 150; // Adjust based on the height of each name item
    const totalHeight = names.length * itemHeight;

    rouletteContent.innerHTML = names.concat( // concat x6 to simulate endless scroll
        names, names, names, names, names
    ).map(name => `<p style="font-size:${name.length > 18 ? 60 - name.length : 50}px">${name}</p>`).join('');
    const spinDuration = 4; // Duration of the spin animation in seconds

    // Randomly select a stopping index
    const randomIndex = Math.floor(Math.random() * names.length);
    const randomOffset = randomIndex * itemHeight; // This selects the actual name

    // Total height to ensure the picker scrolls through the full list
    let randomHeight = Math.floor(Math.random() * 6); // randomize which name list to use as its concated 6 times, affects rotations
    if (prevHeight && randomHeight === prevHeight) { // ensure the rotation will go through at least 1 full name list
        randomHeight = Math.abs(randomHeight - 3);
    }
    const totalScrollHeight = (totalHeight * randomHeight) + randomOffset;
    prevHeight = randomHeight; // store prev height so the rotation will go through at least 1 full name list

    // Set the transition and scroll the picker
    rouletteContent.style.transition = `transform ${spinDuration}s cubic-bezier(0.25, 0.1, 0.25, 1.0)`;
    rouletteContent.style.transform = `translateY(-${totalScrollHeight}px)`;

    // Calculate and display the final name after the scrolling ends
    setTimeout(() => {
        // Display winner confetti
        confettiContainer.style.display = "none";
        confetti.start();
        setTimeout(function () {
            confettiContainer.style.display = "block";
            confetti.stop()
        }, 5000);

        // Calculate the final visible index
        const finalIndex = Math.floor(totalScrollHeight / itemHeight) % names.length;
        console.log(`Selected Name: ${names[finalIndex]}`);
        winners.push({ index: totalSlides - slideIndex + 1, item: allPrizeText[slideIndex - 1], name: names[finalIndex]})

        // update and delete name from list
        updateWinnerList();
        deleteName(names[finalIndex]);

        // re-enable buttons
        prevButton.disabled = false;
        nextButton.disabled = false;
        drawButton.disabled = false;
    }, spinDuration * 1000);
}

function updateHtml() {
    slides.src = allImages[slideIndex - 1];
    slides.classList.remove('slide'); // retrigger animation
    void slides.offsetWidth;
    slides.classList.add('slide');
    prizeDesc.innerHTML = allPrizeText[slideIndex - 1];
    prizeHeader.innerHTML = `Prize #${totalSlides - slideIndex + 1}`;
}

function previous() { // prev prize button
    slideIndex--;
    if (slideIndex < 1) {
        slideIndex = totalSlides;
    }
    updateHtml();
}

function next() { // next prize button
    slideIndex++;
    if (slideIndex > totalSlides) {
        slideIndex = 1;
    }
    updateHtml();
}

// Function to create and append confetti elements
function createConfetti() {
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

next(); // init prize list
createConfetti(); // Initialize confetti effect
