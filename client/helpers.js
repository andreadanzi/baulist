Template.cat_tree.helpers({
categoriesVisible: function(filetype) {

  return Session.equals("filetype", filetype);
},
categories : function() {
              return Categories.find();
            },
categoriesExist : function() {
              return Categories.find({children:this._id}).fetch().length;
            }
});


Template.loop.helpers({
productsVisible: function(filetype) {

  return Session.equals("filetype", filetype);
},
products : function() {
              return Products.find();
            }
});

Template.attributes_loop.helpers({
attributesVisible: function(filetype) {

  return Session.equals("filetype", filetype);
},
attributes : function() {
              return Attributes.find();
            }
});

Template.moreItems.helpers({
moreResults : function() {
                // If, once the subscription is ready, we have less rows than we
                // asked for, we've got all the rows in the collection.
                return !(Products.find().count() < Session.get("itemsLimit"));
              }
});

Template.searchbox.helpers({
settings: function() {
    return {
      position: "bottom",
      limit: 10,
      rules: [
        {
          collection: Products,
          field: "name",
          matchAll: true,
          template: Template.searchProduct
        }
      ]
    };
  }

});