//Router.route('/', function () {
//  this.render('Home', {
//    data: function () { return Items.findOne({_id: this.params._id}); }
//  });
//});

Router.configure({
    layoutTemplate: 'home'
});

Router.route('/',{
    name: '/',
    template: 'content'
});

Router.route('/admin',{
    template: 'wallpaperSelect'
});

Router.route('/admin/seleciona-fotos',{
    template: 'selecionaFotos'
});