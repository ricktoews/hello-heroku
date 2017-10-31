angular.module('mathToysApp')
.factory('decimal', function($http) {
    console.log('making decimal factory');
    return function(denom) {
        var url = '//arithmo-rest.toewsweb.net/dc/' + denom;
        return $http.get(url);
        
    }
});
