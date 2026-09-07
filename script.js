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
/* =========================================
   GALLERY MODAL
========================================= */

const galleryModal = document.getElementById("galleryModal");
const galleryModalImage = document.getElementById("galleryModalImage");
const galleryClose = document.getElementById("galleryClose");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");
const galleryCount = document.getElementById("galleryCount");

let galleryImages = [];
let currentGalleryIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

/* 갤러리 사진 불러오기 */
function setupGalleryModal() {
  galleryImages = Array.from(
    document.querySelectorAll(".story-gallery img")
  );

  galleryImages.forEach((img, index) => {
    img.style.cursor = "pointer";

    img.addEventListener("click", () => {
      currentGalleryIndex = index;
      openGallery();
    });
  });
}

/* 갤러리 열기 */
function openGallery() {
  if (!galleryImages.length) return;

  galleryModal.classList.add("active");
  document.body.style.overflow = "hidden";

  showGalleryImage();
}

/* 갤러리 닫기 */
function closeGallery() {
  galleryModal.classList.remove("active");
  document.body.style.overflow = "";
}

/* 사진 보여주기 */
function showGalleryImage() {
  const img = galleryImages[currentGalleryIndex];

  galleryModalImage.src = img.src;
  galleryModalImage.alt = img.alt || "";

  galleryCount.textContent =
    `${currentGalleryIndex + 1} / ${galleryImages.length}`;
}

/* 이전 사진 */
function showPreviousImage() {
  currentGalleryIndex--;

  if (currentGalleryIndex < 0) {
    currentGalleryIndex = galleryImages.length - 1;
  }

  showGalleryImage();
}

/* 다음 사진 */
function showNextImage() {
  currentGalleryIndex++;

  if (currentGalleryIndex >= galleryImages.length) {
    currentGalleryIndex = 0;
  }

  showGalleryImage();
}

/* 버튼 */
galleryClose.addEventListener("click", closeGallery);
galleryPrev.addEventListener("click", showPreviousImage);
galleryNext.addEventListener("click", showNextImage);

/* 배경 클릭하면 닫기 */
galleryModal.addEventListener("click", (e) => {
  if (e.target === galleryModal) {
    closeGallery();
  }
});

/* 키보드 */
document.addEventListener("keydown", (e) => {
  if (!galleryModal.classList.contains("active")) return;

  if (e.key === "Escape") closeGallery();
  if (e.key === "ArrowLeft") showPreviousImage();
  if (e.key === "ArrowRight") showNextImage();
});

/* 모바일 좌우 스와이프 */
galleryModal.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

galleryModal.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;

  const distance = touchEndX - touchStartX;

  if (Math.abs(distance) < 50) return;

  if (distance < 0) {
    showNextImage();
  } else {
    showPreviousImage();
  }
});

/* 실행 */
setupGalleryModal();
