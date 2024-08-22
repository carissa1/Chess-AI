// PAWN MOVE 1
// function pawnMove(whichPawn){
//     if(whichPawn == 'aPW' && firstMoveAPW == false){
//         document.getElementById("a3").style.backgroundColor = "red"
//     }
// }

// MOVING 1
// var move, startOfMove, pieceMoving;
// var file, rank;
// function MovePieces(){
//     move = prompt("what is your move?")
//     // file = Math.floor((move / Math.pow(10, 1)) % 10).toString()
//     // rank = Math.floor((move / Math.pow(10, 0)) % 10).toString()
//     // file = file.charCodeAt(0) - 96;
//     // FileRankToSquare(file, rank)
//     // pieceMoving = prompt("What piece is moving?")
//     // boardRepresent[squareNum-1] = pieceMoving
//     // startOfMove = prompt("where did it start?")
//     // file = Math.floor((startOfMove / Math.pow(10, 1)) % 10).toString()
//     // rank = Math.floor((startOfMove / Math.pow(10, 0)) % 10).toString()
//     // file = file.charCodeAt(0) - 97;
//     // FileRankToSquare(file, rank)
//     // boardRepresent[squareNum-1] = " "
//
//     // Using the spread operator:
//
//     // let arr = [...str];
//
//     // Or Array.from
//
//     // let arr = Array.from(str);
//
//     // Or split with the new u RegExp flag:
//
//     // let arr = str.split(/(?!$)/u);
//
// }

// RESET FUNCTION CODE 1
// if(boardRepresent[i-1] == "P") {
//     if(square < 10){
//         document.querySelector("#\\3" + squareOnes).querySelector(".pieces").classList.add("P")
//     }
//     else{
//         document.querySelector("#\\3" + squareTens + " " + squareOnes).querySelector(".pieces").classList.add("P")
//     }
// }
// else if(boardRepresent[i-1] == "K") {
//     if(square < 10){
//         document.querySelector("#\\3" + squareOnes).querySelector(".pieces").classList.add("K")
//     }
//     else{
//         document.querySelector("#\\3" + squareTens + " " + squareOnes).querySelector(".pieces").classList.add("K")
//     }
// }
// else if(boardRepresent[i-1] == "Q") {
//     if(square < 10){
//         document.querySelector("#\\3" + squareOnes).querySelector(".pieces").classList.add("Q")
//     }
//     else{
//         document.querySelector("#\\3" + squareTens + " " + squareOnes).querySelector(".pieces").classList.add("Q")
//     }
// }
// else if(boardRepresent[i-1] == "B") {
//     if(square < 10){
//         document.querySelector("#\\3" + squareOnes).querySelector(".pieces").classList.add("B")
//     }
//     else{
//         document.querySelector("#\\3" + squareTens + " " + squareOnes).querySelector(".pieces").classList.add("B")
//     }
// }
// else if(boardRepresent[i-1] == "N") {
//     if(square < 10){
//         document.querySelector("#\\3" + squareOnes).querySelector(".pieces").classList.add("N")
//     }
//     else{
//         document.querySelector("#\\3" + squareTens + " " + squareOnes).querySelector(".pieces").classList.add("N")
//     }
// }
// else if(boardRepresent[i-1] == "R") {
//     if(square < 10){
//         document.querySelector("#\\3" + squareOnes).querySelector(".pieces").classList.add("R")
//     }
//     else{
//         document.querySelector("#\\3" + squareTens + " " + squareOnes).querySelector(".pieces").classList.add("R")
//     }
// }
// else if(boardRepresent[i-1] == "p") {
//     if(square < 10){
//         document.querySelector("#\\3" + squareOnes).querySelector(".pieces").classList.add("p")
//     }
//     else{
//         document.querySelector("#\\3" + squareTens + " " + squareOnes).querySelector(".pieces").classList.add("p")
//     }
// }
// else if(boardRepresent[i-1] == "k") {
//     if(square < 10){
//         document.querySelector("#\\3" + squareOnes).querySelector(".pieces").classList.add("k")
//     }
//     else{
//         document.querySelector("#\\3" + squareTens + " " + squareOnes).querySelector(".pieces").classList.add("k")
//     }
// }
// else if(boardRepresent[i-1] == "q") {
//     if(square < 10){
//         document.querySelector("#\\3" + squareOnes).querySelector(".pieces").classList.add("q")
//     }
//     else{
//         document.querySelector("#\\3" + squareTens + " " + squareOnes).querySelector(".pieces").classList.add("q")
//     }
// }
// else if(boardRepresent[i-1] == "b") {
//     if(square < 10){
//         document.querySelector("#\\3" + squareOnes).querySelector(".pieces").classList.add("b")
//     }
//     else{
//         document.querySelector("#\\3" + squareTens + " " + squareOnes).querySelector(".pieces").classList.add("b")
//     }
// }
// else if(boardRepresent[i-1] == "n") {
//     if(square < 10){
//         document.querySelector("#\\3" + squareOnes).querySelector(".pieces").classList.add("n")
//     }
//     else{
//         document.querySelector("#\\3" + squareTens + " " + squareOnes).querySelector(".pieces").classList.add("n")
//     }
// }
// else if(boardRepresent[i-1] == "r") {
//     if(square < 10){
//         document.querySelector("#\\3" + squareOnes).querySelector(".pieces").classList.add("r")
//     }
//     else{
//         document.querySelector("#\\3" + squareTens + " " + squareOnes).querySelector(".pieces").classList.add("r")
//     }
// }

