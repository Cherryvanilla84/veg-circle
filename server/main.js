// code that is only sent to the server. 

Meteor.startup(function () {
  // create a starter doc if necessary
  if (!Recipes.findOne()){// no documents yet!
      Recipes.insert({title:"my new recipe", description:"my description" ,temp_check: " ", tags: []});
  }
  
    if (!Ingredients.findOne()){// no documents yet!
      Ingredients.insert({name:"my new ingredient", description:"my description"});
  }
});


// publish read access to collections

// all visible docs 
Meteor.publish("ingredients", function(){
  return Ingredients.find();
})




Meteor.publish("recipes", function(){
  return Recipes.find({
   $or:[
    {isPrivate:{$ne:true}}, 
    {owner:this.userId}
    ] 
  });
})  
// users editing docs
Meteor.publish("editingUsers", function(){
  return EditingUsers.find();
})

// coments on docs
Meteor.publish("comments", function(){
  return Comments.find();
})