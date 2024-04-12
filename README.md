# WEB_PROJECT
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