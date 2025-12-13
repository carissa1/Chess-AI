// STRICT MODE
'use strict';

function StartGame(){
    isWhite = 'w'

    numFullMoves = 0
    numHalfMoves = 0
    AddMoveToList()

    firstOnclick = true
    isMate = 0

    // Computer Playing?
    isComputer = true

    castlePiecesMoved = [false, false, false, false, false, false]
    SetCastlePieces()
    Reset()
}

function UserMove(clickedId) {
    // Run a move
    if (isMate == 0) {
        let sqNum = Sq64to120(parseInt(clickedId));
        if (firstOnclick) {
            if (boardRepresent[parseInt(clickedId)] != ' ') {
                firstOnclick = false 
                currentPiece = pieceSquares[sqNum]
                moveFromSq = currentPiece.squareOn
                movePiece = currentPiece.type
                isWhite1 = currentPiece.color
                WhichMovesValid()
            }
        }
        else {
            moveToSq = sqNum
            firstOnclick = true
            CheckMoveValid()
            // console.log(allMovesMade[allMovesMade.length - 1])
        }
    }
}

function WhichMovesValid() {
    // Find valid moves
    if (movePiece == "K") {
        currentPiece.validMoves = KingMoves(moveFromSq)
    }
    if (movePiece == "Q") {
        currentPiece.validMoves = BishopMoves(moveFromSq)
        currentPiece.validMoves = currentPiece.validMoves.concat(RookMoves(moveFromSq))
    }
    if (movePiece == "N") {
        currentPiece.validMoves = KnightMoves(moveFromSq)
    }
    if (movePiece == "B") {
        currentPiece.validMoves = BishopMoves(moveFromSq)
    }
    if (movePiece == "R") {
        currentPiece.validMoves = RookMoves(moveFromSq)
    }
    if (movePiece == "P") {
        currentPiece.validMoves = PawnMoves(moveFromSq)
    }

    // Is a king in check
    currentPiece.validMoves = PieceMovesCheck(currentPiece)
    // if (isWhite1 == "w") {
    //     K[0].IsKingInCheck()
    //     if (K[0].isInCheck) {
    //         currentPiece.validMoves = PieceMovesCheck(currentPiece)
    //     }
    // }
    // else {
    //     K[1].IsKingInCheck()
    //     if (K[1].isInCheck) {
    //         currentPiece.validMoves = PieceMovesCheck(currentPiece)
    //     }
    // }

    for (let i = 0; i < currentPiece.validMoves.length; i++) {
        squareTens = Math.floor((Sq120to64(currentPiece.validMoves[i]) / Math.pow(10, 1)) % 10).toString()
        squareOnes = Math.floor((Sq120to64(currentPiece.validMoves[i]) / Math.pow(10, 0)) % 10).toString()
        if (squareTens == "0") {
            pieceAdd = document.querySelector("#\\3" + squareOnes).classList.add("highlight")
        }
        else {
            pieceAdd = document.querySelector("#\\3" + squareTens + " " + squareOnes).classList.add("highlight")
        }
    }

    if(currentPiece.squareOn > 9){
        squareTens = Math.floor((currentPiece.squareOn / Math.pow(10, 1)) % 10).toString()
        squareOnes = Math.floor((currentPiece.squareOn / Math.pow(10, 0)) % 10).toString()
    }
    else{
        squareOnes = Math.floor((currentPiece.squareOn / Math.pow(10, 0)) % 10).toString()
    }
    if(currentPiece.squareOn < 10){
        pieceAdd = document.querySelector("#\\3" + squareOnes).classList.add("highlight")
    }
    else{
        pieceAdd = document.querySelector("#\\3" + squareTens + " " + squareOnes).classList.add("highlight")
    }
}

