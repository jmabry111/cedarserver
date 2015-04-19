Template.minionsettings.helpers({
    stages: function () {
        return stages.find({_id: {$ne: this.stage}});
    },
    
    titleOf: function (stageid) {
        var stage = stages.findOne({_id: stageid});
        if (stage) {return stage.title;}
        else {return 'Unassigned';}
    },
    
    getSetting: function (setting) {
        return this.settings[setting];
    },
    
    typeIs: function (type) {
        return type == this.type;
    }
});

Template.minionsettings.events({
    'click .minion-settings-cancel': function (event) {
        Router.go('/minions');    
    },
    
    'click .minion-settings-save': function (event) {
        var newname = $('.minion-name').val();
        Meteor.call('minionName', this._id, newname);

        var stageid = $('.minion-stage').val();
        if (stageid) Meteor.call('minionStage', this._id, stageid);
        Router.go('/minions');
    },
    
    'click .minion-settings-delete': function (event) {
        $('.delete-modal').modal('show');
    },
    
    'click .minion-delete-cancel': function (event) {
        $('.delete-modal').modal('hide');
    },
    
    'click .minion-delete-confirm': function (event) {
        $('.delete-modal').modal('hide');
        Meteor.call('minionDelete', this._id);
        Router.go('/minions');
    },
});