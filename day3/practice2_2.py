from pymongo import MongoClient           # pymongo를 임포트 하기(패키지 인스톨 먼저 해야겠죠?)
# 아래 uri를 복사해둔 uri로 수정하기
uri = "mongodb+srv://yongsang:oQeYKFzKz5Y0xdBu@cluster0.g0bta9q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, 27017)  # MongoDB는 27017 포트로 돌아갑니다.
db = client.jungle                        # 'jungle'라는 이름의 db를 만듭니다.

# MongoDB에서 데이터 모두 보기
all_users = list(db.users.find({}))

# 참고) MongoDB에서 특정 조건의 데이터 모두 보기
same_ages = list(db.users.find({'age':21}))

print(all_users[0])         # 0번째 결과값을 보기
print(all_users[0]['name']) # 0번째 결과값의 'name'을 보기
user = db.users.find_one({'name':'bobby'})
print(user)

# 그중 특정 키 값을 빼고 보기
user = db.users.find_one({'name':'bobby'},{'_id':False})
print(user)

for user in all_users:      # 반복문을 돌며 모든 결과값을 보기
    print(user)
    
db.users.update_one({'name':'bobby'},{'$set':{'age':19}})
    
user = db.users.find_one({'name':'bobby'})
print(user)

""" 
저장 - 예시
doc = {'name':'bobby','age':21}
db.users.insert_one(doc)

# 한 개 찾기 - 예시
user = db.users.find_one({'name':'bobby'})

# 여러 개 찾기 - 예시 ( _id 값은 제외하고 출력)
same_ages = list(db.users.find({'age':21},{'_id':False}))

# 바꾸기 - 예시
db.users.update_one({'name':'bobby'},{'$set':{'age':19}})

# 지우기 - 예시
db.users.delete_one({'name':'bobby'})
"""