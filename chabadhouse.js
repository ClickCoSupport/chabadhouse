window.addEventListener("DOMContentLoaded", function () {

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

  var photos = document.querySelector('.hp-row.photos');
  var footer = document.getElementById('footer');
  if (photos && footer) {
    footer.insertBefore(photos, footer.firstChild);
  }

  jQuery(".departments .item").on("click", function () {
    var href = jQuery(this).find("a").attr("href");
    if (href) window.location.href = href;
  }).css("cursor", "pointer");

});
