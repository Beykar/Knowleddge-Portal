/* Support Controller
====================================================================================================
==================================================================================================*/ 

eyMercuryKnowledgeApp.controller('SupportCtrl', function($scope, $http, $window, $ngConfirm) {
    
    'use strict';
    window.scrollTo(0,0);
    $scope.$sce = $sce;
  
    

  	$scope.submitForm = function(user) {
    
      var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Lst_contactForms')/items";
      $.ajax({
          url: url,
          type: "POST",
          contentType: "application/json;odata=verbose",
         //data: JSON.stringify(item),
         data: JSON.stringify({  
            '__metadata': {  
                'type': 'SP.Data.Lst_x005f_contactFormsListItem'   
            },  
            'Title': user.fullname,  
            'email':user.email,  
            'comments': user.userQuery 
          }),
          headers: {
              "accept": "application/json;odata=verbose",
              "X-RequestDigest": $("#__REQUESTDIGEST").val(),
              "content-Type": "application/json;odata=verbose",
                      "X-HTTP-Method": "POST"
          },
          success: function(data) {
            //console.log("Item created in host web");
                    $ngConfirm({
            title: ' ',       
            container:'#eymain',
            columnClass:'col-md-8 col-xs-10 col-xs-offset-1',
            scope:$scope,
            type:'green',                      
            content: '<h4> Someone from the team will respond within 48 hours.</h4>',
            animation: 'scale',
            closeAnimation: 'zoom',

          onDestroy: function () {
            //$location.path('https://share.ey.net/sites/Mercury_UKandIreland/SitePages/Index.aspx#!/home');
            $window.location.href='urlSite/SitePages/Index.aspx#!/home';
          }

        })
               
        },
        error: function(data) {
            //console.log(data.responseJSON.error);
            //alert(data.responseJSON.error.message.value);
        }
    });
}







 
});



