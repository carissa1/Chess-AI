/* BOARD CLASS */
class Board {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.squares = new Array(width * height)
        this.rows = []
        this.columns = []
        this.diagonals = []
    }

    MakeBoard() {
        /* Makes a board with list of squares, rows, columns, and diagonals*/

        // ROWS, COLUMNS, SQUARES
        let row = []
        let column = []
        for (let i = 0; i < this.width; i++) {
            for (let m = 0; m < this.height; m++) {
                //this.squares.push(m + this.width*i)
                //column.push(this.width*m + i)
                column.push(this.squares[m*8 + i])
            }
            // console.log(column)
            this.columns.push(column)
            column = []
        }
        for (let i = 0; i < this.height; i++) {
            row = this.squares.slice(this.width*i, this.width*(i + 1));
            // console.log(row)
            this.rows.push(row)
            row = []
        }

        // DIAGONAL NW-SE
        let diagonal = []
        let square;
        // diagonal NW-SE using row [21,22,23,24,25,26,27,28] (i)
        for (let i = 0; i < this.rows.length; i++) {
            for (let m = 0; m < (this.width - i); m++) {
                square = this.squares[i + (this.width + 1) * m]
                diagonal.push(square)
            }
            this.diagonals.push(diagonal)
            diagonal = []
        }

        // diagonal NW-SE using column [21,31,41,51,61,71,81,91] (i) not repeating [0]
        for (let i = 1; i < this.height; i++) {
            for (let m = 0; m < (this.width - i); m++) {
                square = this.columns[0][i] + (BOARD.WIDTH + 1) * m
                diagonal.push(square)
            }
            this.diagonals.push(diagonal)
            diagonal = []
        }

        // DIAGONAL NE-SW
        // diagonal NE-SW using row [21,22,23,24,25,26,27,28] (i)
        for (let i = 0; i < this.rows.length; i++) {
            for (let m = 0; m < (i+1); m++) {
                square = this.rows[0][i] + (BOARD.WIDTH - 1) * m
                diagonal.push(square)
            }
            // console.log(diagonal)
            this.diagonals.push(diagonal)
            diagonal = []
        }

        // diagonal NE-SW using column [7,15,23,31,39,47,55,63] (i) not repeating [7, 14, 21, 28, 35, 42, 49, 56]
        for (let i = 1; i < this.columns.length; i++) {
            for (let m = 0; m < (this.width - i); m++) {
                square = this.columns[this.width-1][i] + (BOARD.WIDTH-1) * m
                diagonal.push(square)
            }
            // console.log(diagonal)
            this.diagonals.push(diagonal)
            diagonal = []
        }
    }
}

function RowFileToSq(row, file) {
    /* Return square number (0-119) from row and file */
    return row*10 + (file + 21);
}

function SqToRowFile(sq) {
    /* Return row and file (0-7) from squares (sq120) */
    return [Math.floor((sq - 20)/10), (sq % 10) - 1]
}  

function Sq64to120(sq64) {
    return board64Sq.squares[sq64];
}

function Sq120to64(sq120) {
    return board[sq120];
}

/* INITIALIZE BOARD */
function InitBoards() {
    board = new Array(BOARD_SQ_NUM)
    board64Sq = new Board(8, 8)

    let sq = SQUARES.A1;
    let sq64 = 0;

    for (let i = 0; i < BOARD_SQ_NUM; i++) {
        board[i] = 100;
    }

    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            sq = RowFileToSq(rank, file)
            board64Sq.squares[sq64] = sq
            board[sq] = sq64
            sq64++
        }
    }

    board64Sq.MakeBoard()
}
InitBoards()

// boardRepresent
boardRepresent = [
    'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',
    'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
    'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'
]

boardRep120 = [
    '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
    '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
    '_', 'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R', '_',
    '_', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', '_',
    '_', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '_',
    '_', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '_',
    '_', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '_',
    '_', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '_',
    '_', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', '_',
    '_', 'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r', '_',
    '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
    '_', '_', '_', '_', '_', '_', '_', '_', '_', '_'
]


