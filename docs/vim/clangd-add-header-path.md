---
layout: minimal
title: clangd 헤더파일 경로 추가
date: 2024-01-19 16:45 +0900
# last_modified_at: 2024-01-01 00:00 +0900
parent: vim
# permalink: /docs/note/XXX/XXXX
hit_count: false
categories:
  - vim
---

# clangd 헤더파일 경로 추가
{: .no_toc }
<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

`clangd`가 사용자가 작성한 헤더파일을 인식하도록 설정하는 방법

<hr>

## JSON compilation database

compilation database란 프로젝트의 소스 코드를 컴파일하는데 필요한 정보를 모아둔 것이다.

* 컴파일러 옵션, 소스 파일 경로, 헤더파일 include 경로 등을 포함
* 일반적으로 JSON 형식으로 작성

### motivations

C++ [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) 기반의 코드 분석 도구는 C++ 파일 하나를 분석하기 위해 full information(트리 전체 정보)이 필요하다.   
트리 전체의 정보, 즉 프로젝트의 모든 소스코드에 대한 정보는 빌드 시스템이 실행되어야 접근할 수 있다. 하지만 파일 하나를 분석하기 위해 빌드 시스템을 실행하는 것은 최선의 방법이 아니다.   
language server는 compilation database의 정보를 통해 전체 프로젝트에서 특정 파일이 어떻게 컴파일되는지 빠르게 파악 할 수 있다.

### format

```json
[
  { "directory": "/home/user/llvm/build",
    "arguments": ["/usr/bin/clang++", "-Irelative", "-DSOMEDEF=With spaces, quotes and \\-es.", "-c", "-o", "file.o", "file.cc"],
    "file": "file.cc" },

  { "directory": "/home/user/llvm/build",
    "command": "/usr/bin/clang++ -Irelative -DSOMEDEF=\"With spaces, quotes and \\-es.\" -c -o file.o file.cc",
    "file": "file2.cc" },
]
```

### compilation database 생성

* `$ clang <프로젝트 빌드 명령> -MJ compile_commands.json`
* ex) `$ clang clang++ -I. -Iinclude samples/hello-world.cc -o hello_world -fno-rtti -lv8_monolith -lv8_libbase -lv8_libplatform -ldl -Lout.gn/arm64.release.sample/obj/ -pthread -std=c++17 -DV8_COMPRESS_POINTERS -DV8_ENABLE_SANDBOX -MJ compile_commands.json`
* clang 뿐만 아니라 CMake 등의 다양한 빌드 시스템에서 compilation database 생성 기능을 지원한다.

### Alternative

간단한 프로젝트의 경우 `compile_flags.txt` 로 `compile_commands.json`를 대체할 수 있다.

```txt

```

<hr>

## example

프로젝트의 루트 디렉토리는 일반적으로 `.git` 디렉토리가 존재하는 디렉토리를 의미한다.   
프로젝트의 루트 디렉토리에 아래와 같은 `compile_flags.txt`를 추가한다.   

```json
[
  {
    "arguments": ["/usr/bin/g++", "-Iinclude", "I.", "-DV8_COMPRESSED_POINTERS", "-DV8_ENABLE_SANDBOX"],
  },
]
```

`compile_commands.json` 은 추가해도 clangd가 인식하지 못했다...

결과

<img src="/assets/images/vim/v8-hello-world-clangd.png" alt="hello-world" width="80%" />

<hr>

## references

* [JSON Compilation Database Format Specification](https://clang.llvm.org/docs/JSONCompilationDatabase.html#format)
