/* Clear Board */
function ClearBoard(){
    /* Clears the board on screen by removing all pieces */
    
    for(let i = 0; i < 64; i++){
        square = i

        boardRepresent[i] = ' '
        boardRep120[Sq64to120(i)] = ' '

        // Set squareTens and squareOnes
        if(square > 9){
            squareTens = Math.floor((square / Math.pow(10, 1)) % 10).toString()
            squareOnes = Math.floor((square / Math.pow(10, 0)) % 10).toString()
        }
        else{
            squareOnes = Math.floor((square / Math.pow(10, 0)) % 10).toString()
        }

        // Clear board
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

/* Reset Pieces */
function ResetPieces() {
    /* Reset all pieces squareOn120s based on boardRep120 */
    let indx
    pieceList = []
    let wKing
    let bKing
    for (let i = 0; i < 64; i++) {
        indx = Sq64to120(i)
        
        if (boardRep120[indx] != ' ') {
            if (boardRep120[indx] == 'k') {
                wKing = new King('w', i, 'K')
                pieceList.push(wKing)
                K[0] = wKing
            }
            else if (boardRep120[indx] == 'K') {
                bKing = new King('b', i, 'K')
                pieceList.push(bKing)
                K[1] = bKing
            }
            else if (boardRep120[indx] == boardRep120[indx].toLowerCase()) {
                pieceList.push(new Piece('w', i, boardRep120[indx].toUpperCase()))
            }
            else if (boardRep120[indx] != boardRep120[indx].toLowerCase()) {
                pieceList.push(new Piece('b', i, boardRep120[indx]))
            }
        }
    }
}

function ResetVars() {
    /* Reset boardRep120 and pieceSquares */

    // Reset vars
    pieceSquaresW = {}
    pieceSquaresB = {}
    for (let i = 0; i < pieceList.length; i++) {
        // Set squareOn
        pieceList[i].squareOn = Sq120to64(pieceList[i].squareOn120)

        // Set boardRep120 and boardRepresent
        boardRep120[pieceList[i].squareOn120] = pieceList[i].piece
        boardRepresent[pieceList[i].squareOn] = pieceList[i].piece

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

    // Change castling restrictions
    SetCastlePieces()
    UpdateCastling()

    // Place pieces on the board
    for(let i = 0; i < pieceList.length; i++) {
        square = pieceList[i]
    
        // Set square-tens and square-ones
        if(square.squareOn > 9){
            squareTens = Math.floor(square.squareOn / 10).toString()
            squareOnes = Math.floor(square.squareOn % 10).toString()
        }
        else{
            squareOnes = Math.floor(square.squareOn % 10).toString()
        }

        // Set pieces up
        if(square.squareOn < 10){
            document.querySelector("#\\3" + squareOnes).querySelector(".pieces").classList.add(square.color + square.type)
        }
        else{
            document.querySelector("#\\3" + squareTens + " " + squareOnes).querySelector(".pieces").classList.add(square.color + square.type)
        }
    }
}