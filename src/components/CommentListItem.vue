<template>
  <div>
    <div class="comment-list-item"> <!-- 댓글창 전체 -->
      <div class="comment-list-item-name"> <!-- 댓글창 왼쪽 박스 : 이름, 작성날짜 (name) -->
        <div>{{name}}</div>
        <div>{{commentObj.created_at}}</div>  <!-- commnentObj는 data에 comment에서 가져온 데이터 -->
      </div>
      <div class="comment-list-item-context">{{commentObj.context}}</div> <!-- 댓글창 가운데 내용 (context) -->
      <div class="comment-list-item-button"> <!-- 댓글창 오른쪽 박스 수정,삭제,대댓글 쓰기 (button) -->
        <b-button variant="info">수정</b-button>
        <b-button variant="info">삭제</b-button>
        <b-button variant="info" @click="subCommentToggle">덧글 달기</b-button> <!-- 덧글달기 클릭시 subCommentToggle 메소드 실행 -->
      </div>
    </div>
    <template v-if="subCommentCreateToggle"> <!-- 대댓글 달기 버튼 클릭시 이벤트 발생 -->
      <CommentCreate
        :isSubComment="true"
        :commentId="commentObj.comment_id"
        :reloadSubComments="reloadSubComments"
        :subCommentToggle="subCommentToggle"
      />
    </template>
    <template v-if="subCommentList.length > 0"> <!-- 대댓글이 존재한다면 -->
      <div
        class="comment-list-item-subcomment-list" 
        :key="item.subcomment_id"
        v-for="item in subCommentList"
      > <!-- 대댓글 리스트를 추출하기 -->
        <div class="comment-list-item-name"> <!-- 대댓글 이름, 작성날짜 -->
          <div>{{item.user_name}}</div>
          <div>{{item.created_at}}</div>
        </div>
        <div class="comment-list-item-context">{{item.context}}</div> <!-- 대댓글 내용과 수정,삭제 -->
        <div class="comment-list-item-button">
          <b-button variant="info">수정</b-button>
          <b-button variant="info">삭제</b-button>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import data from "@/data";
import CommentCreate from "./CommentCreate";
export default {
  name: "CommentListItem",
  props: {
    commentObj: Object // commentObj로 설정하고 부모 components (CommnetList)로 보냄
  },
  components: {
    CommentCreate // CommentCreate 부모components로 입력 값 보내기
  },
  data() {
    return {
      name: data.User.filter( // User에 있는 user_id와 comment에 있는 user_id가 일치하는 이름을 가져오기 
        item => item.user_id === this.commentObj.user_id
      )[0].name,
      subCommentList: data.SubComment.filter( // 대댓글 리스트 보여주기
        item => item.comment_id === this.commentObj.comment_id // data에있는 subcomment에서 comment_id를 참고해서 대댓글 보여주기
      ).map(subCommentItem => ({
        ...subCommentItem,
        user_name: data.User.filter(
          item => item.user_id === subCommentItem.user_id // subComment에서 일치하는 use 이름을 가져오기
        )[0].name
      })),
      subCommentCreateToggle: false
    }; // commentObj = data Comment , subCommentList = data SubComment
  },
  methods: {
    subCommentToggle() { // 댓글의 "덧글 달기" 함수 실행
      this.subCommentCreateToggle = !this.subCommentCreateToggle;
    },
    reloadSubComments() { // 대댓글 새로고침 다시 보여주기
      this.subCommentList = data.SubComment.filter( // 대댓글 함수 부모 컴포넌트로 넘기기
        item => item.comment_id === this.commentObj.comment_id
      ).map(subCommentItem => ({
        ...subCommentItem,
        user_name: data.User.filter( 
          item => item.user_id === subCommentItem.user_id
        )[0].name 
      }));
    }
  }
};
</script>
<style scoped>
.comment-list-item {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1em;
}
.comment-list-item-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.5px solid black;
  padding: 1em;
}
.comment-list-item-context {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50em;
  border: 0.5px solid black;
}
.comment-list-item-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.5px solid black;
  padding: 1em;
}
.btn {
  margin-bottom: 1em;
}
.comment-list-item-subcomment-list {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1em;
  margin-left: 10em;
}
</style>