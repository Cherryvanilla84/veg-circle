// code that is shared between client and server, i.e. sent to both

// method definitions
Meteor.methods({
  // adding new comments
  addComment:function(comment){
    console.log("addComment method running!");
    if (this.userId){// we have a user
      comment.owner = this.userId;
        return Comments.insert(comment);
    }
    return;
  },

  // adding new recuments
  addRec:function(){
    var rec;
    if (!this.userId){// not logged in
      return;
    }
    else {
      rec = {owner:this.userId, createdOn:new Date(),
            title:"my new recipe"};
      var id = Recipes.insert(rec);
      console.log("addRec method: got an id "+id);
      return id;
    }
  },
  // changing rec privacy settings
  updateRecPrivacy:function(rec){
    console.log("updateRecPrivacy method");
    console.log(rec);
    var realRec = Recipes.findOne({_id:rec._id, owner:this.userId});
    if (realRec){
      realRec.isPrivate = rec.isPrivate;
      Recipes.update({_id:rec._id}, realRec);
    }
  },
// adding editors to a recument
  addEditingUser:function(recid){
    var rec, user, eusers;
    rec = Recipes.findOne({_id:recid});
    if (!rec){return;}// no rec give up
    if (!this.userId){return;}// no logged in user give up
    // now I have a rec and possibly a user
    user = Meteor.user().profile;
    eusers = EditingUsers.findOne({recid:rec._id});
    if (!eusers){
      eusers = {
        recid:rec._id,
        users:{},
      };
    }
    user.lastEdit = new Date();
    eusers.users[this.userId] = user;

    EditingUsers.upsert({_id:eusers._id}, eusers);
  }
})
