const ID_DESCRIPTION_RESOURCE = "id_showdescription";

class Visibility{
    blockElementsId;
    unlockCompletionResourceExist;
    unlockCompletionCourseExist;
    isTeacher;
    
    constructor(blockElementsId, unlockCompletionResourceExist, unlockCompletionCourseExist, isTeacher){
        this.blockElementsId = blockElementsId;
        this.unlockCompletionResourceExist = unlockCompletionResourceExist;
        this.unlockCompletionCourseExist = unlockCompletionCourseExist;
        this.isTeacher = isTeacher;
    }

    visibilityElements(state, resourceElementToHide){
        Object.values(resourceElementToHide).forEach(element => {
            document.getElementById(element).style.display = state;
        });
    }

    changeStateOfResourceElements(contador, resourceCurrent) {
        if(resourceCurrent != null){
            contador++;
            let state = HIDDEN;
            let stateOther = HIDDEN;
            if(resourceCurrent.name != 'completion'){
                if(document.getElementById(ID_DESCRIPTION_RESOURCE).getAttribute("style") == null || 
                document.getElementById(ID_DESCRIPTION_RESOURCE).getAttribute("style") == "display: block;"){
                    state = HIDDEN;
                    stateOther = HIDDEN;
                }
                else {
                    state = SHOW_IN_BLOCK;
                    stateOther = SHOW_IN_FLEX;
                }
            }
            this.visibilityElements(state, resourceCurrent.element_to_hide);
        }
        return contador;
    }

    makeBlockElementsVisible(resourceCurrent){
        if(resourceCurrent.name != null && resourceCurrent.name != "completion"){
            document.getElementById(this.blockElementsId.select).style.display = SHOW_IN_BLOCK;
            if(resourceCurrent.elementDependentId.length>0){
                resourceCurrent.elementDependentId.forEach(element => {
                    let value = $("#"+element.name).val();
                    $("#"+element.dependent.idElement).show();
                    $("#"+element.dependent.idElement+"Input").val(value);
                    $("#"+element.dependent.idElement+"Select").val(value);
                });
            }

            if (this.unlockCompletionExist) {
                document.getElementById(this.blockElementsId.buttonResourceUnlock).style.display = SHOW_IN_BLOCK;
            }
            else document.getElementById(this.blockElementsId.buttonResourceConfig).style.display = SHOW_IN_FLEX;

            if (!this.isTeacher) {
                var showItems = document.getElementById(this.blockElementsId.showConfigurationItems);
                showItems.style.display = SHOW_IN_BLOCK;
            }

        }

        // Se valida si se está en Finalización del curso
        else if (resourceCurrent.name == "completion"){
            setConfig.select(this.blockElementsId.select,"5");
            $("#scoreEndingCompletion").show();

            if (this.unlockCompletionCourseExist) {
                document.getElementById(this.blockElementsId.buttonResourceUnlock).style.display = SHOW_IN_BLOCK;
            }
            else document.getElementById(this.blockElementsId.buttonResourceConfig).style.display = SHOW_IN_FLEX;
        }
        else{
            document.getElementById(this.blockElementsId.select).style.display = HIDDEN;
            document.getElementById(this.blockElementsId.buttonResourceConfig).style.display = HIDDEN;
        }
    }

    


}