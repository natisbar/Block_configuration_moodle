const ID_DIV_MESSAGE = "message";

class Message {
    _message;
    _messageType;

    constructor(){
    }

    setMessage(message, messageType){
        this._message = message;
        this._messageType = messageType;
    }

    setMessageAndBuild(message, messageType){
        this._message = message;
        this._messageType = messageType;
        this.buildMessage();
    }

    buildMessage(){
        let messageToBuild = `<div class="contenedor cont${this._messageType}">${this._message}</div>`
        document.getElementById(ID_DIV_MESSAGE).innerHTML = messageToBuild;
    }

    changeMessageVisibility(){

    }
    

}