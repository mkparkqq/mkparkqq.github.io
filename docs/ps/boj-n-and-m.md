---
layout: default
title: \[BOJ\] N과 M 1~4
date: 2023-12-23 00:08 +0900
# last_modified_at: 2024-01-01 00:00 +0900
hit_count: false
utteranc: true
permalink: /docs/ps/boj/n-and-m
parent: Problem Solving
categories:
  - Problem Solving
  - BOJ
---

# 백트래킹의 기본
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

## N과 M(1) C++

[문제 링크](https://www.acmicpc.net/problem/15649)

P(N, M)의 모든 경우를 출력하는 문제이다.

`vector<bool> used`를 사용하여 이미 뽑은 수는 다시 뽑지 않는 것이 핵심이다.

```cpp
#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

void dfs(int m, const vector<int>& numbers, vector<int>& tmp, vector<bool>& u) {
    int n = numbers.size();
    if (tmp.size() == m) {
        for (int i = 0; i < m; i++)
            cout << tmp[i] << " ";
        cout << endl;
        return;
    }
    for (int i = 0; i < n; i++) {
        if (!u[i]) {
            tmp.push_back(numbers[i]);
            u[i] = true;
            dfs(m, numbers, tmp, u);
            tmp.pop_back();
            u[i] = false;
        }
    }
}

int main() {
    int n, m;
    cin >> n >> m;
    vector<bool> u(n, false);
    vector<int> tmp;
    vector<int> numbers(n, 0);
    for (int i = 0; i < n; i++) {
        numbers[i] = i + 1;
    }
    cout << "\n";
    dfs(m, numbers, tmp, u);

    return 0;
}

```

<hr>

## N과 M(2) C++

[문제 링크](https://www.acmicpc.net/problem/15650)

C(N, M)의 모든 경우를 출력하는 문제이다.

`int pos` 변수를 사용하여 중복을 제거하는 것이 핵심이다.

```cpp
#include <iostream>
#include <vector>
using namespace std;

void dfs(int m, const vector<int>& numbers, vector<int>& tmp, int pos) {
    int n = numbers.size();
    if (tmp.size() == m) {
        for (int i = 0; i < m; i++)
            cout << tmp[i] << " ";
        cout << endl;
        return;
    }
    for (int i = pos; i < n; i++) {
        tmp.push_back(numbers[i]);
        dfs(m, numbers, tmp, i + 1);
        tmp.pop_back();
    }
}

int main() {
    int n, m;
    cin >> n >> m;
    vector<int> tmp;
    vector<int> numbers(n, 0);
    for (int i = 0; i < n; i++) {
        numbers[i] = i + 1;
    }
    cout << "\n";
    dfs(m, numbers, tmp, 0);

    return 0;
}


```

<hr>

## N과 M(3) C++

[문제 링크](https://www.acmicpc.net/problem/15651)

중복순열의 모든 경우를 출력하는 문제 (모든 경우의 수는 `pow(N, M)`)

[순열을 구현한 코드](#n과-m1)에서 `vector<bool> used`를 제거하여 모든 중복을 허용해주기만 하면 된다.

```cpp
void dfs(int m, const vector<int>& numbers, vector<int>& tmp) {
    int n = numbers.size();
    if (tmp.size() == m) {
        for (int i = 0; i < m; i++)
            cout << tmp[i] << " ";
        cout << endl;
        return;
    }
    for (int i = 0; i < n; i++) {
        tmp.push_back(numbers[i]);
        dfs(m, numbers, tmp);
        tmp.pop_back();
    }
}

int main() {
    int n, m;
    cin >> n >> m;
    vector<int> tmp;
    vector<int> numbers(n, 0);
    for (int i = 0; i < n; i++) {
        numbers[i] = i + 1;
    }
    cout << "\n";
    dfs(m, numbers, tmp);

    return 0;
}

```

<hr>

## N과 M(4) C++

[문제 링크](https://www.acmicpc.net/problem/15652)

중복조합의 모든 경우를 출력하는 문제 (경우의 수는 `C(N + M - 1, M)`)

[조합을 구현한 코드](#n과-m2)에서 `pos`로 전달되는 값을 `i + 1`에서 `i`로 바꿔주면 된다.

```cpp
#include <iostream>
#include <vector>
using namespace std;

void dfs(int m, const vector<int>& numbers, vector<int>& tmp, int pos) {
    int n = numbers.size();
    if (tmp.size() == m) {
        for (int i = 0; i < m; i++)
            cout << tmp[i] << " ";
        cout << endl;
        return;
    }
    for (int i = pos; i < n; i++) {
        tmp.push_back(numbers[i]);
        dfs(m, numbers, tmp, i);
        tmp.pop_back();
    }
}

int main() {
    int n, m;
    cin >> n >> m;
    vector<int> tmp;
    vector<int> numbers(n, 0);
    for (int i = 0; i < n; i++) {
        numbers[i] = i + 1;
    }
    cout << "\n";
    dfs(m, numbers, tmp, 0);

    return 0;
}

```

<hr>

## 응용

[스타트와 링크 문제](https://www.acmicpc.net/problem/14889)의 핵심은 `N`명 중 `N/2`명을 뽑는 경우에 대해 탐색하는 것이다.

```cpp
#include <iostream>
#include <vector>
using namespace std;

/*
 * d 뽑은(B팀에 배정된) 사람 수
 * players 값이 true - B팀 false - A팀
 * pos 조합 구현에 필요한 정보
 */
void dfs(int n, int d, vector<bool>& players, int pos) {
    if (d == n / 2) {
        for (int i = 0; i < n; i++) {
            cout << (players[i] ? "B " : "A ");
        }
        cout << endl;
        return;
    }
    for (int i = pos; i < n; i++) {
        /* 
         * 문제에서 AAABBB BBBAAA로 팀을 나누는 경우는 동일한 경우이다.
         * 첫 번째를 A 또는 B로 고정시켜 위의 중복을 없앤다.
         */
        if (d == 0 && i == 1) {
            return;
        }
        players[i] = true;
        dfs(n, d + 1, players, i + 1);
        players[i] = false;
    }
}

int main() {
    int n;
    cin >> n;
    vector<bool> players(n, false); // false - A팀, true - B팀
    dfs(n, 0, players, 0);

    return 0;
}

```

실행 결과

<img src="/assets/images/boj/simple14889.png" width="70%" alt="simple 14889" />

23번째 줄의 조건이 없으면 아래와 같이 동일한 팀 배정을 탐색하게 된다.

<img src="/assets/images/boj/14889-redundant.png" width="70%" alt="redundant 14889" />
