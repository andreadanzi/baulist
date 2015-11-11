Meteor.startup(function () {
  console.log("startup");
  search_index_name = "products_text_index_01";
  Products._ensureIndex({
                          name: "text",
                          description_en_US_ecommerce: "text"},
                        {name:search_index_name});

  Attributes._ensureIndex({
                          code: "text",
                          title: "text"},
                        {name:"atributes_text_index_01"});
  Categories._ensureIndex({ parent: 1 });
  if (Categories.find().count() > 0) {
    processCategoryChildren(null);
  }
});


function processCategoryChildren(parent){
  var local_children = [];
  var cur = Categories.find({parent:parent});
  cur.forEach(function(cat){
    local_children.push(cat._id);
    var sub_children = processCategoryChildren(cat._id);
    console.log("processCategoryChildren for " + cat._id + " children length "+ sub_children.length);
    Categories.update(cat._id, {
      $addToSet: { children: { $each: sub_children } }
    });
  });
  return local_children;
}
