from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('day2-challenge.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5012, debug=True)