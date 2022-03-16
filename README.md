# Block_configuration_moodle

**Support this software [Paypal](https://www.paypal.com/paypalme/natisbar)**

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

Actualmente se han incorporado 4 tipos de actividades o recursos: H5P, Folder, Quiz, Page... pero ud podría seguir incorporando mas, siempre que adicione en el JSON la información necesaria, y defina el objeto en el constructor de la clase Configuration, y lo incorpore al arreglo de recursos instanciados.

Proceso de incorporación.

1. Cree un bloque HTML e incorpore en este la información del [Index.html](https://github.com/natisbar/Block_configuration_moodle/blob/master/index.html). Recuerde cambiar las url de los estilos, de los scripts y del fichero JSON.
2. Configure el bloque. Asegurese de que sea visible en todos los espacios del curso y que no sea visible para los estudiantes.
3. En modedit.php, debajo de la linea "echo $OUTPUT->header();" incorpore la siguiente fragmento de código, esto expondrá el rol del usuario, haciendolo accesible desde el front
```
// Roles del user en el curso
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

4. Si quiere que los elementos de configuración de las actividades o recursos, estén ocultos rapidamente. Vaya a la plantilla de estilos de moodle, e incorpore esto.
```
/**Ocultar elementos de configuración de los mod**/
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
