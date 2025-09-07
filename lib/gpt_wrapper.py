import os
import time
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables from .env file
load_dotenv()

# Default to a current, lightweight model; allow override via env
DEFAULT_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")


def _client():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return None
    return OpenAI(api_key=api_key)


def ask_gpt(prompt: str, retries: int = 3, model: str | None = None) -> str:
    client = _client()
    if client is None:
        return "[GPT not configured: set OPENAI_API_KEY in environment]"

    model_name = model or DEFAULT_MODEL
    for _ in range(retries):
        try:
            response = client.chat.completions.create(
                model=model_name,
                messages=[{"role": "user", "content": prompt}],
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            print("[GPT Error]", e)
            time.sleep(2)
    return "[GPT failed to respond]"

