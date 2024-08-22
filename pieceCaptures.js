function KingCaptures(x) {
    let color = 0;
    if (isWhite1 == "w") {
        color = 1
    }
    validMoves = [x-1, x+1, x-8, x+8, x-7, x+7, x-9, x+9]

    correctMoves = [...validMoves]
    for (i = 0; i < validMoves.length; i++) {
        if ((x % 8 == 1 && validMoves[i] % 8 == 0) || (x % 8 == 0 && validMoves[i] % 8 == 1) || !allPieceTypes[color].includes(boardRepresent[validMoves[i]-1])) {
            correctMoves.splice(correctMoves.indexOf(validMoves[i]), 1)
        }
    }
    correctMoves.splice(correctMoves.indexOf(x), 1)
    validMoves = [...correctMoves]

    if (secondIsInCheck) {
        validMoves3 = [...validMoves]
    }
}

function BishopCaptures(x) {
    // let color = 0
    // if (isWhite1 == "w") {
    //     color = 1
    // }
    for (i = 0; i < board.diagonals.length; i++) {
        correctMoves = [...board.diagonals[i]]
        if(board.diagonals[i].includes(x)){
            for(m = 0; m < board.diagonals[i].length; m++) {
                for(n = 0; n < pieceList.length; n++) {
                    for (v = 0; v < pieceList[n].length; v++) {
                        if(pieceList[n][v].squareOn == board.diagonals[i][m] && board.diagonals[i][m] != x) {
                            if(board.diagonals[i][m] > x) {
                                correctMoves = correctMoves.reverse()
                                while (board.diagonals[i][m] < correctMoves[0]) {
                                    correctMoves.shift()
                                }
                                correctMoves = correctMoves.reverse()
                            }
                            else if(board.diagonals[i][m] < x) {
                                while (correctMoves[0] < board.diagonals[i][m]) {
                                    correctMoves = correctMoves.reverse()
                                    correctMoves.pop()
                                    correctMoves = correctMoves.reverse()
                                }
                            }
                            validMovesAdd = true
                        }
                    }
                }
            }
            if (secondIsInCheck) {
                if(validMovesAdd) {
                    validMoves3 = validMoves3.concat(correctMoves)
                    validMovesAdd = false
                }
            }
            else {
                if(validMovesAdd) {
                    validMoves = validMoves.concat(correctMoves)
                    validMovesAdd = false
                }
            }
        }
    }
    let index = validMoves.indexOf(x)
    if (index != -1) {
        validMoves.splice(index, 1)
    }
}

function KnightCaptures(x) {
    let color = 0;
    if (isWhite1 == "w") {
        color = 1
    }
    validMoves3 = [x-15, x+15, x-17, x+17, x-6, x+6, x-10, x+10]

    correctMoves = [...validMoves3]
    for (i = 0; i < validMoves3.length; i++) {
        if ((x % 8 == 1 && validMoves3[i] % 8 == 0) || (x % 8 == 0 && validMoves3[i] % 8 == 1) || !allPieceTypes[color].includes(boardRepresent[validMoves3[i]-1])) {
            correctMoves.splice(correctMoves.indexOf(validMoves3[i]), 1)
        }
        if ((x % 8 == 1 && validMoves3[i] % 8 == 7) || (x % 8 == 0 && validMoves3[i] % 8 == 2) || !allPieceTypes[color].includes(boardRepresent[validMoves3[i]-1])) {
            correctMoves.splice(correctMoves.indexOf(validMoves3[i]), 1)
        }
        if ((x % 8 == 1 && validMoves3[i] % 8 == 6) || (x % 8 == 0 && validMoves3[i] % 8 == 3) || !allPieceTypes[color].includes(boardRepresent[validMoves3[i]-1])) {
            correctMoves.splice(correctMoves.indexOf(validMoves3[i]), 1)
        }
        if ((x % 8 == 7 && validMoves3[i] % 8 == 1) || (x % 8 == 1 && validMoves3[i] % 8 == 7) || !allPieceTypes[color].includes(boardRepresent[validMoves3[i]-1])) {
            correctMoves.splice(correctMoves.indexOf(validMoves3[i]), 1)
        }
        if ((x % 8 == 6 && validMoves3[i] % 8 == 1) || (x % 8 == 2 && validMoves3[i] % 8 == 0) || !allPieceTypes[color].includes(boardRepresent[validMoves3[i]-1])) {
            correctMoves.splice(correctMoves.indexOf(validMoves3[i]), 1)
        }
    }
    validMoves3 = [...correctMoves]

    if (secondIsInCheck) {
        validMoves3 = [...correctMoves]
    }
    else {
        validMoves = [...correctMoves]
        validMoves3 = []
    }
}

