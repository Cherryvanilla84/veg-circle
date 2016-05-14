// code that is only sent to the client

// subscribe to read data
Meteor.subscribe("recipes");
Meteor.subscribe("editingUsers");
Meteor.subscribe("comments");
Meteor.subscribe("ingredients");




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


Template.checklisttemp.rendered = function () {
  
 
    $(".js-tog-c").each(function () {
          
      console.log(this.name);
      var j =[];
      var c = Recipes.findOne({_id:Session.get("recid")});
      j= c.tags;
      if (j.indexOf(this.name)> -1) {
        $(this).prop("checked", true);
      }else
      { $(this).prop("checked", false); }
    }  );
 
}
;

/*Template.checklisttemp.onRendered( function () {
 var b = Ingredients.find();
 var inter = b.fetch();
 console.log("rendere");
for (var i=0; i<inter.length; i++) {
    if( inter[i]._id == $this.id) {
      
      $(this).prop("checked", true);
    }
    
}
 
 


})*/

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





  

