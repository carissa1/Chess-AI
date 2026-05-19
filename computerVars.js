var pieceValues = {
    // 100 centipawns = 1 pawn
    p: 100,
    P: -100,
    n: 500,
    N: -500,
    b: 500,
    B: -500,
    r: 700,
    R: -700,
    q: 1000,
    Q: -1000,
    k: 10000,
    K: -10000
}

// multiplier for PSTValues to get closer to pieceValues
// var pieceMultiplier = {
//     P: 5, 
//     N: 10,
//     B: 10,
//     R: 20,
//     Q: 40,
//     K: 80
// }
var pieceMultiplier = {
    P: 5, 
    N: 7,
    B: 7,
    R: 10,
    Q: 20,
    K: 40
}

var PSTValues = {
    pM: [
         0,  0, 0,  0,  0, 0,  0, 0,
         5,  5, 5,  0,  0, 5,  5, 5,
         0,  0, 0,  5,  5, 0,  0, 0,
         0,  0, 0, 10, 10, 0,  0, 0,
        -7,-10, 5, 10, 10, 5,-10,-7,
         0,  5, 0,  0,  0, 0,  5, 0,
         5,  5, 5, -5, -5, 5,  5, 5,
         0,  0, 0,  0,  0, 0,  0, 0
    ],
    pE: [
         0,  0,  0,  0,  0,  0,  0,  0,
        10, 10, 10, 10, 10, 10, 10, 10,
         9,  9,  9,  9,  9,  9,  9,  9,
         7,  7,  7,  7,  7,  7,  7,  7,
         5,  5,  5,  5,  5,  5,  5,  5,
         0,  0,  0,  0,  0,  0,  0,  0,
        -5, -5, -5, -5, -5, -5, -5, -5,
         0,  0,  0,  0,  0,  0,  0,  0
    ],
    nM: [
        -10,-10,-10,-10,-10,-10,-10,-10,
        -10, -5,  0,  0,  0,  0, -5,-10,
        -10,  0,  5,  5,  5,  5,  0,-10,
        -10,  0,  5,  7,  7,  5,  0,-10,
        -10,  0,  5,  7,  7,  5,  0,-10,
        -10,  0,  8,  5,  5,  8,  0,-10,
        -10, -5,  0,  7,  7,  0, -5,-10,
        -10, -7,-10,-10,-10,-10, -7,-10,
    ],
    nE: [
        -10,-10,-10,-10,-10,-10,-10,-10,
        -10, -5, -5, -5, -5, -5, -5,-10,
        -10, -5,  7,  5,  5,  7, -5,-10,
        -10, -5,  5, 10, 10,  5, -5,-10,
        -10, -5,  5, 10, 10,  5, -5,-10,
        -10, -5,  7,  5,  5,  7, -5,-10,
        -10, -5, -5, -5, -5, -5, -5,-10,
        -10,-10,-10,-10,-10,-10,-10,-10,
    ],
    bM: [
        -10,-10,-10,-10,-10,-10,-10,-10,
        -10,  0,  0,  0,  0,  0,  0,-10,
        -10,  0,  0,  0,  0,  0,  0,-10,
        -10, -5,  0,  0,  0,  0, -5,-10,
        -10,  0,  7,  0,  0,  7,  0,-10,
        -10,  0,  0,  4,  4,  0,  0,-10,
        -10,  3,  0, -5, -5,  0,  3,-10,
        -10,-10, -5,-10,-10, -5,-10,-10,
    ],
    bE: [
        -10,-10,-10,-10,-10,-10,-10,-10,
        -10, -5, -5, -5, -5, -5, -5,-10,
        -10, -5,  5,  5,  5,  5, -5,-10,
        -10, -5,  5, 10, 10,  5, -5,-10,
        -10, -5,  5, 10, 10,  5, -5,-10,
        -10, -5,  5,  5,  5,  5, -5,-10,
        -10, -5, -5, -5, -5, -5, -5,-10,
        -10,-10,-10,-10,-10,-10,-10,-10,
    ],
    rM: [
         -5,-10,-10,-10,-10,-10,-10, -5,
          0,  5,  5,  5,  5,  5,  5,  0,
         -5,  0,  0,  0,  0,  0,  0, -5,
         -5,  0,  0,  0,  0,  0,  0, -5,
         -5,  0,  0,  0,  0,  0,  0, -5,
         -5,  0,  0,  0,  0,  0,  0, -5,
         -5,  0,  0,  0,  0,  0,  0, -5,
          5,  0,  5,  5,  5,  5,  0,  5
    ],
    rE: [
         0,  0,  0,  0,  0,  0,  0,  0,
        10, 10, 10, 10, 10, 10, 10, 10,
        -5,  0,  0,  0,  0,  0,  0, -5,
        -5,  0,  0,  0,  0,  0,  0, -5,
        -5,  0,  0,  5,  5,  0,  0, -5,
        -5,  0,  0,  5,  5,  0,  0, -5,
        -5,  0,  0,  0,  0,  0,  0, -5,
        -5,  0,  0,  0,  0,  0,  0, -5
    ],
    qM: [
        -10,-10,-10, -5, -5,-10,-10,-10,
        -10,  0,  0,  0,  0,  0,  0,-10,
        -10,  0,  0,  0,  0,  0,  0,-10,
         -5,  0,  0,  0,  0,  0,  0, -5,
         -5,  0,  0,  0,  0,  0,  0, -5,
        -10,  0,  0,  0,  0,  0,  0,-10,
        -10,  0,  3,  5,  5,  0,  0,-10,
        -10,-10,-10,  3,  0,-10,-10,-10
    ],
    qE: [
        -10,-10,-10, -5, -5,-10,-10,-10,
        -10,  0,  0,  0,  0,  0,  0,-10,
        -10,  0,  5,  5,  5,  5,  0,-10,
         -5,  0,  5, 10, 10,  5,  0, -5,
         -5,  0,  5, 10, 10,  5,  0, -5,
        -10,  0,  5,  5,  5,  5,  0,-10,
        -10,  0,  0,  0,  0,  0,  0,-10,
        -10,-10,-10, -5, -5,-10,-10,-20
    ],
    // QM: [
    //     -10,-10,-10,  5,  0,-10,-10,-10,
    //     -10,  0,  0,  5,  5,  2,  0,-10,
    //     -10,  0,  0,  0,  0,  0,  0,-10,
    //      -5,  0,  0,  0,  0,  0,  0, -5,
    //      -5,  0,  0,  0,  0,  0,  0, -5,
    //     -10,  0,  0,  0,  0,  0,  0,-10,
    //     -10,  0,  0,  0,  0,  0,  0,-10,
    //     -10,-10,-10, -5, -5,-10,-10,-10,   
    // ],
    kM: [
        -20,-20,-20,-20,-20,-20,-20,-20,
        -10,-10,-10,-10,-10,-10,-10,-10,
          0, -5, -5, -5, -5, -5, -5,  0,
          0,  0, -5,-10,-10, -5,  0,  0,
          0,  0, -5,-10,-10, -5,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,-10,-10,-10,-10,  0,  0,
          5,  5, 10, -5,  5, -5, 10,  5
    ],
    kE: [
         10, 10, 10, 10, 10, 10, 10, 10,
         10, 10, 10, 10, 10, 10, 10, 10,
          5,  5,  5,  5,  5,  5,  5,  5,
          5,  5,  5,  5,  5,  5,  5,  5,
          2,  2,  2,  2,  2,  2,  2,  2,
          0,  0,  0,  0,  0,  0,  0,  0,
         -5, -5, -5, -5, -5, -5, -5, -5,
        -10,-10,-10,-10,-10,-10,-10,-10
    ],
    KM: [
          5,  5,  5, -5,  5, -5,  5,  5,
          0,  0,-10,-10,-10,-10,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,
          0,  0, -5,-10,-10, -5,  0,  0,
          0,  0, -5,-10,-10, -5,  0,  0,
          0, -5, -5, -5, -5, -5, -5,  0,
        -10,-10,-10,-10,-10,-10,-10,-10,
        -20,-20,-20,-20,-20,-20,-20,-20,
    ],
}

