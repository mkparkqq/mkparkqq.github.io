---
layout: minimal
title: Raspberry Pi kernel cross-compile
date: 2024-05-12 16:55 +0900
# last_modified_at: 2024-01-01 00:00 +0900
parent: kernel
# permalink: /docs/note/XXX/XXXX
hit_count: false
categories:
  - kernel
  - open source
---

# 라즈베리 파이 커널 크로스 컴파일 및 설치
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

원격 PC에서 raspberrypi linux kernel 4.19를 빌드하고 Raspberry Pi Model 3B+에 설치하는 과정.


* [Raspberry Pi 3 Model B+의 cpu는 ARMv8 64bit 프로세서](https://www.raspberrypi.com/products/raspberry-pi-3-model-b-plus/)이다.
* ARMv8-A 아키텍처(cpu)는 arm(32bit)와 arm64 커널을 모두 지원한다.

<hr>

## clone

<div class="cli">
$ git clone --depth=1 -b rpi-4.19.y https://github.com/raspberrypi/linux
</div>

<hr>

## dependency, toolchain 설치

<div class="cli">
$ sudo apt install bc bison flex libssl-dev make libc6-dev libncurses5-dev
</div>

<hr>

## build

아래와 같이 빌드 스크립트 `build-kernel.sh` 작성. 

### x86_64 Linux

크로스 컴파일러 설치

<div class="cli">
$ sudo apt install gcc-aarch64-linux-gnu
</div>

빌드 스크립트를 `linux` 디렉토리와 같은 위치에 생성

```bash
#!/bin/bash

function G {
	echo -e "\033[32m$1\033[0m"
}

G "Configure build output path"
KERNEL_TOP_PATH="$(cd "$(dirname "$0")"; pwd -P)"
OUTPUT="$KERNEL_TOP_PATH/out"
G "$OUTPUT"

BUILD_LOG="$KERNEL_TOP_PATH/rpi_build_log.txt"

G "Move to kernel source"
cd linux

G "Clean build"
make mrproper

G "Make defconfig"
make ARCH=arm64 CROSS_COMPILE=aarch64-linux-gnu- \
	O=$OUTPUT bcm2711_defconfig

G "Build kernel"
make ARCH=arm64 CROSS_COMPILE=aarch64-linux-gnu- \
	O=$OUTPUT Image modules dtbs -j4 2>&1 | tee $BUILD_LOG

```

core i5 10세대 ram 16G 환경에서 15분정도 걸렸다.

### arm64 macOS

가상환경 (Docker)에서 진행.

빌드 스크립트를 `linux` 디렉토리와 같은 위치에 생성


<hr>

## 모듈 설치

아래의 스크립트를 실행하여 커널 모듈을 `MOD_PATH` 에 설치

```bash

#!/bin/bash

function G {
	echo -e "\033[32m$1\033[0m"
}

KERNEL=kernel8
KERNEL_TOP_PATH="$(cd "$(dirname "$0")"; pwd -P)"
MOD_PATH="$KERNEL_TOP_PATH/modules"
OUTPUT="$KERNEL_TOP_PATH/out"

echo -n "Configure kernel module install path : "
G $MOD_PATH

cd linux

echo -e "\nInstall the kernel modules" 
make -j$(nproc) ARCH=arm64 CROSS_COMPILE=aarch64-linux-gnu- \
	O=$OUTPUT \
	INSTALL_MOD_PATH=$MOD_PATH \
	modules_install

MOD_FILE="$(ls $MOD_PATH/lib/modules)"

echo -en "\nExtract "
G "$MOD_FILE"

mv $MOD_PATH/lib/modules/$MOD_FILE $KERNEL_TOP_PATH
rm -rf $MOD_PATH

```

<hr>

## 커널을 tar.gz 파일로 압축한 뒤 전송

1\. 커널 압축

`linux` 디렉토리와 같은 위치에 아래와 같은 `zip_kernel.sh` 파일 생성

```
#!/bin/bash

function G {
	echo -e "\033[32m$1\033[0m"
}

KERNEL_TOP_PATH="$(cd "$(dirname "$0")"; pwd -P)"
OUTPUT="$KERNEL_TOP_PATH/out"
TAR_FILE=rpi-kernel.tar.gz
KERNEL_ARCH=arm64

# kernel module
# .dtb files
# overlays/*.dtb*
# Image

KERNEL_MODULE_DIR="4.19.127-v8+"
TMP_OVERLAY_DIR=overlays
TMP_DTB_DIR=dtbs
TMP_IMAGE=kernel8.img
mkdir $TMP_OVERLAY_DIR
mkdir $TMP_DTB_DIR

cp $OUTPUT/arch/$KERNEL_ARCH/boot/dts/overlays/*.dtb* $TMP_OVERLAY_DIR
cp $OUTPUT/arch/$KERNEL_ARCH/boot/dts/broadcom/*.dtb $TMP_DTB_DIR
cp $OUTPUT/arch/$KERNEL_ARCH/boot/Image $TMP_IMAGE

tar -czvf $TAR_FILE $KERNEL_MODULE_DIR \
	$TMP_DTB_DIR \
	$TMP_OVERLAY_DIR \
	$TMP_IMAGE

rm -rf $TMP_OVERLAY_DIR
rm -rf $TMP_DTB_DIR
rm -rf $TMP_IMAGE
```

2\. raspberrypi로 tar.gz 파일 전송

<pre class="cli">
$ scp -P [port number] rpi-kernel.tar.gz root@[raspberrypi ip address]:/root/kernel
</pre>

<hr>

## 라즈베리 파이에 커널 설치 & 재부팅

라즈비안의 경우 `/lib/modules`과 `/boot/firmware` 아래의 몇몇 파일을 대체하기만 하면 된다.

* `/lib/modules`
* `/boot/firmware/*.dtb`
* `/boot/firmware/overlays`
* `/boot/firmware/kernel8.img`

라즈베리 파이에 ssh 접속한 뒤 아래의 과정 진행

1\. 압축 해제

<div class="cli">
$ cd /root/kernel
$ tar -xvzf rpi-kernel.tar.gz -C ./
</div>

2\. `install-rpi-kernel.sh` 실행

```bash
#!/bin/bash

function G {
	echo -e "\033[32m$1\033[0m"
}

G "\nUpdate kernel modules"
cp -r ./4.19.127-v8+/ /lib/modules

G "\nUpdate dtb files"
cp ./dtbs/* /boot/firmware

G "\nUPdate overlays directory"
cp -r ./overlays/ /boot/firmware

cp ./kernel8.img /boot/firmware

```

<hr>

## 커널 업데이트 확인

라즈베리 파이에서 `uname -a` 명령어 실행

<img src="/assets/images/kernel/uname-a.png" alt="uname-a">

커널 버전이 6.6.20+prt-rpi-v8에서 4.19.127-v8+로 바뀌었다.

<hr>

## 뭔가 잘못 건드렸을 때

1\. [공식 홈페이지](https://www.raspberrypi.com/software/)에서 Raspberry Pi Imager를 설치한 뒤 부팅 sd 카드를 만들고 다시 라즈베리 파이를 초기화한다.

2\. root 사용자 비밀번호 설정

<div class="cli">
$ chpasswd
root:[비밀번호]
ctrl-d
</div>

3\. ssh 접속 허용 -> root 로그인 허용    

<div class="cli">
$ echo "PermitRootLogin yes" >> /etc/ssh/sshd_config
</div>


<hr>

## 자주 사용하는 명령어

### 시스템 정보 확인
<pre class="cli">
$ uname -a    
Linux raspberrypi 6.6.20+rpt-rpi-v8 #1 SMP PREEMPT Debian 1:6.6.20-1+rpt1 (2024-03-07) aarch64 GNU/Linux
</pre>


### 장치 파일 확인
<pre class="cli">
$ ls /dev
autofs           i2c-2         null    stderr  tty28  tty50      vcio         vhci
block            initctl       port    stdin   tty29  tty51      vc-mem       vhost-net
btrfs-control    input         ppp     stdout  tty3   tty52      vcs          vhost-vsock
bus              kmsg          ptmx    tty     tty30  tty53      vcs1         video10
cachefiles       kvm           pts     tty0    tty31  tty54      vcs2         video11
cec0             log           ram0    tty1    tty32  tty55      vcs3         video12
char             loop0         ram1    tty10   tty33  tty56      vcs4         video13
console          loop1         ram10   tty11   tty34  tty57      vcs5         video14
cpu_dma_latency  loop2         ram11   tty12   tty35  tty58      vcs6         video15
cuse             loop3         ram12   tty13   tty36  tty59      vcsa         video16
disk             loop4         ram13   tty14   tty37  tty6       vcsa1        video18
dma_heap         loop5         ram14   tty15   tty38  tty60      vcsa2        video20
dri              loop6         ram15   tty16   tty39  tty61      vcsa3        video21
fb0              loop7         ram2    tty17   tty4   tty62      vcsa4        video22
fd               loop-control  ram3    tty18   tty40  tty63      vcsa5        video23
full             mapper        ram4    tty19   tty41  tty7       vcsa6        video31
fuse             media0        ram5    tty2    tty42  tty8       vcsm-cma     watchdog
gpiochip0        media1        ram6    tty20   tty43  tty9       vcsu         watchdog0
gpiochip1        media2        ram7    tty21   tty44  ttyprintk  vcsu1        zero
gpiomem          mem           ram8    tty22   tty45  uhid       vcsu2
hidraw0          mmcblk0       ram9    tty23   tty46  uinput     vcsu3
hidraw1          mmcblk0p1     random  tty24   tty47  urandom    vcsu4
hidraw2          mmcblk0p2     rfkill  tty25   tty48  usb        vcsu5
hidraw3          mqueue        shm     tty26   tty49  v4l        vcsu6
hwrng            net           snd     tty27   tty5   vchiq      vga_arbiter
</pre>


### 블럭 장치 확인
<pre class="cli">
$ lsblk
NAME        MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
mmcblk0     179:0    0 14.8G  0 disk
├─mmcblk0p1 179:1    0  512M  0 part /boot/firmware
└─mmcblk0p2 179:2    0 14.3G  0 part /
</pre>

* disk는 물리적인 저장 장치, part는 논리적인 파티션을 의미한다.
* mmcblk0 - sd카드
* mmcblk0p1 - mmcblk0의 부팅 파티션. `/boot/firmware`에 마운트되어 있다.
* mmcblk0p2 - mmcblk0의 루트 파티션. `/`에 마운트되어 있다.

<hr>

## references
* [디버깅을 통해 배우는 리눅스 커널의 구조와 원리](https://m.yes24.com/Goods/Detail/102079803)
* [Raspberry Pi Documentation](https://www.raspberrypi.com/documentation/computers/linux_kernel.html)
* [digtvbg.com](https://digtvbg.com/blog/raspberry-pi-firmware-update/)
