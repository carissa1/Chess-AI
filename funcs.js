function SqAttacked(sq120, side = isWhite) {
    /* SqAttacked --> checks if a square is attacked by opposite side */

    // Pawn Attacking
    if (side == 'w') {
        if (boardRep120[sq120 - 9] == 'P' || boardRep120[sq120 - 11] == 'P') {
            return true;
        }
    }
    else if (side == 'b') {
        if (boardRep120[sq120 + 9] == 'p' || boardRep120[sq120 + 11] == 'p') {
            return true;
        }
    } 

    let newSq
    let dir
    let pce

    // Knight Attacking
    for (let i = 0; i < 8; i++) {
        newSq = sq120 + NDir[i]
        if (side == 'w' && boardRep120[newSq] == 'N') {
            return true
        }
        if (side == 'b' && boardRep120[newSq] == 'n') {
            return true
        }
    }

    // Bishop/Queen Attacking
    for (let i = 0; i < 4; i++) {
        dir = BDir[i] // go in a direction
        newSq = sq120 + dir
        
        // Go in direction until reach the end of the board
        while (boardRep120[newSq] != '_') {
            // If a piece is reached and it is not a bishop or queen, the rest of the line is blocked
            if (boardRep120[newSq] != ' ') {
                // Queens and Bishops attack along the diagonals
                if (boardRep120[newSq].toUpperCase() == 'B' || boardRep120[newSq].toUpperCase() == 'Q') {
                    if (side == 'w' && boardRep120[newSq].toLowerCase() != boardRep120[newSq]) {
                        return true
                    }
                    if (side == 'b' && boardRep120[newSq].toUpperCase() != boardRep120[newSq]) {
                        return true
                    }
                }
                break;
            }
            newSq += dir // continue in current direction
        }
    }

    // Rook/Queen Attacking
    for (let i = 0; i < 4; i++) {
        dir = RDir[i] // go in a direction
        newSq = sq120 + dir
        
        // Go in direction until reach the end of the board
        while (boardRep120[newSq] != '_') {
            // If a piece is reached and it is not a rook or queen, the rest of the line is blocked
            if (boardRep120[newSq] != ' ') {
                // Queens and Rooks attack along the lines
                if (boardRep120[newSq].toUpperCase() == 'R' || boardRep120[newSq].toUpperCase() == 'Q') {
                    if (side == 'w' && boardRep120[newSq].toLowerCase() != boardRep120[newSq]) {
                        return true
                    }
                    if (side == 'b' && boardRep120[newSq].toUpperCase() != boardRep120[newSq]) {
                        return true
                    }
                }
                break;
            }
            newSq += dir // continue in current direction
        }
    }

    // King Attacking
    for (let i = 0; i < 8; i++) {
        newSq = sq120 + KDir[i]
        if (side == 'w' && boardRep120[newSq] == 'K') {
            return true
        }
        if (side == 'b' && boardRep120[newSq] == 'k') {
            return true
        }
    }

    return false;
}

function PrintSqAttacked() {
    let sq, piece, line;

    console.log("Attacked Squares");

    for (let r = 0; r < 8; r++) {
        line = ((r + 1) + "  ");
        for (let f = 0; f < 8; f++) {
            sq = RowFileToSq(r, f);
            if (SqAttacked(sq, isWhite)) {
                piece = "X";
            }
            else {
                piece = "-";
            }
            line += (" " + piece + " ");
        }
        console.log(line);
    }
}

function GetPieceMove(piece) {
    if (piece.type == 'K') {
        return KingMoves(piece.squareOn)
    }
    if (piece.type == 'N') {
        return KnightMoves(piece.squareOn)
    }
    if (piece.type == 'B') {
        return BishopMoves(piece.squareOn)
    }
    if (piece.type == 'R') {
        return RookMoves(piece.squareOn)
    }
    if (piece.type == 'Q') {
        let moves = BishopMoves(piece.squareOn)
        return moves.concat(RookMoves(piece.squareOn))
    }
    if (piece.type == 'P') {
        return PawnMoves(piece.squareOn)
    }
}

