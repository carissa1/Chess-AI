function FileRankToSquare(fileInput, rankInput) {
    return fileInput + (rankInput-1)*8
}

function SquareToFileRank(s) {
    r = Math.ceil(s/8)
    f = s-(r-1)*8
    return [r, f]
}

function TakeComputerTurn(promoted) {
    isWhite = "b"
    isWhite1 = "b"
    // console.log(currentPiece.type, moveToSq)
    if (promoted) {
        ComputerMove()
    }
}

function endOrMiddleGame() { // is it the end or middle game
    if (numFullMoves >= 20 || pieceList[1].length == 0) {
        return "E"
    }
    else {
        return "M"
    }
}

function getPSTScore(type, square, pieceNum) {
    return parseInt(PSTValues[type+middleEnd][square]) * pieceMultiplier[pieceNum]
}

function PromoteToThis(that) {
    boardRepresent[eval(promotingPiece).squareOn-1] = that.id
    let type = eval(promotingPiece).type
    // let square = eval(promotingPiece).squareOn
    let newType = that.id.replace(eval(promotingPiece).color, "").toUpperCase()
    eval(promotingPiece).type = newType
    eval(newType).push(eval(promotingPiece))
    eval(type).splice(eval(promotingPiece).index, 1)

    if (isWhite == "b") {
        document.getElementById("promoteToW").style = "display: none"
    }
    else {
        document.getElementById("promoteToB").style = "display: none"
    }
    Reset()
    promoted = true
    if (isWhite1 == "b") {
        ComputerMove()
    }
}

function ResetIndex() {
    numberForPieces = 0
    for (i = 0; i < pieceList.length; i++) {
        for (m = 0; m < pieceList[i].length; m++) {
            pieceList[i][m].number = numberForPieces
            pieceList[i][m].index = m
            pieceList[i][m].pieceNum = i
            numberForPieces ++
        }
    }
}

function ResetAllValidMoves(validMovesN) {
    for (i = 0; i < pieceList.length; i++) {
        for (m = 0; m < pieceList[i].length; m++) {
            if (validMovesN == "validMoves") {
                pieceList[i][m].validMoves = []
            }
            else {
                pieceList[i][m].validMoves2 = []
            }
        }
    }
}

function AddMoveToList() {
    let squareFromFR = 0
    let endStr = ""
    for (i = 8; i > 0; i--) {
        let rowStr = ""
        let spaces = 0
        for (m = 1; m < 9; m++) {
            squareFromFR = FileRankToSquare(m, i) - 1
            if (boardRepresent[squareFromFR] != " ") {
                if (spaces === 0) {
                    spaces = ""
                }
                rowStr = rowStr + spaces.toString() + boardRepresent[squareFromFR]
                spaces = 0
            }
            else {
                if (spaces === "") {
                    spaces = 0
                }
                spaces += 1
            }
        }
        if (boardRepresent[squareFromFR] == " ") {
            rowStr += spaces.toString()
        }
        if (i != 1) {
            rowStr += "/"
        }
        endStr += rowStr
    }

    // Is an en passant possible
    if (possibleEnPassant[0][0] != "-") {
        possibleEnPassant2 = SquareToChessNotation(possibleEnPassant[0][0])
    }
    else {
        possibleEnPassant2 = "-"
    }

    endStr += " " + isWhite.toString() + " " + canCastle.wK  + canCastle.wQ + " " + canCastle.bK + canCastle.bQ + " " + possibleEnPassant2 + " " + numHalfMoves + " " + numFullMoves // make the complete FEN

    allMovesMade.push(endStr)
}

function SquareToChessNotation(s) {
    fileRank = SquareToFileRank(s)
    return String.fromCharCode(97 + fileRank[1]-1) + fileRank[0].toString()
}

