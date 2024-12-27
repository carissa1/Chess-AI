function MiniMax(depth, alpha, beta, maxPlayer) {
    // console.log(depth)
    // If depth == 0, return the score and the number of the node on the tree
    if (depth == 0) {
        let score = Quiescence(boardScore, alpha, beta, maxPlayer)
        // let score = boardScore
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
                Reset()
                
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
                    // PrintBoard(boardRep120)
                    // if (maxEvalVal >= 100) { PrintBoard(boardRep120) }
                    // chars = ""
                    // for (var i = 0; i < (2-depth); i++) {
                    //     chars += "   "
                    // }
                    // console.log(chars + "SCORE W -", depth, evalBoard)
                }
                else if (evalBoard == maxEvalVal) {
                    maxEval.push(allMoves[v][0].slice())
                    // PrintBoard(boardRep120)
                    // if (maxEvalVal >= 100) { PrintBoard(boardRep120) }
                    // chars = ""
                    // for (var i = 0; i < (2-depth); i++) {
                    //     chars += "   "
                    // }
                    // console.log(chars + "SCORE W -", depth, evalBoard)
                }

                alpha = Math.max(alpha, evalBoard)
                if (beta <= alpha) {
                    // console.log(boardRep120)
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
                Reset()

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
                    // PrintBoard(boardRep120)
                    // chars = ""
                    // for (var i = 0; i < (2-depth); i++) {
                    //     chars += "   "
                    // }
                    // console.log(chars + "SCORE B -", depth, evalBoard)
                }
                else if (evalBoard == minEvalVal) {
                    minEval.push(allMoves[v][0].slice())
                    // PrintBoard(boardRep120)
                    // chars = ""
                    // for (var i = 0; i < (2-depth); i++) {
                    //     chars += "   "
                    // }
                    // console.log(chars + "SCORE B -", depth, evalBoard)
                }

                beta = Math.min(beta, evalBoard)
                if (beta <= alpha) {
                    // console.log(boardRep120)
                    break
                }
            }

            return [minEvalVal, minEval]
        }
    }
}

function Quiescence(boardScore, alpha, beta, maxPlayer, level = 0) { // search only captures until reach stable position
    let quiesceScore = boardScore

    // if (quiesceScore >= beta) {
    //     return beta
    // }
    if (alpha < quiesceScore) {
        alpha = quiesceScore
    }

    if (level == 5) {
        return alpha
    }

    let allCaptures = GenerateCaptures(maxPlayer)
    if (allCaptures.length == 0) {
        return quiesceScore
    }

    let oldBoardRep = boardRep120.slice()
    let score = 0
    for (let i = 0; i < allCaptures.length; i++) {
        boardRep120 = allCaptures[i][0].slice()

        // Get Quiescence and set score
        score = -Quiescence(allCaptures[i][1], -beta, -alpha, !maxPlayer, level + 1)

        if (score >= beta) {
            boardRep120 = oldBoardRep.slice()
            return beta;
        }  

        if (score > alpha) {
            alpha = score;
        }
    }
    // if (maxPlayer) {
    //     quiesceScore = Math.max(scores)
    // }
    // if (!maxPlayer) {
    //     quiesceScore = Math.min(scores)
    // }
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

    console.log("")
    for (var i = 0; i < chosenMoves.length; i++) {
        PrintBoard(chosenMoves[i])
        console.log("")
    }

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
