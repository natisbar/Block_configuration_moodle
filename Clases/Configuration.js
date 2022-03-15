const SHOW_IN_BLOCK = 'block';
const SHOW_IN_FLEX = 'flex';
const HIDDEN =  'none'; 
const ID_DESCRIPTION_RESOURCE = "id_showdescription";
const ID_UNLOCK_COMPLETION_RESOURCE = "id_unlockcompletion";
const ID_UNLOCK_COMPLETION_COURSE = "id_settingsunlock";
const ID_EXPOSED_DATA = "dataMsnDinamic";
const ID_SHOW_CONFIGURATION_ITEMS = "showConfigurationItems";
const MESSAGE_RESOURCE_NO_VALID = "El recurso actual no es abarcado en este bloque. Incorporelo o comuniquese con su administrador";
const MESSAGE_INPUT_EMPTY = "Ninguna de las entradas puede estar vacia. Ingrese los valores necesarios";
const ID_ERROR_GRADEPASS = "id_error_gradepass";
const ID_ERROR_COMPLETION = "fgroup_id_error_completionpassgroup";
const MESSAGE_ERROR_COMPLETION = "Este cuestionario no tiene configurada una calificación aprobatoria. Por favor definala";
const SITUATION = ["success", "warning", "danger"];

class Configuration{
    contador = 0;
    dataConfiguration;
    identification = new Identification();
    h5pResource;
    folderResource;
    quizResource;
    allObjectResource;
    blockElementsId;
    message = new Message();
    
    constructor(dataConfiguration){
        this.dataConfiguration = dataConfiguration;
        this.blockElementsId = this.dataConfiguration.blockElementsId.main;
        this.h5pResource = new Resource(this.dataConfiguration.h5p, this.blockElementsId);
        this.folderResource = new Resource(this.dataConfiguration.folder, this.blockElementsId);
        this.quizResource = new Resource(this.dataConfiguration.quiz, this.blockElementsId);
        this.allObjectResource = [this.h5pResource, this.folderResource, this.quizResource];
        this.resourceElementsHidden(contador);
    }