// RESET FUNCTION CODE 2
// for(i = 1; i < 65; i++) {
//     square = i
//     pieceAdd = 0
//     squareTens = 0
//     squareOnes = 0
//     // SET SQUARE-TENS AND SQUARE-ONES
//     if(square > 9){
//         squareTens = Math.floor((square / Math.pow(10, 1)) % 10).toString()
//         squareOnes = Math.floor((square / Math.pow(10, 0)) % 10).toString()
//     }
//     else{
//         squareOnes = Math.floor((square / Math.pow(10, 0)) % 10).toString()
//     }
//     // SET PIECES UP
//     for(m = 0; m < pieceList.length; m++){
//         if(boardRepresent[i-1] == pieceList[m]) {
//             if(square < 10){
//                 document.querySelector("#\\3" + squareOnes).querySelector(".pieces").classList.add(window[boardRepresent[i-1]][0].color + window[boardRepresent[i-1]][0].type)
//             }
//             else{
//                 document.querySelector("#\\3" + squareTens + " " + squareOnes).querySelector(".pieces").classList.add(window[boardRepresent[i-1]][0].color + window[boardRepresent[i-1]][0].type)
//             }
//         }
//     }
//     if(boardRepresent[i-1] == " "){
//         if(square < 10){
//             pieceAdd = document.querySelector("#\\3" + squareOnes).querySelector(".pieces")
//         }
//         else{
//             pieceAdd = document.querySelector("#\\3" + squareTens + " " + squareOnes).querySelector(".pieces")
//         }
//         $(pieceAdd).attr("class", "pieces")
//     } 
// }

// KING MOVES 1
// for (i = 0; i < validMoves2.length; i++) {
//     if (isWhite) {
//         for (m = 0; m <  canCastle.length; m++) {
//             if ( canCastle[m] == "wK" && validMoves2[i] == moveToSq) {
//                 valid = true
//                  canCastle =  canCastle[i]
//             }
//             if ( canCastle[m] == "wQ" && validMoves2[i] == moveToSq) {
//                 valid == true
//                  canCastle = canCastle[i]
//             }
//             else {
//                 valid = false
//             }
//         }
//     }
//     else {
//         for (m = 0; m < canCastle.length; m++) {
//             if (canCastle[m] == "bK" && validMoves2[i] == moveToSq) {
//                 valid = true
//                 canCastle = canCastle[i]
//             }
//             if (canCastle[m] == "bQ" && validMoves2[i] == moveToSq) {
//                 valid == true
//                 canCastle = canCastle[i]
//             }
//             else {
//                 valid = false
//             }
//         }
//     }
// }

