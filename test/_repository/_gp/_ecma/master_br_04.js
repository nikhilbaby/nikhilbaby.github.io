
var dmpMouseXPos = 0;
var dmpMouseYPos = 0;
var SocialRules = (location.href.indexOf("social.ray-ban.com") != -1);
var br_debug = true;

jQuery(document).ready(function () {
    function readCookie(name) {
        name = name.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
        var regex = new RegExp('(?:^|;)\\s?' + name + '=(.*?)(?:;|$)', 'i'),
        match = document.cookie.match(regex);
        return match && unescape(match[1]);
    }
    if (!readCookie('rayban_cookies_policy')) $('#cookieBar').fadeIn();

    //Animate zooming banner hover
    var banner = $('div[id^="banner"]');
    
    (function(){
        var obj=$('#raybanSlider').data('royalSlider');
    
        if(obj){ // plugin has run, object exists
            hackrockfy();
        }else{ // plugin not called yet
            $('#raybanSlider').data('hackrock',hackrockfy);
        }
		function hackrockfy(){
			var api=$('#raybanSlider').data('royalSlider');
            //api.removeSlides(1);
			//if(ctryid){
				//switch(ctryid){
					//case '23':
					/*var $slide = $('.linkSlide').filter(function(){return $(this).attr('href').match(/rb_dia-das-maes/)}).eq(0);
                    $slide.attr('href',$slide.attr('href').replace('static/rb_dia-das-maes','oculos-de-sol/diadasmaes'));*/
					//	//api.removeSlides(0);
					//	break;
                     //case '75':
                     //   $('.linkSlide').filter(function(){return $(this).attr('href').match(/rb_dia-das-maes/)}).eq(0).find('.royalCaptionItem.second').remove();
                     //   break;
				//}
			//}
		}
    })();
    
    var isiPad = (navigator.userAgent.match(/iPad/i) != null);
	if (!isiPad) {
        /*
        $(banner).live({
        mouseenter:
        function () {
        var hoverBox = $("<img src='/_repository/_gui/2012/hover.png' id='hoverImg'/>");
        $(this).find('p').append(hoverBox);
        hoverBox.hide().fadeIn({ queue: false });

        }, 
        mouseleave:
        function () {
        $(this).find('#hoverImg').fadeOut(function () {
        $(this).remove();
        });
        }

        });
        */


        $(banner).css({ position: 'relative' }).live({
            mouseenter:
			function () {
			    var parentClass = $(this).parent().parent().attr('class');
			    var widthOffset = 0;
			    switch (parentClass) {
			        case 'column_left':
			            widthOffset = -6;
			            break;
			        case 'column_center':
			            widthOffset = -4;
			            break;
			        case 'column_right':
			            widthOffset = 0;
			            break;
			        default:
			            widthOffset = 0;
			    }
			    var w = $(this).width();
			    var h = $(this).height();
			    var hoverBox = $('<div style="width: ' + (w + widthOffset) + 'px; height: ' + h + 'px; left: 0; top: 0; background: url(/_repository/_gui/2012/pixel_black_30.png);" id="hoverImg"></div>');
			    $(this).find('a').append(hoverBox);
			    hoverBox.hide().fadeIn(200);
			    $(this).find('span').css({
			        'z-index': 4
			    });

			},
            mouseleave:
			function () {
			    $(this).find('#hoverImg').fadeOut(200, function () {
			        $(this).remove();
			    });
			}

        });

        noImgSaveAs();
    }

    $(window).mousemove(function (e) {
        dmpMouseXPos = e.pageX;
        dmpMouseYPos = e.pageY;
    });

    if (SocialRules == false) {
        //console.log('is not a Social Domain');
        loginmenu();
        int_test();
    }

    /* fix shipping bar text if too long */
    // shippingBarStyle()

    /* hide features with HIDEME as text */
    $('.royalCaptionItem').filter(function () { return $(this).text().trim() === 'HIDEME' }).css({ 'background': 'transparent', 'color': 'transparent' });

    if (typeof ctryid !== 'undefined' && typeof setCookie === 'function') {
        setCookie('ctryid', ctryid, 180);
        setCookie('ctrypckr', ctryid, 180, '.ray-ban.com');
    }
});
//document ready end

//function sidebarFix() {

//    $(window).off("resize").on("resize", function (e) {
//        resize_panel();
//        resize_panel_header_footer();
//        scroller();
//        var mySliderInstance = $("#raybanSlider").data("royalSlider");
//        console.log(mySliderInstance);
//        mySliderInstance.updateSliderSize();
//    });

//    $(document).off("resize").on("resize", function (e) {
//        resize_panel();
//        resize_panel_header_footer();
//        var mySliderInstance = $("#raybanSlider").data("royalSlider");
//        console.log(mySliderInstance);
//        mySliderInstance.updateSliderSize();
//    });
//}


