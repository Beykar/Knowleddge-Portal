/* faqs Factory
========================================================================================
========================================================================================*/

eyMercuryKnowledgeApp.factory('faqsData', function($http){
    return {
        getFAQsData: function(){
            return $http.get("urlSite/_api/web/lists/getByTitle('Lst_faq')/items?$select=Title,Answer,ID,cat", { 
                headers: { "Accept": "application/json;odata=verbose" }
            })
            .then(function(response) {
                return response.data;
            });
        }
    }
})