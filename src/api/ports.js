//const hosturl = 'http://192.168.1.149:8080/webrtc_conference_war';//localhost:8080 threeCentreProject
//const hosturl = 'http://192.168.1.153:8080/threeCentreProject';
//const hosturl = 'http://47.102.139.17:9090/threeCentreProject';

var hosturl = '';
//process.env.NODE_ENV === 'development' ? hosturl = '/api' : hosturl = "http://47.102.139.17:9090/threeCentreProject";
process.env.NODE_ENV === 'development' ? hosturl = '/api' : hosturl = "http://10.10.100.180:8080/threeCentreProject";
export default {
	department: hosturl + '/depart/superiorDepart',
	userInfo: hosturl + '/userinfo',
	login: hosturl + '/userinfo/login',
	logout: hosturl + '/userinfo/logout',
	getToken: hosturl + '/api/account/getTonkenByIdCard',
	checkRoom: hosturl + '/petitionroominfo/queryListWithNoPage',
	submitContent: hosturl + '/appealrecord/insert',
	conference: {
		insert: hosturl + '/conferenceroom/insert',
		update: hosturl + '/conferenceroom/update',
		list: hosturl + '/conferenceroom/queryListWithPage',
		findById: hosturl + '/conferenceroom/queryOne',
	},
	meetsign: {
		sign: hosturl + '/meetsign/insert',
		list: hosturl + '/meetsign/queryListWithNoPage',
	},
	activity: {
		insert: hosturl + '/partybuilding/insert',
		list: hosturl + '/partybuilding/queryListWithPage',
		update: hosturl + '/partybuilding/update',
		findById: hosturl + '/partybuilding/queryOne',
		delete: hosturl + '/partybuilding/delete'
	},
	letters: {
		list: hosturl + '/petitionroominfo/queryListWithPage',
	},
	// //信访统计
	// lettersStatic: {
	// 	//顶部数据
	// 	topData: hosturl + '/peptionReport/fixedQuantityDisplay',
	// 	barData: hosturl + '/peptionReport/histogram',
	// 	//终端占比
	// 	departData: hosturl + '/peptionReport/petitionDepartProportion',
	// 	//分类占比
	// 	typeData: hosturl + '/peptionReport/petitionTypeProportion',
	// },

	//党建统计接口
    dangjianStatistics:{
    //矛盾部分
    contradiction:{
    	topData:hosturl+'/partyBuildingReportController/academicAdvocacyHead',
    	barData:hosturl+'/partyBuildingReportController/conflictResolutionHistogram',
    	//终端占比
    	pieData:hosturl+'/partyBuildingReportController/conflictResolutionProportion',
    },
    //党建部分
    dangjian:{
    	topData:hosturl+'/partyBuildingReportController/partyBuildActivitiesHead',
    	barData:hosturl+'/partyBuildingReportController/academicLiveBroadProportion',
    	pieData:hosturl+'/partyBuildingReportController/partyBuildActivitiesProportion'
    },
    //面谈部分
    faceToFace:{
    	topData:hosturl+'/partyBuildingReportController/interviewHead',
    	barData:hosturl+'/partyBuildingReportController/interviewHistogram',
    	pieData:hosturl+'/partyBuildingReportController/interviewProportion'
    },
    //会议部分
    meeting:{
    	topData:hosturl+'/partyBuildingReportController/meetHead',
    	barData:hosturl+'/partyBuildingReportController/meetHistogram',
    	pieData:hosturl+'/partyBuildingReportController/meetProportion'
    }
    },
	//综治统计接口
	zzStatistics:{
    //学宣部分
    study:{
    	topData:hosturl+'/academicReportController/academicLiveBroadHead',
    	barData:hosturl+'/academicReportController/academicLiveBroadHistogram',
    	pieData:hosturl+'/academicReportController/academicLiveBroadProportion'
    },
    //学习人数
    studyNum:{
    	topData:hosturl+'/academicReportController/academicAdvocacyHead',
    	barData:hosturl+'/academicReportController/academicAdvocacyHistogram',
    	pieData:hosturl+'/academicReportController/academicAdvocacyProportion'
    },
    //综治数
    zzNum:{
    	topData:hosturl+'/comprehensivetreatmentreport/comprehensiveTreatmentHead',
    	barData:hosturl+'/comprehensivetreatmentreport/histogram',
    	pieData:hosturl+'/comprehensivetreatmentreport/proportion'
    },
	},
	//信访统计接口
	letterStatistics: {
		topData: hosturl + '/peptionReport/fixedQuantityDisplay',
		barData: hosturl + '/peptionReport/histogram',
		terminalData: hosturl + '/peptionReport/petitionDepartProportion',
		typeData: hosturl + '/peptionReport/petitionTypeProportion'
	},
	//学宣视频接口
	studyVideoList: {
		list: hosturl + '/academicAdvocacyTotalController/queryListWithPage',
		insert: hosturl + '/academicAdvocacyTotalController/insert',
		delete: hosturl + '/academicAdvocacyTotalController/delete',
		update: hosturl + '/academicAdvocacyTotalController/update',
		findById: hosturl + '/academicAdvocacyTotalController/queryOne',
	},
	//学宣直播房间创建
	studyLiveCreate: hosturl + '/academicLiveBroadcastTotalController/insert',
	//学宣直播房间列表
	studyLiveRoomList: hosturl + '/academicLiveBroadcastTotalController/queryListWithPage',
	//学宣房间详情
	studyLiveRoomDetail: hosturl + '/academicLiveBroadcastTotalController/queryListWithNoPage',
	//视频类别
	videoType: hosturl + "/academicAdvocacy/academic-type/queryListWithNoPage",
	//面谈房间列表
	faceRoomList: hosturl + "/interview/total/queryListWithPage",
	//面谈房间查看详情
	faceRoomFindById:hosturl+"/interview/total/queryOne",
	//面谈房间明细
	faceRoomDetail: hosturl + "/interview/detail/queryListWithNoPage",
	//综治房间列表
	zzRoomList:hosturl+"/comprehensiveTreatment/comprehensive-treatment-total/queryListWithPage",
	//综治房间明细
	zzRoomDetail:hosturl+"/comprehensiveTreatment/comprehensive-treatment-detail/queryListWithNoPage",
	//综治房间查看详情
	zzRoomFindById:hosturl+"/comprehensiveTreatment/comprehensive-treatment-total/queryOne",
	user: {
		list: hosturl + '/userinfo/queryListWithPage',
		insert: hosturl + '/userinfo/insert',
		update: hosturl + '/userinfo/update',
		delete: hosturl + '/userinfo/delete',
		findById: hosturl + '/userinfo/queryOne',
	},
	role: {
		list: hosturl + '/role/queryListWithPage',
		insert: hosturl + '/role/insert',
		update: hosturl + '/role/update',
		delete: hosturl + '/role/delete',
		findById: hosturl + '/role/queryListWithNoPage',
	},
	permission: {
		list: hosturl + '/permission/queryListWithPage',
	},
	roleAndUser: {
		insert: hosturl + '/userinforole/insert'
	},
	roleAndRight: {
		insert: hosturl + '/rolepermission/insert'
	},
	//身份证读卡信息
	userinfoextend: {
		insertList: hosturl + '/userinfoextend/insertList',
		list: hosturl + '/userinfoextend/queryListWithPage',
	},
	//信访类型
	petitionType: {
		list: hosturl + '/petitiontype/queryListWithNoPage'
	},
	//userInfo:"/threeCentreProject/userinfoextend",
	//login: 'api/threeCentreProject/api/account/login',
	hosturl: hosturl
}