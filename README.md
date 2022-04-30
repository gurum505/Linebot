## Mother Project
---
mother project : kakaoBot<br>
추가기능 : amazon comprehend api를 이용한 챗봇에 감성분석 기능 추가 

# :page_with_curl:목차
---
> 1.소개

> > 사용 API

> 기본세팅

> > 사용 언어
 
> 3.빌드 방법
   
> 4.사용 방법

# :speaker:소개
`영어, 한글 등 여러 언어로 작성한 글에서 감성을 분석하는 서비스`

---기존에 구현된 챗봇에 amazon comprehend api를 도입해 감성분석 기능을 추가한다.

   사용자가 text를 전송할 경우 text에서  major한 감정을 추출하여 reply한다.
   ![image](https://user-images.githubusercontent.com/72953877/166104523-5536adfc-6244-4515-9632-afd7218d7a09.png)

   
---`사용 API`

    1. aws comprehend api
    
    2. line notify,messenger api

# :bookmark:기본세팅
---`WHAT WE NEED`: 

    line messanger api channel token
    
    aws access,access-secret token
    
---사용언어 : java script
# :floppy_disk:빌드 방법
--- 0. npm install

    1. npm install aws-sdk
    
    2. /home/user/ 안의 .aws/credentials 수정
    
        ->aws session token key 입력
        
        ->aws access key, secret key 입력
        
        ->region: us-east-1

# :book:사용 방법
---
    1. send message
    
    2. it will return your sentiment
---

![캡처](https://user-images.githubusercontent.com/72953877/166104692-295db299-7f88-46ec-9b78-411d82797c53.PNG)

