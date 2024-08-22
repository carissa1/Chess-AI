function KingMoves(sq) {
    var validMoves = []
    var newSq
    for (var i = 0; i < KDir.length; i++) {
        newSq = sq + KDir[i]
        if (board[newSq] != SQUARES.OFFBOARD) {
            if (boardRep120[newSq] == ' ' || pieceSquares[newSq].color != isWhite) {
                validMoves.push(newSq)
            }
        }
    }
    // CanCastle()
    // if (canCastle.wK != '' && !K[0].isInCheck && isWhite1 == 'w') {
    //     K[0].validMoves.push(sq+2)
    // }
    // if (canCastle.wQ != '' && canCastle.wQ != '-' && !K[0].isInCheck && isWhite1 == 'w') {
    //     K[0].validMoves.push(sq-2)
    // }
    // if (canCastle.bK != '' && !K[1].isInCheck && isWhite1 == 'b') {
    //     K[1].validMoves.push(sq+2)
    // }
    // if (canCastle.bQ != '' && canCastle.bQ != '-' && !K[0].isInCheck && isWhite1 == 'b') {
    //     K[1].validMoves.push(sq-2)
    // }

    return validMoves
}

function BishopMoves(sq) {
    // var validMoves = []
    // var correctMoves = []
    // var indexBoardSq = 0;
    // for (var i = 0; i < board.diagonals.length; i++) {
    //     correctMoves = board.diagonals[i].slice()
    //     if(board.diagonals[i].includes(sq)){
    //         // console.log("DIAGONAL: ", board.diagonals[i])
    //         for(m = 0; m < board.diagonals[i].length; m++) {
    //             // console.log("BOARD DIAGONAL: ", board.diagonals[i][m])
    //             if((boardRepresent[board.diagonals[i][m]] != ' ') && (board.diagonals[i][m] != sq)) {
    //                 // console.log("PIECE: ", pieceSquares[board.diagonals[i][m]])
    //                 // console.log("CORRECT MOVES", correctMoves)
    //                 indexBoardSq = correctMoves.indexOf(board.diagonals[i][m])
    //                 // console.log("INDEX: ", indexBoardSq)
    //                 if((board.diagonals[i][m] > sq) && (indexBoardSq >= 0)) {
    //                     correctMoves.splice(indexBoardSq+1, correctMoves.length - indexBoardSq)
    //                     // console.log("CORRECT MOVES 2", correctMoves)
    //                 }
    //                 else if((board.diagonals[i][m] < sq) && (indexBoardSq >= 0)) {
    //                     correctMoves.splice(0, indexBoardSq)
    //                     // console.log("CORRECT MOVES 2", correctMoves)
    //                 }
    //             }
    //         }

    //         validMoves = validMoves.concat(correctMoves)
    //         console.log("VALID: ", validMoves)
    //     }
    // }

    var validMoves = [];
    var newSq;
    for (var i = 0; i < BDir.length; i++) {
        newSq = sq + BDir[i];
        while (board[newSq] != SQUARES.OFFBOARD && boardRep120[newSq] == ' ') {
            validMoves.push(newSq);
            newSq += BDir[i];
        }
        if ((board[newSq] != SQUARES.OFFBOARD && boardRep120[newSq] != ' ') && pieceSquares[newSq].color != isWhite) {
            validMoves.push(newSq);
        }
    }

    return validMoves
}

