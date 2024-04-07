---
layout: default
title: gdb 명령어
parent: dev
# grand_parent: 
# nav_order: 
date: 2024-04-07 22:12 +0900
# last_modified_at: 2024-01-01 00:00 +0900
# permalink: /docs/ps/XXX/XXXX
# hit_count: false
categories:
  - dev 
  - C/C++
tags:
  - gdb
---

# gdb 명령어
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

## x command

전달받은 주소에 저장된 값을 주어진 format에 맞게 출력한다.

syntax

```bash
x [주소]
x/[format] 주소
x/[length][format] 주소
```

### format

특정 주소에 저장된 값을 해석하는 방법이다.
실제로 문자가 저장된 위치지만 i 포맷을 지정하면 instruction으로 해석하고 그에 맞는 asm code를 출력한다.

* o - octal
* x - hexadecimal
* t - binary
* f - floating point
* c - char
* s - string
* i - instruction

### size modifier

format 뒤에 size modifier를 지정할 수 있다.   
전달받은 주소를 시작으로 얼마나 읽을지를 결정한다.

* b - byte (8 - bit)
* h - halfword(16 - bit)
* w - word(32 - bit)
* g - giant word(64 - bit)

### example

<img src="/assets/images/note/main-stack-frame.png" alt="stack frame" />

* `x/xg 0x7fffffffdd10` - 0x7fffffffdd10에서부터 64비트를 읽어 16진수로 출력한다.
* `x/xb 0x7fffffffdd10` - 0x7fffffffdd10에서부터 8비트를 읽어 16진수로 출력한다.
* `x/4i $rip` - rip부터 네 개의 instruction을 출력한다. ($rip가 가리키는 주소에 저장된 값을 instruction으로 해석한다.)

<hr>

## registers

`i r [register name]`

지정된 레지스터에 저장된 값을 출력한다.  
레지스터 이름을 생략하면 모든 레지스터의 값을 출력한다.

<img src="/assets/images/note/registers.png" alt="registers" />


<hr>

## reference
* [해킹 공격의 예술](https://www.yes24.com/Product/Goods/3734711)
* [SYSPROGS](https://visualgdb.com/gdbreference/commands/x)
* [Registers in x86 Assembly](https://www.cs.uaf.edu/2017/fall/cs301/lecture/09_11_registers.html)

