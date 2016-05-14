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
;