// ROOK MOVES 1
// SquareToFileRank(x)
// r2 = r
// f2 = f
// for(i = 1; i < 9; i++) {
//     SquareToFileRank(x+i)
//     if(r == r2) {
//         if(document.getElementById((x+i).toString()) != null){
//             validMoves.push(x+i)
//         }
//     }
//     SquareToFileRank(x-i)
//     if (r == r2) {
//         if(document.getElementById((x-i).toString()) != null){
//             validMoves[validMoves.length] = x-i
//         }
//     }
// }
//
// else { (castling = true)
//     if(isWhite) {
//         if (canCastle.wK != undefined) {
//             boardRepresent[canCastle.wK] = " "
//             boardRepresent[canCastle.wK-2] = "r" 
//         }
//         if (canCastle.wQ != undefined) {
//             boardRepresent[canCastle.wK] = " "
//             boardRepresent[canCastle.wK+3] = "r" 
//         }
//     }
//     else {
//         if (canCastle.wK != undefined) {
//             boardRepresent[canCastle.wK] = " "
//             boardRepresent[canCastle.wK-2] = "R" 
//         }
//         if (canCastle.wK != undefined) {
//             boardRepresent[canCastle.wK] = " "
//             boardRepresent[canCastle.wK+3] = "R" 
//         }
//     }
// }
//
// for(i = 1; i < 9; i++) {
//     if(document.getElementById((x+8*i).toString()) != null){
//         for (n = 0; n < pieceList.length; n++) {
//             if(pieceInWay == false) {
//                 if(boardRepresent[x+8*i] == pieceList[n]) {
//                     validMovesAdd = false
//                     pieceInWay = true
//                 }
//                 else {
//                     validMovesAdd = true
//                 }
//             }
//         }
//     }
// }
// if(validMovesAdd) {
//     for(m = 1; m < 9; m++) {
//         if(document.getElementById((x+8*m).toString()) != null){
//             validMoves.push(x+8*m)
//         }
//     }
// }
// // FILE UP
// for(i = 1; i < 9; i++) {
//     if(document.getElementById((x-8*i).toString()) != null){
//         for (n = 0; n < pieceList.length; n++) {
//             console.log("THIS BE: " + validMovesAdd)
//             console.log(x-8*i)
//             console.log("THIS PIECE IS: " + pieceList[n])
//             console.log(boardRepresent[x-8*i])
//             if(pieceInWay == false) {
//                 if(boardRepresent[x-8*i] == pieceList[n]) {
//                     validMovesAdd = false
//                     pieceInWay = true
//                 }
//                 else {
//                     validMovesAdd = true
//                 }
//             }
//         }
//     }
// }
// if(validMovesAdd) {
//     for(m = 1; m < 9; m++) {
//         if(document.getElementById((x-8*m).toString()) != null){
//             validMoves.push(x-8*m)
//         }
//     }
// }

