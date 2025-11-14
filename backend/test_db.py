from sqlalchemy import create_engine, text

DATABASE_URL = "mysql+pymysql://root:ishan@localhost:3306/granola_ai"

print("Using URL:", repr(DATABASE_URL))

engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT DATABASE();"))
        print("Connected to:", result.scalar())
except Exception as e:
    print("Error:", e)
