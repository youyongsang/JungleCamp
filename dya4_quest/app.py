from flask import Flask, request, jsonify, render_template
from pymongo import MongoClient

app = Flask(__name__)

uri = "mongodb+srv://yongsang:oQeYKFzKz5Y0xdBu@cluster0.g0bta9q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, 27017)
db = client.dbjungle

@app.route('/')
def home():
    return render_template('day1.html')

@app.route('/guestbook', methods=['POST'])
def save_guestbook():
    name = request.form.get('name')
    msg = request.form.get('msg')
    owner = request.form.get('owner')
    if not name or not msg or not owner:
        return jsonify({'result': 'fail', 'error': '입력값 부족'})
    doc = {'name': name, 'msg': msg, 'owner': owner}
    db.guestbook.insert_one(doc)
    return jsonify({'result': 'success'})

@app.route('/guestbook', methods=['GET'])
def get_guestbook():
    owner = request.args.get('owner')
    query = {'owner': owner} if owner else {}
    result = list(db.guestbook.find(query, {'_id': 0}))
    return jsonify({'result': 'success', 'guestbook': result})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)