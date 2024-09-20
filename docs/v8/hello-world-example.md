---
layout: default
title: hello world example
date: 2024-01-19 15:01 +0900
# last_modified_at: 2024-01-01 00:00 +0900
parent: v8
# permalink: /docs/note/XXX/XXXX
hit_count: false
categories:
  - v8
  - open source
---

# embedding V8

C++ 애플리케이션에 [V8 자바스크립트 엔진](https://v8.dev)을 내장하는 방법

* 자바스크립트를 통해 애플리케이션의 C++ 객체, 함수 등에 접근할 수 있게 된다.
* 반대로 자바스크립트 객체, 함수 등에 C++를 통해 접근할 수 있게 된다.

<hr>

## Key concepts

* isolate - 독립된 힙 공간을 가지는 VM 인스턴스
* local handle - 객체를 가리키는 포인터. 모든 V8 객체들은 핸들을 통해 접근한다.
* handle scope - 1개 이상의 핸들을 포함하는 컨테이너로 생각할 수 있다.   
    여러 개의 핸들이 더 이상 필요 없다면 개별적으로 삭제하는 대신 그것들을 포함하는 scope를 삭제하면 된다.
* context - 서로 독립적인 자바스크립트 코드를 하나의 V8 인스턴스에서 실행되도록 만드는 환경이다.   
    자바스크립트 코드가 실행되길 원한다면 반드시 해당 코드가 어떤 context에서 실행될지 명시해야 한다.

<hr>

## Run the example

1. [Git instruction](https://v8.dev/docs/source-code#using-git)에 따라 V8 소스코드를 로컬에 다운받는다.
2. 해당 예제가 성공적으로 테스트된 코드를 체크아웃(로컬에 다운)한다.   
    `$ git checkout branch-heads/11.9 -b sample -t`
3. 빌드 정보 설정 - `out.gn/<빌드 경로>/`에 빌드 설정 파일들이 생성된다.   
    * `$ tools/dev/v8gen.py <빌드 경로>`
    * 빌드 경로 - `<target cpu>.<목적>.<이름>` 으로 구성한다.
    * `$ ./tools/dev/v8gen.py list` 명령어로 가능한 설정들을 볼 수 있다.
    * ex) `$ tools/dev/v8gen.py arm64.release.sample`
4. M1 맥북(arm64)에 [static library](/docs/note/library) 빌드   
    * `$ ninja -C out.gn/arm64.release.sample v8_monolith`
    * `ninja` - google에서 개발한 소형 빌드 시스템.
    * `-C` 빌드가 진행되는 디렉토리 지정
    * `v8_monolith` - static library 이름. C++ 애플리케이션에 링크할 수 있다.
5. `hello-world.cc` 파일을 실행파일로 빌드 (GNU compiler 사용)   
    * `$ g++ -I. -Iinclude samples/hello-world.cc -o hello_world -fno-rtti -lv8_monolith -lv8_libbase -lv8_libplatform -ldl -Lout.gn/x64.release.sample/obj/ -pthread -std=c++17 -DV8_COMPRESS_POINTERS -DV8_ENABLE_SANDBOX`
    * `-I` - 헤더파일 경로 지정
    * `-D` - 전처리기 매크로 설정
6. 코드가 복잡한 경우 V8은 ICU 데이터 파일이 필요하다. 실행파일이 위치한 디렉토리에 추가해야 한다.   
    * `$ cp out.gn/x64.release.sample/icudtl.dat .`
    * ICU(International Components for Unicode) - 국제화 및 유니코드 처리에 필요
7. 실행파일 실행   
    * `./hello-world`

<hr>


## references
* [Getting started with embedding V8](https://v8.dev/docs/embed)
