---
title: About
icon: fas fa-user
order: 1
permalink: /about/
---

{% include profile-hero.html %}
{% include quick-links.html current="about" %}

{% assign highlights = site.data.profile.highlights %}
{% if highlights and highlights.size > 0 %}
<section class="profile-highlights" aria-label="Highlights">
  {% for item in highlights %}
    <article class="profile-highlight">
      <h2 class="profile-highlight__title">{{ item.title }}</h2>
      {% if item.items %}
        <ul class="profile-highlight__list">
          {% for entry in item.items %}
            <li>{{ entry }}</li>
          {% endfor %}
        </ul>
      {% else %}
        <p class="profile-highlight__text">{{ item.text }}</p>
      {% endif %}
    </article>
  {% endfor %}
</section>
{% endif %}

<section class="about-grid" aria-label="About and timeline">
  <div class="about-grid__col">
    <h2>About Me</h2>
    <div id="about-text-block" class="about-text">
      {{ site.data.profile.about | markdownify }}
    </div>
  </div>

  <div class="about-grid__col">
    <h2>Timeline</h2>
    <ul id="timeline-list" class="timeline">
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

<script src="{{ '/assets/js/about.js' | relative_url }}" defer></script>
