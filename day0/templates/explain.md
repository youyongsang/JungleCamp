# CSS 상세 설명서

## 1. CSS란?
CSS(Cascading Style Sheets)는 HTML 등 마크업 언어로 작성된 문서의 **스타일(모양, 레이아웃, 색상 등)**을 지정하는 스타일 시트 언어입니다.  
HTML이 문서의 구조(뼈대)를 담당한다면, CSS는 그 구조에 **디자인과 배치**를 입힙니다.

---

## 2. CSS의 기본 구조

```css
선택자 {
  속성1: 값1;
  속성2: 값2;
  /* ... */
}
```
- **선택자(Selector):** 어떤 HTML 요소에 스타일을 적용할지 지정  
- **속성(Property):** 적용할 스타일의 종류  
- **값(Value):** 속성에 부여할 구체적인 값

---

## 3. 선택자(Selector) 종류

- **태그 선택자**: `div`, `p`, `h1` 등 태그 이름으로 선택  
- **클래스 선택자**: `.className` (여러 요소에 적용 가능)  
- **아이디 선택자**: `#idName` (문서 내 유일)  
- **자식/후손 선택자**: `div > p`, `ul li`  
- **속성 선택자**: `input[type="text"]`  
- **가상 클래스/요소**: `a:hover`, `p::first-line` 등

---

## 4. CSS 속성(Property) 종류와 기능

### 4.1 레이아웃(Layout)
- **display**: 요소의 박스 유형(블록, 인라인, flex, grid 등)  
- **position**: 위치 지정 방식(static, relative, absolute, fixed, sticky)  
  - **absolute**:  
    - 💬 학생: "absolute는 무조건 부모 요소를 기준으로 움직이는 건가요?"  
    - 🧑‍🏫 답변: **아니요, 부모 요소 중에서 `position: relative`가 설정된 요소가 있으면 그걸 기준으로 하고, 없으면 브라우저 화면(body)을 기준으로 움직여요.**
  - **fixed**:  
    - 🐥 학생: "fixed랑 absolute의 차이는 뭔가요?"  
    - 🧑‍🏫 답변: **fixed는 화면을 기준으로 고정되기 때문에, 스크롤해도 움직이지 않아요. absolute는 기준이 되는 부모(또는 body)에 따라 움직입니다.**
- **top, right, bottom, left**: 위치 좌표  
- **float, clear**: 요소의 띄움/흐름 제어  
- **z-index**: 쌓임 순서(레이어)  
- **overflow**: 넘치는 내용 처리(scroll, hidden 등)  
- **flex, grid**: 유연한 레이아웃 배치

### 4.2 크기와 여백
- **width, height**: 너비, 높이  
- **min/max-width/height**: 최소/최대 크기  
- **margin**: 바깥 여백(상,하,좌,우 개별 지정 가능)  
- **padding**: 안쪽 여백(상,하,좌,우 개별 지정 가능)  
- **box-sizing**: 박스 크기 계산 방식(content-box, border-box)

### 4.3 테두리와 배경
- **border**: 테두리 두께, 스타일, 색상  
- **border-radius**: 모서리 둥글게  
- **background-color**: 배경색  
- **background-image**: 배경 이미지  
- **background-repeat, background-position, background-size**: 배경 이미지 반복, 위치, 크기

### 4.4 글꼴과 텍스트
- **font-family**: 글꼴 종류  
- **font-size**: 글자 크기  
- **font-weight**: 글자 두께  
- **font-style**: 이탤릭 등  
- **color**: 글자 색  
- **text-align**: 정렬(왼쪽, 가운데, 오른쪽 등)  
- **text-decoration**: 밑줄, 취소선 등  
- **line-height**: 줄 간격  
- **letter-spacing, word-spacing**: 글자/단어 간격  
- **text-transform**: 대소문자 변환

### 4.5 리스트와 표
- **list-style-type, list-style-image**: 목록 기호, 이미지  
- **border-collapse, border-spacing**: 표 테두리 합치기, 간격  
- **caption-side**: 표 제목 위치

### 4.6 트랜지션과 애니메이션
- **transition**: 속성 변화 애니메이션  
- **animation**: 키프레임 기반 애니메이션  
- **@keyframes**: 애니메이션 단계 정의

### 4.7 기타
- **opacity**: 투명도  
- **cursor**: 마우스 커서 모양  
- **visibility**: 보임/숨김  
- **pointer-events**: 마우스 이벤트 허용 여부  
- **filter**: 흐림, 색상 등 효과  
- **box-shadow, text-shadow**: 그림자 효과

---

## 💬 학생 질문 예시와 답변

- 💬 "absolute는 무조건 부모 요소를 기준으로 움직이는 건가요?"  
  🧑‍🏫 **아니요, 부모 요소 중에서 `position: relative`가 설정된 요소가 있으면 그걸 기준으로 하고, 없으면 브라우저 화면(body)을 기준으로 움직여요.**

- 🐥 "fixed랑 absolute의 차이는 뭔가요?"  
  🧑‍🏫 **fixed는 화면을 기준으로 고정되기 때문에, 스크롤해도 움직이지 않아요. absolute는 기준이 되는 부모(또는 body)에 따라 움직입니다.**

- 💬 "z-index는 왜 필요한가요?"  
  🧑‍🏫 **여러 요소가 겹칠 때, 어떤 요소가 위에 보일지 순서를 정하는 속성입니다. 값이 클수록 위에 보입니다.**

- 🐥 "margin과 padding의 차이는 뭔가요?"  
  🧑‍🏫 **margin은 요소 바깥 여백, padding은 요소 안쪽(테두리와 내용 사이) 여백입니다.**

