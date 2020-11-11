import json
import requests
info=requests.get("https://api.github.com/search/repositories?q=package.json+in:filename&sort=stars").text
repos=json.loads(info)["items"]
for r in repos:
    print("{} => {}".format(r["name"],r["html_url"]))
print("{} repositories found.".format(len(repos)))