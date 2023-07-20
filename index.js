const Gameboard = (() => {
    const board = [null, null, null, null, null, null, null, null, null]
    
    const checkWinner = () => {
        const winPatterns = [
            // Rows
            [0, 1, 2], [3, 4, 5], [6, 7, 8],

            // Columns
            [0, 3, 6], [1, 4, 7], [2, 5, 8],

            // Diagonals
            [0, 4, 8], [2, 4, 6]
        ]
        for (const pattern of winPatterns){
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]){
                return board[a]
            }

        }
        return null
    }

    const updateBoard = (index, symbol) => {
        board[index] = symbol
    }
    
    let turn = -1;
    const Player = (name, symbol) => {
        
        const getName = () => name;
        const getSymbol = () => symbol;
        return {getName, getSymbol}
    }

    const player1 = Player('Player 1', "X")
    const player2 = Player('Player 2', "O")
    
    
    const boxes = document.querySelectorAll('.box')
    boxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            const boxIndex = parseInt(box.classList[1].split('-')[1], 10);


            turn++
            console.log(turn)
            if (turn % 2 == 0){
                if(box.textContent !== ""){}
                else{
                    const symbolX = document.createElement('div');
                    symbolX.className = 'symbolX';
                    box.appendChild(symbolX);
                    symbolX.textContent = player1.getSymbol();

                    Gameboard.updateBoard(boxIndex, player1.getSymbol())
                }
            }
            else if(turn % 2 !== 0){
                if(box.textContent !== ""){}
                else{
                    const symbolO = document.createElement('div');
                    symbolO.className = 'symbolO';
                    box.appendChild(symbolO);
                    symbolO.textContent = player2.getSymbol();

                    Gameboard.updateBoard(boxIndex, player2.getSymbol())
                }
            }

            const winner = Gameboard.checkWinner();
            
            if(winner === "X"){
                const congratulations = document.createElement('div')
                congratulations.className = 'congratulations'
                document.body.appendChild(congratulations)
                congratulations.textContent = `Congratulations ${player1.getName()}, you've won the game!`
                console.log(winner)
                const replayButton = document.createElement('button')
                replayButton.className = 'replay-btn'
                replayButton.textContent = 'Replay?'
                document.body.appendChild(replayButton)

                replayButton.addEventListener('click', {
                    handleEvent: ()=> window.location.reload(),
                })
            }
            else if (winner === "O"){
                const congratulations = document.createElement('div')
                congratulations.className = 'congratulations'
                document.body.appendChild(congratulations)
                congratulations.textContent = `Congratulations ${player2.getName()}, you've won the game!`
                
                const replayButton = document.createElement('button')
                replayButton.className = 'replay-btn'
                replayButton.textContent = 'Replay?'
                document.body.appendChild(replayButton)

                replayButton.addEventListener('click', {
                    handleEvent: ()=> window.location.reload(),
                })
            }
        })
        
    })
    return {board, checkWinner, updateBoard}
})()

const displayController = (() => {
    const startButton = document.querySelector('.start-btn')
    const boxContainer = document.querySelector('.box-container')
    
    
    const startGame = () =>{
        boxContainer.style.display = "grid"
        startButton.style.display = "none"
    }
    
    startButton.addEventListener("click", startGame)
    return {startGame}
})()