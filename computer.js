function LookAhead(numMoves) {
    let color = isWhite1
    let isWhite1Value = isWhite1
    let savePieceValue = 0

    let level = 0
    let board = 0
    let allPossibleMoves = []
    let startBoard = boardRepresent.slice()
    let boards = {0:[[boardRepresent, 0]]}

    let boardTree = new Tree()
    boardTree.addNode(boardRepresent, null, 0)
    let number = 1
    let node = 0

    /* 
    start board
    go down one path numMoves times
    backtrack
    go down next path
    if that board has no more paths, backtrack one more
    */
    while (level < numMoves) {
        while (board < boards[level].length) {
            color = isWhite1
            boardRepresent = boards[level][board][0].slice()
            // console.log(boardRepresent)
            Reset()
            allPossibleMoves = []
            
            // GET NEW MOVES
            addPieceSpot = false
            if (isWhite1 == "w") {
                isWhite1 = "b"
            }
            else {
                isWhite1 = "w"
            }
            secondIsInCheck = false

            changeSquareOn = false
            AttackingMoves()
            addPieceSpot = true
            if (isWhite1 == "w") {
                isWhite1 = "b"
                isWhite = "b"
            }
            else {
                isWhite1 = "w"
                isWhite = "w"
            }
            changeSquareOn = true
            
            // FIND ALLPOSSIBLEMOVES
            for (let i = 0; i < pieceList.length; i++) {
                for (let m = 0; m < pieceList[i].length; m++) {
                    if (pieceList[i][m].color == color && isWhite1 == color) {
                        if (i == 0) {
                            pieceList[i][m].validMoves = KingMovesCheck(pieceList[i][m])
                        }
                        else {
                            pieceList[i][m].validMoves = PiecesMovesCheck(pieceList[i][m])
                        }
                        if (pieceList[i][m].validMoves.length != 0) {
                            allPossibleMoves.push(pieceList[i][m])
                        }
                    }
                }
            }

            // GET BOARDS
            let oldBoardRepresent = []
            if (!Array.isArray(boards[level+1])) {
                boards[level+1] = []
            }   
            for (let v = 0; v < allPossibleMoves.length; v++) {
                for (let n = 0; n < allPossibleMoves[v].validMoves.length; n++) {
                    // set board
                    // savePieceValue = boardRepresent[allPossibleMoves[v].squareOn-1]
                    // savePieceValue2 = boardRepresent[allPossibleMoves[v].validMoves[n]-1]
                    oldBoardRepresent = [...boardRepresent]
                    boardRepresent[allPossibleMoves[v].squareOn-1] = " "
                    if (allPossibleMoves[v].color == "w") {
                        boardRepresent[allPossibleMoves[v].validMoves[n]-1] = allPossibleMoves[v].type.toLowerCase()
                    }
                    else {
                        boardRepresent[allPossibleMoves[v].validMoves[n]-1] = allPossibleMoves[v].type
                    }
                    // Reset()

                    // check if promoted
                    fileRank = SquareToFileRank(allPossibleMoves[v].validMoves[n])
                    oldType = allPossibleMoves[v].type
                    savePieceValue = boardRepresent[allPossibleMoves[v].validMoves[n]-1]
                    if (((isWhite1 == "w" && fileRank[0] == 1) || (isWhite1 == "b" && fileRank[0] == 8)) && allPossibleMoves[v].type == "P") {
                        promoteTypes.forEach(newType => {
                            if (isWhite1 == "w") {
                                boardRepresent[allPossibleMoves[v].validMoves[n]-1] = newType.toLowerCase()
                            }
                            else if (isWhite1 == "b") {
                                boardRepresent[allPossibleMoves[v].validMoves[n]-1] = newType
                            }
                            allPossibleMoves[v].type = newType
                            boards[level+1].push([boardRepresent.slice(), number])
                            allPossibleMoves[v].type = oldType
                            boardTree.addNode(boardRepresent.slice(), boards[level][board][1], number)
                            number++
                            boardRepresent[allPossibleMoves[v].validMoves[n]-1] = savePieceValue
                        });
                        // console.log("PROMOTING")
                    }
                    else {
                        // add board
                        boards[level+1].push([boardRepresent.slice(), number])
                        // node = boardTree.search(boards[level][board][1])
                        boardTree.addNode(boardRepresent.slice(), boards[level][board][1], number)
                        number++
                    }
                    // console.log("BOARD ", boardRepresent)

                    // reset board
                    // boardRepresent[allPossibleMoves[v].squareOn-1] = savePieceValue
                    // boardRepresent[allPossibleMoves[v].validMoves[n]-1] = " "
                    boardRepresent = [...oldBoardRepresent]
                    // Reset()
                }
            }
            // console.log("NEXT BOARD")
            board += 1
        }
        // console.log("DOWN A LEVEL")
        // check if need to backtrack
        if (level+1 < boards.length && level > 0) {
            if (boards[level+1].length == 0) {
                // console.log("BACKTRACK")
            }
        }
        else {
            // go down a level and switch isWhite
            level++
            board = 0
            if (isWhite1 == "w") {
                isWhite = "b"
                isWhite1 = "b"
            }
            else {
                isWhite = "w"
                isWhite1 = "w"
            }
        }
    }

    console.log("THIS IS ALL ", boards)
    isWhite1 = isWhite1Value
    isWhite = isWhite1
    boardRepresent = startBoard
    // Reset()

    return [boards, boardTree]
}

