//var REST_FOTOS_FLICKR = " https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=605aa2be67eed97265bd04c3af596495&license=4&sort=interestingness-desc&safe_search=2&page=1&format=json&nojsoncallback=1&auth_token=72157659654629193-302663d41c4837a9&api_sig=f036170b296bd0afc6e7bd9c851ac0d8";

var API_KEY = "5bdb191e70f06a8f565a9227b89885aa";

var REST_FOTOS_FLICKR = " https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=5bdb191e70f06a8f565a9227b89885aa&license=4&sort=interestingness-desc&safe_search=2&page=1&format=json&nojsoncallback=1&per_page=100";

var REST_FOTOS_SIZE_FLICKR_PARTE_1 = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=5bdb191e70f06a8f565a9227b89885aa&";
var REST_FOTOS_SIZE_FLICKR_PARTE_2 = "&format=json&nojsoncallback=1";



//var REST_FOTOS_INFO_FLICKR_PARTE_1 = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=b402e64899bd1420bd2122387bcdc044&photo_id=" + photo.id + "&format=json&nojsoncallback=1"
//var REST_FOTOS_INFO_FLICKR_PARTE_2 = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=b402e64899bd1420bd2122387bcdc044&photo_id=4595160408&format=json&nojsoncallback=1"


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
            console.log(data);

            var fotosFlickrArray = data.photos.photo;

//            for (var i = 0; i < fotosFlickrArray.length; i++) {

//                console.dir(fotosFlickrArray[i]);
//photo_id=2684605133
            var countMontaArrayFotos = 0;

            function montaArrayFotos() {
                var foto = fotosFlickrArray[countMontaArrayFotos];
                
                // montar array só se não existe uma foto igual na coleção FotosFlickr
                if (FotosFlickr.findOne({flickrId: foto.id})){
                    console.log('foto encontrada: ' + foto.id);
                    countMontaArrayFotos++;
                    montaArrayFotos();
                    return;
                }
                
                $.when($.ajax({
                    url: REST_FOTOS_SIZE_FLICKR_PARTE_1 + '&photo_id=' + foto.id + REST_FOTOS_SIZE_FLICKR_PARTE_2,
                    crossDomain: true
                })).then(function (data, textStatus, jqXHR) {


//                    console.log('foto.id:');
//                    console.log(foto.id);
                    console.log(data);
                    if (data.sizes) {
                        var urlSize320 = data.sizes.size[4].source;
                        var urlOriginal = data.sizes.size[data.sizes.size.length - 1].source;
                    }
//                    console.log(textStatus);
//                    console.log(jqXHR.status);
//                    getFotoDescriptionFlickr(foto.id);


                    console.log("countMontaArrayFotos:");
                    console.log(countMontaArrayFotos);
                    fotosArray.push({flickrId: foto.id, urlSize320: urlSize320, urlOriginal: urlOriginal});
                    if (countMontaArrayFotos === fotosFlickrArray.length - 1) {
                        console.log("fotosArray:");
                        console.log(fotosArray);
                        countMontaArrayFotos++;
                        _.each(fotosArray, function (foto) {
                            console.log('entrou getFotoDescriptionFlickr');
                            console.log('foto:');
                            console.log(foto);



                            var url = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=" + API_KEY + "&photo_id=" + foto.flickrId + "&format=json&nojsoncallback=1";

                            $.when($.ajax(url)).then(function (data, textStatus, jqXHR) {
//        alert(jqXHR.status); // Alerts 200
                                console.log('foto.flickrId:');
                                console.log(foto.flickrId);
                                var descricao = data.photo.description._content;
                                foto.descricao = descricao;
                                FotosFlickr.insert(foto);
//        console.log(textStatus);


                            });
                        });
                        return;
                    } else {
                        countMontaArrayFotos++;
                        montaArrayFotos();
                    }



                });
            }

//            function getFotoDescriptionFlickr(foto) {
//                console.log('entrou getFotoDescriptionFlickr');
//                console.log('foto:');
//                console.log(foto);
//
//
//
//
//                var url = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=" + API_KEY + "&photo_id=" + foto.id + "&format=json&nojsoncallback=1";
//
//                $.when($.ajax(url)).then(function (data, textStatus, jqXHR) {
////        alert(jqXHR.status); // Alerts 200
//                    console.log('foto.id:');
//                    console.log(foto.id);
//                    console.log(data.photo.description._content);
////        console.log(textStatus);
//
//
//                });
//
//            }



            montaArrayFotos();
//            getFotosDescriptionFlickr(fotosArray)


//            }

//            console.log(data.photos.photo);
            console.log(textStatus);
        });
    }
});


