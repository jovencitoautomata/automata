var app=angular.module('app',['ngRoute','ngMaterial','ngMessages'])
	.config(function ($routeProvider, $locationProvider) {
		$locationProvider.html5Mode({
		  enabled: true,
		  requireBase: false
		});
        $routeProvider.when('/automata', {
            templateUrl: '/automata/app/View/home.html',
            controller: 'IndexController'
        }).otherwise({ redirectTo: '/' });

    });

angular.module('ngMdTables', ['ngMaterial']).directive('ngMdTable', function($filter) {
    return {
      restrict: 'E',
      scope: {
        tableName: '@tableName',
        data: '=data',
        columns: '=',
        pageSize: '=pageSize',
        showSearch: '=showSearch',
        /*showPagination: '=showPagination',*/
        isLoaded: '='
      },
      templateUrl: 'automata/automata/app/View/table.html',
      link: function(scope, element) {
        scope.currentPage = 0;

        scope.showSearch = scope.showSearch || false;
        scope.showPagination = scope.showPagination || false;
        if(scope.isLoaded === undefined){
          scope.isLoaded = true;
        }

        scope.$watch('searchInput', function() {
          if (scope.currentPage >= scope.numberOfPages()) {
            scope.currentPage = 0;
          };
        });

        scope.order = function(predicate, reverse) {
          var dataAfterFiltration = $filter('filter')(scope.data, scope.searchInput);
          scope.lastPredicate = predicate;
          scope.reverse = reverse;
          scope.data = $filter('orderBy')(dataAfterFiltration, predicate, reverse);
        };

        scope.numberOfPages = function() {
          var dataAfterFiltration = $filter('filter')(scope.data, scope.searchInput);
          return Math.ceil(dataAfterFiltration.length / scope.pageSize);
        }

        scope.showArrowUp = function(columnName, reverse) {
          return scope.lastPredicate === columnName && !reverse;
        }

        scope.showArrowDown = function(columnName, reverse) {
          return scope.lastPredicate === columnName && reverse;
        }

      }
    }
  })
  .filter('startFrom', function() {
    return function(input, start) {
      start = +start; //parse to int
      return input.slice(start);
    }
  })
  .filter('floor', function() {
    return function(input) {
      return Math.floor(input);
    }
  })
  .filter('search', function() {
    return function(array, searcherInput) {
      return Math.floor(input);
    }
  });
