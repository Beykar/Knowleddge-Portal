/* Guidance data Factory
===========================================================================================
===========================================================================================*/
eyMercuryKnowledgeApp.factory('guidanceData', function($http){
    return {
        getGuidanceData: function(){
            return $http.get("urlSite/_api/web/lists/getByTitle('MKP_Guidance-List')/items?$top=5000", { 
                headers: { "Accept": "application/json;odata=verbose" }
            })
            .then(function(response) {
                return response.data;
            });
        },

        getGuidanceDataInd: function(id){
            return $http.get("urlSite/_api/web/lists/getByTitle('MKP_Guidance-List')/items?$filter=Title eq'" + id + "'", { 
                headers: { "Accept": "application/json;odata=verbose" }
            })
            .then(function(response) {
                return response.data;
            });
        }
    }
})