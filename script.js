history.scrollRestoration = "manual";

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

/* =========================================
   WEDDING INVITATION
   SIHOON & EUNBIN
========================================= */

/* =========================================
   ACCOUNT ACCORDION
========================================= */

document.querySelectorAll(".account-title").forEach((button) => {

  button.addEventListener("click", () => {

    const item = button.closest(".account-item");
    const content = item.querySelector(".account-content");

    const isOpen = content.classList.contains("active");


    /* 모든 계좌 닫기 */

    document.querySelectorAll(".account-content").forEach((other) => {
      other.classList.remove("active");
    });

    document.querySelectorAll(".account-title").forEach((otherButton) => {
      otherButton.classList.remove("active");
    });


    /* 선택한 계좌 열기 */

    if (!isOpen) {

      content.classList.add("active");
      button.classList.add("active");

    }

  });

});
/* =========================================
   ACCOUNT COPY
========================================= */

document.querySelectorAll(".copy-account").forEach((button) => {

  button.addEventListener("click", async (event) => {

    event.stopPropagation();

    const account = button.dataset.account;

    try {

      await navigator.clipboard.writeText(account);

      const originalText = button.textContent;

      button.textContent = "COPIED";

      setTimeout(() => {
        button.textContent = originalText;
      }, 1500);

    } catch (error) {

      alert("계좌번호 복사에 실패했습니다.");

    }

  });

});


/* =========================================
   LINK COPY
========================================= */

const copyLink = document.getElementById("copyLink");

if (copyLink) {

  copyLink.addEventListener("click", async () => {

    try {

      await navigator.clipboard.writeText(window.location.href);

      const originalText = copyLink.innerHTML;

      copyLink.innerHTML = "<span>✓</span> COPIED";

      setTimeout(() => {
        copyLink.innerHTML = originalText;
      }, 1500);

    } catch (error) {

      alert("링크 복사에 실패했습니다.");

    }

  });

}


/* =========================================
   KAKAO SHARE
========================================= */

const kakaoShare = document.getElementById("kakaoShare");

if (kakaoShare) {

  kakaoShare.addEventListener("click", () => {

    /*
      카카오톡 공유 기능은
      카카오 Developers 앱 키를 연결한 후
      실제 공유 기능을 넣을 예정입니다.
    */

    alert("카카오톡 공유 기능은 실제 청첩장 완성 단계에서 연결할게요. 🤍");

  });

}


/* =========================================
   SCROLL ANIMATION
========================================= */

const animatedElements = document.querySelectorAll(
  ".section, .hero-photo, .ending-photo"
);

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

      }

    });

  },
  {
    threshold: 0.12
  }
);


animatedElements.forEach((element) => {

  observer.observe(element);

});


/* =========================================
   HERO INITIAL ANIMATION
========================================= */

window.addEventListener("load", () => {

  const heroPhoto = document.querySelector(".hero-photo");

  if (heroPhoto) {

    setTimeout(() => {
      heroPhoto.classList.add("visible");
    }, 250);

  }

});
/* OUR STORY */

const storyPhotos = [
  "story01.jpg",
  "story02.jpg",
  "story03.jpg",
  "story04.jpg",
  "story05.jpg",
  "story06.jpg"
];

const storyGallery = document.querySelector(".story-gallery");

if (storyGallery) {

  storyPhotos.forEach((photo) => {

    const item = document.createElement("div");

    item.className = "story-item";

    item.innerHTML = `
      <img src="images/${photo}" alt="">
    `;

    storyGallery.appendChild(item);

  });

}
KakaoMapInit();

function KakaoMapInit() {
  const container = document.getElementById("kakaoMap");

  if (!container) return;

  const mapOption = {
    center: new kakao.maps.LatLng(35.1699, 129.1327),
    level: 3
  };

  const map = new kakao.maps.Map(container, mapOption);

  const geocoder = new kakao.maps.services.Geocoder();

  geocoder.addressSearch(
    "부산광역시 해운대구 센텀중앙로 79",
    function(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        const marker = new kakao.maps.Marker({
          map: map,
          position: coords
        });

        map.setCenter(coords);
      }
    }
  );
}
