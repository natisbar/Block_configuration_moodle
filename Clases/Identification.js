const RESOURCE_IN_EDITION =  "modedit.php";
const COMPLETION_COURSE =  "course/completion.php";
const ID_ROL_TEACHER = "3";
const ID_ROL_TEACHER_NOT_EDITION = "4";


class Identification {
    currentUrl;
    nameResource;

    constructor(){
    }

    rolTeacherIdentification(id){
        let isTeacher = false;
        let exposedData = document.getElementById(id).innerHTML;
        let exposedDataInObj = JSON.parse(exposedData);
        var rols = exposedDataInObj.roles.split("-");
        rols.forEach(element => {
            if (parseInt(element) == ID_ROL_TEACHER || parseInt(element) == ID_ROL_TEACHER_NOT_EDITION){
                isTeacher = true;
            }            
        });
        return isTeacher;
    }

    resourceIdentification(){
        if(this.currentUrlIsValid(RESOURCE_IN_EDITION)){
            let a = document.getElementById("region-main");
            let b = a.childNodes[3].childNodes[2].childNodes[0].src;
            let c = b.slice(b.indexOf("image.php"), b.length).split("/");
            this.nameResource = c[2];
        }
        else if (this.currentUrlIsValid(COMPLETION_COURSE)>0){
            this.nameResource = "completion";
        }
        else this.nameResource = null;

        return this.nameResource;
    }

    currentUrlIsValid(urlToValidate){
        this.currentUrl = window.location.href;
        return this.currentUrl.indexOf(urlToValidate)>0;
    }

    unlockCompletionExist(id){
        return document.getElementById(id);
    }


    
}