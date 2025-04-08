class Games {
    constructor(title, designer, artist, publisher, year ,players ,time , difficulty, url, playCount, personalRating){
this.title;
this.designer;
this.artist;
this.publisher;
this.year;
this.players;
this.time;
this.difficulty;
this.url;
this.playCount;
this.personalRating;
    }
    getSummaryFromGame(){
        return`${this.title} has been played${this.playCount} times, and ${this.personalRating} is the rating of ${this.players}/10.`;
    }
    urlForGames(){
        return `For more information: ${this.url}`;
    }
}

export default Games;