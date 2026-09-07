/* =========================================
   WEDDING INVITATION
   SIHOON & EUNBIN
========================================= */


/* =========================================
   MENU
========================================= */

const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");
const menuClose = document.getElementById("menuClose");

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    menu.classList.add("active");
    document.body.style.overflow = "hidden";
  });
}

if (menuClose && menu) {
  menuClose.addEventListener("click", () => {
    menu.classList.remove("active");
    document.body.style.overflow = "";
  });
}


/* 메뉴 항목 클릭 */

document.querySelectorAll(".menu a").forEach((link) => {

  link.addEventListener("click", () => {

    menu.classList.remove("active");
    document.body.style.overflow = "";

  });

});


/* =========================================
   ACCOUNT ACCORDION
========================================= */

document.querySelectorAll(".account-title").forEach((button) => {

  button.addEventListener("click", () => {

    const item = button.closest(".account-item");
    const content = item.querySelector(".account-content");
    const icon = button.querySelector("em");

    const isOpen = content.classList.contains("active");

    /* 다른 계좌 닫기 */

    document.querySelectorAll(".account-content").forEach((other) => {
      other.classList.remove("active");
    });

    document.querySelectorAll(".account-title em").forEach((otherIcon) => {
      otherIcon.textContent = "＋";
    });


    /* 선택한 계좌 열기 */

    if (!isOpen) {

      content.classList.add("active");

      if (icon) {
        icon.textContent = "−";
      }

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
