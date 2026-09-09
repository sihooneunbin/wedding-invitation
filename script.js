if (typeof Kakao !== "undefined") {
  Kakao.init("9b53925c5ae6be1717a4d4470199a081");
}
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


/* =================================
   LINK COPY
================================= */

const copyLink = document.getElementById("copyLink");

if (copyLink) {

  copyLink.addEventListener("click", async () => {

    try {

      await navigator.clipboard.writeText(window.location.href);

      const circle = copyLink.querySelector(".share-circle");
      const label = copyLink.querySelector("span:last-child");

      circle.textContent = "✓";
      label.textContent = "COPIED";

      setTimeout(() => {
        circle.textContent = "↗";
        label.textContent = "LINK";
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

    Kakao.Share.sendDefault({
      objectType: "text",

      text: "시훈🤍은빈 소중한 날에 함께해 주세요.",

      link: {
        mobileWebUrl: window.location.href,
        webUrl: window.location.href
      }

    });

  });
}
/* =========================================
MORE SHARE
========================================= */

const moreShare = document.getElementById("moreShare");

if (moreShare) {
  moreShare.addEventListener("click", async () => {

    if (navigator.share) {

      try {
await navigator.share({
  title: "시훈 🤍 은빈",
  url: window.location.href
});

      } catch (error) {
        // 공유창을 닫은 경우 아무것도 하지 않음
      }

    } else {

      alert("이 브라우저에서는 공유 기능을 사용할 수 없습니다.");

    }

  });
}
/* =========================================
   SCROLL ANIMATION
========================================= */

const animatedElements = document.querySelectorAll(
  ".section, .hero-photo, .ending-photo, .couple-photo, .parent-line"
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

  if (typeof kakao === "undefined" || !kakao.maps) return;

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
if (galleryClose) {
  galleryClose.addEventListener("click", closeGallery);
}

if (galleryPrev) {
  galleryPrev.addEventListener("click", showPreviousImage);
}

if (galleryNext) {
  galleryNext.addEventListener("click", showNextImage);
}

/* 배경 클릭하면 닫기 */
if (galleryModal) {
  galleryModal.addEventListener("click", (e) => {
    if (e.target === galleryModal) {
      closeGallery();
    }
  });
}
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
/* D-DAY */

const weddingDate = new Date("2026-12-12T16:00:00");
const today = new Date();

today.setHours(0, 0, 0, 0);

const diff = weddingDate - today;
const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

const dday = document.getElementById("ddayNumber");

if (dday) {
  dday.textContent = days > 0 ? `D-${days} ෆ` : "D-DAY ෆ";
}

// =========================================
// MUSIC PLAYER
// =========================================

const musicButton = document.getElementById("musicButton");
const weddingMusic = document.getElementById("weddingMusic");

const musicChannel = new BroadcastChannel("wedding-music-channel");

// 버튼 아이콘 변경
function updateMusicIcon() {
  const icon = musicButton?.querySelector(".music-icon");

  if (!icon) return;

  if (weddingMusic.paused) {
    // 일시정지 상태 → PAUSE 아이콘
    icon.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 5H10V19H7V5Z"></path>
        <path d="M14 5H17V19H14V5Z"></path>
      </svg>
    `;
  } else {
    // 재생 상태 → PLAY 아이콘
    icon.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 5.5L19 12L8 18.5V5.5Z"></path>
      </svg>
    `;
  }
}

// 다른 재생 컨텍스트에서 음악을 시작하면
// 현재 음악을 정지
musicChannel.addEventListener("message", (event) => {

  if (event.data === "stop-other-music") {
    weddingMusic.pause();
    updateMusicIcon();
  }

  if (event.data === "music-playing") {
    updateMusicIcon();
  }

});

// 음악 재생
function playWeddingMusic() {

  // 다른 재생 컨텍스트에 정지 신호
  musicChannel.postMessage("stop-other-music");

  weddingMusic.play()
    .then(() => {
      musicChannel.postMessage("music-playing");
      updateMusicIcon();
    })
    .catch(() => {
      updateMusicIcon();
    });

}

// 음악 상태가 실제로 바뀌면 아이콘도 변경
weddingMusic.addEventListener("play", updateMusicIcon);
weddingMusic.addEventListener("pause", updateMusicIcon);

// 페이지가 열리면 자동재생
window.addEventListener("load", () => {

  setTimeout(() => {
    playWeddingMusic();
  }, 100);

});

// 음악 버튼
if (musicButton && weddingMusic) {

  musicButton.addEventListener("click", () => {

    if (weddingMusic.paused) {
      playWeddingMusic();
    } else {
      weddingMusic.pause();
      updateMusicIcon();
    }

  });

}

// 처음 아이콘 설정
updateMusicIcon();
