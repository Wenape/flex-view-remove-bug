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

  Template.reset.famousEvents({
    'click': function (event, fview) {
      Meteor.call('reset');
    }
  }); 

}

Items = new Mongo.Collection('items');

if (Meteor.isServer) {
  reset = function () {
    Items.remove({});
    for (var i = 0; i < 4; i++) {
      Items.insert({ name: 'Surface #' + i, ranking: i});
    }
  };

  Meteor.startup(function () {
    reset();
  });

  Meteor.methods({
    reset: function () {
      reset();
    }
  });
}