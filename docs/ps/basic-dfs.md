---
layout: default
title: DFS 기초
date: 2024-05-13 21:12 +0900
last_modified_at: 2024-05-13 21:12 +0900
hit_count: true
utteranc: true
#permalink: /docs/ps/boj/xxxx
parent: Problem Solving
categories:
- Problem Solving
tags:
- DFS
---

# DFS 기초
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

가장 단순한 DFS(Depth First Search) 예제.   
코딩테스트에서 DFS를 적용하여 푸는 문제는 입력의 크기가 7 ~ 15정도인 것이 특징이다.  
트리 형태의 상태 공간을 탐색하는데 적합한 알고리즘이다. 

<hr>

## 순열

* `visited` 배열 필요
* 각 노드에서 `numbers`를 처음부터 순회한다.

### 코드
```cpp
#include <stdio.h>
#include <vector>

using namespace std;

void dfs(size_t depth, size_t r, 
		const vector<int>& numbers, vector<bool>& visited,
		vector<int>& tmp) {
	static int count = 1;
	if (depth == r) {
		printf("[%-2d] ", count++);
		for (int n : tmp) {
			printf("%d ", n);
		}
		printf("\n");
		return;
	}

	for (int i = 0; i < numbers.size(); i++) {
		if (!visited[i]) {
			visited[i] = true;
			tmp.push_back(numbers[i]);
			dfs(depth + 1, r, numbers, visited, tmp);
			visited[i] = false;
			tmp.pop_back();
		}
	}

	return;
}

int main() {
	vector<int> numbers = {1, 2, 3, 4};
	vector<bool> visited(4, false);
	vector<int> tmp;
	dfs(0, 3, numbers, visited, tmp);

	return 0;
}

```

### 실행 결과

<pre class="cli">
$ g++ --std=c++11 solution.cpp -o solution.out && ./solution.out
[1 ] 1 2 3 
[2 ] 1 2 4 
[3 ] 1 3 2 
[4 ] 1 3 4 
[5 ] 1 4 2 
[6 ] 1 4 3 
[7 ] 2 1 3 
[8 ] 2 1 4 
[9 ] 2 3 1 
[10] 2 3 4 
[11] 2 4 1 
[12] 2 4 3 
[13] 3 1 2 
[14] 3 1 4 
[15] 3 2 1 
[16] 3 2 4 
[17] 3 4 1 
[18] 3 4 2 
[19] 4 1 2 
[20] 4 1 3 
[21] 4 2 1 
[22] 4 2 3 
[23] 4 3 1 
[24] 4 3 2 
</pre>

<hr>

## 조합

* `idx` 배열이 필요.
* `idx` 배열을 활용하여 각 노드에서 이미 지나온 `numbers`의 원소는 고려하지 않는다.

### 코드 

```cpp
#include <stdio.h>
#include <vector>

using namespace std;

void dfs(size_t r, size_t idx,
		const vector<int>& numbers, vector<int>& tmp) {
	static int count = 1;
	if (tmp.size() == r) {
		printf("[%-2d] ", count++);
		for (int n : tmp) {
			printf("%d ", n);
		}
		printf("\n");
	}

	for (int i = idx; i < numbers.size(); i++) {
		tmp.push_back(numbers[i]);
		dfs(r, i + 1, numbers, tmp);
		tmp.pop_back();
	}
	return;
}

int main() {
	vector<int> numbers = {1, 2, 3, 4};
	vector<int> tmp;
	dfs(3, 0, numbers, tmp);

	return 0;
}
```

### 실행 결과

<pre class="cli">
[1 ] 1 2 3 
[2 ] 1 2 4 
[3 ] 1 3 4 
[4 ] 2 3 4 
</pre>


