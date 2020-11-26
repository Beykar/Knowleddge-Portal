/* Directive to diaply the current user's first name
=========================================================
==================================================================================================*/ 

eyMercuryKnowledgeApp.directive('userName', [function(){
    return{
        restrict: 'A',
        link: function(scope, elem){ 
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/CurrentUser",
                    method: "GET",
                    cache: false,
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    success: function (response) {

                    //console.log('response.d ', response.d);
                    var currentUser = {
                        Title           : response.d.Title,
                        First_Name      : response.d.First_Name,
                        Email           : response.d.Email,
                        Id              : response.d.Id
                    }
                    
                    //console.log('currentUser in directive:: ', currentUser.Title);
                    //console.log('$(userDiv).val :  ', $('#userDiv1').html() );
                    $('#userDiv1').text(currentUser.Title );
                    //console.log('$(userDiv).val  :  ', $('#userDiv1').html());
                
                    
                    },
                        error: function (data) {
                            //console.log('Error: ', data);
                    }
                })                       
           }
		}
}])
