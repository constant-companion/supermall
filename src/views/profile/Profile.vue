<template>
  <div id="profile">
    <div class="profile-nav">
      <nav-bar>
        <div slot="center-nav">我的</div>
      </nav-bar>
    </div>
    <profile-login/>
    <profile-info/>
    <profile-content/>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import ProfileLogin from "./profilechildern/ProfileLogin";
import ProfileInfo from "./profilechildern/ProfileInfo";
import ProfileContent from "./profilechildern/ProfileContent";

export default {
  name: "Profile",
  components: {
    NavBar,
    ProfileLogin,
    ProfileInfo,
    ProfileContent
  }
}
</script>

<style scoped>
.profile-nav{
  background-color: #d4237a;
  color: white;
}
#profile {
  background-color: white;
}
</style>
