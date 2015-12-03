//var REST_FOTOS_FLICKR = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=605aa2be67eed97265bd04c3af596495&license=4&sort=interestingness-desc&safe_search=2&page=1&format=rest&auth_token=72157659654629193-302663d41c4837a9&api_sig=24d9c7e63d6778bc22336de258fedffd";
var REST_FOTOS_FLICKR = " https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=605aa2be67eed97265bd04c3af596495&license=4&sort=interestingness-desc&safe_search=2&page=1&format=json&nojsoncallback=1&auth_token=72157659654629193-302663d41c4837a9&api_sig=f036170b296bd0afc6e7bd9c851ac0d8";

var REST_FOTOS_SIZE_FLICKR_PARTE_1 = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=605aa2be67eed97265bd04c3af596495&";
var REST_FOTOS_SIZE_FLICKR_PARTE_2 = "&format=json&nojsoncallback=1";


Template.wallpaperSelect.helpers({
    selecionaFlickr: function () {
        $.when($.ajax(REST_FOTOS_FLICKR)).then(function (data, textStatus, jqXHR) {
            alert(jqXHR.status); // Alerts 200
            console.log(data);
            console.lot(textStatus);
        });
    }
});

Template.wallpaperSelect.events({
    "click .selecionaFlickr": function (event) {
        event.preventDefault();

        $.when($.ajax({
            url: REST_FOTOS_FLICKR,
            crossDomain: true
        })).then(function (data, textStatus, jqXHR) {
            var fotosArray = [];

            console.log(jqXHR.status); // Alerts 200

            var fotosFlickrArray = data.photos.photo;
            for (var i = 0; i < fotosFlickrArray.length; i++) {
                var foto = fotosFlickrArray[i];
//                console.dir(fotosFlickrArray[i]);
//photo_id=2684605133
                $.when($.ajax({
                    url: REST_FOTOS_SIZE_FLICKR_PARTE_1 + '&photo_id=' + foto.id + REST_FOTOS_SIZE_FLICKR_PARTE_2,
                    crossDomain: true
                })).then(function (data, textStatus, jqXHR) {
                    console.log('foto.id:');
                    console.log(foto.id);
                    console.log(data.sizes);
                    var urlSize320 = data.sizes.size[4].source;
                    var urlOriginal = data.sizes.size[data.sizes.size.length - 1].source;
                    console.log(textStatus);
                    console.log(jqXHR.status);
                    fotosArray.push({flickrId: foto.id, urlSize320: urlSize320, urlOriginal: urlOriginal});

                });
            }

//            console.log(data.photos.photo);
            console.log(textStatus);
        });
    }
});


