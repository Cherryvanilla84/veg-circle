// code that is only sent to the client

// subscribe to read data
Meteor.subscribe("recipes");
Meteor.subscribe("editingUsers");
Meteor.subscribe("comments");
Meteor.subscribe("ingredients");



/*Template.editor.helpers({
  // get current doc id
  recid:function(){
    setupCurrentRec();
    return Session.get("recid");
  }, 
  // set up the editor
  config:function(){
    return function(editor){
      editor.setOption("lineNumbers", true);
      editor.setOption("theme", "cobalt");
      editor.on("change", function(cm_editor, info){
        $("#viewer_iframe").contents().find("html").html(cm_editor.getValue());
        Meteor.call("addEditingUser", Session.get("recid"));
      });        
    }
  }, 
});
*/

/*Template.editingUsers.helpers({
  // retrieve a list of users
  users:function(){
    var rec, eusers, users;
    rec = Recipes.findOne({_id:Session.get("recid")});
    if (!rec){return;}// give up
    eusers = EditingUsers.findOne({recid:rec._id});
    if (!eusers){return;}// give up
    users = new Array();
    var i = 0;
    for (var user_id in eusers.users){
        users[i] = fixObjectKeys(eusers.users[user_id]);
        i++;
    }
    return users;
  }
})*/

Template.navbar.helpers({
  // rerrieve a list of documents
 recipes:function(){
    return Recipes.find();
   
  },
   ingredient:function(){
    var ig = Ingredients.findOne({_id:Session.get("ingid")});
    return ig._id
}})

/*Template.myFabTemplate.helpers({
    getStuff: function(){
        return "Amsterdam,Washington,Sydney,Beijing,Cairo";
    }
});*/
Template.checklisttemp.helpers({
  // find all visible docs
  data:function(){
    return Ingredients.find();
  }
})


Template.recMeta.helpers({
  // find current document
  recipes:function(){
    return Recipes.findOne({_id:Session.get("recid")});
    
    
  },   
  // test if a user is allowed to edit current doc
  usercanEdit:function(){
    var rec;
    rec = Recipes.findOne({_id:Session.get("recid")});
    if (rec){
      if (rec.owner == Meteor.userId()){
        return true;
      }
    }
    return false;
  }
})

Template.ingDett.helpers({
  // find current document
  ingredients:function(){
    return Ingredients.findOne({_id:Session.get("ingid")});
  }, 
 
  
  // test if a user is allowed to edit current doc
  usercanEdit:function(){
    var ing;
    ing = Ingredients.findOne({_id:Session.get("ingid")});
    if (ing){
      if (ing.owner == Meteor.userId()){
        return true;
      }
    }
    return false;
  }
})




Template.recList.helpers({
  // find all visible docs
  recipes:function(){
    return Recipes.find();
  }
})

Template.ingList.helpers({
  // find all visible docs
  ingredients:function(){
    return Ingredients.find();
  }
})

Template.insertCommentForm.helpers({
  // find current doc id
  recid:function(){
    return Session.get("recid");
  }, 
})

Template.commentList.helpers({
  // find all comments for current doc
  comments:function(){
    return Comments.find({recid:Session.get("recid")});
  }
})

/////////
/// EVENTS
////////

Template.checklisttemp.events({
 
   "click .js-tog-c":function(event){
   console.log(event.target.name);
    var rec = {_id:Session.get("recid"), temp_check:event.target.name};
    if(event.target.checked ) {
    Meteor.call("updateTags", rec);
   }else {
      Meteor.call("removeTags", rec);
     
   }
   
  }
})


Template.navbar.events({
 
})


Template.ingList.events({ 
    "click .js-add-ingr":function(event){
    event.preventDefault();
    console.log("Add a new ingr!");

    for (var i=0;i<10;i++){
      Meteor.call('testMethod', function(){
        console.log('testMethod returned');
      });
      console.log('after testMethod call');
    }


    if (!Meteor.user()){// user not available
        alert("You need to login first!");
    }
    else {
      // they are logged in... lets insert a doc
      var id = Meteor.call("addIngr", function(err, res){
        if (!err){// all good
          console.log("event callback received id: "+res);
          Session.set("ingid", res);            
        }
      });
    }
  }, 
  // load doc button
  "click .js-load-ingr":function(event){
    //console.log(this);
    Session.set("ingid", this._id);
  }
}); 


Template.recList.events({ 
   // add doc button
  "click .js-add-rec":function(event){
    event.preventDefault();
    console.log("Add a new rec!");

    for (var i=0;i<10;i++){
      Meteor.call('testMethod', function(){
        console.log('testMethod returned');
      });
      console.log('after testMethod call');
    }


    if (!Meteor.user()){// user not available
        alert("You need to login first!");
    }
    else {
      // they are logged in... lets insert a doc
      var id = Meteor.call("addRec", function(err, res){
        if (!err){// all good
          console.log("event callback received id: "+res);
          Session.set("recid", res);            
        }
      });
    }
  }, 
  // load doc button
  "click .js-load-rec":function(event){
    //console.log(this);
    Session.set("recid", this._id);
  }
}); 


 

Template.recMeta.events({
  // change document privacy
  "click .js-tog-private":function(event){
    console.log(event.target.checked);
    var rec = {_id:Session.get("recid"), isPrivate:event.target.checked};
    Meteor.call("updateRecPrivacy", rec);

  }
})

// helper to make sure a doc is available
function setupCurrentRec(){
  var rec;
  if (!Session.get("recid")){// no doc id set yet
rec = Recipes.findOne();
    if (rec){
      Session.set("recid", rec._id);
    }
  }
}
// helper to remove hyphens from object keys for spacebars.
function fixObjectKeys(obj){
  var newObj = {};
  for (key in obj){
    var key2 = key.replace("-", "");
    newObj[key2] = obj[key];
  }
  return newObj;
}





  