function GenerateCaptures(maxPlayer) {
    if (maxPlayer) {
        isWhite1 = "w"
    }
    else {
        isWhite1 = "b"
    }
    // boardRepresent = board.slice()
    // // console.log(boardRepresent)
    // Reset()
    let allPossibleMoves = []
    let boards = []
    // let moves = []
    
    // FIND ALLPOSSIBLEMOVES
    for (let i = 0; i < pieceList.length; i++) {
        for (let m = 0; m < pieceList[i].length; m++) {
            if (pieceList[i][m].color == isWhite1) {
                if (pieceList[i][m].type == "K") {
                    KingCaptures(pieceList[i][m].squareOn)
                }
                else if (pieceList[i][m].type == "Q") {
                    RookCaptures(pieceList[i][m].squareOn)
                    pieceList[i][m].validMoves = pieceList[i][m].validMoves.concat(validMoves)
                    validMoves = []

                    BishopCaptures(pieceList[i][m].squareOn)
                    // console.log("Q")
                }
                else if (pieceList[i][m].type == "B") {
                    BishopCaptures(pieceList[i][m].squareOn)
                    // console.log("B")
                }
                else if (pieceList[i][m].type == "N") {
                    KnightCaptures(pieceList[i][m].squareOn)
                    // console.log("N")
                }
                else if (pieceList[i][m].type == "R") {
                    RookCaptures(pieceList[i][m].squareOn)
                    // console.log("R")
                }
                else if (pieceList[i][m].type == "P") {
                    PawnCaptures(pieceList[i][m].squareOn)
                    pieceList[i][m].validMoves = pieceList[i][m].validMoves.concat(validMoves2)
                    // console.log("P")
                }

                pieceList[i][m].validMoves = pieceList[i][m].validMoves.concat(validMoves)
                pieceList[i][m].validMoves = pieceList[i][m].FilterNonSquaresFromMoves(pieceList[i][m].validMoves)
                pieceList[i][m].validMoves = pieceList[i][m].RemoveSameColorPiecesFromMoves(pieceList[i][m].validMoves)
                // console.log(pieceList[k][h].validMoves)

                validMoves = []

                if (i == 0) {
                    pieceList[i][m].validMoves = KingMovesCheck(pieceList[i][m])
                }
                else {
                    pieceList[i][m].validMoves = PiecesMovesCheck(pieceList[i][m])
                }
                if (pieceList[i][m].validMoves.length != 0) {
                    allPossibleMoves.push(pieceList[i][m])
                }
            }
        }
    }

    // GET BOARDS
    let oldBoardRepresent = []
    for (let v = 0; v < allPossibleMoves.length; v++) {
        for (let n = 0; n < allPossibleMoves[v].validMoves.length; n++) {
            // set board
            // savePieceValue = boardRepresent[allPossibleMoves[v].squareOn-1]
            // savePieceValue2 = boardRepresent[allPossibleMoves[v].validMoves[n]-1]
            oldBoardRepresent = [...boardRepresent]
            boardRepresent[allPossibleMoves[v].squareOn-1] = " "
            if (allPossibleMoves[v].color == "w") {
                boardRepresent[allPossibleMoves[v].validMoves[n]-1] = allPossibleMoves[v].type.toLowerCase()
            }
            else {
                boardRepresent[allPossibleMoves[v].validMoves[n]-1] = allPossibleMoves[v].type
            }
            // Reset()

            // check if promoted
            fileRank = SquareToFileRank(allPossibleMoves[v].validMoves[n])
            oldType = allPossibleMoves[v].type
            savePieceValue = boardRepresent[allPossibleMoves[v].validMoves[n]-1]
            if (((isWhite1 == "w" && fileRank[0] == 1) || (isWhite1 == "b" && fileRank[0] == 8)) && allPossibleMoves[v].type == "P") {
                promoteTypes.forEach(newType => {
                    if (isWhite1 == "w") {
                        boardRepresent[allPossibleMoves[v].validMoves[n]-1] = newType.toLowerCase()
                    }
                    else if (isWhite1 == "b") {
                        boardRepresent[allPossibleMoves[v].validMoves[n]-1] = newType
                    }
                    allPossibleMoves[v].type = newType
                    boards.push(boardRepresent.slice())
                    allPossibleMoves[v].type = oldType
                });
                // console.log("PROMOTING")
            }
            else {
                // add board
                boards.push(boardRepresent.slice())
            }
            boardRepresent = [...oldBoardRepresent]
        }
    }
    return boards
}

