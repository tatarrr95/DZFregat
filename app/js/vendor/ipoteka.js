/**
 * Created by PhpStorm.
 * User: Anton Jukov
 * Date: 7/29/14
 * Time: 9:05 PM
 * Project: moskva-a101-new
 */
$(document).ready(function () {

    $('.green-button').click(function(){
        $('.calc-disc').show();
	});
    $("#sum_firstPaymentValue").change(function () {
        var value = $(this).val();
        $("#firstPaymentValue").val(value);
    }).change();

    $("#firstPaymentValue").change(function () {
        var value = $(this).val();
        $("#sum_firstPaymentValue").val(value);
    }).change();

    initializeMortgageSliders();

    if (!init_sliders)
        return false;

    var val = $("#totalPriceValue").val();
    $("#totalPriceValue").val(val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));

    val = $("#firstPaymentValue").val();
    $("#firstPaymentValue").val(val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));

    val = $("#sum_annPaymentValue").val();
    $("#sum_annPaymentValue").val(val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));

    val = $("#sum_firstPaymentValue").val();
    $("#sum_firstPaymentValue").val(val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));


    //Set relationship between totalPrice and firstPayment
    $("#totalPrice").on('slide', function() {
        roundValue('#totalPriceValue', stepPrice);
        relationshipTotalPrice();
        var val = $("#totalPriceValue").val();
        values[$(this).attr('id') + 'Value'] = val;
        $("#totalPriceValue").val(val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));

        val = $("#firstPaymentValue").val();
        $("#firstPaymentValue").val(val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    });

    $("#firstPercent").on('slide set', function() {
        relationshipFirstPercent();
    });

    $("#firstPayment").on('slide', function() {
        roundValue('#firstPayment', stepPrice);
        relationshipFirstPayment();
        var val = $("#firstPaymentValue").val();
        $("#firstPaymentValue").val(val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    });


    $("#sum_annPayment").on('slide set', function() {
        roundValue('#sum_annPayment', 5000);
        var val = $("#sum_annPaymentValue").val();
        $("#sum_annPaymentValue").val(val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    });

    $("#sum_firstPayment").on('slide set', function() {
        roundValue('#sum_firstPayment', stepPrice);
        var val = $("#sum_firstPaymentValue").val();
        $("#sum_firstPaymentValue").val(val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    });


    //Relationship
    //Percent
    $("#yearPercent").on('slide set', function() {
        $("#sum_yearPercent").noUiSlider({
            start: [$("#yearPercentValue").val()]
        }, true);
    });

    $("#sum_yearPercent").on('slide set', function() {
        $("#yearPercent").noUiSlider({
            start: [$("#sum_yearPercentValue").val()]
        }, true);
    });


    //Longtime
    $("#longTime").on('slide set', function() {
        $("#sum_longTime").noUiSlider({
            start: [$("#longTime").val()]
        }, true);
    });

    $("#sum_longTime").on('slide set', function() {
        $("#longTime").noUiSlider({
            start: [$("#sum_longTime").val()]
        }, true);
    });

    //First payment
    $("#firstPayment").on('slide set', function() {
        var val = $("#firstPaymentValue").val();
        val = val.replace(/\s/gi, '');

        $("#sum_firstPayment").noUiSlider({
            start: [val]
        }, true);

        $("#sum_firstPaymentValue").val(val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    });

    $("#sum_firstPayment").on('slide set', function() {
        roundValue('#sum_firstPayment', stepPrice);

        var val = $("#sum_firstPaymentValue").val();
        val = val.replace(/\s/gi, '');

        $("#firstPayment").noUiSlider({
            start: [val]
        }, true);

        $("#firstPaymentValue").val(val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    });

    $("#firstPayment").on('change', function() {

    });

    //Calculate income
    $("#calculateIncome").click(function() {
        var totalPrice = $("#totalPriceValue").val();
        var firstPayment = $("#firstPaymentValue").val();
        var longTime = $("#longTimeValue").val();
        var yearPercent = $("#yearPercentValue").val();
        calculateIncome(totalPrice.replace(/\s/gi, ''), firstPayment.replace(/\s/gi, ''), longTime, yearPercent);
    });

    $("#calculateTotalPrice").click(function() {
        var payment = $("#sum_annPaymentValue").val();
        var firstPayment = $("#sum_firstPaymentValue").val();

        calculateTotalPrice(payment.replace(/\s/gi, ''), firstPayment.replace(/\s/gi, ''), $("#sum_longTimeValue").val(), $("#sum_yearPercentValue").val());
    });

    //Tab switch
    $(".tabs.ipoteka .tab").click(function() {
	    
        $(this).addClass('active').siblings().removeClass('active');
        $("#" + $(this).attr('for')).addClass('active').siblings().removeClass('active');
    });

    $("#firstPaymentValue, #sum_firstPaymentValue, #totalPriceValue").on('blur', function(event) { //Not use change event because nuUiSlider full block change
        if (values[$(this).attr('id')]) {
            var value = values[$(this).attr('id')];

            //created by Alexander Mansurov
            //check input totalPrice
            //if input value > max then value = max
            //if input value < min then valut = min
            if($(this).attr('id') == 'totalPriceValue') {
                var intValue = parseInt(value.replace(/\s/gi, ''));
                if (intValue < ipoteka.totalPrice[0])
                    value = String(ipoteka.totalPrice[0]).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                else if (intValue > ipoteka.totalPrice[1])
                    value = String(ipoteka.totalPrice[1]).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            }

            $('#' + $(this).attr('id').replace('Value', '')).noUiSlider({
                start: [value.replace(/\D/g, '')]
            }, true);

            value = String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            $(this).val(value);

            switch($(this).attr('id')) {
                case 'firstPaymentValue':
                    $("#sum_firstPayment").noUiSlider({
                        start: [value.replace(/\D/g, '')]
                    }, true);

                    $("#sum_firstPaymentValue").val(value);
                    relationshipFirstPayment();
                    break;

                case 'sum_firstPaymentValue':
                    $("#firstPayment").noUiSlider({
                        start: [value.replace(/\D/g, '')]
                    }, true);

                    $('#firstPaymentValue').val(value);
                    relationshipFirstPayment();
                    break;

                case 'totalPriceValue':
                    relationshipTotalPrice();

                    break;
            }
        }
    });
    $("#sum_annPaymentValue").on('blur', function(event) { //Not use change event because nuUiSlider full block change
        if (values[$(this).attr('id')]) {
            var value = values[$(this).attr('id')];

            //created by Alexander Mansurov
            //check input totalPrice
            //if input value > max then value = max
            //if input value < min then valut = min
            $('#' + $(this).attr('id').replace('Value', '')).noUiSlider({
                start: [value.replace(/\D/g, '')]
            }, true);

            value = String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            $(this).val(value);

            switch($(this).attr('id')) {
                case 'firstPaymentValue':
                    $("#sum_firstPayment").noUiSlider({
                        start: [value.replace(/\D/g, '')]
                    }, true);

                    $("#sum_firstPaymentValue").val(value);
                    relationshipFirstPayment();
                    break;

                case 'sum_firstPaymentValue':
                    $("#firstPayment").noUiSlider({
                        start: [value.replace(/\D/g, '')]
                    }, true);

                    $('#firstPaymentValue').val(value);
                    relationshipFirstPayment();
                    break;
            }
        }
    });

    $("#totalPriceValue, #firstPaymentValue, #sum_firstPaymentValue, #sum_annPaymentValue").on('focus', function(event) {
        $(this).val('');
    });
});

stepPrice = 50000;
values = [];

function calculateIncome(totalPrice, firstPayment, longTime, yearPercent) {
    pay = [];
    pay.totalSum = totalPrice - firstPayment;
    pay.periodPercent = (yearPercent / 12) / 100;
    pay.periodCount = longTime * 12;
    pay.koef = (pay.periodPercent * (Math.pow(1 + pay.periodPercent, pay.periodCount))) / (Math.pow(1 + pay.periodPercent, pay.periodCount) - 1);
    var result = pay.totalSum * pay.koef;
    //result = ((result / 100) * 55) + result;
    result = result.toFixed();
    $("#monthIncome").html(result.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
}

function calculateTotalPrice(annPayment, firstPayment, longTime, yearPercent) {
    annPayment = parseInt(annPayment);
    firstPayment = parseInt(firstPayment);
    longTime = parseInt(longTime);
    yearPercent = parseFloat(yearPercent);
    var yearPayment = annPayment * 12;
    var yearPercentMinus = ((annPayment * 12) / 100) * yearPercent;
    var yearProfit = yearPayment - yearPercentMinus;
    var months = longTime * 12;
    var month_perc = (yearPercent / 1200);
    //var result = (1000000 + Math.round(annPayment * ((Math.pow(1 + month_perc, months) - 1) / (Math.pow(1 + month_perc, months) * month_perc)) + firstPayment)) * 0.55;

    var result = (annPayment * 0.55 * (Math.pow(1 + month_perc, months) - 1)/(Math.pow(1 + month_perc, months) * month_perc)) + firstPayment;

    result = result.toFixed().toString();
    $("#flatPrice").html(result.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
}

function initializeMortgageSliders() {
    init_sliders = false;

    //Set min and max values for form
    ipoteka = {};
    ipoteka.totalPrice = [500000,12000000];
    ipoteka.firstPayment = [0, ((ipoteka.totalPrice[1] / 100) * 90)];
    ipoteka.firstPercent = [0,90];
    ipoteka.longTime = [1,30];
    ipoteka.yearPercent = [10.25,25];
    ipoteka.annPerMonth = [0, 500000];
    ipoteka.sumFirstPayment = [0, ((ipoteka.totalPrice[1] / 100) * 90)];

    //Set id's of sliders elements
    sliders = new Array();
    sliders[0] = ['#totalPrice','#totalPriceValue', 'totalPrice', 0, '#minTotalPrice', '#maxTotalPrice'];
    sliders[1] = ['#firstPayment','#firstPaymentValue','firstPayment', 0, '#minFirstPayment', '#maxFirstPayment'];
    sliders[2] = ['#firstPercent','#firstPercentValue','firstPercent', 0, '#minFirstPercent', '#maxFirstPercent'];
    sliders[3] = ['#longTime','#longTimeValue','longTime', 0, '#minLongTime', '#maxLongTime'];
    sliders[4] = ['#yearPercent','#yearPercentValue','yearPercent', 1, '#minYearPercent', '#maxYearPercent'];
    sliders[5] = ['#sum_yearPercent','#sum_yearPercentValue','yearPercent', 2, '#min_sum_yearPercent', '#max_sum_yearPercent'];
    sliders[6] = ['#sum_longTime','#sum_longTimeValue','longTime', 0, '#min_sum_longTime', '#max_sum_longTime'];
    sliders[7] = ['#sum_firstPayment','#sum_firstPaymentValue','sumFirstPayment', 0, '#min_sum_firstPayment', '#max_sum_firstPayment'];
    sliders[8] = ['#sum_annPayment','#sum_annPaymentValue','annPerMonth', 0, '#min_sum_annPayment', '#max_sum_annPayment'];

    //Set start numbers of sliders
    //Fucking Alexander Mansurov
    var startNEW = new Array();
    // Ежемесячный доход на семью
    startNEW[0] = 4000000; // Стоимость квартиры
    startNEW[1] = 800000; // Первоначальный взнос
    startNEW[2] = 20; // Первоначальный взнос
    startNEW[3] = 30; // Срок кредита
    startNEW[4] = 10.8; // Процентная ставка, годовых
    // Сумма кредита
    startNEW[5] = 9;
    startNEW[6] = 15; // Срок кредита
    startNEW[7] = 800000; // Первоначальный взнос
    startNEW[8] = 200000; // Ежемесячный платеж

    //Initialize sliders
    for (var i=0; i < sliders.length; i++) {
        if ($(sliders[i][0]).length > 0) {
            $(sliders[i][0]).noUiSlider({
                start: [startNEW[i]],
                connect: "lower",
                range: {
                    'min': ipoteka[sliders[i][2]][0],
                    'max': ipoteka[sliders[i][2]][1]
                },
                serialization: {
                    lower: [
                        $.Link({target: $(sliders[i][1])})
                    ],
                    format: {
                        decimals: sliders[i][3],
                        mark: '.'
                    }
                }
            });

            //Format max and min values
            if (sliders[i][4] !== '') {
                var min = String(ipoteka[sliders[i][2]][0]);
                $(sliders[i][4]).html(min.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
            }

            if (sliders[i][5] !== '') {
                var max = String(ipoteka[sliders[i][2]][1]);
                $(sliders[i][5]).html(max.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
            }

            init_sliders = true;
        }
    }

    if (!init_sliders)
        return false;

    $(sliders[0][1]).keyup(function(e) {
        controlHandEnter($(this), e);
    });

    $(sliders[1][1]).keyup(function(e) {
        controlHandEnter($(this), e);
    });

    $(sliders[7][1]).keyup(function(e) {
        controlHandEnter($(this), e);
    });

    $(sliders[8][1]).keyup(function(e) {
        controlHandEnter($(this), e);
    });

    relationshipTotalPrice();
}

function reinitializeMortgageSlider(element_id, range, start) {
    $(element_id).noUiSlider({
        start: [start],

        range: {
            'min': range[0],
            'max': range[1]

        }
    }, true);
}

function relationshipTotalPrice() {
    //Set max first payment
    var val = $("#totalPriceValue").val();
    val = parseInt(val.replace(/\s/ig, ''));

    var maxFirstPayment = (val / 100) * 90;
    maxFirstPayment = maxFirstPayment.toString();
    maxFirstPayment = parseInt(maxFirstPayment.replace(/\s/gi, ''));

    var firstPayment = $("#firstPaymentValue").val();
    firstPayment = firstPayment.replace(/\s/gi, '');

    reinitializeMortgageSlider("#firstPayment", [0, maxFirstPayment], firstPayment);
    firstPayment = firstPayment.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    $("#firstPaymentValue").val(firstPayment);

    maxFirstPayment = maxFirstPayment.toString();
    maxFirstPayment = maxFirstPayment.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    $("#maxFirstPayment").html(maxFirstPayment);

    relationshipFirstPayment();
}

function relationshipFirstPercent() {
    //Set relationship between first percent and total price
    var val = $("#totalPriceValue").val();
    val = val.replace(/\s/ig, '');
    var maxFirstPayment = (val / 100) * 90;
    var flatPrice = $("#totalPriceValue").val();
    flatPrice = flatPrice.replace(/\s/ig, '');
    var firstPercent = $("#firstPercentValue").val();
    var firstPayment = (flatPrice / 100) * firstPercent;
    reinitializeMortgageSlider("#firstPayment", [0, maxFirstPayment], firstPayment);
}

function relationshipFirstPayment() {
    //Get percent relationship between min and max values
    var maxValue = $("#maxFirstPayment").html();
    maxValue = maxValue.replace(/\s/gi, '');
    var selectedValue = $("#firstPaymentValue").val();
    selectedValue = selectedValue.replace(/\s/gi, '');
    var percentRel = (selectedValue * 100) / maxValue;

    //Get actual value for target slider
    var targetMaxValue = $("#maxFirstPercent").html();
    var targetValue = (targetMaxValue / 100) * percentRel;
    targetValue = targetValue.toFixed();

    //Reinitialize firstPercent slider
    reinitializeMortgageSlider("#firstPercent", [0, Number(targetMaxValue)], Number(targetValue));
}

function roundValue(element, step, findStep) {
    //Round total price to step
    var value = $(element).val();
    value = value.replace(/\s/gi, '');
    value = Number(value.replace(/\d{3}$/, '000'));

    findStep = findStep == undefined ? 1000 : findStep;
    var less = false;
    var more = false;

    for (var i = 1; i < (step / findStep) && less === false && more === false; i++) {
        less = (value - (findStep * i)) % step === 0;
        more = (value + (findStep * i)) % step === 0;

        if (less == true)
            $(element).val(value - (findStep * i));

        if (more == true)
            $(element).val(value + (findStep * i));
    }
}

function controlHandEnter(element, event) {
    if (event.which !== 37 && event.which !== 39) {
        var value = element.val();
        value = value.replace(/\D/gi, "");
        value = value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        element.val(value);
        values[element.attr('id')] = String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    }
}