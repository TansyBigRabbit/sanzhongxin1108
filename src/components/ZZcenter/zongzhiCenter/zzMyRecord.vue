<!-- zzRecords.vue -->
<template>
	<div>
	      <div class="breadcrumb">
			  <el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>综治中心系统</el-breadcrumb-item>
			  <el-breadcrumb-item>综治中心</el-breadcrumb-item> 
			  <el-breadcrumb-item>我的综治</el-breadcrumb-item> 
			  </el-breadcrumb>
			</div> 
    <el-tabs class="tab_box" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="我创建的">
    	 <allRecordsCom :params="params"></allRecordsCom>
    </el-tab-pane>
    <el-tab-pane label="我参与的">
    	 <myRecordsCom :params="params1" v-on:changeTimes="changeTimes"></myRecordsCom>
    </el-tab-pane>
    </el-tabs>

	</div>
</template>
<script>
var that;
import allRecordsCom from '../../childComponent/recordsCom'
import myRecordsCom from '../../childComponent/myRecordsCom'
export default{
    components:{allRecordsCom,myRecordsCom},
	data(){
	return{
		//传给组件的参数
     params:{
     	modal:"zongzhi",
     	isFirst:true,
     	times:0, 
     	open:true
     },
     params1:{
     	modal:"zongzhi",
     	isFirst:false,
     	times:0, 
     	open:false
     }
	}
	},
	created(){
    that = this; 
	}, 
    methods:{
      handleClick(tab){
       if(tab.index==1){  
       	that.params1.open = true;
       } 
      },
      changeTimes(val){
        that.params1.times=val;
      }
    }
}
</script>
<style>
   .searchBox{
      padding: 15px 0 ;
    }
</style>