function GenerateMoves(maxPlayer) {
    if (maxPlayer) {
        isWhite1 = "w"
    }
    else {
        isWhite1 = "b"
    }
    // boardRepresent = board.slice()
    // // console.log(boardRepresent)
    // Reset()
    let allPossibleMoves = []
    let boards = []
    // let moves = []
    
    // FIND ALLPOSSIBLEMOVES
    for (let i = 0; i < pieceList.length; i++) {
        for (let m = 0; m < pieceList[i].length; m++) {
            if (pieceList[i][m].color == isWhite1) {
                if (pieceList[i][m].type == "K") {
                    KingMoves(pieceList[i][m].squareOn)
                }
                else if (pieceList[i][m].type == "Q") {
                    RookMoves(pieceList[i][m].squareOn)
                    pieceList[i][m].validMoves = pieceList[i][m].validMoves.concat(validMoves)
                    validMoves = []

                    BishopMoves(pieceList[i][m].squareOn)
                    // console.log("Q")
                }
                else if (pieceList[i][m].type == "B") {
                    BishopMoves(pieceList[i][m].squareOn)
                    // console.log("B")
                }
                else if (pieceList[i][m].type == "N") {
                    KnightMoves(pieceList[i][m].squareOn)
                    // console.log("N")
                }
                else if (pieceList[i][m].type == "R") {
                    RookMoves(pieceList[i][m].squareOn)
                    // console.log("R")
                }
                else if (pieceList[i][m].type == "P") {
                    PawnMoves(pieceList[i][m].squareOn)
                    pieceList[i][m].validMoves = pieceList[i][m].validMoves.concat(validMoves2)
                    // console.log("P")
                }

                pieceList[i][m].validMoves = pieceList[i][m].validMoves.concat(validMoves)
                pieceList[i][m].validMoves = pieceList[i][m].FilterNonSquaresFromMoves(pieceList[i][m].validMoves)
                pieceList[i][m].validMoves = pieceList[i][m].RemoveSameColorPiecesFromMoves(pieceList[i][m].validMoves)
                // console.log(pieceList[k][h].validMoves)

                validMoves = []

                if (i == 0) {
                    pieceList[i][m].validMoves = KingMovesCheck(pieceList[i][m])
                }
                else {
                    pieceList[i][m].validMoves = PiecesMovesCheck(pieceList[i][m])
                }
                if (pieceList[i][m].validMoves.length != 0) {
                    allPossibleMoves.push(pieceList[i][m])
                }
            }
        }
    }

    // GET BOARDS
    let oldBoardRepresent = []
    for (let v = 0; v < allPossibleMoves.length; v++) {
        for (let n = 0; n < allPossibleMoves[v].validMoves.length; n++) {
            // set board
            // savePieceValue = boardRepresent[allPossibleMoves[v].squareOn-1]
            // savePieceValue2 = boardRepresent[allPossibleMoves[v].validMoves[n]-1]
            oldBoardRepresent = [...boardRepresent]
            boardRepresent[allPossibleMoves[v].squareOn-1] = " "
            if (allPossibleMoves[v].color == "w") {
                boardRepresent[allPossibleMoves[v].validMoves[n]-1] = allPossibleMoves[v].type.toLowerCase()
            }
            else {
                boardRepresent[allPossibleMoves[v].validMoves[n]-1] = allPossibleMoves[v].type
            }
            // Reset()

            // check if promoted
            fileRank = SquareToFileRank(allPossibleMoves[v].validMoves[n])
            oldType = allPossibleMoves[v].type
            savePieceValue = boardRepresent[allPossibleMoves[v].validMoves[n]-1]
            if (((isWhite1 == "w" && fileRank[0] == 1) || (isWhite1 == "b" && fileRank[0] == 8)) && allPossibleMoves[v].type == "P") {
                promoteTypes.forEach(newType => {
                    if (isWhite1 == "w") {
                        boardRepresent[allPossibleMoves[v].validMoves[n]-1] = newType.toLowerCase()
                    }
                    else if (isWhite1 == "b") {
                        boardRepresent[allPossibleMoves[v].validMoves[n]-1] = newType
                    }
                    allPossibleMoves[v].type = newType
                    boards.push(boardRepresent.slice())
                    allPossibleMoves[v].type = oldType
                });
                // console.log("PROMOTING")
            }
            else {
                // add board
                boards.push(boardRepresent.slice())
            }
            boardRepresent = [...oldBoardRepresent]
        }
    }
    return boards
}

