# 🛳️HSCZ 웹 프로젝트👩‍💻
<div class="inline-images">
    <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white">
    <img src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=Python&logoColor=white">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Python&logoColor=black"> 
    <img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=Python&logoColor=white">
    <img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=Python&logoColor=white">
    <img src="https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=Python&logoColor=white">
    <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=Python&logoColor=white">
    <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=Python&logoColor=white">
    <img src="https://img.shields.io/badge/JAVA-7952B3?style=for-the-badge&logo=Python&logoColor=white">
</div>


# 메인페이지(hs code 매칭기능) 제작

## 2024.04.11 전하늘
### 완료 업무
- hscode 4자리 데이터 파일 오라클 업로드 
- hscode 10자리 데이터 파일 오라클 업로드 
- 2번째 메인페이지 초안 제작 완료
- index.html: 임의의 4자리 코드 담긴 하이퍼링크 3개 생성
- SubheadingController
    - 전달받은 4자리 코드를 SubheadingService로 넘겨 해당 코드에 맞는 10자리 코드 정보 반환
    - 4자리 코드에 해당하는 10자리 코드 정보를 detail.html에 넘겨 테이블로 출력

- 추가
    - dto(HeadingDTO, SubheadingDTO), entity(HeadingEntity, SubheadingEntity), repository(HeadingRepository, SubheadingRepository) 생성하여 오라클의 데이터베이스와 연결

### 추후 업무 계획
- 3번째 메인페이지 연결하기 위해 두번째 페이지 수정
    - 10자리 정보가 있는 테이블 행에 "관세율조회"버튼 생성
    - 버튼 클릭시 10자리 hs코드 보내 관세율 api 조회하여 관세율정보 가져오기
- 3번째 메인페이지 제작 -> 관세율 api로 조회한 정보를 출력



## 2024.04.12 전하늘
### 완료 업무
- hscode 10자리 데이터 파일 수정 및 업로드
- 3번째 메인페이지 제작 착수
- 3번째 메인페이지에 사용할 유니패스 관세율조회api 파싱 및 DTO담기 완료
- info.html : detail.html에서 마지막 4자리 클릭시 코드 10자리 서버로 보내 api조회 후 dto로 담아 화면에 출력

### 추후 업무 계획
- 2번째 페이지 디자인
- 3번째 페이지 시각화 그래프 제작
- 3번째 페이지 관세사 연결 버튼 제작
- 3번째 페이지 디자인 



## 2024.04.15 전하늘
### 완료 업무
<3번째 페이지>
- 세관장 api 조회하여 화면에 출력하기 (수출입 요건)
- 간이정액환급 api 조회하여 화면에 출력하기
- 세율적용 우선순위 팝업창 만들기 popup.html
- 관세사 연결 버튼 만들기
- 전략물자 조회하는 사이트로 연결되는 버튼 만들기

<2번째 페이지>
- 수출입 top5국가 그래프 만들기(pie chart)
    - top5국가 정보 담긴 테이블과 연결하여 4자리 hs code 파라메터로 보내 해당하는 수입, 수출 5위까지의 정보 가져오기
    - 가져온 정보 그래프에 넣기
- 수출입 통계 그래프(xy chart) 그림만 넣기

### 추후 업무 계획
- 수출입 통계 그래프(xy chart) 데이터 넣기
    - api와 연결하여 데이터 가져와서 넣기
- 메인 기능 페이지 디자인



## 2024.04.16 전하늘
### 완료 업무
<2번째 페이지>
- 수출입 통계 xy 그래프 넣기 완료
    - 공공 api 이용하여 품목별 2019~2023년 각 년의 수출총계, 수입총계 조회하여 데이터베이스에 삽입
     - 삽입된 데이터베이스를 이용하여 그래프에 데이터 넣기

### 추후 업무 계획
- 3번째페이지 원산지 표시 정보 넣기
- 메인 기능 페이지 프론트엔드 작업, 디자인



## 2024.04.17 전하늘
### 완료 업무
- 2번째 페이지 차트 수정
- 3번째 페이지 원산지 표시 대상 항목 추가
- 템플릿, css 디자인 서치



## 2024.04.19 전하늘
### 완료 업무
- 웹페이지에 사용될 기본 레이아웃 틀 완성
    - 오른쪽 사이드바 있는 버전
    - 오른쪽 사이드바 없는 버전



## 2024.04.23 전하늘
### 완료 업무
- 메인기능 페이지 디자인 및 프론트엔드 개발 초안 완
- 메인페이지 초안과 합치기 완