- 💬 "display: none과 visibility: hidden의 차이는?"  
  🧑‍🏫 **display: none은 요소가 아예 사라져서 공간도 차지하지 않고, visibility: hidden은 요소가 보이지 않지만 공간은 그대로 남아 있습니다.**

---

## 5. CSS 적용 방법

1. **인라인 스타일**  
   ```html
   <p style="color:red;">텍스트</p>
   ```
2. **내부 스타일 시트**  
   ```html
   <style>
     p { color: red; }
   </style>
   ```
3. **외부 스타일 시트**  
   ```html
   <link rel="stylesheet" href="style.css">
   ```

---

## 6. 상속과 우선순위

- **상속**: 일부 속성(글꼴, 색상 등)은 부모 요소의 값을 자식이 물려받음  
- **우선순위**:  
  1. 인라인 스타일 >  
  2. 아이디 선택자 >  
  3. 클래스/속성/가상 선택자 >  
  4. 태그 선택자  
- **!important**: 강제 적용(권장X)

---

## 7. 미디어 쿼리와 반응형 디자인

- **미디어 쿼리**: 화면 크기, 기기 종류에 따라 스타일 변경  
  ```css
  @media (max-width: 600px) {
    body { font-size: 14px; }
  }
  ```

---

## 8. CSS 예시 (확장 및 상세 설명)

```css
/* 1. 전체 배경색, 폰트 지정 */
body {
  background-color: #f5f5f5;         /* 전체 배경을 연한 회색으로 */
  font-family: 'Arial', sans-serif;  /* Arial 폰트, 없으면 기본 산세리프 */
  color: #222;                       /* 전체 글자색을 진한 회색으로 */
  margin: 0;                         /* 브라우저 기본 여백 제거 */
  padding: 0;
}

/* 2. 제목 스타일 */
h1, h2 {
  color: #2c3e50;                    /* 제목 글자색 */
  margin-bottom: 16px;               /* 아래쪽 여백 */
  letter-spacing: 1px;               /* 글자 간격 */
}

/* 3. 버튼 스타일 */
button {
  background: #3498db;               /* 파란색 배경 */
  color: #fff;                       /* 흰색 글자 */
  border: none;                      /* 테두리 없음 */
  padding: 8px 16px;                 /* 상하 8px, 좌우 16px 여백 */
  border-radius: 4px;                /* 모서리 둥글게 */
  cursor: pointer;                   /* 마우스 올리면 손가락 모양 */
  transition: background 0.3s;       /* 배경색 변화 애니메이션 */
  font-size: 16px;                   /* 글자 크기 */
  margin-right: 8px;                 /* 버튼 사이 여백 */
}
button:hover {
  background: #217dbb;               /* 마우스 올리면 더 진한 파랑 */
}

/* 4. 입력 폼 스타일 */
input[type="text"], textarea {
  width: 100%;                       /* 가로 전체 사용 */
  padding: 8px;                      /* 안쪽 여백 */
  margin-bottom: 10px;               /* 아래쪽 여백 */
  border: 1px solid #ccc;            /* 연한 회색 테두리 */
  border-radius: 4px;                /* 모서리 둥글게 */
  font-size: 15px;
  box-sizing: border-box;            /* 패딩 포함한 크기 계산 */
  resize: vertical;                  /* textarea 세로 크기 조절 가능 */
}

/* 5. 게시글 목록 스타일 */
#posts {
  background: #fff;                  /* 흰색 배경 */
  border-radius: 8px;                /* 모서리 둥글게 */
  box-shadow: 0 2px 8px rgba(0,0,0,0.05); /* 약한 그림자 */
  padding: 20px;
  margin-bottom: 30px;
}

/* 6. 게시글 아이템 스타일 */
.post {
  border-bottom: 1px solid #eee;     /* 아래쪽 연한 구분선 */
  padding: 12px 0;
}
.post:last-child {
  border-bottom: none;               /* 마지막 게시글은 구분선 없음 */
}
.post-title {
  font-weight: bold;
  font-size: 18px;
  color: #34495e;
}
.post-content {
  margin: 5px 0 0 10px;
  color: #555;
  font-size: 15px;
}

/* 7. 반응형 디자인: 모바일에서 폰트와 패딩 축소 */
@media (max-width: 600px) {
  body { font-size: 14px; }
  #posts { padding: 10px; }
  button { font-size: 14px; padding: 6px 10px; }
  .post-title { font-size: 16px; }
}

/* 8. 링크 스타일 */
a {
  color: #2980b9;
  text-decoration: none;
  transition: color 0.2s;
}
a:hover {
  color: #e67e22;
  text-decoration: underline;
}

/* 9. 애니메이션 예시 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
#posts {
  animation: fadeIn 0.7s;
}
```

### 각 예시별 설명

- **body, h1, h2**: 전체 배경, 폰트, 제목 색상 및 여백 지정
- **button**: 버튼의 색상, 크기, 애니메이션, 마우스 오버 효과
- **input, textarea**: 입력창의 크기, 테두리, 패딩, 반응형 처리
- **#posts, .post, .post-title, .post-content**: 게시글 목록과 각 게시글의 구분선, 배경, 그림자, 폰트 크기 등
- **@media**: 화면이 좁아질 때(모바일) 폰트와 패딩을 줄여 가독성 유지
- **a, a:hover**: 링크 색상과 마우스 오버 효과
- **@keyframes, animation**: 게시글 목록이 부드럽게 나타나는 효과

이처럼 CSS는 다양한 속성과 선택자를 조합해 웹페이지의 시각적 요소와 사용자 경험을 풍부하게 만듭니다.

---

## 9. 참고

- [MDN CSS 문서](https://developer.mozilla.org/ko/docs/Web/CSS)
- [W3Schools CSS 튜토리얼](https://www.w3schools.com/css/)
- [CSS-Tricks](https://css-tricks.com/)