## Mother Project
---
mother project : kakaoBot<br>
최근 수정: 2018/12/01<br>
추가기능 : 파파고 api를 이용한 카카오톡에서 전송한 사진 속 글자 인식및 번역

# :page_with_curl:목차
---
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
> liscense
# :speaker:소개
---

# :bookmark:기본세팅
---

# :floppy_disk:빌드 방법
---

# :book:사용 방법
---