// PART OF OLD CODE WITH LISTS
// function WherePieces(lst) {
//     for(a = 0; a < lst.length; a++) {
//         if(lst[a] == "wK") {
//             wK = a
//         }
//         if(lst[a] == "wQ") {
//             wQ.push(a)
//         }
//         if(lst[a] == "wB") {
//             wB.push(a)
//         }
//         if(lst[a] == "wN") {
//             wN.push(a)
//         }
//         if(lst[a] == "wR") {
//             wR.push(a)
//         }
//         if(lst[a] == "wP") {
//             wP.push(a)
//         }
//         if(lst[a] == "bK") {
//             bK = a
//         }
//         if(lst[a] == "bQ") {
//             bQ.push(a)
//         }
//         if(lst[a] == "bB") {
//             bB.push(a)
//         }
//         if(lst[a] == "bN") {
//             bN.push(a)
//         }
//         if(lst[a] == "bR") {
//             bR.push(a)
//         }
//         if(lst[a] == "bP") {
//             bP.push(a)
//         }
//     }
// for (a = 0; a < whereArePiecesB.length; a++){
//     if (window[whereArePiecesB[a]].length == 0) {
//         whereArePiecesB[a].onBoard = false
//     }
//     if (window[whereArePiecesW[a]].length == 0) {
//         whereArePiecesB[a].onBoard = false
//     }
// }
// function ResetWhereArePieces() {
//     for(i = 0; i < whereArePiecesW.length; i++) {
//         correctMoves = JSON.parse(JSON.stringify(whereArePiecesW))
//         lengthOfWherePieces = window[whereArePiecesW[i]].length
//         for(n = 0; n < lengthOfWherePieces; n++) {
//             window[correctMoves[i]].splice(correctMoves.indexOf(window[whereArePiecesW[i]]), 1)
//         }
//         whereArePiecesW = JSON.parse(JSON.stringify(correctMoves))
//     }
//     for(i = 0; i < whereArePiecesB.length; i++) {
//         correctMoves = JSON.parse(JSON.stringify(whereArePiecesB))
//         lengthOfWherePieces = window[whereArePiecesB[i]].length
//         for(n = 0; n < lengthOfWherePieces; n++) {
//             window[correctMoves[i]].splice(correctMoves.indexOf(window[whereArePiecesB[i]]), 1)
//         }
//         whereArePiecesB = JSON.parse(JSON.stringify(correctMoves))
//     }
// }
//
// if (isWhite1) {
//     whereIsPiece = whereArePiecesW
// }
// else {
//     whereIsPiece = whereArePiecesB
// }
// console.log(isWhite1)
// for (k = 0; k < whereIsPiece.length; k++) {
//     lengthOfWherePieces = window[whereIsPiece[k]].length
//     for (h = 0; h < lengthOfWherePieces; h++) {
//         if (window[whereIsPiece[k]][0] != "-1") {
//             // console.log(whereIsPiece[k] + " NOTICE MEE")
//             if (whereIsPiece[k].includes("Q")) {
//                 RookMoves(window[whereIsPiece[k]][h]+1)
//                 if (secondIsInCheck) {
//                     // if(isWhite1){
//                     //     RemoveSameColorPiecesFromMoves(validMoves3, whitePieceList)
//                     // }
//                     // else{
//                     //     RemoveSameColorPiecesFromMoves(validMoves3, blackPieceList)
//                     // }
//
//                     for(y = 0; y < validMoves3.length; y++) {
//                         attackMoves2.push(validMoves3[y])
//                     }
//
//                     validMoves3 = []
//                 }
//                 else {
//                     // if(isWhite1){
//                     //     RemoveSameColorPiecesFromMoves(validMoves, whitePieceList)
//                     // }
//                     // else{
//                     //     RemoveSameColorPiecesFromMoves(validMoves, blackPieceList)
//                     // }
//
//                     for(y = 0; y < validMoves.length; y++) {
//                         attackMoves.push(validMoves[y])
//                     }
//
//                     validMoves = []
//                 }
//
//                 BishopMoves(window[whereIsPiece[k]][h]+1)
//                 console.log("Q")
//             }
//             else if (whereIsPiece[k].includes("B")) {
//                 BishopMoves(window[whereIsPiece[k]][h]+1)
//                 console.log("B")
//             }
//             else if (whereIsPiece[k].includes("N")) {
//                 KnightMoves(window[whereIsPiece[k]][h]+1)
//                 console.log("N")
//             }
//             else if (whereIsPiece[k].includes("R")) {
//                 RookMoves(window[whereIsPiece[k]][h]+1)
//                 console.log("R")
//             }
//             else if (whereIsPiece[k].includes("P")) {
//                 PawnMoves(window[whereIsPiece[k]][h]+1)
//                 console.log("P")
//             }
//             if (whereIsPiece[k].includes("P")) {
//                 if (secondIsInCheck) { 
//                     for(y = 0; y < validMoves4.length; y++) {
//                         attackMoves2.push(validMoves4[y])
//                     }  
//                 }
//                 else { 
//                     for(y = 0; y < validMoves2.length; y++) {
//                         attackMoves.push(validMoves2[y])
//                     }  
//                 }
//             }
//             else {
//                 if (secondIsInCheck) {
//                     for(y = 0; y < validMoves3.length; y++) {
//                         attackMoves2.push(validMoves3[y])
//                     }  
//                 }
//                 else {
//                     for(y = 0; y < validMoves.length; y++) {
//                         attackMoves.push(validMoves[y])
//                     }
//                 }
//             }
//             // console.log(window[whereIsPiece[k]][h]+1)
//             // console.log(attackMoves)
//             // console.log(validMoves3)
//             // console.log(validMoves4)
//             if (secondIsInCheck) {
//                 validMoves3 = []
//                 validMoves4 = []
//             }
//             else {
//                 validMoves = []
//                 validMoves2 = []
//             }
//         }
//     }
// }
// if (isWhite && secondIsInCheck) {
//     for (i = 0; i < pieceList.length; i++) {
//         for (m = 0; m < pieceList[i].length; m++) {
//             // console.log("W AND 2nd " + window[whereArePiecesW[i]][m]+1)
//             pieceList[i][m].validMoves.push(pieceList[i][m].squareOn)
//         }
//     }
// }
// if (isWhite && !secondIsInCheck) {
//     for (i = 0; i < pieceList.length; i++) {
//         for (m = 0; m < window[pieceList[i]].squareOn.length; m++) {
//             // console.log("W AND 1st " + window[whereArePiecesW[i]][m]+1)
//             attackMoves.push(window[pieceList[i]].squareOn[m]+1)
//         }
//     }
// }
// if (!isWhite && secondIsInCheck) {
//     for (i = 0; i < pieceList.length; i++) {
//         for (m = 0; m < window[pieceList[i]].squareOn.length; m++) {
//             //console.log("B AND 2nd " + window[whereArePiecesB[i]][m]+1)
//             attackMoves2.push(window[pieceList[i]].squareOn[m]+1)
//         }
//     }
// }
// if (!isWhite && !secondIsInCheck) {
//     for (i = 0; i < pieceList.length; i++) {
//         for (m = 0; m < window[pieceList[i]].squareOn.length; m++) {
//             //console.log("B AND 1st " + window[whereArePiecesB[i]][m]+1)
//             attackMoves2.push(window[pieceList[i]].squareOn[m]+1)
//         }
//     }
// }

