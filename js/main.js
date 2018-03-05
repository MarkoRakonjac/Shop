let template = $('#my-template').html();
let mainRow = $('#main-row');
let rg = new RegExp('{{productTitle}}', 'gi');
let text = '';
let inputField = $('.search-field');
let introHeader = $('.intro-header');
let productsTitle = $('.products-title');
let badge = $('.badge');
let backToTop = $('#back-to-top');

// let id = localStorage.removeItem("id");
// console.log(id);


let buyCounter = localStorage.getItem("buyCounter");
buyCounter = JSON.parse(buyCounter);
$(badge).html(buyCounter);




let colBtns = $('[data-col]');
let cutBtns = $("[data-cut]");

inputField.on('keyup', searchProduct)






function searchProduct() {
  if (inputField.val().length >= 3) {
    let search = inputField.val().toUpperCase();
    $.ajax({
        url: 'https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json',
        type: 'GET',
        dataType: 'json',
      })
      .done(function(res) {
        let filterCut = res.filter(function(el) {

            if (el.model.toUpperCase().includes(search)) {
              return el;
            }
            if (el.productTitle.toUpperCase().includes(search)) {
              return el;
            }
        })
        displayProducts(filterCut);
        addId();  
      })
      introHeader.hide("slow");
      productsTitle.next().hide('slow');
  }else {
    $.ajax({
        url: 'https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json',
        type: 'GET',
        dataType: 'json',
      })
      .done(function(res) {
        let filterCut = res.filter(function(el) {

        })
        introHeader.show("slow");
        productsTitle.next().show('slow');
        displayProducts(res)
        addId();
      })
  }
}





cutBtns.on('click', function(event) {
  let cut = $(this).attr('data-cut');
  $('.cut').removeClass('active');
  $(this).parent().addClass('active');
  event.preventDefault();
  $.ajax({
      url: 'https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json',
      type: 'GET',
      dataType: 'json',
    })
    .done(function(res) {
      let filterCut = res.filter(function(el) {
        return el[cut];
      });
      displayProducts(filterCut);
      addId();

    })
})

colBtns.on('click', function(event) {
  event.preventDefault();
  let dataCollection = $(this).attr('data-col');
  $.ajax({
      url: 'https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json',
      type: 'GET',
      dataType: 'json',
    })
    .done(function(res) {
      text = "";
      let filterCol = res.filter(function(el) {
        return el.colection == dataCollection;
      });
      filterCol.forEach(function(el) {
        text += template.replace('{{imgSrc}}', el.imgSrc)
          .replace(rg, el.productTitle)
          .replace('{{model}}', el.model)
          .replace('{{price}}', el.price)

      })
      mainRow.html("");
      mainRow.html(text)
      addId();
    })
})



$.ajax({
    url: 'https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json',
    type: 'GET',
    dataType: 'json',

  })
  .done(function(res) {
    console.log(res);
    res.forEach(function(el) {
      text += template.replace('{{imgSrc}}', el.imgSrc)
        .replace(rg, el.productTitle)
        .replace('{{model}}', el.model)
        .replace('{{price}}', el.price)
        })
    mainRow.append(text)
    addId();
  })




function displayProducts(cut) {
  text = "";
  cut.forEach(function(el) {
    text += template.replace('{{imgSrc}}', el.imgSrc)
      .replace(rg, el.productTitle)
      .replace('{{model}}', el.model)
      .replace('{{price}}', el.price)

  })
  mainRow.html("");
  mainRow.html(text)

}


function addId() {
  let product = $('.pro-img-holder')
  product.each(function (e) {
  let id =  $(this).children('a').children('img').attr('src').match(/\d/g);
  id = id.join("");
  $(this).attr('id', id);
  $(this).on('click',function () {
    localStorage.setItem('id',JSON.stringify(id));
  })
  })
}


backToTop.on('click',function () {
   $('body,html').animate({
        scrollTop : 0                  
    }, 500);
})