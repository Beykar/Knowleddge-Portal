
/* Community User Data Factory
===========================================================================================
===========================================================================================*/
eyMercuryKnowledgeApp.factory('communityUserData', function($http, $rootScope, $filter){
    return {
        getCommunityUserData: function(){

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
                //console.log('rootScope user object in factory:: ', $rootScope.currentUser);
                },
                    error: function (data) {
                        console.log('Error: ', data);
                }
            })
                    
            return $http.get("urlSite/_api/web/lists/getByTitle('Lst_community_1410')/items?$orderby=Id desc&$top=1", { 
                headers: { "Accept": "application/json;odata=verbose" }
            })
            .then(function(response) {
                var amount = parseInt(response.data.d.results[0].ID),
                    iteration = Math.ceil(amount/5000),
                    base = Math.ceil(amount/iteration);

                    for (var i = 0; i < iteration; i++){
                        $.ajax({
                            url:"urlSite/_api/web/lists/getbytitle('Lst_community_1410')/Items?$filter=ID gt "+(i*base)+" &ID lte "+((i+1)*base)+"&$top=5000",
                            method: "GET",
                            cache: false,
                            headers: {
                                "accept": "application/json;odata=verbose",
                                "content-Type": "application/json;odata=verbose"
                            },
                            success: function (response) {                              
                                    var responseData = $filter('filter')(response.d.results, {Email_Address: $rootScope.currentUser.email}, true)[0];
                                    //console.log('responseData222 ', responseData);
                                    if(responseData != undefined){
                                        $rootScope.currentUser.businessUnit = responseData.FSOUKIEYG;
                                        $rootScope.currentUser.serviceLine = responseData.Service_Line;
                                        $rootScope.currentUser.First_Name = responseData.First_Name;
                                        $rootScope.currentUser.Last_Name = responseData.Title;
                                        $rootScope.currentUser.Comm = responseData.Comm;
                                        $rootScope.currentUser.Community = responseData.Community;
                                        $rootScope.currentUser.SL1 = responseData.OData__x0053_SL1;
                                        $rootScope.currentUser.SL2 = responseData.OData__x0053_SL2;

                                        if ($rootScope.currentUser.serviceLine == 'CBS'){
                                            //console.log('its a cbs $rootScope.currentUser.serviceLine', $rootScope.currentUser.serviceLine);

                                            $rootScope.currentUser.serviceLine = 'All';
                                            //console.log('after reset', $rootScope.currentUser.serviceLine);
                                        }
                                        if ($rootScope.currentUser.businessUnit == 'EYG'){
                                            //console.log('its a cbs $rootScope.currentUser.businessUnit', $rootScope.currentUser.businessUnit);

                                            $rootScope.currentUser.businessUnit = 'All';
                                            //console.log('after reset', $rootScope.currentUser.businessUnit);
                                        }
                                        return responseData;

                                    }
                                    // } else {
                                    //     $rootScope.currentUser.businessUnit = 'All';
                                    //     $rootScope.currentUser.serviceLine = 'All';
                                    //     $rootScope.currentUser.Comm = 'C8';
                                    //     $rootScope.currentUser.Community ='Default';
                                    //     $rootScope.currentUser.SL1 = 'SL1';
                                    //     $rootScope.currentUser.SL2 = 'SL2';

                                    
                                    // }                             
                            }
                        });
                    }
               
                })
            },        
        getBusinessUnitData: function(){
            return $http.get("urlSite/_api/web/lists/getByTitle('Lst_community_1410')/items?$select=FSOUKIEYG", { 
                headers: { "Accept": "application/json;odata=verbose" }
            })
            .then(function(response) {
                return response.data;
            });
        },

        getServiceLineData: function(){
            return $http.get("urlSite/_api/web/lists/getByTitle('Lst_community_1410')/items?$select=Service_Line", { 
                headers: { "Accept": "application/json;odata=verbose" }
            })
            .then(function(response) {
                return response.data;
            });
        }
    }
})