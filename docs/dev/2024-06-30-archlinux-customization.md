---
layout: default
title: archlinuxch customization
parent: dev
utteranc: true
# grand_parent: 
# nav_order: 
date: 2024-06-30 10:06 +0900
# last_modified_at: 2024-01-01 00:00 +0900
# permalink: /docs/ps/XXX/XXXX
# hit_count: false
categories:
- dev 
tags:
- archlinux
---

# archlinux customization
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

## packages

* openbox
* tint2
* obconf
* feh
* nemo
* gedit
* lxterminal
* lightdm - GUI 환경으로 로그인
* lightdm-gtk-greeter - 부팅시 사용자 로그인 화면 제공
* yad
* screen
* mate-polkit
* rofi
* arandr
* nano
* firefox
* gimp
* lxappearance
* htop - 메모리, CPU 모니터링
* neofetch
* engrampa
* netctl - WiFi 연결

## openbox

`~/.config/openbox/autostart`

```bash
/home/mkpark/.screenlayout/screen.sh &
tint2 & 
volumeicon &
feh --bg-fill /home/mkpark/Downloads/wallpaper03.svg &
/usr/lib/mate-polkit/polkit-mate-authentication-agent-1 &
/home/mkpark/.config/polybar/launch.sh &
```

## tint2

`~/.config/tint2/tint2rc`

```bash
# Gradients
#-------------------------------------
# Backgrounds
# Background 1: Panel
rounded = 0
border_width = 0
border_sides = TBLR
border_content_tint_weight = 0
background_content_tint_weight = 0
background_color = #000000 60
border_color = #61c2ff 16
background_color_hover = #000000 60
border_color_hover = #61c2ff 16
background_color_pressed = #000000 60
border_color_pressed = #61c2ff 16

# Background 2: Active task, Urgent task
rounded = 0
border_width = 0
border_sides = TBLR
border_content_tint_weight = 0
background_content_tint_weight = 0
background_color = #ffffff 90
border_color = #ffffff 90
background_color_hover = #ffffff 90
border_color_hover = #61c2ff 48
background_color_pressed = #ffffff 70
border_color_pressed = #61c2ff 48

# Background 3: Default task, Iconified task
rounded = 0
border_width = 0
border_sides = TBLR
border_content_tint_weight = 0
background_content_tint_weight = 0
background_color = #ffffff 40
border_color = #61c2ff 68
background_color_hover = #61c2ff 16
border_color_hover = #61c2ff 68
background_color_pressed = #61c2ff 16
border_color_pressed = #61c2ff 68

#-------------------------------------
# Panel
panel_items = T
panel_size = 100% 40
panel_margin = 0 0
panel_padding = 0 0 0
panel_background_id = 1
wm_menu = 0
panel_dock = 0
panel_pivot_struts = 0
panel_position = bottom center horizontal
panel_layer = top
panel_monitor = all
panel_shrink = 0
autohide = 1
autohide_show_timeout = 0.3
autohide_hide_timeout = 0.3
autohide_height = 2
strut_policy = follow_size
panel_window_name = tint2
disable_transparency = 0
mouse_effects = 0
font_shadow = 0
mouse_hover_icon_asb = 100 0 10
mouse_pressed_icon_asb = 100 0 0
scale_relative_to_dpi = 0
scale_relative_to_screen_height = 0

#-------------------------------------
# Taskbar
taskbar_mode = single_desktop
taskbar_hide_if_empty = 1
taskbar_padding = 0 3 2
taskbar_background_id = 0
taskbar_active_background_id = 0
taskbar_name = 0
taskbar_hide_inactive_tasks = 0
taskbar_hide_different_monitor = 0
taskbar_hide_different_desktop = 0
taskbar_always_show_all_desktop_tasks = 0
taskbar_name_padding = 0 0
taskbar_name_background_id = 0
taskbar_name_active_background_id = 0
taskbar_name_font = Cantarell Bold 18
taskbar_name_font_color = #000000 100
taskbar_name_active_font_color = #000000 100
taskbar_distribute_size = 0
taskbar_sort_order = none
task_align = left

#-------------------------------------
# Task
task_text = 1
task_icon = 0
task_centered = 1
urgent_nb_of_blink = 8
task_maximum_size = 140 35
task_padding = 6 2 6
task_font = sans 16
task_tooltip = 0
task_thumbnail = 0
task_thumbnail_size = 210
task_font_color = #000000 80
task_iconified_font_color = #000000 80
task_background_id = 3
task_active_background_id = 2
task_urgent_background_id = 2
task_iconified_background_id = 3
mouse_left = toggle_iconify
mouse_middle = none
mouse_right = none
mouse_scroll_up = none
mouse_scroll_down = none

#-------------------------------------
# System tray (notification area)
systray_padding = 0 0 0
systray_background_id = 0
systray_sort = ascending
systray_icon_size = 0
systray_icon_asb = 100 0 0
systray_monitor = primary
systray_name_filter = 

```