function GetPieceCapture(piece) {
    if (piece.type == 'K') {
        return KingCaptures(piece.squareOn)
    }
    if (piece.type == 'N') {
        return KnightCaptures(piece.squareOn)
    }
    if (piece.type == 'B') {
        return BishopCaptures(piece.squareOn)
    }
    if (piece.type == 'R') {
        return RookCaptures(piece.squareOn)
    }
    if (piece.type == 'Q') {
        let moves = BishopCaptures(piece.squareOn)
        return moves.concat(RookCaptures(piece.squareOn))
    }
    if (piece.type == 'P') {
        return PawnCaptures(piece.squareOn)
    }
}

function PromoteToThis(clickedId) {
    if (currentPiece.color == "w") {
        document.getElementById("promoteToW").style = "display: none"
    }
    if (currentPiece.color == "b") {
        document.getElementById("promoteToB").style = "display: none"
    }
    promoted = false

    boardRep120[currentPiece.squareOn120] = clickedId
    ResetPieces()
    Reset()
    MateCheck()
    if (isMate == 1) { console.log("White wins") }
    if (isMate == 2) { console.log("Draw") }
    if (isMate == 3) { console.log("Black wins") }
    if (isMate == 0 && isComputer) { ComputerMove() }
}

function SetCastlePieces() {
    /* Set all castle pieces and check if they moved */

    if (boardRepresent[60] != 'k') {
        castlePiecesMoved[0] = true
    }
    if (boardRepresent[63] != 'r') {
        castlePiecesMoved[3] = true // kingside rook
    }
    if (boardRepresent[56] != 'r') {
        castlePiecesMoved[2] = true // queenside rook
    }
    if (boardRepresent[4] != 'K') {
        castlePiecesMoved[1] = true
    }
    if (boardRepresent[7] != 'R') {
        castlePiecesMoved[5] = true // kingside rook
    }
    if (boardRepresent[0] != 'R') {
        castlePiecesMoved[4] = true // queenside rook
    }
}

function UpdateCastling() {
    K[0].IsKingInCheck()
    K[1].IsKingInCheck()
    if (!castlePiecesMoved[0] && !K[0].isInCheck) {
        if ((!castlePiecesMoved[3]) && (boardRepresent[61] == ' ') && (boardRepresent[62] == ' ')) {
            if (!SqAttacked(96, 'w') && !SqAttacked(97, 'w')) {
                canCastle.wK = 'K'
            }
            else {
                canCastle.wK = ''
            }
        }
        else {
            canCastle.wK = ''
        }
        if ((!castlePiecesMoved[2]) && (boardRepresent[57] == ' ') && (boardRepresent[58] == ' ') && (boardRepresent[59] == ' ')) {
            if (!SqAttacked(93, 'w') && !SqAttacked(94, 'w')) {
                canCastle.wQ = 'Q'
            }
            else {
                canCastle.wQ = ''
            }
        }
        else {
            canCastle.wQ = ''
        }
    }
    else {
        canCastle.wK = ''
        canCastle.wQ = ''
    }
    if (!castlePiecesMoved[1] && !K[1].isInCheck) {
        if ((!castlePiecesMoved[5]) && (boardRepresent[5] == ' ') && (boardRepresent[6] == ' ')) {
            if (!SqAttacked(26, 'b') && !SqAttacked(27, 'b')) {
                canCastle.bK = 'k'
            }
            else {
                canCastle.bK = ''
            }
        }
        else {
            canCastle.bK = ''
        }
        if ((!castlePiecesMoved[4]) && (boardRepresent[1] == ' ') && (boardRepresent[2] == ' ') && (boardRepresent[3] == ' ')) {
            if (!SqAttacked(23, 'b') && !SqAttacked(24, 'b')) {
                canCastle.bQ = 'q'
            }
            else {
                canCastle.bQ = ''
            }
        }
        else {
            canCastle.bQ = ''
        }
    }
    else {
        canCastle.bK = ''
        canCastle.bQ = ''
    }
}

