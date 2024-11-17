from api import Todo, db, app

with app.app_context():
    todo = Todo(content="Buy groceries")
    second_todo = Todo(content="Clean the house")
    db.session.add(todo)
    db.session.add(second_todo)
    db.session.commit()
