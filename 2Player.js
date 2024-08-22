// EXTRA CODE --> GIRLS CODE CHESS CLASS
// var whoWinning = 0
// CheckWin(whitePieces, blackPieces)
// // wP = white pieces, bP = blackPieces
// function CheckWin(wP, bP){
//     if(bP > wP){
//         whoWinning = -1
//     }
//     else if(wP > bP){
//         whoWinning = 1
//     }
//     else{
//         whoWinning = 0
//     }
// }

// STRICT MODE
'use strict';

var i, m, n, v; // for loop variables
var k, h, y; // for loop variables for AttackingMoves()ONLY
var a; // for loop variable for wherePieces ONLY
var z; // for loop variable for isKingInCheck ONLY
var b, c, d; // for loop variables for checking if a piece blocks the check ONLY
let e, g; // for loop variables for PiecesMovesCheck() ONLY

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

// row and file of square
var r, f, r2, f2;

var canCastle = {
    wK: "",
    wQ: "-",
    bK: "",
    bQ: "-"
} // where can you castle
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
    constructor(color, squareOn) {
        this.color = color
        this.squareOn = squareOn
        // this.squareOn2 = [0, false]
        this.validMoves = []
        this.validMoves2 = [] // when secondIsInCheck
        this.onBoard = true
    }

    RemoveSameColorPiecesFromMoves(validMovesN) {
        correctMoves = JSON.parse(JSON.stringify(validMovesN))
        for (i = 0; i < pieceList.length; i++) {
            for (m = 0; m < pieceList[i].length; m++) {
                for (n = 0; n < validMovesN.length; n++) {
                    if (pieceList[i][m].squareOn == validMovesN[n] && pieceList[i][m].number != this.number && pieceList[i][m].color == isWhite1 && pieceList[i][m].onBoard == true) {
                        correctMoves.splice(correctMoves.indexOf(validMovesN[n]), 1)
                    }
                }
            }
        }
        validMovesN = JSON.parse(JSON.stringify(correctMoves))
        return validMovesN
    }

    FilterNonSquaresFromMoves(validMovesN) {
        validMovesN = [...new Map(
            validMovesN.map(x => [JSON.stringify(x), x])
        ).values()]
        validMovesN = validMovesN.filter(e => e != null)
        correctMoves = JSON.parse(JSON.stringify(validMovesN))
        for (i = 0; i < validMovesN.length; i++) {
            if (validMovesN[i] > 64 || validMovesN[i] < 1) {
                correctMoves.splice(correctMoves.indexOf(validMovesN[i]), 1)
            }
        }
        validMovesN = JSON.parse(JSON.stringify(correctMoves)) 
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
            if (this.color == "w" && lst[z] == this.squareOn) {
                this.isInCheck = true
            }
            else if (this.color == "b" && lst[z] == this.squareOn) {
                this.isInCheck = true
            }
        }
    }
}

class Queen extends Piece {
    constructor (color, squareOn) {
        super(color, squareOn)
        this.type = "Q"
    }
}

class Bishop extends Piece {
    constructor (color, squareOn) {
        super(color, squareOn)
        this.type = "B"
    }
}

class Knight extends Piece {
    constructor (color, squareOn) {
        super(color, squareOn)
        this.type = "N"
    }
}

class Rook extends Piece {
    constructor (color, squareOn) {
        super(color, squareOn)
        this.type = "R"
    }
}

class Pawn extends Piece {
    constructor (color, squareOn) {
        super(color, squareOn)
        this.type = "P"
    }
}

var board = new Board(8, 8)
board.MakeBoard()

var K = []
K[0] = new King("w", 61)
K[1] = new King("b", 5)

var Q = []
Q[0] = new Queen("w", 60)
Q[1] = new Queen("b", 4)

var B = []
B[0] = new Bishop("w", 59)
B[1] = new Bishop("w", 62)
B[2] = new Bishop("b", 3)
B[3] = new Bishop("b", 6)

var N = []
N[0] = new Knight("w", 58)
N[1] = new Knight("w", 63)
N[2] = new Knight("b", 2)
N[3] = new Knight("b", 7)

var R = []
R[0] = new Rook("w", 57)
R[1] = new Rook("w", 64)
R[2] = new Rook("b", 1)
R[3] = new Rook("b", 8)

var P = []
for (i = 0; i < 8; i++) {
    P.push(new Pawn("w", 49+i))
}
for (i = 0; i < 8; i++) {
    P.push(new Pawn("b", 9+i))
}

// var whereArePiecesW = ["wQ", "wB", "wN", "wR", "wP"] // where is each piece not including kings for WHITE
// var whereArePiecesB = ["bQ", "bB", "bN", "bR", "bP"] // where is each piece not including kings for BLACK

// var lengthOfWherePieces; // length of whereArePiecesW and whereArePiecesB

var pieceList2 = ["bP", "bK", "bQ", "bN", "bB", "bR", "wP", "wK", "wQ", "wN", "wB", "wR"] // all the pieces
var pieceList = [K, Q, B, N, R, P]
var whitePieceList2 = ["wP", "wK", "wQ", "wN", "wB", "wR"] // all the white pieces
var blackPieceList2 = ["bP", "bK", "bQ", "bN", "bB", "bR"] // all the black pieces
var whitePieceList = ["wP", "wK", "wQ", "wN", "wB", "wR"] // all the white pieces
var blackPieceList = ["bP", "bK", "bQ", "bN", "bB", "bR"] // all the black pieces

