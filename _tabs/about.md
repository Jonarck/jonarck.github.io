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
    {% assign highlight_tone = 'general' %}
    {% assign highlight_icon = 'fas fa-info-circle' %}
    {% assign highlight_kicker = 'Overview' %}

    {% case item.title %}
      {% when 'Education' %}
        {% assign highlight_tone = 'education' %}
        {% assign highlight_icon = 'fas fa-graduation-cap' %}
        {% assign highlight_kicker = 'Education' %}
      {% when 'Research Interests' %}
        {% assign highlight_tone = 'interests' %}
        {% assign highlight_icon = 'fas fa-drafting-compass' %}
        {% assign highlight_kicker = 'Research Interests' %}
      {% when 'Research Methodology' %}
        {% assign highlight_tone = 'methodology' %}
        {% assign highlight_icon = 'fas fa-project-diagram' %}
        {% assign highlight_kicker = 'Research Methodology' %}
      {% when 'Interests' or 'Outside Work' %}
        {% assign highlight_tone = 'personal' %}
        {% assign highlight_icon = 'fas fa-landmark' %}
        {% assign highlight_kicker = 'Outside Work' %}
    {% endcase %}

    <article class="profile-highlight profile-highlight--{{ highlight_tone }}">
      <div class="profile-highlight__head">
        <span class="profile-highlight__icon" aria-hidden="true">
          <i class="{{ highlight_icon }}"></i>
        </span>
        <div class="profile-highlight__heading">
          <p class="profile-highlight__kicker">{{ highlight_kicker }}</p>
        </div>
      </div>
      {% if item.items %}
        <ul class="profile-highlight__list">
          {% for entry in item.items %}
            <li>
              {% if entry.main %}
                <span class="profile-highlight__lead">{{ entry.main }}</span>
                {% if entry.subitems %}
                  <ul class="profile-highlight__sublist">
                    {% for subentry in entry.subitems %}
                      <li>{{ subentry }}</li>
                    {% endfor %}
                  </ul>
                {% endif %}
              {% else %}
                {{ entry }}
              {% endif %}
            </li>
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
