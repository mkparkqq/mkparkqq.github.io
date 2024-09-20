---
layout: default
title: C++ scope
date: 2024-01-19 23:48 +0900
# last_modified_at: 2024-01-01 00:00 +0900
parent: dev
# permalink: /docs/note/XXX/XXXX
hit_count: false
categories:
  - dev
---

# C++ scope
{: .no_toc }
<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

C++의 scope 개념을 이해하기 위한 예제

<hr>

## scope

scope란 어떤 변수가 유효한(접근했을 때 원하는 값을 얻을 수 있는) 범위이다.

* local variable - 특정 함수 내부에서 정의된 변수. 해당 함수를 벗어나면 접근할 수 없다.
* compound statement - 여러 statement를 중괄호(`{  }`)로 묶은 것. block이라고도 한다.   
    block 내부에서 선언된 변수 또한 해당 block 내부에서만 유효하다.
* 객체는 자신의 scope를 벗어날 때 암시적으로 destructor가 호출된다.

<hr>

## example code

* `Person::Scope` - `Person::Person` 인스턴스를 사용할 수 있는 범위(scope)를 설정한다.   
    자신의 scope를 벗어날 때 해당 인스턴스가 저장된 메모리 공간을 해제한다.


```cpp
#include <string>
#include <iostream>
using namespace std;

namespace Person {

    class Person {
        private:
        string name;
        int age;
        public:
        Person(string name, int age): name(name), age(age) { }
        void printInfo() {
            cout << name << "(" << age << ")\n";
        }
    };

    class Scope {
        private:
        Person* person;
        public:
        Scope(Person* person): person(person) {  }
        ~Scope() {
            delete person;
            person = nullptr;
        }
    };

}

int main() {
    Person::Person* p1 = new Person::Person("Watson", 25);
    Person::Person* p2 = new Person::Person("Sherlock", 25);
    {
        Person::Scope person_scope(p1);  // 이 scope를 벗어나면 p1이 가리키는 공간이 해제된다.
    }
    Person::Person* p3 = new Person::Person("Irene", 25);
    if (p1) p1->printInfo();
    if (p2) p2->printInfo();
    return 0;
}

```

<hr>

## 실행 결과

* `delete`로 메모리 공간을 해제한다고 해서 해당 메모리 영역의 값이 사라지는 것은 아니다.   
* 다만 메모리 관리자에게 해당 메모리를 다시 사용할 수 있음을 알려준다.


<img src="/assets/images/programming/scope-example.png" alt="execution result" />

* `p1`이 가리키던 메모리 공간이 `scope_person`에 의해 해제된뒤 `Person::Person("Irene", 25)`에게 할당되었다.

<hr>

## reference

* [Absolute C++ SIXTH EDITION](https://www.amazon.com/Absolute-C-6th-Walter-Savitch/dp/0133970787)
