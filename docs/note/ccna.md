---
layout: minimal
title: CCNA 준비
date: 2024-04-22 20:20 +0900
# last_modified_at: 2024-01-01 00:00 +0900
parent: Note
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

## 자주 사용하는 명령어
* 인터페이스별 ip 주소 확인    
	`Router>show ip interface brief`    
* 라우팅 테이블 확인    
	`Router>show ip route`    
* ARP 캐시에 저장된 ip주소-mac주소 매핑 관계 출력    
	`Router>show arp`    
* 트렁크 인터페이스의 정보 표시. 각 트렁크 인터페이스(포트)가 어떤 encapsulation을 사용하는지 확인 가능    
	`Switch#show interfaces Trunk`    
* Foreground에서 실행중인 작업 강제 종료    
	`Ctrl + Shift + 6`

<hr>

## IPv4
* OSI 3계층 (TCP/IP 인터넷 계층) 통신을 위해 필요한 주소값.
* (8-bit X 4 = 32-bit)를 사용한다.
* IPv6는 (16-bit X 8 = 128-bit) 사용

### 클래스풀 IPv4 주소
* IP 주소를 다섯 개의 클래스로 구분한다.

|클래스|IPv4 주소|용도|
|------|---------|----|
|A     |1.0.0.0 ~ 126.255.255.255|유니캐스트|
|B     |128.0.0.0 ~ 191.255.255.255|유니캐스트|
|C     |192.0.0.0 ~ 223.255.255.255|유니캐스트|
|D     |224.0.0.0 ~ 239.255.255.255|멀티캐스트|
|E     |240.0.0.0 ~ 255.255.255.255|유니캐스트|

### 디폴트 서브넷 마스크
* 서브넷 마스크를 표시하지 않는 네트워크 주소 표기 방식이다.
* 각 클래스별 디폴트 서브넷 마스크는 아래와 같다.

|클래스|디폴트 서브넷 마스크(prefix-length)|
|------|-----------------------------------|
|A|8|
|B|16|
|C|24|

### 서브넷 마스크와 서브네팅
* 서브넷 마스크는 네트워크와 호스트의 경계를 표시한다.
	* 예를 들어 177.189.120.8/24는 주소가 177.189.120.0인 네트워크의 8번째 호스트라는 의미이다.
	* 서브넷 마스크가 24 -> 해당 네트워크에는 2^(32 - 24 - 2)개의 호스트가 연결될 수 있다는 뜻이다.
* 서브네팅이란 주소의 낭비를 막기 위해 IP 주소에서 네트워크 자리를 확장하는 것이다.

<hr>

## LAN (Local Area Network)
* 집, 학교, 회사와 같이 비교적 작은 범위를 연결하는 네트워크
* 구체적으로는 3계층 프로토콜로 eigrp 를 사용하는 네트워크

### 구성 방법
* 네트워크 장비 연결
	* switch - PC : Copper straight-through cable
	* router - switch : Copper straight-through cable
* interface 활성화   
	`Router(config-if)#no shutdown`
* ip 주소 할당 (router)    
	`Router(config-if)#ip address 11.1.1.1 255.255.255.224`
* ip 주소 할당 (PC)
	* IP주소 : 11.1.1.34
	* 서브넷 마스크 : **255.255.255.224**
	* 기본 게이트웨이 : 11.1.1.33
* 라우팅 프로토콜 설정    
	`Router(config)#router eigrp 100`    
	`Router(config)#network 11.0.0.0`    
* ping 테스트 (LAN이 정상적으로 동작하는지 확인)    
	`ping -n 3 11.1.1.34`

<hr>

## 이더넷 스위치
스위치는 기본적으로 세 가지 기능을 수행한다.
* 스위칭 테이블(mac address - interface 대응관계) 작성
* 스위칭 / 플러딩
* STP

