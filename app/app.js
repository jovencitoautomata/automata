var app=angular.module('app',['ngRoute','ngMaterial','ngMessages'])
	.config(function ($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'app/View/home.html',
            controller: 'IndexController'
        }).otherwise({ redirectTo: '/' });


    });
