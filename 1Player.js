// EXTRA CODE --> GIRLS CODE CHESS CLASS
// var whoWinning = 0
// CheckWin(whitePieces, blackPieces)
// // wP = white pieces, bP = blackPieces
// function CheckWin(wP, bP){
//     if(bP > wP){
//         whoWinning = -1
//     }
//     else if(wP > bP){
//         whoWinning = 1
//     }
//     else{
//         whoWinning = 0
//     }
// }

// STRICT MODE
'use strict';

function StartGame(){
    isWhite = "w"

    for (i = 0; i < pieceList.length; i++) {
        for (m = 0; m < pieceList[i].length; m++) {
            pieceList[i][m].number = numberForPieces
            pieceList[i][m].index = m
            pieceList[i][m].pieceNum = i
            numberForPieces ++
        }
    }
    
    for (i = 1; i < 65; i++) {
        addedPiece = false
        for (m = 0; m < pieceList.length; m++) {
            for (n = 0; n < pieceList[m].length; n++) {
                if (pieceList[m][n].squareOn == i) {
                    addedPiece = true
                    if(pieceList[m][n].color == "w") {
                        boardRepresent.push(pieceList[m][n].type.toLowerCase())
                    }
                    else {
                        boardRepresent.push(pieceList[m][n].type)
                    }
                    
                    // boardRepresent2.push(pieceList[m][n].color + pieceList[m][n].type)
                }
            }
        }
        if (!addedPiece) {
            boardRepresent.push(" ")
            // boardRepresent2.push(" ")
        }
    }


    numFullMoves = 0
    numHalfMoves = 0

    AddMoveToList()

    for (i = 0; i < 6; i++) {
        castlePiecesMoved.push(false)
    }

    // for (i = 0; i < pieceList.length; i++) {
    //     for (m = 0; m < pieceList[i].length; m++) {
    //         startSq.push(pieceList[i][m].squareOn)
    //     }
    // }

    //boardRepresent = ReadFENString('3k4/R5pp/2p1p2q/8/4N2p/4PP2/4K2P/8 w - - 0 2')

    Reset()
}

function ClearBoard(){
    // CLEAR THE BOARD
    for(m = 1; m < 65; m++){
        square = m
        // SET SQUARE-TENS AND SQUARE-ONES
        if(square > 9){
            squareTens = Math.floor((square / Math.pow(10, 1)) % 10).toString()
            squareOnes = Math.floor((square / Math.pow(10, 0)) % 10).toString()
        }
        else{
            squareOnes = Math.floor((square / Math.pow(10, 0)) % 10).toString()
        }
        // CLEAR BOARD
        if(square < 10){
            pieceAdd = document.querySelector("#\\3" + squareOnes).querySelector(".pieces")
            $(pieceAdd).attr("class", "pieces")
        }
        else{
            pieceAdd = document.querySelector("#\\3" + squareTens + " " + squareOnes).querySelector(".pieces")
            $(pieceAdd).attr("class", "pieces")
        }
        
    }
}

function ResetPieces() {
    // K = []
    Q = []
    B = []
    N = []
    R = []
    P = []

    for (let b = 1; b < 65; b++) {
        // console.log(b, boardRepresent[b-1])
        if (boardRepresent[b-1] == "k" && K[0].squareOn != b) {
            K[0].squareOn = b
        }
        if (boardRepresent[b-1] == "K" && K[1].squareOn != b) {
            K[1].squareOn = b
        }
        if (boardRepresent[b-1] == "q") {
            Q.push(new Piece("w", b, "Q"))
        }
        if (boardRepresent[b-1] == "Q") {
            Q.push(new Piece("b", b, "Q"))
        }
        if (boardRepresent[b-1] == "b") {
            B.push(new Piece("w", b, "B"))
        }
        if (boardRepresent[b-1] == "B") {
            B.push(new Piece("b", b, "B"))
        }
        if (boardRepresent[b-1] == "n") {
            N.push(new Piece("w", b, "N"))
        }
        if (boardRepresent[b-1] == "N") {
            N.push(new Piece("b", b, "N"))
        }
        if (boardRepresent[b-1] == "r") {
            R.push(new Piece("w", b, "R"))
        }
        if (boardRepresent[b-1] == "R") {
            R.push(new Piece("b", b, "R"))
        }
        if (boardRepresent[b-1] == "p") {
            P.push(new Piece("w", b, "P"))
        }
        if (boardRepresent[b-1] == "P") {
            P.push(new Piece("b", b, "P"))
        }
    }

    pieceList = [K, Q, B, N, R, P]
    // console.log(pieceList)
    ResetIndex()
}

