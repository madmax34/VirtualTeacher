var app = angular.module(
    'virtualTeacherApp',
    [
        'ngRoute',
        'mainMenuController',
        'coloresController',
        'formasController',
        'numerosController',
        'letrasController',
        'imageServices'
    ]);

app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|ms-appx):/);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|ms-appx):/);
}]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/mainMenu.html',
            controller: 'MainMenuController'
        })
        .when('/colores', {
            templateUrl: 'views/colores.html',
            controller: 'ColoresController'
        })
        .when('/formas', {
            templateUrl: 'views/formas.html',
            controller: 'FormasController'
        })
        .when('/numeros', {
            templateUrl: 'views/numeros.html',
            controller: 'NumerosController'
        })
        .when('/letras', {
            templateUrl: 'views/letras.html',
            controller: 'LetrasController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);