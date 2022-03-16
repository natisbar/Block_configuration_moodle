// Nombre y mensajes de errores
const MESSAGE_ERROR_INPUT_EMPTY = "Ninguna de las entradas puede estar vacia. Ingrese los valores necesarios";
const NAME_ERROR_INPUT_EMPTY = "Entrada vacia"

const MESSAGE_ERROR_COMPLETION = "Este cuestionario no tiene configurada una calificación aprobatoria. Por favor definala";
const NAME_ERROR_DATO_INVALIDO = "Dato invalido";

const MESSAGE_ERROR_RESOURCE_NO_VALID = "El recurso actual no es abarcado en este bloque. Incorporelo o comuniquese con su administrador";
const NAME_ERROR_RESOURCE_NO_VALID = "Recurso invalido";

// id errores expuestos por Moodle
const ID_ERROR_GRADEPASS = "id_error_gradepass";
const ID_ERROR_COMPLETION = "fgroup_id_error_completionpassgroup";

const SITUATION = ["success", "warning", "danger"];

class Validation {
    message = new Message();

    constructor(){
    }

    validateInputDependent(resource){
        let count = 0;
        let countInput = 0;
        if(resource.elementDependentId.length>0){
            resource.elementDependentId.forEach(element => {
                if(element.elementType == "input"){
                    countInput++;
                    if ($("#"+element.dependent.idElement+"Input").val() != "on" && $("#"+element.dependent.idElement+"Input").val().length > 0){
                        count++;
                    }
                }   
            });
            if (count != resource.elementDependentId.length-(resource.elementDependentId.length-countInput)) {
                this.message.setMessageAndBuild(MESSAGE_ERROR_INPUT_EMPTY, SITUATION[2]);
                throw new CustomError(MESSAGE_ERROR_INPUT_EMPTY, NAME_ERROR_INPUT_EMPTY);
            }
        }
    }

    validateMoodleErrorReport(){
        if (document.getElementById(ID_ERROR_GRADEPASS) && document.getElementById(ID_ERROR_GRADEPASS).innerText.indexOf("a")>0){
            this.message.setMessageAndBuild(document.getElementById(ID_ERROR_GRADEPASS).innerText, SITUATION[2]);
            try {
                throw new CustomError(document.getElementById(ID_ERROR_GRADEPASS).innerText, NAME_ERROR_INPUT_EMPTY);
            } catch(e) {
                console.error(e.name + ": " + e.message);
            }
        }

        if (document.getElementById(ID_ERROR_COMPLETION) && document.getElementById(ID_ERROR_COMPLETION).innerText.indexOf("a")>0){;
            this.message.setMessageAndBuild(MESSAGE_ERROR_COMPLETION, SITUATION[2]);
            try {
                throw new CustomError(MESSAGE_ERROR_COMPLETION, NAME_ERROR_DATO_INVALIDO);
            } catch(e) {
                console.error(e.name + ": " + e.message);
            }
        }
    }

    validateResource(resource){
        if(!resource){
            this.message.setMessageAndBuild(MESSAGE_ERROR_RESOURCE_NO_VALID, SITUATION[2]);
            throw new CustomError(MESSAGE_ERROR_RESOURCE_NO_VALID, NAME_ERROR_RESOURCE_NO_VALID);
        }
    }



}