<template>
  <div>
    <b-input v-model="subject" placeholder="제목을 입력해 주세요"></b-input>
    <b-form-textarea
      v-model="context"
      placeholder="내용을 입력해 주세요"
      rows="3"
      max-rows="6"
    ></b-form-textarea>
    <b-button @click="updateMode ? updateContent() : uploadContent()">저장</b-button> <!-- 데이터가 있으면 updateContent, 없으면 uploadContent -->
    <b-button @click="cancle">취소</b-button> <!-- 취소하면 router로 다시 게시판 목록 반환 -->
  </div>
</template>
<script>
import data from '@/data'
export default {
  name: 'Create',
  data() {
    return {
      subject: '',
      context: '',
      userId: 1, // 로그인을 안해서 글쓴이는 userID 1번으로 고정
      createdAt: '2021-06-18',
      updatedAt: null,
      updateObject: null,
      updateMode: this.$route.params.contentId > 0 ? true : false // contentId의 파라미터 값이 0 이상이면 참, 0 이면 거짓을 반환
    }
  },
  created() {
    if (this.$route.params.contentId > 0) {
      const contentId = Number(this.$route.params.contentId)
      this.updateObject = data.Content.filter(item => item.content_id === contentId)[0] 
      this.subject = this.updateObject.title;
      this.context = this.updateObject.context;
    }
  },
  methods: {
    uploadContent() {
      let items = data.Content.sort((a,b) => {return b.content_id - a.content_id})
      const content_id = items[0].content_id + 1 // uploadContent시 content_id에 1을 추가하여 ID를 부여
      data.Content.push({ // push로 데이터 입력
        content_id: content_id,
        user_id: this.userId,
        title: this.subject,
        context: this.context,
        created_at: this.createdAt,
        updated_at: null
      })
      this.$router.push({
        path: '/board/free/' // 업로드 완료시 게시판 목록으로 반환
      })
    },
    updateContent() {
      this.updateObject.title = this.subject; // 제목과
      this.updateObject.context = this.context; // 내용을 수정하고
      this.$router.push({
        path: '/board/free/' // 수정 완료시 게시판 목록으로 반환
      })
    },
    cancle() {
      this.$router.push({
        path: '/board/free/' // 취소시 게시판 목록으로
      })
    }
  }
}
</script>