var currentPiece; // the piece that is moving
// var squareOfPiece; // save the square of a piece
var startSq = []; // array [wK, bK, wQ, bQ, wQB, wKB, bQB, bKB, wQN, wKN, bQN, bKN, wQR, wKR, bQR, bKR, all pawns white, all pawns black]

var allMovesMade = [] // every move that has been made
var numFullMoves; // the number of full moves (w and b both went)
var numHalfMoves; // the number of moves since a pawn move or a capture

var possibleEnPassant = [["-", "-"], ["-", "-"]]; // possible en Passant moves, possibleEnPassant is for square num (30, 31, etc.),
var possibleEnPassant2; // possible en Passant moves, possibleEnPassant2 is for the chess notation (e4, f4, etc.)

var promotingPiece; // what piece is promoting, form = "Piece[index]"
var promoted = true; // did the piece promote

var numberForPieces = 1; // unique num for each piece

var addedPiece; // is there a piece on that square (checks if a piece got added, true if yes, false if no)

var piecesStopMate; // does a piece stop checkmate

var isMate; // is the king checkmated

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

function StartGame(){
    isWhite = "w"

    for (i = 0; i < pieceList.length; i++) {
        for (m = 0; m < pieceList[i].length; m++) {
            pieceList[i][m].number = numberForPieces
            pieceList[i][m].index = m
            numberForPieces ++
        }
    }
    
    for (i = 1; i < 65; i++) {
        addedPiece = false
        for (m = 0; m < pieceList.length; m++) {
            for (n = 0; n < pieceList[m].length; n++) {
                if (pieceList[m][n].squareOn == i) {
                    addedPiece = true
                    if(pieceList[m][n].color == "w") {
                        boardRepresent.push(pieceList[m][n].type.toLowerCase())
                    }
                    else {
                        boardRepresent.push(pieceList[m][n].type)
                    }
                    
                    // boardRepresent2.push(pieceList[m][n].color + pieceList[m][n].type)
                }
            }
        }
        if (!addedPiece) {
            boardRepresent.push(" ")
            // boardRepresent2.push(" ")
        }
    }


    numFullMoves = 0
    numHalfMoves = 0

    AddMoveToList()

    for (i = 0; i < 6; i++) {
        castlePiecesMoved.push(false)
    }

    for (i = 0; i < pieceList.length; i++) {
        for (m = 0; m < pieceList[i].length; m++) {
            startSq.push(pieceList[i][m].squareOn)
        }
    }

    Reset()
}

function ClearBoard(){
    // CLEAR THE BOARD
    for(m = 1; m < 65; m++){
        square = m
        // SET SQUARE-TENS AND SQUARE-ONES
        if(square > 9){
            squareTens = Math.floor((square / Math.pow(10, 1)) % 10).toString()
            squareOnes = Math.floor((square / Math.pow(10, 0)) % 10).toString()
        }
        else{
            squareOnes = Math.floor((square / Math.pow(10, 0)) % 10).toString()
        }
        // CLEAR BOARD
        if(square < 10){
            pieceAdd = document.querySelector("#\\3" + squareOnes).querySelector(".pieces")
            $(pieceAdd).attr("class", "pieces")
        }
        else{
            pieceAdd = document.querySelector("#\\3" + squareTens + " " + squareOnes).querySelector(".pieces")
            $(pieceAdd).attr("class", "pieces")
        }
        
    }
}

function Reset(){
    // Clear the board
    ClearBoard()

    // Place pieces on the board
    for(i = 0; i < pieceList.length; i++) {
        for (m = 0; m < pieceList[i].length; m++) {
            if (pieceList[i][m].onBoard) {
                square = pieceList[i][m]
            
                // SET SQUARE-TENS AND SQUARE-ONES
                if(square.squareOn > 9){
                    squareTens = Math.floor((square.squareOn / Math.pow(10, 1)) % 10).toString()
                    squareOnes = Math.floor((square.squareOn / Math.pow(10, 0)) % 10).toString()
                }
                else{
                    squareOnes = Math.floor((square.squareOn / Math.pow(10, 0)) % 10).toString()
                }
    
                // SET PIECES UP
                if(square.squareOn < 10){
                    document.querySelector("#\\3" + squareOnes).querySelector(".pieces").classList.add(square.color + square.type)
                }
                else{
                    document.querySelector("#\\3" + squareTens + " " + squareOnes).querySelector(".pieces").classList.add(square.color + square.type)
                }
            }
        }
    }
    
}

function FileRankToSquare(fileInput, rankInput) {
    return fileInput + (rankInput-1)*8
}

function SquareToFileRank(s) {
    r = Math.ceil(s/8)
    f = s-(r-1)*8
    return [r, f]
}

