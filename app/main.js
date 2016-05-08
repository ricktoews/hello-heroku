/* global angular */
angular.module('demo', [])

.controller('LodashLabCtrl', function($scope, decimal) {
  $scope.calculate = function() {
    decimal($scope.denom).then(function(response) {
      var data = response.data;    console.log("decimal data", data);
      $scope.decimalData = data;
    
    });
  }
})

.factory('decimal', function($http) {
    return function(denom) {
        var url = 'http://json.arithmophile.com/dc/' + denom;
        return $http.get(url);
        
    }
})

.directive('decimals', function() {
  console.log('attempting to do something directive-y');
  return {
    restrict: 'E',
    templateUrl: 'app/templates/decimal-table.html',
    link: link
  };
  
  function link(scope, elem, attr) {
    console.log('inside decimalTable link function');
    
  }
})
;