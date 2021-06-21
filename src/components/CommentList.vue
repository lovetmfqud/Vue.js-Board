<template>
  <div>
    <div :key="item.comment_id" v-for="item in comments">
      <CommentListItem :commentObj="item"/> 
    </div>
    <CommentCreate :contentId="contentId" :reloadComments="reloadComments"/>
  </div>
</template> <!-- 댓글 창, 대댓글 창 listitem 댓글 작성창 create -->

<script>
import data from '@/data';
import CommentListItem from './CommentListItem'; 
import CommentCreate from './CommentCreate';
 
export default {
    name: 'CommentList',
    components: {
        CommentListItem,
        CommentCreate,
    },
    props: {
        contentId: Number,
    },
    data() {
        return {
            comments: data.Comment.filter(item => item.content_id === this.contentId)
        }
    },
    methods: {
        reloadComments() {
            this.comments = data.Comment.filter(item => item.content_id === this.contentId)
        }
    }
}
</script>