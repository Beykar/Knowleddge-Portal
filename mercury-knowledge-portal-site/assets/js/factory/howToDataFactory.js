/* How To Data Factory
===========================================================================================
===========================================================================================*/
eyMercuryKnowledgeApp.factory('howToData', function($http){
    return {
        getELSData: function(factoryName){
            return $http.get("urlSite/_api/web/lists/getByTitle('" + factoryName + "')/items?$top=5000", { 
                headers: { "Accept": "application/json;odata=verbose" }
            })
            .then(function(response) {
                return response.data;
            });
        },

        getHowToData: function(factoryName, howToNumber){
              return $http.get("urlSite/_api/web/lists/getByTitle('" + factoryName + "')/items?$filter=Title eq'" + howToNumber + "'", { 
                headers: { "Accept": "application/json;odata=verbose" }
            })
            .then(function(response) {
                return response.data;
            });
        }
    }
})