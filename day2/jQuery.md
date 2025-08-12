# jQuery란?

**jQuery**는 자바스크립트로 작성된 가장 널리 쓰이는 오픈소스 라이브러리 중 하나입니다.  
웹 개발에서 자주 사용하는 **DOM 조작, 이벤트 처리, AJAX 통신, 애니메이션** 등을  
더 쉽고 간결하게 작성할 수 있도록 도와줍니다.

> **부트스트랩(Bootstrap)**과 마찬가지로, jQuery도 웹 개발을 더 쉽고 빠르게 해주는 도구입니다.  
> (부트스트랩은 주로 디자인/레이아웃, jQuery는 동작/이벤트에 초점이 맞춰져 있습니다.)

---

## jQuery의 주요 특징

- **간단한 문법**  
  복잡한 자바스크립트 코드를 한 줄로 줄일 수 있습니다.
  ```js
  // 순수 JS
  document.getElementById("myDiv").style.color = "red";
  // jQuery (괄호 안에는 고유한 id가 들어가야 함)
  $("#myDiv").css("color", "red");
  ```
  > 여기서 `$("#myDiv")`에서 `#myDiv`는 id가 "myDiv"인 요소를 선택한다는 의미입니다.  
  > 즉, 괄호 안에는 반드시 해당 요소의 고유 id를 넣어주어야 합니다.

- **크로스 브라우저 지원**  
  브라우저마다 다른 동작을 자동으로 맞춰줍니다.

- **DOM 조작**  
  HTML 요소를 쉽게 추가, 삭제, 변경할 수 있습니다.
  ```js
  // jQuery
  $("#list").append("<li>새 항목</li>");
  // 순수 JS
  document.getElementById("list").insertAdjacentHTML("beforeend", "<li>새 항목</li>");
  ```

- **이벤트 처리**  
  클릭, 입력 등 다양한 이벤트를 간단하게 처리할 수 있습니다.
  ```js
  // jQuery
  $("#btn").click(function() {
    alert("버튼 클릭!");
  });
  // 순수 JS
  document.getElementById("btn").addEventListener("click", function() {
    alert("버튼 클릭!");
  });
  ```

- **AJAX 지원**  
  서버와 비동기 통신을 쉽게 구현할 수 있습니다.
  ```js
  // jQuery
  $.get("/data", function(result) {
    console.log(result);
  });
  // 순수 JS (fetch 사용)
  fetch("/data")
    .then(response => response.text())
    .then(result => {
      console.log(result);
    });
  ```

- **애니메이션**  
  fadeIn, slideUp 등 다양한 효과를 손쉽게 적용할 수 있습니다.
  ```js
  // jQuery
  $("#myDiv").fadeIn();
  $("#myDiv").slideUp();
  // 순수 JS (비슷한 효과를 직접 구현해야 함)
  // fadeIn 예시
  const el = document.getElementById("myDiv");
  el.style.opacity = 0;
  el.style.display = "block";
  let op = 0;
  const timer = setInterval(function() {
    if (op >= 1) clearInterval(timer);
    el.style.opacity = op;
    op += 0.1;
  }, 30);
  // slideUp은 직접 height/overflow 속성을 조절하여 구현해야 함
  ```

---

## jQuery의 장점

- **간결한 문법**: 복잡한 JS 코드를 한 줄로 줄일 수 있음
- **크로스 브라우저 호환성**: 다양한 브라우저에서 동일하게 동작
- **풍부한 플러그인**: 슬라이더, 모달 등 다양한 기능을 쉽게 추가 가능
- **학습 곡선이 낮음**: 초보자도 쉽게 배울 수 있음
- **DOM 조작, 이벤트, AJAX, 애니메이션 등 웹 개발의 거의 모든 영역 지원**

## jQuery의 단점

- **최신 JS(ES6+)와 프레임워크(React, Vue 등) 등장으로 사용 빈도 감소**
- **파일 용량**: 별도의 라이브러리 파일을 추가로 불러와야 함
- **성능**: 대규모 프로젝트에서는 순수 JS나 프레임워크보다 느릴 수 있음
- **모던 브라우저에서는 순수 JS로도 대부분의 기능을 쉽게 구현 가능**
- **유지보수**: 최신 웹 트렌드에서는 jQuery보다 React, Vue, Svelte 등 프레임워크가 더 많이 사용됨
- **과거에는** 순수 JS로 DOM 조작, 이벤트 처리, AJAX 등을 하려면 코드가 길고 복잡했지만,  
  **현재(ES6+ 이후)**는 문법이 간결해지고 기능이 많이 추가되어 jQuery 없이도 짧고 쉽게 작성할 수 있습니다.  
  이로 인해 jQuery 사용 빈도가 크게 줄었습니다.

  예시 비교:
  ```js
  // (과거) 순수 JS로 AJAX 요청
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/data");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.send();

  // jQuery
  $.get("/data", function(result) {
    console.log(result);
  });

  // (현재) 최신 JS(fetch)
  fetch("/data")
    .then(res => res.text())
    .then(result => {
      console.log(result);
    });
  ```

---

## jQuery vs. 순수 JS

| 구분       | jQuery                     | 순수 JS                   |
| ---------- | -------------------------- | ------------------------- |
| 문법 간결성 | 간결하고 직관적임         | 다소 복잡할 수 있음      |
| 크로스 브라우저 지원 | 자동으로 처리됨         | 개발자가 신경 써야 함    |
| 성능       | 일반적으로 빠름            | 최적화 시 더 빠를 수 있음 |
| 파일 크기   | 추가적인 파일 필요         | 별도의 파일 필요 없음    |
| 학습 곡선   | 낮음                       | 다소 높음                 |

> **결론**: 작은 프로젝트나 빠른 프로토타입에는 jQuery가 유리할 수 있지만,  
> 대규모 프로젝트나 최신 웹 개발 트렌드에 맞추려면 순수 JS나 현대적인 프레임워크를 고려해야 합니다.