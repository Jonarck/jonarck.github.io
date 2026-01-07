(function () {
  const aboutText = document.getElementById("about-text-block");
  const timelineList = document.getElementById("timeline-list");

  if (!aboutText || !timelineList) return;

  function setTimelineHeight() {
    const isSingleColumn = window.matchMedia("(max-width: 900px)").matches;
    if (isSingleColumn) {
      timelineList.style.maxHeight = "";
      timelineList.style.overflowY = "";
      return;
    }

    const rect = aboutText.getBoundingClientRect();
    const height = Math.max(0, Math.round(rect.height));
    if (!height) return;

    timelineList.style.maxHeight = `${height}px`;
    timelineList.style.overflowY = "auto";
  }

  setTimelineHeight();
  window.addEventListener("resize", setTimelineHeight);

  if ("ResizeObserver" in window) {
    const ro = new ResizeObserver(() => setTimelineHeight());
    ro.observe(aboutText);
  }
})();

