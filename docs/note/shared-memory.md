---
layout: minimal
title: shared memory
date: 2024-01-10 15:40 +0900
# last_modified_at: 2024-01-01 00:00 +0900
parent: Note
# permalink: /docs/note/XXX/XXXX
hit_count: false
categories:
  - Note
---

# shared memory
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

두 개 이상의 프로세스가 동일한 메모리 영역(segment)에 접근하도록 허용하는 매커니즘

<img src="/assets/images/note/shared-memory-diagram.png" width="80%" alt="diagram" />

* segment - 통신하는 프로세스들이 공유하는 메모리 영역
* 프로세스A가 shared memory segment를 생성하면 프로세스B가 해당 segment를 open하여 사용한다.

일반적으로 서로 다른 프로세스는 서로의 메모리 영역에 접근할 수 없다. 모든 프로세스는 각자의 [가상화된 메모리 공간](/docs/note/virtual-address-space.html)에만 접근할 수 있다.

<hr>

## system call

```c
int shmget(key_t key, size_t size, int shmflg);
```

* `key_t key` - segment의 전역(시스템 전체에서 유일한) 식별자(global identity). IPC Key라고도 한다.
* `size_t size` - segment의 크기(bytes)
* `int shmflg` - `open`의 mode argument와 유사
* `return` - segment의 지역(프로세스 내부에서만 유효) 식별자(local identifier)

```c
#define PERMS(S_IRUSR | S_IW_USR | S_IRGRP | S_IWGRP | S_IROTH | S_IWOTH) // 0666
#define KEY((key_t)99887)

shmid = shmget(KEY, 1024, PERMS | IPC_CREAT);
```

<hr>

## IPC key 생성

세 가지 방법 중 한가지를 사용하여 IPC key를 생성할 수 있다.

IPC key란 [IPC object](/docs/note/ipc.html#ipc-objects)를 식별하는 전체 시스템에서 유일한 숫자 값이다.

* `IPC_PRIVATE` - parent-child 통신에서 사용된다. 시스템이 키값을 결정한다.
* 사용자가 직접 
* `ftok` - 전달받은 경로(반드시 존재해야 함)를 사용하여 키 값이 생성된다. 인자가 같으면 같은 키 값이 반환된다.

```c
key_t ftok(const char* path, int id);
```

<hr>

## attaching shared memory

공유 메모리를 생성하거나 이미 생성되었다면 공유 메모리에 대한 참조를 획득한다.

```c
void* shmat(int shmid, void* addr, int shmflg);
```

* `int shmid` - IPC key
* `void* addr` - 일반적으로 `NULL`
* `int shmflg` - `SHM_RDONLY`, `SHM_RND`, ...
* `return` - 공유 메모리의 주소값(attached address)

<hr>

## example code

process0.c

```c
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/shm.h>

int main(void) {
    key_t key;
    int shmid;
    char* data;

    key = ftok("/Users/mingeun/Desktop/myshm", 'A');
    shmid = shmget(key, 1024, 0644| IPC_CREAT);
    data = shmat(shmid, (void* )0, 0);
    for (int i = 0; i < 26; i++) {
        data[i] = 'A' + i;
    }
    shmdt(data);
    return 0;
}
```

process1.c

```c
#include <stdio.h>
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/shm.h>

int main(void) {
    key_t key;
    int shmid;
    char* data;

    key = ftok("/Users/mingeun/Desktop/myshm", 'A');
    shmid = shmget(key, 1024, 0644 | IPC_CREAT);
    data = shmat(shmid, (void*)0, 0);
    for (int i = 0; i < 26; i++) {
        printf("data[%d] = %c\n", i, data[i]);
    }
    shmdt(data);
    return 0;
}
```

실행 결과

<img src="/assets/images/note/shm-example-result.png" alt="result" width="20%" />

<hr>

## IPCS lifecycle

ipc 객체를 만든 프로세스가 종료되어도 ipc 객체는 메모리에 남아있다.

`$ ipcs` 명령어를 통해 조회할 수 있다.

<img src="/assets/images/note/ipcs-lifecycle.png" alt="ipcs-lifecycle" width="50%" />


<hr>

## references

* [Computer Systems: A Programmer's Perspective	](https://www.amazon.com/Computer-Systems-Programmers-Perspective-3rd/dp/013409266X)
* [Mac OS X Man Pages](https://developer.apple.com/library/archive/documentation/System/Conceptual/ManPages_iPhoneOS/man2/shmget.2.html#//apple_ref/doc/man/2/shmget)

<hr>
