---
layout: minimal
title: 클론 & 빌드
date: 2024-05-12 16:55 +0900
# last_modified_at: 2024-01-01 00:00 +0900
parent: kernel
# permalink: /docs/note/XXX/XXXX
hit_count: false
categories:
  - kernel
  - open source
---

# 리눅스 커널 소스 다운로드 & 빌드
{: .no_toc }
<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

## clone

<pre class="cli">
$ git clone --depth=1 -b rpi-4.19.y https://github.com/raspberrypi/linux
</pre>


## references
* [디버깅을 통해 배우는 리눅스 커널의 구조와 원리](https://m.yes24.com/Goods/Detail/102079803)
