---
layout: default
title: \[MariaDB\] 디렉토리 구조
parent: Note
utteranc: true
#grand_parent: 
#nav_order: 
date: 2024-09-09 22:37 +0900
#last_modified_at: 2024-01-01 00:00 +0900
#permalink: /docs/ps/XXX/XXXX
hit_count: false
categories:
  - DBMS
tags:
  - mariadb
  - OSS
---

# \[MariaDB\] 디렉토리 구조
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

[MariaDB/server](https://github.com/MariaDB/server) 저장소의 주요 디렉토리에 대한 설명

## sql

* SQL parser, optimizer, executor, storage engine 통합 등의 코드 포함
* SQL executor의 파싱 및 처리, 쿼리 계획 수립, 실행
* 서버 데몬의 entry point인 `main.cc`와 `mysqld.cc` 포함

## storage

* 다양한 스토리지 엔진 코드
* 각 스토리지 엔진(예: InnoDB, MyISAM, Aria 등)에 대한 코드

## include

* 전역적으로 사용되는 헤더 파일
* 프로젝트 전반에 걸쳐 사용되는 공통적인 정의와 인터페이스 포함

## mysys

* 시스템 호출과 유틸리티 함수
* MariaDB의 내부에서 공통적으로 사용하는 시스템 레벨 함수

## plugin

## scripts

* MariaDB 서버를 빌드하고 관리하기 위한 스크립트
* 초기화, 업그레이드, 테스트 스크립트 등

## libservices

* MariaDB의 서비스 레이어
* 로그 서비스, 통계 서비스 등

<hr>

## references
* ChatGPT
* [mariadb.org/contribute](https://mariadb.org/contribute/)
