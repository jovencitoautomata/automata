/**
 * Created by yair on 19/05/2016.
 */
app.service('tableService',function(){
    
    var table={columnas:[{}],registros:[{}]};
    return{setColumns:function (columnas) {
        table.columnas=columnas;
    },
    setRegistros:function (registros) {
        table.registros=registros;
    },
    getColumns:function () {
        return table.columnas;
    },
    getRegistros:function () {
        return table.registros;
    }};
});