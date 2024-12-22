/* IMPORTANT */
var firstOnclick
var isMate
var isComputer

/* Board */
var board
var board64Sq
var boardRepresent = []
var boardRep120 = []
var BOARD = {}
BOARD.WIDTH = 10
BOARD.HEIGHT = 12
var BOARD_SQ_NUM = 120
var SQUARES = {
    A1:21, B1:22, C1:23, D1:24, E1:25, F1:26, G1:27, H1: 28,
    A8:91, B8:92, C8:93, D8:94, E8:95, F8:96, G8:97, H8: 98,
    NO_SQ:99, OFFBOARD:100
}

/* Castling */
var canCastle = { // where can you castle
    wK: 0,
    wQ: 0,
    bK: 0,
    bQ: 0
}
// var canCastle = []
var castlePiecesMoved = [] // has the king or the rook moved [wK, bK, wRQ, wRK, bRQ, bRK]

/* Set Up */
var squareTens;
var squareOnes;
var square;
var pieceAdd;

/* Pieces */
var piece
var pieceList = []
var pieceSquaresW = {}
var pieceSquaresB = {}
var pieceSquares = {}
var pieceTypes = ['K', 'Q', 'B', 'N', 'R', 'P']
var whitePieceTypes = ['k', 'q', 'b', 'n', 'r', 'p']
var allPieceTypes = [whitePieceTypes, pieceTypes] // white and black piece types

// Holds pieces of each type
var K = []
var Q = []
var B = []
var N = []
var R = []
var P = []
var pieceListWithTypes = [K, Q, B, N, R, P]

// Current piece
var currentPiece;
var movePiece;
var moveFromSq;
var moveToSq;

// Attacking Directions
var NDir = [-21, -19, -8, 12, -12, 8, 19, 21]
var RDir = [-1, -10, 1, 10]
var BDir = [-9, -11, 9, 11]
var KDir = [-1, -9, -10, -11, 1, 9, 10, 11]


// Promotion
var promoteTypes = ['Q', 'B', 'N', 'R']
var promoted = false

// En Passant
possibleEnPassant = 100

/* Keep track of color */
var isWhite = 'w'
var isWhite1 = 'w'
var saveIsWhiteValue
var saveIsWhite1Value

/* Num Moves + FEN */
var numFullMoves
var numHalfMoves
var allMovesMade = []

/* Computer */
var isComputerMove = false
var middleEnd = "M";
var maxDepth;
var quiesceScore; // also known as stand_pat
var boardScore;

function PrintBoard(boardRep120) {
    for (var i = 0; i < 8; i++) {
        arr = []
        for (var m = 0; m < 8; m++) {
            arr.push(boardRep120[21+10*i+m])
        }
        console.log(arr)
    }
}
