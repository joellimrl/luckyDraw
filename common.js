let slideIndex = 0;

const totalSlides = 29;
const allImages = [
    "image/1.png", //29
    "image/1.png", //28
    "image/26.png", //27 
    "image/26.png", //26 
    "image/25.png", //25
    "image/1.png", //23
    "image/1.png", //22
    "image/1.png", //21
    "image/1.png", //20
    "image/19.png", //19
    "image/2.png", //18
    "image/17.png", //17 
    "image/3.png", //16
    "image/15.png", //15 
    "image/14.png", //14
    "image/14.png", //13
    "image/4.png", //12
    "image/27.png", //12 jo malone candle
    "image/5.png", //11
    "image/6.png", //10
    "image/16.png", //9
    "image/20.png", //8
    "image/9.png", //7
    "image/7.png", //6
    "image/8.png", //5
    "image/12.png", //4
    "image/11.png", //3
    "image/10.png", //2
    "image/13.png"  //1
];

const allPrizeText = [
    "KrisPay Miles 10,200",
    "KrisPay Miles 10,200",
    "#27 Cornell Kettle 1.7L ",
    "#26 Cornell Kettle 1.7L",
    "#25 Bodum French Press Coffee Maker",
    "#24 Kris Pay Miles 7,500",
    "#23 Kris Pay Miles 7,500",
    "#22 Kris Pay Miles 7,500",
    "#21 Kris Pay Miles 7,500",
    "#20 Eu Yan Seng: Birds' Nest (assorted)",
    "#19 Aeropress Coffee Maker",
    "#18 Grand Copthorne Weekday Dinner Buffet for 2",
    "#17 JBL CLIP3 Waterproof Speaker",
    "#16 Nestle IONA 12inch Stand Fan",
    "#15 Happycall 28cm Die Cast Party Wok + Steamer",
    "#14 Happycall 28cm Die Cast Party Wok + Steamer",
    "#13 Apple Airtag (4 pieces)",
    "#12 Jo Malone Candle",
    "#11 Jabra Elite 4 Active (Navy)",
    "#10 Sony WH-CH720N Headphones (Black)",
    "#9 Happycall 26cm Deep Wok Pan + Lid",
    "#8 Dior Prestige Le Micro Serum (Advanced)",
    "#7 Sterra Sun Dehumidifier",
    "#6 Nintendo Switch (OLED)",
    "#5 iPad<br>(Sponsored by FPT)",
    "#4 Dior Prestige Set",
    "#3 Insta360 X4 8K Action Camera<br>(Sponsored by Amadeus)",
    "#2 Dyson V12 Origin<br>(Sponsored by Checkpoint)",
    "#1 Bang & Olufsen Beoplay HX<br>(Sponsored by TCS)"
];

showSlides();

function showSlides() {
    let slidesLeft = document.querySelectorAll('.slide');
    let slidesRight = document.querySelectorAll('.slide');

    //slidesLeft.forEach(slide => slide.style.display = 'none');
    //slidesRight.forEach(slide => slide.style.display = 'none');

    slideIndex++;

    if (slideIndex > totalSlides) {
        slideIndex = 1;
    }
    // Check if the slideIndex exceeds the total number of slides on either side


    // Alternate between left and right slides
    // if (slideIndex % 2 === 0) {
    slidesLeft[0].style.display = 'block';
    //slidesRight[0].style.display = 'block';
    slidesLeft[0].src = allImages[slideIndex - 1];
    // } else {
    //     //slidesLeft[0].style.display = 'block';
    //     slidesRight[0].style.display = 'block';
    //     slidesRight[0].src = allImages[slideIndex - 1];
    // }

    //setTimeout(showSlides, 5000); // Change image every 5 seconds
}

// function showSlides() {
//     let slidesLeft = document.querySelectorAll('.slideshow-left .slide');
//     let slidesRight = document.querySelectorAll('.slideshow-right .slide');

//     slidesLeft.forEach(slide => slide.style.display = 'none');
//     slidesRight.forEach(slide => slide.style.display = 'none');

//     slideIndex++;
//     if (slideIndex > slidesLeft.length) { slideIndex = 1; }

//     slidesLeft[slideIndex - 1].style.display = 'block';
//     slidesRight[slideIndex - 1].style.display = 'block';

//     setTimeout(showSlides, 5000); // Change image every 5 seconds
// }

let names = [];

const firstNames = ["John", "Jane", "Alex", "Emily", "Chris", "Katie", "Michael", "Sarah", "David", "Laura"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Martinez", "Hernandez"];

function getRandomName() {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
}

function deleteName() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim(); // Get the input value and trim any extra spaces

    if (name) {
        // Find the index of the name in the names array
        const index = names.indexOf(name);

        if (index > -1) { // If the name is found

            let newarr = names.filter(a => a !== name)
            names = newarr;
            //names.splice(index, 1); // Remove the name from the array
            //nameInput.value = ''; // Clear the input field
            //alert(names);
            updateNameList(); // Update the displayed name list
            alert("!!! Winner removed !!!");
            document.getElementById('nameInput').value = "";
        } else {
            alert('Name not found in the list!');
        }
    } else {
        alert('Please enter a name to delete!');
    }
}

function addName() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();
    if (name) {
        names.push(name);
        nameInput.value = '';
        updateNameList();
    }
}

function addRandomNames() {
    for (let i = 0; i < 500; i++) {
        names.push(getRandomName());
    }
    updateNameList();
}

function updateNameList() {
    const nameList = document.getElementById('nameList');
    nameList.innerHTML = '<h3>Participants:</h3>' + names.map(name => `<p>${name}</p>`).join('');
}
var play_effect;
var win_effect;
let prevPosition = 0;
function drawWinner() {
    confetti.stop()
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
    }, 100);
}

function readSingleFile(evt) {
    names = [];
    var f = evt.target.files[0];
    if (f) {
        var r = new FileReader();
        r.onload = function (e) {
            var contents = e.target.result;
            //document.write("File Uploaded! <br />" + "name: " + f.name + "<br />" + "content: " + contents + "<br />" + "type: " + f.type + "<br />" + "size: " + f.size + " bytes <br />");

            var lines = contents.split("\n"), output = [];
            for (var i = 0; i < lines.length; i++) {
                names.push(lines[i].split(",").join("").trim());
                updateNameList();
                //output.push("<tr><td>" + lines[i].split(",").join("</td><td>") + "</td></tr>");
            }
            //output = "<table>" + output.join("") + "</table>";
            //document.write(output);
        }
        r.readAsText(f);
        //document.write(output);
    } else {
        alert("Failed to load file");
    }

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

function previous() {
    slideIndex--;
    if (slideIndex < 1) {
        slideIndex = 29;
    }

    document.getElementById('slidesLeft').src = allImages[slideIndex - 1];
    document.getElementById('prize_desc').innerHTML = allPrizeText[slideIndex - 1];
}

function next() {

    slideIndex++;
    if (slideIndex > totalSlides) {
        slideIndex = 1;
    }

    document.getElementById('slidesLeft').src = allImages[slideIndex - 1];
    document.getElementById('prize_desc').innerHTML = allPrizeText[slideIndex - 1];

}