## Mother Project
---
mother project : kakaoBot<br>
최근 수정: 2020/12/04<br>
추가기능 : amazon comprehend api를 이용한 챗봇에 감성분석 기능 추가 

# :page_with_curl:목차
---
<<<<<<< HEAD
> 소개
    mother project chatbot를 바탕으로  aws-comprehend api기능을 추가하여
    어떤 문자를 보냈을때 그 메세지에 내포된 감정을 반환하도록 하였다.
> 기본세팅
    WHAT WE NEED: 
    line messanger api channel token
    aws access,access-secret token
> > 개발 환경
   visual studio code
   node js
> > 사용 언어
    node.js
> 3.빌드 방법
    0. npm install
    1. npm install aws-sdk
    2. /home/user 디렉토리의 .aws안의 credentials파일을 수정한다
        ->aws access key, secret key 입력
        ->region: us-east-1
        ->aws session token입력
> 4.사용 방법
    (temp) 
    1. send message
    2. it will return your sentiment
> > 사용 API
    1. aws comprehend api
    2. line notify,messendger api
=======
> 1.소개

> > 사용 API

> 기본세팅

> > 사용 언어
 
> 3.빌드 방법
   
> 4.사용 방법
    

    
>>>>>>> 3ebe01955916a00f9e33f2cd02ab7d1892d538aa
> liscense
# :speaker:소개
---기존에 구현된 챗봇에 amazon comprehend api를 도입해 감성분석 기능을 추가한다.

   사용자가 text를 전송할 경우 text에서  major한 감정을 추출하여 reply한다.
   
---사용 API

    1. aws comprehend api
    
    2. line notify,messenger api

# :bookmark:기본세팅
---WHAT WE NEED: 

    line messanger api channel token
    
    aws access,access-secret token
    
---사용언어 : java script
# :floppy_disk:빌드 방법
--- 0. npm install

    1. npm install aws-sdk
    
    2. aws configure
    
        ->aws access key, secret key 입력
        
        ->region: us-east-1

# :book:사용 방법
---(temp) 

    1. send message
    
    2. it will return your sentiment
---


