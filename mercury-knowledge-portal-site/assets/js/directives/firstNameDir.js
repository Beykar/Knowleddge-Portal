/* ================================
First name directive in My learning 
===================================*/

eyMercuryKnowledgeApp.directive("firstName", [
    function() {
        return {
            restrict: "A",
            link: function(scope, elem) { 
            
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/CurrentUser",
                    method: "GET",
                    cache: false,
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    success: function (response) {
                    $rootScope.currentUser = {
                        fullname:  response.d.Title,
                        ID      :  response.d.Id,
                        email   :  response.d.Email
                    }    
                  
                        $('#first-name-container').val($rootScope.currentUser.fullname);                        
                        console.log('$(\'#first-name-container\'):: ', $('#first-name-container'));
    
                    
                    },
                        error: function (data) {
                            console.log('Error: ', data);
                    }
                })
            }
        };
    }
]);
