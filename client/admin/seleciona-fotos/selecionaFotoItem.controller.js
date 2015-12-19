Template.selecionaFotoItem.helpers({
    estaSelecionada: function () {
        var retorno = "";
        if (this.estaSelecionada) {
            retorno = "checked";
        }
//       console.log(retorno);
        return retorno;
    }
});

Template.selecionaFotoItem.events({
    "change .estaSelecionada": function (e) {
        var estaSelecionada = e.target.checked;

        FotosFlickr.update(this._id, {$set: {estaSelecionada: estaSelecionada}});

        if (!estaSelecionada) {
            // se existe um wallpaper na lista com o mesmo flickrId, 
            // então retire, pois não está selecionado
            var wallpaper = Wallpapers.findOne({flickrId: this.flickrId});
            if (wallpaper._id) {
                Wallpapers.remove(wallpaper._id);
            }

        } else {
            Wallpapers.insert({flickrId: this.flickrId, descricao: this.descricao,
                url_thumbnail: this.urlSize320, url_original: this.urlOriginal});

        }

//        console.log('findOne Wallpaper:');
//        console.log(retorno);
    },
    "change .descricaoFoto": function (e) {
        e.preventDefault();
        console.log(e.target.value);
        console.log(this);

        FotosFlickr.update(this._id, {$set: {descricao: e.target.value}});

        var wallpaper = Wallpapers.findOne({flickrId: this.flickrId});

        // se existe é porque já foi salvo, então alterar descrição nele também
        if (typeof wallpaper != 'undefined') {
            Wallpapers.update(wallpaper._id, {$set: {descricao: e.target.value}});
        }

    }

});
