---
# 这是文章的标题
title: 2023 ICPC JiNan 题解
# 你可以自定义封面图片
cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 3
# 设置作者
author: shihuai
# 设置写作时间
date: 2024-01-19
# 一个页面可以有多个分类
category:
  - 2023 ICPC
# 一个页面可以有多个标签
tag:
  - ICPC
  - 2023
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在星标文章中
star: false
# 你可以自定义页脚
footer: 
# 你可以自定义版权信息
copyright: 
---

这是一个很精彩的文章摘要。

<!-- more -->

## A. Many Many Heads

### 解析

假设所有括号都就近匹配，那么可以对所有括号设置一个层级，即入栈时栈的高度，可以发现如果某个括号层级的数量超过四个，就会导致多种匹配可能性的发生。

当然别忘记判断是否无法组成合法括号序列。


### Tag

括号序列

### 代码

```cpp
#include <bits/stdc++.h>
#define FOR(i,j,k) for(int i = j;i <= (k);++ i)
#define ROF(i,j,k) for(int i = j;i >= (k);-- i)
#define PII pair<int,int>
#define int long long
#define ULL unsigned long long
#define PDD pair<double,double>
#define F first
#define S second
#define YES cout << "YES\n"
#define NO cout << "NO\n"
#define ANS cout << ans << '\n'
#define de(p) cout << #p << ' ' << p << '\n';
#define END (i == n ? '\n' : ' ')
#define debug 0
using namespace std;
const int N = 2e5 + 10,M = 1e5 + 10,mod = 998244353,INF = 0x3f3f3f3f,P = 13331;

int n,m,k;
string s;
int c[N];

void solve()
{
    cin >> s;
    n = s.size();
    s = " " + s;
    stack<int> stk;
    FOR(i,1,n)
    {
        int res = 0;
        if (s[i] == '(' || s[i] == ')') res = 1;
        else res = 2;

        if(stk.size() && res == stk.top())
        {
            stk.pop();
            c[i] = stk.size();
        }
        else
        {
            c[i] = stk.size();
            stk.push(res);
        }
    }
    int flag = 1;
    if (!stk.empty()) flag = 0;
    map<int,int> mp1,mp2;
    FOR(i,1,n)
    {
        if (s[i] == '(' || s[i] == ')') mp1[c[i]] ++ ;
        else mp2[c[i]] ++;
    }

    for(auto [u,v] : mp1)
    {
        if (v >= 4) flag = 0;
    }
    for(auto [u,v] : mp2)
    {
        if (v >= 4) flag = 0;
    }
    if (flag) YES;
    else NO;
}

signed main()
{
    ios_base::sync_with_stdio(0);cin.tie(0);cout.tie(0);
    int T = 1;
    cin >> T;
    while(T --)
    {
        solve();
    }

    return 0;
}
```

## D. Largest Digit

### 题意

令 $f(x)$  为 $x$ 十进制表示下的最大数码，求 $max [f(a + b)]$，其中 $l_a \leq a \leq r_a, l_b \leq b \leq r_b$。

### 分析

如果 $r_a − l_a + 1 \geq 10$ 或 $r_b − l_b + 1 ≥ 10$，则 $(a + b)$ 的个位数会从 $0$ 到 $9$ 都出现一遍，因此答案就是 $9$。

剩下的情况则暴力枚举。




## G. Gifts from Knowledge

### 题意

给一个 $n × m$ 的 01 矩阵，可以选择反转一些行（第一列变 成最后一列，以此类推），目标是每一列最多有一个 1。求方案数。

### 分析

如果 $i$ 行和 $i’$ 行在第 $j$ 列或者第 $m – j + 1$ 列上都有 $1$ 的话 $(1<= i , i’ <= n,1 <= j <= \lceil n/2 \rceil)$，那么 $i$ 行是否翻转决定了 $i’$ 行是否翻转。

这样我们可以将 $n$ 行看成 $n$ 个独立集合，并且将有冲突的各行合并起来，如果不能合并的话答案就是 $0$ 。
判断是否需要合并: 将第 $j$ 列和 $m – j + 1$ 列中存在 $1$ 的行编号存储在一起。存储在一起的行号就是需要合并的行。
由于每个集合都可以选择翻转或者不翻转，所以会使最后的答案乘 $2$ 。
最后答案就是 $2 ^ {最后集合的个数}$。


## I. 奇怪的排序

### 题意

对于一个 $n$ 的排列 $a_1,a_2,...,a_n$ ，需要对其进行升序排序。

可以执行下列操作最多$\lfloor \frac{n}{2} \rfloor$ 次：

选择下标 $l,r$ 满足 $1 \leq l < r \leq n$ 以及 $a_l > a_r$ ，将 $a_l,a_{l+1},...,a_r$ 按升序排序。

请输出一种可行的操作。

### 分析

最多执行$\lfloor \frac{n}{2} \rfloor$ 次操作，故每次操作至少需要使得两个元素归位。

下给出一种操作方案：

1. 可以考虑每次找到最小的 $u$ ，满足 $u \neq a_u$ （如果不存在这样的 $ u $ 说明序列已经有序）。
2. 找到最大的 $v$ ，满足 $a_v < a_u$ ，那么我们得到了排序区间 $[ u,v] $。
3. 由于对 $[u,v]$ 区间排序后，必然可以得到 $a_u = u$，$a_{u+1} = u+1$。因此如此操作至少可使两个元素就位。

### 代码

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

typedef pair<int,int> PII;
void fastIO(){ios::sync_with_stdio(false);cin.tie(nullptr);cout.tie(nullptr);}

const int N = 5e5;
int a[N];

void solve()
{
	int n; cin >> n;
    for (int i=1;i<=n;i++) cin >> a[i];
    vector<PII> ans;
	for (int i=1;i<=n;i++) {
		if (i == a[i]) continue;
		for (int j=n;j>=1;j--) {
			if (a[i] > a[j]) {
				sort(a+i, a+j+1);
				ans.emplace_back(i,j);
				break;
			}
		}
	}
	cout << ans.size() << '\n';
    for (auto i:ans) cout << i.first << ' ' << i.second << '\n';
}
signed main()
{
	fastIO();
	int _ = 1; cin >> _;
	while (_--)
	{
		solve();
	}
	
	return 0;
}
```

