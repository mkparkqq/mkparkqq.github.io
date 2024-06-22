---
layout: default
title: \[Raspberry Pi\] Hello world kernel module 
date: 2024-06-22 16:24 +0900
# last_modified_at: 2024-01-01 00:00 +0900
parent: kernel
# permalink: /docs/note/XXX/XXXX
hit_count: false
categories:
  - kernel
  - open source
---

# 커널 모듈 빌드&로드
{: .no_toc }
<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

라즈베리 파이에서 진행하는 [헬로 월드 커널 모듈 예제](https://wikidocs.net/196795)

<hr>

## 커널 헤더

커널 함수를 user space로 노출시키는 헤더 파일이 필요하다.    
커널 모듈을 빌드하기 위해 필요한 헤더 파일은 두 가지 방법으로 얻을 수
있다. 

### apt repository

<div class="cli">
$ sudo apt update
$ sudo apt search linux-headers | less
</div>

커널 모듈을 추가하려는 커널의 릴리즈 버전에 맞는 linux-headers 패키지가 있다면
그냥 다운받으면 된다.

### 직접 생성

`linux` 디렉토리와 같은 위치에 `create-kernel-headers.sh` 파일 생성.

`linux` 디렉토리와 같은 위치에 `kernel-headers` 디렉토리가 생성되고 그 아래에
`include` 디렉토리가 생성된다.

```bash
#!/bin/bash

KERNEL_TOP_PATH="$(cd "$(dirname "$0")"; pwd -P)"
OUTPUT="$KERNEL_TOP_PATH/out"
HEADER_OUTPUT="$KERNEL_TOP_PATH/kernel-headers"

cd linux

make ARCH=arm64 \
	CORSS_COMPILE=aarch64-linux-gnu \
	O=$OUTPUT \
	headers_check

make ARCH=arm64 \
	CORSS_COMPILE=aarch64-linux-gnu \
	O=$OUTPUT \
	INSTALL_HDR_PATH=$HEADER_OUTPUT \
	headers_install
```

<div class="cli">
$ chmod +x create-kernel-headers.sh
$ ./create-headers.sh
</div>

<hr>

## 커널 모듈 빌드

아래의 그림과 같이 `my-modules` 디렉토리 밑에 `hello-1.c` 와 `Makefile` 을 생성한다.

<img src="/assets/images/kernel/hello-1-module-tree.png" alt="파일 계층 구조">

### Hello world 모듈 코드

```bash
/*
 * hello-1.c
 */
#include <linux/module.h>	/* 모든 모듈에 필요 */
#include <linux/printk.h>	/* pr_info()에 필요 */

int init_module(void)
{
	pr_info("Hello world 1.\n");

	/* 0: 성공
	 * 그 외 : 실패
	 */
	return 0;
}

void cleanup_module(void)
{
	pr_info("Goodbye world 1.\n");
}

MODULE_LICENSE("GPL");
```

### Makefile

```makefile
OUTPUT := ../out
PWD := $(CURDIR)

all:
	make ARCH=arm64 CROSS_COMPILE=aarch64-linux-gnu- \
		O=$(OUTPUT) \
		-I../kernel-headers/include -C ../linux M=$(PWD) modules

clean:
	rm *.o \
		*.mod.c \
		*.ko \
		*.order \
		*.symvers
```

`my-modules` 디렉토리에서 모듈 빌드 진행

<div class="cli">
$ make 
</div>

<hr>

## 모듈 로드

커널이 실행되고 있는 시점에 동적으로 라즈베리 파이에 `hello-1.ko` 모듈을 로드한다.

<div class="cli">
$ insmod hello-1.ko
</div>

`dmesg` 명령어를 사용하여 커널에서 생성한 메세지를 조회할 수 있다.

<img src="/assets/images/kernel/hello-1-dmesg.png" alt="dmesg">

<hr>

## references
* [디버깅을 통해 배우는 리눅스 커널의 구조와 원리](https://m.yes24.com/Goods/Detail/102079803)
* [Linux 커널 모듈 프로그래밍 가이드(5.x)](https://wikidocs.net/book/9521)
* [Exporting kernel headers for use by userspace](https://www.kernel.org/doc/Documentation/kbuild/headers_install.txt)
