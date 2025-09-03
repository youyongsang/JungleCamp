# CSS 스타일 가이드

## 1. 텍스트 스타일링
### 폰트 관련
```css
font-family: /* 폰트 종류 */
  - 'Arial', sans-serif
  - 'Helvetica', sans-serif
  - 'Times New Roman', serif
  - 'Courier New', monospace
  - 'Georgia', serif

font-size: /* 글자 크기 */
  - px (16px, 20px 등)
  - em (1em, 1.2em 등)
  - rem (1rem, 1.5rem 등)
  - % (100%, 120% 등)
  - vw (1vw, 2vw 등)

font-weight: /* 글자 굵기 */
  - normal
  - bold
  - 100 ~ 900
  - lighter
  - bolder

font-style: /* 글자 스타일 */
  - normal
  - italic
  - oblique

text-decoration: /* 텍스트 장식 */
  - none
  - underline
  - overline
  - line-through
  - underline dotted
  - underline wavy

text-transform: /* 텍스트 변환 */
  - none
  - capitalize
  - uppercase
  - lowercase

text-align: /* 텍스트 정렬 */
  - left
  - right
  - center
  - justify

text-shadow: /* 텍스트 그림자 */
  - 2px 2px 4px rgba(0,0,0,0.3)
  - 0 0 10px #fff
```

## 2. 박스 모델
### 크기 관련
```css
width/height: /* 너비/높이 */
  - auto
  - px, em, rem
  - %
  - vw/vh
  - calc(100% - 20px)

max-width/max-height: /* 최대 너비/높이 */
min-width/min-height: /* 최소 너비/높이 */

box-sizing: /* 박스 크기 계산 방법 */
  - content-box
  - border-box
```

### 여백과 테두리
```css
margin: /* 바깥 여백 */
  - auto
  - px, em, rem
  - % 
  - 10px 20px 30px 40px (상우하좌)
  - 10px 20px (상하 좌우)

padding: /* 안쪽 여백 */
  - px, em, rem
  - %
  - 10px 20px 30px 40px (상우하좌)
  - 10px 20px (상하 좌우)

border: /* 테두리 */
  - none
  - 1px solid black
  - 2px dashed red
  - 3px dotted blue
  - 4px double green

border-radius: /* 모서리 둥글기 */
  - px, em, rem
  - %
  - 50% (원형)
  - 10px 20px 30px 40px (좌상 우상 우하 좌하)
```

## 3. 배경
```css
background: /* 배경 통합 속성 */
background-color: /* 배경색 */
  - #ffffff
  - rgb(255, 255, 255)
  - rgba(255, 255, 255, 0.5)
  - transparent

background-image: /* 배경 이미지 */
  - url('이미지경로')
  - linear-gradient(방향, 색상1, 색상2)
  - radial-gradient(색상1, 색상2)
  
background-repeat: /* 배경 반복 */
  - repeat
  - no-repeat
  - repeat-x
  - repeat-y
  
background-position: /* 배경 위치 */
  - center
  - top left
  - 50% 50%
  - 0px 0px
  
background-size: /* 배경 크기 */
  - cover
  - contain
  - auto
  - 100% 100%
```

## 4. 플렉스박스 (Flexbox)
```css
display: flex;

flex-direction: /* 방향 */
  - row
  - row-reverse
  - column
  - column-reverse

flex-wrap: /* 줄바꿈 */
  - nowrap
  - wrap
  - wrap-reverse

justify-content: /* 가로축 정렬 */
  - flex-start
  - flex-end
  - center
  - space-between
  - space-around
  - space-evenly

align-items: /* 세로축 정렬 */
  - stretch
  - flex-start
  - flex-end
  - center
  - baseline

gap: /* 아이템 간격 */
  - 10px
  - 10px 20px
```

## 5. 그리드 (Grid)
```css
display: grid;

grid-template-columns: /* 열 구성 */
  - repeat(3, 1fr)
  - 100px 1fr 2fr
  - minmax(100px, 1fr)
  
grid-template-rows: /* 행 구성 */
  - repeat(3, 100px)
  - auto 1fr auto
  
gap: /* 격자 간격 */
  - 10px
  - 10px 20px

grid-column: /* 열 위치/병합 */
  - span 2
  - 1 / 3
  
grid-row: /* 행 위치/병합 */
  - span 2
  - 1 / 3
```

## 6. 트랜지션과 애니메이션
```css
transition: /* 전환 효과 */
  - all 0.3s ease
  - opacity 0.5s ease-in-out
  - transform 0.3s cubic-bezier(.17,.67,.83,.67)

transform: /* 변형 */
  - scale(1.1)
  - rotate(45deg)
  - translateX(100px)
  - skew(10deg)
  - matrix(1, 0, 0, 1, 0, 0)

@keyframes 애니메이션이름 {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

animation: /* 애니메이션 */
  - 애니메이션이름 2s infinite
  - bounce 1s ease-in-out
  - slide 3s forwards
```

## 7. 위치 지정
```css
position: /* 위치 기준 */
  - static
  - relative
  - absolute
  - fixed
  - sticky

z-index: /* 쌓임 순서 */
  - auto
  - 0
  - 1
  - -1
  - 999

top/right/bottom/left: /* 위치 값 */
  - auto
  - px, em, rem
  - %
```

## 8. 필터 효과
```css
filter: /* 시각적 효과 */
  - blur(5px)
  - brightness(150%)
  - contrast(200%)
  - grayscale(100%)
  - sepia(100%)
  - hue-rotate(90deg)
  - invert(100%)
  - opacity(50%)
  - saturate(200%)
  - drop-shadow(16px 16px 20px blue)
```

## 9. 마스크와 클리핑
```css
clip-path: /* 요소 클리핑 */
  - circle(50% at 50% 50%)
  - polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)
  - ellipse(25% 40% at 50% 50%)
  - inset(5px 20px 15px 10px)

mask-image: /* 마스크 이미지 */
  - url('mask.png')
  - linear-gradient(black, transparent)
```

## 10. 고급 선택자
```css
/* 자식 선택자 */
.parent > .child

/* 자손 선택자 */
.ancestor .descendant

/* 인접 형제 선택자 */
.element + .sibling

/* 일반 형제 선택자 */
.element ~ .siblings

/* 속성 선택자 */
[type="text"]
[data-state="active"]

/* 가상 클래스 */
:hover
:focus
:active
:first-child
:last-child
:nth-child(2n)
:not(.excluded)

/* 가상 요소 */
::before
::after
::first-line
::selection
```

## 11. 반응형 디자인
```css
/* 미디어 쿼리 */
@media (max-width: 768px) {
  /* 모바일 스타일 */
}

@media (min-width: 769px) and (max-width: 1024px) {
  /* 태블릿 스타일 */
}

@media (min-width: 1025px) {
  /* 데스크톱 스타일 */
}

/* 화면 방향 */
@media (orientation: portrait) {
  /* 세로 모드 */
}

@media (orientation: landscape) {
  /* 가로 모드 */
}
```