var coloresController = angular.module('coloresController', []);

coloresController.controller('ColoresController', ['$scope', '$log', 'Images', function ($scope, $log, Images) {
    $scope.puntos = 0;
    $scope.timer = '00:00.000s';
    $scope.gameCanvas = $("#gameCanvas");
    $scope.elementoBuscadoSvg = $("#elementoBuscado");

    $scope.columnWidth = ($scope.gameCanvas.width() / 3);
    $scope.columnHeight = ($scope.gameCanvas.height() / 3);
    $scope.minSize = $scope.columnWidth > $scope.columnHeight ? $scope.columnHeight : $scope.columnWidth;
    $scope.widthRect = $scope.minSize - 10;
    $scope.heightRect = $scope.widthRect;
    $scope.playX = Math.floor($scope.gameCanvas.width() / 2) - 100;
    $scope.playY = Math.floor($scope.gameCanvas.height() / 2) - 100;

    var svgns = "http://www.w3.org/2000/svg";

    $scope.drawRect = function(x, y, height, width, id) {
        var rect = document.createElementNS(svgns, 'rect');
        rect.setAttributeNS(null, 'x', x);
        rect.setAttributeNS(null, 'y', y);
        rect.setAttributeNS(null, 'height', height);
        rect.setAttributeNS(null, 'width', width);
        rect.setAttributeNS(null, 'fill', colores_lv1[id].colour);
        rect.setAttributeNS(null, 'data-nombre', colores_lv1[id].name);
        rect.setAttributeNS(null, 'ng-click', 'elementClick()');
        return rect;
    };

    $scope.shuffle = function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
            array[randomIndex].id = randomIndex;
        }

        return array;
    };

    $scope.getRandomInPeriod = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    $scope.drawBoard = function () {
        $scope.gameCanvas.empty();
        $scope.elementoBuscadoSvg.empty();

        $scope.shuffledArray = $scope.shuffle(colores_lv1);
        
        $scope.elementoBuscadoRect = $scope.drawRect(2, 2, 50, 50, $scope.getRandomInPeriod(0, 7));
        
        $scope.elementoBuscadoSvg.append($scope.elementoBuscadoRect);
        $scope.ArrayIndex = 0;

        for (var i = 0; i < 3; i++) {
            $scope.posY = 5 + $scope.minSize * i;

            for (var j = 0; j < 3; j++) {
                setTimeout(true, 500);
                $scope.posX = 5 + $scope.minSize * j;
                if ($scope.ArrayIndex < $scope.shuffledArray.length) {
                    var rect = $scope.drawRect($scope.posX, $scope.posY, $scope.widthRect, $scope.heightRect, $scope.ArrayIndex);
                    $scope.gameCanvas.append(rect);
                } else {
                    break;
                }
                $scope.ArrayIndex++;
            }
        }

        $("rect").on("click", function () {

            if ($scope.elementoBuscadoRect) {
                var nombreBuscado = $scope.elementoBuscadoRect.getAttribute('data-nombre');
                var nombre = $(this).attr('data-nombre');

                if (nombreBuscado == nombre) {
                    $scope.puntos += 50;
                    $scope.$apply();
                    $scope.drawBoard();
                } else {
                    $scope.puntos -= 25;
                    $scope.$apply();
                }
            }
        });
    };

    $scope.playClick = function() {
        $scope.drawBoard();
    };
}]);