let numbersSection = document.querySelector(".numbersSection");
let playersSection = document.querySelector(".playersSection");
let nextButton = document.querySelector("#nextButton");
let fullScreen = document.querySelector("#fullScreen");
let fullScreen2 = document.querySelector("#fullScreen2");
let playerSize = document.querySelector("#playerSize");
let playerSize2 = document.querySelector("#playerSize2");
let exitIcon = document.querySelector("#exitIcon");
let settingsMenu = document.querySelector(".settingsMenu");
let settingsIcon = document.querySelector("#settingsIcon");
let scorePicker = document.querySelector(".scorePicker");
var elem = document.documentElement;

let NOP = localStorage.PICKED_PLAYERS;
let numberOfPlayers = 4;
if (NOP) {
	numberOfPlayers = NOP;
}

let PS = localStorage.PICKED_SCORE;
let playingTo = 501;
if (PS) {
	playingTo = PS;
}

let click = new Audio("./Sounds/click.mp3");
let click2 = new Audio("./Sounds/click2.mp3");

let SHOW_NUMBERS = () => {
	let counter = 1;
	for (let i = 0; i < 20; i++) {
		let newDiv = document.createElement("div");
		newDiv.classList.add("numbers");
		let newDiv2 = document.createElement("div");
		newDiv2.classList.add("numbersCentered");
		newDiv2.innerText = counter;
		newDiv.appendChild(newDiv2);
		counter++;
		numbersSection.appendChild(newDiv);
		if (i === 0) {
			newDiv.style.borderTopLeftRadius = "20px";
		} else if (i === 4) {
			newDiv.style.borderTopRightRadius = "20px";
		}
	}
};
SHOW_NUMBERS();

let SHOW_PLAYERS = () => {
	let counter = 1;
	for (let i = 0; i < numberOfPlayers; i++) {
		let playersDiv = document.createElement("div");
		playersDiv.classList.add("players");
		playersDiv.style.marginBottom = "10px";
		playersDiv.id = `Player${counter}lol`;
		playersDiv.innerText = `PLAYER ${counter}`;
		let scoreDiv = document.createElement("div");
		scoreDiv.innerText = playingTo;
		scoreDiv.classList.add("scoreDiv");
		scoreDiv.id = `ScoreP${counter}`;
		playersDiv.appendChild(scoreDiv);
		counter++;
		playersSection.appendChild(playersDiv);
	}
};
SHOW_PLAYERS();

let colorsDiv = ["red", "blue", "lime", "yellow", "magenta", "cyan"];
for (let i = 0; i < numberOfPlayers; i++) {
	playersSection.childNodes[i].style.color = colorsDiv[i];
	playersSection.childNodes[i].style.textShadow = `0px 0px 50px ${colorsDiv[i]}`;
}

let scoreColorize = (color) => {
	playersSection.childNodes.forEach((el) => {
		el.childNodes[1].style.border = "2px solid white";
		el.childNodes[1].style.color = "white";
		el.childNodes[1].style.boxShadow = "none";
	});
	playersSection.childNodes[activeCounter - 1].childNodes[1].style.border = `5px solid ${color}`;
	playersSection.childNodes[activeCounter - 1].childNodes[1].style.color = color;
	playersSection.childNodes[activeCounter - 1].childNodes[1].style.boxShadow = `0px 0px 20px 1px ${color}`;
};

let activeCounter = 1;
let activeScore = 1;
let activePlayerFunc = () => {
	console.clear();
	if (activeCounter > numberOfPlayers) {
		activeCounter = 1;
	}
	console.log("%cMade especially for mobile devices", "color:cyan");
	console.log("%cActive player turn:", "color:orange", `PLAYER ${activeCounter}`);
	if (activeCounter === 1) {
		scoreColorize("red");
	} else if (activeCounter === 2) {
		scoreColorize("blue");
	} else if (activeCounter === 3) {
		scoreColorize("lime");
	} else if (activeCounter === 4) {
		scoreColorize("yellow");
	}
};
activePlayerFunc();

let nextPlayer = () => {
	activeCounter++;
	activePlayerFunc();
};

numbersSection.addEventListener("click", (e) => {
	if (e.target.tagName === "DIV") {
		click2.currentTime = 0;
		click2.play();
		let pickedNum = +e.target.innerText;
		playersSection.childNodes[activeCounter - 1].childNodes[1].innerText -= pickedNum;
	}
});

nextButton.addEventListener("click", () => {
	nextPlayer();
});

function openFullscreen() {
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.webkitRequestFullscreen) {
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) {
		elem.msRequestFullscreen();
	}
}

fullScreen.addEventListener("click", () => {
	openFullscreen();
});

fullScreen2.addEventListener("click", () => {
	openFullscreen();
	settingsMenu.classList.remove("expanded");
	settingsMenu.classList.add("shrinked");
});

playerSize.addEventListener("click", (e) => {
	if (e.target.tagName === "BUTTON") {
		let pickedPlayers = e.target.innerText[0];
		localStorage.setItem("PICKED_PLAYERS", pickedPlayers);
		setTimeout(() => {
			location.reload();
		}, 500);
	}
});

playerSize2.addEventListener("click", (e) => {
	if (e.target.tagName === "BUTTON") {
		let pickedPlayers = e.target.innerText[0];
		localStorage.setItem("PICKED_PLAYERS", pickedPlayers);
	}
});

scorePicker.addEventListener("click", (e) => {
	if (e.target.tagName === "BUTTON") {
		let pickedScore = `${e.target.innerText[0]}01`;
		localStorage.setItem("PICKED_SCORE", pickedScore);
	}
});

exitIcon.addEventListener("click", () => {
	settingsMenu.classList.remove("expanded");
	settingsMenu.classList.add("shrinked");
});

exitIcon2.addEventListener("click", () => {
	settingsMenu.classList.remove("expanded");
	settingsMenu.classList.add("shrinked");
	setTimeout(() => {
		location.reload();
	}, 500);
});

settingsIcon.addEventListener("click", (e) => {
	e.stopPropagation();
	click.play();
	settingsMenu.classList.remove("shrinked");
	settingsMenu.classList.add("expanded");
});

let allButtons = document.querySelectorAll("button");
allButtons.forEach((el) => {
	el.addEventListener("click", () => {
		click.currentTime = 0;
		click.play();
	});
});
