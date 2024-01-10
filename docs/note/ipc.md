---
layout: minimal
title: IPC
date: 2024-01-08 16:06 +0900
# last_modified_at: 2024-01-01 00:00 +0900
parent: Note
# permalink: /docs/note/XXX/XXXX
hit_count: false
categories:
  - Note
---

# IPC
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

## IPC (Inter Process Communication)

서로 다른 프로세스 사이의 통신 매커니즘. 크게 두 가지 모델로 나뉜다.

* Message system - 공유된 변수를 사용하지 않고 통신한다.
    * [pipe](/docs/note/pipe.html)
    * [FIFO(Named pipe)](/docs/note/named-pipe.html)
    * message queue
* Shared memory - 프로세스들이 동일한 메모리 공간을 직접(변수를 통해) 참조하여 통신한다. 

일반적으로 message queue 방식이 사용된다. 

<hr>

## references
* [Computer Systems: A Programmer's Perspective	](https://www.amazon.com/Computer-Systems-Programmers-Perspective-3rd/dp/013409266X)

<hr>
