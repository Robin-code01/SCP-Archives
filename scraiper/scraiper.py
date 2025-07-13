import requests
from bs4 import BeautifulSoup
from cs50 import SQL


def main():

    URLS = [None] * 1001

    db = SQL("sqlite:///scp.db")

    for i in range(2, 1001):
        fi = f"{i:03}"
        URLS[i] = f"https://scp-wiki.wikidot.com/scp-{fi}"

    for url in URLS:
        if url is None:
            continue

        scp = requests.get(url)
        print(scp)
        # Checks for any errors:
        if scp.status_code != 200:
            print(f"Error: {scp.status_code}")
            return 1

        soup = BeautifulSoup(scp.text, "html.parser")

        item_number = None
        object_class = None
        special_containment_procedures = []
        description = []
        additional_title = None
        additional_content = []
        images = []

        # Finds all the p and blockquotes and
        """stores them in an array"""
        p_tags = soup.find_all("p")
        blockquote = soup.find_all("blockquote")

        session = None
        for p in p_tags:
            strong = p.find("strong")
            if strong:
                if strong.text.strip() == "Item #:":
                    item_number = p.text.replace("Item #: ", "").strip()
                    session = None
                elif strong.text.strip() == "Object Class:":
                    object_class = p.text.replace("Object Class: ", "").strip()
                    session = None
                elif strong.text.strip() == "Special Containment Procedures:" or strong.text.strip() == "Special Containment Procedure:":
                    session = "containment"
                    special_containment_procedures.append(p.text.strip())
                elif strong.text.strip() == "Description:":
                    session = "description"
                    description.append(p.text.strip())
                else:
                    session = "additional"
                    additional_title = strong.text.strip()
                    additional_content.append(p.text.strip())
            else:
                if session == "containment":
                    special_containment_procedures.append(p.text.strip())
                elif session == "description":
                    description.append(p.text.strip())
                elif session == "additional":
                    additional_content.append(p.text.strip())
                else:
                    continue

        for bq in blockquote:
            bq_p = bq.find_all("p")
            for p in bq_p:
                additional_content.append(p.text.strip())

        # Add to database:
        special_containment_procedures_str = "\n".join(special_containment_procedures)
        description_str = "\n".join(description)
        db.execute("INSERT INTO scp_articles (id, object_class, containment_procedures, description) VALUES (?, ?, ?, ?)",
                   item_number, object_class, special_containment_procedures_str, description_str)
        additional_content_str = "\n".join(additional_content)
        db.execute("INSERT INTO scp_sections (scp_id, section_title, content) VALUES (?, ?, ?)",
                   item_number, additional_title, additional_content_str)

        # return 0
        # try:
        #     print(requests.get(str(url)))
        # except:
        #     print(f"Something went wrong with that None BS: {url}")


main()
