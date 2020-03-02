'use strict';
class Scores {
    constructor() {
        this.topScores = []; //array of objets {name, score}
    }
    addNewScore (nameScoreObj) {
        //this.topScores.push(nameScoreObj);
        //this.sortScores();
        console.log(nameScoreObj);
        const ip = "http://127.0.0.1";
        const port = 3000;
        fetch(`${ip}:${port}`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nameScoreObj),
        })
        //.then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    
    sortScores() {
        this.topScores.sort((a,b) => {
            if (a.score > b.score) return -1;
            else if (a.score < b.score) return 1;
            else return 0;
        });
    }
    
    getScores () {
    
        return this.topScores.filter((element,index) => {
            if (index < 9) return true;
        });
    }
    
    saveToLocalStorage () {
        localStorage.clear();
        const scoreStringified = JSON.stringify(this.topScores);
        localStorage.setItem('score', scoreStringified);
    }
    loadFromLocalStorage () {
        if (localStorage.getItem('score')) {
            const retrieved = localStorage.getItem('score');
            this.topScores = JSON.parse(retrieved);
        }    
    }  
};