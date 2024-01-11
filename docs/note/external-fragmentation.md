---
layout: minimal
title: external fragmentation
date: 2024-01-11 15:24 +0900
# last_modified_at: 2024-01-01 00:00 +0900
parent: Note
# permalink: /docs/note/XXX/XXXX
hit_count: false
categories:
  - Note
---

# external fragmentation
{: .no_toc }
<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

<hr>

## contiguous memory allocation

아래 두 가지 요구사항을 만족하는 가장 간단한 형태의 메모리 할당 방식이다.

* [multiprogramming](/docs/note/multiprogramming.html)을 지원하기 위해서는 physical memory에 여러 프로세스를 저장할 수 있어야 한다
* relocation(종료된 프로세스가 사용하던 메모리를 재사용)이 가능해야 한다.

각 프로세스는 한 개의 연속된 메모리 공간(partition)을 사용한다.

<hr>

## external fragmentation

각 프로세스가 연속된 메모리 공간을 사용할 경우 발생하는 문제점

<img src="/assets/images/note/external-fragmentation.png" width="80%" alt="diagram" />

사용 가능한 메모리의 총량은 필요한 양보다 크지만 연속되지 않아 사용할 수 없게 된다.

* 해결 방법
    1. compaction - 사용 가능한 메모리 영역을 연속되도록 정리
        * memory copy로 인해 [성능](/docs/note/performace.html)이 저하된다.
    2. [paging](/docs/note/paging.html) - 굳이 연속된 메모리 공간을 할당하지 않는다.

<hr>

## references

* [Computer Systems: A Programmer's Perspective	](https://www.amazon.com/Computer-Systems-Programmers-Perspective-3rd/dp/013409266X)
* [Operating System Concepts](https://codex.cs.yale.edu/avi/os-book/)
<hr>

