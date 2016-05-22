app.controller('IndexController', function($scope, VisDataSet, $timeout) {
    $scope.simbolos = [];
    $scope.estados = [];
    $scope.info=[];
    $scope.onKeyPressResult="";
    $scope.count;
    $scope.tra=[];
    $scope.removeChip=function(index,holder,chip){
        //console.log(holder.$element[0].id);
        if(holder.$element[0].id=="chipestados"){
            for(var $i=0;$i<$scope.tra.length; $i++) {
                if($scope.tra[$i]['estado']==chip){
                    $scope.tra.splice($i,1);
                    break;
                }
                console.log($scope.tra[$i]['estado'],chip);
            }
        }else{
            for (var name in $scope.tra) {
                delete $scope.tra[name][chip];
            }
        }
    };


    $scope.newEstado = function(chip) {
        return {
            name: chip
        };
    };


    $scope.newSimbolo = function(chip,count) {
    if(($scope.onKeyPressResult>33 || $scope.onKeyPressResult==8 || $scope.onKeyPressResult==46) && count==1){
        $scope.count=0;
        return {
            name: chip
        };
    }else {
        chip="";
        $scope.count=0;
        return null;}
    };

    $scope.myItems=[];

// create an array with nodes

    var nodos = VisDataSet([]);
    var aristas = VisDataSet([]);


    $scope.$watch('estados',function(data){
    //console.log(data);
        var nodosGraf=[];
        angular.forEach($scope.estados,function(value, key){
            nodosGraf.push({id:value.name,label: value.name});
        });
        nodos = VisDataSet(nodosGraf);
        // create an array with edges

        $scope.data = {
            nodes: nodos,
            edges: aristas
        };
    }, true);

    $scope.$watch('tra',function(data){
        var aris=[];
        angular.forEach($scope.tra,function(value,key){
            angular.forEach(value,function(val,ke){
                if(ke!='estado' && ke!='aceptacion')
                aris.push({from : value.estado, to : val, label : ke});
            });
        });
        //console.log(aristas);
        aristas=VisDataSet(aris);
        $scope.data = {
            nodes: nodos,
            edges: aristas
        };
        console.log($scope.data);
    },true);


    // create a network
    //var container = document.getElementById('mynetwork');

    // provide the data in the vis format


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

    var getKeyboardEventResult = function (keyEvent, keyEventDesc)
        {
          return window.event.keyCode;
    };

    $scope.estan = function ($event) {
      $scope.onKeyPressResult = getKeyboardEventResult($event);
      if(($scope.onKeyPressResult==8 || $scope.onKeyPressResult==46)&& $scope.count>0)
          $scope.count --;
      else if($scope.onKeyPressResult>33)
        $scope.count ++;
    };

    $scope.restar = function() { $scope.count = 0; };
});
