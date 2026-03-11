import os
from dotenv import load_dotenv

load_dotenv()


OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
print("API KEY:", OPENAI_API_KEY[:12])
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS", "")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "")