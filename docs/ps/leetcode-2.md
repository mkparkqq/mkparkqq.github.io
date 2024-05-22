---
layout: default
title: \[LeetCode\] 2 Add Two Numbers
#nav_order: 
date: 2024-05-22 21:24 +0900
#last_modified_at: 2024-01-01 00:00 +0900
hit_count: false
utteranc: true
#permalink: /docs/ps/boj/xxxx
parent: Problem Solving
categories:
  - Problem Solving
  - LeetCode
---

# \[LeetCode\] 2 Add Two Numbers
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

[문제 링크](https://leetcode.com/problems/add-two-numbers/)

<hr>

## 풀이 과정

* 리스트 순서대로 덧셈을 진행한다.
* 두 노드의 합이 10 이상인 경우 다음 노드에 1을 미리 더해준다.

<img src="/assets/images/leetcode/leetcode2.png" alt="diagram">

<hr>

## 정답 코드(39ms/76MB)
```cpp
class Solution {
private:
    ListNode* head;
    ListNode* sum;
    
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        sum = new ListNode();
        head = sum;
        while (nullptr != l1 || nullptr != l2) {
            int n1 = 0;
            int n2 = 0;
            if (nullptr != l1) {
                n1 = l1->val;
                l1 = l1->next;
            }
            if (nullptr != l2) {
                n2 = l2->val;
                l2 = l2->next;
            }
            if (nullptr != l1 || nullptr != l2)
                sum->next = new ListNode();
            sum->val += n1 + n2;
            if (sum->val >= 10) {
                sum->val %= 10;
                if (nullptr == sum->next)
                    sum->next = new ListNode();
                sum->next->val = 1;
            }
            if (nullptr != sum->next)
                sum = sum->next;
        }
        return head;
    }
};
```

