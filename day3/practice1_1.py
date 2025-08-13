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

print(len(movies)) # 25

for movie in movies:
    print(movie)