    resourceElementsHidden(contador) {
        let resourceName = this.identification.resourceIdentification();
        if(this.validateResource(resourceName)){
            contador++;
            this.elementsBlockVisibility(resourceName);
            let state = HIDDEN;
            let stateOther = HIDDEN;
            if(resourceName != 'completion'){
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
            
            this.allObjectResource.forEach(objeto => {
                if (objeto.nameIcon == resourceName){
                    objeto.visibilityElements(state);
                }
            });
        }
        else{
            this.message.setMessageAndBuild(MESSAGE_RESOURCE_NO_VALID, SITUATION[2]);
        }
        return contador;
        
    }

    elementsBlockVisibility(resourceName){
        if(resourceName != null && resourceName != "completion"){
            document.getElementById(this.blockElementsId.select).style.display = SHOW_IN_BLOCK;
            this.allObjectResource.forEach(objeto => {
                if (objeto.nameIcon == resourceName){
                    this.configuration.select(this.blockElementsId.select, resourceName);
                    if(objeto.elementDependentId.length>0){
                        objeto.elementDependentId.forEach(element => {
                            let value = $("#"+element.name).val();
                            $("#"+element.dependent.idElement).show();
                            $("#"+element.dependent.idElement+"Input").val(value);
                        });
                    }
                }
            });

            if (this.identification.unlockCompletionExist(ID_UNLOCK_COMPLETION_RESOURCE)) {
                document.getElementById(this.blockElementsId.buttonResourceUnlock).style.display = SHOW_IN_BLOCK;
            }
            else document.getElementById(this.blockElementsId.buttonResourceConfig).style.display = SHOW_IN_FLEX;

            if (!this.identification.rolIdentification(ID_EXPOSED_DATA)){
                var showItems = document.getElementById(ID_SHOW_CONFIGURATION_ITEMS);
                showItems.style.display = SHOW_IN_BLOCK;
            }

            if (document.getElementById(ID_ERROR_GRADEPASS) && document.getElementById(ID_ERROR_GRADEPASS).innerText.indexOf("\n")<0){
                this.message.setMessageAndBuild(document.getElementById(ID_ERROR_GRADEPASS).innerText, SITUATION[2]);
            }

            if (document.getElementById(ID_ERROR_COMPLETION) && document.getElementById(ID_ERROR_COMPLETION).innerText.indexOf("\n")<0){
                this.message.setMessageAndBuild(MESSAGE_ERROR_COMPLETION, SITUATION[2]);
            }

        }

        // Se valida si se está en Finalización del curso
        else if (resourceName == "completion"){
            setConfig.select(this.blockElementsId.select,"5");
            $("#scoreEndingCompletion").show();

            if (unlockCompletionExist(ID_UNLOCK_COMPLETION_COURSE)) {
                document.getElementById(this.blockElementsId.buttonResourceUnlock).style.display = SHOW_IN_BLOCK;
            }
            else document.getElementById(this.blockElementsId.buttonResourceConfig).style.display = SHOW_IN_FLEX;
        }
        else{
            document.getElementById(this.blockElementsId.select).style.display = HIDDEN;
            document.getElementById(this.blockElementsId.buttonResourceConfig).style.display = HIDDEN;
        }
        return resourceName;
    }

    //Se valida que se esté en un recurso válido
    validateResource(resourceName){
        let validResource = false;
        this.allObjectResource.forEach(objeto => {
            if (objeto.nameIcon == resourceName){
                validResource = true;
            }
        });
        return validResource;
    }

    validateInputDependent(resource){
        let inputEmpty = false;
        let count = 0;
        if(resource.elementDependentId.length>0){
            resource.elementDependentId.forEach(element => {  
                if ($("#"+element.dependent.idElement+"Input").val() != "on" && $("#"+element.dependent.idElement+"Input").val().length > 0){
                    count++;
                }
            });
            if (count == resource.elementDependentId.length) {
                inputEmpty = true;
            }
        }
        return inputEmpty;
    }

    runSetup(){
        this.allObjectResource.forEach(objeto => {
            if (objeto.nameIcon == this.identification.resourceIdentification()){
                let elementDependent;
                this.configuration.removeRestrictions();
                if(this.validateInputDependent(objeto)){
                    Object.values(objeto.element_configuration).forEach(element => {
                        if (element.dependent) {
                            elementDependent = true;
                            this.checkElementType(element, elementDependent);
                        }
                        else {
                            elementDependent = false;
                            this.checkElementType(element, elementDependent);
                        }
                    });
                    this.clickButton("id_submitbutton")
                }
                else{
                    this.message.setMessageAndBuild(MESSAGE_INPUT_EMPTY, SITUATION[2]);
                }
            }
        });

        
    }

    checkElementType(element, existDependent){
        switch(element.elementType){
            case "checkbox":
                this.configuration.checkbox(element.name, (existDependent) ? this.checkElementDependentType(element) : element.value);
                break
            case "input":
                this.configuration.input(element.name, (existDependent) ? this.checkElementDependentType(element) : element.value);
                break
            case "select":
                this.configuration.select(element.name, (existDependent) ? this.checkElementDependentType(element) : element.value);
                break
        }
    }

    checkElementDependentType(element){
        switch(element.dependent.elementType){
            case "checkbox":
                return document.getElementById(element.dependent.idElement+"Input").checked
            case "input":
                return $("#"+element.dependent.idElement+"Input").val();
        }
    }

    clickButton(id){
        document.getElementById(id).click();
    }

    configuration = {
        checkbox: function(element, state, focus = null) {
            let fieldCheck = document.getElementById(element);
            fieldCheck.disabled = false;
            if (focus) {
                fieldCheck.focus();
            }
            fieldCheck.checked = state;
            if (focus) {
                fieldCheck.blur();
            }
        },
        input: function(element, assignment) {
            let assignmentField = document.getElementById(element);
            assignmentField.disabled = false;
            assignmentField.value = assignment;
        },
        select: function(element, assignment) {
            let assignmentField = document.getElementById(element);
            if (assignmentField) {
                assignmentField.disabled = false;
                assignmentField.value = assignment;
            } else {
                console.log('--- No se pudo encontrar el elemento ( ' + element + ' )');
            }
        },
        removeRestrictions: function() {
            let json_restriction = document.getElementById("id_availabilityconditionsjson");
            json_restriction.value = '{"op":"&","c":[],"showc":[]}';
        }
    }


}