function KnightMoves(sq) {
    var validMoves = []
    var newSq;

    for (var i = 0; i < NDir.length; i++) {
        newSq = sq + NDir[i]
        if (board[newSq] != SQUARES.OFFBOARD) {
            if (boardRep120[newSq] == ' ' || pieceSquares[newSq].color != isWhite) {
                validMoves.push(newSq)
            }
        }
    }

    // var correctMoves = validMoves.slice()
    // for (i = 0; i < validMoves.length; i++) {
    //     if ((sq % 8 == 0 && validMoves[i] % 8 == 7) || (sq % 8 == 7 && validMoves[i] % 8 == 0)) {
    //         correctMoves.splice(correctMoves.indexOf(validMoves[i]), 1)
    //     }
    //     if ((sq % 8 == 1 && validMoves[i] % 8 == 7) || (sq % 8 == 7 && validMoves[i] % 8 == 1)) {
    //         correctMoves.splice(correctMoves.indexOf(validMoves[i]), 1)
    //     }
    //     if ((sq % 8 == 0 && validMoves[i] % 8 == 6) || (sq % 8 == 6 && validMoves[i] % 8 == 0)) {
    //         correctMoves.splice(correctMoves.indexOf(validMoves[i]), 1)
    //     }
    // }
    // validMoves = correctMoves.slice()

    return validMoves
}

function RookMoves(sq) {
    var correctMoves = []
    var validMoves = []
    var indexBoardSq
    // ROWS
    for(var i = 0; i < board.rows.length; i++) {
        correctMoves = board.rows[i].slice()
        if(board.rows[i].includes(sq)) {
            for(m = 0; m < board.rows[i].length; m++) {
                if((boardRepresent[board.rows[i][m]] != ' ') && (board.rows[i][m] != sq)) {
                    indexBoardSq = correctMoves.indexOf(board.rows[i][m])
                    
                    if((board.rows[i][m] > sq) && (indexBoardSq >= 0)) {
                        correctMoves.splice(indexBoardSq+1, correctMoves.length - indexBoardSq)
                    }
                    else if((board.rows[i][m] < sq) && (indexBoardSq >= 0)) {
                        correctMoves.splice(0, indexBoardSq)
                    }

                }
            }

            validMoves = validMoves.concat(correctMoves)
        }
    }
    // FILES
    for(var i = 0; i < board.columns.length; i++) {
        correctMoves = board.columns[i].slice()
        if(board.columns[i].includes(sq)) {
            for(m = 0; m < board.columns[i].length; m++) {
                if((boardRepresent[board.columns[i][m]] != ' ') && (board.columns[i][m] != sq)) {
                    indexBoardSq = correctMoves.indexOf(board.columns[i][m])
                    // console.log(board.columns[i][m])
                    // console.log(indexBoardSq)
                    if((board.columns[i][m] > sq) && (indexBoardSq >= 0)) {
                        correctMoves.splice(indexBoardSq+1, correctMoves.length - indexBoardSq)
                    }
                    else if((board.columns[i][m] < sq) && (indexBoardSq >= 0)) {
                        correctMoves.splice(0, indexBoardSq)
                    }
                    console.log(correctMoves)
                }
            }

            validMoves = validMoves.concat(correctMoves)
        }
    }

    return validMoves
}

