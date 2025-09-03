import requests
from bs4 import BeautifulSoup

# requests는 웹사이트에 HTTP 요청을 보내고, 응답(HTML, JSON 등)을 받아오는 파이썬 라이브러리입니다.
# 즉, 웹 브라우저처럼 원하는 주소에 접속해서 데이터를 가져올 수 있게 해줍니다.

# 타겟 URL을 읽어서 HTML를 받아오고,
headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get('https://www.imdb.com/chart/top/?ref_=nv_mv_250', headers=headers) 
# 해당 사이트의 html을 받아옴

# HTML을 BeautifulSoup이라는 라이브러리를 활용해 검색하기 용이한 상태로 만듦
# soup이라는 변수에 "파싱 용이해진 html"이 담긴 상태가 됨
# 이제 코딩을 통해 필요한 부분을 추출하면 된다.
# BeautifulSoup은 HTML 문서를 파이썬에서 쉽게 탐색하고 원하는 정보를 추출할 수 있도록 도와주는 라이브러리입니다.
# requests로 웹사이트의 HTML 코드를 받아온 뒤, 이 HTML을 바로 사용하면 태그가 복잡하게 얽혀 있어서 원하는 데이터를 찾기 어렵습니다.
# BeautifulSoup을 사용하면 HTML을 "파싱"해서 태그별로 구조화된 객체로 만들어주고,
# 원하는 태그, 클래스, id 등을 손쉽게 검색하거나 추출할 수 있습니다.
# 즉, BeautifulSoup이 없다면 HTML에서 원하는 정보를 직접 문자열로 찾거나 복잡한 정규표현식을 써야 하지만,
# BeautifulSoup을 쓰면 간단한 코드로 원하는 데이터를 쉽게 뽑아낼 수 있습니다.

soup = BeautifulSoup(data.text, 'html.parser')
#data.text는 받아온 HTML의 텍스트 부분을 의미하며, 'html.parser'는 HTML을 파싱할 때 사용할 파서입니다.
#.text로 받아와서 문자열(유니코드)로 디코딩됩니다.
#parser는 파이썬 표준 라이브러리 기반 내장 파서입니다.
# select를 이용해서, li들을 불러오기
# class 명 앞에는 '.'을 붙여줍니다.
# class 명 내의 띄어쓰기(공백)은 '.'으로 바꾸어 써주세요.
movies = soup.select('.ipc-page-grid__item--span-2 > .ipc-metadata-list--base > li')
# select는 CSS 선택자를 사용하여 HTML 요소를 선택하는 메서드입니다. 
# CSS 선택자 설명 (BeautifulSoup의 soup.select(...)에 그대로 사용 가능)
# '.ipc-page-grid__item--span-2 > .ipc-metadata-list--base > li'
#
# 의미:
# 1) .ipc-page-grid__item--span-2  클래스를 가진 요소의
# 2) 직계 자식(>) 중  .ipc-metadata-list--base  클래스를 가진 요소의
# 3) 다시 그 직계 자식(>)인  모든 li  요소를 선택한다.
#
# 구조 예시:
# <div class="ipc-page-grid__item--span-2">
#   <ul class="ipc-metadata-list--base">
#     <li>← 이 li 들이 선택됨</li>
#     <li>...</li>
#   </ul>
# </div>
#
# 선택자 구성 요소:
# - .classname  : 해당 클래스를 가진 요소를 의미 (점(.)은 클래스 선택자)
# - >           : 직계(바로 아래 단계) 자식 결합자 (후손 전체가 아니라 한 단계만)
# - li          : 태그명이 li 인 요소
#
# 주의:
# - IMDb는 ipc-로 시작하는 클래스명이 자주 바뀌어 이 선택자가 0건이 될 수 있음.
# - 더 견고하게 하려면 링크 패턴 등 덜 변하는 특징을 사용:
#   예) 'li a[href^="/title/tt"]'  # 영화 상세 페이지로 가는 링크를 기준으로 선택
#
# 브라우저 콘솔에서 빠른 테스트(크롬 DevTools):
#   $$('.ipc-page-grid__item--span-2 > .ipc-metadata-list--base > li').length
#
# BeautifulSoup 사용 예:
#   items = soup.select('.ipc-page-grid__item--span-2 > .ipc-metadata-list--base > li')
#   for it in items:
#       a = it.select_one('a[href^="/title/tt"]')
#       title = a.get_text(strip=True) if a else None
#       print(title)

# movies(li들)의 반복문을 돌리기
for movie in movies:
    # movie 안에 h3가 있으면,
    # (조건을 만족하는 첫 번째 요소, 없으면 None을 반환한다.)
    tag_element = movie.select_one('.ipc-title-link-wrapper > h3')
    #select_one : 조건에 맞는 첫 번째 요소를 선택
    if not tag_element: #none반환 시 그냥 넘어감
        continue
    # h3의 text를 찍어본다.
    print(tag_element.text) #html의 텍스트 부분만 가져옴
    #ex) [<h3 class="ipc-title__text ipc-title__text--reduced">25. 그린 마일</h3>]
    # 여기서 text를 가져오면 "25. 그린 마일"이라는 문자열만 남게 된다.
    