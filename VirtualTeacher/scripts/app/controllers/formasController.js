var formasController = angular.module('formasController', []);

formasController.controller('FormasController', ['$scope', '$log', 'Images', function ($scope, $log, Images) {
    $scope.getImgSrc = function (src) {
        return Images.getImgSrc(src);
    };
}]);