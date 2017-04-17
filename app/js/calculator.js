var totalPriceSlider = document.getElementById('totalPrice');
var firstPaymentSlider = document.getElementById('firstPayment');
var firstPercentSlider = document.getElementById('firstPercent');
var longTimeSlider = document.getElementById('longTime');
var yearPercentSlider = document.getElementById('yearPercent');

if(totalPriceSlider != null){
  noUiSlider.create(totalPriceSlider, {
    start: [500000, 500000],
    connect: true,
    step: 50000,
    format: wNumb({
      decimals: 0
    }),
    range: {
      'min': 500000,
      'max': 12000000
    }
  });
  noUiSlider.create(firstPaymentSlider, {
    start: [0, 0],
    connect: true,
    step: 50000,
    format: wNumb({
      decimals: 0
    }),
    range: {
      'min': 0,
      'max': 450000
    }
  });
  noUiSlider.create(firstPercentSlider, {
    start: [0, 0],
    connect: true,
    step: 1,
    format: wNumb({
      decimals: 0
    }),
    range: {
      'min': 0,
      'max': 90
    }
  });
  noUiSlider.create(longTimeSlider, {
    start: [1, 1],
    connect: true,
    step: 1,
    format: wNumb({
      decimals: 0
    }),
    range: {
      'min': 1,
      'max': 30
    }
  });
  noUiSlider.create(yearPercentSlider, {
    start: [10.8, 10.8],
    connect: true,
    step: 0.1,
    format: wNumb({
      decimals: 1
    }),
    range: {
      'min': 10.8,
      'max': 25
    }
  });
}


var sum_annPaymentSlider = document.getElementById('sum_annPayment');
var sum_firstPaymentSlider = document.getElementById('sum_firstPayment');
var sum_longTimeSlider = document.getElementById('sum_longTime');
var sum_yearPercentSlider = document.getElementById('sum_yearPercent');

if(sum_annPaymentSlider != null){
  noUiSlider.create(sum_annPaymentSlider, {
    start: [0, 0],
    connect: true,
    step: 5000,
    format: wNumb({
      decimals: 0
    }),
    range: {
      'min': 0,
      'max': 500000
    }
  });
  noUiSlider.create(sum_firstPaymentSlider, {
    start: [0, 0],
    connect: true,
    step: 50000,
    format: wNumb({
      decimals: 0
    }),
    range: {
      'min': 0,
      'max': 7200000
    }
  });
  noUiSlider.create(sum_longTimeSlider, {
    start: [1, 1],
    connect: true,
    step: 1,
    format: wNumb({
      decimals: 0
    }),
    range: {
      'min': 1,
      'max': 30
    }
  });
  noUiSlider.create(sum_yearPercentSlider, {
    start: [10.8, 10.8],
    connect: true,
    step: 0.1,
    format: wNumb({
      decimals: 1
    }),
    range: {
      'min': 10.8,
      'max': 25
    }
  });
}