// ALL PIECES IN OWN VARIABLES
// var wK = new King("w", 61)
// var bK = new King("b", 5)
// var allK = [wK, bK]
//
// var wQ = new Queen("w", 60)
// var bQ = new Piece("b", 4)
// var allQ = [wQ, bQ]
//
// var wB1 = new Bishop("w", 59)
// var wB2 = new Bishop("w", 62)
// var bB1 = new Piece("b", 3)
// var bB2 = new Piece("b", 6)
// var allB = [wB1, wB2, bB1, bB2]
//
// var wN1 = new Knight("w", 58)
// var wN2 = new Knight("w", 63)
// var bN1 = new Knight("b", 2)
// var bN2 = new Knight("b", 7)
// var allK = [wN1, wN2, bN1, bN2]
//
// var wR1 = new Rook("w", 57)
// var wR2 = new Rook("w", 64)
// var bR1 = new Rook("b", 1)
// var bR2 = new Rook("b", 8)
// var allR = [wR1, wR2, bR1, bR2]
//
// var allP = [wP1, wP2, wP3 ,wP4, wP5, wP6, wP7, wP8, bP1, bP2, bP3, bP4, bP5, bP6, bP7, bP8]
// var wP1 = new Pawn("w", 49)
// var wP2 = new Pawn("w", 50)
// var wP3 = new Pawn("w", 51)
// var wP4 = new Pawn("w", 52)
// var wP5 = new Pawn("w", 53)
// var wP6 = new Pawn("w", 54)
// var wP7 = new Pawn("w", 55)
// var wP8 = new Pawn("w", 56)
// var bP1 = new Pawn("b", 9)
// var bP2 = new Pawn("b", 10)
// var bP3 = new Pawn("b", 11)
// var bP4 = new Pawn("b", 12)
// var bP5 = new Pawn("b", 13)
// var bP6 = new Pawn("b", 14)
// var bP7 = new Pawn("b", 15)
// var bP8 = new Pawn("b", 16)

