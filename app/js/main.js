$(document).ready(function(){
    // Анимация при попадании элемента в экран.
    new WOW().init({
        mobile: true
    });

    // Маски для форм
    $("#consulting-telephone").mask("+7 (000) 000-00-00")
    $("#floor-from").mask("00");
    $("#floor-to").mask("00");
    $("#area-from").mask("00");
    $("#area-to").mask("00");
    $("#price-from").mask("0000000");
    $("#price-to").mask("0000000");

    // Слайдеры
    $("#apartment-carousel").owlCarousel({
        items: 1,
        nav: true,
        rewind: true
      });
      $("#personal-carousel").owlCarousel({
        items: 1,
        nav: true,
        rewind: true
      });
});

var floorRange = document.getElementById('floorRange');
var areaRange = document.getElementById('areaRange');
var priceRange = document.getElementById('priceRange');
if (floorRange != null) {
    noUiSlider.create(floorRange, {
        start: [1, 25],
        connect: true,
        step: 1,
        format: wNumb({
            decimals: 0
        }),
        range: {
            'min': 1,
            'max': 25
        }
    });
    noUiSlider.create(areaRange, {
        start: [27, 72],
        connect: true,
        step: 1,
        format: wNumb({
            decimals: 0
        }),
        range: {
            'min': 27,
            'max': 72
        }
    });
    noUiSlider.create(priceRange, {
        start: [1700000, 4000000],
        connect: true,
        step: 50000,
        format: wNumb({
            decimals: 0
        }),
        range: {
            'min': 1700000,
            'max': 4000000
        }
    });


    floorRange.noUiSlider.on('slide', function() {
        $('#floor-from').val(floorRange.noUiSlider.get()[0])
        $('#floor-to').val(floorRange.noUiSlider.get()[1])
    });
    areaRange.noUiSlider.on('slide', function() {
        $('#area-from').val(areaRange.noUiSlider.get()[0])
        $('#area-to').val(areaRange.noUiSlider.get()[1])
    });
    priceRange.noUiSlider.on('slide', function() {
        $('#price-from').val(priceRange.noUiSlider.get()[0].toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '))
        $('#price-to').val(priceRange.noUiSlider.get()[1].toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '))
    });
    $('#price-from').on("change", function(){
        var value = parseInt($(this).val().replace(/\s/gi, ''));
        priceRange.noUiSlider.set([value,]);
        $(this).val($(this).val().toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    });
    $('#price-to').on("change", function(){
        var value = parseInt($(this).val().replace(/\s/gi, ''));
        priceRange.noUiSlider.set([,value]);
        $(this).val($(this).val().toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    });

    $('#floor-from').on("change", function(){
        var value = parseInt($(this).val().replace(/\s/gi, ''));
        floorRange.noUiSlider.set([value,]);
    });
    $('#floor-to').on("change", function(){
        var value = parseInt($(this).val().replace(/\s/gi, ''));
        floorRange.noUiSlider.set([,value]);
    });

    $('#area-from').on("change", function(){
        var value = parseInt($(this).val().replace(/\s/gi, ''));
        areaRange.noUiSlider.set([value,]);
    });
    $('#area-to').on("change", function(){
        var value = parseInt($(this).val().replace(/\s/gi, ''));
        areaRange.noUiSlider.set([,value]);
    });
}




/*Карта*/

    // Создает обработчик события window.onLoad
    ymaps.ready(function() {
        // Создает экземпляр карты и привязывает его к созданному контейнеру
        var map = new ymaps.Map("YMapsID", {
                center: [43.104452, 131.953846],
                zoom: 16
                    //controls: ['zoomControl']
            }),
            traffic = new ymaps.control.TrafficControl();

        map.controls.add(traffic);
        traffic.showTraffic();

        map.behaviors.disable('scrollZoom');
        map.controls.remove('zoomControl');

        placemark = new ymaps.Placemark(
            [43.102661, 131.955967], { iconContent: "", iconContentSize: [300, 100] }, { preset: 'islands#blueCircleIcon' }
        );

        var coords = [43.102661, 131.955967],
            placemark1 = new ymaps.GeoObjectCollection({}, {
                iconLayout: 'default#image',
                iconImageClipRect: [
                    [0, 0],
                    [35, 39]
                ],
                iconImageHref: 'img/map/marker_fregat.jpg',
                iconImageSize: [35, 39],
                iconImageOffset: [-35, -39]
            });
        placemark1.add(new ymaps.Placemark(coords));


        coords = [
            [43.105209, 131.954754],
            [43.111469, 131.936671],
            [43.103254, 131.959299],
            [43.101187, 131.940956],
            [43.101187, 131.940956]
        ];
        placemark2 = new ymaps.GeoObjectCollection({}, {
            iconLayout: 'default#image',
            iconImageClipRect: [
                [0, 0],
                [37, 55]
            ],
            iconImageHref: 'img/map/marker_gym.png',
            iconImageSize: [27, 45],
            iconImageOffset: [-37, -55]
        });
        for (var i = 0; i < coords.length; i++) { placemark2.add(new ymaps.Placemark(coords[i])); }

        coords = [
            [43.107303, 131.956084],
            [43.104281, 131.94949],
            [43.108609, 131.944649]
        ];
        placemark3 = new ymaps.GeoObjectCollection({}, {
            iconLayout: 'default#image',
            iconImageClipRect: [
                [0, 0],
                [36, 54]
            ],
            iconImageHref: 'img/map/marker_book.png',
            iconImageSize: [26, 44],
            iconImageOffset: [-36, -54]
        });
        for (i = 0; i < coords.length; i++) { placemark3.add(new ymaps.Placemark(coords[i])); }

        coords = [
            [43.108735, 131.957141],
            [43.102644, 131.945976],
            [43.102361, 131.946746],
            [43.105188, 131.956964],
            [43.103097, 131.942869],
            [43.104222, 131.952176]
        ];
        placemark4 = new ymaps.GeoObjectCollection({}, {
            iconLayout: 'default#image',
            iconImageClipRect: [
                [0, 0],
                [44, 58]
            ],
            iconImageHref: 'img/map/marker_horse.png',
            iconImageSize: [34, 48],
            iconImageOffset: [-44, -58]
        });
        for (i = 0; i < coords.length; i++) { placemark4.add(new ymaps.Placemark(coords[i])); }

        coords = [
            [43.10488, 131.958823],
            [43.103778, 131.960223],
            [43.102023, 131.952265],
            [43.102734, 131.958527],
            [43.101486, 131.951544]
        ];
        placemark5 = new ymaps.GeoObjectCollection({}, {
            iconLayout: 'default#image',
            iconImageClipRect: [
                [0, 0],
                [36, 55]
            ],
            iconImageHref: 'img/map/marker_shop.png',
            iconImageSize: [26, 45],
            iconImageOffset: [-36, -55]
        });
        for (i = 0; i < coords.length; i++) { placemark5.add(new ymaps.Placemark(coords[i])); }

        coords = [
            [43.107177, 131.943408],
            [43.100167, 131.950568]
        ];
        placemark6 = new ymaps.GeoObjectCollection({}, {
            iconLayout: 'default#image',
            iconImageClipRect: [
                [0, 0],
                [36, 55]
            ],
            iconImageHref: 'img/map/marker_hospital.png',
            iconImageSize: [26, 45],
            iconImageOffset: [-36, -55]
        });
        for (i = 0; i < coords.length; i++) { placemark6.add(new ymaps.Placemark(coords[i])); }

        coords = [
            [43.102491, 131.940165],
            [43.10619, 131.956425],
            [43.107214, 131.942987],
            [43.105739, 131.942575],
            [43.103853, 131.946337],
            [43.101523, 131.945043],
            [43.10619, 131.956425],
            [43.105775, 131.942716]
        ];
        placemark7 = new ymaps.GeoObjectCollection({}, {
            iconLayout: 'default#image',
            iconImageClipRect: [
                [0, 0],
                [37, 55]
            ],
            iconImageHref: 'img/map/marker_apteka.png',
            iconImageSize: [27, 45],
            iconImageOffset: [-37, -55]
        });
        for (i = 0; i < coords.length; i++) { placemark7.add(new ymaps.Placemark(coords[i])); }

        coords = [
            [43.105045, 131.955733]
        ];
        placemark8 = new ymaps.GeoObjectCollection({}, {
            iconLayout: 'default#image',
            iconImageClipRect: [
                [0, 0],
                [37, 55]
            ],
            iconImageHref: 'img/map/marker_baby.png',
            iconImageSize: [27, 45],
            iconImageOffset: [-37, -55]
        });
        for (i = 0; i < coords.length; i++) { placemark8.add(new ymaps.Placemark(coords[i])); }

        coords = [
            [43.101106, 131.952406],
            [43.101734, 131.948654],
            [43.10632, 131.956538],
            [43.100944, 131.949177],
            [43.10619, 131.956425]
        ];
        placemark9 = new ymaps.GeoObjectCollection({}, {
            iconLayout: 'default#image',
            iconImageClipRect: [
                [0, 0],
                [37, 55]
            ],
            iconImageHref: 'img/map/marker_atm.png',
            iconImageSize: [27, 45],
            iconImageOffset: [-37, -55]
        });
        for (i = 0; i < coords.length; i++) { placemark9.add(new ymaps.Placemark(coords[i])); }

        coords = [
            [43.099985, 131.959365],
            [43.098576, 131.952271],
            [43.10001, 131.96138],
            [43.109711, 131.961502]
        ];
        placemark10 = new ymaps.GeoObjectCollection({}, {
            iconLayout: 'default#image',
            iconImageClipRect: [
                [0, 0],
                [37, 55]
            ],
            iconImageHref: 'img/map/marker_gas.png',
            iconImageSize: [27, 45],
            iconImageOffset: [-37, -55]
        });
        for (i = 0; i < coords.length; i++) { placemark10.add(new ymaps.Placemark(coords[i])); }

        map.geoObjects.add(placemark).add(placemark1).add(placemark2).add(placemark3).add(placemark4).add(placemark5)
            .add(placemark6).add(placemark7).add(placemark8).add(placemark9).add(placemark10);
    });

// ................................................... /////////


// Кнопка выбора по параметрам
function selectByParams() {
    $('#select-apartment-by-params').removeClass('displaynone');
    $('#select-apartment-by-genplan').addClass('displaynone');
    $('#select-apartment-by-params-button').css({
        'background-color': '#0aaed3',
        'color': '#fff'
    });
    $('#select-apartment-by-genplan-button').css({
        'background-color': '#fafafa',
        'color': '#0aaed3'
    });
};

// кнопка выбора на генплане
function selectByGenplan() {
    $('#select-apartment-by-params').addClass('displaynone');
    $('#select-apartment-by-genplan').removeClass('displaynone');
    $('#select-apartment-by-params-button').css({
        'background-color': '#fafafa',
        'color': '#0aaed3'
    });
    $('#select-apartment-by-genplan-button').css({
        'background-color': '#0aaed3',
        'color': '#fff'
    });
     $('#map-image').maphilight({
        fillColor: '00cbff',
        fillOpacity: 0.8
    });
}


// Инициируем плеер ютуба и останавливаем видео при закрытии модального
var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('player');
}
$(document).on('closed', '.modal-video', function(e) {
    // Reason: 'confirmation', 'cancellation'
    console.log('Modal is closed' + (e.reason ? ', reason: ' + e.reason : ''));
    player.stopVideo();
});

