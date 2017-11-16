function Hanoi() {
    var foundation = [[],[],[]];
    var lastFrom, lastTo;
    var moveCount = 0;
    
    function init(stackHeight) {
        for (let i = 0; i < stackHeight; i++) {
            foundation[0].push(i);
        }
    }
    this.init = init;
    
    function move(from, to) {
        lastFrom = from;
        lastTo = to;
        var item = foundation[from].shift();
        foundation[to].unshift(item);
        moveCount++;
        console.log('Status #', moveCount, ':', JSON.stringify(foundation[0]), '||', JSON.stringify(foundation[1]), '||', JSON.stringify(foundation[2]));
        if (foundation[0].length === 0 && foundation[1].length === 0) {
            console.log('We seem to be finished.');
        }
        else if (moveCount < 300) {
            next();
        }
    }
    
    function start() {
        var target = foundation[0].length % 2 === 1 ? 2 : 1;
        move(0, target);
    }
    this.start = start;
    
    function getWorkingHeight(tower) {
        var current = tower[0];
        var towerNdx = 1;
        while (tower[towerNdx] - current === 1) {
            current = tower[towerNdx];
            towerNdx++;
        }
        var workingHeight = towerNdx;
        return workingHeight;
    }
    
    function next() {
        var permissibleFrom = [];
        var filter;
        var largestTop = Math.max.apply(null, foundation.map((item) => { return item[0] === undefined ? 1000 : item[0]; } ));

        for (let i = 0; i < 3; i++) {
            filter = true;
            if (foundation[i].length === 0) {
                filter = false;
            }
            if (i === lastTo) {
                filter = false;
            }
            if (foundation[i][0] === largestTop) {
                filter = false;
            }
            if (filter) {
                permissibleFrom.push(i);
            }
        }
        var moveFrom = -1;
        var itemSize = -1;
        if (permissibleFrom.length === 1) {
            moveFrom = permissibleFrom[0];
            itemSize = foundation[moveFrom][0];
        }

        var permissibleTo = [];
        for (let i = 0; i < 3; i++) {
            filter = true;
            if (i === moveFrom) {
                filter = false;
            }
            else if (itemSize !== -1 && itemSize > foundation[i][0]) {
                filter = false;
            }
            
            if (filter) {
                permissibleTo.push(i);
            }
        }
 
        if (permissibleTo.length > 1) {
 //           console.log('PermissibleTo arbitration:', JSON.stringify((permissibleTo)));
            permissibleTo.forEach((f) => {
                if (foundation[f][0] - foundation[moveFrom][0] === 1) {
 //           console.log('PermissibleTo difference of 1:');
                    permissibleTo = [f];
                }
            });
            if (permissibleTo.length > 1) {
 //           console.log('PermissibleTo based on from tower working height');
                if (getWorkingHeight(foundation[moveFrom]) % 2 === 1) {
                    permissibleTo = [lastTo];
                }
                else {
                    permissibleTo = permissibleTo.filter((item) => { return item !== lastTo; });
                }
            }

        }
        
        var moveTo;
        if (permissibleTo.length === 1) {
            moveTo = permissibleTo[0];
        }

        move(moveFrom, moveTo);
    }
}