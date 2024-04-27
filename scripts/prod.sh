#!/bin/bash
###
 # @Author: 黄某人
 # @Date: 2023-12-05 11:37:10
 # @Description:
###


echo "服务部署到正式服务器, 地址 https://projects.laserpecker.com"
# SCP 文件到正式服务器
scp -r .output root@8.218.75.39:/root/frontend/
# 执行远程命令
ssh root@8.218.75.39 'bash ' << 'STARTCMD'
    pm2 reload lp-projects
    exit
STARTCMD

