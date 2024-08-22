var i, m, n, v; // for loop variables
var k, h, y; // for loop variables for AttackingMoves()ONLY
var a; // for loop variable for wherePieces ONLY
var z; // for loop variable for isKingInCheck ONLY
var b, c, d; // for loop variables for checking if a piece blocks the check ONLY
var e, g; // for loop variables for PiecesMovesCheck() ONLY

var square, square2; // which square is the piece on
// var board = []
// var squares = [] // board with numbers 1-64 but in strings
var pieceAdd;

var squareNum, squareTens, squareOnes // add piece in board

var firstOnclick = true // select piece or select square to move piece

var moveFromSq, moveToSq, movePiece; // which start square, which end square, which piece

var valid = true // is the move valid
var valid2 = true // is the pawn capturing diagonally valid

var isWhite, isWhite1; // white's turn or black's turn

var validMoves, validMoves2, validMoves3, validMoves4, validMovesAdd; // the valid moves
var attackMoves, attackMoves2; // Where are all the pieces attacking
var correctMoves = [] // the correct moves, gets added to validMoves
var correctMoves2 = [] // same as correctMoves

class Board {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.squares = []
        this.rows = []
        this.columns = []
        this.diagonals = []
    }

    MakeBoard() {
        // rows(list with each row), columns(list with each column), and squares (1-64)
        var row = []
        var column = []
        for (i = 0; i < this.width; i++) {
            for (m = 1; m < this.height+1; m++) {
                this.squares.push(m+8*i)
                row.push(m+8*i)
                column.push(8*(m-1)+(i+1))
            }
            this.rows.push(row)
            this.columns.push(column)
            row = []
            column = []
        }

        // diagonals NW-SE and NE-SW
        var diagonal = []
        var square;
        var done;
        // diagonal NW-SE using row [1,2,3,4,5,6,7,8]
        for (i = 1; i < this.rows.length+1; i++) {
            m = 0
            done = false
            while (!done) {
                square = i+9*m
                diagonal.push(square)
                if (this.columns[7].includes(square)) {
                    done = true
                }
                if (this.rows[7].includes(square)) {
                    done = true
                }
                m++
            }
            this.diagonals.push(diagonal)
            diagonal = []
        }

        // diagonal NW-SE using column [1,9,17,25,33,41,49,57] not repeating [1]
        for (i = 1; i < this.columns.length; i++) {
            m = 0
            done = false
            while (!done) {
                square = this.columns[0][i]+9*m
                diagonal.push(square)
                if (this.columns[7].includes(square)) {
                    done = true
                }
                if (this.rows[7].includes(square)) {
                    done = true
                }
                m++
            }
            this.diagonals.push(diagonal)
            diagonal = []
        }

        // diagonal NE-SW using row [1,2,3,4,5,6,7,8]
        for (i = 1; i < this.rows.length+1; i++) {
            m = 0
            done = false
            while (!done) {
                square = i+7*m
                diagonal.push(square)
                if (this.columns[0].includes(square)) {
                    done = true
                }
                if (this.rows[7].includes(square)) {
                    done = true
                }
                m++
            }
            this.diagonals.push(diagonal)
            diagonal = []
        }

        // diagonal NE-SW using column [8,16,24,32,40,48,56,64]
        for (i = 1; i < this.columns.length; i++) {
            m = 0
            done = false
            while (!done) {
                square = this.columns[7][i]+7*m
                diagonal.push(square)
                if (this.columns[0].includes(square)) {
                    done = true
                }
                if (this.rows[7].includes(square)) {
                    done = true
                }
                m++
            }
            this.diagonals.push(diagonal)
            diagonal = []
        }
    }
}

class Piece {
    constructor(color, squareOn, type) {
        this.color = color
        this.squareOn = squareOn
        // this.squareOn2 = [0, false]
        this.type = type
        this.validMoves = []
        this.validMoves2 = [] // when secondIsInCheck
    }

    RemoveSameColorPiecesFromMoves(validMovesN) {
        correctMoves = validMovesN.slice()
        for (i = 0; i < pieceList.length; i++) {
            for (m = 0; m < pieceList[i].length; m++) {
                for (n = 0; n < validMovesN.length; n++) {
                    if (pieceList[i][m].squareOn == validMovesN[n] && pieceList[i][m].number != this.number && pieceList[i][m].color == isWhite1) {
                        correctMoves.splice(correctMoves.indexOf(validMovesN[n]), 1)
                    }
                }
            }
        }
        validMovesN = correctMoves.slice()
        return validMovesN
    }

    FilterNonSquaresFromMoves(validMovesN) {
        validMovesN = [...new Map(
            validMovesN.map(x => [JSON.stringify(x), x])
        ).values()]
        validMovesN = validMovesN.filter(e => e != null)
        correctMoves = validMovesN.slice()
        for (i = 0; i < validMovesN.length; i++) {
            if (validMovesN[i] > 64 || validMovesN[i] < 1) {
                correctMoves.splice(correctMoves.indexOf(validMovesN[i]), 1)
            }
        }
        validMovesN = correctMoves.slice()
        return validMovesN
    }
}

class King extends Piece {
    constructor (color, squareOn) {
        super(color, squareOn)
        this.type = "K"
        this.isInCheck = false
    }
    
    IsKingInCheck(lst) {
        for (z = 0; z < lst.length; z++) {
            if (this.color == "w" && lst[z] == K[0].squareOn) {
                this.isInCheck = true
            }
            else if (this.color == "b" && lst[z] == K[1].squareOn) {
                this.isInCheck = true
            }
        }
    }
}

