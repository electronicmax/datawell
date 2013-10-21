define([
           'js/models',
           'js/cvdquestions',
           'web/webbox/util',
           'js/sixweekquestions',
	'js/icd',
       ],function(models, qs2, util, qs, icd){

        function draw_patient_label(patient_id, div){
            // append a label to this div.
            var label = $("#patient_label_template").html();
            var patient = models.children.get(patient_id);


            div.append(_(label).template({"id": patient_id, attributes:patient.attributes})); // , attributes: patient && patient.attributes || {}}));

            // load label values

            div.find(".label_value").each(function(){
                var jthis = $(this);
                var field = jthis.attr("id");
                jthis.html( patient.get(field) );
            });
        }

        function draw_devfirsts(patient_id, div){
            // append dev firsts to the div
            var html = $("#devfirsts_template").html();
            div.append(html);

            var patient = models.children.get(patient_id);

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
                div.find("."+inputid).keyup(function(){
                    var value = div.find("."+inputid).val();
                    var values = {};
                    values[inputid] = value;
                    patient.set(values);
                    patient.save();
                });

                // load on render
                if (patient != null){
                    div.find("."+inputid).val( patient.get(inputid) );
                }
            });
        }

        function draw_cvd(patient_id, div){
            // append dev firsts to the div
            var html = $("#cvd_template").html();
            div.append(html);

            var patient = models.children.get(patient_id);
            
            // todo - do a connection check to make sure it works
            var Controller2 = Backbone.View.extend(
                {
                    events : {
                        "keyup .questions2 input" : "_cb_text_input_edited",
                        "click .questions2 button" : "_cb_radio_toggled"
                    },                  
                    initialize:function() {
                        this.render();
                    },
                    render:function() {
                        var this_ = this;
                        //console.log(" responses ", this._get_responses());
                        qs2.questions.map(function(q) {
                                             var t = _($('#question_template2').html()).template(
                                                 {
                                                     qname: q.qname, qtext : q.qtext, qvals: q.qvals, response: this_._get_responses()[q.qname]
                                                 });
                                             //console.log(t);
                                             this_.$el.find('.questions2').append(t);
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
                        if (this.options.model != null){
                            var responses =  this.options.model.get('cvd');
                            return responses && JSON.parse(responses) || {};
                        } else {
                            return {};
                        }
                    },
                    _set_responses:function(r) {
                        //console.log("setting responses ", r);
                        this.options.model.set({cvd: JSON.stringify(r) });
                        this.options.model.save();
                    },
                    _cb_radio_toggled:function(e) {
                        var responses =  this._get_responses();
                        responses[$(e.currentTarget).parent().attr("data-name")] = $(e.currentTarget).html().trim();
                        this._set_responses(responses);
                    }                  
                });

            var c2 = new Controller2({"el": div[0], "model": patient});
        }
    
        function draw_sixweekreview(patient_id, div){
            // append dev firsts to the div
            var html = $("#sixweekreview_template").html();
            div.append(html);

            var patient = models.children.get(patient_id);

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
                      //console.log(" responses ", this._get_responses());
                      qs.questions.map(function(q) {
                                           var t = _($('#question_template').html()).template(
                                               {
                                                   qname: q.qname, qtext : q.qtext, qvals: q.qvals, response: this_._get_responses()[q.qname]
                                               });
                                           //console.log(t);
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
                      if (this.options.model != null){

                          var responses =  this.options.model.get('sixweek');
                          return responses && JSON.parse(responses) || {};
                      } else {
                          return {};
                      }
                  },
                  _set_responses:function(r) {
                      //console.log("setting responses ", r);
                      this.options.model.set({sixweek: JSON.stringify(r) });
                      this.options.model.save();
                  },
                  _cb_radio_toggled:function(e) {
                      var responses =  this._get_responses();
                      responses[$(e.currentTarget).parent().attr("data-name")] = $(e.currentTarget).html().trim();
                      this._set_responses(responses);
                  }                  
              });


            var c = new Controller({"el": div[0], "model": patient});

        }

        function draw_details_form(patient_id, div){
            // append details form to the div
            var patient = models.children.get(patient_id);

            var template = $("#patient_details_form_template").html();
            div.append(_(template).template(patient));
        }

        function draw_pane(patient_id, type, div){
            // type in ["patient_details_form", "cvd", "devfirsts", "sixweekreview"]
            div = $(div);
            div.html(""); // clear div

            if (type == "patient_details_form"){
                draw_details_form(patient_id, div);
            } else if (type == "devfirsts"){
                draw_devfirsts(patient_id, div);
            } else if (type == "cvd"){
                draw_cvd(patient_id, div);
            } else if (type == "sixweekreview"){
                draw_sixweekreview(patient_id, div);
            } else if (type == "home"){
                draw_patient_label(patient_id, div);
            }

        }

        console.debug("Will load panes.");
        $(document).ready(function(){
            // populate on load
            // default values
            var nathan = models.children.get("nathan");
            if (nathan === undefined){
                nathan = new Backbone.Model({"id": "nathan"});
                models.children.add(nathan);
            }

            nathan.set({
                "surname": "Matthews",
                "firstname": "Nathan",
                "nhsnumber": "383562938",
                "unitno": "8534",
                "address": "12 Crown Lane",
                "postcode": "SO34 5RW",
                "birthdate": "12/12/2011",
                "sex": "Male",
                "gp": "Dr G Lowe",
                "gpcode": "486503",
                "hv": "Nurse H Ford",
                "hvcode": "3739575",
            });
            nathan.save();

            var annie = models.children.get("annie");
            if (annie === undefined){
                annie = new Backbone.Model({"id": "annie"});
                models.children.add(annie);
            }

            annie.set({
                "surname": "Matthews",
                "firstname": "Annie",
                "nhsnumber": "383563975",
                "unitno": "8534",
                "address": "12 Crown Lane",
                "postcode": "SO34 5RW",
                "birthdate": "17/05/2007",
                "sex": "Female",
                "gp": "Dr G Lowe",
                "gpcode": "486503",
                "hv": "Nurse H Ford",
                "hvcode": "3739575",
            });
            annie.save();

            var david = models.children.get("david");
            if (david === undefined){
                david = new Backbone.Model({"id": "david"});
                models.children.add(david);
            }

            david.set({
                "surname": "Matthews",
                "firstname": "David",
                "nhsnumber": "292359238",
                "unitno": "8534",
                "address": "12 Crown Lane",
                "postcode": "SO34 5RW",
                "birthdate": "04/09/1962",
                "sex": "Male",
                "gp": "Dr E Smith",
                "gpcode": "446483",
                "hv": "Nurse H Ford",
                "hvcode": "3739575",
            });
            david.save();

            console.debug("Loading panes.");

            draw_pane("nathan", "home", $("#nathan_home"));
            draw_pane("nathan", "patient_details_form", $("#nathan_details"));
            draw_pane("nathan", "devfirsts", $("#nathan_devfirsts"));
            draw_pane("nathan", "sixweekreview", $("#nathan_sixweekreview"));

            // draw_pane("bobby", "home", $("#bobby_home"));
            // draw_pane("bobby", "patient_details_form", $("#bobby_details"));

            draw_pane("annie", "home", $("#annie_home"));
            draw_pane("annie", "patient_details_form", $("#annie_details"));

            draw_pane("david", "home", $("#david_home"));
            draw_pane("david", "patient_details_form", $("#david_details"));
            draw_pane("david", "cvd", $("#david_cvd"));

        });

       });

