import json
import requests
import sys
import re
import time
import datetime
def GetGitHubRepositories(filename,max_num=100,sort="stars",download=False,dir=None,save_file=None):
    repos_list=[]
    page_iterator=1
    while 1:
        url="https://api.github.com/search/repositories?q="+filename+"+in:readme"+"&sort="+sort+"&page="+str(page_iterator)
        info=requests.get(url).text
        info_dict=json.loads(info)
        if "items" not in info_dict:
            if "message" in info_dict:
                print(info_dict["message"])
                reset_time=GetResetTimeForGithub()
                waitUntilReset(reset_time)
            else :
                print("An error occured.")
            continue
        repos=info_dict["items"]
        for r in repos:
            if len(repos_list)>=max_num:
                break
            repos_list.append([r["name"],r["html_url"],r["default_branch"]])
        page_iterator+=1
    if download==True:
        percentage=DownloadGithubAll(repos_list,dir,save_file)
        print("{}% repositories were Downloaded.".format(percentage))

    return repos_list

def DownloadGithub(github_url:str, default_branch="master",dir=None,filename=None)->bool:
    if github_url[-1]=='/':
        github_url=github_url[:-1]
    url=github_url+"/archive/"+default_branch+".zip"
    if filename is None:
        filename=github_url.split("/")[-1]+"-"+default_branch+".zip"
    if dir is None:
        dir="./"
    if dir[-1]!='/':
        dir+='/'
    return DownloadFile(url,dir+filename)

def DownloadFile(url,dir_and_filename)->bool:
    r=requests.get(url,stream=True)
    with open(dir_and_filename, "wb") as w:
        for chunk in r.iter_content(chunk_size=1024):
            if chunk:
                w.write(chunk)
                w.flush()
        return True
    return False

def DownloadGithubAll(repos_list:list,dir=None,filename=None):
    if len(repos_list)==0:
        return 0
    download_count=0
    for repos in repos_list:
        if DownloadGithub(github_url=repos[1], default_branch=repos[2], dir=dir,filename=filename):
            download_count+=1
            print("{} was downloaded successfully.".format(repos[0]))
            continue
        print("Download failed: {}".format(repos[0]))
    return download_count / len(repos_list) * 100 #ダウンロードできた割合を返す


def GetResetTimeForGithub(api_object="search"):
    url="https://api.github.com/rate_limit"
    info=requests.get(url).text
    info_dict=json.loads(info)
    print(info_dict)
    return int(info_dict["resources"][api_object]["reset"])
def waitUntilReset(reset):
    '''
    reset 時刻まで sleep
    '''
    seconds = reset - time.mktime(datetime.datetime.now().timetuple())
    seconds = max(seconds, 0)
    print ('\n     =====================')
    print ('     == waiting %d sec ==' % seconds)
    print ('     =====================')
    sys.stdout.flush()
    time.sleep(seconds + 5)  # 念のため + 5 秒

GetGitHubRepositories("package.json",max_num=10,download=True)