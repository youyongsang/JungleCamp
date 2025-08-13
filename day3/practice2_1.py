from pymongo import MongoClient           # pymongo를 임포트 하기(패키지 인스톨 먼저 해야겠죠?)
# 아래 uri를 복사해둔 uri로 수정하기
uri = "mongodb+srv://yongsang:oQeYKFzKz5Y0xdBu@cluster0.g0bta9q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, 27017)  # MongoDB는 27017 포트로 돌아갑니다.
db = client.jungle                        # 'jungle'라는 이름의 db를 만듭니다.

# 'users'라는 collection에 {'name':'bobby','age':21}를 넣습니다.
db.users.insert_one({'name':'bobby','age':21})
db.users.insert_one({'name':'kay','age':27})
db.users.insert_one({'name':'john','age':30})