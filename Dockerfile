FROM python:3.11-slim

# System deps for building common wheels
RUN apt-get update && apt-get install -y --no-install-recommends build-essential curl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python deps first (cache-friendly)
COPY requirements.txt /app/requirements.txt
RUN python -m pip install --upgrade pip && \
    pip install --no-cache-dir -r /app/requirements.txt

# Copy app code
COPY . /app

# Vercel sets PORT. Default to 8000 locally.
ENV PORT=8000
ENV STREAMLIT_BROWSER_GATHER_USAGE_STATS=false

# Bind to 0.0.0.0 and the provided PORT
CMD sh -c 'streamlit run "streamlit_app.py" --server.address 0.0.0.0 --server.port '
