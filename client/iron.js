// set up the iron router
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

// 'home' page
Router.route('/', function () {
  console.log("you hit / ");
  this.render("navbar", {to:"header"});
  this.render("recList", {to:"main"});  
});

// individual document page
Router.route('/recipes/:_id', function () {
  console.log("you hit /recipes  "+this.params._id);
  Session.set("recid", this.params._id);
  this.render("navbar", {to:"header"});
  this.render("recItem", {to:"main"});  
});

