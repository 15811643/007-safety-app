import openai
import time
import os

MODEL = "gpt-4"
openai.api_key = os.getenv("OPENAI_API_KEY")

def ask_gpt(prompt, retries=3, model=MODEL):
    for _ in range(retries):
        try:
            response = openai.ChatCompletion.create(
                model=model,
                messages=[{"role": "user", "content": prompt}],
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            print("[GPT Error]", e)
            time.sleep(2)
    return "[GPT failed to respond]"