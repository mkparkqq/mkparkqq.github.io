---
layout: minimal
title: CCNA 준비
date: 2024-04-22 20:20 +0900
# last_modified_at: 2024-01-01 00:00 +0900
# parent: Note
# permalink: /docs/note/XXX/XXXX
hit_count: false
categories:
  - Note
---

# CCNA 준비
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

## LAN (Local Area Network)
* 집, 학교, 회사와 같이 비교적 작은 범위를 연결하는 네트워크
* 구체적으로는 3계층 프로토콜로 eigrp 를 사용하는 네트워크

### 구성 방법
* 네트워크 장비 연결
	* switch - PC : Copper straight-through cable
	* router - switch : Copper straight-through cable
* interface 활성화
```
Router(config-if)#no shutdown
```
* ip 주소 할당 (router)
```
Router(config-if)#ip address 11.1.1.1 255.255.255.224
```
* ip 주소 할당 (PC)
	* IP주소 : 11.1.1.34
	* 서브넷 마스크 : **255.255.255.224**
	* 기본 게이트웨이 : 11.1.1.33
* 라우팅 프로토콜 설정
```
Router(config)#router eigrp 100
Router(config)#network 11.0.0.0
```
* ping 테스트 (LAN이 정상적으로 동작하는지 확인)
```
ping -n 3 11.1.1.34
```

## references
* [단기 완성 합격 보장 CCNA R&S의 정석](https://www.cyber.co.kr/book/item/5659)
* [\[CSICO\] What Is a LAN?](https://www.cisco.com/c/en/us/products/switches/what-is-a-lan-local-area-network.html)
