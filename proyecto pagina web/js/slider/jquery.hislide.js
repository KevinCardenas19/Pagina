(function($) {
    var slide = function(ele,options) {
        var $ele = $(ele);
        var setting = {
            speed: 1000,
            interval: 2000,
        };
        $.extend(true, setting, options);
        

        var states = [
            { $zIndex: 1, width: 200, height: 220, top: 40, left: -130, $opacity: 1 },
            { $zIndex: 2, width: 200, height: 220, top: 40, left: 630, $opacity: 1 },
            { $zIndex: 3, width: 300, height: 350, top: -50, left: 263, $opacity: 1 }
        ];

        var $lis = $ele.find('li');
        var timer = null;

        $ele.find('.hi-next').on('click', function() {
            next();
        });
        $ele.find('.hi-prev').on('click', function() {
            states.unshift(states.pop());
            move();
        });
        $ele.on('mouseenter', function() {
            clearInterval(timer);
            timer = null;
        }).on('mouseleave', function() {
            autoPlay();
        });

        move();
        autoPlay();

        function move() {
            $lis.each(function(index, element) {
                var state = states[index];
                $(element).stop().animate({
                    width: state.width,
                    height: state.height,
                    top: state.top,
                    left: state.left,
                    opacity: state.$opacity
                }, setting.speed);
            });
        }
        

        function next() {
            states.push(states.shift()); // Cambiar el desplazamiento de unshift a push
            move();
        }
        

        function autoPlay() {
            timer = setInterval(next, setting.interval);
        }
    }
    $.fn.hiSlide = function(options) {
        $(this).each(function(index, ele) {
            slide(ele,options);
        });
        return this;
    }
})(jQuery);
