
Template.searchbox.events({
"change input.searchtext": function (event, template, doc) {
  // Prevent default browser form submit
  // event.preventDefault();
  console.log("selected ", event.target.value);
  // Get value from form element
  if(Session.equals("filetype", "prod")) Session.set('txtSearch', event.target.value);
  if(Session.equals("filetype", "attr")) Session.set('txtAttrSearch', event.target.value);
  if(Session.equals("filetype", "cat")) Session.set('txtCatSearch', event.target.value);
  // Insert a task into the collection // txtAttrSearch
  // Products.find({ $text: { $search: text } });

  // Clear form
  // event.target.text.value = "";
}
});

/*
Template.body.events({
"submit .search-product": function (event) {
  // Prevent default browser form submit
  event.preventDefault();

  // Get value from form element
  var text = event.target.text.value;
  Session.set('txtSearch', text);
  // Insert a task into the collection
  // Products.find({ $text: { $search: text } });

  // Clear form
  // event.target.text.value = "";
}
});*/

Template.import.events({

"change #csvchoosefile": function(evt,tmpl) {
    var filetype = $("#filetype").val();
    console.log("starting change #csvchoosefile for " + filetype);
    FS.Utility.eachFile(
        event, function(file){
            console.log("file is " + file);
            var theFile = new FS.File(file);
            Uploads.insert(theFile,function(err,fileObj){
              if(!err){
                Meteor.call('uploadFile',fileObj._id,file.name,filetype);
              }
            })
        });
    console.log("change #csvchoosefile terminated");
},
"change #filetype": function(evt,tmpl){
    var filetype = $("#filetype").val();
    console.log("starting change #filetype, selected value is " + filetype);
    // Template.attributes_loop.attributesVisible = filetype=='attr' ? true : false;
    Session.set('filetype', filetype);
    if(filetype=='attr') $("#searchtext").val(Session.get('txtAttrSearch'));
    if(filetype=='prod') $("#searchtext").val(Session.get('txtSearch'));
    if(filetype=='cat') $("#searchtext").val(Session.get('txtCatSearch'));
}
});

Template.product.events({
"click .toggle-checked": function () {
  console.log("starting click .toggle-checked");
  // Set the checked property to the opposite of its current value
  Products.update(this._id, {
    $set: {checked: ! this.checked}
  });
  console.log("click .toggle-checked terminated");
},
"click .delete": function () {
  Products.remove(this._id);
}
});

Template.attribute.events({
"click .toggle-checked": function () {
  console.log("starting click .toggle-checked");
  // Set the checked property to the opposite of its current value
  Attributes.update(this._id, {
    $set: {checked: ! this.checked}
  });
  console.log("click .toggle-checked terminated");
},
"click .delete": function () {
  Attributes.remove(this._id);
}
});
