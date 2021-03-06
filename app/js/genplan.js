/*  Функция выбора этажа на основном экране
    stepPlanId - айдишник дива с картой соответствующего этажа
    stepPlanImageId - айдишник изображения в этом диве, чтобы по нему синициировать maphilight (подсветку участков)
    currentId - айдишник дива обертки основного экрана, чтобы сделать его невидимым
    stepNumber - конкретный этаж, чтобы его записать в аттрибут "data-step", чтобы производить с ним даольнейшие вычисления
*/
function selectStep(stepPlanId, stepPlanImageId, currentId, stepNumber){
    $("#select-apartment-by-genplan").prepend($(".map-steps-wrapper").clone());
    $(".map-steps-content").first().prepend($("#" + stepPlanId).clone());
    $(".map-steps-wrapper").first().addClass('map-current');
    $(".map-steps-wrapper").first().attr('data-step', stepNumber);
    $('#' + stepPlanImageId).maphilight({
        fillColor: '00cbff',
        fillOpacity: 0.8
    });
    $('#' + currentId).addClass('map-previous');
    window.location.hash="select-apartment-by-genplan";
};

/*  Функция выбора квартиры на карте этажа
    number - порядковый номер квартиры именно на этом этаже (от 01 до 12)
    dir - название папки с картинками квартир
    Внимание!!! Чтобы данный скрипт работал, картинки должны называться также, как переменная number. Например 01.png, 05.png и т.д.
*/
function selectKvartira(number){
    step = parseInt($(".map-steps-wrapper").first().attr('data-step'));
    var dir;
    if (step == 1)
        dir = "1/";
    if ( 2 <= step && step <= 5)
        dir = "2-5/";
    if ( 6 <= step && step <= 8)
        dir = "6-8/";
    if ( 9 <= step && step <= 11)
        dir = "9-11/";
    if ( 12 <= step && step <= 16)
        dir = "12-16/";
    if ( 17 <= step && step <= 24)
        dir = "17-24/";
    if (step == 25)
        dir = "25/";
    $(".map-current").addClass('map-previous');
    $("#select-apartment-by-genplan").prepend($(".map-steps-wrapper").first().clone());
    $(".map-steps-wrapper").first().removeClass('map-previous');
    $(".map-steps-wrapper").first().addClass('map-current');
    $(".map-steps-content").first().html("");
    $(".map-steps-content").first().prepend($(".map-kvartira-more").clone());
    $(".map-kvartira-more-img").first().prepend("<img src='img/steps/" + dir + number + ".png' class='img-responsive'>")


};

// Функция возвращения к предыдущему экрану. Настоящий экран удаляется, предыдущий становится видимым
function mapBack(){
    $(".map-previous").first().removeClass('map-previous');
    $(".map-current").first().remove();
    window.location.hash="select-apartment";
}


/*  Функция наведения на квартиру на карте этажа. Функция напрямую связано с массивом квартир.
    number - порядковый номер квартиры именно на этом этаже (от 01 до 12)
*/
function kvartiraOver(number){
    var step = parseInt($(".map-steps-wrapper").first().attr('data-step'));
    var kvar;
    if(step == 1)
        kvar = number;
    else
        kvar = 12 * (step-1) + number - 1;
    var kvarNumber = kvartiraArray[kvar-1].split(';')[0];
    var kvarPloshad = kvartiraArray[kvar-1].split(';')[1];
    var kvarPrice = kvartiraArray[kvar-1].split(';')[2];
    var kverOtdelka = kvartiraArray[kvar-1].split(';')[3];
    $("#kvartira-number").html("# " + kvarNumber);
    $("#kvartira-ploshad").html(kvarPloshad);
    $("#kvartira-price").html(kvarPrice);
    $("#kvartira-otdelka").html(kverOtdelka);
}
    

