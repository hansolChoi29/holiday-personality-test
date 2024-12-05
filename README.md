## 👨‍🏫  PROJECT: 크리스마스에 나는 뭐할까?
"크리스마스에 나는 뭐할까?" 프로젝트는 사용자의 MBTI 성향에 따라 크리스마스를 보내는 스타일과 성격을 재미있게 분석해주는 테스트입니다. 질문에 답하면 결과를 통해 나만의 크리스마스 역할과 이야기를 확인할 수 있으며, 이를 통해 연말 분위기를 더욱 따뜻하고 즐겁게 만들어줍니다.

![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FoIFm5%2FbtsK6p8Gje9%2FfkAvetKoiJcc25OQAkJIo0%2Fimg.png)   


## 📖 목차 
1. [프로젝트 소개](#PROJECT: 크리스마스에 나는 뭐할까?) 
2. [TEAM](#TEAM) 
4. [주요기능](#주요기능) 
5. [개발기간](#개발기간) 
6. [기술스택](#기술스택) 
7. [서비스 구조](#서비스-구조) 
8. [와이어프레임](#와이어프레임) 
9. [API 명세서](#API-명세서) 
10. [프로젝트 파일 구조](#프로젝트-파일-구조) 
11. [Trouble Shooting](#trouble-shooting) 



## TEAM
|팀장|팀원|팀원|팀원|팀원|
|:---:|:---:|:---:|:---:|:---:|
|최한솔|박정은|박하은|권지현|구경필|
|![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fv8CHF%2FbtsK6PyjKUX%2FWJWzOp6JJYAwCQw7xXH9sK%2Fimg.png)|![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fd6cUFU%2FbtsK59EogAs%2FOKQvuoMYY5BLgV9ha0D9D1%2Fimg.png)|![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FAtaK5%2FbtsK46VSlaj%2FYLWvlSEVwJE0PpDGuzorK1%2Fimg.png)|![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbCe53t%2FbtsK5cBJTYX%2FRy0woVNRIq5Mkx5mpgIWS1%2Fimg.png)|![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FkAEQ2%2FbtsK7eLp9he%2F4Y0t2BcNZkVVsNjBW5hWJK%2Fimg.png)   
|results, mypage|login, 공통컴포넌트|join|testpage|mypage|




## 💜 주요기능 - 기능 
1. 심리테스트

* 사용자가 크리스마스 관련 질문에 답변하면, 결과를 통해 크리스마스 역할과 성격을 분석합니다.

2. 결과 저장 및 조회 기능

* Supabase를 활용하여 사용자별 MBTI 결과와 추천 태그를 저장하고, 결과 페이지에서 이를 조회할 수 있습니다.

3. 닉네임 수정 및 개인화된 사용자 관리

* 사용자는 회원가입 시 닉네임을 설정할 수 있으며, 마이페이지에서 닉네임을 수정할 수 있습니다.

4. 테스트 결과 관리

* 마이페이지에서 테스트 결과를 삭제하거나 최신 결과를 조회할 수 있습니다.

## ⏲️ 개발기간 - 2024.11.29(월) ~ 2024.12.05(목) 

## 📚️ 기술스택 및 개발환경
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">

![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)



### ✔️ Version Control 
* Git: 프로젝트 버전 관리를 위해 사용.
* GitHub: 팀원 간 협업 및 코드 공유를 위한 원격 저장소로 활용.
 * 주요 브랜치: main, dev (개발 브랜치), feature/* (기능별 브랜치)
* GitHub Actions를 활용한 CI/CD(Continuous Integration and Deployment) 워크플로 설정.


### ✔️ IDE : Visual Studio Code (VS Code)
* 확장성 높은 플러그인과 직관적인 UI를 활용하여 개발 환경을 최적화.
사용된 주요 확장 프로그램
1) ESLint: 코드 스타일 검사 및 품질 유지.
2) Prettier: 코드 자동 정리 및 일관된 코드 스타일 유지.
3) Vite 플러그인: 빠른 개발 서버 구성을 위해 활용.
4) React Developer Tools: React 컴포넌트 디버깅 및 상태 확인


### ✔️ Deploy 
* Vercel

React 기반 프론트엔드 애플리케이션 배포.
빠르고 간편한 CI/CD 워크플로 지원.
main 브랜치에 코드 푸시 시 자동으로 배포되어 최신 상태 유지.
* Supabase

백엔드 데이터베이스 및 인증 서비스로 활용.
API와 데이터 관리를 통해 결과 저장 및 조회 기능 구현.

## 서비스 구조 
1. Frontend
* React: 사용자 인터페이스 개발.
* Styled-components: 컴포넌트 기반 CSS 스타일링.
* React Router: 페이지 간 라우팅 처리.
* TanStack Query: API 요청 상태 관리 및 데이터 캐싱.
* Vite: 빠른 빌드와 개발 서버 제공.
2. Backend
* Supabase:
1) 사용자 인증 (회원가입, 로그인, 로그아웃).
2) 사용자 결과 데이터 저장 및 관리.
3) 닉네임 및 테스트 결과 CRUD(생성, 조회, 수정, 삭제) 처리.
3. Deploy
* Vercel: 프론트엔드 애플리케이션 배포.
* Supabase: 데이터베이스 및 API 서버로 활용.
4. Database Structure
* Users Table: 사용자 정보 관리.
id, email, nickname 등.
* Results Table: 테스트 결과 저장.
user_id, mbtititle, description, besttag, badtag, created_at 등.

## 와이어프레임 

![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbtfX3L%2FbtsK6MJiwbZ%2FknjQtm9AfMsMmQkwZRuvLK%2Fimg.png)   


## API 명세서
> 사용자 인증 (Authentication)
1. 회원가입
* Endpoint: /auth/signUp
* Method: POST
* Request Body </br>
`{
  "email": "user@example.com",
  "password": "password123",
  "nickname": "UserNickname"
}
`
* Response </br>
`{
  "message": "회원가입 성공",
  "userId": "uuid"
}
`
* Error </br>
`{
  "message": "회원가입 실패: 중복된 이메일"
}
`
2. 로그인
* Endpoint: /auth/signIn
* Method: POST
* Request Body </br>
`{
  "email": "user@example.com",
  "password": "password123"
}
`
* Response </br>
`{
  "message": "로그인 성공",
  "token": "jwt-token"
}
`
* Error </br>
`{
  "message": "로그인 실패: 이메일 또는 비밀번호 불일치"
}
` 
3. 로그아웃 </br>
Endpoint: /auth/signOut
Method: POST
Response
`{
  "message": "로그아웃 성공"
}
`
> 사용자 닉네임 관리 </br>

1. 닉네임 조회
* Endpoint: /users/{userId}
* Method: GET
* Response </br>
`{
  "nickname": "NewNickname"
}
`
2. 닉네임 수정
Endpoint: /users/{userId}
Method: PUT
Request Body </br>
`{
  "nickname": "NewNickname"
}
`
* Response </br>
`{
  "message": "닉네임 수정 성공"
}
`
* Error </br>
`{
  "message": "닉네임 수정 실패: 중복된 닉네임"
}
`
> 테스트 결과 관리

1. 결과 저장
* Endpoint: /results
* Method: POST
* Request Body </br>
`{
  "userId": "uuid",
  "mbti": "ENFP",
  "mbtititle": "파티의 산타모자 스타!",
  "description": "세상에 이런 재밌는 사람이 또 있을까...",
  "besttag": "산타클로스의 비서!",
  "badtag": "크리스마스 해결사!"
}
`
* Response </br>
`{
  "message": "결과 저장 성공"
}
`
2. 결과 조회
* Endpoint: /results/{userId}
* Method: GET
* Response </br>
`[
  {
    "id": "result_id",
    "mbtititle": "파티의 산타모자 스타!",
    "description": "세상에 이런 재밌는 사람이 또 있을까...",
    "besttag": "산타클로스의 비서!",
    "badtag": "크리스마스 해결사!",
    "created_at": "2024-02-26T12:34:56Z"
  }
]
`
3. 결과 삭제
Endpoint: /results/{resultId}
Method: DELETE
Response </br>
`{
  "message": "결과 삭제 성공"
}
`

## 프로젝트 파일 구조 
![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FS888x%2FbtsK6lEIipL%2Ft2b2i1euieoVGLywoRGBi0%2Fimg.png)   

## Trouble Shooting

* restuls </br>
1. 문제: 사용자가 테스트를 완료한 후, 결과 페이지에서 결과 데이터가 제대로 표시되지 않고 빈칸이 보이는 문제 발생 </br>
2. 원인: question.js에 해당하는 결과가 없어서 빈칸으로 발생됨 </br>
3. 해결: question.js에 결과를 추가하여 수퍼베이스에 저장되고 불러오게 하였음 </br>

* mypage </br>
1. 문제: results가 전부 다 렌더링이 됨 </br>
2. 원인: limit설정을 안해줘서 검사결과가 모두 렌더링이 되었음 </br>
3. 해결: .limit(2);로 설정하여 두 개만 보이게 해결함 </br>


* testpage  </br>
1. 문제:테스트 문항이 1개씩 넘어가지 않고 두개씩 한꺼번에 넘어감 </br>
2. 원인:rabel 태그 안에 input이 있어 두개씩 넘어감 </br>
3. 해결:코드를 리팩토링 하여 수정 </br>

* 라우터 및 공통 컴포넌트 </br>
문제 : 전체 페이지에 haeder가 보임 (login, join 페이지에서 안보여야함) </br>
원인 : 의미없는 login 컴포넌트에서 고민 </br>
해결 :  layout 컴포넌트 특정 경로에서 header 숨김으로 설정 </br>


* loginpage </br>
1. 문제 : zustand 사용시 페이지가 안열림 </br>
2. 원인 : zustand 컴포넌트를 import하지않음 </br>
3. 결과 : import 후 성공 </br>

* joinpage </br>
1. 문제&원인 : zustand를 사용한 코드가 하나의 컴포넌트에서만 사용되는 코드들로만 구성되어 있었음 </br>
2. 해결 : 여러컴포넌트에서 사용될 수 있는 부분만 zustand로 분리




