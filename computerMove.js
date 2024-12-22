function LookAhead(numMoves) {
    isWhite1 = isWhite
    // let savePieceValue = 0
    let fileRank = []

    let level = 0
    let board = 0
    // let allPossibleMoves = []
    let startBoard = boardRep120.slice()
    let boards = {0:[[boardRep120, 0]]}

    let boardTree = new Tree()
    boardTree.addNode(boardRep120, null, 0)
    let number = 1
    // let node = 0

    /* 
    start board
    go down one path numMoves times
    backtrack
    go down next path
    if that board has no more paths, backtrack one more
    */
    while (level < numMoves) {
        while (board < boards[level].length) {
            // color = isWhite1
            boardRep120 = boards[level][board][0].slice()
            // console.log(boardRepresent)
            ResetPieces()
            ResetVars()
            allPossibleMoves = []

            // GET BOARDS
            // let oldBoardRep = []
            if (!Array.isArray(boards[level+1])) {
                boards[level+1] = []
            }   
            for (let v = 0; v < pieceList.length; v++) {
                // Get pieces moves
                pieceList[v].validMoves = []
                if (pieceList[v].color == isWhite) {
                    pieceList[v].validMoves = GetPieceMove(pieceList[v])
                    pieceList[v].validMoves = PieceMovesCheck(pieceList[v])
                    // allPossibleMoves = allPossibleMoves.concat(pieceList[i])
                }
                
                for (let n = 0; n < pieceList[v].validMoves.length; n++) {
                    // Set up board
                    // oldBoardRep = [...boardRep120]
                    boardRep120[pieceList[v].squareOn120] = " "
                    boardRep120[pieceList[v].validMoves[n]] = pieceList[v].piece

                    // Check if promoted
                    fileRank = SqToRowFile(pieceList[v].validMoves[n])
                    // oldType = pieceList[v].type
                    // savePieceValue = pieceList[v].piece
                    if (((isWhite1 == "w" && fileRank[0] == 0) || (isWhite1 == "b" && fileRank[0] == 7)) && pieceList[v].type == "P") {
                        promoteTypes.forEach(newType => {
                            if (isWhite1 == "w") {
                                boardRep120[pieceList[v].validMoves[n]] = newType.toLowerCase()
                            }
                            else if (isWhite1 == "b") {
                                boardRep120[pieceList[v].validMoves[n]] = newType
                            }
                            // pieceList[v].type = newType
                            boards[level+1].push([boardRep120.slice(), number])
                            // allPossibleMoves[v].type = oldType
                            boardTree.addNode(boardRep120.slice(), boards[level][board][1], number, GetScoreBoard())
                            number++
                            boardRep120[pieceList[v].validMoves[n]] = pieceList[v].piece
                        });
                        // console.log("PROMOTING")
                    }
                    else {
                        // Add board
                        boards[level+1].push([boardRep120.slice(), number])
                        // node = boardTree.search(boards[level][board][1])
                        boardTree.addNode(boardRep120.slice(), boards[level][board][1], number, GetScoreBoard())
                        number++
                    }
                    // console.log("BOARD ", boardRepresent)

                    // reset board
                    boardRep120[pieceList[v].squareOn120] = pieceList[v].piece
                    boardRep120[pieceList[v].validMoves[n]] = " "
                    // boardRep120 = [...oldBoardRep]
                    // Reset()
                }
            }
            // console.log("NEXT BOARD")
            board += 1
        }
        // console.log("DOWN A LEVEL")
        // Check if need to backtrack
        if (level+1 < boards.length && level > 0) {
            if (boards[level+1].length == 0) {
                // console.log("BACKTRACK")
            }
        }
        // Go down a level and switch isWhite
        else {
            level++
            board = 0
            if (isWhite == "w") {
                isWhite = "b"
            }
            else {
                isWhite = "w"
            }
        }
    }

    console.log("THIS IS ALL ", boards)
    isWhite = isWhite1
    boardRepresent = startBoard
    // Reset()

    return [boards, boardTree]
}