function KingMovesCheck(piece) {
    // MAIN- If king in check, can king escape. Moving into check
    let savePieceValue2 = []
    let saveIsInCheckValue = [piece.isInCheck]
    
    correctMoves2 = piece.validMoves.slice()
    for (b = 0; b < piece.validMoves.length; b++) {
        if (piece.validMoves[b] != piece.squareOn) {
            savePieceValue2 = []
            // for (c = 0; c < pieceList.length; c++) {
            //     for (d = 0; d < pieceList[c].length; d++) {
            //         if (pieceList[c][d].squareOn == piece.validMoves[b] && pieceList[c][d].number != piece.number) {
            //             savePieceValue2.push(eval(pieceList[c][d].type.toString() + "[" + d.toString() + "]"))
            //             savePieceValue2.push(c)
                        
            //             pieceList[c].splice(d, 1)
            //         }
            //     }
            // }
            if (boardRepresent[piece.validMoves[b]-1] != " ") {
                pieceTypeIndex = pieceTypes.indexOf(boardRepresent[piece.validMoves[b]-1].toUpperCase());
                for (let i = 0; i < pieceList[pieceTypeIndex].length; i++) {
                    if (pieceList[pieceTypeIndex][i].squareOn == piece.validMoves[b]) {
                        pieceIndex = i
                    }
                }

                savePieceValue2.push(eval(pieceTypes[pieceTypeIndex] + "[" + pieceIndex.toString() + "]"))
                savePieceValue2.push(pieceTypeIndex)

                pieceList[pieceTypeIndex].splice(pieceIndex, 1)
            }

            let savePieceValue = boardRepresent[piece.validMoves[b]-1]
            let squareOfPiece = piece.squareOn
            boardRepresent[piece.squareOn-1] = " "
            piece.squareOn = piece.validMoves[b]

            if (piece.color == "w") {
                boardRepresent[piece.validMoves[b]-1] = piece.type.toLowerCase()
            }
            else {
                boardRepresent[piece.validMoves[b]-1] = piece.type
            }
            // boardRepresent = JSON.parse(JSON.stringify(boardRepresent2))
            // Reset()

            piece.isInCheck = false
            secondIsInCheck = true
            AttackingMoves()
            secondIsInCheck = false

            piece.IsKingInCheck(attackMoves2)

            if (piece.isInCheck == true) {
                correctMoves2.splice(correctMoves2.indexOf(piece.validMoves[b]), 1)
            }

            if (savePieceValue2.length > 0) {
                pieceList[savePieceValue2[1]].splice(piece.index-1, 0, savePieceValue2[0])
            }

            piece.squareOn = squareOfPiece

            if (piece.color == "w") {
                boardRepresent[piece.squareOn-1] = piece.type.toLowerCase()
            }
            else {
                boardRepresent[piece.squareOn-1] = piece.type
            }
            boardRepresent[piece.validMoves[b]-1] = savePieceValue
            // boardRepresent = JSON.parse(JSON.stringify(boardRepresent2))
            // Reset()

            ResetAllValidMoves("validMoves2")
        }
    }
    piece.isInCheck = saveIsInCheckValue[0]
    piece.validMoves = correctMoves2.slice()

    return piece.validMoves
}

function PiecesMovesCheck(piece) {
    // MAIN - Does a piece block the check/make king be in check
    let savePieceValue = 0
    let squareOfPiece = 0
    let pieceTypeIndex = 0
    let pieceIndex = 0
    let savePieceValue2 = []
    let saveIsInCheckValue = [K[0].isInCheck, K[1].isInCheck]
    let kingTaken = false
    // validMoves = []
    // validMoves2 = []
    // console.log(piece)
    // console.log(P)
    // Check if all the moves block check and/or don't make the king be in check
    correctMoves2 = piece.validMoves.slice()
    for (b = 0; b < piece.validMoves.length; b++) {
        if (piece.validMoves[b] != piece.squareOn) {
            savePieceValue2 = []
            // for (c = 0; c < pieceList.length; c++) {
            //     for (d = 0; d < pieceList[c].length; d++) {
            //         if (pieceList[c][d].squareOn == piece.validMoves[b] && pieceList[c][d].number != piece.number) {
            //             savePieceValue2.push(eval(pieceList[c][d].type.toString() + "[" + d.toString() + "]"))
            //             savePieceValue2.push(c)
                        
            //             pieceList[c].splice(d, 1)
            //             // savePieceValue2.push(pieceList[c][d].type.toString() + "[" + pieceList[c][d].index.toString() + "]")
            //         }
            //     }
            // }
            if (boardRepresent[piece.validMoves[b]-1].toLowerCase() == "k") {
                kingTaken = true
                correctMoves2.splice(correctMoves2.indexOf(piece.validMoves[b]), 1)
            }
            else if (boardRepresent[piece.validMoves[b]-1] != " ") {
                pieceTypeIndex = pieceTypes.indexOf(boardRepresent[piece.validMoves[b]-1].toUpperCase());
                for (let i = 0; i < pieceList[pieceTypeIndex].length; i++) {
                    if (pieceList[pieceTypeIndex][i].squareOn == piece.validMoves[b]) {
                        pieceIndex = i
                    }
                }

                savePieceValue2.push(eval(pieceTypes[pieceTypeIndex] + "[" + pieceIndex.toString() + "]"))
                savePieceValue2.push(pieceTypeIndex)

                pieceList[pieceTypeIndex].splice(pieceIndex, 1)
            }

            if (!kingTaken) {
                savePieceValue = boardRepresent[piece.validMoves[b]-1]
                squareOfPiece = piece.squareOn
                boardRepresent[piece.squareOn-1] = " "
                piece.squareOn = piece.validMoves[b]

                if (piece.color == "w") {
                    boardRepresent[piece.validMoves[b]-1] = piece.type.toLowerCase()
                }
                else {
                    boardRepresent[piece.validMoves[b]-1] = piece.type
                }
                // boardRepresent = JSON.parse(JSON.stringify(boardRepresent2))
                // Reset()

                K[0].isInCheck = false
                K[1].isInCheck = false
                secondIsInCheck = true
                AttackingMoves()
                secondIsInCheck = false

                if (isWhite1 == "w") {
                    K[0].IsKingInCheck(attackMoves2)
                }
                else {
                    K[1].IsKingInCheck(attackMoves2)
                }

                if (K[0].isInCheck == true || K[1].isInCheck == true) {
                    correctMoves2.splice(correctMoves2.indexOf(piece.validMoves[b]), 1)
                }

                if (savePieceValue2.length > 0) {
                    pieceList[savePieceValue2[1]].splice(piece.index-1, 0, savePieceValue2[0])
                }

                piece.squareOn = squareOfPiece
                if (piece.color == "w") {
                    boardRepresent[piece.squareOn-1] = piece.type.toLowerCase()
                }
                else {
                    boardRepresent[piece.squareOn-1] = piece.type
                }
                
                boardRepresent[piece.validMoves[b]-1] = savePieceValue
                // boardRepresent = JSON.parse(JSON.stringify(boardRepresent2))
                // Reset()
            }

            ResetAllValidMoves("validMoves2")
        }
        kingTaken = false;
    }
    secondIsInCheck = false
    K[0].isInCheck = saveIsInCheckValue[0]
    K[1].isInCheck = saveIsInCheckValue[1]
    piece.validMoves = correctMoves2.slice()

    return piece.validMoves
}

