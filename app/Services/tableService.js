/**
 * Created by yair on 19/05/2016.
 */
app.service('tableService',function(){
    var table=[{}];
    var simbolos=[];
    var estados=[];
    //var table={columnas:[{}],registros:[{}]};

    return{
        setTable: function (info) {
            angular.forEach(estados, function (value, key) {
                table[key]['Estados'] = value;
                angular.forEach(simbolos, function (val, ke) {
                    table[key][val] = info[key][val];
                });

            });
        },
        getTable: function () {
            return table;
        },
        setColumns:function (columnas) {
            simbolos=columnas;
        },        
        getColumns:function () {
            return simbolos;
        },
        setEstados:function (estado) {
            estados=estado;
        },
        getEstados:function () {
            return estados;
        }
    };
});