<template>
  <div class="comment-create"> <!-- 댓글 작성 창 -->
    <b-input-group :prepend="name" class="mt-3"> <!-- name 수찬 textarea 내용 작성창 -->
      <b-form-textarea
        id="textarea"
        v-model="context"
        :placeholder="isSubComment ? '덧글에 덧글을 달아주세요~!' : '코멘트를 달아주세요~!'"
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <b-input-group-append>
        <b-button variant="info" @click="isSubComment ? createSubComment() : createComment()">작성하기</b-button> <!-- 대댓글창이 생기면 덧글에~ , 그냥 댓글에는 코멘트~ -->
      </b-input-group-append>
    </b-input-group>
  </div>
</template>
<script>
import data from "@/data";
export default {
  name: "CommentCreate",
  props: { // CommentListItem props로 하위 component로 보내기
    contentId: Number,
    reloadComments: Function,
    reloadSubComments: Function,
    subCommentToggle: Function,
    isSubComment: Boolean, // 댓글 창 과 대댓글 창 ? : 으로 구분
    commentId: Number,
  },
  data() {
    return {
      name: "수찬", // 로그인을 하지 않았으므로 댓글 작성자는 "수찬"으로 고정
      context: ""
    };
  },
  methods: {
    createComment() { // 댓글 작성
      const comment_id = data.Comment[data.Comment.length - 1].comment_id + 1; // 댓글 작성시 댓글 id에 +1을 부여하여 작성 시 새로운 id 생성
      data.Comment.push({
        comment_id: comment_id,
        user_id: 1, // 로그인을 하지 않았으므로 user_id는 '1' (수찬) 으로 고정
        content_id: this.contentId,
        context: this.context,
        created_at: "2019-04-19 14:11:11", // 날짜도 고정
        updated_at: null
      });
      this.reloadComments();
      this.subCommentToggle();
      this.context = "";
    },
    createSubComment() { // 덧글 달기 버튼을 클릭시 대댓글 작성창이 생성
      const subcomment_id = data.SubComment[data.SubComment.length - 1].subcomment_id + 1;
      data.SubComment.push({
        subcomment_id: subcomment_id,
        comment_id: this.commentId,
        user_id: 1,
        context: this.context,
        created_at: "2019-04-19 16:22:11",
        updated_at: null
      });
      this.reloadSubComments();
      this.subCommentToggle();
      this.context = "";
    }
  }
};
</script>
<style scoped>
.comment-create {
  display: flex;
  margin-bottom: 1em;
}
</style>