import os
import time
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

DEFAULT_PPLX_MODEL = os.getenv(
    "PPLX_MODEL", "llama-3.1-sonar-small-128k-online"
)


def _client():
    api_key = os.getenv("PPLX_API_KEY")
    if not api_key:
        return None
    # Perplexity exposes an OpenAI-compatible API
    return OpenAI(api_key=api_key, base_url="https://api.perplexity.ai")


def ask_pplx(prompt: str, retries: int = 3, model: str | None = None) -> str:
    client = _client()
    if client is None:
        return "[Perplexity not configured: set PPLX_API_KEY in environment]"

    model_name = model or DEFAULT_PPLX_MODEL
    for _ in range(retries):
        try:
            resp = client.chat.completions.create(
                model=model_name,
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful safety engineering assistant. Use web results when useful.",
                    },
                    {"role": "user", "content": prompt},
                ],
            )
            return resp.choices[0].message.content.strip()
        except Exception as e:
            print("[PPLX Error]", e)
            time.sleep(2)
    return "[Perplexity failed to respond]"

