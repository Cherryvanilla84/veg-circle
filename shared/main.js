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
            title:"my new recipe",description:"my description", temp_check: " ", tags: []};
      var id = Recipes.insert(rec);
      console.log("addRec method: got an id "+id);
      return id;
    }
  },
  
    addIngr:function(){
    var ing;
    if (!this.userId){// not logged in
      return;
    }
    else {
      ing = {owner:this.userId, createdOn:new Date(),
            name:"my new ingredient",description:"my description"};
      var id = Ingredients.insert(ing);
      console.log("addIng method: got an id "+id);
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
  
  
  updateTags: function (rec) {
    console.log("updateTags method");
    console.log("ecco rec " + rec);
    var realRec = Recipes.findOne({ _id: rec._id });
    if (realRec) {
      var tag = [];
      tag = realRec.tags;
      if (tag.length != 0) {
        for (var i = 0; i < tag.length; i++) {
           if (tag.indexOf(rec.temp_check) == -1) {
            tag.push(rec.temp_check);
            console.log("inserito")
            realRec.tags = tag;
          }
          else {
            console.log("non inserito")

          }
        }
      }
      else {
        console.log("tag vuoto");
        tag.push(rec.temp_check);
        realRec.tags = tag;
      }

      Recipes.update({ _id: rec._id }, realRec);
    }
  },
  
    removeTags: function (rec) {
    console.log("removeTags method");
   
    var realRec = Recipes.findOne({ _id: rec._id });
    if (realRec) {
      var tag = [];
      tag = realRec.tags;
      if (tag.length != 0) {
        
           if (tag.indexOf(rec.temp_check) > -1) {
            tag.splice(tag.indexOf(rec.temp_check), 1);
          
            console.log("rimosso")
            realRec.tags = tag;
          }
          else {
            console.log("non tolto")

          }
        
      }
      else {
        console.log("tag vuoto");
             }

      Recipes.update({ _id: rec._id }, realRec);
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