// Массив квартир.
var kvartiraArray = [
    '1;57.8 м;3 583 600 руб.;нет', //1 этаж
    '2;57.8 м;3 583 600 руб.;нет', //1 этаж
    '3;57.8 м;3 583 600 руб.;нет', //1 этаж
    '4;57.8 м;3 583 600 руб.;нет', //1 этаж
    '5;57.8 м;3 583 600 руб.;нет', //1 этаж
    '6;57.8 м;3 583 600 руб.;нет', //1 этаж
    '7;57.8 м;3 583 600 руб.;нет', //1 этаж
    '8;57.8 м;3 583 600 руб.;нет', //1 этаж
    '9;57.8 м;3 583 600 руб.;нет', //1 этаж
    '10;57.8 м;3 583 600 руб.;нет', //1 этаж
    '11;57.8 м;3 583 600 руб.;нет', //1 этаж
    '12;57.8 м;3 583 600 руб.;нет', //2 этаж
    '13;57.8 м;3 583 600 руб.;нет', //2 этаж
    '14;57.8 м;3 583 600 руб.;нет', //2 этаж
    '15;57.8 м;3 583 600 руб.;нет', //2 этаж
    '16;57.8 м;3 583 600 руб.;нет', //2 этаж
    '17;57.8 м;3 583 600 руб.;нет', //2 этаж
    '18;57.8 м;3 583 600 руб.;нет', //2 этаж
    '19;57.8 м;3 583 600 руб.;нет', //2 этаж
    '20;57.8 м;3 583 600 руб.;нет', //2 этаж
    '21;57.8 м;3 583 600 руб.;нет', //2 этаж
    '22;57.8 м;3 583 600 руб.;нет', //2 этаж
    '23;57.8 м;3 583 600 руб.;нет', //2 этаж
    '24;57.8 м;3 583 600 руб.;нет', //3 этаж
    '25;57.8 м;3 583 600 руб.;нет', //3 этаж
    '26;57.8 м;3 583 600 руб.;нет', //3 этаж
    '27;57.8 м;3 583 600 руб.;нет', //3 этаж
    '28;57.8 м;3 583 600 руб.;нет', //3 этаж
    '29;57.8 м;3 583 600 руб.;нет', //3 этаж
    '30;57.8 м;3 583 600 руб.;нет', //3 этаж
    '31;57.8 м;3 583 600 руб.;нет', //3 этаж
    '32;57.8 м;3 583 600 руб.;нет', //3 этаж
    '33;57.8 м;3 583 600 руб.;нет', //3 этаж
    '34;57.8 м;3 583 600 руб.;нет', //3 этаж
    '35;57.8 м;3 583 600 руб.;нет', //3 этаж
    '36;57.8 м;3 583 600 руб.;нет', //4 этаж
    '37;57.8 м;3 583 600 руб.;нет', //4 этаж
    '38;57.8 м;3 583 600 руб.;нет', //4 этаж
    '39;57.8 м;3 583 600 руб.;нет', //4 этаж
    '40;57.8 м;3 583 600 руб.;нет', //4 этаж
    '41;57.8 м;3 583 600 руб.;нет', //4 этаж
    '42;57.8 м;3 583 600 руб.;нет', //4 этаж
    '43;57.8 м;3 583 600 руб.;нет', //4 этаж
    '44;57.8 м;3 583 600 руб.;нет', //4 этаж
    '45;57.8 м;3 583 600 руб.;нет', //4 этаж
    '46;57.8 м;3 583 600 руб.;нет', //4 этаж
    '47;57.8 м;3 583 600 руб.;нет', //4 этаж
    '48;57.8 м;3 583 600 руб.;нет', //5 этаж
    '49;57.8 м;3 583 600 руб.;нет', //5 этаж
    '50;57.8 м;3 583 600 руб.;нет', //5 этаж
    '51;57.8 м;3 583 600 руб.;нет', //5 этаж
    '52;57.8 м;3 583 600 руб.;нет', //5 этаж
    '53;57.8 м;3 583 600 руб.;нет', //5 этаж
    '54;57.8 м;3 583 600 руб.;нет', //5 этаж
    '55;57.8 м;3 583 600 руб.;нет', //5 этаж
    '56;57.8 м;3 583 600 руб.;нет', //5 этаж
    '57;57.8 м;3 583 600 руб.;нет', //5 этаж
    '58;57.8 м;3 583 600 руб.;нет', //5 этаж
    '59;57.8 м;3 583 600 руб.;нет', //5 этаж
    '60;57.8 м;3 583 600 руб.;нет', //6 этаж
    '61;57.8 м;3 583 600 руб.;нет', //6 этаж
    '62;57.8 м;3 583 600 руб.;нет', //6 этаж
    '63;57.8 м;3 583 600 руб.;нет', //6 этаж
    '64;57.8 м;3 583 600 руб.;нет', //6 этаж
    '65;57.8 м;3 583 600 руб.;нет', //6 этаж
    '66;57.8 м;3 583 600 руб.;нет', //6 этаж
    '67;57.8 м;3 583 600 руб.;нет', //6 этаж
    '68;57.8 м;3 583 600 руб.;нет', //6 этаж
    '69;57.8 м;3 583 600 руб.;нет', //6 этаж
    '70;57.8 м;3 583 600 руб.;нет', //6 этаж
    '71;57.8 м;3 583 600 руб.;нет', //6 этаж
    '72;57.8 м;3 583 600 руб.;нет', //7 этаж
    '73;57.8 м;3 583 600 руб.;нет', //7 этаж
    '74;57.8 м;3 583 600 руб.;нет', //7 этаж
    '75;57.8 м;3 583 600 руб.;нет', //7 этаж
    '76;57.8 м;3 583 600 руб.;нет', //7 этаж
    '77;57.8 м;3 583 600 руб.;нет', //7 этаж
    '78;57.8 м;3 583 600 руб.;нет', //7 этаж
    '79;57.8 м;3 583 600 руб.;нет', //7 этаж
    '80;57.8 м;3 583 600 руб.;нет', //7 этаж
    '81;57.8 м;3 583 600 руб.;нет', //7 этаж
    '82;57.8 м;3 583 600 руб.;нет', //7 этаж
    '83;57.8 м;3 583 600 руб.;нет', //7 этаж
    '84;57.8 м;3 583 600 руб.;нет', //8 этаж
    '85;57.8 м;3 583 600 руб.;нет', //8 этаж
    '86;57.8 м;3 583 600 руб.;нет', //8 этаж
    '87;57.8 м;3 583 600 руб.;нет', //8 этаж
    '88;57.8 м;3 583 600 руб.;нет', //8 этаж
    '89;57.8 м;3 583 600 руб.;нет', //8 этаж
    '90;57.8 м;3 583 600 руб.;нет', //8 этаж
    '91;57.8 м;3 583 600 руб.;нет', //8 этаж
    '92;57.8 м;3 583 600 руб.;нет', //8 этаж
    '93;57.8 м;3 583 600 руб.;нет', //8 этаж
    '94;57.8 м;3 583 600 руб.;нет', //8 этаж
    '95;57.8 м;3 583 600 руб.;нет', //8 этаж
    '96;57.8 м;3 583 600 руб.;нет', //9 этаж
    '97;57.8 м;3 583 600 руб.;нет', //9 этаж
    '98;57.8 м;3 583 600 руб.;нет', //9 этаж
    '99;57.8 м;3 583 600 руб.;нет', //9 этаж
    '100;57.8 м;3 583 600 руб.;нет', //9 этаж
    '101;57.8 м;3 583 600 руб.;нет', //9 этаж
    '102;57.8 м;3 583 600 руб.;нет', //9 этаж
    '103;57.8 м;3 583 600 руб.;нет', //9 этаж
    '104;57.8 м;3 583 600 руб.;нет', //9 этаж
    '105;57.8 м;3 583 600 руб.;нет', //9 этаж
    '106;57.8 м;3 583 600 руб.;нет', //9 этаж
    '107;57.8 м;3 583 600 руб.;нет', //9 этаж
    '108;57.8 м;3 583 600 руб.;нет', //10 этаж
    '109;57.8 м;3 583 600 руб.;нет', //10 этаж
    '110;57.8 м;3 583 600 руб.;нет', //10 этаж
    '111;57.8 м;3 583 600 руб.;нет', //10 этаж
    '112;57.8 м;3 583 600 руб.;нет', //10 этаж
    '113;57.8 м;3 583 600 руб.;нет', //10 этаж
    '114;57.8 м;3 583 600 руб.;нет', //10 этаж
    '115;57.8 м;3 583 600 руб.;нет', //10 этаж
    '116;57.8 м;3 583 600 руб.;нет', //10 этаж
    '117;57.8 м;3 583 600 руб.;нет', //10 этаж
    '118;57.8 м;3 583 600 руб.;нет', //10 этаж
    '119;57.8 м;3 583 600 руб.;нет', //10 этаж
    '120;57.8 м;3 583 600 руб.;нет', //11 этаж
    '121;57.8 м;3 583 600 руб.;нет', //11 этаж
    '122;57.8 м;3 583 600 руб.;нет', //11 этаж
    '123;57.8 м;3 583 600 руб.;нет', //11 этаж
    '124;57.8 м;3 583 600 руб.;нет', //11 этаж
    '125;57.8 м;3 583 600 руб.;нет', //11 этаж
    '126;57.8 м;3 583 600 руб.;нет', //11 этаж
    '127;57.8 м;3 583 600 руб.;нет', //11 этаж
    '128;57.8 м;3 583 600 руб.;нет', //11 этаж
    '129;57.8 м;3 583 600 руб.;нет', //11 этаж
    '130;57.8 м;3 583 600 руб.;нет', //11 этаж
    '131;57.8 м;3 583 600 руб.;нет', //11 этаж
    '132;57.8 м;3 583 600 руб.;нет', //12 этаж
    '133;57.8 м;3 583 600 руб.;нет', //12 этаж
    '134;57.8 м;3 583 600 руб.;нет', //12 этаж
    '135;57.8 м;3 583 600 руб.;нет', //12 этаж
    '136;57.8 м;3 583 600 руб.;нет', //12 этаж
    '137;57.8 м;3 583 600 руб.;нет', //12 этаж
    '138;57.8 м;3 583 600 руб.;нет', //12 этаж
    '139;57.8 м;3 583 600 руб.;нет', //12 этаж
    '140;57.8 м;3 583 600 руб.;нет', //12 этаж
    '141;57.8 м;3 583 600 руб.;нет', //12 этаж
    '142;57.8 м;3 583 600 руб.;нет', //12 этаж
    '143;57.8 м;3 583 600 руб.;нет', //12 этаж
    '144;57.8 м;3 583 600 руб.;нет', //13 этаж
    '145;57.8 м;3 583 600 руб.;нет', //13 этаж
    '146;57.8 м;3 583 600 руб.;нет', //13 этаж
    '147;57.8 м;3 583 600 руб.;нет', //13 этаж
    '148;57.8 м;3 583 600 руб.;нет', //13 этаж
    '149;57.8 м;3 583 600 руб.;нет', //13 этаж
    '150;57.8 м;3 583 600 руб.;нет', //13 этаж
    '151;57.8 м;3 583 600 руб.;нет', //13 этаж
    '152;57.8 м;3 583 600 руб.;нет', //13 этаж
    '153;57.8 м;3 583 600 руб.;нет', //13 этаж
    '154;57.8 м;3 583 600 руб.;нет', //13 этаж
    '155;57.8 м;3 583 600 руб.;нет', //13 этаж
    '156;57.8 м;3 583 600 руб.;нет', //14 этаж
    '157;57.8 м;3 583 600 руб.;нет', //14 этаж
    '158;57.8 м;3 583 600 руб.;нет', //14 этаж
    '159;57.8 м;3 583 600 руб.;нет', //14 этаж
    '160;57.8 м;3 583 600 руб.;нет', //14 этаж
    '161;57.8 м;3 583 600 руб.;нет', //14 этаж
    '162;57.8 м;3 583 600 руб.;нет', //14 этаж
    '163;57.8 м;3 583 600 руб.;нет', //14 этаж
    '164;57.8 м;3 583 600 руб.;нет', //14 этаж
    '165;57.8 м;3 583 600 руб.;нет', //14 этаж
    '166;57.8 м;3 583 600 руб.;нет', //14 этаж
    '167;57.8 м;3 583 600 руб.;нет', //14 этаж
    '168;57.8 м;3 583 600 руб.;нет', //15 этаж
    '169;57.8 м;3 583 600 руб.;нет', //15 этаж
    '170;57.8 м;3 583 600 руб.;нет', //15 этаж
    '171;57.8 м;3 583 600 руб.;нет', //15 этаж
    '172;57.8 м;3 583 600 руб.;нет', //15 этаж
    '173;57.8 м;3 583 600 руб.;нет', //15 этаж
    '174;57.8 м;3 583 600 руб.;нет', //15 этаж
    '175;57.8 м;3 583 600 руб.;нет', //15 этаж
    '176;57.8 м;3 583 600 руб.;нет', //15 этаж
    '177;57.8 м;3 583 600 руб.;нет', //15 этаж
    '178;57.8 м;3 583 600 руб.;нет', //15 этаж
    '179;57.8 м;3 583 600 руб.;нет', //15 этаж
    '180;57.8 м;3 583 600 руб.;нет', //16 этаж
    '181;57.8 м;3 583 600 руб.;нет', //16 этаж
    '182;57.8 м;3 583 600 руб.;нет', //16 этаж
    '183;57.8 м;3 583 600 руб.;нет', //16 этаж
    '184;57.8 м;3 583 600 руб.;нет', //16 этаж
    '185;57.8 м;3 583 600 руб.;нет', //16 этаж
    '186;57.8 м;3 583 600 руб.;нет', //16 этаж
    '187;57.8 м;3 583 600 руб.;нет', //16 этаж
    '188;57.8 м;3 583 600 руб.;нет', //16 этаж
    '189;57.8 м;3 583 600 руб.;нет', //16 этаж
    '190;57.8 м;3 583 600 руб.;нет', //16 этаж
    '191;57.8 м;3 583 600 руб.;нет', //16 этаж
    '192;57.8 м;3 583 600 руб.;нет', //17 этаж
    '193;57.8 м;3 583 600 руб.;нет', //17 этаж
    '194;57.8 м;3 583 600 руб.;нет', //17 этаж
    '195;57.8 м;3 583 600 руб.;нет', //17 этаж
    '196;57.8 м;3 583 600 руб.;нет', //17 этаж
    '197;57.8 м;3 583 600 руб.;нет', //17 этаж
    '198;57.8 м;3 583 600 руб.;нет', //17 этаж
    '199;57.8 м;3 583 600 руб.;нет', //17 этаж
    '200;57.8 м;3 583 600 руб.;нет', //17 этаж
    '201;57.8 м;3 583 600 руб.;нет', //17 этаж
    '202;57.8 м;3 583 600 руб.;нет', //17 этаж
    '203;57.8 м;3 583 600 руб.;нет', //17 этаж
    '204;57.8 м;3 583 600 руб.;нет', //18 этаж
    '205;57.8 м;3 583 600 руб.;нет', //18 этаж
    '206;57.8 м;3 583 600 руб.;нет', //18 этаж
    '207;57.8 м;3 583 600 руб.;нет', //18 этаж
    '208;57.8 м;3 583 600 руб.;нет', //18 этаж
    '209;57.8 м;3 583 600 руб.;нет', //18 этаж
    '210;57.8 м;3 583 600 руб.;нет', //18 этаж
    '211;57.8 м;3 583 600 руб.;нет', //18 этаж
    '212;57.8 м;3 583 600 руб.;нет', //18 этаж
    '213;57.8 м;3 583 600 руб.;нет', //18 этаж
    '214;57.8 м;3 583 600 руб.;нет', //18 этаж
    '215;57.8 м;3 583 600 руб.;нет', //18 этаж
    '216;57.8 м;3 583 600 руб.;нет', //19 этаж
    '217;57.8 м;3 583 600 руб.;нет', //19 этаж
    '218;57.8 м;3 583 600 руб.;нет', //19 этаж
    '219;57.8 м;3 583 600 руб.;нет', //19 этаж
    '220;57.8 м;3 583 600 руб.;нет', //19 этаж
    '221;57.8 м;3 583 600 руб.;нет', //19 этаж
    '222;57.8 м;3 583 600 руб.;нет', //19 этаж
    '223;57.8 м;3 583 600 руб.;нет', //19 этаж
    '224;57.8 м;3 583 600 руб.;нет', //19 этаж
    '225;57.8 м;3 583 600 руб.;нет', //19 этаж
    '226;57.8 м;3 583 600 руб.;нет', //19 этаж
    '227;57.8 м;3 583 600 руб.;нет', //19 этаж
    '228;57.8 м;3 583 600 руб.;нет', //20 этаж
    '229;57.8 м;3 583 600 руб.;нет', //20 этаж
    '230;57.8 м;3 583 600 руб.;нет', //20 этаж
    '231;57.8 м;3 583 600 руб.;нет', //20 этаж
    '232;57.8 м;3 583 600 руб.;нет', //20 этаж
    '233;57.8 м;3 583 600 руб.;нет', //20 этаж
    '234;57.8 м;3 583 600 руб.;нет', //20 этаж
    '235;57.8 м;3 583 600 руб.;нет', //20 этаж
    '236;57.8 м;3 583 600 руб.;нет', //20 этаж
    '237;57.8 м;3 583 600 руб.;нет', //20 этаж
    '238;57.8 м;3 583 600 руб.;нет', //20 этаж
    '239;57.8 м;3 583 600 руб.;нет', //20 этаж
    '240;57.8 м;3 583 600 руб.;нет', //21 этаж
    '241;57.8 м;3 583 600 руб.;нет', //21 этаж
    '242;57.8 м;3 583 600 руб.;нет', //21 этаж
    '243;57.8 м;3 583 600 руб.;нет', //21 этаж
    '244;57.8 м;3 583 600 руб.;нет', //21 этаж
    '245;57.8 м;3 583 600 руб.;нет', //21 этаж
    '246;57.8 м;3 583 600 руб.;нет', //21 этаж
    '247;57.8 м;3 583 600 руб.;нет', //21 этаж
    '248;57.8 м;3 583 600 руб.;нет', //21 этаж
    '249;57.8 м;3 583 600 руб.;нет', //21 этаж
    '250;57.8 м;3 583 600 руб.;нет', //21 этаж
    '251;57.8 м;3 583 600 руб.;нет', //21 этаж
    '252;57.8 м;3 583 600 руб.;нет', //22 этаж
    '253;57.8 м;3 583 600 руб.;нет', //22 этаж
    '254;57.8 м;3 583 600 руб.;нет', //22 этаж
    '255;57.8 м;3 583 600 руб.;нет', //22 этаж
    '256;57.8 м;3 583 600 руб.;нет', //22 этаж
    '257;57.8 м;3 583 600 руб.;нет', //22 этаж
    '258;57.8 м;3 583 600 руб.;нет', //22 этаж
    '259;57.8 м;3 583 600 руб.;нет', //22 этаж
    '260;57.8 м;3 583 600 руб.;нет', //22 этаж
    '261;57.8 м;3 583 600 руб.;нет', //22 этаж
    '262;57.8 м;3 583 600 руб.;нет', //22 этаж
    '263;57.8 м;3 583 600 руб.;нет', //22 этаж
    '264;57.8 м;3 583 600 руб.;нет', //23 этаж
    '265;57.8 м;3 583 600 руб.;нет', //23 этаж
    '266;57.8 м;3 583 600 руб.;нет', //23 этаж
    '267;57.8 м;3 583 600 руб.;нет', //23 этаж
    '268;57.8 м;3 583 600 руб.;нет', //23 этаж
    '269;57.8 м;3 583 600 руб.;нет', //23 этаж
    '270;57.8 м;3 583 600 руб.;нет', //23 этаж
    '271;57.8 м;3 583 600 руб.;нет', //23 этаж
    '272;57.8 м;3 583 600 руб.;нет', //23 этаж
    '273;57.8 м;3 583 600 руб.;нет', //23 этаж
    '274;57.8 м;3 583 600 руб.;нет', //23 этаж
    '275;57.8 м;3 583 600 руб.;нет', //23 этаж
    '276;57.8 м;3 583 600 руб.;нет', //24 этаж
    '277;57.8 м;3 583 600 руб.;нет', //24 этаж
    '278;57.8 м;3 583 600 руб.;нет', //24 этаж
    '279;57.8 м;3 583 600 руб.;нет', //24 этаж
    '280;57.8 м;3 583 600 руб.;нет', //24 этаж
    '281;57.8 м;3 583 600 руб.;нет', //24 этаж
    '282;57.8 м;3 583 600 руб.;нет', //24 этаж
    '283;57.8 м;3 583 600 руб.;нет', //24 этаж
    '284;57.8 м;3 583 600 руб.;нет', //24 этаж
    '285;57.8 м;3 583 600 руб.;нет', //24 этаж
    '286;57.8 м;3 583 600 руб.;нет', //24 этаж
    '287;57.8 м;3 583 600 руб.;нет', //24 этаж
    '288;57.8 м;3 583 600 руб.;нет', //25 этаж
    '289;57.8 м;3 583 600 руб.;нет', //25 этаж
    '290;57.8 м;3 583 600 руб.;нет', //25 этаж
    '291;57.8 м;3 583 600 руб.;нет', //25 этаж
    '292;57.8 м;3 583 600 руб.;нет', //25 этаж
    '293;57.8 м;3 583 600 руб.;нет', //25 этаж
    '294;57.8 м;3 583 600 руб.;нет', //25 этаж
    '295;57.8 м;3 583 600 руб.;нет', //25 этаж
    '296;57.8 м;3 583 600 руб.;нет', //25 этаж
    '297;57.8 м;3 583 600 руб.;нет', //25 этаж
    '298;57.8 м;3 583 600 руб.;нет', //25 этаж
    '299;57.8 м;3 583 600 руб.;нет' //25 этаж
];



