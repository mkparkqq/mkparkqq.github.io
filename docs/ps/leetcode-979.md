---
layout: default
title: \[LeetCode\] 979 Distribute Coins in Binary Tree
#nav_order: 
date: 2024-05-19 18:54 +0900
#last_modified_at: 2024-01-01 00:00 +0900
hit_count: false
utteranc: true
#permalink: /docs/ps/boj/xxxx
parent: Problem Solving
categories:
  - Problem Solving
  - BOJ
---

# \[LeetCode\] 979 Distribute Coins in Binary Tree
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

[문제 링크](https://leetcode.com/problems/distribute-coins-in-binary-tree/description/)

이진 트리의 모든 노드가 1개의 코인을 가지기 위해 코인을 이동하는 횟수를 구하는 문제. (한 번에 1개의 코인만 이동할 수 있다.)

<hr>

## 풀이 과정

* [votrubac의 풀이](https://leetcode.com/problems/distribute-coins-in-binary-tree/discuss/221939/C%2B%2B-with-picture-post-order-traversal)를 참고했다.

<img src="/assets/images/leetcode/leetcode979.png" alt="diagram" />

* **각 노드에서의 코인의 개수**를 반환한다. 그리고 1이 되기 위해 이동하는 코인의 개수를 업데이트 한다.
	* `노드에서의 코인 개수 = (node->val + 왼쪽 subtree의 코인 수 + 오른쪽 subtree의 코인 수 - 1)`
	* 필요한 코인은 음수, 남는 코인은 양수로 표현
	* -1은 더 이상 이동하지 않고 해당 노드에 남는 코인의 개수이다.

<hr>

## 정답 코드

```cpp
class Solution {
public:
    int distributeCoins(TreeNode* root) {
        int answer = 0;
        dfs(root, answer);
        return answer;
    }

    int dfs(TreeNode* node, int& moveCount) {
        int lmove = (nullptr == node->left) ? 0 : dfs(node->left, moveCount);
        int rmove = (nullptr == node->right) ? 0 : dfs(node->right, moveCount);
        moveCount += abs(lmove) + abs(rmove);
        return node->val + lmove + rmove - 1;
    }
};
```

## reference
* [C++ with picture, post-order traversal](https://leetcode.com/problems/distribute-coins-in-binary-tree/discuss/221939/C%2B%2B-with-picture-post-order-traversal)
