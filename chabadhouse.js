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
    var iconDiv = bannerItem.querySelector(".icon");
    var img = iconDiv ? iconDiv.querySelector("img") : null;
    if (img) {
      bannerItem.insertBefore(img, bannerItem.firstChild);
      iconDiv.parentNode.removeChild(iconDiv);
    }
    var aboutContent = document.createElement("div");
    aboutContent.className = "about-content";
    [".title", ".subtitle", ".synopsis", "a.readMore"].forEach(function (sel) {
      var el = bannerItem.querySelector(sel);
      if (el) aboutContent.appendChild(el);
    });
    bannerItem.appendChild(aboutContent);
  }

  document.querySelectorAll(".ct-h-actions .item").forEach(function (item) {
    var title = item.querySelector(".title");
    var synopsis = item.querySelector(".synopsis");
    if (!title && !synopsis) return;
    var iconContent = document.createElement("div");
    iconContent.className = "icon-content";
    if (title) iconContent.appendChild(title);
    if (synopsis) iconContent.appendChild(synopsis);
    item.appendChild(iconContent);
  });

  var testimonialSlider = {
    init: function init() {
      this.setupSlider();
    },
    setupSlider: function setupSlider() {
      var sliderContainer = jQuery(".testimonials");
      var slidesContainer = jQuery(".testimonials .widget_content");

      sliderContainer.append("<div class='carousel-container'><div class='owl-carousel'></div></div>");
      var slider = sliderContainer.find(".owl-carousel");

      slidesContainer.find(".item").each(function () {
        var itemEl = jQuery("<div class='item'><div class='image-container'></div><div class='text-container'></div></div>");
        jQuery(this).find(".icon").appendTo(itemEl.find('.image-container'));
        jQuery(this).contents().appendTo(itemEl.find('.text-container'));
        itemEl.appendTo(slider);
      });

      slider.find('.item').each(function () {
        var item = jQuery(this);
        var img = item.find('.image-container img');
        var textContainer = item.find('.text-container');
        var title = textContainer.find('.title');
        var testimonialPerson = jQuery("<div class='testimonial-person'></div>");

        img.appendTo(testimonialPerson);

        if (title.length) {
          var titleText = title.text();
          if (titleText.indexOf('|') !== -1) {
            var parts = titleText.split('|');
            title.html(parts[0].trim() + ' <span>' + parts[1].trim() + '</span>');
          }
          title.appendTo(testimonialPerson);
        }

        textContainer.prepend(testimonialPerson);
      });

      var singleItem = slider.find('.item').length == 1;
      slider.owlCarousel({
        loop: singleItem ? false : true,
        margin: 0,
        nav: singleItem ? false : true,
        touchDrag: singleItem ? false : true,
        mouseDrag: singleItem ? false : true,
        items: 1,
        addClassActive: true,
        autoplay: true,
        autoplayTimeout: 5000
      });
    }
  };

  if (jQuery(".testimonials").length) {
    var owlCSS = document.createElement("link");
    owlCSS.rel = "stylesheet";
    owlCSS.href = "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css";
    document.head.appendChild(owlCSS);

    var owlJS = document.createElement("script");
    owlJS.src = "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js";
    owlJS.onload = function () {
      testimonialSlider.init();
    };
    document.head.appendChild(owlJS);
  }

  var monthAbbr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  document.querySelectorAll(".upcoming_events li").forEach(function (li) {
    var small = li.querySelector("small");
    if (!small) return;
    var match = small.textContent.match(/(\w+)\s+(\d+),\s+\d{4}/);
    if (!match) return;
    var monthIndex = new Date(match[1] + " 1").getMonth();
    var day = match[2];
    var timeParts = small.textContent.split(" - ");
    if (timeParts.length > 1) small.textContent = timeParts[1].trim();
    var dateBox = document.createElement("div");
    dateBox.className = "event-date";
    dateBox.innerHTML = "<span>" + day + "</span>" + monthAbbr[monthIndex];
    var eventContent = document.createElement("div");
    eventContent.className = "event-content";
    while (li.firstChild) eventContent.appendChild(li.firstChild);
    var link = eventContent.querySelector("a");
    var eventContentWrap = document.createElement("div");
    eventContentWrap.className = "event-content-wrap";
    eventContentWrap.appendChild(eventContent);
    if (link) {
      var btn = document.createElement("a");
      btn.href = link.href;
      btn.className = "event-details-btn";
      btn.textContent = "View Details";
      eventContentWrap.appendChild(btn);
    }
    li.appendChild(dateBox);
    li.appendChild(eventContentWrap);
  });

  var photosContent = document.querySelector(".photos .widget_content");
  var footer = document.querySelector("#footer");
  var bottomPadding = footer ? footer.querySelector(".bottom_padding.clear_float") : null;
  if (photosContent && bottomPadding) {
    footer.insertBefore(photosContent, bottomPadding);
  }

  jQuery(".departments .item").on("click", function () {
    var href = jQuery(this).find("a").attr("href");
    if (href) window.location.href = href;
  }).css("cursor", "pointer");

  var connect = document.querySelector(".connect");
  var hpSubscribe = document.querySelector(".hp_subscribe");
  if (connect && hpSubscribe) {
    var connectWrapper = document.createElement("div");
    connectWrapper.className = "connect-wrapper";
    var connectSection = document.createElement("div");
    connectSection.className = "connect-section";
    connect.parentNode.insertBefore(connectWrapper, connect);
    connectSection.appendChild(connect);
    connectSection.appendChild(hpSubscribe);
    connectWrapper.appendChild(connectSection);
  }

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
