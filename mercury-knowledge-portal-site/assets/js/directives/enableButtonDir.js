/* Nav Update Selection Button Directive
====================================================================================================
==================================================================================================*/ 

eyMercuryKnowledgeApp.directive('enableButton', [function(){
    return{
        restrict: 'A',
        link: function(scope, elem){
                   var 
                    $businessUnitBtn    = $('#mkp__select-business-unit'),
                    $serviceLineBtn    = $('#mkp__select-service-line'),
                    $updateSelectionBtn      = $('#mkp__button-update-selection');
                    $updateSelectionBtn.prop("disabled", false);
                    // console.log(' $businessUnitBtn.text(),$serviceLineBtn.text() ::: ', $('#mkp__select-business-unit option:selected').val(),'   ', $('#mkp__select-service-line option:selected').val())

                    if ($businessUnitBtn.val() !== "" && $serviceLineBtn.val() !==""){
                        $updateSelectionBtn.prop("disabled", false);
                    } else if ($businessUnitBtn.val() === "" || $serviceLineBtn.val() ==="") {
                        $updateSelectionBtn.prop("disabled", true);
                    }               

                $('select').on('change',function(){
                    // console.log(' $businessUnitBtn.val(),$serviceLineBtn.val() in foo:::     ',$businessUnitBtn.val(),'   ', $serviceLineBtn.val());
                    if ($businessUnitBtn.val() !== "" && $serviceLineBtn.val() !==""){
                            $updateSelectionBtn.prop("disabled", false);
                        } else if ($businessUnitBtn.val() === "" || $serviceLineBtn.val() ==="") {
                            $updateSelectionBtn.prop("disabled", true);
                        }           
                }) 
                
                $updateSelectionBtn.on('click', function(e){
                    e.preventDefault();
                })
            }        
        }
}])