//OLD CODE FOR PIECES BLOCKING CHECKS
// // Does a piece block the check if the king is in check
// if (!(boardRepresent[moveFromSq-1].includes("K")) && isInCheck == true) {
//     console.log(validMoves)
//     correctMoves2 = JSON.parse(JSON.stringify(validMoves))
//     for (b = 0; b < validMoves.length; b++) {
//         timesRun = 0
//         for (c = 0; c < attackMoves.length; c++) {
//             console.log(validMoves[b], attackMoves[c])
//             console.log(blockingCheck)
//             console.log(correctMoves2)
//             if (validMoves[b] == attackMoves[c]) {
//                 boardRepresent2[moveFromSq-1] = " "
//                 boardRepresent2[validMoves[b]-1] = movePiece
//                 boardRepresent = JSON.parse(JSON.stringify(boardRepresent2))
//                 Reset()

//                 ResetWhereArePieces()
//                 WherePieces(boardRepresent2)

//                 isInCheck = false
//                 secondIsInCheck = true
//                 InOrMovingIntoCheck()

//                 IsKingInCheck(attackMoves2)

//                 if (isInCheck == true) {
//                     correctMoves2.splice(correctMoves2.indexOf(validMoves[d]), 1)
//                 }
//                 // console.log(attackMoves)
//                 // console.log(attackMoves2)
//                 // for (d = 0; d < attackMoves2.length; d++) {
//                 //     console.log(attackMoves2[d]-1 == wK)
//                 //     timesRun += 1
//                 //     if (((isWhite == true && attackMoves2[d]-1 == wK) || (isWhite == false && attackMoves2[d]-1 == bK))) {
//                 //         blockingCheck = false
//                 //     }
//                 //     else if (blockingCheck == true){
//                 //         blockingCheck = true
//                 //     }
//                 // }
//                 boardRepresent2[moveFromSq-1] = movePiece
//                 boardRepresent2[validMoves[b]-1] = " "
//                 boardRepresent = JSON.parse(JSON.stringify(boardRepresent2))
//                 Reset()
//             }
//         }
//         if (timesRun == 0) {
//             blockingCheck = false
//         }
//         if (blockingCheck == false) {
//             correctMoves2.splice(correctMoves2.indexOf(validMoves[b]), 1)
//             blockingCheck = true
//         }
//     }
//     secondIsInCheck = false
//     validMoves = JSON.parse(JSON.stringify(correctMoves2))
// }

// OLD BOARD REPRESENT
// how will it look, where does each piece go
// var boardRepresent = [
//     "r", "n", "b", "q", "k", "b", "n", "r",
//     "p", "p", "p", "p", "p", "p", "p", "p",
//     " ", " ", " ", " ", " ", " ", " ", " ",
//     " ", " ", " ", " ", " ", " ", " ", " ",
//     " ", " ", " ", " ", " ", " ", " ", " ",
//     " ", " ", " ", " ", " ", " ", " ", " ",
//     "P", "P", "P", "P", "P", "P", "P", "P",
//     "R", "N", "B", "Q", "K", "B", "N", "R"
// ]

// var boardRepresent2 = [ // ghost board
//     "r", "n", "b", "q", "k", "b", "n", "r",
//     "p", "p", "p", "p", "p", "p", "p", "p",
//     " ", " ", " ", " ", " ", " ", " ", " ",
//     " ", " ", " ", " ", " ", " ", " ", " ",
//     " ", " ", " ", " ", " ", " ", " ", " ",
//     " ", " ", " ", " ", " ", " ", " ", " ",
//     "P", "P", "P", "P", "P", "P", "P", "P",
//     "R", "N", "B", "Q", "K", "B", "N", "R"
// ]

// OLD IS THE MOVE MAKING THE KING BE IN CHECK
// squareOfPiece = currentPiece.squareOn
// currentPiece.squareOn = moveToSq

