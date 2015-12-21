//Template.selecionaFotos.helpers({
//   fotosFlickr: function(){
//        var fotosFlickr = FotosFlickr.find({});
//        return fotosFlickr;
//   }
//});
//
//this.PagesSelecionaFotos = new Meteor.Pagination(FotosFlickr, {
//    itemTemplate: "selecionaFoto"
//});

//Template.selecionaFotos.helpers({
//    
//});

Template.selecionaFotos.events({
    "change .filtro-seleciona-fotos": function (event) {
        console.log('event:', event);
        console.log('target value:', event.target.value);

        switch (event.target.value) {
            case 'selecionadas':

                PagesFlickr.set({
                    filters: {
                        estaSelecionada: {
                            $eq: true
                        }
                    }
                });
                break;

            case 'nao-selecionadas':
                PagesFlickr.set({
                    filters: {
                        estaSelecionada: {
                            $ne: true
                        }
                    }
                });
                break;
                
            default:
                PagesFlickr.set({
                    filters: {
                    }
                });

        }
    }
});

