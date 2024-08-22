/* Clear Board */
function ClearBoard(){
    /* Clears the board on screen by removing all pieces */
    
    for(var i = 1; i < 65; i++){
        square = i
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
        
        // Reset boardRep120
        boardRep120[Sq64to120(i)] = ' '
    }
}

/* Reset Pieces */
function ResetPieces() {
    /* Reset all pieces on boardRepresent and reset squareOn120 */

    var pce

    for (var i in pieceSquares) {
        boardRepresent[oldPieceSquares[i]] = ' '

        pce = pieceSquares[i]

        if (pce.color == 'w') {
            boardRepresent[pce.squareOn] = pce.type.toLowerCase();
        }
        else {
            boardRepresent[pce.squareOn] = pce.type
        }
    }
}

/* Reset boardRep120 and pieceSquares */
function ResetVars() {
    /* Reset the center squares of boardRep120 and pieceSquares */

    // Reset vars
    pieceSquares = []
    for (var i = 0; i < pieceList.length; i++) {
        // Set squareOn120
        pieceList[i].squareOn120 = Sq64to120(pieceList[i].squareOn);

        // Set boardRep120
        boardRep120[pieceList[i].squareOn120] = pieceList[i].piece

        // Reset pieceSquares
        if (pieceList[i].color == 'w') {
            pieceSquaresW[pieceList[i].squareOn120] = pieceList[i]
        }
        else if (pieceList[i].color == 'b') {
            pieceSquaresB[pieceList[i].squareOn120] = pieceList[i]
        }
    }
    pieceSquares = Object.assign({}, pieceSquaresW, pieceSquaresB)
}

function Reset() {
    /* Reset everything (board and pieces) */

    // Clear the board
    ClearBoard()

    // Reset boardRep120 and pieceSquares
    ResetVars()

    // Reset pieces
    ResetPieces()

    // Place pieces on the board
    for(var i = 0; i < pieceList.length; i++) {
        square = pieceList[i]
    
        // SET SQUARE-TENS AND SQUARE-ONES
        if((square.squareOn + 1) > 9){
            squareTens = Math.floor((square.squareOn + 1) / 10).toString()
            squareOnes = Math.floor((square.squareOn + 1) % 10).toString()
        }
        else{
            squareOnes = Math.floor((square.squareOn + 1) % 10).toString()
        }

        // SET PIECES UP
        if((square.squareOn + 1) < 10){
            document.querySelector("#\\3" + squareOnes).querySelector(".pieces").classList.add(square.color + square.type)
        }
        else{
            document.querySelector("#\\3" + squareTens + " " + squareOnes).querySelector(".pieces").classList.add(square.color + square.type)
        }
    }
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

    return castlePiecesMoved
}

function SqAttacked(sq120, side = isWhite) {
    /* SqAttacked --> checks if a square is attacked by current side */

    // Pawn Attacking
    if (side == 'w') {
        if (boardRep120[sq120 + 9] == 'p' || boardRep120[sq120 + 11] == 'p') {
            return true;
        }
    }
    else if (side == 'b') {
        if (boardRep120[sq120 - 9] == 'P' || boardRep120[sq120 - 11] == 'P') {
            return true;
        }
    } 

    var newSq
    var dir
    var pce

    // Knight Attacking
    for (var i = 0; i < 8; i++) {
        newSq = sq120 + NDir[i]
        if (side == 'w' && boardRep120[newSq] == 'n' && board[newSq] != SQUARES.OFFBOARD) {
            return true
        }
        if (side == 'b' && boardRep120[newSq] == 'N' && board[newSq] != SQUARES.OFFBOARD) {
            return true
        }
    }

    // Bishop/Queen Attacking
    for (var i = 0; i < 4; i++) {
        dir = BDir[i] // go in a direction
        newSq = sq120 + dir
        
        // Go in direction until reach the end of the board
        while (board[newSq] != SQUARES.OFFBOARD) {
            // If a piece is reached and it is not a bishop or queen, the rest of the line is blocked
            if (boardRep120[newSq] != ' ') {
                pce = pieceSquares[newSq] // get piece

                // Queens and Bishops attack along the diagonals
                if ((pce.type == 'B' || pce.type == 'Q') && pce.color == side) {
                    return true
                }
                break;
            }
            newSq += dir // continue in current direction
        }
    }

    // Rook/Queen Attacking
    for (var i = 0; i < 4; i++) {
        dir = RDir[i] // go in a direction
        newSq = sq120 + dir
        
        // Go in direction until reach the end of the board
        while (board[newSq] != SQUARES.OFFBOARD) {
            // If a piece is reached and it is not a rook or queen, the rest of the line is blocked
            if (boardRep120[newSq] != ' ') {
                pce = pieceSquares[newSq] // get piece

                // Queens and Rooks attack along the lines
                if ((pce.type == 'R' || pce.type == 'Q') && pce.color == side) {
                    return true
                }
                break;
            }
            newSq += dir // continue in current direction
        }
    }

    // King Attacking
    for (var i = 0; i < 8; i++) {
        newSq = sq120 + KDir[i]
        if (side == 'w' && boardRep120[newSq] == 'k' && board[newSq] != SQUARES.OFFBOARD) {
            return true
        }
        if (side == 'b' && boardRep120[newSq] == 'K' && board[newSq] != SQUARES.OFFBOARD) {
            return true
        }
    }

    return false;
}

function PrintSqAttacked() {
    var sq, piece, line;

    console.log("Attacked Squares");

    for (var r = 0; r < 8; r++) {
        line = ((r + 1) + "  ");
        for (var f = 0; f < 8; f++) {
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