function Reset() {
    // Clear the board
    ClearBoard()

    // Reset pieces
    ResetPieces()

    // Place pieces on the board
    for(i = 0; i < pieceList.length; i++) {
        for (m = 0; m < pieceList[i].length; m++) {
            square = pieceList[i][m]
        
            // SET SQUARE-TENS AND SQUARE-ONES
            if(square.squareOn > 9){
                squareTens = Math.floor((square.squareOn / Math.pow(10, 1)) % 10).toString()
                squareOnes = Math.floor((square.squareOn / Math.pow(10, 0)) % 10).toString()
            }
            else{
                squareOnes = Math.floor((square.squareOn / Math.pow(10, 0)) % 10).toString()
            }

            // SET PIECES UP
            if(square.squareOn < 10){
                document.querySelector("#\\3" + squareOnes).querySelector(".pieces").classList.add(square.color + square.type)
            }
            else{
                document.querySelector("#\\3" + squareTens + " " + squareOnes).querySelector(".pieces").classList.add(square.color + square.type)
            }
        }
    }
    // if (!found && boardRepresent[b-1].toUpperCase() == boardRepresent[b-1]) {
    //     eval(boardRepresent[b-1]).push(new Piece("b", b, boardRepresent[b-1]))
    // }
    // else if (!found && boardRepresent[b-1].toUpperCase() != boardRepresent[b-1]) {
    //     eval(boardRepresent[b-1].toUpperCase()).push(new Piece("w", b, boardRepresent[b-1].toUpperCase()))
    // }
}

function UserMove(clickedId) {
    // Run a move
    if (firstOnclick) {
        selectingPiece = false
        for (i = 0; i < pieceList.length; i++) {
            for (m = 0; m < pieceList[i].length; m++) {
                if (pieceList[i][m].squareOn == parseInt(clickedId) && pieceList[i][m]) {
                    selectingPiece = true
                    currentPiece = pieceList[i][m]
                    // pieceList[i][m].squareOn2[1] = true
                }
                // pieceList[i][m].squareOn2[0] = pieceList[i][m].squareOn
            }
        }
        if (selectingPiece) {
            firstOnclick = false
            moveFromSq = currentPiece.squareOn
            // for(n = 0; n < pieceList.length; n++) {
            //     pieceCheck = pieceList[n]
            //     if(boardRepresent[moveFromSq-1] == pieceCheck) {
            //         movePiece = pieceCheck
            //     }
            // }
            movePiece = currentPiece.type
            isWhite1 = currentPiece.color
    
            WhichMovesValid()
        }
    }
    else {
        moveToSq = parseInt(clickedId)
        ClearBoard()
        firstOnclick = true
        CheckMoveValid()
    }
}

