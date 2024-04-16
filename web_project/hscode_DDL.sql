/* HSCODE 앞4자리 테이블*/
DROP TABLE headings;
CREATE TABLE headings
(
    hs_4digit VARCHAR2(10) PRIMARY KEY          -- hs code 앞 4자리
    , ko_description VARCHAR2(2000) NOT NULL    -- 한글 설명
    , eng_description VARCHAR2(2000) NOT NULL   -- 영문 설명
);

select * from headings;

/*HSCODE 10자리 테이블*/
DROP TABLE subheadings;

CREATE TABLE subheadings
(
    subhead_seq NUMBER PRIMARY KEY              -- 일련번호
    , hs_4digit VARCHAR2(10) REFERENCES headings(hs_4digit) ON DELETE CASCADE   -- hscode 앞4자리
    , hs_6digit VARCHAR2(10)    -- hs code 가운데 2자리(6자리중 뒤2자리)
    , hs_10digit VARCHAR2(10)   -- hs code 마지막 4자리(10자리중 뒤4자리)
    , hs_all VARCHAR2(20)       -- hs code 전체 10자리
    , ko_description VARCHAR2(2000) NOT NULL    -- 한글 설명
    , eng_description VARCHAR2(2000) NOT NULL   -- 영문 설명
);

select * from subheadings;

/*품목별 통계 테이블 - 수출입 top5국가*/
DROP TABLE country_top5;
DROP SEQUENCE top5_seq;

CREATE TABLE country_top5
(
    top5_seq NUMBER PRIMARY KEY          -- 일련번호
    , hs_4digit VARCHAR2(10) NOT NULL    -- hs code 앞4자리
    , country_name VARCHAR2(30) NOT NULL -- 국가명
    , export_ranking NUMBER NOT NULL     -- 수출순위
    , export_amount NUMBER NOT NULL      -- 수출액
    , import_ranking NUMBER NOT NULL     -- 수입순위
    , import_amount NUMBER NOT NULL      -- 수입액
);
CREATE SEQUENCE top5_seq;
select * from country_top5;


/*품목별 통계 테이블 - 5년간 수출입 통계*/
DROP TABLE year_imex5;
DROP SEQUENCE year_seq;

CREATE TABLE year_imex5
(
    year_seq NUMBER PRIMARY KEY
    , hs_4digit VARCHAR2(10)
    , imex_year VARCHAR2(10)
    , export_amount NUMBER
    , import_amount NUMBER
);
