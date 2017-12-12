var Chess = {
    king: {
        b: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg',
        w: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg',
        moves: [[0,-1], [1,-1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]]
    },
    knight: {
        b: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg',
        w: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg',
        moves: [[-1, -2], [-1, 2], [1, -2], [1, 2], [-2, -1], [-2, 1], [2, -1], [2, 1]]
    },
    rook: {
        b: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg',
        w: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg',
        moves: [[-1, 0], [1, 0], [0, -1], [0, 1]],
        move_repeat: true
    },
    bishop: {
        b: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg',
        w: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg',
        moves: [[-1, -1], [-1, 1], [1, -1], [1, 1]],
        move_repeat: true
    }
};

var MovePiece = {
    pickUpPiece: (el) => {
        console.log('piece being moved:', el);
        this.el = el;
    },
    dropPiece: () => {
        console.log('returning piece moved:', this.el);
        var el = this.el;
        this.el = null;
        return el;
    }
}

function ChessBoard(container, width, height) {
    Chess.width = width;
    Chess.height = height;
    var that = this;
    this.draw = function(pieces) {
        for (let i = 0; i < height; i++) {
            let rowEl = document.createElement('div');
            container.appendChild(rowEl);
            rowEl.className = 'row';
            for (let j = 0; j < width; j++) {
                let squareEl = document.createElement('div');
                squareEl.addEventListener('dragover', (evt) => {
                    console.log('dragover square');
                    evt.preventDefault();
                    return false;
                })
                squareEl.addEventListener('drop', (evt) => {
                    var el = evt.target;

                    var piece = MovePiece.dropPiece();                    
                    el.appendChild(piece);
                    evt.preventDefault();
                    return false;
                })
                squareEl.className = 'square';
                squareEl.dataset.row = i;
                squareEl.dataset.col = j;
                rowEl.appendChild(squareEl);
            }
        }
        
        if (pieces) {
            pieces.forEach((piece) => {
                this.addPiece(piece[0], piece[1], piece[2], piece[3]);
            });
        }
    }
    
    this.addPiece = function(name, color, x, y) {
        var piece = new ChessPiece(name, color);
        var row = document.getElementsByClassName('row')[y];
        var square = row.getElementsByClassName('square')[x];
        square.appendChild(piece.get());
    }

}

function showTargets(evt) {
    var el = evt.target;
    var square = el.parentNode;
    var col = 1*square.dataset.col;
    var row = 1*square.dataset.row;
    var name = el.dataset.piece;
    var targets = getMoves(col, row, name);
}

function getMoves(col, row, piece) {
    var moves = Chess[piece].moves;
    var move_repeat = Chess[piece].move_repeat;
    var targets = [];
    moves.forEach((move) => {
       let horiz = move[0];
       let vert = move[1];
       
       if (col + horiz >= 0 && col + horiz < Chess.width && row + vert >= 0 && row + vert < Chess.height) {
           let nextSquare = [col + horiz, row + vert];
           targets.push([col + horiz, row + vert]);
       }
    });
    console.log('getMoves', targets);
    var move_repeat = Chess[piece].move_repeat || false;
    return [];
}

function ChessPiece(name, color) {
    var el = document.createElement('img');
    el.className = 'piece';
    el.src=Chess[name][color];
    el.draggable = 'true';
    el.dataset.piece = name;
    el.addEventListener('mouseover', showTargets);
    el.addEventListener('drag', (evt) => {
        MovePiece.pickUpPiece(evt.target);
    });

    this.get = function() {
        return el;
    }
}

function Analyze() {
        
}
