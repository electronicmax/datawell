define([
           './js/models.js',
           './web/webbox/util.js'
       ],
       function(models,util) {

          // add clickable buttons
          $("#devfirsts_nathan").click(function(evt){
            window.location = "developmental_firsts.html#id=nathan";
          });
          $("#sixweekreview_nathan").click(function(evt){
            window.location = "sixweekreview.html#id=nathan";
          });
          $("#cvd_david").click(function(evt){
            window.location = "cvd.html#id=david";
          });

          // todo - do a connection check to make sure it works
          var ChildLens = Backbone.View.extend(
              {
                  events : {
                      "click .edit_button" : "_cb_edit",
                      "keyup .edit_form input" : "_cb_text_input_edited",
                      "click .edit_form button" : "_cb_radio_toggled"
                  },                  
                  initialize:function() {

                  },
                  is_edit_expanded:function() {
                      return this.$el.find('.edit_form').attr("data-expanded") == 'true';
                  },
                  _cb_edit:function() {                      
                      if (!this.is_edit_expanded()) {
                          this.$el.find('.basicstats').hide();
                          this.$el.find('.edit_button').html('[ Close ]');
                          this.$el.find('.edit_form').attr("data-expanded", true);
                          var t = $("#child_details_form").text();
                          return this.$el.find('.edit_form').html(_(t).template(this.options.model));                          
                      }
                      this.$el.find('.basicstats').show();
                      this.$el.find('.edit_button').html('[ Edit ]');
                      this.$el.find('.edit_form').html('');
                      this.$el.find('.edit_form').attr("data-expanded", false);                      
                  },
                  _cb_text_input_edited:function(e) {
                      var vals = {};
                      vals[$(e.currentTarget).attr("name")] = $(e.currentTarget).val();;
                      this.options.model.set(vals);
                      this.options.model.save();
                  },
                  _cb_radio_toggled:function(e) {
                      var vals = {};
                      vals[$(e.currentTarget).parent().attr("data-name")] = $(e.currentTarget).html().trim();
                      this.options.model.set(vals);
                      this.options.model.save();
                      
                  },
                  save:function() {
                                            
                  }
              });          
          // enable dropdowns
          // $('.dropdown-toggle').dropdown();
          var children = models.children;           
          // make some stubs
          ['nathan', 'annie', 'bobbie', 'david'].map(
              function(name) {
                  if (!children.get(name)) {
                      console.log('adding ', name);
                      children.add({ id:name, firstname: name });
                      children.get(name).save();
                  }                                                
              });
           
          var cl = new ChildLens({
                                     el:$('.person_lens')[0],
                                     model:children.get('nathan')
                                 });
          var a1 = new ChildLens({
                                     el:$('.person_lens')[1],
                                     model:children.get('annie')
                                 });

          var b1 = new ChildLens({
                                     el:$('.person_lens')[2],
                                     model:children.get('bobbie')
                                 });

          var d1 = new ChildLens({
                                     el:$('.person_lens')[3],
                                     model:children.get('david')
                                 });
           
      });
