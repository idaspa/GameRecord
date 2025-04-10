import Game from "./Models/gameClass.mjs";

let games = [];

function saveGame(game) {
    const gameTitle = game.title;
    if (!gameTitle) {

        return;
    }
    localStorage.setItem(gameTitle, JSON.stringify(game));
}

function getAllGames() {
    games = [];
    for (let i = 0; i < localStorage.length; i++) {
        const gameTitle = localStorage.key(i);
        const gameData = localStorage.getItem(gameTitle);

        const gameObj = JSON.parse(gameData);
        const game = new Game(
            gameObj.title,
            gameObj.designer,
            gameObj.artist,
            gameObj.publisher,
            gameObj.year,
            gameObj.players,
            gameObj.time,
            gameObj.difficulty,
            gameObj.url,
            gameObj.playCount,
            gameObj.personalRating
        );
        games.push(game);
    }
    return games;
}


function importFromJson(json) {
    const gamesRetrival = JSON.parse(json);
    gamesRetrival.forEach(gameData => {
        const game = new Game(gameData.title, gameData.designer, gameData.artist, gameData.publisher,
            gameData.year, gameData.players, gameData.time, gameData.difficulty,
            gameData.url, gameData.playCount, gameData.personalRating);
        saveGame(game);
    });
}

document.getElementById("importSource").addEventListener("change", event => {
    const file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = function (event) {
        const fileContent = event.target.result;
        importFromJson(fileContent);
        visualRecord();
    };

    reader.onerror = function (event) {
        console.error("Error with reading file: ", event.target.error);
    };

    reader.readAsText(file);
});

function visualRecord() {
    const gameList = document.getElementById("gamesList");
    const allgames = games;

    gameList.innerHTML = allgames.map(game => `
        <div class="gameItem" data-title="${game.title}">
            <h2>${game.title}</h2>
            <p>Year: ${game.year}</p>
            <p>Players: ${game.players}</p>
            <p>Time: ${game.time}</p>
            <p>Difficulty: ${game.difficulty}</p>
            <p>Designer: ${game.designer}</p>
            <p>Artist: ${game.artist}</p>
            <p>Publisher: ${game.publisher}</p>
            <p>URL: <a href="${game.url}" target="_blank">${game.url}</a></p>
            <p>Play Count: <input type="number" class="playCountInput" min="0" value="${game.playCount}" data-title="${game.title}"></p>
            <p>Rating: <input type="range" min="0" max="10" value="${game.personalRating}" class="ratingSlider" data-title="${game.title}"> <span class="ratingValue">${game.personalRating}</span></p>
            <p><button class="deleteButton">Delete</button></p>
        </div>
    `).join('');

    eventListeners();
}

function eventListeners() {
    document.querySelectorAll('.playCountInput').forEach(input => {
        input.addEventListener('input', (event) => {

            const title = event.target.dataset.title;
            const game = games.find(g => g.title === title);

            if (game) {
                game.playCount = parseInt(event.target.value);
                saveGame(game);
            }
        });
    });

    document.querySelectorAll('.deleteButton').forEach(deleteButton => {
        deleteButton.addEventListener("click", (event) => {
            const gameEntryTitle = event.target.parentElement.parentElement.getAttribute("data-title");
            localStorage.removeItem(gameEntryTitle);

            visualRecord();
        });
    });

    document.querySelectorAll('.ratingSlider').forEach(slider => {
        slider.addEventListener('input', (event) => {
            const title = event.target.dataset.title;
            const game = games.find(g => g.title === title);
            if (game) {
                game.personalRating = parseInt(event.target.value);
                saveGame(game);
                event.target.parentElement.querySelector("span").textContent = event.target.value;
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    getAllGames();
    visualRecord();
});



document.getElementById("addGame").onclick = function () {
    let newGame = {
        title: document.getElementById("newGameTitle").value,
        designer: document.getElementById("designer").value,
        artist: document.getElementById("artist").value,
        publisher: document.getElementById("publisher").value,
        year: document.getElementById("year").value,
        time: document.getElementById("time"),
        difficulty: document.getElementById("difficulty").value,
        url: document.getElementById("url").value,
        playCount: document.getElementById("playCount").value,
        personalRating: document.getElementById("personalRating").value
    };
};

document.getElementById("sortPlayerCount").onclick = function () {
    console.log(games);
    sortBy(games, "playCount"); console.log(games);
    visualRecord();
};

document.getElementById("sortPersonalRating").onclick = function () {
    sortBy(games, "personalRating");
    visualRecord();
};

document.getElementById("sortPlayer").onclick = function () {
    sortBy(games, "players");
    visualRecord();
};

document.getElementById("sortDifficulty").onclick = function () {
    sortBy(games, "difficulty");
    visualRecord();
};


function sortBy(array, propertyName) {
    array.sort(function (a, b) {
        if (a[propertyName] < b[propertyName])
            return -1;
        else
            return 1;
    });
}

