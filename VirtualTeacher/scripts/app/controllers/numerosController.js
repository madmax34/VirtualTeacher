var numerosController = angular.module('numerosController', []);

numerosController.controller('NumerosController', ['$scope', '$log', 'Images', function ($scope, $log, Images) {
    $scope.getImgSrc = function (src) {
        return Images.getImgSrc(src);
    };
}]);