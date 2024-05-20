---
layout: default
title: \[LeetCode\] 1863 Sum of All Subset XOR Totals
#nav_order: 
date: 2024-05-20 20:56 +0900
#last_modified_at: 2024-01-01 00:00 +0900
hit_count: false
utteranc: true
#permalink: /docs/ps/boj/xxxx
parent: Problem Solving
categories:
  - Problem Solving
  - LeetCode
---

# \[LeetCode\] 1863 Sum of All Subset XOR Totals
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

[문제 링크](https://leetcode.com/problems/sum-of-all-subset-xor-totals/)

주어진 배열의 모든 부분집합의 원소들의 XOR연산의 합을 구하는 문제

<hr>

## 풀이 과정

### 나의 풀이

* dfs로 모든 부분집합을 구하고 xor 연산의 합을 누적한다.
* 위의 과정을 부분집합의 크기가 1부터 n까지 반복한다.

<hr>

## 정답 코드

### 나의 풀이 (10ms/8.5MB)

```cpp
class Solution {
public:
    int subsetXORSum(vector<int>& nums) {
        int answer = 0;
        for (int i = 1; i <= nums.size(); i++) {
            vector<int> tmp;
            permutate(nums, 0, i, tmp, answer);
        }
        return answer;
    }
    
    void permutate(const vector<int>& nums, int idx, const int n,
        vector<int>& tmp, int& sum) {
        if (tmp.size() == n) {
            sum += xorSum(tmp);
            return;
        }
        for (int i = idx; i < nums.size(); i++) {
            tmp.push_back(nums[i]);
            permutate(nums, i + 1, n, tmp, sum);
            tmp.pop_back();
        }
    }
    
    int xorSum(const vector<int>& subset) {
        int result = subset[0];
        for (int i = 1; i < subset.size(); i++) {
            result = result ^ subset[i];
        }
        return result;
    }
};
```

### bhanu_bhakta의 풀이(3ms/8.3MB)

```cpp
class Solution {
public:
    int subsetXORSum(vector<int>& nums) {
        int sumTotal = 0;

        for (int num : nums) {
            sumTotal |= num;
        }
        return sumTotal << (nums.size() - 1);
    }
};
```

## reference
* [bhanu_bhakta의 풀이](https://leetcode.com/problems/sum-of-all-subset-xor-totals/discuss/5181870/Fastest(100)-oror-Video-Explanation-oror-Easy-to-understand)