function CheckMoveValid() {
    let valid
    let fileRank

    // Remove highlights
    for (let i = 0; i < currentPiece.validMoves.length; i++) {
        squareTens = Math.floor((Sq120to64(currentPiece.validMoves[i]) / Math.pow(10, 1)) % 10).toString()
        squareOnes = Math.floor((Sq120to64(currentPiece.validMoves[i]) / Math.pow(10, 0)) % 10).toString()
        if (squareTens == "0") {
            pieceAdd = document.querySelector("#\\3" + squareOnes).classList.remove("highlight")
        }
        else {
            pieceAdd = document.querySelector("#\\3" + squareTens + " " + squareOnes).classList.remove("highlight")
        }
    }

    if(moveFromSq > 9){
        squareTens = Math.floor((moveFromSq / Math.pow(10, 1)) % 10).toString()
        squareOnes = Math.floor((moveFromSq / Math.pow(10, 0)) % 10).toString()
    }
    else{
        squareOnes = Math.floor((moveFromSq / Math.pow(10, 0)) % 10).toString()
    }
    if(moveFromSq < 10){
        pieceAdd = document.querySelector("#\\3" + squareOnes).classList.remove("highlight")
    }
    else{
        pieceAdd = document.querySelector("#\\3" + squareTens + " " + squareOnes).classList.remove("highlight")
    }

    // Valid move
    if (Sq64to120(moveFromSq) != moveToSq && isWhite == currentPiece.color) {
        for (let i = 0; i < currentPiece.validMoves.length; i++) {
            if (currentPiece.validMoves[i] == moveToSq) {
                valid = true
            }
        }
    }

    if (valid) {
        // Promotion
        if (isWhite == "w" && movePiece == "P") {
            fileRank = SqToRowFile(moveToSq)
            if (fileRank[0] == 0) {
                // promotingPiece = currentPiece.type.toString() + "[" + currentPiece.index.toString() + "]"
                document.getElementById("promoteToW").style = "display: flex"
                promoted = true
            }
        }
        else if (isWhite == "b" && movePiece == "P") {
            fileRank = SqToRowFile(moveToSq)
            if (fileRank[0] == 7) {
                // promotingPiece = currentPiece.type.toString() + "[" + currentPiece.index.toString() + "]"
                document.getElementById("promoteToB").style = "display: flex"
                promoted = true
            }
        }

        // Check for castling
        if (currentPiece.type == "K") {
            if (moveToSq == 93 && moveFromSq == 60) { boardRep120[91] = ' '; boardRep120[94] = 'r' }
            if (moveToSq == 97 && moveFromSq == 60) { boardRep120[98] = ' '; boardRep120[96] = 'r' }
            if (moveToSq == 23 && moveFromSq == 4) { boardRep120[21] = ' '; boardRep120[24] = 'R' }
            if (moveToSq == 27 && moveFromSq == 4) { boardRep120[28] = ' '; boardRep120[26] = 'R' }
        }

        // Capture piece
        // if (pieceSquares[moveToSq] != null) {
        //     for (let i = 0; i < pieceList.length; i++) {
        //         if (pieceList[i].squareOn120 == moveToSq) {
        //             pieceList.splice(i, 1)
        //             break
        //         }
        //     }
        // }

        // En Passant move
        if (Math.abs(moveToSq - possibleEnPassant) == 10 && currentPiece.type == 'P') {
            if (isWhite == 'w') { boardRep120[moveToSq + 10] = ' ' }
            else { boardRep120[moveToSq - 10] = ' ' }
        }

        // Update possible En Passant move
        if (Math.abs(Sq64to120(moveFromSq) - moveToSq) == 20) {
            if (isWhite == 'w') { possibleEnPassant = Sq64to120(moveFromSq) - 20 }
            else { possibleEnPassant = Sq64to120(moveFromSq) + 20 }
        }
        else {
            possibleEnPassant = 100
        }

        // Move piece
        boardRep120[moveToSq] = currentPiece.piece
        boardRep120[currentPiece.squareOn120] = ' '
        currentPiece.squareOn120 = moveToSq
        ResetPieces()
        Reset()

        // Change colors
        if (isWhite == 'w') { isWhite = 'b' }
        else if (isWhite == 'b') { isWhite = 'w' }

        // Change number of halfmoves and fullmoves
        if (isWhite == 'w') {
            numFullMoves++;
        }
        if (currentPiece.type != 'P') {
            numHalfMoves++
        }
        else {
            numHalfMoves = 0
        }
        AddMoveToList()

        // Possible check mate or draw
        MateCheck()
        if (isMate == 1) { console.log("White wins") }
        if (isMate == 2) { console.log("Draw") }
        if (isMate == 3) { console.log("Black wins") }

        if (isMate == 0 && !promoted && isWhite == 'b') {
            // document.getElementById("thinkGIF").style = "display: flex"
            setTimeout(ComputerMove, 100)
        }
    }
}
