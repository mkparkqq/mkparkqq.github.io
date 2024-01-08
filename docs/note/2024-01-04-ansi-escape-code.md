---
layout: default
title: ANSI escape code
date: 2024-01-16 15:47 +0900
# last_modified_at: 2024-01-01 00:00 +0900
parent: Note
# permalink: /docs/note/XXX/XXXX
hit_count: false
categories:
  - Note
---

# ANSI escape code
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

문자열 내에서 특별한 명령을 사용하여 터미널에 출력되는 텍스트의 모양과 위치를 제어하는 표준.

전송할 데이터(음성, 텍스트, 영상 등) 내부에 제어 정보를 같이 전송하는 것(in-band signaling)이 특징이다.

ANSI Escape sequence를 활용하면 문자열로 터미널의 커서 위치, 텍스트 색 등을 제어할 수 있다.

Windows는 Windows10 version1511부터 ansi escape sequence를 지원한다.

<hr>

## ANSI Escape Sequences

터미널에서 텍스트의 위치, 색 등을 제어하는 문자열이다. 대부분의 sequence들은 `\033[`로 시작한다.

* [색 변경](#font-style)
* [커서 위치 이동](#cursor-controls)
* [화면 지우기](#erase-functions)
* [터미널 크기, 제목 변경](#screen-modes)

<hr>

### Graphic modes

색을 변경한 뒤 `Reset Sequence`를 출력하지 않으면 프로그램이 종료되어도 변경사항이 유지된다.

| ESC Code Sequence | Reset Sequence | Description                                                |
| :---------------- | :------------- | :--------------------------------------------------------- |
| `ESC[1;34;{...}m` |                | Set graphics modes for cell, separated by semicolon (`;`). |
| `ESC[0m`          |                | reset all modes (styles and colors)                        |
| `ESC[1m`          | `ESC[22m`      | set bold mode.                                             |
| `ESC[2m`          | `ESC[22m`      | set dim/faint mode.                                        |
| `ESC[3m`          | `ESC[23m`      | set italic mode.                                           |
| `ESC[4m`          | `ESC[24m`      | set underline mode.                                        |
| `ESC[5m`          | `ESC[25m`      | set blinking mode                                          |
| `ESC[7m`          | `ESC[27m`      | set inverse/reverse mode                                   |
| `ESC[8m`          | `ESC[28m`      | set hidden/invisible mode                                  |
| `ESC[9m`          | `ESC[29m`      | set strikethrough mode.                                    |

`\033[<Color Code>` 를 문자열에 삽입하여 문자열의 색을 설정할 수 있다.

| Color Name | Foreground Color Code | Background Color Code |
| :--------- | :-------------------- | :-------------------- |
| Black      | `30`                  | `40`                  |
| Red        | `31`                  | `41`                  |
| Green      | `32`                  | `42`                  |
| Yellow     | `33`                  | `43`                  |
| Blue       | `34`                  | `44`                  |
| Magenta    | `35`                  | `45`                  |
| Cyan       | `36`                  | `46`                  |
| White      | `37`                  | `47`                  |
| Default    | `39`                  | `49`                  |
| Reset      | `0`                   | `0`                   |

| ESC Code Sequence       | Description                  |
| :---------------------- | :--------------------------- |
| `ESC[38;2;{r};{g};{b}m` | Set foreground color as RGB. |
| `ESC[48;2;{r};{g};{b}m` | Set background color as RGB. |

example code

```c
#include <stdio.h>

int main() {
    const char* octal_red = "\033[31m";         // 이후 출력되는 텍스트를 모두 빨간색으로 지정
    const char* octal_green = "\033[32m";       // 이후 출력되는 텍스트를 모두 초록색으로 지정
    const char* unicode_yellow = "\x1b[33m";
    const char* unicode_blue = "\x1b[34m";
    fputs(octal_red, stdout);
    fputs("Hello world\n", stdout);
    fputs("Hello world\n", stdout);
    fputs(octal_green, stdout);
    fputs("Hello world\n", stdout);
    fputs(unicode_yellow, stdout);
    fputs("Hello world\n", stdout);
    return 0;
}

```

<img src="/assets/images/note/ansi-color-code-result.png" alt="example result" width="70%" />

<hr>

### Screen modes

| ESC Code Sequence | Description                                                                                                                                                           |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ESC[={value}h`   | Changes the screen width or type to the mode specified by value.                                                                                                      |
| `ESC[=0h`         | 40 x 25 monochrome (text)                                                                                                                                             |
| `ESC[=1h`         | 40 x 25 color (text)                                                                                                                                                  |
| `ESC[=2h`         | 80 x 25 monochrome (text)                                                                                                                                             |
| `ESC[=3h`         | 80 x 25 color (text)                                                                                                                                                  |
| `ESC[=4h`         | 320 x 200 4-color (graphics)                                                                                                                                          |
| `ESC[=5h`         | 320 x 200 monochrome (graphics)                                                                                                                                       |
| `ESC[=6h`         | 640 x 200 monochrome (graphics)                                                                                                                                       |
| `ESC[=7h`         | Enables line wrapping                                                                                                                                                 |
| `ESC[=13h`        | 320 x 200 color (graphics)                                                                                                                                            |
| `ESC[=14h`        | 640 x 200 color (16-color graphics)                                                                                                                                   |
| `ESC[=15h`        | 640 x 350 monochrome (2-color graphics)                                                                                                                               |
| `ESC[=16h`        | 640 x 350 color (16-color graphics)                                                                                                                                   |
| `ESC[=17h`        | 640 x 480 monochrome (2-color graphics)                                                                                                                               |
| `ESC[=18h`        | 640 x 480 color (16-color graphics)                                                                                                                                   |
| `ESC[=19h`        | 320 x 200 color (256-color graphics)                                                                                                                                  |
| `ESC[={value}l`   | Resets the mode by using the same values that Set Mode uses, except for 7, which disables line wrapping. The last character in this escape sequence is a lowercase L. |


| ESC Code Sequence | Description                     |
| :---------------- | :------------------------------ |
| `ESC[?25l`        | make cursor invisible           |
| `ESC[?25h`        | make cursor visible             |
| `ESC[?47l`        | restore screen                  |
| `ESC[?47h`        | save screen                     |
| `ESC[?1049h`      | enables the alternative buffer  |
| `ESC[?1049l`      | disables the alternative buffer |

### Erase functions

| ESC Code Sequence | Description                               |
| :---------------- | :---------------------------------------- |
| `ESC[J`           | erase in display (same as ESC\[0J)        |
| `ESC[0J`          | erase from cursor until end of screen     |
| `ESC[1J`          | erase from cursor to beginning of screen  |
| `ESC[2J`          | erase entire screen                       |
| `ESC[3J`          | erase saved lines                         |
| `ESC[K`           | erase in line (same as ESC\[0K)           |
| `ESC[0K`          | erase from cursor to end of line          |
| `ESC[1K`          | erase start of line to the cursor         |
| `ESC[2K`          | erase the entire line                     |

### Cursor controls

| ESC Code Sequence                                  | Description                                              |
| :------------------------------------------------- | :------------------------------------------------------- |
| `ESC[H`                                            | moves cursor to home position (0, 0)                     |
| `ESC[{line};{column}H` <br> `ESC[{line};{column}f` | moves cursor to line #, column #                         |
| `ESC[#A`                                           | moves cursor up # lines                                  |
| `ESC[#B`                                           | moves cursor down # lines                                |
| `ESC[#C`                                           | moves cursor right # columns                             |
| `ESC[#D`                                           | moves cursor left # columns                              |
| `ESC[#E`                                           | moves cursor to beginning of next line, # lines down     |
| `ESC[#F`                                           | moves cursor to beginning of previous line, # lines up   |
| `ESC[#G`                                           | moves cursor to column #                                 |
| `ESC[6n`                                           | request cursor position (reports as `ESC[#;#R`)          |
| `ESC M`                                            | moves cursor one line up, scrolling if needed            |
| `ESC 7`                                            | save cursor position (DEC)                               |
| `ESC 8`                                            | restores the cursor to the last saved position (DEC)     |
| `ESC[s`                                            | save cursor position (SCO)                               |
| `ESC[u`                                            | restores the cursor to the last saved position (SCO)     |

## references
* [Wikipedia](https://en.wikipedia.org/wiki/ANSI_escape_code)
* [fnky/ANSI-Escape Sequences](https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797#ansi-escape-sequences)
