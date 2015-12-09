//this.Pages = new Meteor.Pagination(FotosFlickr, {
//    itemTemplate: "selecionaFotoItem"
//});

this.PagesFlickr = new Meteor.Pagination(FotosFlickr,{
    templateName: 'selecionaFotos',
    itemTemplate: "selecionaFotoItem",
    router: "false"
});