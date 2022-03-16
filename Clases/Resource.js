
class Resource {
    nameIcon;
    name;
    _element_to_hide;
    _element_configuration;
    _blockElementsId;
    _elementDependentId = [];

    constructor(elementsResource, blockElementsId, resourceCurrent){
        this.nameIcon = elementsResource.nameIcon;
        this.name = elementsResource.name;
        this._element_to_hide = elementsResource.elementToHide;
        this._element_configuration = elementsResource.elementConfiguration;
        this._blockElementsId = blockElementsId;
        this.createSelectResource();
        if(this.nameIcon == resourceCurrent){
            this.searchElementDependent();
        };
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
                this.buildElementDependent(element);
            }
        });
    }

    buildElementDependent(element){
        let inputToBuild = "";
        if(element.dependent.elementType == "input" || element.dependent.elementType == "checkbox"){
            let idInput = element.dependent.idElement + "Input";
            let style = "";
            if(element.elementType == "input"){
                style="width: 40%; margin: 5px 10px 5px 0; padding: 5px; vertical-align: middle;";
            }
            inputToBuild = `<div class="centerDiv" id="${element.dependent.idElement}" style="display: none;">
                                    <label for="${idInput}" style="margin: 5px 10px 5px 0;">${element.dependent.nameLabel}</label>
                                    <input type="${element.dependent.elementType}" id="${idInput}" style="${style}">
                                </div>`
        }
        else if(element.dependent.elementType == "select"){
            let idSelect = element.dependent.idElement + "Select";
            let optionsElement = document.getElementById(element.name).options;
            let allOptions = "";
            let style="width: 40%; margin: 5px 10px 5px 0; padding: 5px; vertical-align: middle;";
            for(let i = 0; i < optionsElement.length; i++){
                allOptions = allOptions + `<option value="${optionsElement[i].value}">${optionsElement[i].text}</option>`;
            }
            inputToBuild = `<div class="centerDiv" id="${element.dependent.idElement}" style="display: none;">
                                <label for="${idSelect}" style="margin: 5px 10px 5px 0;">${element.dependent.nameLabel}</label>
                                <select style="${style}" id="${idSelect}">${allOptions}</select>
                            </div>`;
        }

        document.getElementById(this._blockElementsId.blockSpecificElementsId).innerHTML = document.getElementById(this._blockElementsId.blockSpecificElementsId).innerHTML + inputToBuild;

    }


    
}   