// for (c = 0; c < pieceList.length; c++) {
//     for (d = 0; d < pieceList[c].length; d++) {
//         if (pieceList[c][d].squareOn == currentPiece.validMoves[b] && pieceList[c][d].type != "K") {
//             pieceList[c][d].onBoard = false
//         }
//     }
// }

// boardRepresent2[moveFromSq-1] = " "
// savePieceValue = boardRepresent2[moveToSq-1]
// boardRepresent2[moveToSq-1] = currentPiece.color + movePiece
// boardRepresent = JSON.parse(JSON.stringify(boardRepresent2))
// Reset()

// K[0].isInCheck = false
// K[1].isInCheck = false
// secondIsInCheck = true
// AttackingMoves()
// secondIsInCheck = false

// if (isWhite1 == "w") {
//     K[0].IsKingInCheck(attackMoves2)
// }
// else {
//     K[1].IsKingInCheck(attackMoves2)
// }

// if (K[0].isInCheck == true || K[1].isInCheck == true) {
//     valid = false
// }

// for (c = 0; c < pieceList.length; c++) {
//     for (d = 0; d < pieceList[c].length; d++) {
//         if (pieceList[c][d].squareOn == currentPiece.validMoves[b] && pieceList[c][d].type != "K") {
//             pieceList[c][d].onBoard = false
//         }
//     }
// }

// currentPiece.squareOn = squareOfPiece

// boardRepresent2[moveFromSq-1] = currentPiece.color + movePiece
// boardRepresent2[currentPiece.validMoves[b]-1] = savePieceValue
// boardRepresent = JSON.parse(JSON.stringify(boardRepresent2))
// Reset()
// ResetAllValidMoves("validMoves2")



// Does a piece block the check if the king is in check
// if (currentPiece.type != "K") {
//     saveIsInCheckValue = [K[0].isInCheck, K[1].isInCheck]
//     // console.log(currentPiece.validMoves)
//     correctMoves2 = JSON.parse(JSON.stringify(currentPiece.validMoves))
//     for (b = 0; b < currentPiece.validMoves.length; b++) {
//         timesRun = 0
//         for (c = 0; c < attackMoves.length; c++) {
//             // console.log(currentPiece.validMoves[b], attackMoves[c])
//             // console.log(blockingCheck)
//             // console.log(correctMoves2)
//             if (currentPiece.validMoves[b] == attackMoves[c] && timesRun == 0) {
//                 squareOfPiece = currentPiece.squareOn
//                 currentPiece.squareOn = currentPiece.validMoves[b]

//                 for (c = 0; c < pieceList.length; c++) {
//                     for (d = 0; d < pieceList[c].length; d++) {
//                         if (pieceList[c][d].squareOn == currentPiece.validMoves[b] && pieceList[c][d].type != "K") {
//                             pieceList[c][d].onBoard = false
//                         }
//                     }
//                 }

//                 boardRepresent2[moveFromSq-1] = " "
//                 savePieceValue = boardRepresent2[currentPiece.validMoves[b]-1]
//                 boardRepresent2[currentPiece.validMoves[b]-1] = currentPiece.color + movePiece
//                 boardRepresent = JSON.parse(JSON.stringify(boardRepresent2))
//                 Reset()

//                 // ResetWhereArePieces()
//                 // WherePieces(boardRepresent2)

//                 K[0].isInCheck = false
//                 K[1].isInCheck = false
//                 secondIsInCheck = true
//                 AttackingMoves()
//                 secondIsInCheck = false

//                 if (isWhite1 == "w") {
//                     K[0].IsKingInCheck(attackMoves2)
//                 }
//                 else {
//                     K[1].IsKingInCheck(attackMoves2)
//                 }

//                 if (K[0].isInCheck == true || K[1].isInCheck == true) {
//                     correctMoves2.splice(correctMoves2.indexOf(currentPiece.validMoves[b]), 1)
//                 }

//                 for (c = 0; c < pieceList.length; c++) {
//                     for (d = 0; d < pieceList[c].length; d++) {
//                         if (pieceList[c][d].squareOn == currentPiece.validMoves[b] && pieceList[c][d].type != "K") {
//                             pieceList[c][d].onBoard = true
//                         }
//                     }
//                 }

