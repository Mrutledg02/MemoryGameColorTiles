const tilesContainer = document.querySelector(".tiles");
const colors = ["#004178", "#f9e652", "#037848", "#e1077e", "#ffc8c6", "#800020", "#ffa737", "#632e20"];
const colorsPicklist = [...colors, ...colors];
const tileCount = colorsPicklist.length;

// Create three variables to indicate the current state of the game
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

function buildTile(color) {
	const element = document.createElement("div");

	element.classList.add("tile");
	element.setAttribute("data-color", color);
	element.setAttribute("data-revealed", "false");  //When a tile is first created, we want to say that it's not revealed.

	element.addEventListener("click", () => {
		const revealed = element.getAttribute("data-revealed");

		if (awaitingEndOfMove || revealed === "true" || element == activeTile) {
			return;
		}

		// Reveal this color
		element.style.backgroundColor = color;

		if (!activeTile) {
			activeTile = element;
			return;
		}

		const colorToMatch = activeTile.getAttribute("data-color");
        //If that is the case, both tiles match.
		if (colorToMatch === color) {
			element.setAttribute("data-revealed", "true"); //We're flagging as these being revealed.  We can check if it is true or not.
			activeTile.setAttribute("data-revealed", "true");

			activeTile = null;  //If they do, we'll clear out the game.
			awaitingEndOfMove = false;
			revealedCount += 2;  //Check is there are two cards revealed

			if (revealedCount === tileCount) {  //If the revealedCount is equal to the count, the user is done, and we should see the alert.
				alert("You win! Refresh to start again.");
			}
			return;
		}

        //Assuming the user picked the incorrect tile, we want to prevent any other tiles from being clicked on. 
		awaitingEndOfMove = true;

        //After one second, clear those tiles once again.
		setTimeout(() => {
            element.style.backgroundColor = null;  //This is the tile we just clicked on.
			activeTile.style.backgroundColor = null;  //This is the active tile

			awaitingEndOfMove = false;  //Start again
			activeTile = null; 
		}, 1000);
	});

	return element;
}

// Build up tiles
for (let i = 0; i < tileCount; i++) {
	const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
	const color = colorsPicklist[randomIndex];
	const tile = buildTile(color);

	colorsPicklist.splice(randomIndex, 1);
	tilesContainer.appendChild(tile);  //Add this element to the body tag in HTML.
}