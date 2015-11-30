
// { $text: { $search: "coffee" } }
Meteor.publish('product_items', function(limit, txtSearch) {
  console.log("product_items on server side for limit = " + limit + " and txtSearch = "+txtSearch);
  baulistUser = Meteor.users.findOne({username:"baulist"});
  if( txtSearch ) return Products.find({ $and: [{ $text: { $search: txtSearch }},{ owner : baulistUser._id }]}, { limit: limit });
  else return Products.find({ owner : baulistUser._id }, { limit: limit });
});
//category_items
Meteor.publish('category_items', function(limit, txtSearch) {
  console.log("category_items on server side for limit = " + limit + " and  txtSearch = "+txtSearch);
  baulistUser = Meteor.users.findOne({username:"baulist"});
  if( txtSearch ) return Categories.find( { $and: [{ $text: { $search: txtSearch }},{ owner : baulistUser._id }]}  ,{ limit: limit });
  // if( txtSearch ) return Categories.find( { $text: { $search: txtSearch }}  ,{ limit: limit });
  else return Categories.find({ owner : baulistUser._id },{ limit: limit });
});
//attribute_items
Meteor.publish('attribute_items', function(limit,txtSearch, attrValue) {
  console.log("attribute_items on server side for limit = " + limit + " and  txtSearch "+txtSearch+" with value " + attrValue);
  baulistUser = Meteor.users.findOne({username:"baulist"});
  if( txtSearch ) {
    if( attrValue == null ) {
      attrValue="";
    }
    console.log("number ", attrValue);
    Attributes.update({ $text: { $search: txtSearch }},{ $set: {search_value: attrValue} }, {multi: true});
    return Attributes.find({ $and: [{ $text: { $search: txtSearch }},{ owner : baulistUser._id }]}, { limit: limit } );
  }
  else return Attributes.find({ owner : baulistUser._id },{ limit: limit });
});