//                 currentPiece.squareOn = squareOfPiece

//                 boardRepresent2[moveFromSq-1] = currentPiece.color + movePiece
//                 boardRepresent2[currentPiece.validMoves[b]-1] = savePieceValue
//                 boardRepresent = JSON.parse(JSON.stringify(boardRepresent2))
//                 Reset()

//                 ResetAllValidMoves("validMoves2")
                
//                 timesRun++
//             }
//         }
//         if (timesRun == 0) {
//             correctMoves2.splice(correctMoves2.indexOf(currentPiece.validMoves[b]), 1)
//         }
//         // if (blockingCheck == false) {
//         //     correctMoves2.splice(correctMoves2.indexOf(currentPiece.validMoves[b]), 1)
//         //     blockingCheck = true
//         // }
//     }
//     secondIsInCheck = false
//     K[0].isInCheck = saveIsInCheckValue[0]
//     K[1].isInCheck = saveIsInCheckValue[1]
//     // [K[0].isInCheck, K[1].isInCheck] = saveIsInCheckValue
//     currentPiece.validMoves = JSON.parse(JSON.stringify(correctMoves2))
// }

// // Is the king moving into check if the king is in check
// if (currentPiece.type == "K") {
//     saveIsInCheckValue = [K[0].isInCheck, K[1].isInCheck]
//     correctMoves2 = JSON.parse(JSON.stringify(currentPiece.validMoves))
//     for (b = 0; b < currentPiece.validMoves.length; b++) {
//         squareOfPiece = currentPiece.squareOn
//         currentPiece.squareOn = currentPiece.validMoves[b]

//         for (c = 0; c < pieceList.length; c++) {
//             for (d = 0; d < pieceList[c].length; d++) {
//                 if (pieceList[c][d].squareOn == currentPiece.validMoves[b] && pieceList[c][d].type != "K") {
//                     pieceList[c][d].onBoard = false
//                 }
//             }
//         }

//         boardRepresent2[moveFromSq-1] = " "
//         savePieceValue = boardRepresent2[currentPiece.validMoves[b]-1]
//         boardRepresent2[currentPiece.validMoves[b]-1] = currentPiece.color + movePiece
//         boardRepresent = JSON.parse(JSON.stringify(boardRepresent2))
//         Reset()

//         // ResetWhereArePieces()
//         // WherePieces(boardRepresent2)

//         K[0].isInCheck = false
//         K[1].isInCheck = false
//         secondIsInCheck = true
//         AttackingMoves()
//         secondIsInCheck = false

//         if (isWhite1 == "w") {
//             K[0].IsKingInCheck(attackMoves2)
//         }
//         else {
//             K[1].IsKingInCheck(attackMoves2)
//         }

//         if (K[0].isInCheck == true || K[1].isInCheck == true) {
//             correctMoves2.splice(correctMoves2.indexOf(currentPiece.validMoves[b]), 1)
//         }

//         for (c = 0; c < pieceList.length; c++) {
//             for (d = 0; d < pieceList[c].length; d++) {
//                 if (pieceList[c][d].squareOn == currentPiece.validMoves[b] && pieceList[c][d].type != "K") {
//                     pieceList[c][d].onBoard = true
//                 }
//             }
//         }

//         currentPiece.squareOn = squareOfPiece

//         boardRepresent2[moveFromSq-1] = currentPiece.color + movePiece
//         boardRepresent2[currentPiece.validMoves[b]-1] = savePieceValue
//         boardRepresent = JSON.parse(JSON.stringify(boardRepresent2))
//         Reset()

//         ResetAllValidMoves("validMoves2")
//     }
//     currentPiece.validMoves = JSON.parse(JSON.stringify(correctMoves2))
//     // [K[0].isInCheck, K[1].isInCheck] = saveIsInCheckValue
//     K[0].isInCheck = saveIsInCheckValue[0]
//     K[1].isInCheck = saveIsInCheckValue[1]
// }



