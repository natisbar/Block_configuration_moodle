
class Resource {
    nameIcon;
    name;
    _element_to_hide;
    _element_configuration;
    _blockElementsId;
    _elementDependentId = [];

    constructor(elementsResource, blockElementsId){
        this.nameIcon = elementsResource.nameIcon;
        this.name = elementsResource.name;
        this._element_to_hide = elementsResource.elementToHide;
        this._element_configuration = elementsResource.elementConfiguration;
        this._blockElementsId = blockElementsId;
        this.createSelectResource();
        this.searchElementDependent();
    }

    get element_configuration(){
        return this._element_configuration;
    }

    get element_to_hide(){
        return this._element_to_hide;
    }

    get elementDependentId(){
        return this._elementDependentId;
    }

    visibilityElements(state){
        Object.values(this._element_to_hide).forEach(element => {
            document.getElementById(element).style.display = state;
        });
    }

    createSelectResource(){
        let select = document.getElementById(this._blockElementsId.select);
        var option = document.createElement('option');
        option.value = this.nameIcon;
        option.innerHTML = this.name;
        select.appendChild(option);
    }

    searchElementDependent(){
        Object.values(this._element_configuration).forEach(element => {
            if (element.dependent) {
                this._elementDependentId.push(element);
                this.buildElementDependent(element.dependent);
            }
        });
    }

    buildElementDependent(element){
        let idInput = element.idElement + "Input";
        let style = "";
        if(element.elementType == "input"){
            style="width: 40%; margin: 5px 10px 5px 0; padding: 5px; vertical-align: middle;";
        }
        let inputToBuild = `<div class="centerDiv" id="${element.idElement}" style="display: none;">
                                <label for="${idInput}" style="margin: 5px 10px 5px 0;">${element.nameLabel}</label>
                                <input type="${element.elementType}" id="${idInput}" style= "${style}">
                            </div>`
        document.getElementById(this._blockElementsId.blockSpecificElementsId).innerHTML = document.getElementById(this._blockElementsId.blockSpecificElementsId).innerHTML + inputToBuild;
    }


    
}   