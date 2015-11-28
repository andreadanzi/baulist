var ITEMS_INCREMENT = 20;
Session.setDefault('prodItemsLimit', ITEMS_INCREMENT);
Session.setDefault('catItemsLimit', ITEMS_INCREMENT);
Session.setDefault('attrItemsLimit', ITEMS_INCREMENT);
Session.setDefault('txtSearch', '');
Session.setDefault('txtAttrSearch', '');
Session.setDefault('txtCatSearch', '');
Session.setDefault('filetype', 'prod');
Deps.autorun(function() {
  Meteor.subscribe('product_items', Session.get('prodItemsLimit'), Session.get('txtSearch'));
  Meteor.subscribe('category_items', Session.get('catItemsLimit'), Session.get('txtCatSearch'));
  Meteor.subscribe('attribute_items', Session.get('attrItemsLimit'), Session.get('txtAttrSearch'));
});

// whenever #showMoreResults becomes visible, retrieve more results
function showMoreVisible() {
  var sSessionLimit = "prodItemsLimit";
  var threshold, target = $("#showMoreProdResults");
  if (!target.length) {
    target = $("#showMoreCatResults");
    if (!target.length) {
      target = $("#showMoreAttrResults");
      if (!target.length) {
        return;
      } else {
        sSessionLimit = "attrItemsLimit";
      }
    } else {
      sSessionLimit = "catItemsLimit";
    }
  }
 var container = $(".container");
 var scrollTopContainer = container.scrollTop();
 var heightContainer = container.height();
 threshold = scrollTopContainer + heightContainer - target.height();
 threshold = $(window).scrollTop() + $(window).height() - target.height();

 if (target.offset().top <= threshold) {
     if (!target.data("visible")) {
         console.log("target became visible (inside viewable area)");
         target.data("visible", true);
         Session.set(sSessionLimit,
             Session.get(sSessionLimit) + ITEMS_INCREMENT);
     }
 } else {
     if (target.data("visible")) {
         console.log("target became invisible (below viewable arae)");
         target.data("visible", false);
     }
 }
}

$(window).scroll(showMoreVisible);
