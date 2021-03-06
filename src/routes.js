import Login from './components/login'
import Home from './components/Home'
//信访
import LettersVisit from './components/lettersVisit/lettersVisit'
import VisitRoom from './components/lettersVisit/VisitRoom'
import VisitRecord from './components/lettersVisit/visitRecord'
import LettersStatic from './components/lettersVisit/lettersStatic'
//会议
import ConList from './components/DJcenter/conference/conList'
import ConRecord from './components/DJcenter/conference/conRecord'
import ConRoom from './components/DJcenter/conference/conRoom'
import ConSignate from './components/DJcenter/conference/conSignate'
import ConSignate2 from './components/DJcenter/conference/conSignate2'
import MyCon from './components/DJcenter/conference/myCon'
//党建活动
import ActivityList from './components/DJcenter/activity/activityList'
import ActivityManage from './components/DJcenter/activity/activityManage'
//面谈
import FaceRoomList from './components/DJcenter/faceToFace/faceRoomList'
import FaceRecords from './components/DJcenter/faceToFace/faceRecords'
import FaceStatic from './components/DJcenter/faceToFace/faceStatic'
import FaceVideoRoom from './components/DJcenter/faceToFace/faceVideoRoom'
import MyRecordFace from './components/DJcenter/faceToFace/myRecordFace'
//综治中心
import zzRecords from './components/ZZcenter/zongzhiCenter/zzRecords'
import zzRoomList from './components/ZZcenter/zongzhiCenter/zzRoomList'
import zzStatic from './components/ZZcenter/zongzhiCenter/zzStatic'
import zzMyRecord from './components/ZZcenter/zongzhiCenter/zzMyRecord'
import zzVideoRoom from './components/ZZcenter/zongzhiCenter/zzVideoRoom'
//学宣
import StudyVideoList from './components/ZZcenter/studySys/studyVideoList'
import StudyRoomList from './components/ZZcenter/studySys/StudyRoomList'
//用户管理
import User from './components/userManage/user'
import Role from './components/userManage/role'

export const routes = [{
	path: '/',
	name: 'login',
	component: Login
}, {
	path: '/home',
	name: 'home',
	component: Home,
	redirect: '/home/lettersVisit',
	children: [{
			//信访部分
			path: '/home/lettersVisit',
			name: 'lettersVisit',
			component: LettersVisit,
			/*meta: {
			  bcrumd: ['首页'],
			  activePath: "/menu/home"
			}*/
		}, {
			path: '/home/VisitRoom',
			name: 'VisitRoom',
			component: VisitRoom,
		}, {
			path: '/home/VisitRecord',
			name: 'visitRecord',
			component: VisitRecord,
		}, {
			path: '/home/LettersStatic',
			name: 'LettersStatic',
			component: LettersStatic,
		},

		//会议部分
		{
			path: '/home/ConList',
			name: 'ConList',
			component: ConList,
		}, {
			path: '/home/ConRecord',
			name: 'ConRecord',
			component: ConRecord,
		}, {
			path: '/home/ConRoom',
			name: 'ConRoom',
			component: ConRoom,
		}, {
			path: '/home/ConSignate',
			name: 'ConSignate',
			component: ConSignate,
		}, {
			path: '/home/ConSignate2',
			name: 'ConSignate2',
			component: ConSignate2,
		}, {
			path: '/home/MyCon',
			name: 'MyCon',
			component: MyCon,
		},
		//党建活动
		{
			path: '/home/ActivityList',
			name: 'ActivityList',
			component: ActivityList,
		}, {
			path: '/home/ActivityManage',
			name: 'ActivityManage',
			component: ActivityManage,
		},
		//面对面访谈
		{
			path: '/home/FaceRoomList',
			name: 'FaceRoomList',
			component: FaceRoomList,
		}, {
			path: '/home/FaceRecords',
			name: 'FaceRecords',
			component: FaceRecords,
		}, {
			path: '/home/FaceStatic',
			name: 'FaceStatic',
			component: FaceStatic,
		},
		{
			path: '/home/FaceVideoRoom',
			name: 'FaceVideoRoom',
			component: FaceVideoRoom,
		},
		{
			path: '/home/MyRecordFace',
			name: 'MyRecordFace',
			component: MyRecordFace,
		},
		//综治中心
		{
			path: '/home/zzRecords',
			name: 'zzRecords',
			component: zzRecords,
		}, {
			path: '/home/zzRoomList',
			name: 'zzRoomList',
			component: zzRoomList,
		}, {
			path: '/home/zzStatic',
			name: 'zzStatic',
			component: zzStatic,
		},{
			path: '/home/zzMyRecord',
			name: 'zzMyRecord',
			component: zzMyRecord,
		},{
			path: '/home/zzVideoRoom',
			name: 'zzVideoRoom',
			component: zzVideoRoom,
		},
		//学宣
		{
			path: '/home/StudyVideoList',
			name: 'StudyVideoList',
			component: StudyVideoList,
		}, {
			path: '/home/StudyRoomList',
			name: 'StudyRoomList',
			component: StudyRoomList,
		},
		//用户管理
		{
			path: '/home/User',
			name: 'User',
			component: User,
		}, {
			path: '/home/Role',
			name: 'Role',
			component: Role,
		},
	]
}];