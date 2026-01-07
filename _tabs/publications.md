---
title: "Publication & Projects"
sidebar_label: "Pub. & Proj."
icon: fas fa-book
order: 2
permalink: /publications/
---

{% assign pubs = site.data.publications %}
{% if pubs == nil %}
  {% assign pubs = "" | split: "" %}
{% endif %}
{% assign core = pubs | where: 'category', 'core' %}
{% assign branch = pubs | where: 'category', 'branch' %}

{% include profile-hero.html %}
{% include quick-links.html current="publications" %}

<section class="pub-section" aria-label="Selected publications and projects">
  <div class="pub-tabs" role="tablist" aria-label="Publication categories">
    <button type="button" class="pub-tab is-active" data-pub-tab="core" role="tab" aria-selected="true">
      Core Work
    </button>
    <button type="button" class="pub-tab" data-pub-tab="branch" role="tab" aria-selected="false">
      Important Branch Work
    </button>
    <button type="button" class="pub-tab" data-pub-tab="all" role="tab" aria-selected="false">All Works</button>
  </div>

  <div id="pub-filter" class="pub-filter" hidden>
    <span class="pub-filter__label">Filtered by:</span>
    <span id="pub-filter-tag" class="pub-filter__tag"></span>
    <button id="pub-filter-clear" type="button" class="pub-filter__clear">Clear</button>
  </div>

  <div class="pub-panels">
    <div class="pub-panel" data-pub-panel="core" role="tabpanel">
      {% for pub in core %}
        {% include publication-card.html pub=pub %}
      {% endfor %}
    </div>

    <div class="pub-panel" data-pub-panel="branch" role="tabpanel" hidden>
      {% for pub in branch %}
        {% include publication-card.html pub=pub %}
      {% endfor %}
    </div>

    <div class="pub-panel" data-pub-panel="all" role="tabpanel" hidden>
      <ol class="pub-cite-list">
        {% for pub in pubs %}
          {% include publication-cite.html pub=pub %}
        {% endfor %}
      </ol>
    </div>
  </div>
</section>

<script src="{{ '/assets/js/publications.js' | relative_url }}" defer></script>