function PawnMoves(sq) {
    var rowFile = SqToRowFile(sq)
    var r2 = rowFile[0]
    // console.log("row: ", r2)
    var validMoves = []
    var validMoves2 = []
    if(pieceSquares[sq].color == 'w') {
        validMoves = [sq-8, sq-16] // move forward
        validMoves2 = [sq-7, sq-9] // take a piece

        correctMoves = validMoves.slice()
        
        if (boardRepresent[validMoves[0]] != ' ') {
            correctMoves.splice(correctMoves.indexOf(validMoves[0]), 2)
        }
        else if ((r2 != 6) || (boardRepresent[validMoves[1]] != ' ')) {
            correctMoves.splice(correctMoves.indexOf(validMoves[1]), 1)
        }

        validMoves = correctMoves.slice()

        correctMoves = validMoves2.slice()
        for (i = 0; i < validMoves2.length; i++) { // Check if there is a piece to take
            // if (possibleEnPassant[0][0]-8 != validMoves4[i] || possibleEnPassant[0][1].color == isWhite1) {
                if (boardRep120[validMoves2[i]] == ' ' || boardRep120[validMoves2[i]] == '-') {
                    correctMoves.splice(correctMoves.indexOf(validMoves2[i]), 1)
                }
            // }
        }

        // if (secondIsInCheck) {
        //     validMoves4 = correctMoves.slice()
        //     validMoves2 = []
        //     return [validMoves3, validMoves4]
        // }
        // else {
        //     validMoves2 = correctMoves.slice()
        //     return [validMoves, validMoves2]
        // }

        // if (isWhite == isWhite1 && currentPiece.squareOn == sq) {
        //     // Possible en passant moves
        //     if (validMoves3.includes(sq-16) || validMoves.includes(sq-16)) {
        //         possibleEnPassant[1] = [sq-16, currentPiece]
        //     }
        // }
    }
    else if(pieceSquares[sq].color == 'b') {
        validMoves = [sq+8, sq+16] // move forward
        validMoves2 = [sq+7, sq+9] // take a piece

        correctMoves = validMoves.slice()
        
        if (boardRepresent[validMoves[0]] != ' ') {
            correctMoves.splice(correctMoves.indexOf(validMoves[0]), 1)
            correctMoves.splice(correctMoves.indexOf(validMoves[1]), 1)
        }
        else if ((r2 != 1) || (boardRepresent[validMoves[1]] != ' ')) {
            correctMoves.splice(correctMoves.indexOf(validMoves[1]), 1)
        }

        validMoves = correctMoves.slice()

        correctMoves = validMoves2.slice()
        for (i = 0; i < validMoves2.length; i++) { // Check if there is a piece to take
            // if (possibleEnPassant[0][0]-8 != validMoves4[i] || possibleEnPassant[0][1].color == isWhite1) {
            if (boardRep120[validMoves2[i]] == ' ' || boardRep120[validMoves2[i]] == '-') {
                correctMoves.splice(correctMoves.indexOf(validMoves2[i]), 1)
            }
            // }
        }

        validMoves2 = correctMoves.slice()

        // if (isWhite == isWhite1 && currentPiece.squareOn == sq) {
        //     // Possible en passant moves
        //     if (validMoves3.includes(sq+16) || validMoves.includes(sq+16)) {
        //         possibleEnPassant[1] = [sq+16, currentPiece]
        //     }
        // }
    }

    return [validMoves, validMoves2];
}

function CanCastle() {
    if (!castlePiecesMoved[0] && !K[0].isInCheck) {
        if ((!castlePiecesMoved[3]) && (boardRepresent[61] == ' ') && (boardRepresent[62] == ' ')) {
            canCastle.wK = 'K'
        }
        else {
            canCastle.wK = ''
        }
        if ((!castlePiecesMoved[2]) && (boardRepresent[57] == ' ') && (boardRepresent[58] == ' ') && (boardRepresent[59] == ' ')) {
            canCastle.wQ = 'Q'
        }
        else {
            canCastle.wQ = '-'
        }
    }
    else {
        canCastle.wK = ''
        canCastle.wQ = '-'
    }
    if (!castlePiecesMoved[1] && !K[1].isInCheck) {
        if ((!castlePiecesMoved[5]) && (boardRepresent[5] == ' ') && (boardRepresent[6] == ' ')) {
            canCastle.bK = 'k'
        }
        else {
            canCastle.bK = ''
        }
        if ((!castlePiecesMoved[4]) && (boardRepresent[1] == ' ') && (boardRepresent[2] == ' ') && (boardRepresent[3] == ' ')) {
            canCastle.bQ = "q"
        }
        else {
            canCastle.bQ = '-'
        }
    }
    else {
        canCastle.bK = ''
        canCastle.bQ = '-'
    }
    // if (canCastle.wK == canCastle.wQ) {
    //     canCastle.wQ = '-'
    // }
    // if (canCastle.bK == canCastle.bQ) {
    //     canCastle.bQ = "-"
    // }
}
