var coloresController = angular.module('coloresController', []);

coloresController.controller('ColoresController', ['$scope', '$log', 'Images', function ($scope, $log, Images) {
    $scope.getImgSrc = function (src) {
        return Images.getImgSrc(src);
    };
}]);