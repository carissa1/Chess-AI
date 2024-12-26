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
    let orderScore

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
            if (((isWhite == "w" && fileRank[0] == 0) || (isWhite1 == "b" && fileRank[0] == 7)) && pieceList[v].type == "P") {
                promoteTypes.forEach(newType => {
                    if (isWhite == "w") {
                        boardRep120[pieceList[v].validMoves[n]] = newType.toLowerCase()
                    }
                    else if (isWhite == "b") {
                        boardRep120[pieceList[v].validMoves[n]] = newType
                    }
                });
                pushedBoard = false
                boardScore = GetScoreBoard()

                // Ordering
                orderScore = boardScore + 500 // Promotion
                if (isWhite == 'w') { // Checks
                    if (K[0].color == 'b' && K[0].IsKingInCheck()) { orderScore += 10000 }
                    if (K[1].color == 'b' && K[1].IsKingInCheck()) { orderScore += 10000 }
                }
                else {
                    if (K[0].color == 'w' && K[0].IsKingInCheck()) { orderScore += 10000 }
                    if (K[1].color == 'w' && K[1].IsKingInCheck()) { orderScore += 10000 }
                }
                if (savePiece != " ") { // Captures
                    orderScore += (pieceValues[pieceList[v].type.toLowerCase()] - pieceValues[savePiece.toLowerCase()]) * 5
                }
                boardScore = orderScore
                
                if (boards.length == 0) {
                    boards.push([boardRep120.slice(), boardScore])
                }
                else {
                    for (let i = 0; i < boards.length; i++) {
                        if (boards[i][1] >= orderScore) {
                            boards.splice(i, 0, [boardRep120.slice(), boardScore])
                            pushedBoard = true
                            break
                        }
                    }
                    if (!pushedBoard) {
                        boards.push([boardRep120.slice(), boardScore])
                    }
                    // boards.push([boardRep120.slice(), boardScore])
                }
                // console.log("PROMOTING")
            }
            else {
                // Add board
                pushedBoard = false
                boardScore = GetScoreBoard()
                if (castled && endOrMiddleGame() == "M") { 
                    if (isWhite == 'w') { boardScore += 200; }
                    if (isWhite == 'b') { boardScore -= 200; }
                }

                // Ordering
                orderScore = boardScore
                if (isWhite == 'w') { // Checks
                    if (K[0].color == 'b' && K[0].IsKingInCheck()) { orderScore += 300 }
                    if (K[1].color == 'b' && K[1].IsKingInCheck()) { orderScore += 300 }
                }
                else {
                    if (K[0].color == 'w' && K[0].IsKingInCheck()) { orderScore += 300 }
                    if (K[1].color == 'w' && K[1].IsKingInCheck()) { orderScore += 300 }
                }
                if (savePiece != " ") { // Captures
                    orderScore += (pieceValues[pieceList[v].type.toLowerCase()] - pieceValues[savePiece.toLowerCase()]) / 5
                }
                boardScore = orderScore

                if (boards.length == 0) {
                    boards.push([boardRep120.slice(), boardScore])
                }
                else {
                    for (let i = 0; i < boards.length; i++) {
                        if (boards[i][1] >= orderScore) {
                            boards.splice(i, 0, [boardRep120.slice(), boardScore])
                            pushedBoard = true
                            break
                        }
                    }
                    if (!pushedBoard) {
                        boards.push([boardRep120.slice(), boardScore])
                    }
                    // boards.push([boardRep120.slice(), boardScore])
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
            if (((isWhite == "w" && fileRank[0] == 0) || (isWhite == "b" && fileRank[0] == 7)) && pieceList[v].type == "P") {
                promoteTypes.forEach(newType => {
                    if (isWhite == "w") {
                        boardRep120[pieceList[v].validMoves[n]] = newType.toLowerCase()
                    }
                    else if (isWhite1 == "b") {
                        boardRep120[pieceList[v].validMoves[n]] = newType
                    }
                });
                pushedBoard = false
                boardScore = GetScoreBoard()

                // Ordering
                orderScore = boardScore
                if (isWhite == 'w') { // Checks
                    if (K[0].color == 'b' && K[0].IsKingInCheck()) { orderScore += 300 }
                    if (K[1].color == 'b' && K[1].IsKingInCheck()) { orderScore += 300 }
                }
                else {
                    if (K[0].color == 'w' && K[0].IsKingInCheck()) { orderScore += 300 }
                    if (K[1].color == 'w' && K[1].IsKingInCheck()) { orderScore += 300 }
                }
                if (savePiece != " ") { // Captures
                    orderScore += (pieceValues[pieceList[v].type.toLowerCase()] - pieceValues[savePiece.toLowerCase()]) / 5
                }
                boardScore = orderScore

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

                // Ordering
                orderScore = boardScore
                if (isWhite == 'w') { // Checks
                    if (K[0].color == 'b' && K[0].IsKingInCheck()) { orderScore += 300 }
                    if (K[1].color == 'b' && K[1].IsKingInCheck()) { orderScore += 300 }
                }
                else {
                    if (K[0].color == 'w' && K[0].IsKingInCheck()) { orderScore += 300 }
                    if (K[1].color == 'w' && K[1].IsKingInCheck()) { orderScore += 300 }
                }
                if (savePiece != " ") { // Captures
                    orderScore += (pieceValues[pieceList[v].type.toLowerCase()] - pieceValues[savePiece.toLowerCase()]) / 5
                }
                boardScore = orderScore

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

// function LookAhead(numMoves) {
//     isWhite1 = isWhite
//     // let savePieceValue = 0
//     let fileRank = []

//     let level = 0
//     let board = 0
//     // let allPossibleMoves = []
//     let startBoard = boardRep120.slice()
//     let boards = {0:[[boardRep120, 0]]}

//     let boardTree = new Tree()
//     boardTree.addNode(boardRep120, null, 0)
//     let number = 1
//     // let node = 0

//     /* 
//     start board
//     go down one path numMoves times
//     backtrack
//     go down next path
//     if that board has no more paths, backtrack one more
//     */
//     while (level < numMoves) {
//         while (board < boards[level].length) {
//             // color = isWhite1
//             boardRep120 = boards[level][board][0].slice()
//             // console.log(boardRepresent)
//             ResetPieces()
//             ResetVars()
//             allPossibleMoves = []

//             // GET BOARDS
//             // let oldBoardRep = []
//             if (!Array.isArray(boards[level+1])) {
//                 boards[level+1] = []
//             }   
//             for (let v = 0; v < pieceList.length; v++) {
//                 // Get pieces moves
//                 pieceList[v].validMoves = []
//                 if (pieceList[v].color == isWhite) {
//                     pieceList[v].validMoves = GetPieceMove(pieceList[v])
//                     pieceList[v].validMoves = PieceMovesCheck(pieceList[v])
//                     // allPossibleMoves = allPossibleMoves.concat(pieceList[i])
//                 }
                
//                 for (let n = 0; n < pieceList[v].validMoves.length; n++) {
//                     // Set up board
//                     // oldBoardRep = [...boardRep120]
//                     boardRep120[pieceList[v].squareOn120] = " "
//                     boardRep120[pieceList[v].validMoves[n]] = pieceList[v].piece

//                     // Check if promoted
//                     fileRank = SqToRowFile(pieceList[v].validMoves[n])
//                     // oldType = pieceList[v].type
//                     // savePieceValue = pieceList[v].piece
//                     if (((isWhite1 == "w" && fileRank[0] == 0) || (isWhite1 == "b" && fileRank[0] == 7)) && pieceList[v].type == "P") {
//                         promoteTypes.forEach(newType => {
//                             if (isWhite1 == "w") {
//                                 boardRep120[pieceList[v].validMoves[n]] = newType.toLowerCase()
//                             }
//                             else if (isWhite1 == "b") {
//                                 boardRep120[pieceList[v].validMoves[n]] = newType
//                             }
//                             // pieceList[v].type = newType
//                             boards[level+1].push([boardRep120.slice(), number])
//                             // allPossibleMoves[v].type = oldType
//                             boardTree.addNode(boardRep120.slice(), boards[level][board][1], number, GetScoreBoard())
//                             number++
//                             boardRep120[pieceList[v].validMoves[n]] = pieceList[v].piece
//                         });
//                         // console.log("PROMOTING")
//                     }
//                     else {
//                         // Add board
//                         boards[level+1].push([boardRep120.slice(), number])
//                         // node = boardTree.search(boards[level][board][1])
//                         boardTree.addNode(boardRep120.slice(), boards[level][board][1], number, GetScoreBoard())
//                         number++
//                     }
//                     // console.log("BOARD ", boardRepresent)

//                     // reset board
//                     boardRep120[pieceList[v].squareOn120] = pieceList[v].piece
//                     boardRep120[pieceList[v].validMoves[n]] = " "
//                     // boardRep120 = [...oldBoardRep]
//                     // Reset()
//                 }
//             }
//             // console.log("NEXT BOARD")
//             board += 1
//         }
//         // console.log("DOWN A LEVEL")
//         // Check if need to backtrack
//         if (level+1 < boards.length && level > 0) {
//             if (boards[level+1].length == 0) {
//                 // console.log("BACKTRACK")
//             }
//         }
//         // Go down a level and switch isWhite
//         else {
//             level++
//             board = 0
//             if (isWhite == "w") {
//                 isWhite = "b"
//             }
//             else {
//                 isWhite = "w"
//             }
//         }
//     }

//     console.log("THIS IS ALL ", boards)
//     isWhite = isWhite1
//     boardRepresent = startBoard
//     // Reset()

//     return [boards, boardTree]
// }
