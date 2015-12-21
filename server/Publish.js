Meteor.publish('wallpapers', function(){
   return Wallpapers.find(); 
});

Meteor.publish('fotos-flickr', function(){
   return FotosFlickr.find(); 
});