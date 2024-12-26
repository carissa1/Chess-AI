function KingMoves(sq) {
    let validMoves = []
    let sq120 = Sq64to120(sq)
    let newSq
    for (let i = 0; i < KDir.length; i++) {
        newSq = sq120 + KDir[i]
        if (board[newSq] != SQUARES.OFFBOARD) {
            if (boardRep120[newSq] == ' ') {
                validMoves.push(newSq)
            }
            else if (pieceSquares[newSq].color != pieceSquares[sq120].color) {
                validMoves.push(newSq)
            }
        }
    }
    
    if (canCastle.wK != '' && !K[0].isInCheck && isWhite == 'w') {
        validMoves.push(sq120 + 2)
    }
    if (canCastle.wQ != '' && !K[0].isInCheck && isWhite == 'w') {
        validMoves.push(sq120 - 2)
    }
    if (canCastle.bK != '' && !K[1].isInCheck && isWhite == 'b') {
        validMoves.push(sq120 + 2)
    }
    if (canCastle.bQ != '' && !K[1].isInCheck && isWhite == 'b') {
        validMoves.push(sq120 - 2)
    }

    return validMoves
}

function BishopMoves(sq) {
    let validMoves = [];
    let sq120 = Sq64to120(sq)
    let newSq
    for (let i = 0; i < BDir.length; i++) {
        newSq = sq120 + BDir[i];
        while (board[newSq] != SQUARES.OFFBOARD && boardRep120[newSq] == ' ') {
            validMoves.push(newSq);
            newSq += BDir[i];
        }
        if (board[newSq] != SQUARES.OFFBOARD && boardRep120[newSq] != ' ') {
            if (pieceSquares[newSq].color != pieceSquares[sq120].color) {
                validMoves.push(newSq);
            }
        }
    }

    return validMoves
}

function KnightMoves(sq) {
    let validMoves = []
    let sq120 = Sq64to120(sq)
    let newSq
    for (let i = 0; i < NDir.length; i++) {
        newSq = sq120 + NDir[i]
        if (board[newSq] != SQUARES.OFFBOARD) {
            if (boardRep120[newSq] == ' ') {
                validMoves.push(newSq)
            }
            else if (pieceSquares[newSq].color != pieceSquares[sq120].color) {
                validMoves.push(newSq)
            }
        }
    }

    return validMoves
}

function RookMoves(sq) {
    let validMoves = [];
    let sq120 = Sq64to120(sq)
    let newSq
    for (let i = 0; i < RDir.length; i++) {
        newSq = sq120 + RDir[i];
        while (board[newSq] != SQUARES.OFFBOARD && boardRep120[newSq] == ' ') {
            validMoves.push(newSq);
            newSq += RDir[i];
        }
        if (board[newSq] != SQUARES.OFFBOARD && boardRep120[newSq] != ' ') {
            if (pieceSquares[newSq].color != pieceSquares[sq120].color) {
                validMoves.push(newSq);
            }
        }
    }

    return validMoves
}

