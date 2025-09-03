import requests
from bs4 import BeautifulSoup

# 타겟 URL을 읽어서 HTML를 받아오고,
headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get('https://www.imdb.com/chart/top/?ref_=nv_mv_250', headers=headers)

# HTML을 BeautifulSoup이라는 라이브러리를 활용해 검색하기 용이한 상태로 만듦
# soup이라는 변수에 "파싱 용이해진 html"이 담긴 상태가 됨
# 이제 코딩을 통해 필요한 부분을 추출하면 된다.
soup = BeautifulSoup(data.text, 'html.parser')
# select를 이용해서, li들을 불러오기
# class 명 앞에는 '.'을 붙여줍니다.
# class 명 내의 띄어쓰기(공백)은 '.'으로 바꾸어 써주세요.
movies = soup.select('.ipc-page-grid__item--span-2 > .ipc-metadata-list--base > li')

# movies(li들)의 반복문을 돌리기
for movie in movies:
    # movie 안에 h3 가 있으면,
    # (조건을 만족하는 첫 번째 요소, 없으면 None을 반환한다.)
    tag_element = movie.select_one('.ipc-title-link-wrapper > h3')
    #만약 select로 하면 리스트로 나오므로 요소만 반환하기 위해서 [0]을 또 해야한다. 
    #그런 번거로움을 줄이기 위해서 select_one을 사용한다. 첫 요소 자동 반환
    print(tag_element)