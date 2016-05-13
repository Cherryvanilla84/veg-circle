// set up the iron router
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

// 'home' page
Router.route('/', function () {
  console.log("you hit / ");
  this.render("navbar", {to:"header"});
  this.render("LandingPage", {to:"main"});  
});

// individual document page
Router.route('/recipes/:_id', function () {
  console.log("you hit /recipes  "+this.params._id);
  Session.set("recid", this.params._id);
  this.render("navbar", {to:"header"});
  this.render("recItem", {to:"main"});  
});
//add ingredients
Router.route('/ingredients/:_id', function () {
  console.log("you hit /ingredients  "+this.params._id);
  Session.set("ingid", this.params._id);
  this.render("navbar", {to:"header"});
  this.render("ingrItem", {to:"main"});  
});

Router.route('/inglist/', function () {
  console.log("you hit /inglist  "+this.params._id);
  Session.set("ingid", this.params._id);
  this.render("navbar", {to:"header"});
  this.render("ingList", {to:"main"});  
});

Router.route('/reclist/', function () {
  console.log("you hit /reclist  "+this.params._id);
  Session.set("recid", this.params._id);
  this.render("navbar", {to:"header"});
  this.render("recList", {to:"main"});  
});