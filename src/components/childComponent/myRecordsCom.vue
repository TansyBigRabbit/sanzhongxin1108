<!-- 综治中心记录、面谈记录共用的公共组件 -->
<template>
<div>
   <div class="searchBox">
       <el-input style="width: 20%" v-model="searchForm.name" placeholder="请输入名称"></el-input>
        
        <el-date-picker style="width: 20%" size="large" v-model="searchForm.startTime" type="datetime" placeholder="选择开始时间" value-format=" yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker> 
        <el-date-picker style="width: 20%" size="large" v-model="searchForm.endTime" type="datetime" placeholder="选择结束时间" value-format=" yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker> 
       <!--  <el-select v-model="searchForm.type" placeholder="请选择视频类别">
        <el-option  v-for="item in videoTypes" :label='item.name' :value="item.id"></el-option> 
        </el-select> -->
        <el-button @click="getVideoList()" type="primary" size="small">查询</el-button> 
        <el-button @click="reset('searchForm')" type="primary" size="small">重置</el-button>
    </div>
  <el-table
      v-loading="createLoading"
      class="table_body"
      :data="dataList" >
        <el-table-column  
          type="index"
          align="center"
          label="序号" >
        </el-table-column> 
        <el-table-column 
          align="center"
          label="房间名称" >
          <template slot-scope="scope">
            <div v-if="type=='face'">{{scope.row.interviewName}}</div>
            <div v-else>{{scope.row.comprehensiveTreatmentName}}</div>
          </template> 
        </el-table-column> 
        <el-table-column 
          prop="userName"
          align="center"
          label="创建人" > 
        </el-table-column>
        <el-table-column 
          prop="departName"
          align="center"
          label="创建人所在部门" > 
        </el-table-column>
        <!-- <el-table-column 
          prop="participants"
          align="center"
          label="参与人" > 
        </el-table-column>   -->
        <el-table-column 
        :formatter="dateFormate"
          prop="createTime"
          align="center"
          label="创建时间" > 
        </el-table-column>    
        <el-table-column 
          label="操作" 
          align="center">
          <template slot-scope="scope">
            <el-button @click="checkDetail(scope.row)" type="primary" size="small">查看详情</el-button> 
          </template> 
        </el-table-column>
      </el-table>
           <el-pagination class="page" background
                @size-change="handleSizeChange()"
                @current-change="handleCurrentChange()"
                :current-page="currentPage"
                :page-sizes="[5, 10, 20, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
  <!--查看详情-->
  <el-dialog  title="记录详情"  :visible.sync="conDetail">
  <div class="dialogBox"> 
     <video style="width: 100%" :src="videoPath" controls="controls"></video>
   </div>
</el-dialog>
</div>
</template>
<script>
  var that; 
export default{
    name:"",
    props:{
    params:Object
    },
  data(){
  return{
     createLoading:false,
     currentPage:1,
     pageSize:5,
     total:0,
     //
     searchForm:{},
     dataList:[
     // {
     //    id:"1",
     //    name:"测试数据1",
     //    userName:"陈大颖",
     //    participants:"11,22,33,55,66",
     //    createTime:"2109-10-25 22:12:17",
     //    vedioPaths:[{path:"11.mp4"}],
     // }
     ],
     //
     conDetail:false,
     type:"zz",
     videoPath:"",
  }
  },
  watch:{
    "params.open":function open(){
      if(!that.params.isFirst){
      if(that.params.open&&that.params.times==0){
            if(this.params.modal=="zongzhi"){
            console.log("综治中心触发");
                 that.getDataList("zz");
          }else if(this.params.modal=="face"){
            console.log("面谈触发");
                 that.getDataList("face");
          }
          that.$emit("changeTimes",1);
      }
     }
 }
  },
  created(){
     that = this;
     if(that.params.isFirst){
      if(that.params.modal=="zongzhi"){
        console.log("zongzhi 第一次触发");
            that.getDataList();
            that.type = "zz";
      }else{
        console.log("face 第一次触发");
            that.getDataList();
            that.type = "face";
      }
     }
  },
    methods:{
      //日期格式化
          dateFormate(row, column, cellValue, index){
          var num =  cellValue.length;
             return cellValue.slice(0,num-2);

           }, 
       getDataList(){
        var obj = Object.assign(that.searchForm,{
            pageSize:that.pageSize,
            num:that.currentPage,
            userId:window.localStorage.getItem("userId")
        });
        that.createLoading = true;
        if(that.type=="zz"){
          var url = that.$ports.zzRoomList
        }else{
          var url = that.$ports.faceRoomList
        } 
        that.$http.get(url,obj).then(res=>{
            that.createLoading = false;
            console.log(res);
            if(res.data.code==0){
                that.dataList = res.data.data
                that.total = res.data.page.total;
            }else{
                that.$message.error(res.data.msg);
            }
        })
       },
       checkDetail(row){
        that.videoPath = row.vediepath;
        that.conDetail=true;
       },
       handleSizeChange(val){
        console.log("当前页数"+val);
        that.pageSize = val;
        that.getDataList();
       },
       handleCurrentChange(val){
        console.log("当前页码"+val);
        that.currentPage = val;
        that.getDataList();
       },
       reset(name){
        that[name]={};
       }
    }
}
</script>
<style>

</style>