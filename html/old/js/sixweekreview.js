define([
           './js/models.js',
           './js/sixweekquestions.js',
           './web/webbox/util.js'
       ],
       function(models,qs,util) {
          // todo - do a connection check to make sure it works
          var Controller = Backbone.View.extend(
              {
                  events : {
                      "keyup .questions input" : "_cb_text_input_edited",
                      "click .questions button" : "_cb_radio_toggled"
                  },                  
                  initialize:function() {
                      this.render();
                  },
                  render:function() {
                      var this_ = this;
                      console.log(" responses ", this._get_responses());
                      qs.questions.map(function(q) {
                                           var t = _($('#question_template').html()).template(
                                               {
                                                   qname: q.qname, qtext : q.qtext, qvals: q.qvals, response: this_._get_responses()[q.qname]
                                               });
                                           console.log(t);
                                           this_.$el.find('.questions').append(t);
                                       });
                  },
                  _cb_text_input_edited:function(e) {
                      // no support for text yet
                      // var vals = {};
                      // vals[$(e.currentTarget).attr("name")] = $(e.currentTarget).val();;
                      // this.options.model.set(vals);
                      // this.options.model.save();
                  },
                  _get_responses:function() {
                      var responses =  this.options.model.get('sixweek');
                      return responses && JSON.parse(responses) || {};
                  },
                  _set_responses:function(r) {
                      console.log("setting responses ", r);
                      this.options.model.set({sixweek: JSON.stringify(r) });
                      this.options.model.save();
                  },
                  _cb_radio_toggled:function(e) {
                      var responses =  this._get_responses();
                      responses[$(e.currentTarget).parent().attr("data-name")] = $(e.currentTarget).html().trim();
                      this._set_responses(responses);
                  }                  
              });


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

        // load label values
        $(".label_value").each(function(){
            var jthis = $(this);
            var field = jthis.attr("id");
            jthis.html( patient.get(field) );
        });

           var c = new Controller({
                                      el: $("#main")[0],
                                      model: models.children.get(patientId)
                                  });
           window.sixc = c;
           return { c : c};
      });
