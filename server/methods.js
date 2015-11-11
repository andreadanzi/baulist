
Meteor.methods({
  'uploadFile' : function(fileid,filename,filetype) {
  console.log("start uploadFile " + fileid + " " + filename + " " + filetype);
   var fs = Npm.require('fs');
   var path = Npm.require('path');
   var file = Uploads.find({_id:fileid});
   Meteor.setTimeout(function(){
     var filepath = path.join(process.env.PWD, '/public/imports/uploads-' + fileid + '-' + filename);
     var headerFields = [];
     console.log("uploadFile filepath " + filepath);
     CSV().from.stream(
  			fs.createReadStream(filepath),
  			{'escape':'\\','delimiter':";"})
        .on('record',Meteor.bindEnvironment(function(row,index){
          if(index==0) {
            headerFields = row.slice();
          } else {
            if(filetype=='prod') {
              processProduct(headerFields, row);
            } else if (filetype=='cat') {
              processCategory(headerFields, row);
            } else if (filetype=='attr') {
              processAttribute(headerFields, row);
            }
          }
  			}, function(error){
  				console.log("on_record error:" + error);
  			}))
  			.on('error',function(err){
  				console.log("createReadStream error:" + err);
  			})
  			.on('end',function(count){
          // processCategoryChildren(null);
          console.log("imported "+count+ " items");
  			});
   },1000);
   console.log("uploadFile completed");
  }
});

function processProduct(headerFields, row){
  var pName = row[67];
  var pSku = row[0];
  // var pDescr = row[24];
  var myProduct = Products.findOne({sku:pSku});
  if(myProduct) {
    console.log(pName + " found with id " + myProduct._id);
    var updateItem = {};
    for(var j=1;j<headerFields.length;j++){
      if( row[j] )  updateItem[headerFields[j].replace(/-/g, "_")] = row[j];
    }
    Products.update(myProduct._id, {
      $set: updateItem
    });
  } else {
    var insertItem = {};
    for(var j=0;j<headerFields.length;j++){
      if( row[j] ) insertItem[headerFields[j].replace(/-/g, "_")] = row[j];
    }
    insertItem['createdAt'] = new Date();
    Products.insert(insertItem);
    console.log(pName + " inserted!");
  }
}



function processCategory(headerFields, row){
  var pName = row[3];
  var pCode = row[0];
  var myCat = Categories.findOne({_id:pCode});
  if(myCat) {
    console.log(pName + " found with id " + myCat._id);
    var updateItem = {title:pName};
    for(var j=1;j<headerFields.length;j++){
      updateItem[headerFields[j].replace(/-/g, "_")] = row[j];
    }
    Categories.update(myCat._id, {
      $set: updateItem
    });
  } else {
    var insertItem = {_id:pCode, title:pName, parent:null};
    for(var j=0;j<headerFields.length;j++){
      insertItem[headerFields[j].replace(/-/g, "_")] = row[j];
    }
    insertItem['createdAt'] = new Date();
    Categories.insert(insertItem);
    console.log(pName + " inserted!");
  }
}


function processAttribute(headerFields, row){
  var pName = row[3];
  var pCode = row[1];
  var myAttr = Attributes.findOne({_id:pCode});
  if(myAttr) {
    console.log(pName + " found with id " + myAttr._id);
    var updateItem = {title:pName};
    for(var j=1;j<headerFields.length;j++){
      updateItem[headerFields[j].replace(/-/g, "_")] = row[j];
    }
    Attributes.update(myAttr._id, {
      $set: updateItem
    });
  } else {
    var insertItem = {_id:pCode, title:pName};
    for(var j=0;j<headerFields.length;j++){
      insertItem[headerFields[j].replace(/-/g, "_")] = row[j];
    }
    insertItem['createdAt'] = new Date();
    Attributes.insert(insertItem);
    console.log(pName + " inserted!");
  }
}
