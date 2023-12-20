---
layout: minimal
title: Tower of Hanoi
permalink: /minigames/hanoi-tower-simulator
footer: false
date: 2023-12-20 23:00 +0900
---

# 하노이 탑

<script defer src="./hanoi-tower-simulator/main.js"></script>
<script defer src="./hanoi-tower-simulator/simulator.js"></script>
<script defer src="./hanoi-tower-simulator/control.js"></script>
<link rel="stylesheet" href="./hanoi-tower-simulator/styles.css">

<main id="hanoi-tower-simulator">
    <div id="game-board-top" >
        <div id="io-area">
            <div id="intger-input">
                <label for="integerInput">원판 개수</label>
                <input type="input" id="integerInput" name="integerInput" min="1" required placeholder="N ≤ 15" maxlength="2" >
                <button onclick="readNumberOfDisc()">정답 보기</button>
            </div>
            <div id="move-count" class="after-start"></div>
        </div>
        <canvas id="tower-canvas">
        </canvas>
    </div>
    <aside class="after-start" id="right">
        <div id="control-buttons">
            <!--
            <button class="control-button" id="fast-backward" onclick="fastBackward()">◀︎◀︎ </button>
            <button class="control-button" id="previous" onclick="prevStep()">◀︎ </button>
            -->
            <button class="control-button" id="reset" onclick="reset()">↻ </button>
            <button class="control-button" id="next" onclick="nextStep()">▶︎Ⅰ </button>
            <button class="control-button" id="fast-forward" onclick="fastForward()">▶︎▶︎ </button>
            <button class="control-button" id="accelerate" onclick="accelerate()">⇧ </button>
        </div>
        <div id="progress-status">
            <div class="progress" id="progress-title">이동</div>
            <div class="progress" id="progress-number"></div>
        </div>
        <div class="move-order-panel" id="move-order-list">
            <!-- move orders -->
        </div>
    </aside>
</main>


<div class="row-direction-list-division">
    <a href="https://mkparkqq.github.io/docs/ps/boj/11729">하노이 탑 알고리즘</a>
    |
    <a href="https://mkparkqq.github.io/docs/ps/boj/11729">개발 과정</a>
</div>


