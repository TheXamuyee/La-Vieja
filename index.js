let square = document.querySelectorAll(".square");
let button = document.querySelector('button');
let game_over = false;

square.forEach(ele => {
    ele.addEventListener('click', player)
})

function player() {
    if (!game_over) {
        let getClass = this.getAttribute("class");
        if (getClass.indexOf("marked") < 0) {
            this.classList.add("x-mark", "marked");
            this.innerHTML = "X";
            getPosition(this.dataset.position, "x-mark");
            computer();
        } else {
            return
        }
        if (document.querySelectorAll('.marked').length === 9 && game_over === false) {
            displayResult('Empate!', 'draw');
            finished = true;
        }
    }
}
function computer() {
    let unmarked = document.querySelectorAll(".square:not(.marked)");
    if (unmarked.length > 0) {
        let randPosition = Math.floor(Math.random() * unmarked.length);
        let randCell = unmarked[randPosition];
        randCell.classList.add("o-mark", "marked");
        randCell.innerHTML = "O"
        getPosition(randCell.dataset.position, "o-mark");
    } else {
        return;
    }


}

function getPosition(pos, mark) {
    let winningPos = [[1, 2, 3], [1, 4, 7], [1, 5, 9], [2, 5, 8], [3, 6, 9], [3, 5, 7], [4, 5, 6], [7, 8, 9]]
    if (document.querySelectorAll(".x-mark").length >= 3 || document.querySelectorAll(".o-mark").length >= 3) {
        winningPos.forEach((element) => {
            if (game_over === true) {
                return false;
            } else {
                if (element.indexOf(Number(pos)) >= 0) {
                    let marksInARow = 0;
                    element.forEach((ele) => {
                        let classNames = document.getElementById("cell" + ele).getAttribute('class');
                        if (classNames.indexOf(mark) >= 0) {
                            marksInARow++;
                            if (marksInARow === 3) {
                                game_over = true;
                                if (mark === "x-mark") {
                                    displayResult("Has Ganado!", "win")
                                } else if (mark === "o-mark") {
                                    displayResult("Has Perdido!", "lost")
                                    return false;
                                }
                            }
                        }
                    })

                }
            }
        })
    }
}

function displayResult(message) {
    document.querySelector('.game_result').innerHTML = 'Resultado:' + " " + message;
}
button.addEventListener('click', reset);

function reset() {
    document.querySelector('.game_result').innerHTML = 'Resultado';
    square.forEach(ele => {
        ele.classList.remove('x-mark', 'o-mark', 'marked');
        ele.innerHTML = "";
    })
    game_over = false;
}