function GetScore() { // don't need board parameter because boardRepresent already set
    let sumB = 0
    let sumW = 0
    let type = 0
    middleEnd = endOrMiddleGame();

    // let oldBoardRepresent = boardRepresent
    // boardRepresent = board
    // ResetPieces()    

    for (let i = 0; i < pieceList.length; i++) {
        for (let m = 0; m < pieceList[i].length; m++) {
            if (pieceList[i][m].color == "w") {
                type = pieceList[i][m].type.toLowerCase()
                sumW += pieceValues[type]
                sumW += getPSTScore(type, pieceList[i][m].squareOn-1, i)
            }
            else {
                type = pieceList[i][m].type
                sumB += pieceValues[type]
                sumB -= getPSTScore(type, pieceList[i][m].squareOn-1, i)
            }
        }
    }

    // boardRepresent = oldBoardRepresent
    // ResetPieces()

    // for (let i = 0; i < 64; i++) {
    //     if (boardRepresent[i] != "")
    // }

    return sumW + sumB
}

function Quiescence(alpha, beta, maxPlayer) { // search only captures until reach stable position
    quiesceScore = GetScore()
    if (quiesceScore >= beta) {
        return beta
    }
    if (alpha < quiesceScore) {
        alpha = quiesceScore
    }

    let allCaptures = GenerateCaptures(maxPlayer)
    let oldBoardRepresent = boardRepresent.slice()
    // console.log(depth)
    // console.log(allMoves)
    // if (allCaptures.length != 0) {
    // let maxEvalVal = -Infinity
    // let maxEval = []
    let score = 0
    for (let i = 0; i < allCaptures.length; i++) {
        boardRepresent = allCaptures[i].slice()
        Reset()
        // get Quiescence and set score
        score = Quiescence(-alpha, -beta, !maxPlayer)

        boardRepresent = oldBoardRepresent.slice()
        Reset()

        if (score >= beta) {
            return beta;
        }  
        if(score > alpha) {
            alpha = score;
        }
        // boardRepresent = allCaptures[i].slice()
        // if (evalBoard > maxEvalVal) { // replace best move
        //     maxEvalVal = evalBoard
        //     maxEval = [boardRepresent.slice()]
        // }
        // else if (evalBoard == maxEvalVal) {
        //     maxEval.push(boardRepresent.slice())
        // }

        // alpha = Math.max(alpha, evalBoard)
        // if (beta <= alpha) {
        //     break
        // }
    }
    // console.log("MAX ", maxEvalVal)
    // boardRepresent = oldBoardRepresent
    // Reset() 
    // BOARD REPRESENT = BEST MOVE
    // boardRepresent = move.value
    // Reset()
    // }
    return alpha
}

