if (Meteor.isClient) {

  Template.main.helpers({
    items: function () {
      return Items.find({}, { sort: { ranking: -1, name: 1 } });
    }
  });

  Template.itemMoveUp.famousEvents({
    'click': function (event, fview) {
      Items.update({ _id: Blaze.getData(fview.parent.blazeView).id }, { $inc: { ranking: 1 } });
    }
  });  

  Template.itemRemove.famousEvents({
    'click': function (event, fview) {
      Items.remove({ _id: Blaze.getData(fview.parent.blazeView).id });
    }
  });
}

Items = new Mongo.Collection('items');

if (Meteor.isServer) {
  Meteor.startup(function () {
    Items.remove({});
    if (Items.find().count() < 4) {
      for (var i = 0; i < 4; i++) {
        Items.insert({ name: 'Surface #' + i, ranking: i});
      }
    }
  });
}
