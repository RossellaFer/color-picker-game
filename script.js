let numSquares = 6;
let colors = [];
let pickedColor;

let squares = document.querySelectorAll(".block");
let pickedColorDisplay = document.querySelector("#pickedColor");
let resultBox = document.getElementById("result");
let h1 = document.querySelector("h1");
let resetButton = document.getElementById("resetGame");
let modeButtons = document.querySelectorAll(".mode");
let masterMode = document.getElementById("#master");


init();

function init() {
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons() {
	for (let i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			modeButtons[2].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3 : this.textContent === "Hard" ? numSquares = 6 : numSquares = 12;
			if (this.textContent === "Master") {
				for (let i = 0; i < squares.length; i++){
					squares[i].classList.add("mastermode");
				}
			}
			else if (this.textContent === "Easy" || this.textContent === "Hard") {
				for (let i = 0; i < squares.length; i++){
					squares[i].classList.remove("mastermode");
				}
			}
			reset();
		});
	}
}

function setupSquares() {
	for (let i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", function(){
			let clickedColor = this.style.backgroundColor;
			if (clickedColor === pickedColor) {
				resultBox.textContent = "Correct!";
				changeColors(pickedColor);
				resetButton.textContent = "Play again?";
				h1.style.backgroundColor = pickedColor;
			
			}
			else {
				this.style.backgroundColor = "#808080";
				resultBox.textContent = "Try Again";
			}
		});
	}
}

function reset() {
	colors = generateColors(numSquares);
	pickedColor = pickColor();
	pickedColorDisplay.textContent = pickedColor;
	resultBox.textContent = "";
	resetButton.textContent = "New Colors";
	h1.style.backgroundColor = "#03a678";
	for (let i = 0; i < squares.length; i++) {
		if (colors[i]) {
				squares[i].style.display = "block";
				squares[i].style.backgroundColor = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
	}	
}

resetButton.addEventListener("click", function(){
	reset();
});


function changeColors(color) {
	for (let i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	let random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateColors(num) {
	let array = [];
	for (let i = 0; i < num; i++) {
		array.push(randomColor());
	}
	return array;
}

function randomColor() {
	let green = Math.floor(Math.random() * 256);
	let red = Math.floor(Math.random() * 256);
	let blue = Math.floor(Math.random() * 256);
	return "rgb(" + red + ", " + green + ", " + blue + ")";
}
