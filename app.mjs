import Game from "./Models/gameClass.mjs";


function saveGame(game) {
    const gameTitle = game.title; 
    if (!gameTitle) {
        console.error('Game must have a title');
        return;
    }
    
    localStorage.setItem(gameTitle, JSON.stringify(game));
}
saveGame();

function getAllGames() {
    const games = [];
    for (let i = 0; i < localStorage.length; i++) {
        const gameTitle = localStorage.key(i); 
        const gameData = localStorage.getItem(gameTitle); 
        if (gameData) {
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
    }
    return games;
}
getAllGames();

function JSON_Games(){
   const gameLibrary = getAllGames();
   return JSON.stringify(gameLibrary, null, 2);
}
JSON_Games();

function importFromJson(json){
const gamesRetrival = JSON.parse(json)
gamesRetrival.forEach(allData => {
  const game = new Game(allData)  
saveGame(game)})
};
importFromJson();
