import json
from playwright.sync_api import sync_playwright


data = []

url_base = "https://www.burgerkingreunion.re"


with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://www.burgerkingreunion.re/carte/desserts",  wait_until="domcontentloaded")

    links = page.query_selector_all("a")

    menus = []
    
    for link in links:
        href = link.get_attribute("href")
        if href and "/produit/" in href:
            if href.startswith("http"):
                menus.append(href)
            else:
                menus.append(url_base + href)

    menus = list(dict.fromkeys(menus))
    
    

    for menu in menus:
        page.goto(menu,  wait_until="domcontentloaded")
        menu_item = {"url": menu, "tabs": []}
        
        tabs = page.locator("[role='tab']")
        tab_count = tabs.count()
        
        if tab_count == 0:
            h1 = page.locator("h1.MuiTypography-root.MuiTypography-h1.mui-1ows4ok").first.text_content()
            if h1 and h1.strip():
                menu_item["nom"] = h1.strip()
        else:
            for i in range(tab_count):
                tabs.nth(i).click()
                
                titres = page.locator("a[role='button'] h4").all_text_contents()
                tab_produits = []
                for t in titres:
                    t = t.strip()
                    if t:
                        tab_produits.append(t)
                
                menu_item["tabs"].append({"produits": tab_produits})
        
        page.wait_for_selector("div.MuiStack-root.mui-1b2qzsm, div.MuiStack-root.mui-1b2qzsm")
        menu_textes = page.locator("div.MuiStack-root.mui-1b2qzsm p, div.MuiStack-root.mui-1b2qzsm p").all_text_contents()
        descriptions = []
        for texte in menu_textes:
            texte = texte.strip()
            if texte:
                descriptions.append(texte)
        
        menu_item["descriptions"] = descriptions
        data.append(menu_item)

    browser.close()

with open("desserts.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)