function GenerateMoves(maxPlayer) {
    if (maxPlayer) {
        isWhite = "w"
    }
    else {
        isWhite = "b"
    }
    // boardRepresent = board.slice()
    // // console.log(boardRepresent)
    // Reset()
    let savePiece
    let saveEnPassant = possibleEnPassant
    let boards = []
    let pushedBoard
    let castled

    // GET BOARDS
    for (let v = 0; v < pieceList.length; v++) {
        pieceList[v].validMoves = []
        // if (boardRep120[27] == 'R' && boardRep120[28] == 'R') {
        //     console.log(v - 1, pieceList[v - 1])
        //     console.log(boardRep120)
        // }
        // // Fix double rook issue
        // if (boardRep120[27] == 'R' && boardRep120[28] == 'R') {
        //     boardRep120[27] = ' '
        //     boardRep120[28] = 'R'
        // }

        // Get piece moves
        if (pieceList[v].color == isWhite) {
            pieceList[v].validMoves = GetPieceMove(pieceList[v])
            possibleEnPassant = saveEnPassant
            pieceList[v].validMoves = PieceMovesCheck(pieceList[v])
        }

        for (let n = 0; n < pieceList[v].validMoves.length; n++) {
            // Set up board
            castled = false
            boardRep120[pieceList[v].squareOn120] = " "
            savePiece = boardRep120[pieceList[v].validMoves[n]]
            boardRep120[pieceList[v].validMoves[n]] = pieceList[v].piece
            if (pieceList[v].type == "K") {
                if (pieceList[v].validMoves[n] == 93 && pieceList[v].squareOn120 == 95) { boardRep120[91] = ' '; boardRep120[94] = 'r'; castled = true; }
                if (pieceList[v].validMoves[n] == 97 && pieceList[v].squareOn120 == 95) { boardRep120[98] = ' '; boardRep120[96] = 'r'; castled = true; }
                if (pieceList[v].validMoves[n] == 23 && pieceList[v].squareOn120 == 25) { boardRep120[21] = ' '; boardRep120[24] = 'R'; castled = true; }
                if (pieceList[v].validMoves[n] == 27 && pieceList[v].squareOn120 == 25) { boardRep120[28] = ' '; boardRep120[26] = 'R'; castled = true; }
            }

            // Check if promoted
            fileRank = SqToRowFile(pieceList[v].validMoves[n])
            if (((isWhite1 == "w" && fileRank[0] == 0) || (isWhite1 == "b" && fileRank[0] == 7)) && pieceList[v].type == "P") {
                promoteTypes.forEach(newType => {
                    if (isWhite1 == "w") {
                        boardRep120[pieceList[v].validMoves[n]] = newType.toLowerCase()
                    }
                    else if (isWhite1 == "b") {
                        boardRep120[pieceList[v].validMoves[n]] = newType
                    }
                });
                pushedBoard = false
                boardScore = GetScoreBoard()
                if (boards.length == 0) {
                    boards.push([boardRep120.slice(), boardScore])
                }
                else {
                    for (let i = 0; i < boards.length; i++) {
                        if (boards[i][1] >= boardScore) {
                            boards.splice(i, 0, [boardRep120.slice(), boardScore])
                            pushedBoard = true
                            break
                        }
                    }
                    if (!pushedBoard) {
                        boards.push([boardRep120.slice(), boardScore])
                    }
                }
                // console.log("PROMOTING")
            }
            else {
                // Add board
                pushedBoard = false
                boardScore = GetScoreBoard()
                if (castled && endOrMiddleGame() == "M") { 
                    if (isWhite == 'w') { boardScore += 100; }
                    if (isWhite == 'b') { boardScore -= 100; }
                }
                if (boards.length == 0) {
                    boards.push([boardRep120.slice(), boardScore])
                }
                else {
                    for (let i = 0; i < boards.length; i++) {
                        if (boards[i][1] >= boardScore) {
                            boards.splice(i, 0, [boardRep120.slice(), boardScore])
                            pushedBoard = true
                            break
                        }
                    }
                    if (!pushedBoard) {
                        boards.push([boardRep120.slice(), boardScore])
                    }
                }
            }
            // console.log("BOARD ", boardRepresent)

            // Reset board
            boardRep120[pieceList[v].squareOn120] = pieceList[v].piece
            boardRep120[pieceList[v].validMoves[n]] = savePiece
            if (pieceList[v].type == "K") {
                if (pieceList[v].validMoves[n] == 93 && pieceList[v].squareOn120 == 95) { boardRep120[91] = 'r'; boardRep120[94] = ' ' }
                if (pieceList[v].validMoves[n] == 97 && pieceList[v].squareOn120 == 95) { boardRep120[98] = 'r'; boardRep120[96] = ' ' }
                if (pieceList[v].validMoves[n] == 23 && pieceList[v].squareOn120 == 25) { boardRep120[21] = 'R'; boardRep120[24] = ' ' }
                if (pieceList[v].validMoves[n] == 27 && pieceList[v].squareOn120 == 25) { boardRep120[28] = 'R'; boardRep120[26] = ' ' }
            }
        }
    }
    return boards
}

