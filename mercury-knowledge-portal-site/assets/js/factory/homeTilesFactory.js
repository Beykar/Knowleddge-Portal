/* Home Tiles Data Factory
===========================================================================================
===========================================================================================*/
eyMercuryKnowledgeApp.factory('elsTilesData', function($http){
    return {
        getELSTilesData: function(){
            return $http.get("urlSite/_api/web/lists/getByTitle('MKP_ELS-Tile-List')/items?$select=*&$top=5000", { 
                headers: { "Accept": "application/json;odata=verbose" }
            })
            .then(function(response) {
                return response.data;
            });
        },

        getELSTilesDataInd: function(name){
            return $http.get("urlSite/_api/web/lists/getByTitle('MKP_ELS-Tile-List')/items?$filter=Title eq'" + name + "'", { 
                headers: { "Accept": "application/json;odata=verbose" }
            })
            .then(function(response) {
                return response.data;
            });
        }
    }
})