function MiniMax(depth, alpha, beta, maxPlayer) {
    console.log(depth)
    // If depth == 0, return the score and the number of the node on the tree
    if (depth == 0) {
        let score = Quiescence(alpha, beta, !maxPlayer)
        console.log("SCORE", score)
        return score
    }
    let allMoves = GenerateMoves(maxPlayer)
    // console.log(depth)
    // console.log(allMoves)
    if (allMoves.length != 0) {
        if (maxPlayer) {
            let maxEvalVal = -Infinity
            let maxEval = []
            let evalBoard = 0
            for (let i = 0; i < allMoves.length; i++) {
                boardRepresent = allMoves[i].slice()
                // ResetPieces()
                Reset()
                // get minimax and set evalBoard
                evalBoard = MiniMax(depth-1, alpha, beta, false)
                if (evalBoard > maxEvalVal) { // replace best move
                    maxEvalVal = evalBoard
                    // chosenLine = [boardRepresent.slice()]
                    boardRepresent = allMoves[i].slice()
                    maxEval = [boardRepresent.slice()]
                }
                else if (evalBoard == maxEvalVal) {
                    boardRepresent = allMoves[i].slice()
                    maxEval.push(boardRepresent.slice())
                }

                alpha = Math.max(alpha, evalBoard)
                if (beta <= alpha) {
                    break
                }
            }
            // console.log("MAX ", maxEvalVal)
            // boardRepresent = oldBoardRepresent
            // Reset() 
            // BOARD REPRESENT = BEST MOVE
            // boardRepresent = move.value
            // Reset()

            return maxEvalVal
        }
        else {
            let minEvalVal = +Infinity
            let minEval = []
            let evalBoard = 0
            for (let i = 0; i < allMoves.length; i++) {
                boardRepresent = allMoves[i].slice()
                // ResetPieces()
                Reset()
                // get minimax and set evalBoard
                evalBoard = MiniMax(depth-1, alpha, beta, true)
                // if (depth == 2) {
                //     console.log(minEvalVal)
                //     console.log(minEval)
                //     console.log(evalBoard)
                // }
                //console.log("MINEVAL", evalBoard)
                if (evalBoard < minEvalVal) { // replace best move
                    minEvalVal = evalBoard
                    boardRepresent = allMoves[i].slice()
                    minEval = [boardRepresent.slice()]
                }
                else if (evalBoard == minEvalVal) {
                    boardRepresent = allMoves[i].slice()
                    minEval.push(boardRepresent.slice())
                }

                beta = Math.min(beta, evalBoard)
                if (beta <= alpha) {
                    //console.log("CUT")
                    break
                }
            }
            // console.log("MIN ", minEvalVal)
            // BOARD REPRESENT = BEST MOVE
            // boardRepresent = move.value
            // Reset()
            if (depth == maxDepth) {
                return [minEvalVal, minEval]
            }
            return minEvalVal
        }
    }
}

function ComputerMove2() {
    let saveIsWhite1Value2 = isWhite1
    // let oldBoardTree = new Tree()
    // oldBoardTree.root = boardTree.root
    let depth = 2
    let lookAhead = LookAhead(depth) // get boards and boardTree
    let boards = lookAhead[0]
    let boardTree = lookAhead[1]
    console.log(boards)
    console.log(boardTree)
    document.getElementById("thinkGIF").style = "display: none"
    let bestScore = MiniMax(depth, -Infinity, Infinity, false, boardTree.root) // get best move (bottom of tree, last move) 
    console.log(bestScore)
    // document.getElementById("thinkGIF").style = "display: none"
}