function GenerateCaptures(maxPlayer) {
    if (maxPlayer) {
        isWhite = "w"
    }
    else {
        isWhite = "b"
    }

    // GET BOARDS
    let savePiece
    let boards = []
    for (let v = 0; v < pieceList.length; v++) {
        pieceList[v].validMoves = []

        // Get piece moves
        if (pieceList[v].color == isWhite) {
            pieceList[v].validMoves = GetPieceCapture(pieceList[v])
            pieceList[v].validMoves = PieceMovesCheck(pieceList[v])
        }

        for (let n = 0; n < pieceList[v].validMoves.length; n++) {
            // Set up board
            boardRep120[pieceList[v].squareOn120] = " "
            savePiece = boardRep120[pieceList[v].validMoves[n]]
            boardRep120[pieceList[v].validMoves[n]] = pieceList[v].piece

            // Check if promoted
            fileRank = SqToRowFile(pieceList[v].validMoves[n])
            if (((isWhite1 == "w" && fileRank[0] == 0) || (isWhite1 == "b" && fileRank[0] == 7)) && pieceList[v].type == "P") {
                promoteTypes.forEach(newType => {
                    if (isWhite1 == "w") {
                        boardRep120[pieceList[v].validMoves[n]] = newType.toLowerCase()
                    }
                    else if (isWhite1 == "b") {
                        boardRep120[pieceList[v].validMoves[n]] = newType
                    }
                });
                pushedBoard = false
                boardScore = GetScoreBoard()
                if (boards.length == 0) {
                    boards.push([boardRep120.slice(), boardScore])
                }
                else {
                    for (let i = 0; i < boards.length; i++) {
                        if (boards[i][1] >= boardScore) {
                            boards.splice(i, 0, [boardRep120.slice(), boardScore])
                            pushedBoard = true
                            break
                        }
                    }
                    if (!pushedBoard) {
                        boards.push([boardRep120.slice(), boardScore])
                    }
                }
                // console.log("PROMOTING")
            }
            else {
                // Add board
                pushedBoard = false
                boardScore = GetScoreBoard()
                if (boards.length == 0) {
                    boards.push([boardRep120.slice(), boardScore])
                }
                else {
                    for (let i = 0; i < boards.length; i++) {
                        if (boards[i][1] >= boardScore) {
                            boards.splice(i, 0, [boardRep120.slice(), boardScore])
                            pushedBoard = true
                            break
                        }
                    }
                    if (!pushedBoard) {
                        boards.push([boardRep120.slice(), boardScore])
                    }
                }
            }
            // console.log("BOARD ", boardRepresent)

            // Reset board
            boardRep120[pieceList[v].squareOn120] = pieceList[v].piece
            boardRep120[pieceList[v].validMoves[n]] = savePiece
        }
    }
    return boards
}

function MiniMax(depth, alpha, beta, maxPlayer) {
    // console.log(depth)
    // If depth == 0, return the score and the number of the node on the tree
    if (depth == 0) {
        // let score = Quiescence(boardScore, alpha, beta, !maxPlayer)
        let score = boardScore
        // return score
        return [score, boardRep120]
    }
    let allMoves = GenerateMoves(maxPlayer)
    let origCastle = canCastle
    let origCastlePieces = castlePiecesMoved
    // console.log(depth)
    // console.log(allMoves)
    if (allMoves.length != 0) {
        if (maxPlayer) {
            let maxEvalVal = -Infinity
            let maxEval = []
            let evalBoard = 0
            let evalBoardLst
            for (let v = 0; v < allMoves.length; v++) {
                boardRep120 = allMoves[v][0].slice()
                boardScore = allMoves[v][1]
                ResetPieces()
                ResetVars()
                SetCastlePieces()
                UpdateCastling()
                // Reset()
                
                // Set evalBoard and check for mate
                isWhite = 'b'
                MateCheck()
                if (isMate == 1) { evalBoard = 100000 }
                else if (isMate == 2) { evalBoard = 0 }
                else if (isMate == 3) { evalBoard = -100000}
                else {
                    evalBoardLst = MiniMax(depth-1, alpha, beta, false)
                    if (evalBoardLst != undefined) {
                        evalBoard = evalBoardLst[0]
                    }
                    else {
                        evalBoard = -100000
                    }
                }

                canCastle = origCastle
                castlePiecesMoved = origCastlePieces

                // Replace best move
                if (evalBoard > maxEvalVal) {
                    maxEvalVal = evalBoard
                    maxEval = [allMoves[v][0].slice()]
                    PrintBoard(boardRep120)
                    // console.log(boardRep120)
                    console.log("SCORE W -", depth, evalBoard)
                }
                else if (evalBoard == maxEvalVal) {
                    maxEval.push(allMoves[v][0].slice())
                    PrintBoard(boardRep120)
                    // console.log(boardRep120)
                    console.log("SCORE W -", depth, evalBoard)
                }

                alpha = Math.max(alpha, evalBoard)
                if (beta <= alpha) {
                    console.log(boardRep120)
                    break
                }
            }

            return [maxEvalVal, maxEval]
        }
        else {
            let minEvalVal = +Infinity
            let minEval = []
            let evalBoard = 0
            for (let v = 0; v < allMoves.length; v++) {
                boardRep120 = allMoves[v][0].slice()
                boardScore = allMoves[v][1]
                ResetPieces()
                ResetVars()
                SetCastlePieces()
                UpdateCastling()
                // Reset()

                // Set evalBoard and check for mate
                isWhite = 'w'
                MateCheck()
                if (isMate == 1) { evalBoard = 100000 }
                else if (isMate == 2) { evalBoard = 0 }
                else if (isMate == 3) { evalBoard = -100000}
                else {
                    evalBoardLst = MiniMax(depth-1, alpha, beta, true)
                    if (evalBoardLst != undefined) {
                        evalBoard = evalBoardLst[0]
                    }
                    else {
                        evalBoard = 100000
                    }
                }

                canCastle = origCastle
                castlePiecesMoved = origCastlePieces

                // Replace best move
                if (evalBoard < minEvalVal) {
                    minEvalVal = evalBoard
                    minEval = [allMoves[v][0].slice()]
                    PrintBoard(boardRep120)
                    // console.log(boardRep120)
                    console.log("SCORE B -", depth, evalBoard)
                }
                else if (evalBoard == minEvalVal) {
                    minEval.push(allMoves[v][0].slice())
                    PrintBoard(boardRep120)
                    // console.log(boardRep120)
                    console.log("SCORE B -", depth, evalBoard)
                }

                beta = Math.min(beta, evalBoard)
                if (beta <= alpha) {
                    console.log(boardRep120)
                    break
                }
            }

            return [minEvalVal, minEval]
        }
    }
}