function MateCheck() {
    let keys
    isMate = 2

    // Insuffient Material
    if (pieceList.length == 2 && pieceList[0].type == 'K' && pieceList[1].type == 'K') {
        return
    }
    // if (pieceList.length == 3 && pieceList[2].type == 'N') {
    //     return
    // }
    // if (pieceList.length == 3 && pieceList[2].type == 'B') {
    //     return
    // }
    // if (pieceList.length == 4 && pieceList[2].type == 'N' && pieceList[3].type == 'N') {
    //     return
    // }
    // if (pieceList.length == 4 && pieceList[2].type == 'B' && pieceList[2].color == 'w' && pieceList[3].type == 'N' && pieceList[3].color == 'b') {
    //     return
    // }
    // if (pieceList.length == 4 && pieceList[2].type == 'B' && pieceList[2].color == 'b' && pieceList[3].type == 'N' && pieceList[3].color == 'w') {
    //     return
    // }
    // if (pieceList.length == 4 && pieceList[2].type == 'N' && pieceList[2].color == 'w' && pieceList[3].type == 'B' && pieceList[3].color == 'b') {
    //     return
    // }
    // if (pieceList.length == 4 && pieceList[2].type == 'N' && pieceList[2].color == 'b' && pieceList[3].type == 'B' && pieceList[3].color == 'w') {
    //     return
    // }
    // if (pieceList.length == 4 && pieceList[2].type == 'B' && pieceList[2].color == 'w' && pieceList[3].type == 'B' && pieceList[3].color == 'b') {
    //     return
    // }
    // if (pieceList.length == 4 && pieceList[2].type == 'B' && pieceList[2].color == 'b' && pieceList[3].type == 'B' && pieceList[3].color == 'w') {
    //     return
    // }

    // Draw or Checkmate
    if (isWhite == 'w') {
        keys = Object.keys(pieceSquaresW)
        for (let i = 0; i < keys.length; i++) {
            pieceSquaresW[keys[i]].validMoves = GetPieceMove(pieceSquaresW[keys[i]])
            pieceSquaresW[keys[i]].validMoves = PieceMovesCheck(pieceSquaresW[keys[i]])
            if (pieceSquaresW[keys[i]].validMoves.length != 0) {
                isMate = 0
                break
            }
        }
        K[0].IsKingInCheck()
        if (K[0].isInCheck && isMate == 2) {
            isMate = 3
        }
    }
    if (isWhite == 'b') {
        keys = Object.keys(pieceSquaresB)
        for (let i = 0; i < keys.length; i++) {
            pieceSquaresB[keys[i]].validMoves = GetPieceMove(pieceSquaresB[keys[i]])
            pieceSquaresB[keys[i]].validMoves = PieceMovesCheck(pieceSquaresB[keys[i]])
            if (pieceSquaresB[keys[i]].validMoves.length != 0) {
                isMate = 0
                break
            }
        }
        K[1].IsKingInCheck()
        if (K[1].isInCheck && isMate == 2) {
            isMate = 1
        }
    }

    /* TODO */
    // Check if Knight v. Knight or Bishop v. Bishop draw
    // Check if King v. King draw
}

function SqToChessNotation(s) {
    let fileRank = SqToRowFile(s)
    return String.fromCharCode(97 + fileRank[1]) + (8 - fileRank[0]).toString()
}

function ChessNotationToSq(str) {
    return RowFileToSq(parseInt(8 - str[1]), str[0].charCodeAt(0) - 97)
}

