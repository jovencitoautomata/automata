app.controller('IndexController', function($scope, VisDataSet, $timeout, $mdSidenav, $log) {
    $scope.simbolos = [];
    $scope.estados = [];
    $scope.info=[];
    $scope.onKeyPressResult="";
    $scope.count;
    $scope.cadena="";
    $scope.aceptacion;
    $scope.tra=[];
    $scope.cadenas=[];
    $scope.removeChip=function(index,holder,chip){
        
        if(holder.$element[0].id=="chipestados"){
            for(var $i=0;$i<$scope.tra.length; $i++) {
                if($scope.tra[$i]['estado']==chip){
                    $scope.tra.splice($i,1);
                    break;
                }
            }
        }else{
            for (var name in $scope.tra) {
                delete $scope.tra[name][chip];
            }
        }
    };

    $scope.addItem = function () {
      var aceptacion;
      var existe=false;
        $scope.errortext = "";
        if (!$scope.addMe) {return;}
        angular.forEach($scope.cadenas,function(value,key){
          if(value.cadena==$scope.addMe){
            return existe=true;
          }
        });
        if (!existe) {
            aceptacion=resultadoCadena($scope.addMe);            
            $scope.cadenas.push({cadena:$scope.addMe,aceptacion:aceptacion});
            $scope.addMe=null;
        } else {
            $scope.errortext = "La cadena ya existe en la lista";
        }
    }

    $scope.removeItem = function (x) {
        $scope.errortext = "";    
        $scope.cadenas.splice(x, 1);
    }


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

// create an array with nodes

    var nodos = VisDataSet([]);
    var aristas = VisDataSet([]);


    $scope.$watch('estados',function(data){

     
        var nodosGraf=[];

        angular.forEach($scope.estados,function(value, key){
       
            nodos.update({id:value.name,label: value.name});
        });

        var antiguos=nodos.getIds();
        var auxiliar=[];
          for(var i=0;i<antiguos.length;i++){
            for(var j=0;j<$scope.estados.length;j++){
              
                    if(antiguos[i]==$scope.estados[j].name){
                      break;
                    }
                    if(j==$scope.estados.length-1){
                      auxiliar.push({id:antiguos[i]});
                    }
                 }
             if($scope.estados.length==0)
              auxiliar.push({id:antiguos[i]});   
          }
        nodos.remove(auxiliar);
       
    }, true);

    $scope.$watch('tra',function(data){
        var aris=[];
        var transiciones=[];
        angular.forEach($scope.tra,function(value,key){
           
            if(value.aceptacion)
                nodos.update([{id:value.estado,color:{background:'rgb(105,240,174)'}}]);
            
            else
                nodos.update([{id:value.estado,color:{background:'rgba(240,252,86,1)'}}]);
            

            angular.forEach(value,function(val,ke){
                if(ke!='estado' && ke!='aceptacion'){
                  transiciones.push(value.estado+ke+"");
                aris.push({id:value.estado+ke+"",from : value.estado, to : val, label : ke});
              }
            });
        });
        aristas.update(aris);

        var antiguos=aristas.getIds();
        var auxiliar=[];
        for(var i=0;i<antiguos.length;i++){
            for(var j=0;j<transiciones.length;j++){
                if(antiguos[i]==transiciones[j]){
                  break;
                }
                if(j==transiciones.length-1){
                  auxiliar.push({id:antiguos[i]});
                }
            }
            if($scope.transiciones.length==0)
              auxiliar.push({id:antiguos[i]}); 
        }
        
        aristas.remove(auxiliar);
       /* $scope.data = {
            nodes: nodos,
            edges: aristas
        };*/
        
    },true);

    $scope.data = {
            nodes: nodos,
            edges: aristas
        };


    // create a network
    //var container = document.getElementById('mynetwork');

    // provide the data in the vis format


    $scope.options = {  "nodes": {
    "color": {
      "background": "rgba(240,252,86,1)"
    },
    "font": {
      "color": "rgba(0,0,0,1)",
      "size": 25,
      "face": "tahoma",
      "background": "rgba(76,76,76,0)"
    },
    "scaling": {
      "min": 38,
      "max": 58
    },
    "shape": "circle",
    "size": 64
  },
  "edges": {
    "arrows": {
      "to": {
        "enabled": true,
        "scaleFactor": 0.55
      }
    },
    "font": {
      "color": "rgba(52,10,5,1)",
      "size": 16,
      "face": "tahoma",
      "align": "top"
    },
    "scaling": {
      "min": 17,
      "max": 27
    },
    "shadow": {
      "enabled": true
    },
    "smooth": {
      "forceDirection": "none"
    }
  },
  "interaction": {
    "hover": true,
    "multiselect": true,
     "navigationButtons": true
  },
  "manipulation": {
    "enabled": false,
    "initiallyActive": true,
    addNode: function (data, callback) {
            $mdSidenav('nodos')
          .toggle()
          .then(function () {
            $log.debug("toggle " + "nodos" + " is done");
            $scope.nombreEst="";
          });

          },
          editNode: function (data, callback) {
            // filling in the popup DOM elements
            document.getElementById('operation').innerHTML = "Edit Node";
            document.getElementById('node-id').value = data.id;
            document.getElementById('node-label').value = data.label;
            document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
            document.getElementById('cancelButton').onclick = cancelEdit.bind(this,callback);
            document.getElementById('network-popUp').style.display = 'block';
          },
          addEdge: function (data, callback) {
            if (data.from == data.to) {
              var r = confirm("Do you want to connect the node to itself?");
              if (r == true) {
                callback(data);
              }
            }
            else {
              callback(data);
            }
          }
  },
  "physics": {
    "minVelocity": 0.75
  },"locale": "es"};/*

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
    */
    //slide de insertar nodos

    $scope.agregarNodo=function(){
        var nodosGraf=[];
        var existe=false;
        angular.forEach($scope.estados,function(value, key){
            if(value.name==$scope.nombreEst)
                existe=true;
            nodosGraf.push({id:value.name,label: value.name});
        });
        if(!existe){
        nodosGraf.push({id:$scope.nombreEst,label:$scope.nombreEst});
        $scope.estados.push({name:$scope.nombreEst});
        }
        nodos = VisDataSet(nodosGraf);
        // create an array with edges

        $scope.data = {
            nodes: nodos,
            edges: aristas
        };
    };
    //cerar slide
   $scope.close = function () {
      $mdSidenav('nodos').close()
        .then(function () {
          $log.debug("close nodos is done");
        });
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

    /*metodos mios*/
    function resultadoCadena(cadena){
        var letras=[];
        var inicial;
        //var estado;
        letras = cadena.split(""); 
        inicial = $scope.tra[0][letras[0]];
        //estado = $scope.tra[0]['aceptacion'];

        for(var $i=1;$i<=letras.length; $i++) {
            for(var $j=0;$j<$scope.tra.length;$j++){
                if($i==letras.length){
                    if($scope.tra[$j]['estado']==inicial){
                        return $scope.tra[$j]['aceptacion'];                        
                        break;
                    }
                }else{
                   if($scope.tra[$j]['estado']==inicial){
                       inicial=$scope.tra[$j][letras[$i]];
                       //estado=$scope.tra[$j]['aceptacion'];
                       break;
                   }
                }
            }
        }

    }

    $scope.removeNCadenas=function(){
        $scope.cadenas=[];
    }
});
