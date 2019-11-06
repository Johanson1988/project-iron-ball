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
    return this.topScores;
}