## polybar

`~/.config/polybar/config.ini`

```bash
[colors]
background = #000000
ackground-alt = #373B41
foreground = #C5C8C6
primary = #FFFFFF
secondary = #8ABEB7
alert = #A54242
disabled = #707880

[bar/mybar]
width = 100%
height = 24pt
radius = 0
background = ${colors.background}
foreground = ${colors.foreground}

line-size = 3pt

border-size = 2pt
border-color = #FFFFFF

padding-left = 0
padding-right = 1

module-margin = 1

separator = |
separator-foreground = ${colors.disabled}

font-0 = monospace;5

modules-left = xworkspaces
modules-right = pulseaudio cpu-temp wlan eth battery date

cursor-click = pointer
cursor-scroll = ns-resize

enable-ipc = true

[module/cpu-temp]
type = custom/script
format-prefix = "CPU "
format-prefix-foreground = ${colors.primary}
exec = /home/mkpark/.config/custom-scripts/cpu-temp.sh
interval = 1

[module/systray]
type = internal/tray

format-margin = 8pt
tray-spacing = 16pt

[module/xworkspaces]
type = internal/xworkspaces

label-active = %name%
label-active-background = ${colors.background-alt}
label-active-underline= ${colors.primary}
label-active-padding = 1

label-occupied = %name%
label-occupied-padding = 1

label-urgent = %name%
label-urgent-background = ${colors.alert}
label-urgent-padding = 1

label-empty = %name%
label-empty-foreground = ${colors.disabled}
label-empty-padding = 1

[module/pulseaudio]
type = internal/pulseaudio

format-volume-prefix = "VOL "
format-volume-prefix-foreground = ${colors.primary}
format-volume = <label-volume>

label-volume = %percentage%%

label-muted = muted
label-muted-foreground = ${colors.disabled}

[network-base]
type = internal/network
interval = 5
format-connected = <label-connected>
format-disconnected = <label-disconnected>
label-disconnected = %{F#FFFFFF}%ifname%%{F#707880} disconnected

[module/wlan]
inherit = network-base
interface-type = wireless
label-connected = %{F#FFFFFF}WiFi%{F-} %essid%
label-disconnected = %{F#FFFFFF}WiFi%{F#707880} disconnected%{F-}
;label-connected = %{F#F0C674}%ifname%%{F-} %essid% %local_ip%

[module/eth]
inherit = network-base
interface-type = wired
label-connected = %{F#FFFFFF}eth%{F-}
label-disconnected = %{F#FFFFFF}eth%{F#707880} disconnected%{F-}
;label-connected = %{F#F0C674}%ifname%%{F-} %local_ip%

[module/date]
type = internal/date
interval = 1
date = %H:%M
date-alt = %Y-%m-%d %H:%M:%S
label = %date%
label-foreground = ${colors.primary}

[module/battery]
format-prefix = "POWER "
format-prefix-foreground = ${colors.primary}
type = internal/battery
full-at = 100
low-at = 30
battery = BAT0
adapter = AC
poll-interval = 5

[settings]
screenchange-reload = true
pseudo-transparency = true
```

`~/.config/polybar/launch.sh`

```bash
#!/bin/bash

# Terminate already running bar instances
killall -q polybar
# If all your bars have ipc enabled, you can also use
# polybar-msg cmd quit

# Launch Polybar, using default config location ~/.config/polybar/config.ini
polybar mybar 2>&1 | tee -a /tmp/polybar.log & disown

echo "Polybar launched..."
```

## 폰트 관리

1. 다운받은 `ttf` 파일을 `/usr/share/fonts/TTF` 디렉토리에 복사
2. 터미널에서 `$ fc-list` 명령어로 사용 가능한 폰트 확인

<hr>

## references
* [Arch Linux Full Desktop Set Up](https://www.youtube.com/watch?v=zPFv2nQPSho&t=1107s)
* [All modules that are available for polybar](https://arcolinux.com/all-modules-that-are-available-for-polybar-any-desktop/)
* [polybar/Wiki/Fonts](https://github.com/polybar/polybar/wiki/Fonts)
