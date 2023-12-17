---
layout: default
title: BOJ
nav_order: 1
parent: Problem Solving
permalink: /docs/ps/boj
date: 2023-12-17 15:00 +0900
---

{% assign boj_pages = site.pages | where: "categories", "BOJ" %}
{% assign boj_pages_count = boj_pages | size %}

# BOJ ({{boj_pages_count}})

<hr>

<ul class="category-item">
    {% for post in site.pages %}
        {% if post.categories contains 'BOJ' %}
            <li>
                <a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a>
                <span class="metadata">{{ post.date | date: "%Y-%m-%d" }}</span>
            </li>
        {% endif %}
    {% endfor %}
</ul>
