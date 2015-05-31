var pair = { x: 1, y: 1 };

function nextPair(pair) {
    return { x: (pair.x + pair.y*5) / 2, y: (pair.x + pair.y) / 2 };
}

for (var i = 1; i <= 10; i++) {
    console.log(pair);
    pair = nextPair(pair);
}