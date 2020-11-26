/* Parameters Factory
===========================================================================================
===========================================================================================*/
eyMercuryKnowledgeApp.factory('keywordsService', function($http){
    return {	
        getAllKeywords : function(){
            var APIdata = {};
            var allKeywords = [];
            var allKeywordsHT = [];
            var allKeywordsPL = [];
            var allKeywordsGU = [];

            APIdata.getTiles = function(){
                return $http.get("urlSite/_api/web/lists/getByTitle('MKP_ELS-Tile-List')/items?$select=*&$top=5000", { 
                    headers: { "Accept": "application/json;odata=verbose" }
                })
                .then(function(response) {
                    return response.data;
                });
            }

            APIdata.getHowToData = function(factoryName){
                return $http.get("urlSite/_api/web/lists/getByTitle('" + factoryName + "')/items?$top=5000", { 
                    headers: { "Accept": "application/json;odata=verbose" }
                })
                .then(function(response) {
                    return response.data;
                });
                
            }

            APIdata.getPolicyData = function(){
                return $http.get("urlSite/_api/web/lists/getByTitle('MKP_Policy-list')/items?$top=5000", { 
                    headers: { "Accept": "application/json;odata=verbose" }
                })
                .then(function(response) {
                    return response.data;
                });
            }

            APIdata.getGuidanceData = function(){
                return $http.get("urlSite/_api/web/lists/getByTitle('MKP_Guidance-List')/items?$top=5000", { 
                    headers: { "Accept": "application/json;odata=verbose" }
                })
                .then(function(response) {
                    return response.data;
                });
            }

            APIdata.removeDuplicates = function(myArray){ 
                var newArray = [];
                
                for(var i=0; i< myArray.length; i++){
                    myArray[i] = myArray[i].trim();
                    
                    if(newArray.indexOf(myArray[i]) == -1){
                        newArray.push(myArray[i])
                    }
                }
                return newArray;
            }
            
            APIdata.isDuplicated = function(myArray1, object){ 
                if(myArray1 !== undefined ) {
                    for(var i=0; i< myArray1.length; i++){
                        if(myArray1[i].toLowerCase().trim() === object.toLowerCase().trim()){
                            return true;
                        }
                    }
                }
                
                return false;
            }

            
            APIdata.getTiles().then(
                function(data){
                    tiles = data.d.results;
                    //console.log('tiles:', tiles);
                    angular.forEach(tiles, function(value, key){
                        var factory = value['ELSFactoryName'];
                        
                        APIdata.getHowToData(factory).then(
                            function(data){
                                howToData = data.d.results;
                                    
                                angular.forEach(howToData, function(value, key){
                                    if(value['Keywords'] !== undefined && value['Keywords'] !== null ){
                                        var keywordsFiltered = value['Keywords'].slice(0, -1);
                                        var split = keywordsFiltered.split(';');
                                    
                                        if (Array.isArray(split) && split.length) {
                                            for (var i=0; i<split.length; i++){
                                                if(!APIdata.isDuplicated(allKeywords, split[i].trim())){
                                                    //console.log('no dup1');
                                                    allKeywords.push(split[i].trim());
                                                }
                                            }
                                        }
                                    }
                                });
                                    
                            }
                        );
                    });
                }
            );
                
           
            APIdata.getPolicyData().then(
                    function (data) {
                        policyData = data.d.results;
                    
                        angular.forEach(policyData, function(value, key){
                            if(value['Keywords'] !== undefined && value['Keywords'] !== null ){
                                var keywordsFiltered = value['Keywords'].slice(0, -1);
                                var split = keywordsFiltered.split(';');
                                        
                                if (Array.isArray(split) && split.length) {
                                    for (var i=0; i<split.length; i++){
                                        if(!APIdata.isDuplicated(allKeywords, split[i].trim())){
                                            //console.log('no dup2');
                                            allKeywords.push(split[i].trim());
                                        }
                                    }
                                }
                            }
                        });
                    }
            );
                        
            
            APIdata.getGuidanceData().then(
                    function (data) {
                        guidanceData = data.d.results;
                    
                        angular.forEach(guidanceData, function(value, key){
                            
                            if(value['Keywords'] !== undefined && value['Keywords'] !== null ){
                                var keywordsFiltered = value['Keywords'].slice(0, -1);
                                var split = keywordsFiltered.split(';');
                                        
                                if (Array.isArray(split) && split.length) {
                                    for (var i=0; i<split.length; i++){
                                        if(!APIdata.isDuplicated(allKeywords, split[i].trim())){
                                            //console.log('no dup3');
                                            allKeywords.push(split[i].trim());
                                        }
                                    }
                                }
                            }
                            
                        });
                    }
            );
            
            
            return allKeywords;
        }
    }
    
}
);