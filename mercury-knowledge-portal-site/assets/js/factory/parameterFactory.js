/* Parameters Factory
===========================================================================================
===========================================================================================*/
eyMercuryKnowledgeApp.factory('sharedParameters', function() {
    var dataObj= {}
  
    return {
      setELS            : setELS,
      setBusUnit        : setBusUnit,
      setServLine       : setServLine,
      setDocContentNum  : setDocContentNum,
      setFactoryName    : setFactoryName,
      setFactoryData    : setFactoryData,
      setUserData       : setUserData,
      setSearchTerm     : setSearchTerm,
      setTitle          : setTitle,
      setELSFilterName  : setELSFilterName,
      getDataObj        : getDataObj 
    };

  
    function setELS(els) {
      dataObj.els = els
    }
    function setBusUnit(busUn) {
      dataObj.busUn = busUn
    }
  
    function setServLine(servLine) {
      dataObj.servLine = servLine
    }

    function setFactoryName(factoryName){
      dataObj.factoryName = factoryName
    }
 
    function setFactoryData(factoryData){
      dataObj.factoryData = factoryData
    }

    function setDocContentNum(contentNum){
      dataObj.contentNum = contentNum
    }

    function setUserData(userData){
      dataObj.userData = userData
    }

    function setSearchTerm(searchTerm){
      dataObj.searchTerm = searchTerm
    }
    
    function setTitle(title){
      dataObj.title = title
    }

    function setELSFilterName(elsSafeFilterName){
      dataObj.elsSafeFilterName = elsSafeFilterName
    }

    function getDataObj() {
      return dataObj;
    }


  });

  

