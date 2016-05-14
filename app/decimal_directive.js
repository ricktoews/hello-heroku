/* global angular */
angular.module('demo')
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
