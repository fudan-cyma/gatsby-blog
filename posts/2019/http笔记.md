---
layout: posts
title: 'HTTP 笔记'
date: '2019-10-05'
description: 'HTTP下午茶阅读笔记'
tags: [notes, http]
---

#### 背景知识

1. **无状态**:一个协议的每一个请求/响应周期与前一个是相互独立的.
   服务器不需要在各次请求之间保留状态信息; 如果一次请求出现问题,系统不必做任何清理
2. URL: Uniform Resource Locator. 是 Uniform Resource Identifier 的一种形式
   - 组成部分: http://www.example.com/home
     - http: URL 模式
     - www.example.com: 主机(host)
     - /home: url 路径
   - 查询字符串: http://www.example.com?search=ruby&results=10
     - ? : 查询字符串的开始
     - &: 添加参数
     - search=ruby, results=10: 参数的键值对
     - 使用 GET 请求, 有长度限制, 不推荐用于传输敏感信息
   - URL 编码
     - URL 只接受 ASCII 码
     - 不符合格式的字符替换成%开头的十六进制数字
     - 如: 不安全的字符(%), 保留字(/, ?, &)

#### 发起请求:

1. GET 请求

   - 用于取得一个资源
   - 请求的响应可以是任何东西,但如果响应是一个 HTML 并且引用了其他资源,浏览器会对这些资源自动发起请求; 但是 HTTP 工具(如 Paw)则不会
   - 在大小和安全性上有一些限制

2. POST 请求(原书采用的http://echo.httpkit.com似乎不work了)

   - 用于提交数据

   - 传输的 HTTP 消息包含于正文(body)中,

     `curl -X POST "http://al-blackjack.herokuapp.com/new_player" -d "player_name=Leo -m 30 -v"`

   - 返回信息, 注意 HTTP 响应头部: Location, 浏览器会对该 URL 发起一个全新的,完全独立的请求

#### 处理响应

1. 状态码
   - 200: OK,请求被正确处理
   - 302: Found, 请求的资源已暂时更改,通常会重定向到另一个 URL.
     当浏览器看到 302 状态响应码时,会自动跳转到`Location`响应头部指定的 URL
   - 404: Not Found
   - 500: Internal Server Error
2. 响应头部
   1. Content-Encoding: 如 gzip
   2. Server
   3. Location
   4. Content-Type: 如 text/html; charset=UTF-8

#### 有状态的 WEB 应用

1. 会话(Session)
   - 服务器在发送响应数据给客户端时附带唯一的 token
   - 客户端在之后发起请求时都附加这个 token 用于识别. token 也称会话标识符 session identifier
   - 每个请求严格上说还是无状态的,各次请求之间并不知道彼此的存在
   - 后果:
     - 必须检查每个请求的会话标识符
     - 必须检查每个会话 id 以确保没有过期
     - 服务器需要基于会话 id 取出该会话的数据并重新创建应用程序的状态
2. Cookies
   - 在一个请求/响应周期内,服务器发给客户端并存储在客户端的一段数据
   - 在第一次访问时,服务器发送会话信息并存储在本地浏览器的 cookie 里; 在之后客户端发起请求时,服务器会对比客户端的 cookie 和服务器上的会话数据已标识当前的会话
3. AJAX: Asynchronous JavaScript and XML
   - 不会为每一个请求都重新生成一次页面

#### 安全性

1. HTTPS: 对请求和响应的信息加密
2. 同源策略 Same-origin policy
   - 阻止对其他站点**文档/资源**的访问, 同源的文档必须有相同的协议, 主机号和端口号(不是链接)
   - 跨域资源共享 CORS, 添加新的 HTTP 头部来对一些域名授权, 允许服务器使用这些站点的资源
3. 会话劫持 Session Hijacking
   - 防范: 重置会话, 每次登陆包括验证旧的会话 id 和生成新的会话 id, 尤其是在敏感操作时
   - 设置过期时间
   - HTTPS
4. 跨站脚本攻击 XSS
   - 对用户输入做无害处理. 如: 使用 Markdown
   - 转义用户输入的所有数据

------ 参考文献:

1. HTTP 下午茶(https://www.kancloud.cn/kancloud/tealeaf-http)
2.
