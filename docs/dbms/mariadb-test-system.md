---
layout: default
title: \[MariaDB\] Test Framework
parent: DBMS
utteranc: true
#grand_parent: 
#nav_order: 
date: 2024-10-19 08:21 +0900
#last_modified_at: 2024-01-01 00:00 +0900
#permalink: /docs/ps/XXX/XXXX
hit_count: false
categories:
  - DBMS
tags:
  - unittest
  - mariadb
  - OSS
---

# \[MariaDB\] Test Framework
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

## 빌드

* 빌드 결과가 저장될 디렉토리 `build` 생성&이동
* 따로 옵션을 명시하지 않아도 단위 테스트들이 기본적으로 빌드된다
<div class="cli">
mkdir build && cd build && cmake .. && cmake --build . --parallel 5
</div>

## 테스트 실행

* 모든 테스트 실행
    * `build` 디렉토리에서 `cmake` 명령어 실행
* 특정 테스트 실행 
    * `build/unittest/mysys/my_malloc-t` 실행

## 테스트 프레임워크

* MariaDB의 테스트 프레임워크는 ctest, cmake를 감싸는 cmake 매크로와 함수로 구현되어 있다
* `MY_ADD_TESTS(dynarray LINK_LIBRARYS mysys)`
    * `cmake/ctest.cmake`에 정의된 cmake 매크로
    * `dynarray-t.c`파일에 mytap 라이브러리를 링크하여 `dynarray-t` 실행파일을 만드는 규칙을 생성한다
* mytap : MariaDB에서 사용하는 테스트 라이브러리
    * 테스트 작성에 반복적으로 사용되는 함수들을 제공
    * `unittest/examples/simple-t.c`에서 사용법을 익힐 수 있다
    * `plan`함수 : 이 파일에서 몇 개의 테스트를 진행할지 미리 선언한다
    * `ok`함수 : 첫 번째 인자로 0이 전달되면 테스트 실패를 의미한다


## 실습

* cmake에게 테스트 빌드 방법 전달
    * `unittest/mysys/CMakeLists.txt` 파일 편집
    * `MY_ADD_TESTS` 매크로에 `dynarray` 추가
* `unittest/mysys/dynarray-t.c` 파일 생성

```c
#include <tap.h>
#include <my_global.h>
#include <my_sys.h>
#include <stdio.h>

struct _foo {
  int num;
  char str[64];
};

static unsigned int test_dynamic_increase(int size)
{
  /* @given
   * 초기 크기가 size이고 element32개만큼의 공간이 늘어나는 동적 배열 생성
   */
  unsigned int inc = 32;
  DYNAMIC_ARRAY array;
  // my_init_dynamic_array 함수는 항상 FALSE를 반환한다
  my_init_dynamic_array(PSI_NOT_INSTRUMENTED, &array, sizeof(struct _foo), 
      size, inc, MYF(0));
  /* @when
   * size + 1개의 원소를 배열에 추가
   */
  unsigned int i;
  struct _foo foo;
  for (i = 0; i <= size; ++i)
  {
    foo.num = i;
    snprintf(foo.str, 64, "sample string-%u", i);
    /* @then
     * 원소 추가에 성공
     */
    if (insert_dynamic(&array, (const void *)&foo)) {
      diag("insert_dynamic failed");
      return TRUE;
    }
  }
  /* @then
   * capacity가 size에서 inc만큼 증가함
   */
  if (size + array.alloc_increment != array.max_element) {
    diag("actual: %u expected: %u", array.max_element, 
        size+array.alloc_increment);
    return TRUE;
  }

  /*
   * C/C++ 프로그래밍에서 함수가 성공할 경우 0을 반환하는 관례를 따름
   */
  return FALSE;
}

int main() {
  unsigned int a,b;
  unsigned int failed;
  plan(1);
  diag("Testing DYNAMIC_ARRAY");
  failed = 0;
  for (a = 1 ; a < 200 ; ++a)
    if (test_dynamic_increase(a)) {
      ++failed;
      diag("Failed for test_dynamic_increase(%3u)", a);
    }
  ok(failed == 0, "test_dynamic_increase");
  return exit_status();
}
```
* 빌드한 뒤 전체 실행 또는 `build/unittest/mysys/dynarray-t` 실행

<hr>

## references
* [Get the code, build it, test it](https://mariadb.org/get-involved/getting-started-for-developers/get-code-build-test/#testing-the-server)
* [Writing Good Test Cases for MariaDB Server](https://mariadb.org/get-involved/getting-started-for-developers/writing-good-test-cases-mariadb-server/)
