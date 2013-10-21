define([],
       function() {
          var Child = Backbone.Model.extend({});
          var Children = Backbone.Collection.extend(
              {
                  localStorage:new Store('children'),
                  model:Child
              }
          );          
          var children = new Children();
          window.children = children; // hack -- just for debug, export children to the window context so we can fiddle with it in the console
          children.fetch();
          return {
               children:children
          };
      });
