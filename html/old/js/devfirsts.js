define([
           './js/models.js',
       ],
       function(models) {


        window.getUriVars = function(){ // FIXME move to utils?
            var i, variables = window.location.hash.substr(1).split(';');

            var keyvalues = {};

            if (variables.length > 0) {
                // Variables present in hash
                for (i = 0; i < variables.length; i++) {
                   keyValuePair = variables[i].split('=');
                   // keyValuePair[0] would be the key (variable name)
                   // keyValuePair[1] would be the value
                   keyvalues[ keyValuePair[0] ] = keyValuePair[1];
                }
            }
            else {
                // No variables in the hash
            }
            return keyvalues;
        }

        var vars = getUriVars();
        var patientId = "default";
        if ("id" in vars){
            patientId = vars["id"];
        }
        var patient = models.children.get(patientId);
        console.debug(patient);
        
        // input ids
        var inputids = {
            "df_1": "Lifts head clear of ground",
            "df_2": "Rolls over",
            "df_3": "Sits with support",
            "df_4": "Sits alone",
            "df_5": "Crawls",
            "df_6": "Bottom shuffles",
            "df_7": "Stands holding on",
            "df_8": "Stands alone",
            "df_9": "Walks holding on",
            "df_10": "Walks alone",
            "df_11": "First outdoor walk"
        };

        $.each(inputids, function(inputid, desc){
            // save on edit
            $("#"+inputid).keyup(function(){
                var value = $("#"+inputid).val();
                var values = {};
                values[inputid] = value;
                patient.set(values);
                patient.save();
                console.debug(patient);
            });

            // load on render
            $("#"+inputid).val( patient.get(inputid) );
        });

        // load label values
        $(".label_value").each(function(){
            var jthis = $(this);
            var field = jthis.attr("id");
            jthis.html( patient.get(field) );
        });

    });