function PromoteToThis(that) {
    boardRepresent[eval(promotingPiece).squareOn-1] = that.id
    eval(promotingPiece).type = that.id.replace(eval(promotingPiece).color, "")
    if (isWhite == "b") {
        document.getElementById("promoteToW").style = "display: none"
    }
    else {
        document.getElementById("promoteToB").style = "display: none"
    }
    Reset()
    promoted = true
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
    
    correctMoves2 = JSON.parse(JSON.stringify(piece.validMoves))
    for (b = 0; b < piece.validMoves.length; b++) {
        for (c = 0; c < pieceList.length; c++) {
            for (d = 0; d < pieceList[c].length; d++) {
                if (pieceList[c][d].squareOn == piece.validMoves[b] && pieceList[c][d].number != piece.number && pieceList[c][d].onBoard == true) {
                    pieceList[c][d].onBoard = false
                    savePieceValue2 = pieceList[c][d].type.toString() + "[" + pieceList[c][d].index.toString() + "]"
                }
            }
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
        Reset()

        piece.isInCheck = false
        secondIsInCheck = true
        AttackingMoves()
        secondIsInCheck = false

        piece.IsKingInCheck(attackMoves2)

        if (piece.isInCheck == true) {
            correctMoves2.splice(correctMoves2.indexOf(piece.validMoves[b]), 1)
        }

        if (savePieceValue2.length > 0) {
            eval(savePieceValue2).onBoard = true
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
        Reset()

        ResetAllValidMoves("validMoves2")
    }
    piece.validMoves = JSON.parse(JSON.stringify(correctMoves2))
    piece.isInCheck = saveIsInCheckValue[0]

    return piece.validMoves
}

function PiecesMovesCheck(piece) {
    // MAIN - Does a piece block the check/make king be in check
    let savePieceValue2 = []
    let saveIsInCheckValue = [K[0].isInCheck, K[1].isInCheck]

    validMoves = []
    validMoves2 = []
    
    // Get the pieces valid moves
    if (piece.type == "K") {
        KingMoves(piece.squareOn)
    }
    else if (piece.type == "Q") {
        RookMoves(piece.squareOn)
        BishopMoves(piece.squareOn)
    }
    else if (piece.type == "R") {
        RookMoves(piece.squareOn)
    }
    else if (piece.type == "B") {
        BishopMoves(piece.squareOn)
    }
    else if (piece.type == "N") {
        KnightMoves(piece.squareOn)
    }
    else if (piece.type == "P") {
        PawnMoves(piece.squareOn)
        piece.validMoves = piece.validMoves.concat(validMoves2)
    }

    // Add the validmoves to piece.validmoves
    piece.validMoves = piece.validMoves.concat(validMoves)
    // make sure all moves are valid
    piece.validMoves = piece.FilterNonSquaresFromMoves(piece.validMoves)
    piece.validMoves = piece.RemoveSameColorPiecesFromMoves(piece.validMoves)

    // Check if all the moves block check and/or don't make the king be in check
    correctMoves2 = JSON.parse(JSON.stringify(piece.validMoves))
    for (b = 0; b < piece.validMoves.length; b++) {
        for (c = 0; c < pieceList.length; c++) {
            for (d = 0; d < pieceList[c].length; d++) {
                if (pieceList[c][d].squareOn == piece.validMoves[b] && pieceList[c][d].number != piece.number && pieceList[c][d].onBoard == true) {
                    pieceList[c][d].onBoard = false
                    savePieceValue2 = pieceList[c][d].type.toString() + "[" + pieceList[c][d].index.toString() + "]"
                }
            }
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
        Reset()

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
            eval(savePieceValue2).onBoard = true
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
        Reset()

        ResetAllValidMoves("validMoves2")
    }
    secondIsInCheck = false
    K[0].isInCheck = saveIsInCheckValue[0]
    K[1].isInCheck = saveIsInCheckValue[1]
    piece.validMoves = JSON.parse(JSON.stringify(correctMoves2))

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

    // for (i = 0; i < pieceList.length; i++) {
    //     for (m = 0; m < pieceList[i].length; m++) {
    //         if (pieceList[i][m].squareOn2[1]) {
    //             pieceList[i][m].squareOn = pieceList[i][m].squareOn2[0]
    //         }
    //     }
    // }
    let found = [0, -1, -1]
    for (i = 0; i < 64; i++) {
        found[0] = 0
        if (boardRepresent[i] != " ") {
            for (m = 0; m < pieceList.length; m++) {
                for (n = 0; n < pieceList[m].length; n++) {
                    if (pieceList[m][n].squareOn == i+1 && pieceList[m][n].onBoard) {
                        found[0] = 1
                    }
                    if (pieceList[m][n].color == "w") {
                        if (boardRepresent[pieceList[m][n].squareOn-1] != pieceList[m][n].type.toLowerCase() && pieceList[m][n].onBoard) {
                            found[1] = m
                            found[2] = n
                        }
                    }
                    else {
                        if (boardRepresent[pieceList[m][n].squareOn-1] != pieceList[m][n].type && pieceList[m][n].onBoard) {
                            found[1] = m
                            found[2] = n
                        }
                    }
                }
            }
            if (found[0] == 0) {
                pieceList[found[1]][found[2]].squareOn = i+1
            }
        }
    }
    let found2 = [0, 0]
    let pieceColor = ""
    for (i = 0; i < 64; i++) {
        found2 = [0, 0]
        if (boardRepresent[i] != " ") {
            for (m = 0; m < pieceList.length; m++) {
                for (n = 0; n < pieceList[m].length; n++) {
                    if (found2[1] != 1) {
                        if (pieceList[m][n].squareOn == i+1) {
                            found2[0] = m
                            found2[1] = 1
                        }
                        found2[0] = m
                    }
                }
            }
            if (found2[1] == 0) {
                if (boardRepresent[i].toLowerCase() == boardRepresent[i]) {
                    pieceColor = "w"
                }
                else {
                    pieceColor = "b"
                }

                if(boardRepresent[i].toLowerCase() == "q") {
                    pieceList[found2[0]].push(new Queen(pieceColor, i+1))
                }
                else if(boardRepresent[i].toLowerCase() == "n") {
                    pieceList[found2[0]].push(new Knight(pieceColor, i+1))
                }
                else if(boardRepresent[i].toLowerCase() == "b") {
                    pieceList[found2[0]].push(new Bishop(pieceColor, i+1))
                }
                else if(boardRepresent[i].toLowerCase() == "r") {
                    pieceList[found2[0]].push(new Rook(pieceColor, i+1))
                }
                if(boardRepresent[i].toLowerCase() == "p") {
                    pieceList[found2[0]].push(new Pawn(pieceColor, i+1))
                 }
            }
        }
    }
    if (isWhite == "w") {
        isWhite = "b"
    }
    else {
        isWhite = "w"
    }
    
    Reset()
}

function UserMove(clickedId) {
    // Run a move
    if (firstOnclick) {
        selectingPiece = false
        for (i = 0; i < pieceList.length; i++) {
            for (m = 0; m < pieceList[i].length; m++) {
                if (pieceList[i][m].squareOn == parseInt(clickedId) && pieceList[i][m].onBoard == true) {
                    selectingPiece = true
                    currentPiece = pieceList[i][m]
                    // pieceList[i][m].squareOn2[1] = true
                }
                // pieceList[i][m].squareOn2[0] = pieceList[i][m].squareOn
            }
        }
        if (selectingPiece) {
            firstOnclick = false
            moveFromSq = currentPiece.squareOn
            // for(n = 0; n < pieceList.length; n++) {
            //     pieceCheck = pieceList[n]
            //     if(boardRepresent[moveFromSq-1] == pieceCheck) {
            //         movePiece = pieceCheck
            //     }
            // }
            movePiece = currentPiece.type
            isWhite1 = currentPiece.color
    
            WhichMovesValid()
        }
    }
    else {
        moveToSq = parseInt(clickedId)
        ClearBoard()
        firstOnclick = true
        CheckMoveValid()
    }
}

function WhichMovesValid() {
    // Reset variables
    valid = false
    valid2 = false
    validMoves = []
    validMoves2 = []
    validMoves3 = []
    validMoves4 = []
    attackMoves = []
    attackMoves2 = []
    validMovesAdd = false
    correctMoves = []
    piecesStopMate = false

    // Can a king castle
    CanCastle()

    // run function to see where everything can attack
    AttackingMoves()

    // Is a king in check
    if (isWhite1 == "w") {
        K[0].IsKingInCheck(attackMoves)
    }
    else {
        K[1].IsKingInCheck(attackMoves)
    }

    // Resets all valid moves
    ResetAllValidMoves("validMoves")
    ResetAllValidMoves("validMoves2")
    
    // where can the piece move
    if(currentPiece.type == "K") {
        // castling = true
        KingMoves(moveFromSq)
        // RookMoves(validMoves)
    }
    else if(currentPiece.type == "Q") {
        BishopMoves(moveFromSq)
        RookMoves(moveFromSq)
    }
    else if(currentPiece.type == "B") {
        BishopMoves(moveFromSq)
    }
    else if(currentPiece.type == "N") {
        KnightMoves(moveFromSq)
    }
    else if(currentPiece.type == "R") {
        RookMoves(moveFromSq)
    }
    else if(currentPiece.type == "P") {
        PawnMoves(moveFromSq)
    }

    // Add valid moves to the piece that is moving
    currentPiece.validMoves = currentPiece.validMoves.concat(validMoves)
    if (currentPiece.type == "P") {
        currentPiece.validMoves = currentPiece.validMoves.concat(validMoves2)
    }

    // make sure all moves are valid
    currentPiece.validMoves = currentPiece.FilterNonSquaresFromMoves(currentPiece.validMoves)
    currentPiece.validMoves = currentPiece.RemoveSameColorPiecesFromMoves(currentPiece.validMoves)

    if (currentPiece.type == "K") {
        currentPiece.validMoves = KingMovesCheck(currentPiece)
    }
    else {
        currentPiece.validMoves = PiecesMovesCheck(currentPiece)
    }

    for (i = 0; i < currentPiece.validMoves.length; i++) {
        if(currentPiece.validMoves[i] > 9){
            squareTens = Math.floor((currentPiece.validMoves[i] / Math.pow(10, 1)) % 10).toString()
            squareOnes = Math.floor((currentPiece.validMoves[i] / Math.pow(10, 0)) % 10).toString()
        }
        else{
            squareOnes = Math.floor((currentPiece.validMoves[i] / Math.pow(10, 0)) % 10).toString()
        }
        if(currentPiece.validMoves[i] < 10){
            pieceAdd = document.querySelector("#\\3" + squareOnes).classList.add("highlight")
        }
        else{
            pieceAdd = document.querySelector("#\\3" + squareTens + " " + squareOnes).classList.add("highlight")
        }
    }

    if(currentPiece.squareOn > 9){
        squareTens = Math.floor((currentPiece.squareOn / Math.pow(10, 1)) % 10).toString()
        squareOnes = Math.floor((currentPiece.squareOn / Math.pow(10, 0)) % 10).toString()
    }
    else{
        squareOnes = Math.floor((currentPiece.squareOn / Math.pow(10, 0)) % 10).toString()
    }
    if(currentPiece.squareOn < 10){
        pieceAdd = document.querySelector("#\\3" + squareOnes).classList.add("highlight")
    }
    else{
        pieceAdd = document.querySelector("#\\3" + squareTens + " " + squareOnes).classList.add("highlight")
    }

    // // resets whereArePieces
    // ResetWhereArePieces()
}

function CheckMoveValid() {
    castleAdd = false
    valid = false
    valid2 = false

    // PROMOTION
    if (isWhite == "w" && movePiece == "P") {
        fileRank = SquareToFileRank(moveToSq)
        if (fileRank[0] == 1) {
            promotingPiece = currentPiece.type.toString() + "[" + currentPiece.index.toString() + "]"
            document.getElementById("promoteToW").style = "display: flex"
            promoted = false
        }
    }
    else if (isWhite == "b" && movePiece == "P") {
        fileRank = SquareToFileRank(moveToSq)
        if (fileRank[0] == 8) {
            promotingPiece = currentPiece.type.toString() + "[" + currentPiece.index.toString() + "]"
            document.getElementById("promoteToB").style = "display: flex"
            promoted = false
        }
    }

    // VALID MOVES
    for (i = 0; i < currentPiece.validMoves.length; i++) {
        if(currentPiece.validMoves[i] == moveToSq) {
            valid = true
        }
        // else if(validMoves[i] != moveToSq && valid == false) {
        //     valid = false
        // }
    }

    // CASTLING
    if (movePiece == "K") {
        for (i = 0; i < currentPiece.validMoves.length; i++) {
            if (currentPiece.validMoves[i] == moveFromSq-2 && moveFromSq-2 == moveToSq) {
                if (isWhite == "w" && (canCastle.wQ != "" && canCastle.wQ != "-")) {
                    R[0].squareOn = R[0].squareOn+3
                }
                else if (isWhite == "b" && (canCastle.bQ != "" && canCastle.bQ != "-")) {
                    R[2].squareOn = R[2].squareOn+3
                }
            }
            if (currentPiece.validMoves[i] == moveFromSq+2 && moveFromSq+2 == moveToSq) {
                if (isWhite == "w" && canCastle.wK != "") {
                    R[1].squareOn = R[1].squareOn-2
                }
                else if (isWhite == "b" && canCastle.bK != "") {
                    R[3].squareOn = R[3].squareOn-2
                }
            }
        }
    }

    if(isWhite != isWhite1) {
        valid = false
    }

    if (moveFromSq == moveToSq) {
        valid = false
    }

    for (i = 0; i < currentPiece.validMoves.length; i++) {
        if(currentPiece.validMoves[i] > 9){
            squareTens = Math.floor((currentPiece.validMoves[i] / Math.pow(10, 1)) % 10).toString()
            squareOnes = Math.floor((currentPiece.validMoves[i] / Math.pow(10, 0)) % 10).toString()
        }
        else{
            squareOnes = Math.floor((currentPiece.validMoves[i] / Math.pow(10, 0)) % 10).toString()
        }
        if(currentPiece.validMoves[i] < 10){
            pieceAdd = document.querySelector("#\\3" + squareOnes).classList.remove("highlight")
        }
        else{
            pieceAdd = document.querySelector("#\\3" + squareTens + " " + squareOnes).classList.remove("highlight")
        }
    }

    if(moveFromSq > 9){
        squareTens = Math.floor((moveFromSq / Math.pow(10, 1)) % 10).toString()
        squareOnes = Math.floor((moveFromSq / Math.pow(10, 0)) % 10).toString()
    }
    else{
        squareOnes = Math.floor((moveFromSq / Math.pow(10, 0)) % 10).toString()
    }
    if(moveFromSq < 10){
        pieceAdd = document.querySelector("#\\3" + squareOnes).classList.remove("highlight")
    }
    else{
        pieceAdd = document.querySelector("#\\3" + squareTens + " " + squareOnes).classList.remove("highlight")
    }

    if(valid == true && (promoted || currentPiece === eval(promotingPiece))){
        if (boardRepresent[moveToSq-1] != " ") {
            for (i = 0; i < pieceList.length; i++) {
                for (m = 0; m < pieceList[i].length; m++) {
                    if (pieceList[i][m].squareOn == moveToSq && pieceList[i][m].number != currentPiece.number) {
                        // pieceList[i][m].onBoard = false
                        pieceList[i].splice(m, 1)
                        numHalfMoves = -1
                    }
                }
            }
        }

        boardRepresent[moveFromSq-1] = " "
        currentPiece.squareOn = moveToSq

        if (movePiece == "P") {
            numHalfMoves = -1
        }

        if (isWhite == "w") {
            if (moveToSq == possibleEnPassant[0][0]-8) {
                P[possibleEnPassant[0][1].index].onBoard = false
            }
        }
        else {
            if (moveToSq == possibleEnPassant[0][0]+8) {
                P[possibleEnPassant[0][1].index].onBoard = false
            }
        }

        if(isWhite == "w") {
            boardRepresent[moveToSq-1] = currentPiece.type.toLowerCase()
            // boardRepresent2 = JSON.parse(JSON.stringify(boardRepresent))

            isWhite = "b"
            numFullMoves++ // one full move has been made (w and b)
            
            if (K[0].squareOn != startSq[0]) {
                castlePiecesMoved[0] = true
            }
            if (R[1].squareOn != startSq[13]) {
                castlePiecesMoved[3] = true // kingside rook
            }
            if (R[0].squareOn != startSq[12]) {
                castlePiecesMoved[2] = true // queenside rook
            }
        }
        else {
            boardRepresent[moveToSq-1] = currentPiece.type
            // boardRepresent2 = JSON.parse(JSON.stringify(boardRepresent))
                        
            isWhite = "w"
            numFullMoves++ // one full move has been made (w and b)

            if (K[1].squareOn != startSq[1]) {
                castlePiecesMoved[1] = true
            }
            if (R[3].squareOn != startSq[15]) {
                castlePiecesMoved[5] = true // kingside rook
            }
            if (R[2].squareOn != startSq[14]) {
                castlePiecesMoved[4] = true // queenside rook
            }
        }

        possibleEnPassant[0] = JSON.parse(JSON.stringify(possibleEnPassant[1]))
        possibleEnPassant[1] = ["-", "-"]

        if (isWhite == "w") {
            isWhite1 = "w"

            secondIsInCheck = true
            AttackingMoves()
            secondIsInCheck = false

            K[0].IsKingInCheck(attackMoves2)
            KingMoves(K[0].squareOn)
            K[0].validMoves = validMoves
            K[0].validMoves = K[0].FilterNonSquaresFromMoves(K[0].validMoves)
            K[0].validMoves = K[0].RemoveSameColorPiecesFromMoves(K[0].validMoves)
            K[0].validMoves = KingMovesCheck(K[0])

            for (e = 1; e < pieceList.length; e++) {
                for (g = 0; g < pieceList[e].length; g++) {
                    if (pieceList[e][g].color == "w" && pieceList[e][g].onBoard) {
                        pieceList[e][g].validMoves = PiecesMovesCheck(pieceList[e][g])
                        if (pieceList[e][g].validMoves.length != 0) {
                            if (pieceList[e][g].validMoves[0] != pieceList[e][g].squareOn) {
                                piecesStopMate = true
                            }
                        }
                    }
                }
            }

            isMate = K[0].validMoves.length == 0 && !piecesStopMate
        }
        else {
            isWhite1 = "b"

            secondIsInCheck = true
            AttackingMoves()
            secondIsInCheck = false

            K[1].IsKingInCheck(attackMoves2)
            KingMoves(K[1].squareOn)
            K[1].validMoves = validMoves
            K[1].validMoves = K[1].FilterNonSquaresFromMoves(K[1].validMoves)
            K[1].validMoves = K[1].RemoveSameColorPiecesFromMoves(K[1].validMoves)
            K[1].validMoves = KingMovesCheck(K[1])

            for (e = 1; e < pieceList.length; e++) {
                for (g = 0; g < pieceList[e].length; g++) {
                    if (pieceList[e][g].color == "b" && pieceList[e][g].onBoard) {
                        pieceList[e][g].validMoves = PiecesMovesCheck(pieceList[e][g])
                        if (pieceList[e][g].validMoves.length != 0) {
                            if (pieceList[e][g].validMoves[0] != pieceList[e][g].squareOn) {
                                piecesStopMate = true
                            }
                        }
                    }
                }
            }

            isMate = K[1].validMoves.length == 0 && !piecesStopMate
        }

        if (!isMate) {
            // Can a king castle
            CanCastle()

            // Reset isInCheck values
            K[0].isInCheck = false
            K[1].isInCheck = false

            // adds the move to the list of moves
            numHalfMoves++ // add to the number of half moves since a capture or a pawn move
            AddMoveToList()

            // Reset all valid moves
            ResetAllValidMoves("validMoves")
            ResetAllValidMoves("validMoves2")
            // Resets the board on the player's/players' screen
            Reset()
        }
        else {
            if (K[0].isInCheck || K[1].isInCheck) {
                isMate = "mate"
            }
            else {
                isMate = "draw"
            }
            console.log(isMate)
        }
    }
    else{
        possibleEnPassant[1] = ["-", "-"]

        // Reset all valid moves
        ResetAllValidMoves("validMoves")
        ResetAllValidMoves("validMoves2")
        // Resets the board on the player's/players' screen
        Reset()
    }
}

function KingMoves(x) {
    validMoves = [x-1, x+1, x-8, x+8, x-7, x+7, x-9, x+9]

    correctMoves = JSON.parse(JSON.stringify(validMoves))
    for (i = 0; i < validMoves.length; i++) {
        if ((x % 8 == 1 && validMoves[i] % 8 == 0) || (x % 8 == 0 && validMoves[i] % 8 == 1)) {
            correctMoves.splice(correctMoves.indexOf(validMoves[i]), 1)
        }
    }
    validMoves = JSON.parse(JSON.stringify(correctMoves))

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
        validMoves3 = JSON.parse(JSON.stringify(validMoves))
    }
}

function BishopMoves(x) {
    for (i = 0; i < board.diagonals.length; i++) {
        correctMoves = JSON.parse(JSON.stringify(board.diagonals[i]))
        if(board.diagonals[i].includes(x)){
            for(m = 0; m < board.diagonals[i].length; m++) {
                for(n = 0; n < pieceList.length; n++) {
                    for (v = 0; v < pieceList[n].length; v++) {
                        if(pieceList[n][v].squareOn == board.diagonals[i][m] && board.diagonals[i][m] != x && pieceList[n][v].onBoard == true) {
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
}

function KnightMoves(x) {
    validMoves3 = [x-15, x+15, x-17, x+17, x-6, x+6, x-10, x+10]

    correctMoves = JSON.parse(JSON.stringify(validMoves3))
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
    validMoves3 = JSON.parse(JSON.stringify(correctMoves))

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
        validMoves3 = JSON.parse(JSON.stringify(correctMoves))
    }
    else {
        validMoves = JSON.parse(JSON.stringify(correctMoves))
        validMoves3 = []
    }
}

function RookMoves(x) {
    // ROWS
    for(i = 0; i < board.rows.length; i++) {
        correctMoves = JSON.parse(JSON.stringify(board.rows[i]))
        if(board.rows[i].includes(x)) {
            for(m = 0; m < board.rows[i].length; m++) {
                for(n = 0; n < pieceList.length; n++) {
                    for(v = 0; v < pieceList[n].length; v++) {
                        if(pieceList[n][v].squareOn == board.rows[i][m] && board.rows[i][m] != x && pieceList[n][v].onBoard == true) {
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
        correctMoves = JSON.parse(JSON.stringify(board.columns[i]))
        if(board.columns[i].includes(x)) {
            for(m = 0; m < board.columns[i].length; m++) {
                for(n = 0; n < pieceList.length; n++) {
                    for(v = 0; v < pieceList[n].length; v++) {
                        if(pieceList[n][v].squareOn == board.columns[i][m] && board.columns[i][m] != x && pieceList[n][v].onBoard == true) {
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
}

function PawnMoves(x) {
    fileRank = SquareToFileRank(x)
    r2 = fileRank[0]
    if(isWhite1 == "w") {
        validMoves3 = [x-8, x-16] // move forward
        validMoves4 = [x-7, x-9] // take a piece

        correctMoves = JSON.parse(JSON.stringify(validMoves3))
        
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
            validMoves3 = JSON.parse(JSON.stringify(correctMoves))
        }
        else {
            validMoves = JSON.parse(JSON.stringify(correctMoves))
            validMoves3 = []
        }

        correctMoves = JSON.parse(JSON.stringify(validMoves4))
        for (i = 0; i < validMoves4.length; i++) { // Check if there is a piece to take
            if (possibleEnPassant[0][0]-8 != validMoves4[i] || possibleEnPassant[0][1].color == isWhite1) {
                if (boardRepresent[validMoves4[i]-1] == " ") {
                    correctMoves.splice(correctMoves.splice(correctMoves.indexOf(validMoves4[i]), 1))
                }
                else {
                    fileRank = SquareToFileRank(validMoves4[i])
                    if (fileRank[0] != r2-1) {
                        correctMoves.splice(correctMoves.splice(correctMoves.indexOf(validMoves4[i]), 1))
                    }
                }
            }
        }

        if (secondIsInCheck) {
            validMoves4 = JSON.parse(JSON.stringify(correctMoves))
        }
        else {
            validMoves2 = JSON.parse(JSON.stringify(correctMoves))
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

        correctMoves = JSON.parse(JSON.stringify(validMoves3))
        
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
            validMoves3 = JSON.parse(JSON.stringify(correctMoves))
        }
        else {
            validMoves = JSON.parse(JSON.stringify(correctMoves))
            validMoves3 = []
        }

        correctMoves = JSON.parse(JSON.stringify(validMoves4))
        for (i = 0; i < validMoves4.length; i++) { // Check if there is a piece to take
            if (possibleEnPassant[0][0]+8 != validMoves4[i] || possibleEnPassant[0][1].color == isWhite1) {
                if (boardRepresent[validMoves4[i]-1] == " ") {
                    correctMoves.splice(correctMoves.splice(correctMoves.indexOf(validMoves4[i]), 1))
                }
                else {
                    fileRank = SquareToFileRank(validMoves4[i])
                    if (fileRank[0] != r2+1) {
                        correctMoves.splice(correctMoves.splice(correctMoves.indexOf(validMoves4[i]), 1))
                    }
                }
            }
        }

        if (secondIsInCheck) {
            validMoves4 = JSON.parse(JSON.stringify(correctMoves))
        }
        else {
            validMoves2 = JSON.parse(JSON.stringify(correctMoves))
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
            if (B[1].squareOn != startSq[5] && N[1].squareOn != startSq[9]) {
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
            if (B[0].squareOn != startSq[4] && N[0].squareOn != startSq[8] && Q[0].squareOn != startSq[2]) {
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
            if (B[3].squareOn != startSq[7] && N[1].squareOn != startSq[11]) {
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
            if (B[2].squareOn != startSq[6] && N[0].squareOn != startSq[10] && Q[1].squareOn != startSq[3]) {
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

function AttackingMoves() {
    if (secondIsInCheck) {
        attackMoves2 = []
        
    }
    else {
        attackMoves = []
    }

    saveIsWhiteValue = isWhite
    saveIsWhite1Value = isWhite1

    if (isWhite1 == "w") {
        isWhite1 = "b"
        isWhite = "b"
    }
    else {
        isWhite1 = "w"
        isWhite = "w"
    }

    for (k = 0; k < pieceList.length; k++) {
        for (h = 0; h < pieceList[k].length; h++) {
            if (pieceList[k][h].onBoard && isWhite1 == pieceList[k][h].color) {
                if (pieceList[k][h].type == "K") {
                    KingMoves(pieceList[k][h].squareOn)
                }
                else if (pieceList[k][h].type == "Q") {
                    RookMoves(pieceList[k][h].squareOn)
                    if (secondIsInCheck) {
                        pieceList[k][h].validMoves2 = pieceList[k][h].validMoves2.concat(validMoves3)

                        validMoves3 = []
                    }
                    else {
                        pieceList[k][h].validMoves = pieceList[k][h].validMoves.concat(validMoves)
                        // console.log(pieceList[k][h].validMoves)

                        validMoves = []
                    }

                    BishopMoves(pieceList[k][h].squareOn)
                    // console.log("Q")
                }
                else if (pieceList[k][h].type == "B") {
                    BishopMoves(pieceList[k][h].squareOn)
                    // console.log("B")
                }
                else if (pieceList[k][h].type == "N") {
                    KnightMoves(pieceList[k][h].squareOn)
                    // console.log("N")
                }
                else if (pieceList[k][h].type == "R") {
                    RookMoves(pieceList[k][h].squareOn)
                    // console.log("R")
                }
                else if (pieceList[k][h].type == "P") {
                    PawnMoves(pieceList[k][h].squareOn)
                    // console.log("P")
                }
                if (secondIsInCheck) {
                    pieceList[k][h].validMoves2 = pieceList[k][h].validMoves2.concat(validMoves3)
                    pieceList[k][h].validMoves2 = pieceList[k][h].FilterNonSquaresFromMoves(pieceList[k][h].validMoves2)
                    pieceList[k][h].validMoves2 = pieceList[k][h].RemoveSameColorPiecesFromMoves(pieceList[k][h].validMoves2)

                    validMoves3 = []

                    // if ((pieceList[k][h].validMoves2.includes(K[0].squareOn) && isWhite == "b") || (pieceList[k][h].validMoves2.includes(K[1].squareOn) && isWhite == "b")) {
                    //     pieceCheckingK = pieceList[k][h]
                    // }
                }
                else {
                    pieceList[k][h].validMoves = pieceList[k][h].validMoves.concat(validMoves)
                    pieceList[k][h].validMoves = pieceList[k][h].FilterNonSquaresFromMoves(pieceList[k][h].validMoves)
                    pieceList[k][h].validMoves = pieceList[k][h].RemoveSameColorPiecesFromMoves(pieceList[k][h].validMoves)
                    // console.log(pieceList[k][h].validMoves)

                    validMoves = []

                    // if ((pieceList[k][h].validMoves.includes(K[0].squareOn) && isWhite == "b") || (pieceList[k][h].validMoves.includes(K[1].squareOn) && isWhite == "w")) {
                    //     pieceCheckingK = pieceList[k][h]
                    // }
                }

                // console.log(window[whereIsPiece[k]][h]+1)
                // console.log(attackMoves)
                // console.log(validMoves3)
                // console.log(validMoves4)
                if (secondIsInCheck) {
                    validMoves3 = []
                    validMoves4 = []
                }
                else {
                    validMoves = []
                    validMoves2 = []
                }
            }
        }
    }

    // add all the squares the pieces are on
    for (i = 0; i < pieceList.length; i++) {
        for (m = 0; m < pieceList[i].length; m++) {
            if (secondIsInCheck && pieceList[i][m].onBoard) {
                if (isWhite1 == "w" && pieceList[i][m].color == "w" && pieceList[i][m].onBoard) {
                    pieceList[i][m].validMoves2.push(pieceList[i][m].squareOn)
                }
                else if (isWhite1 == "b" && pieceList[i][m].color == "b" && pieceList[i][m].onBoard) {
                    pieceList[i][m].validMoves2.push(pieceList[i][m].squareOn)
                }
            }
            else if (pieceList[i][m].onBoard) {
                if (isWhite1 == "w" && pieceList[i][m].color == "w" && pieceList[i][m].onBoard) {
                    pieceList[i][m].validMoves.push(pieceList[i][m].squareOn)
                }
                else if (isWhite1 == "b" && pieceList[i][m].color == "b" && pieceList[i][m].onBoard) {
                    pieceList[i][m].validMoves.push(pieceList[i][m].squareOn)
                }
            }
        }
    }

    for (i = 0; i < pieceList.length; i++) {
        for (m = 0; m < pieceList[i].length; m++) {
            if (secondIsInCheck && pieceList[i][m].onBoard) {
                attackMoves2 = attackMoves2.concat(pieceList[i][m].validMoves2)
            }
            else if (pieceList[i][m].onBoard) {
                attackMoves = attackMoves.concat(pieceList[i][m].validMoves)
            }
        }
    }

    // Resets the isWhite1 and isWhite values to what they originally were
    isWhite1 = saveIsWhite1Value
    isWhite = saveIsWhiteValue
}
