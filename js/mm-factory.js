var app = angular.module('mm');

app.factory('mMScoring', function() {
    var currentScore = [];
    
    function score(color) {
        if (currentScore.length > 3) {
            console.log('score can have no more than four pins.');
        } else if (currentScore.filter((item) => { return item === 'black'; }).length === 3 && color === 'white') {
            console.log('three blacks and a white not possible.');
        } else {
            currentScore.push(color);
            currentScore.sort();
            if (currentScore.filter((item) => { return item === 'black'; }).length === 4) {
                console.log('Finished.');
            }
        }
    }
    
    function getCurrentScore() {
        return currentScore;
    }
    
    function scoreReset() {
        currentScore = [];
    }
    
    return {
        score: score,
        getCurrentScore: getCurrentScore,
        scoreReset: scoreReset
    };
});


app.factory('mMFactory', function(mMScoring) {
    var letterToColor = {
        'A': 'red',
        'B': 'blue',
        'C': 'green',
        'D': 'white',
        'E': 'yellow',
        'F': 'black'
    };
    
    var permutations;

    /*
        Set of functions to generate padded codes.
    */

    // Convert base 10 number to other specified base.
    function convert(num, base) {
        var conversion = '';
        while (num > 0) {
            var digit = num % base;
            conversion = digit + conversion;
            num = (num - digit) / base;
        }
        return conversion;
    }

    // Pad string to specified length with specified character
    function pad(str, padlen, padchar) {
        while (str.length < padlen) {
            str = padchar + str;
        }
        return str;
    }

    // Return simple increment, for when such affects only the unit position.
    function increment(str) {
        var lastNdx = str.length - 1;
        var lastDig = str.charAt(lastNdx);
        lastDig *= 1;
        lastDig += 1;
        str = str.substr(0, lastNdx) + lastDig;
        return str;
    }

    function translate(raw) {
        var translated = '';
        var len = raw.length;
        for (let i = 0; i < len; i++) {
            let rawNdx = raw[i] * 1;
            translated += chars[rawNdx];
        }
        return translated;
    }

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    function build(base, length) {
        var max = Math.pow(base, length);
        var raw = '';
        var perms = [];
        for (let qty = 0; qty < max; qty++) {
            raw = (qty % base === 0) ? convert(qty, base) : increment(raw);
            let numcode = pad(raw, length, '0');
            let perm = translate(numcode);
            perms.push(perm);
        }
        return perms;
    }

    function initialize(base, length) {
      permutations = build(base, length);
    }

    function formatCode(code) {
        var letters = code.split('');
        var formatted = [];
        letters.forEach((letter) => {
            formatted.push(letterToColor[letter]);
        });
        console.log('formatCode', code, formatted);
        return formatted;
    }
    

//---------------------------------------------------------------------------------------

    function check_exact(exact, perm, pattern) {
        var perm = perm.split('');
        var pattern_len = pattern.length;
        var pattern = pattern.split('');
        var count = 0;
        for (let i = 0; i < pattern_len; i++) {
            if (pattern[i] === perm[i]) {
                pattern[i] = '_';
                count += 1;
            }
        }
        if (count === exact) {
            return true;
        } else {
            return false;
        }
    }

    function check_inexact(inexact, perm, pattern) {
        var perm = perm.split('');
        var orig_pattern = pattern;
        var pattern = pattern.split('');
        var pattern_len = pattern.length;
        for (let i = 0; i < pattern_len; i++) {
            if (pattern[i] === perm[i]) {
                perm[i] = '_';
                pattern[i] = '_';
            }
        }
        var count = 0;
        for (let i = 0; i < pattern_len; i++) {
            if (pattern[i] !== '_') {
                if (pattern[i] !== perm[i] && perm.indexOf(pattern[i]) !== -1) {
                    let ndx = perm.indexOf(pattern[i]);
                    perm[ndx] = '_';
                    count++;
                }
            }
        }

        if (count === inexact) {
            return true;
        } else {
            return false;
        }
    }

    function is_match(exact, inexact, perm, pattern) {
        var exact_match = check_exact(exact, perm, pattern);
        if (exact_match) {
            var inexact_match = check_inexact(inexact, perm, pattern);
        }

        return exact_match && inexact_match;
    }

    function filterPerms(pattern) {
        var currentScore = mMScoring.getCurrentScore();
        var exact = currentScore.filter((item) => { return item === 'black'; }).length;
        var inexact = currentScore.filter((item) => { return item === 'white'; }).length;

        var filtered = [];
        permutations.forEach((p) => {
            if (is_match(exact, inexact, p, pattern)) {
                filtered.push(p);
            }
        });

        permutations = filtered;
    }

    function pickCode() {
        console.log('pickCode permutations', permutations);
        var randPick = parseInt(Math.random() * permutations.length, 10);
        var code = permutations[randPick];
        return code;
    }


    return {
        initialize: initialize,
        filterPerms: filterPerms,
        formatCode: formatCode,
        pickCode: pickCode
    };
});