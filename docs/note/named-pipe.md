---
layout: minimal
title: FIFO(named pipe)
date: 2024-01-10 10:13 +0900
# last_modified_at: 2024-01-01 00:00 +0900
parent: Note
# permalink: /docs/note/XXX/XXXX
hit_count: false
categories:
  - Note
---

# FIFO(named pipe)
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

FIFO는 파일의 종류 중 하나이다.

`stat::st_mode`(`stat` 구조체의 `st_mode` 필드)의 값이 `S_ISFIFO`인 파일이다.

## pipe와의 차이
* pipe는 parent-child 관계의 프로세스 사이의 통신에만 사용할 수 있다.
* FIFO는 프로세스의 관계에 상관없이 사용할 수 있다.
* pipe와 다르게 이름을 가지는 파일이 파일 시스템에 생성된다.

## system call

```c
int mkfifo(const char* path, mode_t mode)
```

* `const char* path` - 파일 시스템에 생성되는 파일의 경로(이름 포함)
* `mode` - [`open` system call](https://www.ibm.com/docs/ko/aix/7.3?topic=files-fcntlh-file)과 동일
* `return` - `path` 에 대응되는 파일이 이미 존재하는 경우 -1 반환

<hr>

## example code

namedpipe의 경로는 `~/` 부분을 home 경로로 수정해줘야 한다.

sender

```c
#include <fcntl.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <stdio.h>
#include <unistd.h>
#include <string.h>

int main(void) {
    char s[300];
    int num, fd;
    mkfifo("~/Desktop/namedpipe", 0666);
    fd = open("~/Desktop/namedpipe", O_WRONLY);
    while (gets(s)) {
        if ((num = write(fd, s, strlen(s))) == -1)
            perror("write");
        printf("producer: wrote %d bytes\n", num);
    }
    return 0;
}
```

receiver

```c
#include <sys/types.h>
#include <sys/stat.h>
#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>

int main(void) {
    char s[300];
    int num, fd;
    mkfifo("~/Desktop/namedpipe", 0666);         /* sender가 이미 생성한 경로 => -1 반환 */
    fd = open("~/Desktop/namedpipe", O_RDONLY);
    do {
        if ((num = read(fd, s, 300)) == -1)
            perror("read");
        s[num] = '\0';
        printf("consumer: read %d bytes: \"%s\"\n", num, s);
    } while (num > 0);
    return 0;
}
```

실행 결과

<img src="/assets/images/note/namedpipe-example.png" alt="example-result" width="80%" />

<hr>

## references
* [Computer Systems: A Programmer's Perspective	](https://www.amazon.com/Computer-Systems-Programmers-Perspective-3rd/dp/013409266X)

<hr>
