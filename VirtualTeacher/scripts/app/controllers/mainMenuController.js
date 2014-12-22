var mainMenuController = angular.module('mainMenuController', []);

mainMenuController.controller('MainMenuController', ['$scope', '$log', 'Images', function ($scope, $log, Images) {
    $scope.getImgSrc = function(src) {
        return Images.getImgSrc(src);
    };
}]);