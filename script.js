/* ========================================
   WEDDING INVITATION
   SIHOON & EUNBIN
======================================== */


/* ========================================
   ACCOUNT ACCORDION
======================================== */

const accountTitles = document.querySelectorAll(".account-title");

accountTitles.forEach((title) => {
  title.addEventListener("click", () => {

    const content = title.nextElementSibling;
    const icon = title.querySelector("span");

    content.classList.toggle("active");

    if (content.classList.contains("active")) {
      icon.textContent = "−";
    } else {
      icon.textContent = "＋";
    }

  });
});


/* ========================================
   ACCOUNT COPY
======================================== */

const copyButtons = document.querySelectorAll(".copy-button");

copyButtons.forEach((button) => {

  button.addEventListener("click", async () => {

    const accountContent = button.parentElement;
    const accountText = accountContent.querySelector("p").innerText;

    try {

      await navigator.clipboard.writeText(accountText);

      const originalText = button.textContent;

      button.textContent = "복사되었습니다 ♡";

      setTimeout(() => {
        button.textContent = originalText;
      }, 1500);

    } catch (error) {

      alert("계좌번호를 복사하지 못했습니다.");

    }

  });

});


/* ========================================
   INVITATION LINK COPY
======================================== */

const shareButton = document.querySelector(".share-button");

if (shareButton) {

  shareButton.addEventListener("click", async () => {

    try {

      await navigator.clipboard.writeText(window.location.href);

      const originalText = shareButton.textContent;

      shareButton.textContent = "링크가 복사되었습니다 ♡";

      setTimeout(() => {
        shareButton.textContent = originalText;
      }, 1800);

    } catch (error) {

      alert("링크를 복사하지 못했습니다.");

    }

  });

}


/* ========================================
   SCROLL FADE ANIMATION
======================================== */

const sections = document.querySelectorAll(
  ".section, .main-photo, .ending"
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


sections.forEach((section) => {
  observer.observe(section);
});


/* ========================================
   SMOOTH ANCHOR SCROLL
======================================== */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId = link.getAttribute("href");

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});
