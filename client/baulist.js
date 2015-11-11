var ITEMS_INCREMENT = 20;
Session.setDefault('itemsLimit', ITEMS_INCREMENT);
Session.setDefault('txtSearch', '');
Session.setDefault('txtAttrSearch', '');
Session.setDefault('txtCatSearch', '');
Session.setDefault('filetype', 'prod');
Deps.autorun(function() {
Meteor.subscribe('product_items', Session.get('itemsLimit'), Session.get('txtSearch'));
Meteor.subscribe('category_items',Session.get('txtCatSearch'));
Meteor.subscribe('attribute_items',Session.get('txtAttrSearch'));
});

// whenever #showMoreResults becomes visible, retrieve more results
function showMoreVisible() {
 var threshold, target = $("#showMoreResults");
 var container = $(".container");
 if (!target.length) return;
 var scrollTopContainer = container.scrollTop();
 var heightContainer = container.height();
 threshold = scrollTopContainer + heightContainer - target.height();
 threshold = $(window).scrollTop() + $(window).height() - target.height();

 if (target.offset().top <= threshold) {
     if (!target.data("visible")) {
         console.log("target became visible (inside viewable area)");
         target.data("visible", true);
         Session.set("itemsLimit",
             Session.get("itemsLimit") + ITEMS_INCREMENT);
     }
 } else {
     if (target.data("visible")) {
         console.log("target became invisible (below viewable arae)");
         target.data("visible", false);
     }
 }
}

$(window).scroll(showMoreVisible);