function RookCaptures(x) {
    // let color = 0;
    // if (isWhite1 == "w") {
    //     color = 1
    // }

    // ROWS
    for(i = 0; i < board.rows.length; i++) {
        correctMoves = [...board.rows[i]]
        if(board.rows[i].includes(x)) {
            for(m = 0; m < board.rows[i].length; m++) {
                for(n = 0; n < pieceList.length; n++) {
                    for(v = 0; v < pieceList[n].length; v++) {
                        if(pieceList[n][v].squareOn == board.rows[i][m] && board.rows[i][m] != x) {
                            if(board.rows[i][m] > x) {
                                correctMoves = correctMoves.reverse()
                                while (board.rows[i][m] < correctMoves[0]) {
                                    correctMoves.shift()
                                }
                                correctMoves = correctMoves.reverse()
                            }
                            else if(board.rows[i][m] < x) {
                                while (correctMoves[0] < board.rows[i][m]) {
                                    correctMoves = correctMoves.reverse()
                                    correctMoves.pop()
                                    correctMoves = correctMoves.reverse()
                                }
                            }
                            validMovesAdd = true
                        }
                    }
                }
            }
            if (secondIsInCheck) {
                if(validMovesAdd) {
                    validMoves3 = validMoves3.concat(correctMoves)
                    validMovesAdd = false
                }
            }
            else {
                if(validMovesAdd) {
                    validMoves = validMoves.concat(correctMoves)
                    validMovesAdd = false
                }
            }
        }
    }
    // FILES
    for(i = 0; i < board.columns.length; i++) {
        correctMoves = [...board.columns[i]]
        if(board.columns[i].includes(x)) {
            for(m = 0; m < board.columns[i].length; m++) {
                for(n = 0; n < pieceList.length; n++) {
                    for(v = 0; v < pieceList[n].length; v++) {
                        if(pieceList[n][v].squareOn == board.columns[i][m] && board.columns[i][m] != x) {
                            if(board.columns[i][m] > x) {
                                correctMoves = correctMoves.reverse()
                                while (board.columns[i][m] < correctMoves[0]) {
                                    correctMoves.shift()
                                }
                                correctMoves = correctMoves.reverse()
                            }
                            else if(board.columns[i][m] < x) {
                                while (correctMoves[0] < board.columns[i][m]) {
                                    correctMoves = correctMoves.reverse()
                                    correctMoves.pop()
                                    correctMoves = correctMoves.reverse()
                                }
                            }
                            validMovesAdd = true
                        }
                    }
                }
            }
            if (secondIsInCheck) {
                if(validMovesAdd) {
                    validMoves3 = validMoves3.concat(correctMoves)
                    validMovesAdd = false
                }
            }
            else {
                if(validMovesAdd) {
                    validMoves = validMoves.concat(correctMoves)
                    validMovesAdd = false
                }
            }
        }
    }
    index = validMoves.indexOf(x)
    if (index != -1) {
        validMoves.splice(index, 1)
    }
}

