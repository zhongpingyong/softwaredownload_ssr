#!/bin/bash
###
 # @Author: 黄某人
 # @Date: 2023-11-25 10:03:30
 # @Description:
###

echo "服务部署到测试服务器, 地址: http://192.168.2.161:8000"
    scp -r .output laserpecker-ubuntu@192.168.2.161:/home/laserpecker-ubuntu/project

    ssh laserpecker-ubuntu@192.168.2.161 'bash ' << 'STARTCMD'
        pm2 reload lp-projects
        exit
    STARTCMD
