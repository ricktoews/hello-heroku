/* global angular */
var app = angular.module('demo', []);

app.factory('decimal', function($http) {
    console.log('making decimal factory');
    return function(denom) {
        var url = 'http://json.arithmophile.com/dc/' + denom;
        return $http.get(url);
        
    }
});