---
layout: minimal
title: paging
date: 2024-01-11 15:53 +0900
# last_modified_at: 2024-01-01 00:00 +0900
parent: Note
# permalink: /docs/note/XXX/XXXX
hit_count: false
categories:
  - Note
---

# paging
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

## motivations

* 빈번한 프로세스의 시작과 종료로 인해 [fragmentation 문제](/docs/note/external-fragmentation.html)가 발생한다.
    * 사용 가능한 메모리 덩어리의 크기와 필요한 연속된 메모리 공간의 크기가 맞지 않는다.
* fragmentation으로 인해 [성능](/docs/note/performance.html)이 저하된다.

<hr>

## paging

* 프로세스를 연속되지 않은 physical memory 공간으로 나누어 할당한다.
    * 이 때 나누어지는 고정 크기의 최소 단위를 page frame이라고 한다.

* page frame - physical memory의 최소 단위
* page - [virtual memory](/docs/note/virtual-address-space.html)의 최소 단위
* page frame과 page의 크기는 같다.

* `$ getconf PAGE_SIZE` 명령어를 통해 page 크기를 확인할 수 있다.
    * m1 macbook air - 16384 bytes

* page translation - processor에 내장된 MMU라는 하드웨어에 의해 page가 page frame으로 환원(resolve)된다.

<hr>

## address translation

<img src="/assets/images/note/page-table-diagram.png" alt="page-table-diagram" width="70%" />

* page table - page과 page frame 사이의 매핑 정보가 저장된 자료 구조
* 프로세스는 한 개의 virtual address space와 그에 대응되는 page table을 가진다.
* virtual address - 포인터에 저장되는 값이다.
* 소프트웨어의 개입 없이 하드웨어에 의해서만 진행되기 때문에 address translation에서 [문제가 발생하면 프로세스가 바로 종료](/note/docs/segmentation-fault.html)된다.

<hr>

## references

* [Computer Systems: A Programmer's Perspective	](https://www.amazon.com/Computer-Systems-Programmers-Perspective-3rd/dp/013409266X)
* [Operating System Concepts](https://codex.cs.yale.edu/avi/os-book/)
<hr>

