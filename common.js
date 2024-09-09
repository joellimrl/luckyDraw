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
    "#13 $20 Takashimaya Gift Voucher",
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

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const names = [];
const winners = [
    // {
    //     "item": "",
    //     "name": ""
    // }
]; // load from localstorage immediately
// const cookie = { names, winners };

console.log(getCookie('participants'))
console.log(getCookie('winners'))
// console.log(localStorage.getItem('participants'));
// console.log(localStorage.getItem('winners'));

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
            updateNameList();
            // localStorage.setItem('participants', JSON.stringify(names));
            // localStorage.setItem('winners', JSON.stringify(winners));
            setCookie('participants', JSON.stringify(names), 7);
            setCookie('winners', JSON.stringify(winners), 7);
        }
        r.readAsText(f);
        // console.log(localStorage.getItem('participants'));
    } else {
        alert("Failed to load file");
    }
}

function updateNameList() {
    const nameList = document.getElementById('nameList');
    nameList.innerHTML = '<h3>Participants:</h3>' + names.map(name => `<p>${name}</p>`).join('');
}

function deleteName(nameInput) { // used to remove winner after drawing
    // const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim(); // Get the input value and trim any extra spaces

    if (name) {
        // Find the index of the name in the names array
        const index = names.indexOf(name);
        if (index > -1) { // If the name is found
            winners.push({ item: allPrizeText[slideIndex], name: names[index] });
            // localStorage.setItem('winners', JSON.stringify(winners));
            setCookie('winners', JSON.stringify(winners), 7);

            names.splice(index, 1);
            updateNameList(); // Update the displayed name list
            // localStorage.setItem('participants', JSON.stringify(names))
            setCookie('participants', JSON.stringify(names), 7);

            document.getElementById('nameInput').value = "";
        } else {
            alert('Name not found in the list!');
        }
    } else {
        alert('Please enter a name to delete!');
    }
    // console.log(localStorage.getItem('participants'));
    // console.log(localStorage.getItem('winners'));
    console.log(getCookie('participants'))
    console.log(getCookie('winners'))
}


var play_effect;
var win_effect;
let prevPosition = 0;
function drawWinner() { // index.html
    confetti.stop() // confetti.js
    stop();
    if (play_effect) {
        play_effect.pause()
    }
    play_effect = null;
    if (win_effect) {
        win_effect.pause()
    }
    win_effect = null;
    if (names.length === 0) {
        alert('No participants to draw from!');
        return;
    }

    play_effect = new Audio('scrolling_effect.mp3')
    play_effect.play()

    const rouletteContent = document.getElementById('rouletteContent');
    rouletteContent.innerHTML = names.concat(
        names, names, names, names, names,
        names, names, names, names, names,
        names, names, names, names, names,
        names, names, names, names, names,
        names, names, names, names, names
    ).map(name => `<p>${name}</p>`).join('');
    rouletteContent.style.top = '0';
    rouletteContent.style.animation = 'none';
    
    let finalPosition = 0;
    setTimeout(() => {
        const totalNames = names.length * 25; // Total number of names in the repeated list
        const winnerIndex = Math.floor(Math.random() * names.length);
        const offset = winnerIndex * 150; // 100px is the height of each name in the roulette
        do {
            finalPosition = offset + (Math.floor(Math.random() * names.length) * 150); // Randomize the final position within the repeated list
            //alert("finalPosition"+finalPosition)
            //alert("prevPosition"+prevPosition)
            //alert(finalPosition-prevPosition)
            } while (Math.abs(finalPosition - prevPosition)< 10000);
        //} while (false);

        rouletteContent.style.transition = 'top 8s cubic-bezier(0.25, 0.1, 0.25, 1.0)';
        rouletteContent.style.top = `-${finalPosition}px`;

        prevPosition = finalPosition;

        setTimeout(() => {
            win_effect = new Audio('winner_effect.mp3')
            win_effect.play()
            start();
        }, 8000); // Wait for the animation to complete
        deleteName(names[winnerIndex])
    }, 100);
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

function toggleNameList() {
    const nameList = document.getElementById('nameList');
    if (nameList.style.display === 'none') {
        nameList.style.display = 'block';
    } else {
        nameList.style.display = 'none';
    }
}

const start = () => {
    //setTimeout(function() {
    const confettiContainer = document.getElementById('confetti');
    confettiContainer.style.display = "none";
    confetti.start()
    setTimeout(function () {
        stop();
    }, 10000);
};

const stop = () => {
    setTimeout(function () {
        const confettiContainer = document.getElementById('confetti');
        confettiContainer.style.display = "block";
        confetti.stop()
    }, 5000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
};

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