/*Тултипы на генплане*/
function move(e, b, r) //для получения координат мышки
{
    e = e || window.event
    if (e.pageX == null && e.clientX != null) {
        var html = document.documentElement
        var body = document.body
        e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
        e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
    }
    //устанавливаем тултип на уровне мышки
    $('.tool').css('left', e.pageX + 15 + r + 'px');
    $('.tool').css('top', e.pageY + 15 - b + 'px');
}

function out() {
    document.body.removeChild(tooltips);
}
$(document).ready(function() {
    $('map area').hover(function() {}, function() {
        $(".tool").remove();
    });
});
var mapMainPlanArray = [
    '1 Этаж;13 квартип;от 2 153 000 руб.',
    '2 Этаж;13 квартип;от 2 153 000 руб.',
    '3 Этаж;13 квартип;от 2 153 000 руб.', 
    '4 Этаж;13 квартип;от 2 153 000 руб.',
    '5 Этаж;13 квартип;от 2 153 000 руб.',
    '6 Этаж;13 квартип;от 2 153 000 руб.',
    '7 Этаж;13 квартип;от 2 153 000 руб.',
    '8 Этаж;13 квартип;от 2 153 000 руб.',
    '9 Этаж;13 квартип;от 2 153 000 руб.',
    '10 Этаж;13 квартип;от 2 153 000 руб.',
    '11 Этаж;13 квартип;от 2 153 000 руб.',
    '12 Этаж;13 квартип;от 2 153 000 руб.',
    '13 Этаж;13 квартип;от 2 153 000 руб.',
    '14 Этаж;13 квартип;от 2 153 000 руб.',
    '15 Этаж;13 квартип;от 2 153 000 руб.',
    '16 Этаж;13 квартип;от 2 153 000 руб.',
    '17 Этаж;13 квартип;от 2 153 000 руб.',
    '18 Этаж;13 квартип;от 2 153 000 руб.',
    '19 Этаж;13 квартип;от 2 153 000 руб.',
    '20 Этаж;13 квартип;от 2 153 000 руб.',
    '21 Этаж;13 квартип;от 2 153 000 руб.',
    '22 Этаж;13 квартип;от 2 153 000 руб.',
    '23 Этаж;13 квартип;от 2 153 000 руб.',
    '24 Этаж;13 квартип;от 2 153 000 руб.',
    '25 Этаж;13 квартип;от 2 153 000 руб.'
];
function over(tip){ //функция при наведении
    //обрабатываем массив с данными
    data = mapMainPlanArray[tip-1];
    data = data.split(';');
    step = data[0];
    countOfApartments = data[1];
    price = data[2];
    //добавляем тултип
    $('<div class="tool"></div>').appendTo('body').html(step + ", " + countOfApartments + ", " + price);
    move(0, 0, 0);
};