function PawnMoves(sq) {
    let sq120 = Sq64to120(sq)
    let rowFile = SqToRowFile(sq120)
    let r2 = rowFile[0]
    // console.log("row: ", r2)
    let validMoves = []
    let validMoves2 = []
    if(pieceSquares[sq120].color == 'w') {
        validMoves = [sq120-10, sq120-20] // move forward
        validMoves2 = [sq120-9, sq120-11] // take a piece
        
        // Normal move
        if (boardRep120[validMoves[0]] != ' ') {
            validMoves = []
        }
        // Starting double space move
        else if ((r2 != 6) || (boardRep120[validMoves[1]] != ' ')) {
            validMoves.pop()
        }

        // Captures and EnPassant
        correctMoves = validMoves2.slice()
        for (let i = 0; i < validMoves2.length; i++) { // Check if there is a piece to take
            if (possibleEnPassant == (validMoves2[i] + 10) && boardRep120[validMoves2[i]] == '_') {
                correctMoves.splice(correctMoves.indexOf(validMoves2[i]), 1)
            }
            else if (possibleEnPassant != (validMoves2[i] + 10) && (boardRep120[validMoves2[i]] == ' ' || boardRep120[validMoves2[i]] == '_')) {
                correctMoves.splice(correctMoves.indexOf(validMoves2[i]), 1)
            }
            else if (boardRep120[validMoves2[i]] != ' ') {
                if (pieceSquares[validMoves2[i]].color == pieceSquares[sq120].color) {
                    correctMoves.splice(correctMoves.indexOf(validMoves2[i]), 1)
                }
            }
        }
        validMoves = validMoves.concat(correctMoves.slice())

        // Update possible En Passant move
        if (validMoves[1] == (sq120 - 20)) {
            possibleEnPassant = sq120 - 20
        }
    }
    else if(pieceSquares[sq120].color == 'b') {
        validMoves = [sq120+10, sq120+20] // move forward
        validMoves2 = [sq120+9, sq120+11] // take a piece

        // Normal move
        if (boardRep120[validMoves[0]] != ' ') {
            validMoves = []
        }
        // Starting double space move
        else if ((r2 != 1) || (boardRep120[validMoves[1]] != ' ')) {
            validMoves.pop()
        }

        // Captures and En Passant
        correctMoves = validMoves2.slice()
        for (let i = 0; i < validMoves2.length; i++) { // Check if there is a piece to take
            if (possibleEnPassant == (validMoves2[i] - 10) && boardRep120[validMoves2[i]] == '_') {
                correctMoves.splice(correctMoves.indexOf(validMoves2[i]), 1)
            }
            else if (possibleEnPassant != (validMoves2[i] - 10) && (boardRep120[validMoves2[i]] == ' ' || boardRep120[validMoves2[i]] == '_')) {
                correctMoves.splice(correctMoves.indexOf(validMoves2[i]), 1)
            }
            else if (boardRep120[validMoves2[i]] != ' ') {
                if (pieceSquares[validMoves2[i]].color == pieceSquares[sq120].color) {
                    correctMoves.splice(correctMoves.indexOf(validMoves2[i]), 1)
                }
            }
        }
        validMoves = validMoves.concat(correctMoves.slice())

        // Update possible En Passant move
        if (validMoves[1] == (sq120 + 20)) {
            possibleEnPassant = sq120 + 20
        }
    }

    return validMoves;
}

function PieceMovesCheck(piece) {
    let deletedPiece
    // let index
    // let fromSq
    let correctMoves = piece.validMoves.slice()
    for (let i = 0; i < piece.validMoves.length; i++) {
        // moveToSq = piece.validMoves[i]
        // fromSq = piece.squareOn120
        // index = -1
        // if (boardRep120[moveToSq] != null) {
        //     for (let indx = 0; indx < pieceList.length; indx++) {
        //         if (pieceList[indx].squareOn120 == moveToSq) {
        //             deletedPiece = pieceList[indx]
        //             index = indx
        //             pieceList.splice(indx, 1)
        //             break
        //         }
        //     }
        // }      

        // boardRepresent[piece.squareOn] = " "
        // boardRep120[piece.squareOn120] = " "
        // piece.squareOn120 = piece.validMoves[i]
        // ResetVars()
        saveSq = piece.squareOn120
        piece.squareOn120 = piece.validMoves[i]
        deletedPiece = boardRep120[piece.validMoves[i]]
        boardRep120[saveSq] = " "
        boardRep120[piece.validMoves[i]] = piece.piece

        if (piece.type == "K") {
            piece.IsKingInCheck()
            if (piece.isInCheck) {
                correctMoves.splice(correctMoves.indexOf(piece.validMoves[i]), 1)
            }
        }
        else {
            if (isWhite == "w") {
                K[0].IsKingInCheck()
                if (K[0].isInCheck) {
                    correctMoves.splice(correctMoves.indexOf(piece.validMoves[i]), 1)
                }
            }
            if (isWhite == "b") {
                K[1].IsKingInCheck()
                if (K[1].isInCheck) {
                    correctMoves.splice(correctMoves.indexOf(piece.validMoves[i]), 1)
                }
            }
        }

        // if (index != -1) {
        //     pieceList.splice(index, 0, deletedPiece)
        //     boardRepresent[piece.squareOn] = deletedPiece.type
        //     boardRep120[piece.squareOn120] = deletedPiece.type
        // }

        // boardRepresent[piece.squareOn] = " "
        // boardRep120[piece.squareOn120] = " "
        // piece.squareOn120 = fromSq
        // ResetVars()
        piece.squareOn120 = saveSq
        boardRep120[saveSq] = piece.piece
        boardRep120[piece.validMoves[i]] = deletedPiece
    }
    return correctMoves
}
