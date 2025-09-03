from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
CORS(app)

# 1) MongoDB 연결 (환경에 맞게 주소/DB명 바꾸세요)
client = MongoClient("mongodb://localhost:27017/")
db = client["mydatabase"]
posts_col = db["posts"]

# 2) 루트 페이지 (templates/index.html 사용 중이라면 그대로)
@app.route("/")
def index():
    return render_template("index.html")

# 3) 게시글 저장 (프론트의 fetch('/save')와 매칭)
@app.route("/save", methods=["POST"])
def save_post():
    data = request.get_json(force=True)
    title = (data.get("title") or "").strip()
    content = (data.get("content") or "").strip()

    if not title or not content:
        return jsonify({"message": "제목/내용이 비었습니다."}), 400

    doc = {"title": title, "content": content}
    result = posts_col.insert_one(doc)
    return jsonify({"message": "저장 성공!", "id": str(result.inserted_id)}), 201

# 4) 게시글 목록 (프론트의 fetch('/posts')와 **꼭** 매칭)
@app.route("/posts", methods=["GET"])
def list_posts():
    # 방법 A: _id를 문자열로 변환해서 내려주기
    docs = []
    for d in posts_col.find().sort("_id", 1):  # 오래된→최신 (프론트에서 reverse 하므로 OK)
        d["_id"] = str(d["_id"])               # ObjectId -> 문자열
        docs.append(d)
    return jsonify(docs), 200

    # 방법 B: _id를 아예 제외하고 싶은 경우 (위 대신 아래 사용)
    # docs = list(posts_col.find({}, {"_id": 0}).sort("_id", 1))
    # return jsonify(docs), 200

# (선택) 파비콘 204 처리로 404 로그 줄이기
@app.route("/favicon.ico")
def favicon():
    return ("", 204)

if __name__ == "__main__":
    app.run(debug=True)