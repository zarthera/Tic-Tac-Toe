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
            else if(turn >= 8){
                return 'tie'
            }

        }
        return null
    }

    const updateBoard = (index, symbol) => {
        board[index] = symbol
    }
    
    let turn = -1;
    let gameWon = false;
    const Player = (name, symbol) => {
        
        const getName = () => name;
        const getSymbol = () => symbol;
        return {getName, getSymbol}
    }
    
    const player1 = Player('Player 1', "X")
    const player2 = Player('Player 2', "O")
    
    const replayHandler = () => {
        window.location.reload()
    }
    
    const showReplayButton = () => {
        const replayButton = document.createElement('button');
        replayButton.className = 'replay-btn';
        replayButton.textContent = 'Replay?';
        document.body.appendChild(replayButton);

        replayButton.addEventListener('click', replayHandler);
    };

    const showCongratulations = (winnerName) => {
        if(!gameWon){
            gameWon = true;

            const congratulations = document.createElement('div');
            congratulations.className = 'congratulations';
            document.body.appendChild(congratulations);
            congratulations.textContent = `Congratulations ${winnerName}, you've won the game!`;
            
            showReplayButton();
        }
    };

    const showTieGame = () =>{
        if(!gameWon){
            gameWon = true
            const tieGame = document.createElement('div')
            tieGame.className = 'tie-game'
            document.body.appendChild(tieGame)
            tieGame.textContent = 'Tie Game :('
            
            showReplayButton();
        }
    }
    const player1TextVar = document.querySelector('.player1-text')
    const player2TextVar = document.querySelector('.player2-text')

    const boxes = document.querySelectorAll('.box')
    boxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            const boxIndex = parseInt(box.classList[1].split('-')[1], 10);
            
            turn++
            console.log(turn)
            console.log(checkWinner())
            if (turn % 2 == 0){
                if(box.textContent == ""){
                    player1TextVar.style.display = 'none'
                    player2TextVar.style.display = 'inline'
                    const symbolX = document.createElement('div');
                    symbolX.className = 'symbolX';
                    box.appendChild(symbolX);
                    symbolX.textContent = player1.getSymbol();
                    
                    Gameboard.updateBoard(boxIndex, player1.getSymbol())
                }
                else{
                    turn--
                }
            }
            else if(turn % 2 !== 0){
                if(box.textContent == ""){
                    player2TextVar.style.display = 'none'
                    player1TextVar.style.display = 'inline'
                    const symbolO = document.createElement('div');
                    symbolO.className = 'symbolO';
                    box.appendChild(symbolO);
                    symbolO.textContent = player2.getSymbol();
    
                    Gameboard.updateBoard(boxIndex, player2.getSymbol())   
                }
                else{
                    turn--
                }
            }

            const winner = Gameboard.checkWinner();
            
            if(winner === "X"){
                showCongratulations(player1.getName())
                player1TextVar.style.display = 'none'
                player2TextVar.style.display = 'none'

            }
            if (winner === "O"){
                showCongratulations(player2.getName())
                player1TextVar.style.display = 'none'
                player2TextVar.style.display = 'none'
            }
            if(winner === 'tie'){
                showTieGame()
                player1TextVar.style.display = 'none'
                player2TextVar.style.display = 'none'
            }
        })
        
    })
    return {board, checkWinner, updateBoard,}
    
})()    

    const displayController = (() => {
    const startButton = document.querySelector('.start-btn')
    const boxContainer = document.querySelector('.box-container')
    
    const startGame = () =>{
        boxContainer.style.display = "grid"
        startButton.style.display = "none"

        const player1TurnVar = document.querySelector('.player1-text')
        player1TurnVar.style.display = 'inline'
        
    }
    
    startButton.addEventListener("click", startGame)
    return {startGame}
})()