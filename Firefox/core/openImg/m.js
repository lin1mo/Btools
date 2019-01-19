/*

  openImg 获取封面图

*/
const openImgSet = {
  loopNum: 0,
  loopMax: 10,
  timer: null,
  timerOff: false,
  urlReg: /([^\@]*)(?:\@.*\.webp)?/,
  bannerImgReg: /url\("((?:http|https):\/\/[^\@]*)(?:\@.*\.(?:webp|jpg|png|gif))?"\)/,
  watchlaterUrlReg: /(?:http|https):\/\/www\.bilibili\.com\/watchlater\/.*/
}

openImgSet.timer = setInterval(function(){
  if($('#bofqi').length > 0) {
    var openImgBtnHTML =
      '<div class="BtoolsLogoBtn">' +
        '<a href="javascript:void(0);"></a>' +
      '</div>' +
      '<div class="BtoolsBtnAll">' +
        '<a id="BtoolsOpenImg" href="javascript:void(0);">获取封面</a>' +
      '</div>';
    var bofqiTop = $('#bofqi').offset().top + 22;
    var bofqiLeft = $('#bofqi').offset().left - 40;
    $('body').append(openImgBtnHTML).find('.BtoolsLogoBtn').css({
      'top': bofqiTop,
      'left': bofqiLeft
    });
    $('.BtoolsBtnAll').css({
      'top': bofqiTop + 40,
      'left': bofqiLeft - 5
    });

    if(/[^\.]*\.bilibili\.com\/bangumi\//.test(window.location.href)) {
      var href = 'javascript:void(window.open(window.__INITIAL_STATE__.epInfo.cover))';
      $('.BtoolsBtnAll').append('<a href="javascript:void(window.open(window.__INITIAL_STATE__.mediaInfo.cover))">获取海报</a>');
    } else {
      var href = 'javascript:void(window.open(window.__INITIAL_STATE__.videoData.pic))';
    }

    $('#BtoolsOpenImg').click(function(){
      if(openImgSet.watchlaterUrlReg.test(window.location.href)) {
        if($('.bilibili-player-watchlater-item[data-state-play=true] img').length > 0) window.open(openImgSet.urlReg.exec($('.bilibili-player-watchlater-item[data-state-play=true] img').attr('src'))[1]);
      } else {
        $('#BtoolsOpenImg').attr({
          'href': href
        }).unbind('click').click();
      }
    });
    clearInterval(openImgSet.timer);

    // 直播封面获取
  } else if($('#BtoolsLiveHelperOptions').length > 0) {
    var openImgBtnHTML = '<p class="BtoolsOption"><a href="javascript:void(if(window.__NEPTUNE_IS_MY_WAIFU__.baseInfoRes.data.user_cover!==\'\') window.open(window.__NEPTUNE_IS_MY_WAIFU__.baseInfoRes.data.user_cover))">打开封面</a></p>';
    $('#BtoolsLiveHelperMsg').before(openImgBtnHTML);
    clearInterval(openImgSet.timer);

    // 文章头图获取
  } else if($('.banner-img-holder').length > 0) {
    var openImgBtnHTML = '<a id="BtoolsOpenBannerImg" href="javascript:void(0);">获取头图</a>';

    var btnTop = $('.banner-img-holder').offset().top + 10;
    var btnLeft = $('.banner-img-holder').offset().left + $('.banner-img-holder').width() - 50;

    $('body').append(openImgBtnHTML).find('#BtoolsOpenBannerImg').css({
      'top': btnTop,
      'left': btnLeft
    });
    $('#BtoolsOpenBannerImg').click(function(){
      window.open(openImgSet.bannerImgReg.exec($('.banner-img-holder').css('background-image'))[1]);
    });

    clearInterval(openImgSet.timer);
  }
}, 200);