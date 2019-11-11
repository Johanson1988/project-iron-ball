'use strict';
class Scores {
    constructor() {
        this.topScores = []; //array of objets {name, score}
    }
    addNewScore (nameScoreObj) {
        this.topScores.push(nameScoreObj);
        this.sortScores();
    }
    
    sortScores() {
        this.topScores.sort(function (a,b) {
            if (a.score > b.score) return -1;
            else if (a.score < b.score) return 1;
            else return 0;
        });
    }
    
    getScores () {
    
        return this.topScores.filter(function(element,index) {
            if (index < 9) return true;
        });
    }
    
    saveToLocalStorage () {
        localStorage.clear();
        var scoreStringified = JSON.stringify(this.topScores);
        localStorage.setItem('score', scoreStringified);
    }
    loadFromLocalStorage () {
        if (localStorage.getItem('score')) {
            var retrieved = localStorage.getItem('score');
            this.topScores = JSON.parse(retrieved);
        }    
    }  
};