var app=angular.module('app',['ngRoute','ngMaterial','ngMessages','ngMdTables','ngVis'])
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
      templateUrl: 'automata/app/View/table.html',
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


angular.module('ngVis', [])

    .factory('VisDataSet', function () {
        'use strict';
        return function (data, options) {
            // Create the new dataSets
            return new vis.DataSet(data, options);
        };
    })

/**
 * TimeLine directive
 */
    .directive('visTimeline', function () {
        'use strict';
        return {
            restrict: 'EA',
            transclude: false,
            scope: {
                data: '=',
                options: '=',
                events: '='
            },
            link: function (scope, element, attr) {
                var timelineEvents = [
                    'rangechange',
                    'rangechanged',
                    'timechange',
                    'timechanged',
                    'select',
                    'doubleClick',
                    'click',
                    'contextmenu'
                ];

                // Declare the timeline
                var timeline = null;

                scope.$watch('data', function () {
                    // Sanity check
                    if (scope.data == null) {
                        return;
                    }

                    // If we've actually changed the data set, then recreate the graph
                    // We can always update the data by adding more data to the existing data set
                    if (timeline != null) {
                        timeline.destroy();
                    }

                    // Create the timeline object
                    timeline = new vis.Timeline(element[0], scope.data.items, scope.data.groups, scope.options);

                    // Attach an event handler if defined
                    angular.forEach(scope.events, function (callback, event) {
                        if (timelineEvents.indexOf(String(event)) >= 0) {
                            timeline.on(event, callback);
                        }
                    });

                    // onLoad callback
                    if (scope.events != null && scope.events.onload != null &&
                        angular.isFunction(scope.events.onload)) {
                        scope.events.onload(timeline);
                    }
                });

                scope.$watchCollection('options', function (options) {
                    if (timeline == null) {
                        return;
                    }
                    timeline.setOptions(options);
                });
            }
        };
    })

/**
 * Directive for network chart.
 */
    .directive('visNetwork', function () {
        return {
            restrict: 'EA',
            transclude: false,
            scope: {
                data: '=',
                options: '=',
                events: '='
            },
            link: function (scope, element, attr) {
                var networkEvents = [
                    'click',
                    'doubleClick',
                    'oncontext',
                    'hold',
                    'release',
                    'selectNode',
                    'selectEdge',
                    'deselectNode',
                    'deselectEdge',
                    'dragStart',
                    'dragging',
                    'dragEnd',
                    'hoverNode',
                    'blurNode',
                    'zoom',
                    'showPopup',
                    'hidePopup',
                    'startStabilizing',
                    'stabilizationProgress',
                    'stabilizationIterationsDone',
                    'stabilized',
                    'resize',
                    'initRedraw',
                    'beforeDrawing',
                    'afterDrawing',
                    'animationFinished'

                ];

                var network = null;

                scope.$watch('data', function () {
                    // Sanity check
                    if (scope.data == null) {
                        return;
                    }

                    // If we've actually changed the data set, then recreate the graph
                    // We can always update the data by adding more data to the existing data set
                    if (network != null) {
                        network.destroy();
                    }

                    // Create the graph2d object
                    network = new vis.Network(element[0], scope.data, scope.options);

                    // Attach an event handler if defined
                    angular.forEach(scope.events, function (callback, event) {
                        if (networkEvents.indexOf(String(event)) >= 0) {
                            network.on(event, callback);
                        }
                    });

                    // onLoad callback
                    if (scope.events != null && scope.events.onload != null &&
                        angular.isFunction(scope.events.onload)) {
                        scope.events.onload(network);
                    }
                });

                scope.$watchCollection('options', function (options) {
                    if (network == null) {
                        return;
                    }
                    network.setOptions(options);
                });
            }
        };
    })

/**
 * Directive for graph2d.
 */
    .directive('visGraph2d', function () {
        'use strict';
        return {
            restrict: 'EA',
            transclude: false,
            scope: {
                data: '=',
                options: '=',
                events: '='
            },
            link: function (scope, element, attr) {
                var graphEvents = [
                    'rangechange',
                    'rangechanged',
                    'timechange',
                    'timechanged',
                    'finishedRedraw'
                ];

                // Create the chart
                var graph = null;

                scope.$watch('data', function () {
                    // Sanity check
                    if (scope.data == null) {
                        return;
                    }

                    // If we've actually changed the data set, then recreate the graph
                    // We can always update the data by adding more data to the existing data set
                    if (graph != null) {
                        graph.destroy();
                    }

                    // Create the graph2d object
                    graph = new vis.Graph2d(element[0], scope.data.items, scope.data.groups, scope.options);

                    // Attach an event handler if defined
                    angular.forEach(scope.events, function (callback, event) {
                        if (graphEvents.indexOf(String(event)) >= 0) {
                            graph.on(event, callback);
                        }
                    });

                    // onLoad callback
                    if (scope.events != null && scope.events.onload != null &&
                        angular.isFunction(scope.events.onload)) {
                        scope.events.onload(graph);
                    }
                });

                scope.$watchCollection('options', function (options) {
                    if (graph == null) {
                        return;
                    }
                    graph.setOptions(options);
                });
            }
        };
    })
;