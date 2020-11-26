/* Guidance data Factory
===========================================================================================
===========================================================================================*/
eyMercuryKnowledgeApp.factory('resourceData', function($http){
    return {
        getResourceData: function(){
            return $http.get("urlSite/_api/web/lists/getByTitle('MKP-Training')/items?$top=5000", { 
                headers: { "Accept": "application/json;odata=verbose" }
            })
            .then(function(response) {
                return response.data;
            });
        }
    }
})