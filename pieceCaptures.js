function KingCaptures(sq) {
    let validMoves = []
    let sq120 = Sq64to120(sq)
    let newSq
    for (let i = 0; i < KDir.length; i++) {
        newSq = sq120 + KDir[i]
        if (board[newSq] != SQUARES.OFFBOARD && boardRep120[newSq] !=' ') {
            if (boardRep120[newSq].toLowerCase() == boardRep120[newSq] && boardRep120[sq120].toUpperCase() == boardRep120[sq120]) {
                validMoves.push(newSq)
            }
            if (boardRep120[newSq].toUpperCase() == boardRep120[newSq] && boardRep120[sq120].toLowerCase() == boardRep120[sq120]) {
                validMoves.push(newSq)
            }
        }
    }

    return validMoves
}

function BishopCaptures(sq) {
    let validMoves = [];
    let sq120 = Sq64to120(sq)
    let newSq;
    for (let i = 0; i < BDir.length; i++) {
        newSq = sq120 + BDir[i];
        while (board[newSq] != SQUARES.OFFBOARD && boardRep120[newSq] == ' ') {
            newSq += BDir[i];
        }
        if (board[newSq] != SQUARES.OFFBOARD && boardRep120[newSq] != ' ') {
            if (boardRep120[newSq].toLowerCase() == boardRep120[newSq] && boardRep120[sq120].toUpperCase() == boardRep120[sq120]) {
                validMoves.push(newSq)
            }
            if (boardRep120[newSq].toUpperCase() == boardRep120[newSq] && boardRep120[sq120].toLowerCase() == boardRep120[sq120]) {
                validMoves.push(newSq)
            }
        }
    }

    return validMoves
}

function KnightCaptures(sq) {
    let validMoves = []
    let sq120 = Sq64to120(sq)
    let newSq;
    for (let i = 0; i < NDir.length; i++) {
        newSq = sq120 + NDir[i]
        if (board[newSq] != SQUARES.OFFBOARD && boardRep120[newSq] != ' ') {
            if (boardRep120[newSq].toLowerCase() == boardRep120[newSq] && boardRep120[sq120].toUpperCase() == boardRep120[sq120]) {
                validMoves.push(newSq)
            }
            if (boardRep120[newSq].toUpperCase() == boardRep120[newSq] && boardRep120[sq120].toLowerCase() == boardRep120[sq120]) {
                validMoves.push(newSq)
            }
        }
    }

    return validMoves
}

function RookCaptures(sq) {
    let validMoves = [];
    let sq120 = Sq64to120(sq)
    let newSq;
    for (let i = 0; i < RDir.length; i++) {
        newSq = sq120 + RDir[i];
        while (board[newSq] != SQUARES.OFFBOARD && boardRep120[newSq] == ' ') {
            newSq += RDir[i];
        }
        if (board[newSq] != SQUARES.OFFBOARD && boardRep120[newSq] != ' ') {
            if (boardRep120[newSq].toLowerCase() == boardRep120[newSq] && boardRep120[sq120].toUpperCase() == boardRep120[sq120]) {
                validMoves.push(newSq)
            }
            if (boardRep120[newSq].toUpperCase() == boardRep120[newSq] && boardRep120[sq120].toLowerCase() == boardRep120[sq120]) {
                validMoves.push(newSq)
            }
        }
    }

    return validMoves
}

function PawnCaptures(sq) {
    let sq120 = Sq64to120(sq)
    let rowFile = SqToRowFile(sq120)
    let r2 = rowFile[0]
    // console.log("row: ", r2)
    let validMoves = []
    let validMoves2 = []
    if(pieceSquares[sq120].color == 'w') {
        validMoves2 = [sq120-9, sq120-11] // take a piece

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
                if (boardRep120[validMoves2[i]].toLowerCase() == boardRep120[validMoves2[i]] && boardRep120[sq120].toLowerCase() == boardRep120[sq120]) {
                    correctMoves.splice(correctMoves.indexOf(validMoves2[i]), 1)
                }
                if (boardRep120[validMoves2[i]].toUpperCase() == boardRep120[validMoves2[i]] && boardRep120[sq120].toUpperCase() == boardRep120[sq120]) {
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
        validMoves2 = [sq120+9, sq120+11] // take a piece

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
                if (boardRep120[validMoves2[i]].toLowerCase() == boardRep120[validMoves2[i]] && boardRep120[sq120].toLowerCase() == boardRep120[sq120]) {
                    correctMoves.splice(correctMoves.indexOf(validMoves2[i]), 1)
                }
                if (boardRep120[validMoves2[i]].toUpperCase() == boardRep120[validMoves2[i]] && boardRep120[sq120].toUpperCase() == boardRep120[sq120]) {
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
