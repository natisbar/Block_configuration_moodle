# Block_configuration_moodle

Este desarrollo, tiene como finalidad establecer una configuración previa para cada recurso a través de un fichero JSON. De modo que los docentes o personas que no están muy familiarizadas con el tema de configuración de los recursos, puedan configurarlos a un clic.

El bloque es capaz de identificar en que tipo de recurso está, y construir los elementos necesarios para la configuración, los cuales llamo elementos dependientes:

![alt text](https://github.com/natisbar/Block_configuration_moodle/blob/master/Image/block_configuration.png?raw=true)

El JSON está estructurado como un tipo de dato objeto, de la siguiente manera:
1. Primero se define el nombre del recurso.
2. Dentro de este es necesario definir 4 valores: nameIcon, name, elementConfiguration y elementToHide. Donde:
 - nameIcon, es el nombre del icono del recurso en moodle.
 - name es el nombre que aparecerá en el select de "identification resource"
 - elementConfiguration son todos esos ID de los elementos de configuración con los que cuenta el recurso y que ustede desea manipular. Aquí es necesario definir el name, el tipo de elemento (select, checkbox, input) y el valor que desea que tenga.
 - elementToHide son todos los ID que agrupan los elementos de configuración, y que ud desea ocultar para el rol docente.

"h5p": {
        "nameIcon": "hvp",
        "name": "Recurso H5P",
        "elementConfiguration": {
            "id_showdescription":{
                "name": "id_showdescription",
                "elementType": "checkbox",
                "value": false
            },
            "id_completionusegrade":{
                "name": "id_completionusegrade",
                "elementType": "checkbox",
                "dependent": {
                    "elementType": "checkbox",
                    "idElement": "thereIsLearningActivity",
                    "nameLabel": "Actividad de aprendizaje"
                }
            }
        },
        "elementToHide":{
            "id_showdescription": "id_showdescription",
            "id_displayoptions": "id_displayoptions",
        }
    },


