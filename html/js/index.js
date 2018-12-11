$(document).ready(function(){
  for (var i=1; i <= $('.slider__slide').length; i++){
    $('.slider__indicators').append('<div class="slider__indicator" data-slide="'+i+'"></div>')
  }
  setTimeout(function(){
    $('.slider__wrap').addClass('slider__wrap--hacked');
  }, 500);
})

function goToSlide(number){
  $('.slider__slide').removeClass('slider__slide--active');
  $('.slider__slide[data-slide='+number+']').addClass('slider__slide--active');
}

$('.slider__next, .go-to-next').on('click', function(){
  var currentSlide = Number($('.slider__slide--active').data('slide'));
  var totalSlides = $('.slider__slide').length;
  currentSlide++
  if (currentSlide > totalSlides){
    currentSlide = 1;
  }
  goToSlide(currentSlide);
})

num = 0;
// 点击锚点 改变num
function changeNum(){
  var elems = document.getElementsByClassName('click_change')
    elems[0].onclick = function(){num = 0}
    elems[1].onclick = function(){num = 1}
    elems[2].onclick = function(){num = 2}
    elems[3].onclick = function(){num = 3}
}
changeNum();
// 鼠标控制单页滚动
function scrollScreen(){
  var height = document.documentElement.clientHeight;
  var width = document.documentElement.clientWidth;
  function scroll(){
    //获取每个section元素，off为开关，num为当前第几屏
    var sections = document.getElementsByTagName('section'),off = true;
    //屏幕可视区的高度
    //滚动方法
    function move(){
      //滚动的距离就等于屏幕高度乘以当前num数，注意，需要把鼠标干预设置成false
      jump.init(height*num,{mouse : false,speed:1000},function(){
        off = true
      })
    };
    //鼠标滚动的时候
    wheel.init( document,function( e ){
      if (!off) return
      //鼠标滚动的时候，设置成false，防止多次触发
      off = false;
      if ( e ){
        //向下滚动，并判断num是否大于sections的个数
        num = num++ >= sections.length-1 ?  sections.length-1 : num;
      }else {
        //向上滚动，并判断num是否小于sections的个数
        num = num-- <=0 ? 0 : num;
      };
      //执行滚动
      move();
      // 根据num值改变锚点位置
      if(num===0){
        document.location.hash='#home';
        $('.footer_info p').removeClass('add_value')
      }else if(num===1){
        document.location.hash='#about';
        $('.footer_info p').removeClass('add_value')
      }else if(num===2){
        document.location.hash='#service';
        $('.footer_info p').removeClass('add_value')
      }else if(num===3){
        document.location.hash='#contact';
        $('.footer_info p').addClass('add_value')
      }
    });
  }
// 判断进入单页滚动的条件
  if(width>991 && height>610){
    scroll();
  }else{
    $('.footer_info p').removeClass('add_value')
  }
  // 窗口大小改变自适应
  window.onresize = function(){
    window.location.reload();
    $('.footer_info p').removeClass('add_value')
  }
}
scrollScreen();
