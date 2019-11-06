'use strict';
function Scores () {
    this.topScores = []; //array of objets {name, score}
};

Scores.prototype.addNewScore = function (nameScoreObj) {
    this.topScores.push(nameScoreObj);
    this.sortScores();
}

Scores.prototype.sortScores = function() {
    this.topScores.sort(function (a,b) {
        if (a.score > b.score) return -1;
        else if (a.score < b.score) return 1;
        else return 0;
    });
}

Scores.prototype.getScores = function () {

    return this.topScores.filter(function(element,index) {
        if (index < 9) return true;
    });
}

Scores.prototype.saveToLocalStorage = function () {
    localStorage.clear();
    var scoreStringified = JSON.stringify(this.topScores);
    localStorage.setItem('score', scoreStringified);
}
Scores.prototype.loadFromLocalStorage = function () {
    if (localStorage.getItem('score')) {
        var retrieved = localStorage.getItem('score');
        this.topScores = JSON.parse(retrieved);
    }    
}