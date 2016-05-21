app.controller('IndexController', function($scope, VisDataSet, $timeout,tableService) {
    $scope.simbolos = [];
    $scope.estados = [];
    $scope.table=[{}];
    $scope.info=[];
    $scope.onKeyPressResult="";
    $scope.count;
    $scope.tra=[];
    //var table={columnas:[{}],registros:[{}]};

    
    angular.forEach($scope.estados, function (value, key) {
        $scope.table[key]['Estados'] = value;
        angular.forEach($scope.simbolos, function (val, ke) {
            $scope.table[key][val] = $scope.info[key][val];
        });

    });

    $scope.newEstado = function(chip) {
        return {
            name: chip
        };
    };

    
    $scope.newSimbolo = function(chip,count) {
    if($scope.onKeyPressResult>33 && count==1){
        $scope.count=0;
        console.log($scope.tra);
        return {
            name: chip
        };        
    }else { 
        chip="";   
       //$scope.simbolos.pop();
        $scope.count=0;
        return null;}
       //console.log($scope.count);
    };

    $scope.myItems=[];

    /*tableService.setColumns($scope.simbolos);
    tableService.setEstados($scope.estados);

    $scope.table=tableService.getTable();
    $scope.esta=tableService.getEstados();*/
// create an array with nodes
    var nodos = VisDataSet([
	  {id: 1, label: "A"},
	  {id: 2, label: "B"},
	  {id: 3, label: "C"},
	  {id: 4, label: "D"},
	  {id: 5, label: "E"}
	]);
    // create an array with edges
    var aristas = VisDataSet([
	  {from:1, to:3, label:"13"},
	  {from:1, to:2, label:"20"},
	  {from:2, to:4, label:"50"},
	  {from:3, to:5, label:"7"}
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

    //initilization of the table 

    //var simbolos=tableService.getColumns();
    //tableService.setTable($scope.data);
    //var data=tableService.getTable();
    var data= $scope.table;
    $timeout(function(){
      $scope.loaded = true;
    },1500);
      /*
      $scope.data = [{
        "name": "Lukas",
        "surname": "Torek",
        "phone": "666-444-333"
      }, {
        "name": "Jeremy",
        "surname": "Zbyszko",
        "phone": "636-434-333"
      },{
        "name": "Marty",
        "surname": "Wariat",
        "phone": "636-434-333"
      }, {
        "name": "Tom",
        "surname": "Smith",
        "phone": "444-333-222"
      },
                    {
        "name": "Lukas",
        "surname": "Torek",
        "phone": "666-444-333"
      }, {
        "name": "Jeremy",
        "surname": "Zbyszko",
        "phone": "636-434-333"
      },{
        "name": "Marty",
        "surname": "Wariat",
        "phone": "636-434-333"
      }, {
        "name": "Tom",
        "surname": "Smith",
        "phone": "444-333-222"
      },{
        "name": "Lukas",
        "surname": "Torek",
        "phone": "666-444-333"
      }, {
        "name": "Jeremy",
        "surname": "Zbyszko",
        "phone": "636-434-333"
      },{
        "name": "Marty",
        "surname": "Wariat",
        "phone": "636-434-333"
      }, {
        "name": "Tom",
        "surname": "Smith",
        "phone": "444-333-222"
      }];*/
/*
  $scope.columns = [{
          "name": "Your name",
          "identificator": "name",
          "settings": {
            "sortable": true,
          }
        }, {
          "name": "Surname"
        }, {
          "name": "Phone number",
          "identificator": "phone",
          "settings": {
            "sortable": true,
          }
        }];*/
    //simbolos.push({'name':'Aceptacion'});
    //$scope.columns.push({'name':'Aceptacion'});


var getKeyboardEventResult = function (keyEvent, keyEventDesc)
    {
      return window.event.keyCode;
    };

    $scope.estan = function ($event) {
      $scope.onKeyPressResult = getKeyboardEventResult($event);  
      if($scope.onKeyPressResult>33)
      $scope.count ++; 
    };

    $scope.restar = function() { $scope.count = 0; };
});
