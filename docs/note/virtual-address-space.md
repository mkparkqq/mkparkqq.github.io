---
layout: minimal
title: virtual address space (virtual memory)
date: 2024-01-11 14:23 +0900
# last_modified_at: 2024-01-01 00:00 +0900
parent: Note
# permalink: /docs/note/XXX/XXXX
hit_count: false
categories:
  - Note
---

# virtual address space
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

실재하지 않는 가상의 메모리 공간(주소의 집합)이다. 

[File system](/docs/note/file-system)에도 비슷한 매커니즘이 있다.

<img src="/assets/images/note/virtual-memory-diagram.png" width="80%" alt="diagram" />

* MMU(Memory Management Unit) - 가상 메모리 주소를 물리 주소로 변환하는 하드웨어(in-processor hw)
* block(page) - 가상, 물리적 주소 공간은 모두 동일한 크기의 block(page라고도 함)으로 나뉜다. 
    * [external fragmentation 문제](/docs/note/external-fragmentation)를 해결하기 위해 메모리 공간을 page로 나눈다.

<hr>

## motivations for virtual memory

* 연산 과정에서 물리적인 저장공간보다 큰 저장공간이 필요할 수 있다.
* 프로세스를 메모리 관리로부터 분리하면 프로그래밍이 안전하고 편리해진다.
    * 서로 다른 프로세스가 서로의 변수에 접근하게 될 경우 프로세스의 동작을 예측하기 힘들다.

<hr>

## references

* [Computer Systems: A Programmer's Perspective	](https://www.amazon.com/Computer-Systems-Programmers-Perspective-3rd/dp/013409266X)
* [Operating System Concepts](https://codex.cs.yale.edu/avi/os-book/)
<hr>