function PawnCaptures(x) {
    let color = 0;
    if (isWhite1 == "w") {
        color = 1
    }

    fileRank = SquareToFileRank(x)
    r2 = fileRank[0]
    if(isWhite1 == "w") {
        // validMoves3 = [x-8, x-16] // move forward
        validMoves4 = [x-7, x-9] // take a piece

        // correctMoves = [...validMoves3]
        
        // if (boardRepresent[validMoves3[0]-1] != " ") {
        //     correctMoves.splice(correctMoves.indexOf(validMoves3[0]), 1)
        //     correctMoves.splice(correctMoves.indexOf(validMoves3[1]), 1)
        // }
        // else if (boardRepresent[validMoves3[1]-1] != " ") {
        //     correctMoves.splice(correctMoves.indexOf(validMoves3[1]), 1)
        // }
        // else {
        //     if(r2 != 7) { // only for first move
        //         correctMoves.splice(correctMoves.indexOf(validMoves3[1]), 1)
        //     }
        // }

        // if (secondIsInCheck) {
        //     validMoves3 = [...correctMoves]
        // }
        // else {
        //     validMoves = [...correctMoves]
        //     validMoves3 = []
        // }

        correctMoves = [...validMoves4]
        for (i = 0; i < validMoves4.length; i++) { // Check if there is a piece to take
            if (possibleEnPassant[0][0]-8 != validMoves4[i] || possibleEnPassant[0][1].color == isWhite1) {
                if (!allPieceTypes[color].includes(boardRepresent[validMoves4[i]-1])) {
                    correctMoves.splice(correctMoves.indexOf(validMoves4[i]), 1)
                }
                // else {
                //     fileRank = SquareToFileRank(validMoves4[i])
                //     if (fileRank[0] != r2-1) {
                //         correctMoves.splice(correctMoves.indexOf(validMoves4[i]), 1)
                //     }
                // }
            }
        }

        if (secondIsInCheck) {
            validMoves4 = [...correctMoves]
        }
        else {
            validMoves2 = [...correctMoves]
            validMoves4 = []
        }

        // if (isWhite == isWhite1 && currentPiece.squareOn == x) {
        //     // Possible en passant moves
        //     if (validMoves3.includes(x-16) || validMoves.includes(x-16)) {
        //         possibleEnPassant[1] = [x-16, currentPiece]
        //     }
        // }
    }
    else if(isWhite1 == "b") {
        // validMoves3 = [x+8, x+16] // move forward
        validMoves2 = [x+7, x+9] // take a piece

        // correctMoves = [...validMoves3]
        
        // if (boardRepresent[validMoves3[0]-1] != " ") {
        //     correctMoves.splice(correctMoves.indexOf(validMoves3[0]), 1)
        //     correctMoves.splice(correctMoves.indexOf(validMoves3[1]), 1)
        // }
        // else if (boardRepresent[validMoves3[1]-1] != " ") {
        //     correctMoves.splice(correctMoves.indexOf(validMoves3[1]), 1)
        // }
        // else {
        //     if(r2 != 2) { // only for first move
        //         correctMoves.splice(correctMoves.indexOf(validMoves3[1]), 1)
        //     }
        // }

        // if (secondIsInCheck) {
        //     validMoves3 = [...correctMoves]
        // }
        // else {
        //     validMoves = [...correctMoves]
        //     validMoves3 = []
        // }

        correctMoves = [...validMoves2]
        for (i = 0; i < validMoves2.length; i++) { // Check if there is a piece to take
            if (possibleEnPassant[0][0]+8 != validMoves2[i] || possibleEnPassant[0][1].color == isWhite1) {
                if (!allPieceTypes[color].includes(boardRepresent[validMoves2[i]-1])) {
                    correctMoves.splice(correctMoves.indexOf(validMoves2[i]), 1)
                }
                // else {
                //     fileRank = SquareToFileRank(validMoves2[i])
                //     if (fileRank[0] != r2+1) {
                //         correctMoves.splice(correctMoves.indexOf(validMoves2[i]), 1)
                //     }
                // }
            }
        }

        if (secondIsInCheck) {
            validMoves2 = [...correctMoves]
        }
        else {
            validMoves = [...correctMoves]
            validMoves2 = []
        }

        // if (isWhite == isWhite1 && currentPiece.squareOn == x) {
        //     // Possible en passant moves
        //     if (validMoves3.includes(x+16) || validMoves.includes(x+16)) {
        //         possibleEnPassant[1] = [x+16, currentPiece]
        //     }
        // }
    }
}