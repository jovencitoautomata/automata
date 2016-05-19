app.controller('IndexController', function($scope, VisDataSet,$mdConstant) {
    
            // Use common key codes found in $mdConstant.KEY_CODE...
        $scope.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
        $scope.tags = [];
        // Any key code can be used to create a custom separator
        var semicolon = 186;
        $scope.customKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA, semicolon];
        //$scope.contacts = ['test@example.com'];
// create an array with nodes
    var nodos = VisDataSet([
	  {id: 1, label: "A"},
	  {id: 2, label: "B"},
	  {id: 3, label: "C"},
	  {id: 4, label: "D"},
	  {id: 5, label: "E"},
	]);
    // create an array with edges
    var aristas = VisDataSet([
	  {from:1, to:3, label:"13"},
	  {from:1, to:2, label:"20"},
	  {from:2, to:4, label:"50"},
	  {from:3, to:5, label:"7"},
	]);


    // create a network
    //var container = document.getElementById('mynetwork');

    // provide the data in the vis format
    $scope.data = {
        nodes: nodos,
        edges: aristas
    };

    $scope.options = {};

        $scope.onSelect = function (items) {
        // debugger;
        alert('select');
    };

    $scope.onClick = function (props) {
        //debugger;
        alert('Click');
    };

    $scope.onDoubleClick = function (props) {
        // debugger;
        alert('DoubleClick');
    };

    $scope.rightClick = function (props) {
        alert('Right click!');
        props.event.preventDefault();
    };

    $scope.events = {
        rangechange: $scope.onRangeChange,
        rangechanged: $scope.onRangeChanged,
        onload: $scope.onLoaded,
        select: $scope.onSelect,
        click: $scope.onClick,
        doubleClick: $scope.onDoubleClick,
        contextmenu: $scope.rightClick
    };

    // initialize your network!
   // var network = new vis.Network(container, data, options);
});