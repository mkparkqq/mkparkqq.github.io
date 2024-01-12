---
layout: minimal
title: OSI 7-Layer
date: 2024-01-12 15:26 +0900
# last_modified_at: 2024-01-01 00:00 +0900
parent: Note
# permalink: /docs/note/XXX/XXXX
hit_count: false
categories:
  - Note
---

# OSI 7-Layer
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

## OSI(Open Systems Interconnection) model

* [국제 표준화기구(ISO)](https://www.iso.org/home.html)에서 만든 논리적인 모델
* 다양한 통신 기기들이 일관된 방식으로 정보를 주고 받을 수 있도록 만들어졌다.
* 서로 다른 기기들이 정보를 주고 받는 과정을 7개의 계층으로 설명한다.

<img src="/assets/images/note/osi-7-layer-table.png" width="70%" alt="osi-7-layer table" />

* 현대 [인터넷](/docs/note/internet.html)은 osi-7 layer를 엄격하게 준수하지 않지만 네트워크 관련 문제를 해결하는데 필요한 개념을 제공하기 때문에 중요하다.

<hr>

## 1. The Physical layer

* 정보를 어떻게 물리적 신호로 전달할 것인가?
* [Ethernet (IEEE 802.3)](/docs/note/ethernet.html) - 유선으로 신호를 전달하는 방법
* [WiFi (IEEE 802.11)](/docs/note/wifi.html) - 무선으로 신호를 전달하는 방법
* 네트워크 장비 - ethernet cable, wifi AP, hub, NIC(Network Interface Card)

<hr>

## 2. The Data link layer

* 하나의 네트워크 안에서 sender에서 receiver로 정보를 어떻게 전달할 것인가?
* [MAC 주소](/docs/note/mac-address.html)를 통해 sender와 receiver를 식별한다.
* 전송 단위 - frame
* packet(3계층 전송 단위)을 여러 개의 frame으로 나눈다.
* 네트워크 장비 - bridge, switch

<hr>

## 3. The Network layer

* 네트워크A에서 네트워크B까지는 어떻게 정보를 전달해야 하는가?
    * 동일한 네트워크의 두 기기 사이의 통신에는 필요 없다.
* sender device (송신 측) - segment를 여러 개의 packet으로 나눈다.
* receiving device (수신 측) - packet을 재조합한다.
* [routing](/docs/note/routing.html) 기능을 수행한다.
* [IP 주소](/docs/note/ip-address.html)를 통해 sender와 receiver를 식별한다.
* 네트워크 장비 - router, multilayer switch

<hr>

## 4. The Transport layer

* 프로세스A에서 프로세스B로 데이터를 어떻게 전달할 것인가?
* port number를 통해 sender와 receiver를 식별한다.
* [TCP (Transmission Control Protocol)](/docs/note/tcp.html) - no loss, no delay, in-order 전송을 지향한다.
* [UDP (User Datagram Protocol)](/docs/note/udp.html)

<hr>

## 정보가 전송되는 과정

* 각 네트워크 장비에서 1계층 ~ 7계층 정보(header)를 해석하고 전달하는 과정이 반복된다.
* 기능을 수행하기 위해 필요한 정보(header)가 다르다.
    * router - 1계층 ~ 3계층의 정보 필요
    * switch - 1계층 ~ 2계층의 정보 필요

<img src="/assets/images/note/data-flow-diagram.jpeg" alt="data flow diagram" width="80%" />

<hr>

## references

* [Computer Networking : A Top-Down Approach](https://gaia.cs.umass.edu/kurose_ross/online_lectures.htm)
* [CLOUDFLARE](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/)
<hr>