function Quiescence(boardScore, alpha, beta, maxPlayer, level = 0) { // search only captures until reach stable position
    let quiesceScore = boardScore
    if (quiesceScore >= beta) {
        return beta
    }
    if (alpha < quiesceScore) {
        alpha = quiesceScore
    }

    if (level == 5) {
        return alpha
    }

    let allCaptures = GenerateCaptures(maxPlayer)
    let oldBoardRep = boardRep120.slice()
    let score = 0
    for (let i = 0; i < allCaptures.length; i++) {
        boardRep120 = allCaptures[i][0].slice()

        // Get Quiescence and set score
        score = Quiescence(allCaptures[i][1], -alpha, -beta, !maxPlayer, level + 1)

        if (score >= beta) {
            boardRep120 = oldBoardRep.slice()
            return beta;
        }  
        if(score > alpha) {
            alpha = score;
        }
    }
    boardRep120 = oldBoardRep.slice()
    return alpha
}

function ComputerMove() {
    let passant = false
    let saveIsWhite = isWhite
    let isWhiteBool = true;
    if (isWhite == 'b') { isWhiteBool = false; }
    let saveCastlePieces = [...castlePiecesMoved]
    let saveIsInCheck = [K[0].isInCheck, K[1].isInCheck]

    let minimax = MiniMax(1, -Infinity, Infinity, isWhiteBool) // get best move (bottom of tree, last move) 
    let bestScore = minimax[0]
    let chosenMoves = minimax[1]
    let move = chosenMoves[Math.floor(Math.random() * chosenMoves.length)]
    console.log(bestScore)
    console.log(chosenMoves)
    console.log(move)

    // Move piece
    castlePiecesMoved = saveCastlePieces
    isWhite = saveIsWhite
    boardRep120 = move
    ResetPieces()
    Reset()
    K[0].isInCheck = saveIsInCheck[0]
    K[1].isInCheck = saveIsInCheck[1]

    // Update possible En Passant move
    for (let i = 31; i < 38; i++) {
        if (boardRep120[i] == 'P' && move[i] == ' ' && move[i + 20] == 'P') {
            possibleEnPassant = i + 20
            passant = true
            break
        }
    }
    if (!passant) { possibleEnPassant = 100 }

    // Change colors
    if (isWhite == 'w') { isWhite = 'b' }
    else if (isWhite == 'b') { isWhite = 'w' }

    // Change number of halfmoves and fullmoves
    if (isWhite == 'b') {
        numFullMoves++;
    }
    if (currentPiece.type != 'P') {
        numHalfMoves++
    }
    else {
        numHalfMoves = 0
    }
    AddMoveToList()

    // Check for mate or draw
    MateCheck()
    if (isMate == 1) { console.log("White wins") }
    if (isMate == 2) { console.log("Draw") }
    if (isMate == 3) { console.log("Black wins") }

    document.getElementById("thinkGIF").style = "display: none"
}
