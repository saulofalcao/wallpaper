Meteor.publish('wallpapers', function(){
   return Wallpapers.find(); 
});