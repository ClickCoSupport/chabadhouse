window.addEventListener("DOMContentLoaded", function () {
  var cfg = window.heroVideo || {};
  var src      = cfg.src      || "/media/av/1366/YQUv13660646.mp4";
  var srcLarge = cfg.srcLarge || "/media/av/1366/YQUv13660646.mp4";
  var poster   = cfg.poster   || "/media/images/1366/tCdY13660649.jpg";

  var autoplayingVideo = '<div id="hero"><div class="texture"></div><video loop muted autoplay playsinline webkit-playsinline src="' + src + '" poster="' + poster + '">Your browser does not support the video tag.</video></div><style>#hero::after{width:100%;height:100%;content:"";position:absolute;left:0;background:rgba(0,0,0,0.5)}#hero video{width:100%;height:100%;position:absolute;left:0;object-fit:cover;}</style>';

  var script1 = document.createElement("script");
  script1.src = "https://www.unpkg.com/object-fit-videos@1.0.4/object-fit-videos.js";
  var script2 = document.createElement("script");
  script2.textContent = 'if (typeof ObjectFitVideos == "function") objectFitVideos()';

  var bannerItem = document.querySelector(".banner .widget_content.index_format .item");
  if (bannerItem) {
    var aboutContent = document.createElement("div");
    aboutContent.className = "about-content";
    [".title", ".subtitle", ".synopsis", "a.readMore"].forEach(function (sel) {
      var el = bannerItem.querySelector(sel);
      if (el) aboutContent.appendChild(el);
    });
    bannerItem.appendChild(aboutContent);
  }

  document.querySelectorAll(".sneak_peek .widget_content").forEach(function (wc) {
    var thumbnail = wc.querySelector("a.thumbnail");
    var img = thumbnail ? thumbnail.querySelector("img") : null;
    var h6 = wc.querySelector("h6");
    var p = wc.querySelector("p");
    if (!thumbnail || !img || !h6) return;

    thumbnail.innerHTML = "";
    var iconContent = document.createElement("div");
    iconContent.className = "icon-content";
    iconContent.appendChild(h6);
    if (p) iconContent.appendChild(p);

    wc.insertBefore(img, wc.firstChild);
    wc.insertBefore(iconContent, thumbnail);
  });

  var bodyElement = document.querySelector("body.home .hp-row-first a");
  if (bodyElement) {
    bodyElement.innerHTML = autoplayingVideo;
    bodyElement.appendChild(script1);
    bodyElement.appendChild(script2);
    if (window.matchMedia("(min-width: 500px)").matches) {
      document.querySelector("#hero video").src = srcLarge;
    }
  }
});
