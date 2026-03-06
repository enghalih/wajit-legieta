document.addEventListener("DOMContentLoaded", function () {
  const testimonialContainer = document.getElementById("testimonials");
  const productContainer = document.getElementById("product");
  const socialMediaContainer = document.getElementById("social-media");
  const heroSliderContainer = document.getElementById("heroSlider18");
  const bestSellerOfferContainer = document.getElementById("bestSellerOffer");

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // Handle Best Seller Offer
      if (bestSellerOfferContainer && data.product) {
        const bestSellers = data.product
          .filter((p) => p.bestSeller)
          .slice(0, 2);
        bestSellerOfferContainer.innerHTML = "";

        bestSellers.forEach((p) => {
          const offerHtml = `
                    <div class="col-md-6">
                        <div class="offer-card" data-overlay="title" data-opacity="5" data-bg-src="${p.image}" style="background-image: url('${p.image}')">
                            <div class="box-content">
                                <span class="box-subtitle">Produk Terlaris</span>
                                <h4 class="box-title">${p.name}</h4>
                                <div class="btn-wrap">
                                    <a href="#cta-area" class="btn style4">
                                        <span class="link-effect">
                                            <span class="effect-1">BELI SEKARANG</span>
                                            <span class="effect-1">BELI SEKARANG</span>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>`;
          bestSellerOfferContainer.innerHTML += offerHtml;
        });
      }

      // Handle Headline (Hero Slider)
      if (heroSliderContainer && data.headline) {
        const isSlickInitialized =
          $(heroSliderContainer).hasClass("slick-initialized");

        if (isSlickInitialized) {
          const slideCount =
            $(heroSliderContainer).slick("getSlick").slideCount;
          for (let i = slideCount - 1; i >= 0; i--) {
            $(heroSliderContainer).slick("slickRemove", i);
          }
        } else {
          heroSliderContainer.innerHTML = "";
        }

        data.headline.forEach((h) => {
          const headlineHtml = `
                    <div class="hero-slider" data-bg-src="${h.image}" style="background-image: url('${h.image}'); background-size: cover; background-position: center; height: calc(100vh - 100px);">
                        <div class="hero-overlay" style="display: grid; align-items: center;" data-overlay="title" data-opacity="8"></div>
                        <div class="container container3">
                            <div class="row">
                                <div class="col-md-7 align-center">
                                    <div class="hero-style18">
                                        <h1 class="hero-title" data-ani="slideinleft" data-ani-delay="0.1s">
                                            ${h.title}
                                        </h1>
                                        <a href="#cta-area" class="btn style4" data-ani="slideinleft" data-ani-delay="0.2s">
                                            <span class="link-effect">
                                                <span class="effect-1">BELI SEKARANG</span>
                                                <span class="effect-1">BELI SEKARANG</span>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

          if (isSlickInitialized) {
            $(heroSliderContainer).slick("slickAdd", headlineHtml);
          } else {
            heroSliderContainer.innerHTML += headlineHtml;
          }
        });
      }

      // Handle Testimonials
      if (testimonialContainer && data.testimony) {
        const testimonies = data.testimony;
        const isSlickInitialized =
          $(testimonialContainer).hasClass("slick-initialized");

        if (isSlickInitialized) {
          const slideCount =
            $(testimonialContainer).slick("getSlick").slideCount;
          for (let i = slideCount - 1; i >= 0; i--) {
            $(testimonialContainer).slick("slickRemove", i);
          }
        } else {
          testimonialContainer.innerHTML = "";
        }

        testimonies.forEach((t) => {
          const testimonyHtml = `
                    <div class="col-lg-12">
                        <div class="testi-box style7">
                            <div class="rating-wrap">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <p class="testi-box_text">${t.content}</p>
                            <div class="testi-box_profile">
                                <h4 class="testi-box_name">${t.name}</h4>
                                <span class="testi-box_desig">${t.source}</span>
                            </div>
                        </div>
                    </div>`;

          if (isSlickInitialized) {
            $(testimonialContainer).slick("slickAdd", testimonyHtml);
          } else {
            testimonialContainer.innerHTML += testimonyHtml;
          }
        });
      }

      // Handle Products
      if (productContainer && data.product) {
        productContainer.innerHTML = ""; // Clear static products
        data.product.forEach((p) => {
          const bestSellerTag = p.bestSeller
            ? '<div class="tag">TERLARIS</div>'
            : "";
          const productHtml = `
                    <div class="col-xl-3 col-sm-6 col-6">
                        <div class="product-card">
                            <a href="#cta-area" class="product-img">
                                <img src="${p.image}" alt="${p.name}">
                                ${bestSellerTag}
                            </a>
                            <div class="product-content">
                                <h3 class="product-title"><a href="#cta-area">${p.name}</a></h3>
                                <span class="price">
                                    <del>${formatRupiah(p.priceBeforeDiscount)}</del>
                                    ${formatRupiah(p.price)}
                                </span>
                            </div>
                        </div>
                    </div>`;
          productContainer.innerHTML += productHtml;
        });
      }

      // Handle Social Media
      if (socialMediaContainer && data.socialMedia) {
        const isSlickInitialized =
          $(socialMediaContainer).hasClass("slick-initialized");

        if (isSlickInitialized) {
          const slideCount =
            $(socialMediaContainer).slick("getSlick").slideCount;
          for (let i = slideCount - 1; i >= 0; i--) {
            $(socialMediaContainer).slick("slickRemove", i);
          }
        } else {
          socialMediaContainer.innerHTML = "";
        }

        data.socialMedia.forEach((s) => {
          const socialHtml = `
                    <div class="col-lg-12">
                        <a class="instagram-card" onclick="" href="${s.url}" target="_blank">
                            <img src="${s.image}" alt="img" />
                            <span class="icon-btn"></span>
                        </a>
                    </div>`;

          if (isSlickInitialized) {
            $(socialMediaContainer).slick("slickAdd", socialHtml);
          } else {
            socialMediaContainer.innerHTML += socialHtml;
          }
        });
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
});
