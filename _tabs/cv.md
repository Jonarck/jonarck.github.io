---
title: CV
icon: fas fa-file-alt
order: 3
permalink: /cv/
---

{% assign p = site.data.profile %}

{% include profile-hero.html %}
{% include quick-links.html current="cv" %}

<section class="cv-section" aria-label="Curriculum Vitae">
  <p>
    <a class="cv-link" href="{{ p.links.cv | relative_url }}" target="_blank" rel="noopener">Open CV (PDF)</a>
  </p>

  <div class="cv-embed">
    <iframe title="CV PDF" src="{{ p.links.cv | relative_url }}" loading="lazy"></iframe>
  </div>
</section>
