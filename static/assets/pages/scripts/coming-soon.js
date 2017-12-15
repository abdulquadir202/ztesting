var ComingSoon = function () {

    return {
        //main function to initiate the module
        init: function () {
            var dateStr = $('#rd').val();
            var dt = new Date(dateStr);

            var austDay = (dt != undefined) ? dt : new Date();
            console.log(austDay);

            austDay.setDate(austDay.getDate()+1);
            //austDay = new Date(austDay.getFullYear(), 1-1, 14;
            $('#defaultCountdown').countdown({until: austDay});
            $('#year').text(austDay.getFullYear());

            $.backstretch([
                    "../assets/pages/media/bg/1.jpg",
                    "../assets/pages/media/bg/2.jpg",
                    "../assets/pages/media/bg/3.jpg",
                    "../assets/pages/media/bg/4.jpg"
                ], {
                fade: 1000,
                duration: 10000
           });
        }

    };

}();

jQuery(document).ready(function() {
   ComingSoon.init();
});
