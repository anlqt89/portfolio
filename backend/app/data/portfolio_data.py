import json
import os

_data_path = os.path.join(os.path.dirname(__file__), "resume.json")

with open(_data_path, "r") as f:
    PORTFOLIO_DATA = json.load(f)
