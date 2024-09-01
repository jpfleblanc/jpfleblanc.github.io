---
layout: page
permalink: /publications/
title: Publications
description: Publications in reversed chronological order pulled from google scholar.  Up-to-date list can always be found <a href="https://scholar.google.com/citations?user=rIvvsYsAAAAJ&hl=en">here</a>.
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

{% bibliography -f {{ site.scholar.bibliography }}%}

</div>
