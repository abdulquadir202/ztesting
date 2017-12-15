function createCookie(refCookieName, urlCookieName) {
  var cookieExist = document.cookie.indexOf(refCookieName) >= 0;
  var referrer = document.referrer;

  if(!cookieExist && referrer) {
    var expiry = new Date();
    var days = 30;
    expiry.setTime(expiry.getTime() + (days * 24 * 60 * 60 * 1000));

    var affix = '; expires=' + expiry.toGMTString() + '; domain=.zoho.com; path=/';

    document.cookie = refCookieName + '=' + encodeURIComponent(referrer) + affix;
    document.cookie = urlCookieName + '=' + encodeURIComponent(location.href) + affix;
  }
}


/*
 * @method - setSelectedTab
 *  - To select current active tab in header band
 */

function setSelectedTab(elementID) {
  $("#"+elementID + " > a").addClass("selected");
}
/*
 * @method - setSelectedFeature
 *  - To select current active feature under all features list
 */
function setSelectedFeature(elementID) {
  $("#"+elementID).addClass("selected");
}


$(document).ready(function() {
	resetHeader();
	var script = document.createElement('script');
	//script.src = "https://accounts.csez.zohocorpin.com/u/info";
	script.src = "https://accounts."+domain+".com/u/info";
	//script.src = "https://accounts.zoho.com/u/info";
	document.getElementsByTagName('head')[0].appendChild(script);
	script.onload = showUserInfo;
});


/*
 * @method - showUserInfo
 *
 * - To check whether user logged in or not. If yes, we will replace `signin` and `signup` btns with `Access Zoho Invoice` btn.
 */
function showUserInfo() {
	resetHeader();
	var username = zohouser.DISPLAY_NAME;
	if (username) {
		function decodeHexString(str){
          str = str.replace(/\\x([0-9A-Fa-f]{2})/g, function(){return String.fromCharCode(parseInt(arguments[1], 16));});
          str = str.replace(/\\u([\d\w]{4})/gi, function() {
            return String.fromCharCode(parseInt(arguments[1], 16));
          });
          return str;
        }
		//Show User name in top header eg. Welcome <user_name>!
		username = decodeHexString(zohouser.DISPLAY_NAME);
		$('.signin').css('display', 'none');
		$('.signup').css('display', 'none');
		$("#pricing-try-section").css('display', 'none');

		//Signup form replacement
		$(".z-signup").css("visibility", "hidden");
		$("#z-access").html("<div class='z-access'><h3>Looks like you're already logged in!</h3><div><a class='btn-prim' href='https://invoice." + domain + ".com/home'>Access Zoho Invoice</a></div></div>");
	} else {
		$(".z-signup").css("visibility", "visible");
		$("#companyName").focus();
	}
}

function resetHeader() {
	m = window.location.href;
	m = m.replace("http://www.", '');
	m = m.replace("https://www.", '');
	m = m.replace("http://", '');
	m = m.replace("https://", '');
	domain = m.split(".com");
	domain = domain[0];
}

/* Edition selection box */
var isMouseOnList = false;

$('.edition-select-list').mouseover(function(){
    isMouseOnList = true;
});

$('.edition-select-list').mouseout(function(){
    isMouseOnList = false;
});

function selectListAction(){
    var selectList = $('.edition-select-list');
    if(selectList.hasClass('open')){
       hideSelectList();
    }
    else {
        selectList.addClass('open');
        $('#zb-edition').focus();
        selectList.css('display','inherit');
        $('#select-caret').addClass('open-caret');
    }

}
function hideSelectList(selectList){
    if(!isMouseOnList){
        var selectList = $('.edition-select-list');
        selectList.removeClass('open');
        selectList.css('display','none');
        $('#select-caret').removeClass('open-caret');
    }
}
