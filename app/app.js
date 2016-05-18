var app=angular.module(function('app',['ngRoute']){}).config(function ($routeProvider, $locationProvider) {

        $routeProvider.when('/', {
            templateUrl: '/app/view/home.html',
            controller: 'IndexController'
        }).otherwise({ redirectTo: '/' });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });