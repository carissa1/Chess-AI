/* PIECE CLASS */
class Piece {
    /* Makes a piece with color, square, type, and valid moves */
    constructor(color, squareOn, type) {
        this.color = color
        this.squareOn = squareOn
        this.squareOn120 = Sq64to120(this.squareOn);
        this.type = type
        this.validMoves = []
        this.validMoves2 = [] // when secondIsInCheck

        this.piece = this.type
        if (this.color == 'w') {
            this.piece = this.type.toLowerCase();
        }
    }

    RemoveSameColorPiecesFromMoves(validMovesN) {
        /* Removes all moves that are on a piece of the same color */
        
        var correctMoves = validMovesN.slice()
        for (var i = 0; i < validMovesN.length; i++) {
            // Piece is white and square has a white piece
            if ((this.color == 'w') && (Object.keys(pieceSquaresW).includes(validMovesN[i].toString()))) {
                correctMoves.splice(correctMoves.indexOf(validMovesN[i]), 1)
            }
            // Piece is black and square has a black piece
            else if ((this.color == 'b') && (Object.keys(pieceSquaresB).includes(validMovesN[i].toString()))) {
                correctMoves.splice(correctMoves.indexOf(validMovesN[i]), 1)
            }
        }
        validMovesN = correctMoves.slice()
        
        return validMovesN // return valid moves
    }

    FilterNonSquaresFromMoves(validMovesN) {
        /* Filters all squares that are not in 0-63
            - square < 0
            - square > 63
            - square is null 
        */

        // CHANGE IF NEW SIZE OF BOARD
        var width = 8
        var height = 8

        // Go through each move and check if between 0 and 63 and not null
        var correctMoves = validMovesN.slice()
        for (var i = 0; i < validMovesN.length; i++) {
            if ((validMovesN[i] > (width*height - 1)) || (validMovesN[i] < 0) || (validMovesN[i] == null)) {
                correctMoves.splice(correctMoves.indexOf(validMovesN[i]), 1)
            }
        }
        validMovesN = correctMoves.slice()
        
        return validMovesN // return valid moves
    }
}

/* KING CLASS */
class King extends Piece {
    /* King Class
    Extends Piece class
    Adds variable isInCheck and function IsKingInCheck */
    constructor (color, squareOn) {
        super(color, squareOn, 'K')
        this.isInCheck = false
    }
    
    IsKingInCheck(lst) {
        /* sets isInCheck to true if the king is in check */
        for (var z = 0; z < lst.length; z++) {
            if (this.color == "w" && lst[z] == K[0].squareOn) {
                this.isInCheck = true
            }
            else if (this.color == "b" && lst[z] == K[1].squareOn) {
                this.isInCheck = true
            }
        }
    }
}

/* INITIALIZE PIECES */
K[0] = new King('w', 60)
K[1] = new King('b', 4)

Q[0] = new Piece('w', 59, 'Q')
Q[1] = new Piece('b', 3, 'Q')

B[0] = new Piece('w', 58, 'B')
B[1] = new Piece('w', 61, 'B')
B[2] = new Piece('b', 2, 'B')
B[3] = new Piece('b', 5, 'B')

N[0] = new Piece('w', 57, 'N')
N[1] = new Piece('w', 62, 'N')
N[2] = new Piece('b', 1, 'N')
N[3] = new Piece('b', 6, 'N')

R[0] = new Piece('w', 56, 'R')
R[1] = new Piece('w', 63, 'R')
R[2] = new Piece('b', 0, 'R')
R[3] = new Piece('b', 7, 'R')

for (var i = 0; i < 8; i++) {
    P.push(new Piece('w', 48+i, 'P'))
}
for (var i = 0; i < 8; i++) {
    P.push(new Piece('b', 8+i, 'P'))
}

// Create pieceList
for (var i = 0; i < pieceListWithTypes.length; i++) {
    for (var m = 0; m < pieceListWithTypes[i].length; m++) {
        pieceList.push(pieceListWithTypes[i][m])
    }
}

// Create pieceSquares
for (var i = 0; i < pieceList.length; i++) {
    if (pieceList[i].color == 'w') {
        pieceSquaresW[pieceList[i].squareOn120] = pieceList[i]
    }
    else if (pieceList[i].color == 'b') {
        pieceSquaresB[pieceList[i].squareOn120] = pieceList[i]
    }
}
pieceSquares = Object.assign({}, pieceSquaresW, pieceSquaresB)
oldPieceSquares = pieceSquares
