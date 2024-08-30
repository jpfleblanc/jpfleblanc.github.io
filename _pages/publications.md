---
layout: page
permalink: /publications/
title: publications
description: Publications in reversed chronological order pulled from google scholar.
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

{% bibliography -f {{ site.scholar.bibliography }}%}

</div>