### 컬리전 도메인
* 하나의 전송 매체(케이블)에 여러 기기가 데이터를 전송할때 신호가 충돌하며 비정상적인 신호가 만들어지는 상황을 컬리전이라고 한다.
* 스위치의 인터페이스가 풀 듀플렉스 모드일 때에는 컬리전이 발생하지 않는다. 하프 듀플렉스 환경에서만 발생한다.
* CSMA/CD 서킷은 하프 듀플렉스 상태에서 활성화되고 풀 듀플렉스 상태에서는 활성화되지 않는다.

<hr>

## VLAN
브로드캐스팅 도메인을 자유롭게 분할하기 위해 디스트리뷰션 계층에 라우터+스위치를 배치하여 논리적인 LAN을 구성하는 방식이다. 
* 802.1q : 포준 프로토콜
* ISL : 시스코 프로토콜

### IEEE 802.1q
기존의 **ethernet 헤더**에 4바이트 TAG를 추가한다. 
* PRI : QoS를 제공하기 위한 프레임의 우선순위

### Trunk vs Access Link
* 트렁크는 모든 VLAN 프레임들이 이용하는 전송 매체이다. 802.1q에 정의된 네 번째 헤더가 필요하다.
* 액세스 링크는 특정 VLAN 프레임만 통과할 수 있는 전송 매체이다.

### 설정 방법
1. 스위치를 통과하는 모든 VLAN을 선언한다.    
`Switch(config)#vlan 10`   
`Switch(config-vlan)#vlan 20`

2. 트렁크 설정    
`Switch(config)#interface fastethernet 0/1`    
`Switch(config-if)#switchport mode trunk`   
	* 자동으로 dot1q로 설정된다.
	* ARPA, isl, dot1q(IEEE 802.1Q)는 트렁크의 encapsulation type이다.
	* ARPA는 vlan을 지원하지 않는 encapsulation이다.

3. 액세스 링크 설정    
`Switch(config)#interface fastethernet 0/2`   
`Switch(config-if)#switchport mode access` (생략 가능)   
`Switch(config-if)#switchport access vlan 10`    

### 라우터 온 어 스틱

하나의 라우터 인터페이스가 여러 VLAN의 디폴트 게이트웨이가 되어야 하는 경우 사용하는 솔루션이다.     

### 설정 방법

1. 라우터의 인터페이스에 서브 인터페이스를 할당하고 활성화한다..    
	`Router(config)#interface fastethernet 0/0`    
	`Router(config-if)#interface fastethernet 0/0.1`    
	`Router(config-subif)#no shutdown`    
2. 물리 인터페이스에서 서브 인터페이스가 사용할 ip 주소를 사용하고 있고 더 이상 필요 없다면 해당 인터페이스의 주소를 해제한다.
	`Router(config-subif)#interface fastethernet 0/0`    
	`Router(config-if)#no ip address`    
3. 서브 인터페이스에 vlan encapsulation과 ip 주소 설정.    
	`Router(config-subif)#encapsulation dot1q 10`    
	`Router(config-subif)#ip address 11.1.1.1 255.255.255.0`      
4. 네트워크에 연결된 PC 설정
	* 디폴트 게이트웨이를 적절한 라우터의 서브 인터페이스 주소로 설정.

### DTP(Dynamic Trunking Protocol)
* 자동 협의 과정을 통해 스위치의 포트가 액세스 링크가 될지 트렁크가 될지 결정한다.
* Cisco 스위치는 DTP가 기본적으로 활성화 되어 있다.
* Cisco 스위치에 포트에는 네 가지 모드가 있는데 각 모드에 따라 DTP는 해당 링크를 트렁크가 될지, 액세스 링크가 될지 결정한다. 
	* on : 해당 포트가 항상(반대편 포트의 모드에 관계 없이) 트렁크로 설정된다. (단, off는 제외)   
		`Switch(config-if)#switchport mode trunk`
	* off : 항상 액세스 링크로 설정된다.   
		`Switch(config-if)#switchport mode access`
	* desirable : 반대편이 on, desirable, auto일때 트렁크가 된다.   
		`Switch(config-if)#switchport mode dynamic desirable`
	* auto : 반대편이 on, desirable일때 트렁크가 된다.   
		`Switch(config-if)#switchport mode dynamic auto`