var board = new Board(8, 8)
board.MakeBoard()

var K = []
var Q = []
var B = []
var N = []
var R = []
var P = []

K[0] = new King("w", 61)
K[1] = new King("b", 5)

Q[0] = new Piece("w", 60, "Q")
Q[1] = new Piece("b", 4, "Q")

B[0] = new Piece("w", 59, "B")
B[1] = new Piece("w", 62, "B")
B[2] = new Piece("b", 3, "B")
B[3] = new Piece("b", 6, "B")

N[0] = new Piece("w", 58, "N")
N[1] = new Piece("w", 63, "N")
N[2] = new Piece("b", 2, "N")
N[3] = new Piece("b", 7, "N")

R[0] = new Piece("w", 57, "R")
R[1] = new Piece("w", 64, "R")
R[2] = new Piece("b", 1, "R")
R[3] = new Piece("b", 8, "R")

for (i = 0; i < 8; i++) {
    P.push(new Piece("w", 49+i, "P"))
}
for (i = 0; i < 8; i++) {
    P.push(new Piece("b", 9+i, "P"))
}

// piece list, types, and promoting types
var pieceList = [K, Q, B, N, R, P]
var pieceTypes = ["K", "Q", "B", "N", "R", "P"]
var whitePieceTypes = ["k", "q", "b", "n", "r", "p"]
var allPieceTypes = [whitePieceTypes, pieceTypes] // white and black piece types
var promoteTypes = ["Q", "B", "N", "R"]

// row and file of square
var r, f, r2, f2;

var canCastle = { // where can you castle
    wK: "",
    wQ: "-",
    bK: "",
    bQ: "-"
}
var castleAdd = false // can you add this to canCastle

var castlePiecesMoved = [] // has the king or the rook moved [wK, bK, wRQ, wRK, bRQ, bRK]

var lookIfInCheck = false // should the pieces be moving or seeing if the king is in check
var isInCheck = false // is the king in check

var timesRun; // does the piece ever attack the same square that the opponent attacks

// var wK = 60
// var wQ = [] 
// var wB = [] 
// var wN = []
// var wR = []
// var wP = []
// var bK = 4
// var bQ = []
// var bB = []
// var bN = []
// var bR = []
// var bP = []

var secondIsInCheck = false // check if a piece blocks the check

// var saveIsInCheckValue; // saves isInCheck value

var saveIsWhiteValue, saveIsWhite1Value; // saves the isWhite and isWhite1 values

// var savePieceValue, savePieceValue2; // save the piece on the square

var selectingPiece; // is the user selecting a piece or en empty square

// var pieceCheckingK; // which piece is checking the king

var fileRank; // file and rank of a piece

// var whereArePiecesW = ["wQ", "wB", "wN", "wR", "wP"] // where is each piece not including kings for WHITE
// var whereArePiecesB = ["bQ", "bB", "bN", "bR", "bP"] // where is each piece not including kings for BLACK

// var lengthOfWherePieces; // length of whereArePiecesW and whereArePiecesB

var currentPiece; // the piece that is moving
// var squareOfPiece; // save the square of a piece
// var startSq = []; // array [wK, bK, wQ, bQ, wQB, wKB, bQB, bKB, wQN, wKN, bQN, bKN, wQR, wKR, bQR, bKR, all pawns white, all pawns black]

var allMovesMade = [] // every move that has been made
var numFullMoves; // the number of full moves (w and b both went)
var numHalfMoves; // the number of moves since a pawn move or a capture

var possibleEnPassant = [["-", "-"], ["-", "-"]]; // possible en Passant moves, possibleEnPassant is for square num (30, 31, etc.),
var possibleEnPassant2; // possible en Passant moves, possibleEnPassant2 is for the chess notation (e4, f4, etc.)

var promotingPiece; // what piece is promoting
var promoted = true; // did the piece promote

var numberForPieces = 1; // unique num for each piece

var addedPiece; // is there a piece on that square (checks if a piece got added, true if yes, false if no)

var piecesStopMate; // does a piece stop checkmate

var isMate; // is the king checkmated

var addPieceSpot; // add piece squareOn in AttackingMoves()

var isComputerMove; // is it the computer's turn

var changeSquareOn = true

var middleEnd = "M";

var maxDepth;

var quiesceScore; // also known as stand_pat

// // NOT NEEDED
// var squaresExtra = [
//     0,  1,  2,  3,  4,  5,  6,  7,
//     8,  9,  10, 11, 12, 13, 14, 15,
//     16, 17, 18, 19, 20, 21, 22, 23,
//     24, 25, 26, 27, 28, 29, 30, 31,
//     32, 33, 34, 35, 36, 37, 38, 39,
//     40, 41, 42, 43, 44, 45, 46, 47,
//     48, 49, 50, 51, 52, 53, 54, 55,
//     56, 57, 58, 59, 60, 61, 62, 63
// ]

// // board with numbers
// var squares1 = [
//     1,  2,  3,  4,  5,  6,  7,  8,
//     9,  10, 11, 12, 13, 14, 15, 16,
//     17, 18, 19, 20, 21, 22, 23, 24,
//     25, 26, 27, 28, 29, 30, 31, 32,
//     33, 34, 35, 36, 37, 38, 39, 40,
//     41, 42, 43, 44, 45, 46, 47, 48,
//     49, 50, 51, 52, 53, 54, 55, 56,
//     57, 58, 59, 60, 61, 62, 63, 64
// ]

// how will it look, where does each piece go
var boardRepresent = []
// var boardRepresent2 = [] // ghost board