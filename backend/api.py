from flask import Flask, json, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)  # instantiate the Flask app
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///example.db"
db = SQLAlchemy(app)
CORS(app)


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)

    def __str__(self):
        return f"{self.id}, {self.content}"


def todo_serializer(todo):
    return {"id": todo.id, "content": todo.content}


@app.route("/api", methods=["GET"])
def index():
    return jsonify([*map(todo_serializer, Todo.query.all())])


@app.route("/api/create", methods=["POST"])
def create():
    # request_data = json.loads(request.data)
    # todo = Todo(content=request_data["content"])

    # db.session.add(todo)
    # db.session.commit()

    # return {"201": "todo created successfully"}
    data = request.get_json()
    new_todo = Todo(content=data["content"])
    db.session.add(new_todo)
    db.session.commit()
    return jsonify({"message": "Todo created successfully"}), 201


@app.route("/api/<int:id>", methods=["GET"])
def show(id):
    todo = Todo.query.filter_by(id=id).first()
    if todo:
        return jsonify({"id": todo.id, "content": todo.content})
    else:
        return jsonify({"error": "Todo not found"}), 404


@app.route("/api/<int:id>", methods=["PUT"])
def update_todo(id):
    data = request.get_json()
    todo = Todo.query.get(id)
    if todo:
        todo.content = data["content"]
        db.session.commit()
        return jsonify({"message": "Todo updated successfully"}), 200
    else:
        return jsonify({"error": "Todo not found"}), 404


@app.route("/api/<int:id>", methods=["DELETE"])
def delete_todo(id):
    todo = Todo.query.get(id)
    if todo:
        db.session.delete(todo)
        db.session.commit()
        return jsonify({"message": "Todo deleted successfully"}), 200
    else:
        return jsonify({"error": "Todo not found"}), 404


if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # create the database and tables
    app.run(debug=True, port=5001)  # run the app in debug mode