function setCookie(cname, cvalue, exdays, cdom) {
    var cdom = cdom || '';
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; path=/;" + "domain=" + cdom + ";" + expires;
}

function loginmenu() {
    var userName = null;
    var userLogged = false;
    try {
        var userObject = window.infrashop_integration.customer.getUserInfo();
        if (userObject && userObject.shortName != undefined) userName = userObject.shortName;
        userLogged = window.infrashop_integration.customer.isLogged();
    } catch (e) {
        if (br_debug) console.log(e);
    }

    if (userName) {
        $('.wcs-login-link').text(userName + ' (' + $('.wcs-login-link').text() + ')');
    }
    if (userLogged) {
        $('.wcs-myacc-loginlink').replaceWith('<li class="wcs-myacc-logout"><a href="javascript:window.infrashop_integration.customer.logout();" id="HeaderDN_Logout">log out</a></li>');
    }


    
    $.ajax({
    type: "GET",
    url: '/brazil/staticlight/25008',
    complete: function (data) {
    //console.log(data);
    $('.wcs-utility-nav').replaceWith(data.responseText);
    /*if ($('#wcsUserId').attr('id') != undefined) { userid = $('#wcsUserId').val(); }
    if ($('#wcsUserType').attr('id') != undefined) userType = $('#wcsUserType').val();

    headerprofile_refresh(storeid, userid, userType);
    sidebar_refresh(catalogid, langid, storeid, userid);*/
    }
    });
}

var sliderInitiated = 0;
function sidebar_refresh(catalogid, langid, storeid, userid) {
    $.ajax({
        type: "GET",
        url: 'SideBarView?ref=D&catalogId=' + catalogid + '&langId=' + langid + '&storeId=' + storeid + '&userId=' + userid,
        //url: '/_repository/_httpHandlers/wcsproxy.ashx?wcssrv=SideBarView&ref=D&catalogId=' + catalogid + '&langId=' + langid + '&storeId=' + storeid + '&userId=' + userid,
        success: function (data) {
            var sidebarObj = $('#wcs-sidebar-panel');
            if ($(sidebarObj).attr('id') == undefined) sidebarObj = $('.wcs-panel-container');
            $(sidebarObj).replaceWith(data);
            selected_country_value();
            var DmpcountryWidth = $('#countryId').width();
            sliderRightMenu();
            //overAllSiteHeaderFunctions();
        }
    });
}

function headerprofile_refresh(storeid, userid, userType) {
    $.ajax({
        type: "GET",
        url: 'DMPHeaderProfileView?ref=D&storeId=' + storeid + '&userId=' + userid + '&userType=' + userType,
        //url: '/_repository/_httpHandlers/wcsproxy.ashx?wcssrv=DMPHeaderProfileView&ref=D&storeId=' + storeid + '&userId=' + userid + '&userType=' + userType,
        success: function (data) {
            $('.wcs-right-slider-nav').replaceWith(data);
            //$('.wcs-right-slider-nav').css('z-index','1');
            //overAllSiteHeaderFunctions();
        }
    });
}
var latestQuickViewId;
function int_test() {
    if (window.location.hash.indexOf('showQuickBuy') > -1) {
        var cids = [805289126577, 713132414224, 805289745549, 8053672027464, 805289178354, 805289324485];
        var bannerQV, banner = $('#cmscontent a[href*="neverhide/moments-of-clarity"]');
        var select = '<select>';
        for (var i = 0; i < cids.length; i++) {
            select += '<option>' + cids[i] + '</option>';
        }
        select += '</select>';

        if (banner.attr('href') != undefined) {
            if ($('#int_test').attr('id') == undefined) {
                bannerQV = banner.parent('div');
                $(bannerQV).append(
				'<div id="int_test" class="gp-hotspotContainer">' +
					'<span class="gp-hotspot" data-id="50069">Quick View</span>' +
					'<div id="addToCartTest">' + select + ' <span style="cursor:pointer;" id="addCartLink" class="addCartLink">Add to cart</span>' +
                    '<span style="cursor:pointer;" id="addFavLink" class="addCartLink">Add to favorites</span></div>' +
				'</div>'
			);
            }
            $('.gp-hotspot').on('click', function () {
                var id = $(this).attr('data-id');
                id !== latestQuickViewId ? dmp_quick_view(id, $(this)) : dmp_quick_view();
            });
            $('#addCartLink').on('click', function () {
                dmp_addtocart($('#addToCartTest select').val());
            });
            $('#addFavLink').on('click', function () {
                dmp_addtofav($('#addToCartTest select').val());
            });
        }
    }
}
/*function dmp_quick_view(productUPC, hs) {
latestQuickViewId = productUPC;
if (productUPC!==undefined) {
var x = hs.offset().left - 5;
var y = hs.offset().top - 17;
$.ajax({
type: "GET",
url: 'CatalogEntryDispPanel?ref=D&productUPC=' + productUPC + '&storeId=' + storeid,
success: function (data) {
//$('body').append('<div class="inner wcs-three wcs-columns wcs-top-margin-spacer wcs-omega">' + data + '</div>');
//x = $('#int_test').offsetLeft();
//y = $('#int_test').offsetTop();
var $data = $(data);
var out = '';

var prodName = customStringFunctions.trim($data.find('.wcs-product-description div:nth-child(2) div div:nth-child(1) strong').html());
var prodCost = customStringFunctions.trim($data.find('.wcs-product-description div:nth-child(2) div div:nth-child(2) span').html());
var b1 = customStringFunctions.trim($data.find('.wcs-product-quick-buy div:nth-child(1)').html());
var b2 = customStringFunctions.trim($data.find('.wcs-product-quick-buy div:nth-child(2)').html());
var out = '' + prodName + ' ' + prodCost + '<br />' + b1 + '<br />' + b2 + '<span class="dmp-quick-view-box-arrow"></span><a class="closeButton"></a>';

$('#dmp-quick-view-box').html(out);
$('#dmp-quick-view-box').css('top', y);
$('#dmp-quick-view-box').css('left', x + 50);
$('#dmp-quick-view-box').fadeIn();
$('.wcs-fadeout-full').fadeIn().click(function () { dmp_quick_view() });
$('#dmp-quick-view-box .closeButton').click(function () { dmp_quick_view() });
}
});
} else {
$('#dmp-quick-view-box').fadeOut();
}
}*/

