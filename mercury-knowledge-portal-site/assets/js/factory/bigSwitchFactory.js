/* big switch Factory
========================================================================================
========================================================================================*/

eyMercuryKnowledgeApp.factory('bigSwitch', function($http){
    return {
        getBigSwitchData: function(){
            return $http.get("urlSite/_api/web/lists/getByTitle('Lst_BigSwitch')/items?$select=*", { 
                headers: { "Accept": "application/json;odata=verbose" }
            })
            .then(function(response) {
                return response.data;
            });
        }
    }
})