function ComputerMove() {
    let saveIsWhite1Value2 = isWhite1
    let oldBoardRepresent = [...boardRepresent]
    // let oldBoardTree = new Tree()
    // oldBoardTree.root = boardTree.root
    maxDepth = 1
    // let lookAhead = LookAhead(depth) // get boards and boardTree
    // let boards = lookAhead[0]
    // let boardTree = lookAhead[1]

    // let oldBoardRepresentMiniMax = boardRepresent.slice()
    // boardRepresent = boardTree.root.value
    // Reset()
    let minimax = MiniMax(maxDepth, -Infinity, Infinity, false) // get best move (bottom of tree, last move) 
    let bestScore = minimax[0]
    let chosenMoves = minimax[1]
    let move = chosenMoves[Math.floor(Math.random() * chosenMoves.length)]
    // boardRepresent = oldBoardRepresentMiniMax.slice()
    // Reset()
    // let boardNode = boardTree.getMove(move)
    //boardTree.root = minimaxReturned[1]
    // let boardNode = boardTree.search(minimax[1]) // get best move (actual move to play)
    // let boardNode2 = boardTree.getMove(boardNode)
    //let oldBoardRepresent = boardRepresent.slice()
    // boardRepresent = boardNode.value
    // Reset()
    // boardRepresent = oldBoardRepresent.slice()
    // Reset()
    // console.log(boards)
    // console.log(boardTree)
    console.log(bestScore)
    console.log(chosenMoves)
    console.log(move)
    // console.log(boardNode)
    // console.log(boardNode2)

    // pieceLists
    let newPieceList = []
    let newPieceList2 = []
    let sqPieceList = []
    let sqPieceList2 = []

    // pieceList = old
    // pieceList2 = new

    // Get piece that is moving
    boardRepresent = move
    console.log(boardRepresent)
    Reset()

    isWhite1 = saveIsWhite1Value2
    isWhite = isWhite1
    
    for (i = 0; i < pieceList.length; i++) {
        if (!Array.isArray(newPieceList2[i])) {
            newPieceList2.push([])
        }
        if (!Array.isArray(sqPieceList2[i])) {
            sqPieceList2.push([])
        }
        for (m = 0; m < pieceList[i].length; m++) {
            if (pieceList[i][m].color == isWhite1) {
                newPieceList2[i].push(pieceList[i][m])
                sqPieceList2[i].push(pieceList[i][m].squareOn)
            }
        }
    }

    boardRepresent = [...oldBoardRepresent]
    Reset()
    for (i = 0; i < pieceList.length; i++) {
        if (!Array.isArray(newPieceList[i])) {
            newPieceList.push([])
        }
        if (!Array.isArray(sqPieceList[i])) {
            sqPieceList.push([])
        }
        for (m = 0; m < pieceList[i].length; m++) {
            if (pieceList[i][m].color == isWhite1) {
                newPieceList[i].push(pieceList[i][m])
                sqPieceList[i].push(pieceList[i][m].squareOn)
            }
        }
    }

    console.log(newPieceList)
    console.log(newPieceList2)

    for (i = 0; i < newPieceList.length; i++) {
        for (m = 0; m < newPieceList[i].length; m++) {
            if (!sqPieceList2[i].includes(sqPieceList[i][m])) {
                console.log(newPieceList[i][m]) // moveFromSq
                currentPiece = newPieceList[i][m]
                moveFromSq = sqPieceList[i][m]
                movePiece = currentPiece.type
            }
        }
    }

    for (i = 0; i < newPieceList2.length; i++) {
        for (m = 0; m < newPieceList2[i].length; m++) {
            if (!sqPieceList[i].includes(sqPieceList2[i][m])) {
                console.log(newPieceList2[i][m]) // moveToSq
                moveToSq = sqPieceList2[i][m]
            }
        }
    }

    console.log(isWhite1)
    console.log(currentPiece) // currentPiece
    boardRepresent = oldBoardRepresent
    Reset()

    document.getElementById("thinkGIF").style = "display: none"
    CheckMoveValid()
}
