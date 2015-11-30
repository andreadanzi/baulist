
Template.searchbox.events({
  "change input.searchtext": function (event, template, doc) {
    // Prevent default browser form submit
    // event.preventDefault();
    number = null;
    matchVals = event.target.value.match(/[0-9]+/);
    if(matchVals && matchVals.length > 0)
      number = parseInt(matchVals[0], 10);

    // Get value from form element
    if(Session.equals("filetype", "prod")) Session.set('txtSearch', event.target.value);
    if(Session.equals("filetype", "attr")) {
      Session.set('txtAttrSearch', event.target.value );
      Session.set('txtAttrValue', number );
    }
    if(Session.equals("filetype", "cat")) Session.set('txtCatSearch', event.target.value);
    // Insert a task into the collection // txtAttrSearch
    // Products.find({ $text: { $search: text } });

    // Clear form
    // event.target.text.value = "";
  },
  "submit form.search-product": function (event) {
    console.log("submit form");
    event.preventDefault();
  }
}
);

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
    var filetype = Session.get('filetype');
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
"change input[name='collectionName']": function(evt,tmpl){
    console.log("starting change collectionName, selected value is " +  evt.currentTarget.value);
    Session.set('filetype',  evt.currentTarget.value);
    switch(evt.currentTarget.value) {
			case 'attr':
        $("#searchtext").val(Session.get('txtAttrSearch'));
				break;
			case 'prod':
        $("#searchtext").val(Session.get('txtSearch'));
				break;
			case 'cat':
				$("#searchtext").val(Session.get('txtCatSearch'));
				break;
			default:
				$("#searchtext").val(Session.get('txtSearch'));
		}
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
"change input.searchtext": function (event, template, doc) {
  // Prevent default browser form submit
  // event.preventDefault();
  console.log("attribute value ", event.target.value);
  Attributes.update(this._id, {
    $set: {search_value: event.target.value}
  });

  // Clear form
  // event.target.text.value = "";
}
});
