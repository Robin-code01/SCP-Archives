import requests
from bs4 import BeautifulSoup
import sqlite3


def main():

    URLS = [None] * 1001
    exception_counter = 0

    conn = sqlite3.connect("../scp.db")
    db = conn.cursor()
    fi = 0

    for i in range(2, 1001):

        if i < 1000:
            fi = f"{i:03}"
        else:
            fi = i

        URLS[i] = f"https://scp-wiki.wikidot.com/scp-{fi}"

    for url in URLS:
        if url is None:
            continue

        scp = requests.get(url)
        print(scp)
        # Checks for any errors:
        if scp.status_code != 200:
            print(f"Error: {scp.status_code}")
            continue

        soup = BeautifulSoup(scp.text, "html.parser")

        item_number = f"SCP-{fi}"
        object_class = None
        level = None
        disruption_class = None
        risk_class = None
        secondary_class = None

        full_article_html = soup.find(id="page-content")
        style = soup.find_all("style")

        anom_bar_container = soup.find("div", class_="anom-bar-container")

        if anom_bar_container is None:
            p_tags = soup.find_all("p")

            for p in p_tags:
                strong = p.find("strong")
                if strong:
                    if strong.text.strip() == "Item #:":
                        continue
                    elif strong.text.strip() == "Object Class:":
                        object_class = p.text.replace(
                            "Object Class: ", "").strip()
                    else:
                        continue
        elif anom_bar_container:

            number = soup.find(
                "div", class_="top-left-box").find("span", class_="number")

            object_class = soup.find(
                "div", class_="main-class").find("div", class_="class-text").text.strip().capitalize()
            secondary_class = soup.find(
                "div", class_="second-class").find("div", class_="class-text").text.strip().capitalize()
            disruption_class = soup.find(
                "div", class_="disrupt-class").find("div", class_="class-text").text.strip().capitalize()
            risk_class = soup.find(
                "div", class_="risk-class").find("div", class_="class-text").text.strip().capitalize()
            level = soup.find("div", class_="level").text.strip()

        # To populate the db:
        print(f"Documenting: {item_number}")

        # Serialize the content properly
        full_article_str = full_article_html.prettify() if full_article_html else None
        style_str = "\n".join([tag.text for tag in style]) if style else None

        # if item_number is None:
        #     db.execute("INSERT INTO scp_entries (id, classification, level, secondary_class, disruption_class, risk_class, full_article_html, style) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
        #                f"unable to find{exception_counter}", str(object_class), str(level), str(secondary_class), str(disruption_class), str(risk_class), full_article_str, style_str])
        #     exception_counter += 1
        #     continue
        # elif i == 864:
        #     item_number = 

        db.execute("INSERT INTO scp_entries (id, classification, level, secondary_class, disruption_class, risk_class, full_article_html, style) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
                   str(item_number), str(object_class), str(level), str(secondary_class), str(disruption_class), str(risk_class), full_article_str, style_str])
        conn.commit()

    conn.close()


main()
