var coloresController = angular.module('coloresController', []);

coloresController.controller('ColoresController', ['$scope', '$log', 'Random', function ($scope, $log, Random) {
    $scope.shuffle = Random.shuffleArray;
    $scope.getRandomInPeriod = Random.numberInPeriod;

    $scope.gameCanvas = $("#gameCanvas");
    $scope.elementoBuscadoSvg = $("#elementoBuscado");
    $scope.columnCount = 3;
    $scope.rowCount = 3;
    $scope.isPlaying = false;

    $scope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof (fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    $scope.resetAll = function() {
        $scope.puntos = 0;
        $scope.timer = '00:00';
    };

    $scope.resetBoard = function() {
        $scope.columnWidth = ($scope.gameCanvas.width() / $scope.columnCount);
        $scope.columnHeight = ($scope.gameCanvas.height() / $scope.rowCount);
        $scope.minSize = $scope.columnWidth > $scope.columnHeight ? $scope.columnHeight : $scope.columnWidth;
        $scope.widthRect = $scope.minSize - 7;
        $scope.heightRect = $scope.widthRect;
        $scope.playX = Math.floor($scope.gameCanvas.width() / 2) - 100;
        $scope.playY = Math.floor($scope.gameCanvas.height() / 2) - 100;
        $scope.boardWidth = ($scope.widthRect * $scope.columnCount) + 14;
        $scope.boardHeight = ($scope.heightRect * $scope.rowCount) + 14;
        $scope.boardX = Math.floor($scope.gameCanvas.width() / 2) - Math.floor($scope.boardWidth / 2);
        $scope.boardY = Math.floor($scope.gameCanvas.height() / 2) - Math.floor($scope.boardHeight / 2);
        
        $scope.safeApply();
    };

    var svgns = "http://www.w3.org/2000/svg";

    $scope.drawRect = function(x, y, height, width, id, isBuscado) {
        var rect = document.createElementNS(svgns, 'rect');
        rect.setAttributeNS(null, 'x', x);
        rect.setAttributeNS(null, 'y', y);
        rect.setAttributeNS(null, 'height', height);
        rect.setAttributeNS(null, 'width', width);
        rect.setAttributeNS(null, 'fill', colores_lv1[id].colour);
        rect.setAttributeNS(null, 'data-nombre', colores_lv1[id].name);
        rect.setAttributeNS(null, 'data-buscado', isBuscado);
        rect.setAttributeNS(null, 'ng-click', 'elementClick()');
        return rect;
    };

    $scope.drawBoard = function () {
        $scope.gameCanvas.empty();
        $scope.elementoBuscadoSvg.empty();

        $scope.shuffledArray = $scope.shuffle(colores_lv1);
        $scope.indexToSearch = $scope.getRandomInPeriod(0, 7);
        $scope.elementoBuscadoRect = $scope.drawRect(2, 2, 50, 50, $scope.indexToSearch, true);
        $scope.audioToPlay = new Audio($scope.shuffledArray[$scope.indexToSearch].sound);
        $scope.audioToPlay.load();
        $scope.audioToPlay.playbackRate = 1.5;
        $scope.audioToPlay.play();
        
        $scope.elementoBuscadoSvg.append($scope.elementoBuscadoRect);
        $scope.ArrayIndex = 0;

        for (var i = 0; i < $scope.rowCount; i++) {
            $scope.posY = $scope.boardY + $scope.minSize * i;

            for (var j = 0; j < $scope.columnCount; j++) {
                
                $scope.posX = $scope.boardX + $scope.minSize * j;
                if ($scope.ArrayIndex < $scope.shuffledArray.length) {
                    var rect = $scope.drawRect($scope.posX, $scope.posY, $scope.widthRect, $scope.heightRect, $scope.ArrayIndex, false);
                    $scope.gameCanvas.append(rect);
                } else {
                    break;
                }
                $scope.ArrayIndex++;
            }
        }

        $("rect").on("click", function () {
            if ($(this).attr('data-buscado') == 'true') {
                return;
            }

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

    $scope.resetAll();
    $scope.resetBoard();

    $scope.playClick = function () {
        $scope.isPlaying = true;
        $scope.resetAll();
        $scope.resetBoard();
        $scope.drawBoard();
    };

    $scope.orientationChanged = function (mediaQueryList) {
        $scope.resetBoard();

        if ($scope.isPlaying) {
            $scope.drawBoard();
        }
    };

    $scope.orientationCheck = window.matchMedia("(orientation: portrait)");
    $scope.orientationCheck.addListener($scope.orientationChanged);
}]);