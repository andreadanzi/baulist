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
  Categories._ensureIndex({title: "text"},
                        {name:"categories_text_index_01"});

  if (Categories.find().count() > 0) {
    checkCategories();
  }
});


function processCategoryChildren(parent){
  var local_children = [];
  var cur = Categories.find({parent:parent});
  cur.forEach(function(cat){
    local_children.push(cat._id);
    var sub_children = processCategoryChildren(cat._id);
    Categories.update(cat._id, {
      $addToSet: { children: { $each: sub_children } }
    });
  });
  return local_children;
}

function checkCategories(){
  console.log("checkCategories");
  var cur = Categories.find();
  cur.forEach(function(cat){
    console.log("cat._id = " + cat.title);
  });
}
