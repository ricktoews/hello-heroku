var app = angular.module('mm', []);

app.factory('mMCommentary', function() {
    var commentary = {
        thinking: 'Which code to use...',
        gotit: 'Got it!'
    }
    
    function comments(key) {
        return commentary[key];
    }
    
    return {
        comments: comments
    };
});

app.controller('MasterMind', function(mMFactory, mMScoring, mMCommentary, $scope, $timeout) {
    var currentRow = 0;
    var currentCode = '';

    $scope.rows = [{}, {}, {}, {}, {}, {}, {}, {}];
    
    // Initialize
    mMFactory.initialize (6, 4);

    function randomLetter() {
        var letter = String.fromCharCode(65 + parseInt(Math.random() * 6, 10));
        return letter;
    }

    var thoughtfulMax = 20;
    var thoughtfulTimes = 0;
    function lookingThoughtful(cb) {
        var letters = [];
        
        for (let i = 0; i < 4; i++) {
            letters.push(randomLetter());
        }

        $scope.rows[currentRow].code = mMFactory.formatCode(letters.join(''));
        if (thoughtfulTimes < thoughtfulMax) {
            thoughtfulTimes++;
            $timeout(lookingThoughtful, 100);
        } else {
            $scope.comments = mMCommentary.comments('gotit');
            cb && cb();
        }

    }
    
    function thinking() {
        $scope.comments = mMCommentary.comments('thinking');
        lookingThoughtful();
    }
    
    function isFinished() {
        var score = mMScoring.getCurrentScore();
        var result = (score.filter((item) => { return item === 'black'; }).length === 4);
        return result;
    }
    
    function resetGame() {
        mMFactory.initialize (6, 4);
        currentRow = 0;
        currentCode = '';
        $scope.rows = [{},{},{},{},{},{},{},{}];
        pickCode();
    }
    
    $scope.start = function() {
        //thinking();
        pickCode();
    };
    
    function pickCode() {
        currentCode = mMFactory.pickCode();
        $scope.rows[currentRow].code = mMFactory.formatCode(currentCode);
    }

    $scope.score = function(color) {
        mMScoring.score(color);
        $scope.rows[currentRow].score = mMScoring.getCurrentScore();
    };
    
    $scope.scoreAccept = function() {
        mMFactory.filterPerms(currentCode);
        if (isFinished()) {
            resetGame();
        } else {
            mMScoring.scoreReset();
            currentRow++;
            pickCode();
        }
    };
    
    $scope.scoreReset = function() {
        mMScoring.scoreReset();
        $scope.rows[currentRow].score = mMScoring.getCurrentScore();
    };


});
