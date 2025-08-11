from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')  # 루트 페이지 제공

@app.route('/save', methods=['POST'])
def save():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    print(f"제목: {title}, 내용: {content}")
    return jsonify({'message': '저장 성공!'})

# 선택: 파비콘 404 제거
@app.route('/favicon.ico')
def favicon():
    return ('', 204)

if __name__ == '__main__':
    app.run(debug=True)
