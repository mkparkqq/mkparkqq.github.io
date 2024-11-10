---
layout: default
title: C program memory layout
parent: Note
utteranc: true
#grand_parent: 
#nav_order: 
date: 2024-11-10 15:00 +0900
#last_modified_at: 2024-01-01 00:00 +0900
#permalink: /docs/ps/XXX/XXXX
hit_count: true
categories:
  - Note
---

# C program memory layout
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

## logical diagram

 * c 실행파일이 메모리에 로드되는 형태는 아래와 같다
 * 스택 프레임 여러 개를 묶어서 스택이라고 한다
 * 함수가 호출될때마다 스택 프레임 한 개가 생성된다. 스택 프레임은 함수의 실행 환경을 제공한다

<img src="/assets/images/note/c-program-memory-layout.png" alt="c-program-memory-layout" />

## registers

* rbp(base pointer) : 현재 스택 프레임의 가장 낮은 주소

## example1

* 아래의 명령어로 c code를 assembly code로 컴파일 (x86_64 cpu)
* `gcc -S scratch.c -o scratch.o`

<img src="/assets/images/note/20241110-scratch.c.png" alt="example1-c-code" />

<img src="/assets/images/note/20241110-scratch.s-descripted.png" alt="example1-s-code" />

* 변수의 선언만 한 경우 스택을 할당하지만 초기화까지 하는 경우 immediate value를 레지스터에 저장하는 instruction이 추가된다

### x86 instructions & registers

* `$0`, `$1` - immediate value(주소값이 아닌 리터럴)
* mov - memory와 processor register 사이의 값 이동(복사). 반드시 operand 하나는 register이다. 나머지 하나는 immediate value일 수도 있고 메모리 주소일 수도 있다.
    * `movq` - 64비트 값 이동 (주로 메모리 주소값)
    * `movl` - 32비트 값 이동
* `lea` - load effective address
    * 주소값을 계산해서 dst에 저장한다 (메모리에서 값을 로드하지 않는다)
    * lea 80(%rdx,%rcx,2),$rax - $rax=80+%rdx+2\*%rcx
* `rip` - instruction pointer
* `%rdi` `%rsi` `%rdx` `%rcx` `%r8` `%r9` - callee function의 argument 저장
    * [x86_64 calling conventions](https://en.wikipedia.org/wiki/X86_calling_conventions) 참고


### function prologue

* 함수 실행에 필요한 register, stack을 준비한다
* Pushes current base pointer onto the stack, so it can be restored later. 
    * `pushq %rbp` - %rbp의 값을 %rsp가 가리키는 공간에 저장
* Value of base pointer is set to the address of stack pointer (which is pointed to the top of the stack) so that the base pointer will point to the top of the stack. 
    * `moveq %rsp, %rbp` - %rbp에 %rsp의 값을 저장(새로운 스택의 base 주소(%rbp)를 이전 스택의 가장 높은 주소(%rsp)로 설정)
* Moves the stack pointer further by decreasing or increasing its value, depending on whether the stack grows down or up. On x86, the stack pointer is decreased to make room for the function's local variables.
    * `subq $16, %rsp` - 지역변수를 저장할 공간을 할당

### function epilogue

* function prologue의 반대 과정. (Function epilogue reverses the actions of the function prologue and returns control to the calling function.)
    * control - cpu에 대한 주도권. 레지스터에 f1함수에 대한 값이 저장되어 있다면 control은 f1에게 있다
* Drop the stack pointer to the current base pointer, so room reserved in the prologue for local variables is freed.
    * `leave` - `mov %rbp, %rsp`와 `pop %rbp` 명령어를 결합한 명령어
* Pops the base pointer off the stack, so it is restored to its value before the prologue.
* Returns to the calling function, by popping the previous frame's program counter off the stack and jumping to it.

## example2

* 초기화하지 않은 변수에 대한 최적화

<img src="/assets/images/note/20241110-example2.png" alt="example2" />

* %eax - return value
* `int b = b;` - 의도적으로 초기화하지 않음을 컴파일러에게 알려준다.
    * 이런 코드 없이 초기화 하지 않으면 컴파일할때 경고 메세지가 출력된다. 
    * 그렇다고 `int b =0;`과 같이 초기화할 경우 `movl $0, -16(%rbp)` 라는 instruction이 추가된다.
    * 이런 instruction은 프로세서에서 메모리로 값을 복사하기 때문에 없애면 성능이 향상된다

<img src="/assets/images/note/20241110-example2-wall.png" alt="warning message" />


<hr>

## references
* [geeksforgeeks.org/memory-layout-of-cprogram](https://www.geeksforgeeks.org/memory-layout-of-c-program/)
* [function prologue and epilogue](https://en.wikipedia.org/wiki/Function_prologue_and_epilogue)
* [x86 Instruction Set](https://ee.usc.edu/~redekopp/cs356/slides/CS356Unit4_x86_ISA.pdf)
* [x86 calling convention](https://en.wikipedia.org/wiki/X86_calling_conventions)
