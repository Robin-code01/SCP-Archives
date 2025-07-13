import sqlite3
from bs4 import BeautifulSoup
import html2text

# --- CONFIG ---
DB_PATH = "scp.db"  # Path to your scp_entries database
USERNAME = "admin"
PASSWORD = "scpsecure"

# --- Helper: Clean & Convert HTML ---
def process_html(html):
    soup = BeautifulSoup(html, "html.parser")

    # Remove unwanted elements (rating boxes, nav, license boxes)
    for div in soup.select(".page-rate-widget-box, .footer-wikiwalk-nav, .licensebox"):
        div.decompose()

    # Replace images with placeholders
    for img in soup.find_all("img"):
        alt_text = img.get("alt", "SCP Image")
        img.replace_with(f"[IMAGE: {alt_text}]")

    # Convert to plain text markdown
    html_str = str(soup)
    md = html2text.html2text(html_str)
    return md

# --- CLI App Instead of Textual (Non-interactive fallback) ---
def main():
    print("Welcome to SCP Terminal")

    # Non-interactive environment fallback
    username = USERNAME
    password = PASSWORD
    print(f"Using default credentials: {username}/{password}")

    if username != USERNAME or password != PASSWORD:
        print("Invalid credentials. Exiting.")
        return

    print("Login successful. Fetching SCP entries...")

    # Predefined list of SCP IDs to simulate input
    scp_ids = ["SCP-002", "SCP-173", "SCP-999"]

    for scp_id in scp_ids:
        print(f"\n=== {scp_id} ===")
        article = fetch_scp(scp_id)
        if article:
            md = process_html(article)
            print("\n" + md + "\n")
        else:
            print(f"SCP {scp_id} not found.")

def fetch_scp(scp_id):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("SELECT full_article_html FROM scp_entries WHERE id = ?", (scp_id,))
        row = cursor.fetchone()
        conn.close()
        return row[0] if row else None
    except Exception as e:
        print(f"Error fetching SCP: {e}")
        return None

if __name__ == "__main__":
    main()

