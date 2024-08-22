function KingMoves(x) {
    validMoves = [x-1, x+1, x-8, x+8, x-7, x+7, x-9, x+9]

    correctMoves = [...validMoves]
    for (i = 0; i < validMoves.length; i++) {
        if ((x % 8 == 1 && validMoves[i] % 8 == 0) || (x % 8 == 0 && validMoves[i] % 8 == 1)) {
            correctMoves.splice(correctMoves.indexOf(validMoves[i]), 1)
        }
    }
    validMoves = [...correctMoves]
    
    CanCastle()
    if (canCastle.wK != "" && !K[0].isInCheck && isWhite1 == "w") {
        K[0].validMoves.push(x+2)
    }
    if (canCastle.wQ != "" && canCastle.wQ != "-" && !K[0].isInCheck && isWhite1 == "w") {
        K[0].validMoves.push(x-2)
    }
    if (canCastle.bK != "" && !K[1].isInCheck && isWhite1 == "b") {
        K[1].validMoves.push(x+2)
    }
    if (canCastle.bQ != "" && canCastle.bQ != "-" && !K[0].isInCheck && isWhite1 == "b") {
        K[1].validMoves.push(x-2)
    }

    if (secondIsInCheck) {
        validMoves3 = [...validMoves]
    }
}

