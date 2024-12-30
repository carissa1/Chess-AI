var pieceValues = {
    // 100 centipawns = 1 pawn
    p: 160,
    P: -160,
    n: 200,
    N: -200,
    b: 200,
    B: -200,
    r: 400,
    R: -400,
    q: 800,
    Q: -800,
    k: 2000,
    K: -2000
}

// multiplier for PSTValues to get closer to pieceValues
// var pieceMultiplier = {
//     P: 5, 
//     N: 7,
//     B: 7,
//     R: 10,
//     Q: 20,
//     K: 40
// }
var pieceMultiplier = {
    P: 8, 
    N: 10,
    B: 10,
    R: 20,
    Q: 40,
    K: 100
}

var PSTValues = {
    pM: [
         0,  0, 0,  0,  0, 0,  0,  0,
         5,  5, 5,  5,  5, 5,  5,  5,
         0,  0, 0,  5,  5, 0,  0,  0,
         0,  0, 0, 15, 15, 0,  0,  0,
       -10,-10, 5, 15, 15, 5,-10,-10,
         0,  5, 0, -5, -5, 0,  5,  0,
         5,  5, 5, -5, -5, 5,  5,  5,
         0,  0, 0,  0,  0, 0,  0,  0
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
        -15,  0,  9,  3,  3,  9,  0,-15,
        -10, -5,  0,  5,  5,  0, -5,-10,
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
        -10,  0,  0,  0,  0,  0,  0,-10,
        -10,  0, 18,  0,  0, 18,  0,-10,
        -10,  0,  0,  7,  7,  0,  0,-10,
        -10, 10,  0, -5, -5,  0, 10,-10,
        -10,-10, -2,-10,-10, -2,-10,-10,
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
          5,  0,  0,  5,  5,  0,  0,  5
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
        -10,  0,  2,  5,  5,  0,  0,-10,
        -10,-10,-10,  5,  0,-10,-10,-10
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
    QM: [
        -10,-10,-10,  5,  0,-10,-10,-10,
        -10,  0,  0,  5,  5,  2,  0,-10,
        -10,  0,  0,  0,  0,  0,  0,-10,
         -5,  0,  0,  0,  0,  0,  0, -5,
         -5,  0,  0,  0,  0,  0,  0, -5,
        -10,  0,  0,  0,  0,  0,  0,-10,
        -10,  0,  0,  0,  0,  0,  0,-10,
        -10,-10,-10, -5, -5,-10,-10,-10,   
    ],
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

PSTValues["PM"] = [...PSTValues["pM"]].reverse()
PSTValues["PE"] = [...PSTValues["pE"]].reverse()
PSTValues["NM"] = [...PSTValues["nM"]].reverse()
PSTValues["NE"] = [...PSTValues["nE"]].reverse()
PSTValues["BM"] = [...PSTValues["bM"]].reverse()
PSTValues["BE"] = [...PSTValues["bE"]].reverse()
PSTValues["RM"] = [...PSTValues["rM"]].reverse()
PSTValues["RE"] = [...PSTValues["rE"]].reverse()
PSTValues["QE"] = [...PSTValues["qE"]].reverse()
PSTValues["KE"] = [...PSTValues["kE"]].reverse()

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

    return sumW + sumB
}
