<template>
    <div>
        <b-card>
            <div class="content-detail-content-info">
                <div class="content-detail-content-info-left"> 
                    <div class="content-detail-content-info-left-number">
                        {{ contentId }} <!-- contentId 왼쪽으로 정렬 -->
                    </div>
                    <div class="content-detail-content-info-left-subject">
                        {{ title }} <!-- 제목 왼쪽으로 정렬 -->
                    </div>
                </div>
                <div class="content-detail-content-info-right">
                    <div class="content-detail-content-info-right-user">
                        글쓴이: {{user}} <!-- 글쓴이 userId 오른쪽 정렬 -->
                    </div>
                    <div class="content-detail-content-info-right-created">
                        등록일: {{created}} <!-- content crated_at 오른쪽 정렬 -->
                    </div>    
                </div>
            </div>
            <div class="content-detail-content">
                {{context}}
            </div>
            <div class="content-detail-button">
                <b-button variant="primary" @click="updateData">수정</b-button> <!-- bootstrap variant 버튼 색깔 -->
                <b-button variant="success" @click="deleteData">삭제</b-button>
            </div>
            <div class="content-detail-comment">
                <CommentList :contentId="contentId"/> <!-- CommentList props -->
            </div>
        </b-card>
    </div>
</template>

<script>
import data from "@/data";
import CommentList from './CommentList'; // CommentList 를 임포트 (상세보기 창 맨 아래 댓글 목록)

export default {
  name: "ContentDetail",
  components: {
    CommentList
  },
  data() {
    const contentId = Number(this.$route.params.contentId); //router URL에 contentId를 추가해서 어떤 상세글인지 표시
    const contentData = data.Content.filter(item => item.content_id === contentId)[0] // contentId를 참고하여 content의 item들을 추출
    return {
      contentId: contentId,
      title: contentData.title,
      context: contentData.context,
      user: data.User.filter(item => item.user_id === contentData.user_id)[0]
        .name, // user id의 이름을 참고하여 표시 (이렇게 하는 이유는 새로운 글이 등록되면 알기 위해서)
      created: contentData.created_at
    };
  },
  methods: {
    deleteData() {
      const content_index = data.Content.findIndex(item => item.content_id === this.contentId); // contentId 를 findIndex로 찾아서 그 데이터를
      data.Content.splice(content_index, 1) // splice 하여라
      this.$router.push({ // 그리고 다시 목록으로 돌아간다
        path: '/board/free'
      })
    },
    updateData() {
      this.$router.push({
        path: `/board/free/create/${this.contentId}` // 수정을 누르면 그 contentId를 참고하여 router로 수정 창 이동
      })
    }
  }
};
</script>
<style scoped>
.content-detail-content-info {
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
}
.content-detail-content-info-left {
  width: 720px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
.content-detail-content-info-right {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
.content-detail-content {
  border: 1px solid black;
  margin-top: 1rem;
  padding-top: 1rem;
  min-height: 720px;
}
.content-detail-button {
  border: 1px solid black;
  margin-top: 1rem;
  padding: 2rem;
}
.content-detail-comment {
  border: 1px solid black;
  margin-top: 1rem;
  padding: 2rem;
}
</style>