<!--学宣中心房间列表-->
<template>
	<div> 
		<!-- <readIdCard :params="params" @enterRoom="enterRoom($event)"></readIdCard> -->
		<div v-if="!roomFlag">
			<div class="breadcrumb">
			  <el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>综治中心系统</el-breadcrumb-item>
			  <el-breadcrumb-item>学宣中心</el-breadcrumb-item> 
			  <el-breadcrumb-item>房间列表</el-breadcrumb-item> 
			  </el-breadcrumb>
			</div>
			<div style="display: flex;justify-content: space-between;"> 
			<h3>房间列表</h3>
			<p><el-button type="primary" @click="showCreateModal">创建房间</el-button></p>
		</div>
		<el-divider class="divider"></el-divider>
		<!-- <el-button type="primary" style="width: 150px" @click="createRoomModel=true">创建房间</el-button> -->
        <div>
			<el-row style="padding-top: 15px;">
				<el-col v-if="roomList.length>0" v-for="(item,index) in roomList" :data-roomnum="item.academicName " :key="index" class="margin_r roomBox" :span="5">
				 <el-card :body-style="{ padding: '5px' }">
			      <img :src="imgUrl" class="image">
			      <div style="padding: 14px;">
			        <span>{{item.academicName}}</span>
			        <div class="bottom clearfix">
			          <el-button  type="text" @click="joinRoom(item)">加入房间</el-button> 
			        </div>
			      </div>
			    </el-card>	
				</el-col>  
				<el-card v-if="!hasRoom||roomList.length==0" class="letterCard">
					{{roomTextInfo}}
				</el-card>  
			</el-row>
			<!-- 分页插件 -->
				 <el-pagination
			        v-if="roomList.length>0"
			        style="text-align: center;"
			        layout="prev, pager, next"
			        background
			        :total="roomTotal"
			        :current-page="currentPage"
			        @current-change="handleCurrentChange">
			      </el-pagination>
		</div> 
		</div> 
         <!--直播间-->
		<div v-else>
			<liveRoom :params01="params01"></liveRoom>
		</div>
		<!-- 输入房间名 -->
		<el-dialog
		  title="创建房间"
		  :visible.sync="createRoomDialog"
		  width="30%" >
		   <el-input v-model="createRoomName" placeholder="请输入房间名称" maxlength="30"></el-input>
		   <el-select style="margin-top: 20px" v-model="type" placeholder="请选择视频类别">
        <el-option  v-for="item in videoTypes" :label='item.name' :value="item.id"></el-option> 
        </el-select>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="createRoomDialog = false">取 消</el-button>
		    <el-button type="primary" @click="createRoom">确 定</el-button>
		  </span>
		</el-dialog>

	</div>
</template>

<script>
	var that;
	import readIdCard from "../../childComponent/readIdCard"
	import liveRoom from "../../childComponent/liveRoom"
	export default{
		components:{readIdCard,liveRoom},
		data(){
			return{
				params:{show:true},
				roomFlag:false,
				//传给直播间的参数
				params01:{
                open:false,
                obj:null
				},
				imgUrl:require('../../../assets/images/room_bg.png'),
				roomList:[ ],
				hasRoom:true,
				createRoomDialog:false,
				createRoomName:"",//创建房间时输入的房间名称
				roomTextInfo:"暂无房间",
				//
				type:'',
				videoTypes:[],
				//
				roomTotal:0,
				currentPage:1
			}
		},
		created(){
        that = this;
        that.getTypes();
        that.getRoomList();
		},
		methods:{
		getRoomList(){
        console.log("获取房间列表");
        that.$http.get(that.$ports.studyLiveRoomList,{
        	pageNum:that.currentPage,
        	size:10,
        	isComplete:0
        }).then(res=>{
        	if(res.data.code==0){
                that.roomList = res.data.data;
                that.roomTotal = res.data.page.total;
        	}else{
        		that.$message.error("房间列表获取失败");
        	}
        })

		},	
		getTypes(){
      	 console.log("获取视频类别");
         that.$http.get(that.$ports.videoType).then(res=>{
          if(res.data.code==0){
            that.videoTypes = res.data.data; 
          }else{
            that.$message.error("获取视频类别失败!");
          }
         })
      },
		joinRoom(obj){
			
			this.findUserRole(obj);
  
		},
		findUserRole(obj01){
         //进入房间之前查询该用户是不是主播
         var obj = {
         	id:obj01.id,
         	userId:window.localStorage.getItem("userId")
         }
         that.$http.get(that.$ports.studyLiveRoomDetail,obj).then(res=>{
         	console.log(res.data);
         	if(res.data.code==0){
         		that.createRoomDialog = false;
			    that.roomFlag = true; 
               if(res.data.data.length>0){
               	console.log("主播异常退出");
                    that.params01 = {
					open:true,
		            type:'create',
		            roomName:obj01.academicName, 
		            roomName01:obj01.roomName,
		            videoType:obj01.type
					}
               }else{
                    that.params01 = {
					open:true,
		            type:'watch',
		            roomName:obj01.academicName, 
		            roomName01:obj01.roomName,
		            academicUserName:obj01.academicUserName,
		            totalId:obj01.id
					}
               }
         	}else{
         		that.$message.error("操作失败");
         	}
         })
		},
		createRoom(){
			if(!that.createRoomName){
				that.$message.error("请输入房间名称！");
				return
			} 
			this.createRoomDialog = false;
			this.roomFlag = true; 
			that.params01 = {
			open:true,
            type:'create',
            roomName:that.createRoomName,
            roomName01:'',
            videoType:that.type
			}
		},
		showCreateModal(){
			this.createRoomDialog = true;
			this.createRoomName = "";
		},
		handleCurrentChange(val){
			console.log("当前页数:"+val);
			that.getRoomList();
		}
		}
	}
</script>
<style>
	.divider{
		margin: 20px 0 0 0;
	}
	.image{
		max-width: 100%
	}
	.roomBox{
		cursor: pointer;
	}
</style>