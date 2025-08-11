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

## 8. CSS 예시

```css
/* 전체 배경색, 폰트 지정 */
body {
  background-color: #f5f5f5;
  font-family: 'Arial', sans-serif;
}

/* 버튼 스타일 */
button {
  background: #3498db;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}
button:hover {
  background: #217dbb;
}
```

---

## 9. 참고

- [MDN CSS 문서](https://developer.mozilla.org/ko/docs/Web/CSS)
-