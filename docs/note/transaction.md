---
layout: default
title: Transaction ACID
parent: Note
#grand_parent: 
#nav_order: 
date: 2024-05-25 18:43 +0900
#last_modified_at: 2024-01-01 00:00 +0900
#permalink: /docs/ps/XXX/XXXX
hit_count: false
categories:
  - Note
  - DBMS
---

# Transaction ACID
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

트랜잭션이란 한 개 이상의 SQL statement를 하나의 논리적 단위로 묶은 것이다. 트랜잭션이 어떤 상황에서도 의도한 대로 동작(일관성과 무결성 유지)하기 위해서는 두 가지를 고려해야 한다. 첫 번째는 <mark>동시성</mark>이고 두 번째는 <mark>실패에 대한 대응</mark>이다.

* 일관성 : 여러 테이블에 걸쳐 저장된 데이터가 실세계의 대상을 정확하게 표현해야 한다.
* 무결성 : 일관성, 정확성을 보장하기 위해 부여한 규칙

<hr>

## ACID

트랜잭션은 ACID라는 다섯 가지의 성질을 만족해야 한다.

* Atomicity(원자성) : 트랜잭션의 결과는 0 또는 1이다. 트랜잭션을 구성하는 모든 statement가 성공(1)하거나 모두 실행되지 않아(0)야 한다.
* Consistency(일관성) : 고립상태(동시에 실행되는 트랜잭션이 없는 상황)에서 트랜잭션의 수행이 데이터베이스의 일관성을 보존해야 한다.
* Isolation(고립성) : 여러 트랜잭션이 동시에 실행되더라도 그 결과는 독립적으로 실행한 경우와 같아야 한다.
* Durability(지속성) : 성공적으로 실행 완료된 트랜잭션이 변경한 내용은 시스템에 오류가 발생하더라도 영구적으로 반영되어야 한다.

### example

계좌 A에서 계좌 B로 $50을 이체하는 트랜잭션 T가 있을 때 T가 ACID를 만족하기 위한 조건은 아래와 같다. (read와 write연산은 데이터베이스에 즉시 반영된다고 가정)

<pre>
T : read(A);
	A := A - 50
	write(A);
	read(B);
	B := B + 50
	write(B)
</pre>

* Atomicity : write(A) 연산과 write(B) 연산 사이에 오류가 발생했다면 write(A)는 취소되어야 한다. 트랜잭션이 전혀 실행되지 않은 상태를 유지해야 한다.
* Consistency : 트랜잭션 전후 계좌 A,B의 잔액의 합이 일정해야 한다.
* Isolation : 한 개 이상의 트랜잭션이 동시에 실행된 결과가 하나씩 순차적으로 실행한 결과와 같아야 한다. 고립성은 DBMS의 동시성 제어 시스템(concurrency-control system)이 책임진다.
* Durabliity : 사용자가 트랜잭션이 정상적으로 완료되었음을 확인했다면 시스템 오류가 발생하더라도 그 트랜잭션이 처리한 모든 갱신 결과가 데이터베이스에 지속되어야 한다.

<hr>

## 트랜잭션의 상태

모든 트랜잭션은 다음 중 하나의 상태를 가진다.

* 동작(active) : 초기 상태. 트랜잭션이 실행 중인 상태.
* 부분 커밋(partially committed) : 마지막 명령문이 실행된 후의 상태.
* 실패(failed) : 정상적인 실행이 더 이상 진행될 수 없는 상태.
* 중단(aborted) : 트랜잭션이 롤백되어 DB가 트랜잭션 시작 전의 상태로 롤백된 상태.
* 커밋(committed) : 트랜잭션이 성공적으로 완료된 후의 상태.

<hr>

## 직렬 가능성(Serializable)

트랜잭션 여러 개가 한 번에 실행될 때 각 트랜잭션들을 구성하는 연산(SQL statement)들의 실행 순서를 스케줄이라고 한다. 임의의 스케줄 중에서 각 트랜잭션을 순차적으로 실행했을 때와 같은 결과를 생성하는 스케줄을 <mark>직렬 가능 스케줄</mark>이라고 한다.

명령어(statement) I와 J 중 어떤 것을 먼저 실행하느냐에 따라 결과가 달라지는 현상을 <mark>충돌(conflict)</mark>라고 한다. 스케줄 S의 스케줄을 변경했을 때 충돌이 발생하지 않는다면 두 스케줄은 <mark>충돌 동등(conflict equivalent)</mark>하다라고 표현한다.

<img src="/assets/images/note/conflict-equality-3-5.png" alt="conflict-equality" />

스케줄 S3와 S5는 충돌 동등하다. 즉, 두 스케줄의 실행 결과는 동일하다.

<hr>

## 고립성 수준(Isolation Level)

트랜잭션의 직렬 가능성을 보장하기 위한 규약들은 동시성을 거의 허용하지 않을 수도 있다. 그렇게 될 경우 동시성의 장점인 utilization과 성능 향상이 사라진다.   
이를 방지하기 위해 <mark>SQL 표준에서는 특정 트랜잭션이 다른 트랜잭션과 직렬 불가능한 방식으로 수행되는 것을 허용</mark>한다. 트랜잭션의 직렬 가능성을 강제하지 않음으로써 굳이 직렬 가능성이 필요하지 않은 트랜잭션이 빠르게 실행되는 것을 허용한다.

SQL 표준에 명시된 고립성 수준(isolation level)은 다음과 같다.

* 직렬 가능(Serializable)
	* 직렬 가능성이 보장된다. 
	* 데이터베이스의 일관성이 유지된다.
* 반복 가능한 읽기(Repeatable read) 
	* 커밋된 데이터만 읽을 수 있다.
	* 해당 트랜잭션이 하나의 레코드를 두 번 읽을 때 다른 트랜잭션은 그 레코드에 접근(수정)할 수 없다.
	* 직렬 가능성을 보장하지 못한다.
	* 예를 들어 두 번의 read 연산 사이에 커밋된 트랜잭션에 의해 삽입된 레코드는 조회 될 수도 있고 안될 수도 있다.
	* 즉, 동일한 레코드의 반복적인 읽기는 일관성이 보장되지만 전체 row 개수는 보장하지 못한다.
* 커밋된 데이터 읽기(Read committed) 
	* 커밋된 레코드만 읽을 수 있다.
	* 동일한 레코드를 2번 연속으로 조회하는 사이에 다른 완료된 트랜잭션에 의해 값이 변경되었을 수 있다. 
* 커밋되지 않은 레코드 읽기(Read uncommitted)
	* 커밋되지 않은 데이터도 읽는다.

위의 모든 고립성 수준은 dirty write는 허용하지 않는다. 즉, 커밋되었거나 중단된 경우에만 값을 변경할 수 있다. 

<hr>

## 고립성 수준 설정

대부분의 DBMS는 Read committed 고립성 수준이 기본 설정이다. 기본 설정을 사용하지 않고 명시적으로 원하는 고립성 수준을 설정할 수 있다.

<pre class="cli">
$ set transaction isolation level serializable
</pre>

<hr>

## references
* [DATABASE SYSTEM CONCEPTS](https://www.db-book.com/)
