/**
 * ページ読み込み時：要素を順番にフェードイン表示
 */
function initReveal() {
  const reveals = document.querySelectorAll(".reveal");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  reveals.forEach((el) => {
    if (prefersReduced) {
      el.classList.add("is-visible");
      return;
    }

    const order = Number(el.dataset.revealOrder ?? 0);
    const delay = order === 0 ? 100 : 180 + order * 120;

    setTimeout(() => {
      el.classList.add("is-visible");
    }, delay);
  });
}

/**
 * スクロール時：画面内に入った要素をフェードイン
 */
function initScrollReveal() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
  );

  document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
    observer.observe(el);
  });
}

/**
 * プロフィール画像の読み込み失敗時：静かに代替表示
 */
function initProfileImage() {
  const profileImg = document.querySelector(".profile__img");
  if (!profileImg) return;

  profileImg.addEventListener("error", () => {
    profileImg.classList.add("is-error");
    profileImg.closest(".profile__frame")?.classList.add("is-error");
    profileImg.alt = "プロフィール写真（未設定）";
    profileImg.removeAttribute("src");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initReveal();
  initScrollReveal();
  initProfileImage();
});
