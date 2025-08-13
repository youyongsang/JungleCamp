from pymongo import MongoClient           # pymongo를 임포트 하기(패키지 인스톨 먼저 해야겠죠?)
# 아래 uri를 복사해둔 uri로 수정하기
uri = "mongodb+srv://yongsang:oQeYKFzKz5Y0xdBu@cluster0.g0bta9q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, 27017)  # MongoDB는 27017 포트로 돌아갑니다.
db = client.dbjungle  
target_movie = db.movies.find_one({'title':'포레스트 검프'})
target_year = target_movie['released_year']

movies = list(db.movies.find({'released_year': target_year}))

for movie in movies:
    print(movie['title'])