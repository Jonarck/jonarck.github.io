(function () {
  const tabButtons = Array.from(document.querySelectorAll("[data-pub-tab]"));
  const panels = Array.from(document.querySelectorAll("[data-pub-panel]"));

  const filterBar = document.getElementById("pub-filter");
  const filterTag = document.getElementById("pub-filter-tag");
  const filterClear = document.getElementById("pub-filter-clear");

  if (tabButtons.length === 0 || panels.length === 0) return;

  function setActiveTab(key) {
    tabButtons.forEach((btn) => {
      const active = btn.dataset.pubTab === key;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    panels.forEach((panel) => {
      const active = panel.dataset.pubPanel === key;
      panel.hidden = !active;
    });
  }

  function applyTagFilter(tag) {
    const activePanel = panels.find((p) => !p.hidden);
    if (!activePanel) return;

    const items = Array.from(activePanel.querySelectorAll("[data-tags]"));
    const normalizedTag = tag ? tag.trim() : "";

    items.forEach((item) => {
      if (!normalizedTag) {
        item.hidden = false;
        return;
      }

      const tags = (item.dataset.tags || "").split("||").map((t) => t.trim());
      item.hidden = !tags.includes(normalizedTag);
    });
  }

  function setTagFilter(tag) {
    const normalizedTag = tag ? tag.trim() : "";
    if (!filterBar || !filterTag) return;

    if (!normalizedTag) {
      filterBar.hidden = true;
      filterTag.textContent = "";
      applyTagFilter("");
      return;
    }

    filterBar.hidden = false;
    filterTag.textContent = normalizedTag;
    applyTagFilter(normalizedTag);
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveTab(btn.dataset.pubTab);
      setTagFilter(filterTag ? filterTag.textContent : "");
    });
  });

  if (filterClear) {
    filterClear.addEventListener("click", () => setTagFilter(""));
  }

  document.addEventListener("click", (event) => {
    const tagButton = event.target.closest(".pub-tag");
    if (tagButton) {
      event.preventDefault();
      event.stopPropagation();
      setActiveTab("all");
      setTagFilter(tagButton.dataset.tag || "");
      return;
    }

    const card = event.target.closest(".pub-card[role='link']");
    if (card && card.dataset.url) {
      window.open(card.dataset.url, "_blank", "noopener");
    }
  });

  document.addEventListener("keydown", (event) => {
    const card = event.target.closest?.(".pub-card[role='link']");
    if (!card || !card.dataset.url) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      window.open(card.dataset.url, "_blank", "noopener");
    }
  });

  // Default state
  setActiveTab("core");
})();

