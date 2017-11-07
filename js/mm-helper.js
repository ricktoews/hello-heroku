angular.module('mm')

.factory('mMHelper', function() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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
    
    return {
        convert: convert,
        pad: pad,
        increment: increment,
        translate: translate
    };

});