function flipRows(pstVal) {
    let pstNew = [];
    for (let row = 7; row >= 0; row--) {
        pstNew.push(...pstVal.slice(row * 8, row * 8 + 8));
    }
    return pstNew;
}

PSTValues["PM"] = flipRows(PSTValues["pM"])
PSTValues["PE"] = flipRows(PSTValues["pE"])
PSTValues["NM"] = flipRows(PSTValues["nM"])
PSTValues["NE"] = flipRows(PSTValues["nE"])
PSTValues["BM"] = flipRows(PSTValues["bM"])
PSTValues["BE"] = flipRows(PSTValues["bE"])
PSTValues["RM"] = flipRows(PSTValues["rM"])
PSTValues["RE"] = flipRows(PSTValues["rE"])
PSTValues["QM"] = flipRows(PSTValues["qM"])
PSTValues["QE"] = flipRows(PSTValues["qE"])
PSTValues["KM"] = flipRows(PSTValues["kM"])
PSTValues["KE"] = flipRows(PSTValues["kE"])

function getPSTScore(typeCase, square, type) {
    return parseInt(PSTValues[typeCase+middleEnd][square]) * pieceMultiplier[type]
}

function endOrMiddleGame() { // is it the end or middle game
    // TODO: remove pieceListWithTypes
    if (numFullMoves >= 20 || pieceListWithTypes[1].length == 0) {
        return "E"
    }
    else {
        return "M"
    }
}