function AddMoveToList() {
    let squareFromFR = 0
    let endStr = ""

    // Turn board into string (spaces become numbers, ex. 1p1n2Rb)
    for (i = 7; i >= 0; i--) {
        let rowStr = ""
        let spaces = 0
        for (m = 0; m < 8; m++) {
            squareFromFR = RowFileToSq(i, m)
            if (boardRep120[squareFromFR] != " ") {
                if (spaces === 0) {
                    spaces = ""
                }
                rowStr = rowStr + spaces.toString() + boardRep120[squareFromFR]
                spaces = 0
            }
            else {
                if (spaces === "") {
                    spaces = 0
                }
                spaces += 1
            }
        }
        if (boardRep120[squareFromFR] == " ") {
            rowStr += spaces.toString()
        }
        if (i != 0) {
            rowStr += "/"
        }
        endStr += rowStr
    }

    // Get possible en passant squares in chess notation
    let possibleEnPassant2 = '-'
    if (possibleEnPassant != 100) {
        if (isWhite == 'w') { possibleEnPassant2 = SqToChessNotation(possibleEnPassant + 10) }
        else { possibleEnPassant2 = SqToChessNotation(possibleEnPassant - 10) }
    }

    // Get castling rights
    let castling = '-'
    if (canCastle.wK != '' || canCastle.wQ != '' || canCastle.bK != '' || canCastle.bQ != '') {
        castling = canCastle.wK + canCastle.wQ + canCastle.bK + canCastle.bQ
    }

    // Get FEN string
    endStr += " " + isWhite.toString() + " " + castling + " " + possibleEnPassant2 + " " + numHalfMoves + " " + numFullMoves

    allMovesMade.push(endStr)
}

function FENToChessBoard(fenStr) {
    // Set boardRep120
    boardRep120 = ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_']
    fenList = fenStr.split('/').reverse()
    for (var row = 0; row < fenList.length; row++) {
        boardRep120.push('_')
        for (var col = 0; col < fenList[row].length; col++) {
            if (fenList[row][col] == ' ') {
                break
            }
            else if ('12345678'.includes(fenList[row][col])) {
                for (var i = 0; i < parseInt(fenList[row][col]); i++) {
                    boardRep120.push(' ')
                }
            }
            else {
                boardRep120.push(fenList[row][col])
            }
        }
        boardRep120.push('_')
    }
    boardRep120.push('_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_')

    // Set the rest of the variables
    fenList2 = fenList[0].split(' ')
    isWhite = fenList2[1]
    // if (fenList2[1] == 'w') { isWhite = 'b' }
    // else { isWhite = 'w' }
    if (fenList2[2] == '-') {
        canCastle.wK = ''; canCastle.wQ = ''; canCastle.bK = ''; canCastle.bQ = ''
    }
    else {
        if (fenList2[2].includes('K')) { canCastle.wK = 'K' }
        else { canCastle.wK = '' }
        if (fenList2[2].includes('Q')) { canCastle.wQ = 'Q' }
        else { canCastle.wQ = '' }
        if (fenList2[2].includes('k')) { canCastle.bK = 'k' }
        else { canCastle.bK = '' }
        if (fenList2[2].includes('q')) { canCastle.bQ = 'q' }
        else { canCastle.bQ = '' }
    }
    if (fenList2[3] == '-') {
        possibleEnPassant = 100
    }
    else {
        let possibleEnPassant2 = ChessNotationToSq(fenList2[3]) // notation to sq
        if (isWhite == 'w') { possibleEnPassant = possibleEnPassant2 + 10 }
        else { possibleEnPassant = possibleEnPassant2 - 10 }
    }
    numHalfMoves = parseInt(fenList2[4])
    numFullMoves = parseInt(fenList2[5])
}

function BackMove() {
    allMovesMade.pop()
    if (isComputer) { allMovesMade.pop() }
    FENToChessBoard(allMovesMade[allMovesMade.length - 1])
    // if (isComputer) {
    //     if (isWhite == 'w') { isWhite = 'b' }
    //     else { isWhite = 'w' }
    // }
    ResetPieces()
    Reset()

    // if (isMate == 0 && !promoted && isWhite == 'b') {
    //     // document.getElementById("thinkGIF").style = "display: flex"
    //     setTimeout(ComputerMove, 100)
    // }
}
