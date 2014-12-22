var letrasController = angular.module('letrasController', []);

letrasController.controller('LetrasController', ['$scope', '$log', 'Images', function ($scope, $log, Images) {
    $scope.getImgSrc = function (src) {
        return Images.getImgSrc(src);
    };
}]);