function ReadFENString(string) {
    let str2 = string.replaceAll("/", "")
    let str3 = str2.split(" ")
    let str4 = str3[0].split('')
    let row = []
    let allRows = []
    let boardRepresent2 = []
    for (i = str4.length-1; i > -1; i--) {
        if (isNaN(str4[i])) {
            boardRepresent2.push(str4[i])
        }
        else {
            for (m = 0; m < parseInt(str4[i]); m++) {
                boardRepresent2.push(" ")
            }
        }
    }
    for (i = 0; i < 8; i++) {
        row = []
        for (m = 0; m < 8; m++) {
            row.push(boardRepresent2[8*i+m])
        }
        allRows.push(row.reverse())
    }
    boardRepresent2 = allRows.flat()
    return boardRepresent2
}

function BackMove() {
    boardRepresent = ReadFENString(allMovesMade[allMovesMade.length-2])

    if (isWhite == "w") {
        isWhite = "b"
    }
    else {
        isWhite = "w"
    }
    
    Reset()

    CanCastle()
    // for (i = 0; i < pieceList.length; i++) {
    //     for (m = 0; m < pieceList[i].length; m++) {
    //         if (pieceList[i][m].squareOn2[1]) {
    //             pieceList[i][m].squareOn = pieceList[i][m].squareOn2[0]
    //         }
    //     }
    // }
    // let found = [0, -1, -1]
    // for (i = 0; i < 64; i++) {
    //     found[0] = 0
    //     if (boardRepresent[i] != " ") {
    //         for (m = 0; m < pieceList.length; m++) {
    //             for (n = 0; n < pieceList[m].length; n++) {
    //                 if (pieceList[m][n].squareOn == i+1) {
    //                     found[0] = 1
    //                 }
    //                 if (pieceList[m][n].color == "w") {
    //                     if (boardRepresent[pieceList[m][n].squareOn-1] != pieceList[m][n].type.toLowerCase()) {
    //                         found[1] = m
    //                         found[2] = n
    //                     }
    //                 }
    //                 else {
    //                     if (boardRepresent[pieceList[m][n].squareOn-1] != pieceList[m][n].type) {
    //                         found[1] = m
    //                         found[2] = n
    //                     }
    //                 }
    //             }
    //         }
    //         if (found[0] == 0) {
    //             pieceList[found[1]][found[2]].squareOn = i+1
    //         }
    //     }
    // }
    // let found2 = [0, 0]
    // let pieceColor = ""
    // for (i = 0; i < 64; i++) {
    //     found2 = [0, 0]
    //     if (boardRepresent[i] != " ") {
    //         for (m = 0; m < pieceList.length; m++) {
    //             for (n = 0; n < pieceList[m].length; n++) {
    //                 if (found2[1] != 1) {
    //                     if (pieceList[m][n].squareOn == i+1) {
    //                         found2[0] = m
    //                         found2[1] = 1
    //                     }
    //                     found2[0] = m
    //                 }
    //             }
    //         }
    //         if (found2[1] == 0) {
    //             if (boardRepresent[i].toLowerCase() == boardRepresent[i]) {
    //                 pieceColor = "w"
    //             }
    //             else {
    //                 pieceColor = "b"
    //             }

    //             if(boardRepresent[i].toLowerCase() == "q") {
    //                 pieceList[found2[0]].push(new Piece(pieceColor, i+1, "Q"))
    //             }
    //             else if(boardRepresent[i].toLowerCase() == "n") {
    //                 pieceList[found2[0]].push(new Piece(pieceColor, i+1, "N"))
    //             }
    //             else if(boardRepresent[i].toLowerCase() == "b") {
    //                 pieceList[found2[0]].push(new Piece(pieceColor, i+1, "B"))
    //             }
    //             else if(boardRepresent[i].toLowerCase() == "r") {
    //                 pieceList[found2[0]].push(new Piece(pieceColor, i+1, "R"))
    //             }
    //             if(boardRepresent[i].toLowerCase() == "p") {
    //                 pieceList[found2[0]].push(new Piece(pieceColor, i+1, "P"))
    //              }
    //         }
    //     }
    // }
}
