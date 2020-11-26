/* change champions Factory
========================================================================================
========================================================================================*/

eyMercuryKnowledgeApp.factory('changeChampData', function($http){
    return {
        getChangecChampData: function(){
            return $http.get("urlSite/_api/web/lists/getByTitle('Lst_ChangeChamp')/items?$select=*", { 
                headers: { "Accept": "application/json;odata=verbose" }
            })
            .then(function(response) {
                return response.data;
            });
        }
    }
})