function BishopMoves(x) {
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
                        }
                        else {
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

function KnightMoves(x) {
    validMoves3 = [x-15, x+15, x-17, x+17, x-6, x+6, x-10, x+10]

    correctMoves = [...validMoves3]
    for (i = 0; i < validMoves3.length; i++) {
        if ((x % 8 == 1 && validMoves3[i] % 8 == 0) || (x % 8 == 0 && validMoves3[i] % 8 == 1)) {
            correctMoves.splice(correctMoves.indexOf(validMoves3[i]), 1)
        }
        if ((x % 8 == 1 && validMoves3[i] % 8 == 7) || (x % 8 == 0 && validMoves3[i] % 8 == 2)) {
            correctMoves.splice(correctMoves.indexOf(validMoves3[i]), 1)
        }
        if ((x % 8 == 1 && validMoves3[i] % 8 == 6) || (x % 8 == 0 && validMoves3[i] % 8 == 3)) {
            correctMoves.splice(correctMoves.indexOf(validMoves3[i]), 1)
        }
        if ((x % 8 == 7 && validMoves3[i] % 8 == 1) || (x % 8 == 1 && validMoves3[i] % 8 == 7)) {
            correctMoves.splice(correctMoves.indexOf(validMoves3[i]), 1)
        }
        if ((x % 8 == 6 && validMoves3[i] % 8 == 1) || (x % 8 == 2 && validMoves3[i] % 8 == 0)) {
            correctMoves.splice(correctMoves.indexOf(validMoves3[i]), 1)
        }
    }
    validMoves3 = [...correctMoves]

    // correctMoves = JSON.parse(JSON.stringify(validMoves3))
    // for (i = 0; i < validMoves3.length; i++) {
    //     SquareToFileRank(validMoves3[i])
    //     r2 = r
    //     SquareToFileRank(x)
    //     if (r2 == r-2) {
    //         if (i != 0 && i != 2) {
    //             correctMoves.splice(correctMoves.indexOf(validMoves3[i]), 1)
    //         }
    //     }
    //     if (r2 == r+2) {
    //         if (i != 1 && i != 3) {
    //             correctMoves.splice(correctMoves.indexOf(validMoves3[i]), 1)
    //         }
    //     }
    //     if (r2 == r-1) {
    //         if (i != 4 && i != 6) {
    //             correctMoves.splice(correctMoves.indexOf(validMoves3[i]), 1)
    //         }
    //     }
    //     if (r2 == r+1) {
    //         if (i != 5 && i != 7) {
    //             correctMoves.splice(correctMoves.indexOf(validMoves3[i]), 1)
    //         }
    //     }
    //     if (r2 == r) {
    //         correctMoves.splice(correctMoves.indexOf(validMoves3[i]), 1)
    //     }
    // }

    if (secondIsInCheck) {
        validMoves3 = [...correctMoves]
    }
    else {
        validMoves = [...correctMoves]
        validMoves3 = []
    }
}

function RookMoves(x) {
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

                        }
                        else {
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

                        }
                        else {
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

function PawnMoves(x) {
    fileRank = SquareToFileRank(x)
    r2 = fileRank[0]
    if(isWhite1 == "w") {
        validMoves3 = [x-8, x-16] // move forward
        validMoves4 = [x-7, x-9] // take a piece

        correctMoves = [...validMoves3]
        
        if (boardRepresent[validMoves3[0]-1] != " ") {
            correctMoves.splice(correctMoves.indexOf(validMoves3[0]), 1)
            correctMoves.splice(correctMoves.indexOf(validMoves3[1]), 1)
        }
        else if (boardRepresent[validMoves3[1]-1] != " ") {
            correctMoves.splice(correctMoves.indexOf(validMoves3[1]), 1)
        }
        else {
            if(r2 != 7) { // only for first move
                correctMoves.splice(correctMoves.indexOf(validMoves3[1]), 1)
            }
        }

        if (secondIsInCheck) {
            validMoves3 = [...correctMoves]
        }
        else {
            validMoves = [...correctMoves]
            validMoves3 = []
        }

        correctMoves = [...validMoves4]
        for (i = 0; i < validMoves4.length; i++) { // Check if there is a piece to take
            if (possibleEnPassant[0][0]-8 != validMoves4[i] || possibleEnPassant[0][1].color == isWhite1) {
                if (boardRepresent[validMoves4[i]-1] == " ") {
                    correctMoves.splice(correctMoves.indexOf(validMoves4[i]), 1)
                }
                else {
                    fileRank = SquareToFileRank(validMoves4[i])
                    if (fileRank[0] != r2-1) {
                        correctMoves.splice(correctMoves.indexOf(validMoves4[i]), 1)
                    }
                }
            }
        }

        if (secondIsInCheck) {
            validMoves4 = [...correctMoves]
        }
        else {
            validMoves2 = [...correctMoves]
            validMoves4 = []
        }

        if (isWhite == isWhite1 && currentPiece.squareOn == x) {
            // Possible en passant moves
            if (validMoves3.includes(x-16) || validMoves.includes(x-16)) {
                possibleEnPassant[1] = [x-16, currentPiece]
            }
        }
    }
    else if(isWhite1 == "b") {
        validMoves3 = [x+8, x+16] // move forward
        validMoves4 = [x+7, x+9] // take a piece

        correctMoves = [...validMoves3]
        
        if (boardRepresent[validMoves3[0]-1] != " ") {
            correctMoves.splice(correctMoves.indexOf(validMoves3[0]), 1)
            correctMoves.splice(correctMoves.indexOf(validMoves3[1]), 1)
        }
        else if (boardRepresent[validMoves3[1]-1] != " ") {
            correctMoves.splice(correctMoves.indexOf(validMoves3[1]), 1)
        }
        else {
            if(r2 != 2) { // only for first move
                correctMoves.splice(correctMoves.indexOf(validMoves3[1]), 1)
            }
        }

        if (secondIsInCheck) {
            validMoves3 = [...correctMoves]
        }
        else {
            validMoves = [...correctMoves]
            validMoves3 = []
        }

        correctMoves = [...validMoves4]
        for (i = 0; i < validMoves4.length; i++) { // Check if there is a piece to take
            if (possibleEnPassant[0][0]+8 != validMoves4[i] || possibleEnPassant[0][1].color == isWhite1) {
                if (boardRepresent[validMoves4[i]-1] == " ") {
                    correctMoves.splice(correctMoves.indexOf(validMoves4[i]), 1)
                }
                else {
                    fileRank = SquareToFileRank(validMoves4[i])
                    if (fileRank[0] != r2+1) {
                        correctMoves.splice(correctMoves.indexOf(validMoves4[i]), 1)
                    }
                }
            }
        }

        if (secondIsInCheck) {
            validMoves4 = [...correctMoves]
        }
        else {
            validMoves2 = [...correctMoves]
            validMoves4 = []
        }

        if (isWhite == isWhite1 && currentPiece.squareOn == x) {
            // Possible en passant moves
            if (validMoves3.includes(x+16) || validMoves.includes(x+16)) {
                possibleEnPassant[1] = [x+16, currentPiece]
            }
        }
    }
}

function CanCastle() {
    if (!castlePiecesMoved[0] && !K[0].isInCheck) {
        if (!castlePiecesMoved[3]) {
            if (boardRepresent[61] == " " && boardRepresent[62] == " ") {
                canCastle.wK = "K"
            }
            else {
                canCastle.wK = ""
            }
        }
        else {
            canCastle.wK = ""
        }
        if (!castlePiecesMoved[2]) {
            if (boardRepresent[57] == " " && boardRepresent[58] == " " && boardRepresent[59] == " ") {
                canCastle.wQ = "Q"
            }
            else {
                canCastle.wQ = ""
            }
        }
        else {
            canCastle.wQ = ""
        }
    }
    else {
        canCastle.wK = ""
        canCastle.wQ = "-"
    }
    if (!castlePiecesMoved[1] && !K[1].isInCheck) {
        if (!castlePiecesMoved[5]) {
            if (boardRepresent[5] == " " && boardRepresent[6] == " ") {
                canCastle.bK = "k"
            }
            else {
                canCastle.bK = ""
            }
        }
        else {
            canCastle.bK = ""
        }
        if (!castlePiecesMoved[4]) {
            if (boardRepresent[1] == " " && boardRepresent[2] == " " && boardRepresent[3] == " ") {
                canCastle.bQ = "q"
            }
            else {
                canCastle.bQ = ""
            }
        }
        else {
            canCastle.bQ = ""
        }
    }
    else {
        canCastle.bK = ""
        canCastle.bQ = "-"
    }
    if (canCastle.wK == canCastle.wQ) {
        canCastle.wQ = "-"
    }
    if (canCastle.bK == canCastle.bQ) {
        canCastle.bQ = "-"
    }
}

// if (!castlePiecesMoved[0] && !K[0].isInCheck) {
//     if (!castlePiecesMoved[3]) {
//         if (B[1].squareOn != startSq[5] && N[1].squareOn != startSq[9]) {
//             canCastle.wK = "K"
//         }
//         else {
//             canCastle.wK = ""
//         }
//     }
//     else {
//         canCastle.wK = ""
//     }
//     if (!castlePiecesMoved[2]) {
//         if (B[0].squareOn != startSq[4] && N[0].squareOn != startSq[8] && Q[0].squareOn != startSq[2]) {
//             canCastle.wQ = "Q"
//         }
//         else {
//             canCastle.wQ = ""
//         }
//     }
//     else {
//         canCastle.wQ = ""
//     }
// }
// else {
//     canCastle.wK = ""
//     canCastle.wQ = "-"
// }
// if (!castlePiecesMoved[1] && !K[1].isInCheck) {
//     if (!castlePiecesMoved[5]) {
//         if (B[3].squareOn != startSq[7] && N[1].squareOn != startSq[11]) {
//             canCastle.bK = "k"
//         }
//         else {
//             canCastle.bK = ""
//         }
//     }
//     else {
//         canCastle.bK = ""
//     }
//     if (!castlePiecesMoved[4]) {
//         if (B[2].squareOn != startSq[6] && N[0].squareOn != startSq[10] && Q[1].squareOn != startSq[3]) {
//             canCastle.bQ = "q"
//         }
//         else {
//             canCastle.bQ = ""
//         }
//     }
//     else {
//         canCastle.bQ = ""
//     }
// }
// else {
//     canCastle.bK = ""
//     canCastle.bQ = "-"
// }
// if (canCastle.wK == canCastle.wQ) {
//     canCastle.wQ = "-"
// }
// if (canCastle.bK == canCastle.bQ) {
//     canCastle.bQ = "-"
// }
