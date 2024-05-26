---
layout: default
title: 인덱싱
parent: Note
#grand_parent: 
#nav_order: 
date: 2024-05-26 20:46 +0900
#last_modified_at: 2024-01-01 00:00 +0900
#permalink: /docs/ps/XXX/XXXX
hit_count: false
categories:
  - Note
  - DBMS
---

# 인덱싱 
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

대부분의 쿼리는 데이터베이스 내의 극히 일부분만 참조한다. 예를 들어 나이가 25살인 모든 학생을 조회하는 쿼리는 학생 테이블의 일부만 필요로 한다. 이를 찾기 위해 테이블 내의 모든 튜플을 읽고 비교하는 것은 비효율적이다. 인덱싱은 이를 개선하기 위한 부가적인 구조이다.

인덱스에는 두 가지의 기본적인 종류가 있다.

* 순서 인덱스(Ordered index) : 값에 대해 정렬된 순서로 구성된다.
* 해시 인덱스(Hash index) : 레코드가 해시 함수에 의해 버켓에 배정된다.

<hr>

## 평가 요소

인덱싱 기술은 다음과 같은 요소에 기초해서 평가한다.

* 접근 시간(Access time) : 특정 레코드나 레코드 집합을 찾는데 걸리는 시간
* 삽입 시간(Insertion time) : 새로운 레코드를 삽입하는데 걸리는 시간. 새로운 항목을 삽입하기 위한 정확한 위치를 계산하는 시간과 인덱스 구조를 갱신하는 데 걸리는 시간이다.
* 삭제 시간(Deletion time) : 레코드 항목을 삭제하는 데 걸리는 시간. 삭제될 항목을 찾는 데 걸리는 시간과 인덱스 구조를 갱신하는 데 걸리는 시간을 포함한다.
* 공간 부담(Space overhead) : 인덱스 구조가 사용하는 메모리 공간.

<hr>

## references
* [DATABASE SYSTEM CONCEPTS](https://www.db-book.com/)
