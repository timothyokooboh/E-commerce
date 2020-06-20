<template>
  <div class="home">
    <v-container>
      <div class = "flex-container">
        <div class="input-container mx-5">
          <div class="input">
            <input type="text">
          </div>
          <div>
            <v-btn rounded small class="search-btn white--text" color="#241663">Search</v-btn>
          </div>
        </div>
        <div>
          <v-btn text color="#fff">
            <span>FILTER</span>
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
    
  }
}
</script>

<style scoped>
  .home {
    width: 100%;
    height: 100%;
    background: var(--primary-color)
  }
  .flex-container {
    width: 100%;
    display: flex;
    align-items: baseline;
  }
  .input-container {
    display: flex;
    width: 90%;
  }
  .input {
    width: 100%;
  }
  .input-container input {
    width: 100%;
    background: #fff;
    height: 35px;
    border-radius: 20px;
    outline: none;
    padding: 10px;
    color: var(--tertiary-color);
    font-weight: bold;
  }
  .search-btn {
    margin-left: -80px;
    margin-top: 4px;
  }
</style>
