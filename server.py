from flask import Flask, jsonify, request
from flask_cors import CORS

from data import events

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def welcome():
    return jsonify({"message": "Welcome!"}), 200


@app.route("/events", methods=["GET"])
def get_events():
    return jsonify(events), 200


@app.route("/events", methods=["POST"])
def add_event():
    data = request.get_json(silent=True) or {}
    title = data.get("title")

    if not title:
        return jsonify({"error": "Field 'title' is required"}), 400

    new_id = max((e["id"] for e in events), default=0) + 1
    new_event = {"id": new_id, "title": title}
    events.append(new_event)
    return jsonify(new_event), 201


if __name__ == "__main__":
    app.run(debug=True)
