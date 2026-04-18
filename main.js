/*
  页面交互脚本：
  1) 回到顶部按钮
  2) Section 滚动显现动画
  3) 逻辑保持纯原生 JS，便于维护
*/

(function portfolioInteractions() {
  const backToTopButton = document.getElementById("backToTop");
  const fadeSections = document.querySelectorAll(".section-fade");

  // 回到顶部交互
  if (backToTopButton) {
    backToTopButton.addEventListener("click", function handleBackTopClick() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 首屏默认可见，避免加载时闪烁
  if (fadeSections.length > 0) {
    fadeSections[0].classList.add("is-visible");
  }

  // 通过 IntersectionObserver 实现滚动渐显
  const observer = new IntersectionObserver(
    function handleIntersect(entries) {
      entries.forEach(function applyVisibility(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  fadeSections.forEach(function observeSection(section) {
    observer.observe(section);
  });
})();