function dmp_quick_view(productUPC, hs) {
    latestQuickViewId = productUPC;
    if (productUPC !== undefined) {
        var x = hs.offset().left - 5;
        var y = hs.offset().top - 17;
        $.ajax({
            type: "GET",
            //url: storeid + '/productview/' + productUPC,
            url: 'http://' + document.domain + '/brazil/api/productLookup/' + productUPC,
            //url: '/brazil/espiar/' + productUPC,
            //url: '/_repository/_gp/_ecma/fakejson.js',
            dataType: 'json',
            success: function (data) {
                var elem = data[0];
                //$('body').append('<div class="inner wcs-three wcs-columns wcs-top-margin-spacer wcs-omega">' + data + '</div>');
                //x = $('#int_test').offsetLeft();
                //y = $('#int_test').offsetTop();
                var out = '';
                /*
                var obj = getAttributeByIdentifier(data.CatalogEntryView[0].Attributes, 'MODELNAME');
                var obj2 = getAttributeByIdentifier(data.CatalogEntryView[0].Attributes, 'SKU');
                var obj3 = getAttributeByIdentifier(data.CatalogEntryView[0].Attributes, 'FRONT_COLOR');
                var obj4 = getAttributeByIdentifier(data.CatalogEntryView[0].Attributes, 'PRODUCTTYPE');
                */

                //var front_color = obj3.Values[0].identifier;


                //var prodType = obj4.Values[0].identifier;
                //var prodTypePath;
                /*switch (prodType) {
                case 'SUN':
                prodTypePath = wcsSunProductURL;
                case 'OPTICAL':
                prodTypePath = wcsOpticsProductURL;
                }*/
                //var prodCost = wcsCurrencySymbol + ' ' + parseInt(data.CatalogEntryView[0].Price[1].priceValue);


                //var buyable = data.CatalogEntryView[0].buyable === 'true';
                //$('#dmp-quick-view-box #dmp-qbb').click(function () { window.show_quick_buy($(this)) });

                dmp_quick_view_render(elem, x, y);
            },
            error: function (err) {
                if (br_debug) {
                    console.log('Error: ' + JSON.stringify(err));
                    console.log('Error in IFR Service results - fake static data will be used');
                    var elem = { "product_id": 50069,
                        "sku_list": [{ "sku_id": 805289126577}],
                        "range_skus_price": [500.00, 500.00],
                        "name": "ORIGINAL WAYFARER CLASSIC Black",
                        "product_url": "/brazil/sunglasses/sunplp/original-wayfarer-classic-black_50069"
                    };
                    dmp_quick_view_render(elem, x, y);
                }

            }
        });
    } else {
        $('#dmp-quick-view-box').fadeOut();
    }
}


