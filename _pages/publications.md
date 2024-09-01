---
layout: page
permalink: /publications/
title: Publications
description: A selection of publications are here. You can find the rest on google scholar (Link on main page). 
nav: true
nav_order: 1
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

{% bibliography -f {{ site.scholar.bibliography }}%}

</div>
