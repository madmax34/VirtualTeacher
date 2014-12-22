var imageServices = angular.module('imageServices', []);

imageServices.factory('Images', function () {

    return {
        getImgSrc: function(src) {
            return window.MSApp ? src : '../' + src;
        }
    };
});
