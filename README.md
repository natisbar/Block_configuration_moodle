# Block_configuration_moodle

### **Support this software [🤝Paypal](https://www.paypal.com/paypalme/natisbar)**

[ENGLISH]
The purpose of this development is to establish a previous configuration for each resource through a JSON file. So that teachers or people who are not very familiar with the configuration of resources, can configure them with one click.

The block can identify what type of resource it is on, and build the necessary elements for configuration, which I call dependent elements:

![alt text](https://github.com/natisbar/Block_configuration_moodle/blob/master/Image/block_configuration.png?raw=true)

The JSON is structured as an object data type, as follows:
1. First the name of the resource is defined.
2. Within this it is necessary to define 4 values: nameIcon, name, elementConfiguration and elementToHide. 
  - nameIcon, is the name of the resource icon in moodle.
  - name is the name that will appear in the select of "identification resource"
  - elementConfiguration are all the IDs of the configuration elements that the resource has and that you want to manipulate. Here you need to define the name, the element type (select, checkbox, input) and the value you want it to take. Optionally, you can replace value by dependent, in this way it indicates that this specific element depends on another, and it is necessary to indicate the values for elementType, idElement, nameLabel of it.
  - elementToHide are all the IDs that group the configuration elements, and that you want to hide for the teacher role.

```
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
```

Currently 4 types of activities or resources have been incorporated: H5P, Folder, Quiz, Page... but you could continue incorporating more, as long as you add the necessary information to the JSON, and define the object in the constructor of the Configuration class, and incorporate it into the array of instantiated resources.

###Incorporation process

1. Create an HTML block and embed the information from [Index.html](https://github.com/natisbar/Block_configuration_moodle/blob/master/index.html) into it. Remember to change the url of the styles, the scripts and the JSON file.
2. Configure the block. Make sure it is visible in all course spaces and not visible to students.
3. In course/modedit.php, under the line "echo $OUTPUT->header();" add the following code snippet, this will expose the user's role, making it accessible from the front
```
   $contador = 0;
   $context = get_context_instance(CONTEXT_COURSE,$COURSE->id);
   if ($roles = get_user_roles($context, $USER->id)) {
       foreach ($roles as $role) {
           if($contador == 0){
               $rolFinal= $role->roleid;
           }
           else{
               $rolFinal= $rolFinal."-".$role->roleid;
           }
           $contador = $contador + 1;

       }
   }
   echo ("<div id=\"dataMsnDinamic\" style=\"display:none\">{\"roles\":\"".$rolFinal."\"}</div>");
```
4. If you want activity or resource configuration elements to be hidden quickly, incorporate the following into moodle template styles.
```
body#page-mod-page-mod fieldset#id_activitycompletionheader, fieldset#id_competenciessection,
fieldset#id_modstandardelshdr,
fieldset#id_appearancehdr,
fieldset#id_displayoptions,
fieldset#id_modstandardgrade,
fieldset#id_availabilityconditionsheader,
fieldset#id_activitycompletionheader,
fieldset#id_display,
fieldset#id_options,
fieldset#id_options,
input#id_showdescription,
div#fitem_id_display,
input#id_showexpanded,
input#id_showdownloadfolder,
input#id_forcedownload
{
    display: none;
}
```


[SPANISH]

Este desarrollo, tiene como finalidad establecer una configuración previa para cada recurso a través de un fichero JSON. De modo que los docentes o personas que no están muy familiarizadas con el tema de configuración de los recursos, puedan configurarlos a un clic.

El bloque es capaz de identificar en que tipo de recurso está, y construir los elementos necesarios para la configuración, los cuales llamo elementos dependientes:

![alt text](https://github.com/natisbar/Block_configuration_moodle/blob/master/Image/block_configuration.png?raw=true)

El JSON está estructurado como un tipo de dato objeto, de la siguiente manera:
1. Primero se define el nombre del recurso.
2. Dentro de este es necesario definir 4 valores: nameIcon, name, elementConfiguration y elementToHide. Donde:
 - nameIcon, es el nombre del icono del recurso en moodle.
 - name es el nombre que aparecerá en el select de "identification resource"
 - elementConfiguration son todos esos ID de los elementos de configuración con los que cuenta el recurso y que usted desea manipular. Aquí es necesario definir el name, el tipo de elemento (select, checkbox, input) y el valor que desea que tome. A modo opcional, puede reemplazar value por dependent, de esta manera indica que ese elemento específico depende de otro, e indica los valores para elementType, idElement, nameLabel propios de el.
 - elementToHide son todos los ID que agrupan los elementos de configuración, y que ud desea ocultar para el rol docente.

Actualmente se han incorporado 4 tipos de actividades o recursos: H5P, Folder, Quiz, Page... pero ud podría seguir incorporando mas, siempre que adicione en el JSON la información necesaria, y defina el objeto en el constructor de la clase Configuration, y lo incorpore al arreglo de recursos instanciados.

###Proceso de incorporación.

1. Cree un bloque HTML e incorpore en este la información del [Index.html](https://github.com/natisbar/Block_configuration_moodle/blob/master/index.html). Recuerde cambiar las url de los estilos, de los scripts y del fichero JSON.
2. Configure el bloque. Asegurese de que sea visible en todos los espacios del curso y que no sea visible para los estudiantes.
3. En course/modedit.php, debajo de la linea "echo $OUTPUT->header();" incorpore la siguiente fragmento de código, esto expondrá el rol del usuario, haciendolo accesible desde el front
4. Si quiere que los elementos de configuración de las actividades o recursos, estén ocultos rapidamente, incorpore lo siguiente en la plantilla de estilos de moodle.

