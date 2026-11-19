(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const revealItems = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -45px 0px" });
    revealItems.forEach((item) => observer.observe(item));
  }

  if (!reduceMotion) {
    const hero = document.querySelector(".hero");
    const back = document.querySelector(".mountain-back");
    const front = document.querySelector(".mountain-front");
    let ticking = false;
    const updateLandscape = () => {
      if (!hero || !back || !front) return;
      const rect = hero.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, -rect.top / Math.max(rect.height, 1)));
      back.style.transform = `translate3d(0,${progress * 22}px,0)`;
      front.style.transform = `translate3d(0,${progress * 42}px,0)`;
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateLandscape);
    }, { passive: true });
    updateLandscape();
  }
})();