### VTP(VLAN Trunking Protocol)
* VLAN 정보를 트렁크를 통해 스위치들끼리 공유하는 프로토콜이다.
* 스위치마다 일일히 VLAN 설정을 하지 않아도 된다.
* VTP가 실행되기 위해서는 스위치의 모드를 설정해야 한다.   
* domain 이름은 서버에만 설정하면 된다.
	* server : VLAN을 선언/삭제/수정할 수 있다.    
	`Switch(config)#vtp mode server`   
	`Switch(config)#vtp domain foo`   
	`Switch(config)#vlan 10`   
	`Switch(config-vlan)#vlan 20`   
	* transparent : VLAN을 선언/삭제/수정할 수 있다. 전달받은 설정은 통과시킨다.   
	`Switch(config)#vtp mode transparent`   
	* client : 트렁크를 통해 전달받은 VLAN 정보를 자신에게 적용(sync)한다.    
	`Switch(config)#vtp mode client`   

### L3 Switch
* 라우터와 스위치의 역할을 모두 수행하는 네트워크 장비
* IP 주소를 설정할 수 있다.   
	`Switch(config)#interface vlan 10`  
	`Switch(config-if)#no shutdown`   
	`Switch(config-if)#ip address 11.1.1.254 255.255.255.0`   
* 디폴트 게이트웨이를 설정해야 **다른 VLAN의 호스트들과 통신**할 수 있다.   
	`Switch(config-if)#ip default-gateway 11.1.1.1`
* 라우터로서의 설정   
	`Switch(config)#interface fastethernet 0/1`   
	`Switch(config-if)#no switchport`   
	`Switch(config-if)#ip address 10.1.1.1 255.255.255.0`   
	`Switch(config-if)#exit`   
	`Switch(config)#ip routing`   
	`Switch(config)#router eigrp 100`   
	`Switch(config)#network 10.0.0.0`   
* 스위치로서의 설정(VLAN) : SVI 설정     
	`Switch(config)#vlan 10`    
	`Switch(config-vlan)#vlan 20`    
* 스위치로서의 설정(트렁크 포트)   
	`Switch(config)#interface fastethernet 0/2`   
	`Switch(config-if)#switchport`  
	`Switch(config-if)#switchport trunk encapsulation dot1q`  
	`Switch(config-if)#switchport mode trunk`   
* 스위치로서의 설정(액세스 링크)   
	`Switch(config)#interface fastethernet 0/1`   
	`Switch(config-if)#switchport`  
	`Switch(config-if)#switchport mode access`   
	`Switch(config-if)#switchport access vlan 10`   

<hr>

## STP

* Spanning Tree Protocol
* 스위치를 이중화 하는 과정에서 형성된 loop에 의해 broadcast storm이 발생하는데 이를 해결한다.
	* 브로드캐스팅된 프레임이 매우 빠르게 순환하여 네트워크가 다운된다.
* STP는 BPDU 프레임을 교환하여 브로드캐스트 순환을 막는다.

### BPDU

* Bridge Protocol Data Unit
* 아래의 인자들을 비교하여 포트를 블로킹한다. BPDU에 포함된 값이다.
	* 루트 스위치 ID
	* path cost
	* BPDU가 방금 통화한 스위치 ID
	* BPDU가 방금 통과한 스위치의 포트 ID 

### 동작 방식

1. root switch 결정 : switch id가 가장 낮은 스위치
2. 나머지 스위치들의 root port 결정 : root switch까지 **best route**로 연결된 포트
	* path cost
	* BPDU가 방금 통과한 스위치 ID
	* BPDU가 방금 통과한 스위치의 포트 ID

## references
* [단기 완성 합격 보장 CCNA R&S의 정석](https://www.cyber.co.kr/book/item/5659)
* [\[CSICO\] What Is a LAN?](https://www.cisco.com/c/en/us/products/switches/what-is-a-lan-local-area-network.html)
