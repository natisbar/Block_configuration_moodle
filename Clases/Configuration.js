const SHOW_IN_BLOCK = 'block';
const SHOW_IN_FLEX = 'flex';
const HIDDEN =  'none'; 
const TEXT_BUTTON_SHOW = "Mostrar";
const TEXT_BUTTON_HIDE = "Ocultar";
const ID_UNLOCK_COMPLETION_RESOURCE = "id_unlockcompletion";
const ID_UNLOCK_COMPLETION_COURSE = "id_settingsunlock";
const ID_EXPOSED_DATA = "dataMsnDinamic";
const ID_SHOW_CONFIGURATION_ITEMS = "showConfigurationItems";


class Configuration{
    contador = 0;
    dataConfiguration;
    identification = new Identification();
    validation = new Validation();
    unlockCompletionResourceExist = this.identification.unlockCompletionExist(ID_UNLOCK_COMPLETION_RESOURCE);
    unlockCompletionCourseExist = this.identification.unlockCompletionExist(ID_UNLOCK_COMPLETION_COURSE);
    isTeacher = this.identification.rolTeacherIdentification(ID_EXPOSED_DATA);
    visibility;
    resourceName;
    h5pResource;
    folderResource;
    quizResource;
    allObjectResource;
    blockElementsId;
    
    constructor(dataConfiguration){
        this.resourceName = this.identification.resourceIdentification();
        this.dataConfiguration = dataConfiguration;
        this.blockElementsId = this.dataConfiguration.blockElementsId.main;
        this.visibility = new Visibility(this.blockElementsId, this.unlockCompletionResourceExist, this.unlockCompletionCourseExist, this.isTeacher);
        this.h5pResource = new Resource(this.dataConfiguration.h5p, this.blockElementsId, this.resourceName);
        this.folderResource = new Resource(this.dataConfiguration.folder, this.blockElementsId, this.resourceName);
        this.quizResource = new Resource(this.dataConfiguration.quiz, this.blockElementsId, this.resourceName);
        this.pageResource = new Resource(this.dataConfiguration.page, this.blockElementsId, this.resourceName);
        
        this.allObjectResource = [this.h5pResource, this.folderResource, this.quizResource, this.pageResource];
        this.takeMyResourseCurrent();
        this.runChangeState();
        this.runVisibilityBlockElements();
    }

    takeMyResourseCurrent(){
        this.allObjectResource.forEach(objeto => {
            if (objeto.nameIcon == this.resourceName){
                this.resourceCurrent = objeto;
            }
        });
        this.validation.validateResource(this.resourceCurrent);
    }

    runVisibilityBlockElements(){
        this.visibility.makeBlockElementsVisible(this.resourceCurrent);
        this.validation.validateMoodleErrorReport();
    }

    runChangeState(){
        let countValueCurrent = this.contador;
        this.contador = this.visibility.changeStateOfResourceElements(this.contador, this.resourceCurrent);
        if(this.contador % 2 == 0){
            document.getElementById(ID_SHOW_CONFIGURATION_ITEMS).innerText = TEXT_BUTTON_HIDE;
        }
        else{
            document.getElementById(ID_SHOW_CONFIGURATION_ITEMS).innerText = TEXT_BUTTON_SHOW;
        }
        if(countValueCurrent != this.contador){
            this.configuration.select(this.blockElementsId.select, this.resourceCurrent.nameIcon);
        }
    }

    runSetup(){
        let elementDependent;
        this.configuration.removeRestrictions();
        this.validation.validateInputDependent(this.resourceCurrent);
        Object.values(this.resourceCurrent.element_configuration).forEach(element => {
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
            case "select":
                return $("#"+element.dependent.idElement+"Select").val();
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