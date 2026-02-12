from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')  # Changed from 'home.html' to 'index.html'

@app.route('/chat', methods=['POST'])  # Changed from GET to POST
def chat():
    user_message = request.json['message']  # Changed from request.form to request.json
    response = generate_response(user_message)
    return jsonify({'response': response})  # Changed from 'res' to 'response'

def generate_response(message):
    message = message.lower()
    if 'headache' in message:
        return "Rest in a quiet, dark room. Stay hydrated."
    elif 'fever' in message:
        return "Rest and drink fluids. Monitor your temperature."
    elif 'cough' in message:
        return "Stay hydrated. Honey can help soothe throat."
    elif 'nausea' in message:
        return "Sip water slowly. Eat bland foods."
    elif 'hello' in message or 'hi' in message:
        return "Hello! I'm Cura. How can I help you today?"
    elif 'thank' in message:
        return "You're welcome. Take care!"
    else:
        return "I'm here to help. Can you describe your symptoms?"

if __name__ == '__main__':
    app.run(debug=True)