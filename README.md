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
</div>
<br>
<br>

> 수출입에 필요한 모든 정보를 한 곳에 담은 무역정보 전문 웹 플랫폼입니다.
<br>
<p>
  <img src="https://github.com/ghgrnrdud/WEB_PROJECT_HSCZ/assets/153475197/f8c8fbf1-cc60-490e-a388-fee822b5330e" width="800" height="500">
</p>

# 📖Description
- 사용자가 입력한 제품 설명을 기반으로 가장 유사한 HSCODE TOP 3 추천
- 추천된 HSCODE와 관련된 세율, 수출입요건, 무역정보 그래프 등 상세 정보 제공
- 관세사 목록 제공 및 간편 상담 기능을 통한 사용자 편리성 강화
- 국가별 무역 통계, 무역 뉴스, FTA 정보 등 무역과 관련된 다양한 서비스 제공

# 🖥️DEMO
<p>
    <img src="https://github.com/ghgrnrdud/WEB_PROJECT_HSCZ/assets/153475197/892f4e25-301a-4a54-be71-249c23726ef6" width="300" height="300">
    <img src="https://github.com/ghgrnrdud/WEB_PROJECT_HSCZ/assets/153475197/a504e8ee-e233-41be-8440-fd223dcad790" width="300" height="300">
    <img src="https://github.com/ghgrnrdud/WEB_PROJECT_HSCZ/assets/153475197/ac64a423-a23f-48f4-b0b5-461226963b61" width="300" height="300">
    <img src="https://github.com/ghgrnrdud/WEB_PROJECT_HSCZ/assets/153475197/3d362dff-68bb-4585-98fb-a1d15e199563" width="300" height="300">
    <img src="https://github.com/ghgrnrdud/WEB_PROJECT_HSCZ/assets/153475197/54d29397-81e1-4d4c-83c8-fc970445b6d6" width="300" height="300">
</p>

# 🪛System Architecture
<p> 
    <img src="https://github.com/ghgrnrdud/WEB_PROJECT_HSCZ/assets/153475197/a1938539-cac8-4d45-9bfb-c517e711fac5" width="600" height="450">
</p>

# 🌟Main Feature
### HSCODE 추천 기능
- HSCODE 추천 모델을 PYTHON을 통해 개발. FastAPI를 이용하여 웹 서버와 연동
- 사용자가 제품에 대한 설명 입력 시 HSCODE 추천 모델을 통해 설명과 가장 유사한 HSCODE TOP 3 추천
- 사용자가 상세 HSCODE 선택 시 5년간 수출입금액 추이, 수출입 상위 5개국 등의 무역 통계 그래프, 세율, 수출입요건, 전략물자 등 수출입에 필요한 다양한 정보 제공

### 관세사 상담 기능
- 한국관세사회에 등록된 관세사 목록 지역별 제공. 사용자는 지역별 필터링을 통해 자신과 가까운 관세사와 컨택 가능
- 상세 HSCODE 페이지에서 관세사 상담하기를 클릭 시 HSCODE 혹은 궁금한 점을 관세사와 간편하게 상담할 수 있도록 구현
- 높은 채택률을 받은 관세사는 메인 페이지에 우선적으로 노출되도록 하여 사용자들을 신규 고객으로 전환할 수 있는 기회 창출

### 부가 기능
> 무역 뉴스 <br>
- 네이버 뉴스 API를 활용하여 무역과 관련된 뉴스를 제공하고, 유튜브 영상을 활용하여 시각적 가시성 높임

> FTA 정보
사용자가 복잡한 무역 규정을 이해하고,FTA 혜택을 최대한 활용 할 수 있도록 지원

> 무역 통계
K-stat의 통계 자료를 시각적으로 구현
한국의 수출입 금액과 수출입 품목 TOP 5 통계 제공
국가별 수출입 품목 증감율, 수입시장 점유율, TOP 5 수출입품목, 수출입 금액 통계 제공

# 개발 기간 & 인원
> 2024.04 ~ 2024.05
> 이현서, 오지현, 심세현, 전하늘, 강민서
