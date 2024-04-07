---
layout: default
title: gdb로 c 프로그램 분석
parent: dev
# grand_parent: 
# nav_order: 
date: 2024-04-07 13:58 +0900
# last_modified_at: 2024-01-01 00:00 +0900
# permalink: /docs/ps/XXX/XXXX
# hit_count: false
categories:
  - dev 
  - C/C++
tags:
  - gdb
---

# gdb로 c 프로그램 분석
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

## 초기화되지 않은 포인터

```c
#include <stdio.h>
#include <string.h>

int main() {
	char str_a[20];
	char *pointer;
	char *pointer2;

	strcpy(str_a, "Hello world\n");
	pointer = str_a;
	printf(pointer); 					// break

	pointer2 = pointer + 2;
	printf(pointer2);
	strcpy(pointer2, "y you guys\n");
	printf(pointer);

	return 0;
}
```

11번째 줄의 breakpoint에서 각 변수에 저장된 값은 다음과  같다.

|변수|주소|값|
|----|----|--|
|str_a|0x7fffffffdd10|0x48|
|pointer|0x7fffffffdd10|0x48|
|pointer2|0xbfebfbff| - |

pointer2에 저장된 값은 의미가 없는 쓰레기 값이다. 임의의 주소값을 가지지만 해당 주소의 가상 메모리는 할당되지 않은 메모리이기 때문에 접근할 수 없다. 해당 주소에 접근하면 segmentation fault가 발생한다.

<hr>

## 스택 메모리 분석

main 함수의 스택 프레임에는 그림과 같이 문자열의 시작 주소, 문자열 등이 저장되어 있다.

<img src="/assets/images/note/main-stack-frame.png" alt="stack frame" />

<hr>

## function prologue

function prologue란 assembly language programming에서 함수가 호출하기 위해 레지스터와 스택을 준비하는 몇 줄의 코드를 의미한다.

<img src="/assets/images/note/function-prologue.png" alt="function prologue" />

printf 함수가 호출되기 전 문자열의 시작 주소가 rdi 레지스터로 복사된다.

<hr>

## reference
* [해킹 공격의 예술](https://www.yes24.com/Product/Goods/3734711)
* [WIKIPEDIA](https://en.wikipedia.org/wiki/Function_prologue_and_epilogue)

