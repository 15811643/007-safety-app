import openai
import time
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

MODEL = "gpt-5"
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def ask_gpt(prompt, retries=3, model=MODEL):
    for _ in range(retries):
        try:
            response = client.chat.completions.create(
                model=model,
                messages=[{"role": "user", "content": prompt}],
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            print("[GPT Error]", e)
            time.sleep(2)
    return "[GPT failed to respond]"