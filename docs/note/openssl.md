---
layout: default
title: \[OpenSSL\] 개념과 사용 방법
parent: Note
utteranc: true
#grand_parent: 
#nav_order: 
date: 2024-11-13 21:18 +0900
#last_modified_at: 2024-01-01 00:00 +0900
#permalink: /docs/ps/XXX/XXXX
hit_count: true
# 전부 소문자. 단, 줄임말은 대문자
categories:
  - Note
tags:
  - OpenSSL
---

# \[OpenSSL\] 개념과 사용 방법
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

## Network Layer

* 네트워크 통신을 추상화 한 두 가지 모델
* TCP(Transmission Control Protocol)
    * reliable(no loss, in-order, no delay) 통신이 목적이다
    * 목표(reliable transfer)를 달성하기 위해 error checking, recovery 매커니즘이 포함되어 있다
    * flow control(host-scope optimization), congestion flow(network-scope optimization) 포함
    * header size 20-60 bytes
* IP(Internet Protocol)
    * 네트워크 상에서의 주소와 경로 결정(routing) 기능을 제공한다
    * connection, reliability에는 관심이 없고 오직 지정된 경로로 데이터를 빠르게 전달하는데만 집중한다
    * header size 20 bytes

<img src="/assets/images/note/20241113-tcpip-model.png" alt="network model" />

## TLS(Transportation Layer Security)

* Transportation(전송) 계층 보안에 대한 표준
* TLS는 SSL(Secure Sockets Layer)을 발전시킨 것이다. SSL과 TLS를 혼용하는 경우도 많다
* TCP 게층에 대한 security 기능 제공
* TCP로 통신하는 클라이언트와 서버에 대한 인증 및 데이터 암호화 수행
    * 인증(authentication) - 상대방이 시스템에 접근해도 되는(자격이 있는) 사람인지 확인하는 절차 (신분증 검사)
* HTTPS, HTTP, FTP, POP, IMAP 통신을 보호할 수 있다
* OpenSSL - TLS의 구현체로 가장 널리 사용된다. 보안 관련 소프트웨어에 사용된다

## SSL/TLS의 주요 기능

* 인증
* 메세지 무결성
* 메세지 압축
* 암호화용 세션 키 생성
* 암호화된 채널 제공

## OpenSSL 설치

* TLS 기능을 제공하는 Open Source toolkit
* 단독으로 사용 가능한 암호화 라이브러리도 포함하고 있다

### 빌드

* OpenSSL 소스코드 다운

<div class="cli">git clone git://git.openssl.org/openssl.git</div>

* dependencies 설치

<div class="cli">sudo apt install -y perl libtext-template-perl && sudo cpan -i
Text::Template</div>

* 빌드&설치 (Unix 계열 OS 기준)

<div class="cli">./Configure && make && make test && make install</div>

* `/usr/local/lib`, `/usr/local/bin`, `/usr/local/include`에 OpenSSL이 설치된다

### 라이브러리 링크

* `-L` - 링크하려는 라이브러가 system default 경로에 있지 않은 경우 해당 라이브러리 경로를 알려준다


<div class="cli">
gcc main.c -o main -L/whatever/path -lssl -lcrypto
</div>

<hr>

## references
* [\[CLOUDFLARE\]What is Transport Layer Security?](https://www.cloudflare.com/ko-kr/learning/ssl/transport-layer-security-tls/)
* [정보통신기술용어해설](http://www.ktword.co.kr/test/view/view.php?nav=2&no=1957&sh=ssl)
* [TTA정보통신용어사전](https://terms.tta.or.kr/dictionary/dictionaryView.do?word_seq=055059-3)
* [openssl/INSTALL.md](https://github.com/openssl/openssl/blob/master/INSTALL.md#prerequisites)
* [openssl/demos](https://github.com/openssl/openssl/tree/master/demos)
