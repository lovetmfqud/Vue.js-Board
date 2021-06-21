import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Board from '@/components/Board'
import ContentDetail from '@/components/ContentDetail';
import Create from '@/components/Create';

Vue.use(Router)

export default new Router({ // 라우터로 경로를 지정 해줌 (스프링에서 controller 같은 역할)
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/board/free',
      name: 'Board',
      component: Board
    },
    {
      path: '/board/free/detail/:contentId',
      name: 'ContentDetail',
      component: ContentDetail
    },
    {
      path: '/board/free/create/:contentId?', 
      name: 'Create',
      component: Create
    }
    
  ]
})
