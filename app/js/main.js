var floorRange = document.getElementById('floorRange');
var areaRange = document.getElementById('areaRange');
var priceRange = document.getElementById('priceRange');
if(floorRange != null){
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
	floorRange.noUiSlider.on('slide', function(){
		$('#floor-from').val(floorRange.noUiSlider.get()[0])
		$('#floor-to').val(floorRange.noUiSlider.get()[1])
	});
	areaRange.noUiSlider.on('slide', function(){
		$('#area-from').val(areaRange.noUiSlider.get()[0])
		$('#area-to').val(areaRange.noUiSlider.get()[1])
	});
	priceRange.noUiSlider.on('slide', function(){
		$('#price-from').val(priceRange.noUiSlider.get()[0])
		$('#price-to').val(priceRange.noUiSlider.get()[1])
	});
}
$(document).ready(function(){
	var currentPosition = 0;
	var slideWidth = 560;
	var slides = $('.slide');
	var numberOfSlides = slides.length;
		  // Убираем прокрутку
		  $('#slidesContainer').css('overflow', 'hidden');
		  // Вставляем все .slides в блок #slideInner
		  slides
		  .wrapAll('<div id="slideInner"></div>')
		  // Float left to display horizontally, readjust .slides width
		  .css({
		  	'float' : 'left',
		  	'width' : slideWidth
		  });
		  // Устанавливаем ширину #slideInner, равную ширине всех слайдов
		  $('#slideInner').css('width', slideWidth * numberOfSlides);
		  // Вставляем элементы контроля в DOM
		  $('#slideshow')
		  .prepend('<span class="control" id="leftControl">Move left</span>')
		  .append('<span class="control" id="rightControl">Move right</span>');
		  // Прячем правую стрелку при загрузке скрипта
		  manageControls(currentPosition);
		  // Отлавливаем клик на класс .controls
		  $('.control')
		  .bind('click', function(){
		    // Определение новой позиции
		    currentPosition = ($(this).attr('id')=='rightControl')
		    ? currentPosition+1 : currentPosition-1;
		      // Прячет / показывает элементы контроля
		      manageControls(currentPosition);
		      // Move slideInner using margin-left
		      $('#slideInner').animate({
		      	'marginLeft' : slideWidth*(-currentPosition)
		      });
		  });
		  // manageControls: показывает или скрывает стрелки в зависимости от значения currentPosition
		  function manageControls(position){
		    // Спрятать левую стрелку, если это левый слайд
		    if(position==0){ $('#leftControl').hide() }
		    	else{ $('#leftControl').show() }
		    // Спрятать правую стрелку, если это последний слайд
		if(position==numberOfSlides-1){ $('#rightControl').hide() }
			else{ $('#rightControl').show() }
		}
	var currentPosition1 = 0;
	var slideWidth1 = 650;
	var slides1 = $('.slide1');
	var numberOfSlides1 = slides1.length;
			  // Убираем прокрутку
			  $('#slidesContainer1').css('overflow', 'hidden');
			  // Вставляем все .slides в блок #slideInner
			  slides1.wrapAll('<div id="slideInner1"></div>')
			  // Float left to display horizontally, readjust .slides width
			  .css({
			  	'float' : 'left',
			  	'width' : slideWidth1
			  });
			  // Устанавливаем ширину #slideInner, равную ширине всех слайдов
			  $('#slideInner1').css('width', slideWidth1 * numberOfSlides1);
			  // Вставляем элементы контроля в DOM
			  $('#slideshow1')
			  .prepend('<span class="control1" id="leftControl1">Move left</span>')
			  .append('<span class="control1" id="rightControl1">Move right</span>');
			  // Прячем правую стрелку при загрузке скрипта
			  manageControls1(currentPosition1);
			  // Отлавливаем клик на класс .controls
			  $('.control1').bind('click', function(){
			    // Определение новой позиции
			    currentPosition1 = ($(this).attr('id')=='rightControl1')
			    ? currentPosition1+1 : currentPosition1-1;
			      // Прячет / показывает элементы контроля
			      manageControls1(currentPosition1);
			      // Move slideInner using margin-left
			      $('#slideInner1').animate({
			      	'marginLeft' : slideWidth1*(-currentPosition1)
			      });
			  });
			  // manageControls: показывает или скрывает стрелки в зависимости от значения currentPosition
			  function manageControls1(position1){
			    // Спрятать левую стрелку, если это левый слайд
			    if(position1==0){ $('#leftControl1').hide() }
			    	else{ $('#leftControl1').show() }
			    // Спрятать правую стрелку, если это последний слайд
			if(position1==numberOfSlides1-1){ $('#rightControl1').hide() }
				else{ $('#rightControl1').show() }
			}
	});



$(document).on('click', function() {
	$('#proverka').click(
		function() {
      				$(this).addClass('zoomInUp'); // Добавляем класс bounce
      			},
      			function() {
      				$(this).removeClass('zoomInUp'); // Убираем класс
      			}
      			)});

new WOW().init(
{
	mobile: false
}
);


var calcPrice = document.getElementById('calcPrice');
var calcFirstVznos = document.getElementById('calcFirstVznos');
var calcFirstVznosProcent = document.getElementById('calcFirstVznosProcent');
var calcSrok = document.getElementById('calcSrok');
var calcProcent = document.getElementById('calcProcent');

if(calcPrice != null){
	noUiSlider.create(calcPrice, {
		start: [500000, 500000],
		connect: true,
		step: 100000,
		format: wNumb({
			decimals: 0
		}),
		range: {
			'min': 500000,
			'max': 12000000
		}
	});
	noUiSlider.create(calcFirstVznos, {
		start: [0, 0],
		connect: true,
		step: 100,
		format: wNumb({
			decimals: 0
		}),
		range: {
			'min': 0,
			'max': 7200000
		}
	});
	noUiSlider.create(calcFirstVznosProcent, {
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
	noUiSlider.create(calcSrok, {
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
	noUiSlider.create(calcProcent, {
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

	calcPrice.noUiSlider.on('slide', function(){
		$('#calcPriceInput').val(calcPrice.noUiSlider.get()[1])
	});
	calcFirstVznos.noUiSlider.on('slide', function(){
		$('#calcFirstVznosInput').val(calcFirstVznos.noUiSlider.get()[1])
	});
	calcFirstVznosProcent.noUiSlider.on('slide', function(){
		$('#calcFirstVznosProcentInput').val(calcFirstVznosProcent.noUiSlider.get()[1])
	});
	calcSrok.noUiSlider.on('slide', function(){
		$('#calcSrokInput').val(calcSrok.noUiSlider.get()[1])
	});
	calcProcent.noUiSlider.on('slide', function(){
		$('#calcProcentInput').val(calcProcent.noUiSlider.get()[1])
	});
}
