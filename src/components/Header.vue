<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info"> <!-- b-navbar toggleable variant b-collapse -->
      <b-navbar-brand href="#">Vue.js</b-navbar-brand> <!-- navbar 헤더 네비게이션, collapse 헤더 목록-->

      <b-navbar-toggle target="nav_collapse"/>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item href="#">공지사항</b-nav-item>
          <b-nav-item to="/board/free">자유게시판</b-nav-item>
          <b-nav-item href="#">구인구직</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  }
};
</script>

<style>
.navbar-brand {
margin-left: 2rem;
}
</style>