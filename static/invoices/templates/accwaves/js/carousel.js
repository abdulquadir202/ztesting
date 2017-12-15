$( document ).ready(function() {
  var calcContentHeight = function () {
    var newHeight = 0;
    var maxHeight = 0;
    $('.carousel-content li').each(function() {
      newHeight = $( this ).children().height();
      maxHeight = newHeight > maxHeight ? newHeight : maxHeight;
    });
    $('.carousel-content').height( maxHeight );
  };
  
  calcContentHeight();

  var carousalEle = document.querySelector('#carousal-item');
  carousalEle.addEventListener('load', calcContentHeight);

  window.addEventListener('resize', calcContentHeight);

  carousel = (function() {
    var container = document.querySelector('.carousel-container');
    var carouselContent = container.querySelector('.carousel-content');
    var webapp = container.querySelector('#item1');
    var mobileapp = container.querySelector('#item2');
    var watchapp = container.querySelector('#item3');
    var items = container.querySelectorAll('.carousel-content li');
    var indicators = container.querySelectorAll('.carousel-indicators li');
    var index = 0;
    var length = items.length;
    var current = items[0];
    var currentIndicator = indicators[0];
    var myFunc, next;

    function navigate(direction) {
      if(direction < 0) {
        next = items[(index+1)%length];
        next.style.left = '-150%';
        next.style.opacity = 0;

        current.style.opacity = 1;
        current.style.left = '150%';
        currentIndicator.classList.remove('active');

        if(index === 0) {
          index = length - 1;
        } else {
          index = (index - 1) % length;
          if(index < 0) {
            index = -index;
          }
        }
        current = items[index];
        currentIndicator = indicators[index];
        current.style.left = '0px';
        current.style.opacity = 1;
        currentIndicator.classList.add('active');
      } else {
        current.style.opacity = 1;
        current.style.left = '-150%';
        currentIndicator.classList.remove('active');

        index = (index + 1) % length;
        current = items[index];
        currentIndicator = indicators[index];
        current.style.left = '0px';
        current.style.opacity = 1;
        currentIndicator.classList.add('active');

        next = items[(index+1)%length];
        next.style.left = '150%';
        next.style.opacity = 0;
      }
    }

    webapp.addEventListener('click', function(ev) {
      if(index !== 0) {
        clearTimeout(myFunc);
        if(index === 2) {
          navigate(1);
        } else {
          navigate(-1);
        }
        myFunc = setTimeout(loopFunc, 6000);
      }
    });
    mobileapp.addEventListener('click', function(ev) {
      if(index !== 1) {
        clearTimeout(myFunc);
        if(index === 0) {
          navigate(1);
        } else {
          navigate(-1);
        }
        myFunc = setTimeout(loopFunc, 6000);
      }
    });
    watchapp.addEventListener('click', function(ev) {
      if(index !== 2) {
        clearTimeout(myFunc);
        if(index === 1) {
          navigate(1);
        } else {
          navigate(-1);
        }
        myFunc = setTimeout(loopFunc, 6000);
      }
    });

    var loopFunc = function() {
      navigate(1);
      clearTimeout(myFunc);
      myFunc = setTimeout(loopFunc, 6000);
    };
    setTimeout(loopFunc, 6000);

    carouselContent.addEventListener('mouseenter', function() {
      clearTimeout(myFunc);
    });

    carouselContent.addEventListener('mouseleave', function() {
      clearTimeout(myFunc);
      myFunc = setTimeout(loopFunc, 6000);
    });

    window.addEventListener('focus', function(ev) {
      clearTimeout(myFunc);
      myFunc = setTimeout(loopFunc, 6000);
    });

    window.addEventListener('blur', function(ev) {
      clearTimeout(myFunc);
    });
  })();
});
