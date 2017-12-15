var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');  

var DIST = 'static/dist/';
var DIST_JS = DIST + 'js/';
var DIST_CSS = DIST + 'css/';
var DIST_IMG = DIST + 'images/';
var DIST_FONTS = DIST + 'css/fonts/';

gulp.task('default', ['images', 'js','js-zgo', 'fonts', 'css'], function(){
})

gulp.task('images', function(){
  return gulp.src('static/images/**/*.+(png|jpg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest(DIST_IMG));
});

gulp.task('js', function(){
  return gulp.src(['static/assets/global/plugins/jquery.min.js','static/assets/global/plugins/bootstrap/js/bootstrap.min.js','static/assets/global/plugins/js.cookie.min.js','static/assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js','static/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js','static/assets/global/plugins/jquery.blockui.min.js','static/assets/global/plugins/jquery-repeater/jquery.repeater.min.js','static/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js','static/assets/global/plugins/jquery-ui/jquery-ui.min.js','static/assets/global/plugins/moment.min.js','static/assets/global/plugins/bootstrap-daterangepicker/daterangepicker.js','static/assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js','static/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js','static/assets/global/plugins/jquery-validation/js/jquery.validate.min.js','static/assets/global/scripts/datatable.js','static/assets/global/scripts/jquery.simplePagination.js','static/assets/global/plugins/datatables/datatables.min.js','static/assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.js','static/assets/global/plugins/select2/js/select2.full.min.js','static/assets/global/plugins/bootstrap-growl/jquery.bootstrap-growl.min.js','static/assets/global/plugins/bootstrap-summernote/summernote.js','static/assets/global/plugins/jquery-validation/js/additional-methods.min.js','static/assets/global/plugins/bootstrap-wizard/jquery.bootstrap.wizard.min.js','static/assets/global/scripts/app.min.js','static/assets/global/plugins/fullcalendar/fullcalendar.min.js','static/assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js','static/assets/pages/scripts/components-date-time-pickers.min.js','static/assets/pages/scripts/components-editors.min.js','static/js/onground/common.js','static/assets/pages/scripts/form-wizard.min.js','static/assets/pages/scripts/form-repeater.min.js','static/assets/pages/scripts/ui-sweetalert.min.js','static/assets/pages/scripts/components-select2.js','static/assets/pages/scripts/components-editors.min.js','/js/onground/common.js','static/assets/layouts/layout/scripts/layout.min.js','static/assets/layouts/layout/scripts/demo.min.js','static/assets/layouts/global/scripts/quick-sidebar.min.js','static/assets/global/plugins/uploadcare/uploadcare.full.min.js','static/assets/global/plugins/fancybox/source/jquery.fancybox.pack.js', 'static/assets/global/plugins/bootstrap-toastr/toastr.min.js','static/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js'])
    .pipe(concat('zinetgo-plugins.js'))
    .pipe(gulp.dest(DIST_JS))
    .pipe(rename('zinetgo-plugins.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(DIST_JS));
});

gulp.task('js-zgo', function(){
  return gulp.src('static/js/onground/**/*.js')
    .pipe(concat('zinetgo.js'))
    .pipe(gulp.dest(DIST_JS))
    .pipe(rename('zinetgo.min.js'))
    //.pipe(uglify())
    .pipe(gulp.dest(DIST_JS));
});

gulp.task('css', function(){
  return gulp.src(['static/assets/global/plugins/font-awesome/css/font-awesome.css','static/assets/global/plugins/simple-line-icons/simple-line-icons.css','static/assets/global/plugins/bootstrap/css/bootstrap.min.css','static/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css','static/assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.css','static/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css','static/assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css','static/assets/global/plugins/datatables/datatables.min.css','static/assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css','static/assets/global/plugins/select2/css/select2.min.css','static/assets/global/plugins/select2/css/select2-bootstrap.min.css','static/assets/global/plugins/fullcalendar/fullcalendar.min.css','static/assets/global/plugins/bootstrap-summernote/summernote.css','static/assets/global/plugins/bootstrap-sweetalert/sweetalert.css','static/assets/global/plugins/fullcalendar/fullcalendar.min.css','static/assets/global/css/components.min.css','static/assets/global/css/plugins.min.css','static/assets/layouts/layout/css/layout.min.css','static/assets/layouts/layout/css/themes/darkblue.min.css','static/assets/layouts/layout/css/custom.min.css','static/assets/global/plugins/fancybox/source/jquery.fancybox.css','static/assets/global/plugins/bootstrap-toastr/toastr.min.css','static/al/css/bootstrap-modal-bs3patch.css','static/al/css/bootstrap-modal.css','static/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css'])
    .pipe(minifyCSS())
    .pipe(concat('zinetgo.min.css'))
    .pipe(gulp.dest(DIST_CSS));
});

gulp.task('login-js', function(){
  return gulp.src(['static/login/js/jquery.min.js','static/login/js/bootstrap.min.js','static/login/js/bootstrap-hover-dropdown.min.js','static/login/js/jquery.slimscroll.min.js','static/login/js/jquery.validate.min.js','static/login/js/login.js'])
    .pipe(concat('zinetgo-login.js'))
    .pipe(gulp.dest(DIST_JS))
    .pipe(rename('zinetgo-login.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(DIST_JS));
});

gulp.task('login-css', function(){
  return gulp.src(['static/login/css/bootstrap.min.css','static/login/css/select2.min.css','static/login/css/select2-bootstrap.min.css','static/css/components.min.css','static/css/plugins.min.css','static/css/login.min.css','static/css/simplePagination.css'])
    .pipe(minifyCSS())
    .pipe(concat('zinetgo-login.min.css'))
    .pipe(gulp.dest(DIST_CSS));
});

gulp.task('fonts', function(){
  return gulp.src('static/css/fonts/**/*')
    .pipe(gulp.dest(DIST_FONTS));
})