function dmp_quick_view_render(elem, x, y) {
    var sku = elem.sku_list[0].sku_id;
    var prodName = elem.name;
    var prodCost = elem.range_skus_price[0];
    var uniqueID = elem.product_id;
    var parentProductID = uniqueID;
    var viewMoreURL = elem.product_url;

    //var b1 =		'<a id="dmp-qbb" data-quick_buy_id="' + uniqueID +
    var b1 = '<a id="dmp-qbb"' +
					'" data-parent_id="' + parentProductID +
					'" data-styles="' + sku + '" data-cluster="" data-model="" data-price="$' + prodCost + '" href="javascript:void(0);" class="wcs-boxborder product_quick_buy">QUICK BUY</a>';
    var b2 = '<a href="' + viewMoreURL + '">View more</a>';
    var out = '' + prodName + ' R$ ' + prodCost + '<br />' + b1 + '<br />' + b2 + '<span class="dmp-quick-view-box-arrow"></span><a class="closeButton"></a>';

    $('#dmp-quick-view-box').html(out);
    $('#dmp-quick-view-box').css('top', y);
    $('#dmp-quick-view-box').css('left', x + 50);
    $('#dmp-quick-view-box').fadeIn();
    $('.wcs-fadeout-full').fadeIn().click(function () { dmp_quick_view() });
    $('#dmp-quick-view-box .closeButton').click(function () { dmp_quick_view() });
    $('#dmp-quick-view-box .product_quick_buy').click(function () { dmp_quick_buy_render(uniqueID); });
}

function dmp_quick_buy_render(product_id) {
    $.ajax({
        type: "GET",
        url: 'http://' + document.domain + '/brazil/espiar/' + product_id,
        success: function (data) {
            $("#product_quickbuy_div").html(data);

            $(".wcs-fadeout-full").removeClass("wcs-hide");
            $("#product_quickbuy_div").show();
            $("body").is("ipad") || $("body").is("android") ? $(".wcs-fadeout-full").css({
                "min-height": "100%",
                "z-index": "101"
            }) : $(".wcs-fadeout-full").css({
                "height": $(document).height() + "px",
                "top": "0px",
                "z-index": "101"
            })
        },
        error: function () {
        }
    });
}
function getAttributeByIdentifier(objectsArray, identifier) {
    for (var i = 0; i < objectsArray.length; i++) {
        var obj = objectsArray[i];
        if (obj.identifier === identifier) {
            return obj;
        }
    }
    return false;
}

function dmp_addtocart(catEntryId) {
    try {
        window.infrashop_integration.cart.addProduct(catEntryId, 1);
    } catch (e) {
        if (br_debug) console.log(e);
    }
    /*$.ajax({
    type: "GET",
    url: 'https://'+document.domain+'/brazil/ckout/updateItems.xhtml?addsku={' + catEntryId + ',1}',
    success: function (data) {
    //headerprofile_refresh(storeid, userid, userType);
    sidebar_refresh(catalogid, langid, storeid, userid);
    }
    });*/
}

function dmp_addtofav(catEntryId) {
    try {
        window.infrashop_integration.productFavorite.addProduct(catEntryId);
    } catch (e) {
        if (br_debug) console.log(e);
    }
    /*$.ajax({
    type: "GET",
    url: 'https://'+document.domain+'/brazil/ckout/updateItems.xhtml?addsku={' + catEntryId + ',1}',
    success: function (data) {
    //headerprofile_refresh(storeid, userid, userType);
    sidebar_refresh(catalogid, langid, storeid, userid);
    }
    });*/
}

function noImgSaveAs() {
    // adds an overlay div to img to prevent right click download
    // containers object:
    // key (element to look for target images)
    // value (closest img parent to add class noimg)
    var 
                containers = {
                    '.wcs-hd-container': 'a',
//                    '#newItems': 'li',
//                    '.RBPV_zoomView': '.RBPV_zoomer',
//                    '.RBPV_360View': '.RBPV_rotator'
                },
                $imgCover = $('<div class="noimgCover"></div>'),
                $thisContainer, $imgClosest
            ;

    $(Object.keys(containers)).each(function (idx, key) {
        $('body').delegate(key, 'mouseover', function () {
            $thisContainer = $(this);
            $thisContainer.find('img').each(function () {
                $imgClosest = $(this).closest(containers[key]);
                $imgClosest.addClass('noimg');
                if (!$imgClosest.find('.noimgCover')[0]) {
                    $(this).after($imgCover.clone());
                }
            });
        });
    });
}

var customStringFunctions = {
    trim: function (arg) { return arg.replace(/^\s+|\s+$/g, ''); },
    ltrim: function (arg) { return arg.replace(/^\s+/, ''); },
    rtrim: function (arg) { return arg.replace(/\s+$/, ''); },
    fulltrim: function (arg) { return arg.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' '); }
};

/*function shippingBarStyle() {
    var vanWidth = $('#wcs-shipping-van').outerWidth(true);
    var textWidth = $(".wcs-shipping-bar-text").outerWidth(true);
    var barWidth = $('#wcs-shipping-container').parent(".wcs-container").width();
    $("#wcs-shipping-container").css({ 'width': '420px' }).css({ 'margin-left': (barWidth - (vanWidth + textWidth)) / 2 });
}*/

