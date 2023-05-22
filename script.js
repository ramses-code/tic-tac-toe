const x_class = 'x'
const circle_class = 'circle'
let circleTurn
const winnigCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.querySelector('.board')
const winningMsgTextElement = document.querySelector('[data-winning-msg-text]')
const winningMsgElement = document.querySelector('.div-winning-msg')
document.querySelector('#btnRestart').addEventListener('click', startGame)

startGame()

function startGame() {
    circleTurn = false

    cellElements.forEach(cell => {
        cell.classList.remove(x_class)
        cell.classList.remove(circle_class)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()

    winningMsgElement.classList.remove('show')

}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? circle_class : x_class

    placeMark(cell, currentClass)

    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapturns()
        setBoardHoverClass()
    }
} 

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapturns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    let turnClass = circleTurn ? circle_class : x_class
    board.classList.remove(x_class)
    board.classList.remove(circle_class)
    board.classList.add(turnClass)
}

function checkWin(currentClass) {
    return winnigCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(circle_class)
    })
} 

function endGame(draw) {
    if (draw) {
        winningMsgTextElement.innerText = 'Draw!'
    } else {
        winningMsgTextElement.innerText = `${circleTurn ? 'O\'s' : 'X\'s'} Wins!`
    }
    winningMsgElement.classList.add('show')
}