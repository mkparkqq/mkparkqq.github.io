---
layout: default
title: \[LeetCode\] 1325 Deletes leaves with a given value
#nav_order: 
date: 2024-05-17 23:25 +0900
#last_modified_at: 2024-01-01 00:00 +0900
hit_count: false
utteranc: true
#permalink: /docs/ps/boj/xxxx
parent: Problem Solving
categories:
  - Problem Solving
  - LeetCode
---

# \[LeetCode\] 1325 Deletes leaves with a given value
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

[문제 링크](https://leetcode.com/problems/delete-leaves-with-a-given-value/description/)

<hr>

## 풀이 과정

트리 -> DFS

<hr>

## 정답 코드-1

```cpp
class Solution {
public:
    TreeNode* removeLeafNodes(TreeNode* root, int target) {
        dfs(&root, target);
        return root;
    }

    void dfs(TreeNode** root, int target) {
        if (nullptr != (*root)->left) {
            dfs(&((*root)->left), target);
        }
        if (nullptr != (*root)->right) {
            dfs(&((*root)->right), target);
        }
        if (nullptr == (*root)->left && nullptr == (*root)->right
            && (*root)->val == target) {
            *root = nullptr;
        }
    }
};
```

## 정답 코드-2

```cpp
class Solution {
public:
    TreeNode* removeLeafNodes(TreeNode* root, int target) {
        dfs(&root, target);
        return root;
    }

    void dfs(TreeNode** root, int target) {
        if (nullptr != (*root)->left) {
            dfs(&((*root)->left), target);
        }
        if (nullptr != (*root)->right) {
            dfs(&((*root)->right), target);
        }
        if (nullptr == (*root)->left && nullptr == (*root)->right
            && (*root)->val == target) {
            *root = nullptr;
        }
    }
};
```