function calculateIncome(totalPrice1, firstPayment1, longTime1, yearPercent1) {
            pay = [];
            pay.totalSum = totalPrice1 - firstPayment1;
            pay.periodPercent = (yearPercent1 / 12) / 100;
            pay.periodCount = longTime1 * 12;
            pay.koef = (pay.periodPercent * (Math.pow(1 + pay.periodPercent, pay.periodCount))) / (Math.pow(1 + pay.periodPercent, pay.periodCount) - 1);
            var result = pay.totalSum * pay.koef;
            //result = ((result / 100) * 55) + result;
            result = result.toFixed();
            $("#monthIncome").html(result.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
            console.log(result);
      }

      // Расчет по ежемесячному платежу
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

$(document).ready(function () {

    // Перенос первоначального взноса при изменении в другой калькулятор
    $("#sum_firstPaymentValue").change(function () {
        var value = $(this).val();
        $("#firstPaymentValue").val(value);
    }).change();

    $("#firstPaymentValue").change(function () {
        var value = $(this).val();
        $("#sum_firstPaymentValue").val(value);
    }).change();
    ///////////////////////////////////////////////////////////////////////


    // При изменении значения элемента - изменение слайдера + приведение к удобному глазу формату
    $("#totalPriceValue").on("change", function () {
      var value = parseInt($(this).val().replace(/\s/gi, ''));
      totalPriceSlider.noUiSlider.set([0, value]);
      $(this).val(value.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
      relationshipTotalPrice();
      firstPaymentToProcent();      
    });

    $("#firstPaymentValue").on("change", function () {
      var value = parseInt($(this).val().replace(/\s/gi, ''));
      firstPaymentSlider.noUiSlider.set([0, value]);
      $(this).val(value.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
      firstPaymentToProcent();     
    });

    $("#firstPercentValue").on("change", function () {
      var value = parseInt($(this).val().replace(/\s/gi, ''));
      firstPercentSlider.noUiSlider.set([0, value]);
      $(this).val(value.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
      ProcentToFirstPayment();    
    });

    $("#longTimeValue").on("change", function () {
      var value = parseInt($(this).val().replace(/\s/gi, ''));
      longTimeSlider.noUiSlider.set([0, value]);
    });

    $("#yearPercentValue").on("change", function () {
      var value = parseInt($(this).val().replace(/\s/gi, ''));
      yearPercentSlider.noUiSlider.set([0, value]);
    });

    $("#sum_annPaymentValue").on("change", function () {
      var value = parseInt($(this).val().replace(/\s/gi, ''));
      sum_annPaymentSlider.noUiSlider.set([0, value]);
      $(this).val(value.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    });

    $("#sum_firstPaymentValue").on("change", function () {
      var value = parseInt($(this).val().replace(/\s/gi, ''));
      sum_firstPaymentSlider.noUiSlider.set([0, value]);
      $(this).val(value.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    });

    $("#sum_longTimeValue").on("change", function () {
      var value = parseInt($(this).val().replace(/\s/gi, ''));
      sum_longTimeSlider.noUiSlider.set([0, value]);
    });

    $("#sum_yearPercentValue").on("change", function () {
      var value = parseInt($(this).val().replace(/\s/gi, ''));
      sum_yearPercentSlider.noUiSlider.set([0, value]);
    });

    /////////////////////////////////////////////////////////////

    stepPrice = 50000;
    values = [];

    totalPriceSlider.noUiSlider.on('slide', function(){
      $('#totalPriceValue').val(totalPriceSlider.noUiSlider.get()[1]);
      roundValue('#totalPriceValue', stepPrice);
      relationshipTotalPrice();
      firstPaymentToProcent();
      var val = $("#totalPriceValue").val();
      values[$(this).attr('id') + 'Value'] = val;
      $("#totalPriceValue").val(val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));

      val = $("#firstPaymentValue").val();
      $("#firstPaymentValue").val(val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    });

    firstPaymentSlider.noUiSlider.on('slide', function(){
      firstPaymentToProcent();
      var val = firstPaymentSlider.noUiSlider.get()[1]
      $("#firstPaymentValue").val(val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    });

    function firstPaymentToProcent(){
      var firstPayment = parseInt(firstPaymentSlider.noUiSlider.get()[1]);
      var maxFirstPayment = parseInt($('#maxFirstPayment').html().replace(/\s/gi, ''));
      var procent = firstPayment / (maxFirstPayment/90);
      firstPercentSlider.noUiSlider.set([0, procent]);
      $('#firstPercentValue').val(firstPercentSlider.noUiSlider.get()[1])
    }




    firstPercentSlider.noUiSlider.on('slide', function(){
      $('#firstPercentValue').val(firstPercentSlider.noUiSlider.get()[1])
      ProcentToFirstPayment();
    });

    function ProcentToFirstPayment(){
      var procent = parseInt(firstPercentSlider.noUiSlider.get()[1]);
      var maxFirstPayment = parseInt($('#maxFirstPayment').html().replace(/\s/gi, ''));
      var firstPayment = maxFirstPayment / 90 * procent;
      firstPaymentSlider.noUiSlider.set([0, firstPayment]);

      var val = firstPaymentSlider.noUiSlider.get()[1]
      $("#firstPaymentValue").val(val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    }


    longTimeSlider.noUiSlider.on('slide', function(){
      $('#longTimeValue').val(longTimeSlider.noUiSlider.get()[1])
    });
    yearPercentSlider.noUiSlider.on('slide', function(){
      $('#yearPercentValue').val(yearPercentSlider.noUiSlider.get()[1])
    });

        sum_annPaymentSlider.noUiSlider.on('slide', function(){
      var val = sum_annPaymentSlider.noUiSlider.get()[1];
      $("#sum_annPaymentValue").val(val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    });
    sum_firstPaymentSlider.noUiSlider.on('slide', function(){
      var val = sum_firstPaymentSlider.noUiSlider.get()[1];
      $("#sum_firstPaymentValue").val(val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    });
    sum_longTimeSlider.noUiSlider.on('slide', function(){
      $('#sum_longTimeValue').val(sum_longTimeSlider.noUiSlider.get()[1])
    });
    sum_yearPercentSlider.noUiSlider.on('slide', function(){
      $('#sum_yearPercentValue').val(sum_yearPercentSlider.noUiSlider.get()[1])
    });



      $('#totalPriceValue', "#firstPaymentValue", '#firstPercentValue', '#longTimeValue', '#yearPercentValue').on('change', function(){
        // totalPriceSlider.noUiSlider.set([0, parseInt($('#totalPriceValue').val())]);
        // firstPaymentSlider.noUiSlider.set([0, parseInt($('#firstPaymentValue').val())]);
        // longTimeSlider.noUiSlider.set([0, parseInt($('#longTimeValue').val())]);
        // yearPercentSlider.noUiSlider.set([0, parseInt($('#yearPercentValue').val())]);
        console.log(parseInt($('#totalPriceValue').val()));
      })

      // Начальные значения по маске
      var val = $("#totalPriceValue").val();
      $("#totalPriceValue").val(val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));

      val = $("#firstPaymentValue").val();
      $("#firstPaymentValue").val(val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));

      val = $("#sum_annPaymentValue").val();
      $("#sum_annPaymentValue").val(val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));

      val = $("#sum_firstPaymentValue").val();
      $("#sum_firstPaymentValue").val(val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));


      // Расчет по сумме кредита
      function calculateIncome(totalPrice1, firstPayment1, longTime1, yearPercent1) {
            pay = [];
            pay.totalSum = totalPrice1 - firstPayment1;
            pay.periodPercent = (yearPercent1 / 12) / 100;
            pay.periodCount = longTime1 * 12;
            pay.koef = (pay.periodPercent * (Math.pow(1 + pay.periodPercent, pay.periodCount))) / (Math.pow(1 + pay.periodPercent, pay.periodCount) - 1);
            var result = pay.totalSum * pay.koef;
            //result = ((result / 100) * 55) + result;
            result = result.toFixed();
            $("#monthIncome").html(result.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
            console.log(result);
      }

      // Расчет по ежемесячному платежу
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


      // Обновление диапозона слайдера
      function updateSliderRange (slider, range) {
            slider.noUiSlider.updateOptions({
                  range: {
                        'min': range[0],
                        'max': range[1]
                  }
            });
      }

      // Изменение первоначального взноса от стоимости квартиры
      function relationshipTotalPrice() {
          //Set max first payment
          var val = $("#totalPriceValue").val();
          val = parseInt(val.replace(/\s/gi, ''));

          var maxFirstPayment = (val / 100) * 90;
          maxFirstPayment = maxFirstPayment.toString();
          maxFirstPayment = parseInt(maxFirstPayment.replace(/\s/gi, ''));

          var firstPayment = $("#firstPaymentValue").val();
          firstPayment = firstPayment.replace(/\s/gi, '');

          updateSliderRange(firstPaymentSlider, [0, maxFirstPayment]);
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
          updateSliderRange(firstPaymentSlider, [0, maxFirstPayment]);

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
          updateSliderRange(firstPercentSlider, [0, Number(targetMaxValue)]);

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
});
