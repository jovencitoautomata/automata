var app=angular.module('app',['ngRoute','ngMaterial','ngMessages'])
	.config(function ($routeProvider, $locationProvider) {
		$locationProvider.html5Mode({
		  enabled: true,
		  requireBase: false
		});
        $routeProvider.when('/', {
            templateUrl: '/automata/automata/app/View/home.html',
            controller: 'IndexController'
        }).otherwise({ redirectTo: '/' });




    });
