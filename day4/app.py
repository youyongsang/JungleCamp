from flask import Flask, render_template, jsonify, request
import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient  # pymongo를 임포트 하기(패키지 인스톨 먼저 해야겠죠?)

app = Flask(__name__)

# 아래 uri를 복사해둔 uri로 수정하기
uri = "mongodb+srv://yongsang:oQeYKFzKz5Y0xdBu@cluster0.g0bta9q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, 27017)  # MongoDB는 27017 포트로 돌아갑니다.
db = client.dbjungle  # 'dbjungle'라는 이름의 db를 만들거나 사용합니다.


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/memo', methods=['POST'])
def post_article():
    # 1. 클라이언트로부터 데이터를 받기
    url_receive = request.form['url_give']  # 클라이언트로부터 url을 받는 부분
    # 클라이언트로부터 url_give라는 이름의 값을 받는다.
    comment_receive = request.form['comment_give']  # 클라이언트로부터 comment를 받는 부분
    # 클라이언트로부터 comment_give라는 이름의 값을 받는다.

    # 2. meta tag를 스크래핑하기
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(url_receive, headers=headers) #받은 url에 요청을 보내고 응답을 받는다.
    soup = BeautifulSoup(data.text, 'html.parser') #응답받은 html을 파싱한다.

    og_image = soup.select_one('meta[property="og:image"]') #<meta property="og:image"> 태그를 선택한다.
    og_title = soup.select_one('meta[property="og:title"]') #<meta property="og:title"> 태그를 선택한다.
    og_description = soup.select_one('meta[property="og:description"]') #<meta property="og:description"> 태그를 선택한다.

    url_title = og_title['content'] #<meta property="og:title"> 태그의 content 속성 값을 가져온다.
    url_description = og_description['content'] #<meta property="og:description"> 태그의 content 속성 값을 가져온다.
    url_image = og_image['content'] #<meta property="og:image"> 태그의 content 속성 값을 가져온다.

    article = {'url': url_receive, 'title': url_title, 'desc': url_description, 'image': url_image,
               'comment': comment_receive} #새로운 아티클 정보를 담은 딕셔너리

    # 3. MongoDB에 데이터를 넣기
    db.articles.insert_one(article)

    return jsonify({'result': 'success'})


@app.route('/memo', methods=['GET'])
def read_articles():
    # 1. MongoDB에서 _id 값을 제외한 모든 데이터 조회해오기 (Read)
    result = list(db.articles.find({}, {'_id': 0})) 
    #find 첫번째 인자는 조건 두번째 인자는 반환할 필드를 지정한다. 0또는 false는 해당 필드를 제외하겠다는 의미
    # 2. articles라는 키 값으로 article 정보 보내주기
    return jsonify({'result': 'success', 'articles': result})
#success을 result라는 키 값으로, articles라는 키 값으로 전달한다.


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)