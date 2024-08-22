// STRICT MODE
'use strict';

function StartGame(){
    isWhite = 'w'

    numFullMoves = 0
    numHalfMoves = 0

    // AddMoveToList()

    SetCastlePieces()
    Reset()
}

function UserMove(clickedId) {
    // Run a move
    var sqNum = Sq64to120(parseInt(clickedId) - 1);
    if (firstOnclick) {
        var selectingPiece = true
        //if ((parseInt(clickedId) - 1) in pieceSquares) {
            // selectingPiece = true
            //firstOnclick = false 
            // currentPiece = pieceSquares[parseInt(clickedId) - 1]
            // moveFromSq = currentPiece.squareOn
            // movePiece = currentPiece.type
            // isWhite1 = currentPiece.color
        console.log(SqAttacked(sqNum, 'b'));
        WhichMovesValid()
        //}
    }
    else {
        moveToSq = sqNum
        ClearBoard()
        firstOnclick = true
        CheckMoveValid()
    }
}

function WhichMovesValid() {
    
}

function CheckMoveValid() {}

// function WhichMovesValid() {
//     // Reset variables
//     valid = false
//     valid2 = false
//     validMoves = []
//     validMoves2 = []
//     validMoves3 = []
//     validMoves4 = []
//     attackMoves = []
//     attackMoves2 = []
//     validMovesAdd = false
//     correctMoves = []
//     piecesStopMate = false
//     isComputerMove = false

//     // Can a king castle
//     CanCastle()

//     // run function to see where everything can attack
//     AttackingMoves()

//     // Is a king in check
//     if (isWhite1 == "w") {
//         K[0].IsKingInCheck(attackMoves)
//     }
//     else {
//         K[1].IsKingInCheck(attackMoves)
//     }

//     // Resets all valid moves
//     ResetAllValidMoves("validMoves")
//     ResetAllValidMoves("validMoves2")
    
//     // where can the piece move
//     if(currentPiece.type == "K") {
//         // castling = true
//         KingMoves(moveFromSq)
//         // RookMoves(validMoves)
//     }
//     else if(currentPiece.type == "Q") {
//         BishopMoves(moveFromSq)
//         RookMoves(moveFromSq)
//     }
//     else if(currentPiece.type == "B") {
//         BishopMoves(moveFromSq)
//     }
//     else if(currentPiece.type == "N") {
//         KnightMoves(moveFromSq)
//     }
//     else if(currentPiece.type == "R") {
//         RookMoves(moveFromSq)
//     }
//     else if(currentPiece.type == "P") {
//         PawnMoves(moveFromSq)
//     }

//     // Add valid moves to the piece that is moving
//     currentPiece.validMoves = currentPiece.validMoves.concat(validMoves)
//     if (currentPiece.type == "P") {
//         currentPiece.validMoves = currentPiece.validMoves.concat(validMoves2)
//     }

//     // make sure all moves are valid
//     currentPiece.validMoves = currentPiece.FilterNonSquaresFromMoves(currentPiece.validMoves)
//     currentPiece.validMoves = currentPiece.RemoveSameColorPiecesFromMoves(currentPiece.validMoves)

//     if (currentPiece.type == "K") {
//         currentPiece.validMoves = KingMovesCheck(currentPiece)
//     }
//     else {
//         currentPiece.validMoves = PiecesMovesCheck(currentPiece)
//     }

//     for (i = 0; i < currentPiece.validMoves.length; i++) {
//         if(currentPiece.validMoves[i] > 9){
//             squareTens = Math.floor((currentPiece.validMoves[i] / Math.pow(10, 1)) % 10).toString()
//             squareOnes = Math.floor((currentPiece.validMoves[i] / Math.pow(10, 0)) % 10).toString()
//         }
//         else{
//             squareOnes = Math.floor((currentPiece.validMoves[i] / Math.pow(10, 0)) % 10).toString()
//         }
//         if(currentPiece.validMoves[i] < 10){
//             pieceAdd = document.querySelector("#\\3" + squareOnes).classList.add("highlight")
//         }
//         else{
//             pieceAdd = document.querySelector("#\\3" + squareTens + " " + squareOnes).classList.add("highlight")
//         }
//     }

//     if(currentPiece.squareOn > 9){
//         squareTens = Math.floor((currentPiece.squareOn / Math.pow(10, 1)) % 10).toString()
//         squareOnes = Math.floor((currentPiece.squareOn / Math.pow(10, 0)) % 10).toString()
//     }
//     else{
//         squareOnes = Math.floor((currentPiece.squareOn / Math.pow(10, 0)) % 10).toString()
//     }
//     if(currentPiece.squareOn < 10){
//         pieceAdd = document.querySelector("#\\3" + squareOnes).classList.add("highlight")
//     }
//     else{
//         pieceAdd = document.querySelector("#\\3" + squareTens + " " + squareOnes).classList.add("highlight")
//     }

//     // // resets whereArePieces
//     // ResetWhereArePieces()
// }