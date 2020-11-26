/* Policy data Factory
===========================================================================================
===========================================================================================*/
eyMercuryKnowledgeApp.factory('policyData', function($http){
    return {
        getPolicyData: function(){
            return $http.get("urlSite/_api/web/lists/getByTitle('MKP_Policy-list')/items?$top=5000", { 
                headers: { "Accept": "application/json;odata=verbose" }
            })
            .then(function(response) {
                return response.data;
            });
        },
    

        getPolicyDataInd: function(id){
            return $http.get("urlSite/_api/web/lists/getByTitle('MKP_Policy-list')/items?$filter=Title eq'" + id + "'", { 
                headers: { "Accept": "application/json;odata=verbose" }
            })
            .then(function(response) {
                return response.data;
            });
        }
    }
})