<!-- 会议签到-->
<template>
	<div>
		<div class="breadcrumb">
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>信访中心系统</el-breadcrumb-item>
  <el-breadcrumb-item>信访记录</el-breadcrumb-item> 
  </el-breadcrumb>
</div>
      <div class="search_box"> 
        <el-input style="width: 20%" v-model="searchForm.conName" placeholder="请输入上访者姓名"></el-input>
        <el-input style="width: 20%" v-model="searchForm.conName" placeholder="请输入接访者姓名"></el-input>
        <el-date-picker size="large" v-model="searchForm.startTime" type="datetime" placeholder="选择上访开始时间" value-format=" yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>  
        <el-select v-model="searchForm.status" placeholder="请选择状态">
        <el-option  v-for="item in status" :label='item.text' :value="item.value"></el-option> 
        </el-select>
        <el-button @click="searchCreateMeeting()" type="primary" size="small">查询</el-button> 
 
</div>   
	<div class="table_title">
		<span>信访记录</span>
	</div>
	<el-table
	  class="table_body"
    v-loading="recordLoading"
    :data="visitRecords"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="petitionInfo.userName"
      align="center"
      label="上访者" >
    </el-table-column>
    <el-table-column
      fixed
      prop="petitionIdCard"
      align="center"
      label="上访者身份证号" >
    </el-table-column>
    <el-table-column
      fixed
      prop="interviewInfo.userName"
      align="center"
      label="接访者" >
    </el-table-column>
    <el-table-column 
      prop="interviewIdCard"
      align="center"
      label="接访者身份证号" >
    </el-table-column>
    <el-table-column
      prop="roomName"
      align="center"
      label="信访房间号" >
    </el-table-column>
    <el-table-column
      prop="createTime"
      align="center"
      label="创建时间" >
    </el-table-column>   
    <el-table-column 
      label="操作" 
      align="center">
      <template slot-scope="scope">
        <div class="operateBox">
        <el-button @click="checkDetail('video',scope.row.videoAddress)" type="primary" size="small">视频记录</el-button>
        <el-button @click="checkDetail('word',scope.row.appealRecord)" type="primary" size="small">文字记录</el-button>    
        </div> 
      </template>
    </el-table-column>
  </el-table>
  <el-pagination class="page" background
            @size-change="handleSizeChange($event)"
            @current-change="handleCurrentChange($event)"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>


<el-dialog  :title="detialTitle"  :visible.sync="conDetail">
  <div class="dialogBox">
  <div v-if="videoInfo">
     <video style="width: 100%" :src="videoPath" controls="controls"></video>
  </div>
  <div v-else>
    <div>{{recordText}}</div>
  </div>
    
  </div>
</el-dialog>
	</div>
</template>

<script>
	export default{
		data(){
			return{
		    total: 5,
        currentPage: 1,
　　　　   pageSize: 10,		
 		    visitRecords: [],
        visitDtail:{},
        searchForm:{},
        departId:'', 
        conDetail:false,
        status:[{text:'已处理',value:0},{text:'未处理',value:1}],
        //详情视频标志位
        videoInfo:false,
        //视频地址
        videoPath:"",
        //信访记录内容
        recordText:"",
        //
        detialTitle:"",
        //
        recordLoading:true,
			}
    },
		created(){
      
      var userInfo = window.localStorage.getItem('userInfo');
      console.log(JSON.parse(userInfo));
      this.departId = JSON.parse(userInfo).departId; 
      this.getLetterRecord(1,5);
		},
		methods:{ 
      		handleSizeChange(size){
            console.log("条数:"+size);
            this.pageSize = size;
            this.getLetterRecord(1,size); 
          },
          handleCurrentChange(currentPage){
            console.log("页数:"+currentPage);
            this.currentPage = currentPage;
            this.getLetterRecord(this.currentPage,this.pageSize);
           },
      		//获取信访记录列表
      		getLetterRecord(num,size,departId){
            var _this = this;
            this.$http.get(this.$ports.letters.list,{
             'pageNum':num,
             'size':size,
             'interviewDepartId': _this.departId,
             }).then(res=>{
            this.recordLoading=false
            console.log("获取上访接访记录......");
            console.log(res.data); 
            _this.visitRecords = res.data.data;
            _this.total = res.data.page.total;
      
            _this.pageSize = size;
            _this.currentPage = num;
            });
           
      		},
      		//查看信访记录详情
      		checkDetail(type,data){
            if(type=='video'){
              this.detialTitle = "视频记录";
              this.videoInfo = true;
              this.videoPath = data
            }else{
              this.detialTitle = "文字记录";
              this.videoInfo = false;
              if(data.length>0){
                 this.recordText = data[1].content
                  if(!this.recordText){
                    this.recordText="暂无信访记录";
                  }
              }else{
                    this.recordText="暂无信访记录";
              }
             
            }
           this.conDetail = true;
      		},
      		dateFormate(val){
             return val.startTime
      		}
		}
	}
</script>

<style>
	.table_title{
		margin:25px 0;
	} 
	.table_title>span{
		padding-left: 10px;
		border-left: 3px solid #409EFF
	}
	.table_body{
		margin:20px 0 40px 0;
	}
	.page{
		text-align: center;
	}
  .dialogBox{
    padding:20px;
  }
  .operateBox{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .operateBox>button{
    width: 80%;
    margin:5px 0;

  }
  .el-button + .el-button {
    margin-left: 0px;
}
</style>