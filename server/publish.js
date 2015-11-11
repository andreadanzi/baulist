
// { $text: { $search: "coffee" } }
Meteor.publish('product_items', function(limit, txtSearch) {
  console.log("product_items on server side for limit = " + limit + " and txtSearch = "+txtSearch);
  if( txtSearch ) return Products.find({ $text: { $search: txtSearch } }, { limit: limit });
  else return Products.find({}, { limit: limit });
});
//category_items
Meteor.publish('category_items', function(txtSearch) {
  console.log("category_items on server side");
  return Categories.find({});
});
//attribute_items
Meteor.publish('attribute_items', function(txtSearch) {
  console.log("attribute_items on server side with txtSearch = "+txtSearch);
  if( txtSearch ) return Attributes.find({ $text: { $search: txtSearch } });
  else return Attributes.find({});
});
