
let template = $('#my-template').html();
let productHolder = $('#product-holder');
let buyBtn;
let buyCounter = localStorage.getItem("buyCounter");
let badge = $('.badge').html(buyCounter);
let backToTop = $('#back-to-top');


let id = localStorage.getItem("id");
id = JSON.parse(id);
console.log(id);

let imgSrc = "product".concat(id)
let text = '';
console.log(imgSrc);


$.ajax({
  	url: 'https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json',
    type: 'GET',
    dataType: 'json',
})
.done(function(res) {
	console.log(res);
	res.forEach(function (el) {
		if (el.imgSrc === imgSrc) {
			text += template.replace('{{imgSrc}}', el.imgSrc)
							.replace('{{productTitle}}', el.productTitle)
							.replace('{{price}}', el.price)

		}
	})
	productHolder.append(text);
	 $('.thumbnail').on('click',function (e) {
	e.preventDefault()
	let src = $(this).attr('src');
	$('.placeholder').attr('src', src);
})

	buyBtn = $('.product-item-btn');
	buyBtn.on('click',function (res) {
		addTocart(res)
	})


})

function addTocart(res) {
	$(badge).html(buyCounter);
	buyCounter++
	buyBtn.fadeOut(50);
	buyBtn.fadeIn(50);
	$(badge).html(buyCounter);
	localStorage.setItem('buyCounter',JSON.stringify(buyCounter));


}

backToTop.on('click',function () {
   $('body,html').animate({
        scrollTop : 0                  
    }, 500);
})