function WhichMovesValid() {
    // Reset variables
    valid = false
    valid2 = false
    validMoves = []
    validMoves2 = []
    validMoves3 = []
    validMoves4 = []
    attackMoves = []
    attackMoves2 = []
    validMovesAdd = false
    correctMoves = []
    piecesStopMate = false
    isComputerMove = false

    // Can a king castle
    CanCastle()

    // run function to see where everything can attack
    AttackingMoves()

    // Is a king in check
    if (isWhite1 == "w") {
        K[0].IsKingInCheck(attackMoves)
    }
    else {
        K[1].IsKingInCheck(attackMoves)
    }

    // Resets all valid moves
    ResetAllValidMoves("validMoves")
    ResetAllValidMoves("validMoves2")
    
    // where can the piece move
    if(currentPiece.type == "K") {
        // castling = true
        KingMoves(moveFromSq)
        // RookMoves(validMoves)
    }
    else if(currentPiece.type == "Q") {
        BishopMoves(moveFromSq)
        RookMoves(moveFromSq)
    }
    else if(currentPiece.type == "B") {
        BishopMoves(moveFromSq)
    }
    else if(currentPiece.type == "N") {
        KnightMoves(moveFromSq)
    }
    else if(currentPiece.type == "R") {
        RookMoves(moveFromSq)
    }
    else if(currentPiece.type == "P") {
        PawnMoves(moveFromSq)
    }

    // Add valid moves to the piece that is moving
    currentPiece.validMoves = currentPiece.validMoves.concat(validMoves)
    if (currentPiece.type == "P") {
        currentPiece.validMoves = currentPiece.validMoves.concat(validMoves2)
    }

    // make sure all moves are valid
    currentPiece.validMoves = currentPiece.FilterNonSquaresFromMoves(currentPiece.validMoves)
    currentPiece.validMoves = currentPiece.RemoveSameColorPiecesFromMoves(currentPiece.validMoves)

    if (currentPiece.type == "K") {
        currentPiece.validMoves = KingMovesCheck(currentPiece)
    }
    else {
        currentPiece.validMoves = PiecesMovesCheck(currentPiece)
    }

    for (i = 0; i < currentPiece.validMoves.length; i++) {
        if(currentPiece.validMoves[i] > 9){
            squareTens = Math.floor((currentPiece.validMoves[i] / Math.pow(10, 1)) % 10).toString()
            squareOnes = Math.floor((currentPiece.validMoves[i] / Math.pow(10, 0)) % 10).toString()
        }
        else{
            squareOnes = Math.floor((currentPiece.validMoves[i] / Math.pow(10, 0)) % 10).toString()
        }
        if(currentPiece.validMoves[i] < 10){
            pieceAdd = document.querySelector("#\\3" + squareOnes).classList.add("highlight")
        }
        else{
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

    // // resets whereArePieces
    // ResetWhereArePieces()
}

function CheckMoveValid() {
    castleAdd = false
    valid = false
    valid2 = false

    // PROMOTION
    if (isWhite == "w" && movePiece == "P" && !isComputerMove) {
        fileRank = SquareToFileRank(moveToSq)
        if (fileRank[0] == 1) {
            // promotingPiece = currentPiece.type.toString() + "[" + currentPiece.index.toString() + "]"
            document.getElementById("promoteToW").style = "display: flex"
            promoted = false
        }
    }
    else if (isWhite == "b" && movePiece == "P" && !isComputerMove) {
        fileRank = SquareToFileRank(moveToSq)
        if (fileRank[0] == 8) {
            // promotingPiece = currentPiece.type.toString() + "[" + currentPiece.index.toString() + "]"
            document.getElementById("promoteToB").style = "display: flex"
            promoted = false
        }
    }

    // VALID MOVES
    for (i = 0; i < currentPiece.validMoves.length; i++) {
        if(currentPiece.validMoves[i] == moveToSq) {
            valid = true
        }
        // else if(validMoves[i] != moveToSq && valid == false) {
        //     valid = false
        // }
    }

    // CASTLING
    if (movePiece == "K") {
        //console.log(canCastle)
        for (i = 0; i < currentPiece.validMoves.length; i++) {
            for (m = 0; m < R.length; m++) {
                //console.log(currentPiece.validMoves[i])
                // console.log(canCastle.wK)
                //console.log(R[m].squareOn)
                //console.log(currentPiece.validMoves[i] == 63 && isWhite1 == "w" && canCastle.wK != "" && R[m].squareOn == 64)
                //console.log(isWhite1)
                if (currentPiece.validMoves[i] == 59 && isWhite1 == "w" && canCastle.wQ != "" && canCastle.wQ != "-" && R[m].squareOn == 57) {
                    boardRepresent[56] = ' '
                    boardRepresent[59] = 'r'
                }
                if (currentPiece.validMoves[i] == 63 && isWhite1 == "w" && canCastle.wK != "" && R[m].squareOn == 64) {
                    boardRepresent[63] = ' '
                    boardRepresent[61] = 'r'
                }
                if (currentPiece.validMoves[i] == 3 && isWhite1 == "b" && canCastle.bQ != "" && canCastle.bQ != "-" && R[m].squareOn == 1) {
                    boardRepresent[0] = ' '
                    boardRepresent[3] = 'R'
                }
                if (currentPiece.validMoves[i] == 7 && isWhite1 == "b" && canCastle.bK != "" && R[m].squareOn == 8) {
                    boardRepresent[7] = ' '
                    boardRepresent[5] = 'R'
                }
                // if (isWhite1 == "w" && (currentPiece.validMoves[i] == 3 || currentPiece.validMoves[i] == 7)) {
                //     if (canCastle.wQ != "" && canCastle.wQ != "-") {
                //         R[0].squareOn = R[0].squareOn+3
                        
                //     }
                //     if (canCastle.wK != "") {
                //         R[1].squareOn = R[1].squareOn-2
                //     }
                // }
                // if (isWhite1 == "b" && (currentPiece.validMoves[i] == 3 || currentPiece.validMoves[i] == 7)) {
                //     if (canCastle.bQ != "" && canCastle.bQ != "-" && currentPiece.validMoves[i] == 3) {
                //         R[2].squareOn = R[2].squareOn+3
                //     }
                //     else if (canCastle.bK != "" && currentPiece.validMoves[i] == 7) {
                //         R[3].squareOn = R[3].squareOn-2
                //     }
                // }
            }
        }
    }

    if(isWhite != isWhite1) {
        valid = false
    }

    if (moveFromSq == moveToSq) {
        valid = false
    }

    for (i = 0; i < currentPiece.validMoves.length; i++) {
        if(currentPiece.validMoves[i] > 9){
            squareTens = Math.floor((currentPiece.validMoves[i] / Math.pow(10, 1)) % 10).toString()
            squareOnes = Math.floor((currentPiece.validMoves[i] / Math.pow(10, 0)) % 10).toString()
        }
        else{
            squareOnes = Math.floor((currentPiece.validMoves[i] / Math.pow(10, 0)) % 10).toString()
        }
        if(currentPiece.validMoves[i] < 10){
            pieceAdd = document.querySelector("#\\3" + squareOnes).classList.remove("highlight")
        }
        else{
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

    if (isComputerMove && promoted) {
        valid = true
    }
    else if (isComputerMove) {
        valid = false
    }

    //  && (promoted || currentPiece === eval(promotingPiece))
    if(valid == true){
        if (boardRepresent[moveToSq-1] != " ") {
            for (i = 0; i < pieceList.length; i++) {
                for (m = 0; m < pieceList[i].length; m++) {
                    if (pieceList[i][m].squareOn == moveToSq && pieceList[i][m].number != currentPiece.number) {
                        pieceList[i].splice(m, 1)
                        numHalfMoves = -1
                        ResetIndex()
                        break
                    }
                }
            }
        }

        boardRepresent[moveFromSq-1] = " "
        currentPiece.squareOn = moveToSq

        console.log(isWhite, isComputerMove)
        if (isComputerMove) {
            isComputerMove = false
        }
        else {
            isComputerMove = true
        }

        if (movePiece == "P") {
            numHalfMoves = -1
        }

        if (isWhite == "w") {
            if (moveToSq == possibleEnPassant[0][0]-8) {
                P.splice(possibleEnPassant[0][1].index, 1)
            }
        }
        else {
            if (moveToSq == possibleEnPassant[0][0]+8) {
                P.splice(possibleEnPassant[0][1].index, 1)
            }
        }

        if(isWhite == "w") {
            boardRepresent[moveToSq-1] = currentPiece.type.toLowerCase()
            // boardRepresent2 = JSON.parse(JSON.stringify(boardRepresent))

            isWhite = "b"
            numFullMoves++ // one full move has been made (w and b)
            
            if (boardRepresent[60] != "k") {
                castlePiecesMoved[0] = true
            }
            if (boardRepresent[63] != "r") {
                castlePiecesMoved[3] = true // kingside rook
            }
            if (boardRepresent[56] != "r") {
                castlePiecesMoved[2] = true // queenside rook
            }
        }
        else {
            boardRepresent[moveToSq-1] = currentPiece.type
            // boardRepresent2 = JSON.parse(JSON.stringify(boardRepresent))
                        
            isWhite = "w"
            numFullMoves++ // one full move has been made (w and b)

            if (boardRepresent[4] != "K") {
                castlePiecesMoved[1] = true
            }
            if (boardRepresent[7] != "R") {
                castlePiecesMoved[5] = true // kingside rook
            }
            if (boardRepresent[0] != "R") {
                castlePiecesMoved[4] = true // queenside rook
            }
        }

        possibleEnPassant[0] = possibleEnPassant[1].slice()
        possibleEnPassant[1] = ["-", "-"]

        if (isWhite == "w") {
            isWhite1 = "b"

            // secondIsInCheck = true
            AttackingMoves()
            // secondIsInCheck = false

            isWhite1 = "w"

            AttackingMoves()

            K[0].IsKingInCheck(attackMoves)
            // KingMoves(K[0].squareOn)
            // K[0].validMoves = validMoves
            // K[0].validMoves = K[0].FilterNonSquaresFromMoves(K[0].validMoves)
            // K[0].validMoves = K[0].RemoveSameColorPiecesFromMoves(K[0].validMoves)
            K[0].validMoves = KingMovesCheck(K[0])

            for (e = 1; e < pieceList.length; e++) {
                for (g = 0; g < pieceList[e].length; g++) {
                    if (pieceList[e][g].color == "w") {
                        pieceList[e][g].validMoves = PiecesMovesCheck(pieceList[e][g])
                        if (pieceList[e][g].validMoves.length != 0) {
                            if (pieceList[e][g].validMoves[0] != pieceList[e][g].squareOn) {
                                piecesStopMate = true
                            }
                        }
                    }
                }
            }

            isMate = K[0].validMoves.length == 0 && !piecesStopMate
            // PROMOTION
            if (movePiece == "P" && !promoted) {
                promotingPiece = currentPiece.type.toString() + "[" + currentPiece.index.toString() + "]"
            }
        }
        else {
            isWhite1 = "w"

            // secondIsInCheck = true
            AttackingMoves()
            // secondIsInCheck = false

            isWhite1 = "b"

            AttackingMoves()

            K[1].IsKingInCheck(attackMoves2)
            // KingMoves(K[1].squareOn)
            // K[1].validMoves = validMoves
            // K[1].validMoves = K[1].FilterNonSquaresFromMoves(K[1].validMoves)
            // K[1].validMoves = K[1].RemoveSameColorPiecesFromMoves(K[1].validMoves)
            K[1].validMoves = KingMovesCheck(K[1])

            for (e = 1; e < pieceList.length; e++) {
                for (g = 0; g < pieceList[e].length; g++) {
                    if (pieceList[e][g].color == "b") {
                        pieceList[e][g].validMoves = PiecesMovesCheck(pieceList[e][g])
                        if (pieceList[e][g].validMoves.length != 0) {
                            if (pieceList[e][g].validMoves[0] != pieceList[e][g].squareOn) {
                                piecesStopMate = true
                            }
                        }
                    }
                }
            }

            isMate = K[1].validMoves.length == 0 && !piecesStopMate
            // PROMOTION
            if (movePiece == "P" && !promoted) {
                promotingPiece = currentPiece.type.toString() + "[" + currentPiece.index.toString() + "]"
            }
        }

        if (!isMate) {
            // Can a king castle
            CanCastle()

            // Reset isInCheck values
            K[0].isInCheck = false
            K[1].isInCheck = false

            // adds the move to the list of moves
            numHalfMoves++ // add to the number of half moves since a capture or a pawn move
            AddMoveToList()

            // Reset all valid moves
            ResetAllValidMoves("validMoves")
            ResetAllValidMoves("validMoves2")
            // Resets the board on the player's/players' screen
            Reset()

            if (isComputerMove) {
                document.getElementById("thinkGIF").style = "display: flex"
                setTimeout(() => {
                    TakeComputerTurn(promoted)
                }, 50);
            }
        }
        else {
            if (K[0].isInCheck || K[1].isInCheck) {
                isMate = "mate"
            }
            else {
                isMate = "draw"
            }
            console.log(isMate)
        }
    }
    else{
        possibleEnPassant[1] = ["-", "-"]

        // Reset all valid moves
        ResetAllValidMoves("validMoves")
        ResetAllValidMoves("validMoves2")
        // Resets the board on the player's/players' screen
        Reset()
    }
}

function AttackingMoves() {
    if (secondIsInCheck) {
        attackMoves2 = []
        
    }
    else {
        attackMoves = []
    }

    saveIsWhiteValue = isWhite
    saveIsWhite1Value = isWhite1

    if (isWhite1 == "w") {
        isWhite1 = "b"
        isWhite = "b"
    }
    else {
        isWhite1 = "w"
        isWhite = "w"
    }

    for (k = 0; k < pieceList.length; k++) {
        for (h = 0; h < pieceList[k].length; h++) {
            if (isWhite1 == pieceList[k][h].color) {
                if (pieceList[k][h].type == "K") {
                    KingMoves(pieceList[k][h].squareOn)
                }
                else if (pieceList[k][h].type == "Q") {
                    RookMoves(pieceList[k][h].squareOn)
                    if (secondIsInCheck) {
                        pieceList[k][h].validMoves2 = pieceList[k][h].validMoves2.concat(validMoves3)

                        validMoves3 = []
                    }
                    else {
                        pieceList[k][h].validMoves = pieceList[k][h].validMoves.concat(validMoves)
                        // console.log(pieceList[k][h].validMoves)

                        validMoves = []
                    }

                    BishopMoves(pieceList[k][h].squareOn)
                    // console.log("Q")
                }
                else if (pieceList[k][h].type == "B") {
                    BishopMoves(pieceList[k][h].squareOn)
                    // console.log("B")
                }
                else if (pieceList[k][h].type == "N") {
                    KnightMoves(pieceList[k][h].squareOn)
                    // console.log("N")
                }
                else if (pieceList[k][h].type == "R") {
                    RookMoves(pieceList[k][h].squareOn)
                    // console.log("R")
                }
                else if (pieceList[k][h].type == "P") {
                    PawnMoves(pieceList[k][h].squareOn)
                    // console.log("P")
                }
                if (secondIsInCheck) {
                    pieceList[k][h].validMoves2 = pieceList[k][h].validMoves2.concat(validMoves3)
                    if (pieceList[k][h].type == "P") {
                        pieceList[k][h].validMoves2 = pieceList[k][h].validMoves2.concat(validMoves4)
                    }

                    pieceList[k][h].validMoves2 = pieceList[k][h].FilterNonSquaresFromMoves(pieceList[k][h].validMoves2)
                    pieceList[k][h].validMoves2 = pieceList[k][h].RemoveSameColorPiecesFromMoves(pieceList[k][h].validMoves2)

                    validMoves3 = []

                    // if ((pieceList[k][h].validMoves2.includes(K[0].squareOn) && isWhite == "b") || (pieceList[k][h].validMoves2.includes(K[1].squareOn) && isWhite == "b")) {
                    //     pieceCheckingK = pieceList[k][h]
                    // }
                }
                else {
                    pieceList[k][h].validMoves = pieceList[k][h].validMoves.concat(validMoves)
                    if (pieceList[k][h].type == "P") {
                        pieceList[k][h].validMoves = pieceList[k][h].validMoves.concat(validMoves2)
                    }
                    pieceList[k][h].validMoves = pieceList[k][h].FilterNonSquaresFromMoves(pieceList[k][h].validMoves)
                    pieceList[k][h].validMoves = pieceList[k][h].RemoveSameColorPiecesFromMoves(pieceList[k][h].validMoves)
                    // console.log(pieceList[k][h].validMoves)

                    validMoves = []

                    // if ((pieceList[k][h].validMoves.includes(K[0].squareOn) && isWhite == "b") || (pieceList[k][h].validMoves.includes(K[1].squareOn) && isWhite == "w")) {
                    //     pieceCheckingK = pieceList[k][h]
                    // }
                }

                // console.log(window[whereIsPiece[k]][h]+1)
                // console.log(attackMoves)
                // console.log(validMoves3)
                // console.log(validMoves4)
                if (secondIsInCheck) {
                    validMoves3 = []
                    validMoves4 = []
                }
                else {
                    validMoves = []
                    validMoves2 = []
                }
            }
        }
    }

    if (changeSquareOn) {
        // add all the squares the pieces are on
        for (i = 0; i < pieceList.length; i++) {
            for (m = 0; m < pieceList[i].length; m++) {
                if (secondIsInCheck) {
                    if (isWhite1 == "w" && pieceList[i][m].color == "w") {
                        pieceList[i][m].validMoves2.push(pieceList[i][m].squareOn)
                    }
                    else if (isWhite1 == "b" && pieceList[i][m].color == "b") {
                        pieceList[i][m].validMoves2.push(pieceList[i][m].squareOn)
                    }
                }
                else {
                    if (isWhite1 == "w" && pieceList[i][m].color == "w") {
                        pieceList[i][m].validMoves.push(pieceList[i][m].squareOn)
                    }
                    else if (isWhite1 == "b" && pieceList[i][m].color == "b") {
                        pieceList[i][m].validMoves.push(pieceList[i][m].squareOn)
                    }
                }
            }
        }
    }
    else {
        // remove all the squares the pieces are on
        for (i = 0; i < pieceList.length; i++) {
            for (m = 0; m < pieceList[i].length; m++) {
                if (secondIsInCheck) {
                    if (isWhite1 == "w" && pieceList[i][m].color == "w" && pieceList[i][m].validMoves2.includes(pieceList[i][m].squareOn)) {
                        pieceList[i][m].validMoves2.splice(pieceList[i][m].validMoves2.indexOf(pieceList[i][m].squareOn), 1)
                    }
                    else if (isWhite1 == "b" && pieceList[i][m].color == "b" && pieceList[i][m].validMoves2.includes(pieceList[i][m].squareOn)) {
                        pieceList[i][m].validMoves2.splice(pieceList[i][m].validMoves2.indexOf(pieceList[i][m].squareOn), 1)
                    }
                }
                else {
                    if (isWhite1 == "w" && pieceList[i][m].color == "w" && pieceList[i][m].validMoves.includes(pieceList[i][m].squareOn)) {
                        pieceList[i][m].validMoves.splice(pieceList[i][m].validMoves.indexOf(pieceList[i][m].squareOn), 1)
                    }
                    else if (isWhite1 == "b" && pieceList[i][m].color == "b" && pieceList[i][m].validMoves.includes(pieceList[i][m].squareOn)) {
                        pieceList[i][m].validMoves.splice(pieceList[i][m].validMoves.indexOf(pieceList[i][m].squareOn), 1)
                    }
                }
            }
        }
    }

    for (i = 0; i < pieceList.length; i++) {
        for (m = 0; m < pieceList[i].length; m++) {
            if (secondIsInCheck) {
                attackMoves2 = attackMoves2.concat(pieceList[i][m].validMoves2)
            }
            else {
                attackMoves =  attackMoves.concat(pieceList[i][m].validMoves)
            }
        }
    }

    // Resets the isWhite1 and isWhite values to what they originally were
    isWhite1 = saveIsWhite1Value
    isWhite = saveIsWhiteValue
}
