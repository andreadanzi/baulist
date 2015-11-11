Products = new Mongo.Collection("products");
Categories = new Mongo.Collection("categories");
Attributes = new Mongo.Collection("attributes");

Uploads = new FS.Collection('uploads',{
  stores:[new FS.Store.FileSystem('uploads',{path:'~/Documents/GitHub/baulist/public/imports'})]
});
Uploads.allow({
  insert:function(){
    return true;
  },
  update:function(){
    return true;
  },
  remove:function(){
    return true;
  },
  download:function(){
    return true;
  },
});
