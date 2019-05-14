$(function () {
  //初始化fullpage插件
  /*
  * 配置参数:
  * 1. 设置每个屏幕的背景颜色
  * 2. 内容默认垂直居中,改成顶部对齐
  * 3. 显示导航栏(默认是隐藏)
  * 4. 监听完全进入某个屏幕的时候 实现动画 回调函数
  * */

  $(".container").fullpage({
    sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
    verticalCentered: false,
    navigation: true,
    afterLoad: function (link, index) {
      /*index 序号 1开始  当前屏的序号*/
      $('.section').eq(index - 1).addClass('now');
    },
    /*离开当前页面的时候*/
    onLeave: function (index, nextIndex, direction) {
      var currentSection = $('.section').eq(index - 1);
      /* 当前是第2页并且离开后要去第3页*/
      if (index == 2 && nextIndex == 3) {
        //就给第2页添加一个类 给沙发用
        currentSection.addClass('leaved');
        /*当前是第3页并且离开后要去第4页*/
      } else if (index == 3 && nextIndex == 4) {
        currentSection.addClass('leaved');
        /*当前是第5页并且离开后要去第6页*/
      } else if (index == 5 && nextIndex == 6) {
        /*进入第五屏的沙发是用的animation,离开用transition的话就的先取消animation
       //currentSection.removeClass('now').addClass('leaved');*/
        currentSection.addClass('leaved');
        // 离开第五屏的时候给第六屏的box添加一个类show
        $('.screen06 .box').addClass('show');
        /* 当前是第6页并且离开后要去第7页*/
      } else if (index == 6 && nextIndex == 7) {
        $('.screen07 .star').addClass('show');//--->第二种
        $('.screen07 .text').addClass('show');
        $('.screen07 .star img').each(function (i, ele) {
          //$(ele)==$(this)
          /*第一种方式：display:none
                    当前的img延时0.5s淡出
          $(ele).delay(i*0.5*1000).fadeIn();
          */
          /*第二种方式：opacity:0*/
          $(this).css('transition-delay', i * 0.5 + 's');
        });
      }
    },
    /*最好在组件初始完毕或者插件内容渲染完毕*/
    afterRender: function () {
      /*console.log(this);*/
      /*this没有api方法*/

      /*jquery插件初始的时候封装这个方法
          1.回想jquery插件的封装 $.fn.fullpage = function(){}
          2.jquery本身没有的方法通过$.fn的方式追加方法  认为是插件方法
          3.例如：$.fn.src = function(){ return this.attr('src') } this 你用谁调src()谁就
          是this 就执行谁--->（jquery对象） */
      /*点击更多切换下一页*/
      $('.more').on('click', function () {
        $.fn.fullpage.moveSectionDown();
      });
      $('.screen04 .cart').on('transitionend', function () {
        $('.screen04 .address').show().find('img:last').fadeIn(1000);
        $('.screen04 .text').addClass('show');
        //$('.screen04 .text').find('img:last').fadeIn(1000);css里面写过渡也行
      });
      /*第八屏功能:*/
      /*1.手跟着鼠标移动*/
      $('.screen08').on('mousemove', function (e) {
        $(this).find('.hand').css({
          left: e.clientX - 190,
          top: e.clientY - 20
        });
        /*2.点击按钮 再来一次重置所有动画*/
      }).find('.again').on('click', function () {
        /*做动画 :
            1.添加了类
            2.加了css属性 后果：加一个style属性
            3.调用了show() fadeIn() 后果：加一个style属性*/
        $('.now,.leaved,.show').removeClass('now').removeClass('leaved').removeClass('show');
        $('.content [style]').removeAttr('style');
        /*跳回第一页*/
        $.fn.fullpage.moveTo(1);
      });
    },

    /*页面切换的时间 默认是700*/
    scrollingSpeed: 1000,

  })
  ;
});
