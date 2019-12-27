<!--学宣中心房间列表-->
<template>
	<div> 
		<!-- <readIdCard :params="params" @enterRoom="enterRoom($event)"></readIdCard> -->
		<div v-if="roomFlag">
			<div class="breadcrumb">
			  <el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>综治中心系统</el-breadcrumb-item>
			  <el-breadcrumb-item>综治中心</el-breadcrumb-item> 
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
				<el-col v-if="roomList.length>0" v-for="(item,index) in roomList" :data-roomnum="item.comprehensiveTreatmentName" :key="index" class="margin_r roomBox" :span="5">
				 <el-card :body-style="{ padding: '5px' }">
			      <img :src="imgUrl" class="image">
			      <div style="padding: 14px;">
			        <span>{{item.comprehensiveTreatmentName}}</span>
			        <div class="bottom clearfix">
			          <el-button v-if='item.totalNumPeople<6' type="text" @click="checkUserType(item)">加入房间</el-button>
			          <span v-else>房间满员，无法加入</span>
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
		</div 
        
		<!-- 输入房间名 -->
		<el-dialog
		  title="创建房间"
		  :visible.sync="createRoomDialog"
		  width="30%" >
		   <el-input v-model="createRoomName" placeholder="请输入房间名称" maxlength="30"></el-input>
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
				roomFlag:true,
				//
				currentPage:1,
				roomTotal:0,
				//传给直播间的参数
				params01:{

				},
				imgUrl:require('../../../assets/images/room_bg.png'),
				roomList:[
				// {
				// 	info:{
				// 		roomnum:"测试数据01",
				// 		memsize:7,
				// 	}
				// }
				],
				hasRoom:true,
				createRoomDialog:false,
				createRoomName:"",//创建房间时输入的房间名称
				roomTextInfo:"暂无房间",
			}
		},
		created(){
        that = this;
        that.getzzRoomList();
		},
		methods:{
		getzzRoomList(){
		console.log("获取房间列表");
        that.$http.get(that.$ports.zzRoomList,{
        	pageNum:that.currentPage,
        	size:10,
        	stateList:'0,1'
        }).then(res=>{
        	console.log(res.data);
        	that.roomList = res.data.data;
        	that.roomTotal = res.data.page.total;
        })
		},
		//查询当前登录者的角色（创建者/参与者）
		checkUserType(obj){
		this.createRoomDialog = false; 
        that.$http.get(that.$ports.zzRoomDetail,{
        	totalId:obj.id,
        	idCard:localStorage.getItem('idCard')
        }).then(res=>{
        	console.log(res.data);
        	if(res.data.data.length>0){
            if(res.data.data[0].type==0){
             that.$router.push({
                name:'zzVideoRoom', 
                params:{
                roleType:"comprehensiveTreatmentCreate",
                roomNum:obj.comprehensiveTreatmentName,
                room:obj.roomName,  
                interviewType:"xxx"
                }});
            }else{
             that.joinRoom(obj);
            }
        	}else{
             that.joinRoom(obj);
        	}
        })
		},
		joinRoom(obj){  
			//1103 创建面谈房间
			that.$router.push({
                name:'zzVideoRoom', 
                params:{
                roleType:"comprehensiveTreatmentJoin",
                roomNum:obj.comprehensiveTreatmentName,
                room:obj.roomName,  
                interviewType:"xxx"
                }});
		},
		createRoom(){
			this.createRoomDialog = false; 
			//1103 创建面谈房间
			that.$router.push({
                name:'zzVideoRoom', 
                params:{
                roleType:"comprehensiveTreatmentCreate",
                roomNum:that.createRoomName,  
                room:"",  
                interviewType:"xxx"
                }});
		},
		showCreateModal(){
			this.createRoomDialog = true;
			this.createRoomName = "";
		},
		handleCurrentChange(val){
			console.log("当前页数"+val);
			that.currentPage = val;
			that.getzzRoomList();

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