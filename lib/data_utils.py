import pandas as pd

def validate_csv(file) -> pd.DataFrame:
    try:
        df = pd.read_csv(file)
        if df.empty:
            raise ValueError("CSV is empty")
        return df
    except Exception as e:
        raise ValueError(f"Invalid CSV: {e}")

def has_column(df, column):
    return column in df.columns

def get_summary_prompt(df: pd.DataFrame):
    return f"Summarize this safety inspection dataset:\n{df.head(5).to_string()}"