function GetScore() { // don't need board parameter because boardRep120 already set
    let sumB = 0
    let sumW = 0
    let type = 0
    middleEnd = endOrMiddleGame(); 

    for (let i = 0; i < pieceList.length; i++) {
        if (pieceList[i].color == "w") {
            type = pieceList[i].type.toLowerCase()
            sumW += pieceValues[type]
            sumW += getPSTScore(type, pieceList[i].squareOn, pieceList[i].type)
        }
        else {
            type = pieceList[i].type
            sumB += pieceValues[type]
            sumB -= getPSTScore(type, pieceList[i].squareOn, pieceList[i].type)
        }
    }

    return sumW + sumB
}

function GetScoreBoard() { // only using boardRep120, not pieceList
    let sumB = 0
    let sumW = 0
    let type = 0
    let sq120 = 0
    middleEnd = endOrMiddleGame(); 

    for (let i = 0; i < 64; i++) {
        sq120 = Sq64to120(i)
        if (boardRep120[sq120] != ' ' && boardRep120[sq120] != '_') {
            type = boardRep120[sq120].toUpperCase()
            if (boardRep120[sq120] != type) {
                sumW += pieceValues[boardRep120[sq120]]
                sumW += getPSTScore(boardRep120[sq120], i, type)
            }
            else {   
                sumB += pieceValues[boardRep120[sq120]]
                sumB -= getPSTScore(boardRep120[sq120], i, type)
            }
        }
    }

    if (hasCastled[0] && middleEnd == 'M') { sumW += 100; }
    if (hasCastled[1] && middleEnd == 'M') { sumB -= 100; }

    return sumW + sumB
}

function GetScoreTesting(board) {
    let sumB = 0
    let sumW = 0
    let type = 0
    middleEnd = endOrMiddleGame(); 

    for (let i = 0; i < 64; i++) {
        if (board[i] != ' ' && board[i] != '_') {
            type = board[i].toUpperCase()
            if (board[i] != type) {
                sumW += pieceValues[board[i]]
                sumW += getPSTScore(board[i], i, type)
            }
            else {   
                sumB += pieceValues[board[i]]
                sumB -= getPSTScore(board[i], i, type)
            }
        }
    }

    if (hasCastled[0] && middleEnd == 'M') { sumW += 100; }
    if (hasCastled[1] && middleEnd == 'M') { sumB -= 100; }

    return sumW + sumB
}

board2 = [  'R', 'N', 'B', 'Q', 'K', 'B', ' ', 'R',
            'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'N',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', 'p', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            'p', 'p', 'p', 'p', ' ', 'p', 'p', 'p',
            'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'
]
