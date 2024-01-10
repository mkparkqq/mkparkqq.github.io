---
layout: minimal
title: pipe
date: 2024-01-08 16:40 +0900
# last_modified_at: 2024-01-01 00:00 +0900
parent: Note
# permalink: /docs/note/XXX/XXXX
hit_count: false
categories:
  - Note
---

# pipe
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

Unix System의 가장 오래된 IPC 매커니즘이다.    

Child parent 사이의 프로세스 사이의 통신만 가능하다.

named pipe(FIFO)와 구별하기 위해 unnamed pipe라고도 한다.

단방향 통신만 가능하다.

<img src="/assets/images/note/pipe-half-duplex.png" width="60%" />

<hr>

## system call

```c
#include <unistd.h>

int pipe(int fd[2]);
```

* [커널](/docs/note/kernel.html)에 의해 `fd`에 두 개의 file descriptor가 주입된다.
* `fd[0]`는 읽기, `fd[1]`는 쓰기에 사용된다.

<hr>

## example code

[`fork` 함수](/docs/note/fork.html)는 자식 프로세스를 생성하며 부모 프로세스에게는 자식 프로세스의 `pid`, 자식 프로세스에게는 `0`을 반환한다.

```c
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>

int main() {
    int fd[2];      /* File descriptors */

    pipe(fd);
    if (fork()) {   /* Parent */
        close(fd[0]);
        printf("Parent send message: How are you?\n");
        write(fd[1], "How are you?", 12);
    } else {        /* Child */
        char buf[100];
        close(fd[1]);
        read(fd[0], buf, 100);
        printf("Child received message: %s\n", buf);
        fflush(stdout);
    }
    exit(0);
}

```

Parent
* `fd[1]`을 통해 pipe에 데이터를 쓴다.
* `fd[0]`는 사용하지 않으므로 닫는다.

Child
* `fd[0]`를 통해 pipe의 데이터를 읽는다.
* `fd[1]`은 사용하지 않으므로 닫는다.

파일 입출력과 인터페이스가 동일하지만 pipe는 [커널](https://mkparkqq.github.io/docs/note/kernel.html)이 관리하는 메모리 버퍼이다.

<img src="/assets/images/note/pipe-kernel-diagram.png" width="50%" />

<hr>

## references
* [Computer Systems: A Programmer's Perspective	](https://www.amazon.com/Computer-Systems-Programmers-Perspective-3rd/dp/013409266X)

<hr>
