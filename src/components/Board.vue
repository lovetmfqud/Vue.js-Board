<template>
  <div>
    <b-table striped hover :items="items" :per-page="perPage" :current-page="currentPage" :fields="fields" @row-clicked="rowClick"></b-table> <!-- 테이블로 index 보여주기 , hover : 마우스 포인터가 배경을 바꾸어 눈에 띄도록 해준다 -->
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      align="center"
    ></b-pagination>
    <b-button @click="writeContent">글 쓰기</b-button>
  </div>
</template>

<script>
import data from '@/data'; // index에 있는 데이터를 임포트



export default {
    data() { // let (블럭 범위) 지역 변수 선언 , const (블럭 범위) 상수 선언
      let items = data.Content.sort((a,b) => {return b.content_id - a.content_id}) // 데이터 안에 Content를 정렬해서 추출,  content_id가 높은순서대로
      items = items.map(contentItem => {return {...contentItem, user_name: data.User.filter(userItem => userItem.user_id === contentItem.user_id)[0].name}})
      //map 키-값 쌍으로 저장 요소의 삽입 순서대로 원소를 순회 / filter 모든 요소를 모아 새로운 배열로 반환
      return {
        currentPage : 1, // 페이징 시작 페이지 (현재 페이지)
        perPage : 10, // 한 페이지 당 보여줄 데이터
        fields: [ // data 컬럼 이름을 바꾸어 보여준다
            {
                key: 'content_id', 
                label: '글 번호'
            },
            {
                key: 'title',
                label: '제목'
            },
            {
                key: 'created_at',
                label: '작성일'
            },
            {
                key: 'user_name',
                label: '글쓴이'
            },
        ],
        items: items
      }
    },
    methods: {
      rowClick(item, index, e) {
        this.$router.push({
          path: `/board/free/detail/${item.content_id}`
        })
      },
      writeContent() {
        this.$router.push({
          path: '/board/free/create'
        })
      } // router URL에 따라 정적파일을 내려주는 방식 , 루트로 경로를 지정
    },
    computed: {
      rows() { // 총 데이터 갯수 (item의 길이를 가져옴)
        return this.items.length
      }
    } 
}
</script>