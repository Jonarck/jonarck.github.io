---
title: About
icon: fas fa-user
order: 1
permalink: /about/
---

{% include profile-hero.html %}
{% include quick-links.html current="about" %}

<section class="about-grid" aria-label="About and timeline">
  <div class="about-grid__col">
    <h2>About Me</h2>
    <div class="about-text">
      {{ site.data.profile.about | markdownify }}
    </div>
  </div>

  <div class="about-grid__col">
    <h2>Timeline</h2>
    <ul class="timeline">
      {% for item in site.data.profile.timeline %}
        <li class="timeline__item">
          <span class="timeline__date">{{ item.date }}</span>
          <span class="timeline__text">{{ item.text }}</span>
        </li>
      {% endfor %}
    </ul>
  </div>
</section>

<section class="research-pathway" aria-label="Research pathway">
  <h2>Research Pathway</h2>

  {% assign rp = site.data.profile.research_pathway %}
  <figure class="research-figure">
    <a href="{{ rp.image | relative_url }}" target="_blank" rel="noopener">
      <img src="{{ rp.image | relative_url }}" alt="{{ rp.alt | default: 'Research pathway' }}" loading="lazy" />
    </a>
    {% if rp.caption %}
      <figcaption>{{ rp.caption }}</figcaption>
    {% endif %}
  </figure>
</section>
