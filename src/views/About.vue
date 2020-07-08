<template>
  <v-container>
    <div class="title">Interested in having a personal e-commerce store like this one? 
      Then <a href="http://timothyokooboh.github.io/portfolio"> contact me.</a> Not interested? Then read on...
    </div>
    <div class="my-3">
      Buy-Hub (when it's yours, you can name it whatever you choose) is a personal e-commerce application that gives sellers the ability to showcase their items/products to prospective buyers.
    </div>
    <div class="my-3">
      By <i> personal e-commerce store</i>, it means that you don't get to have other sellers display their own items and compete for space with you.
      <div>It's your application! So you can do with it whatever you like. You can choose to scale the application anytime and add extra features. And ofcourse, I will be there to bring your ideas into reality. <v-icon> mdi-emoticon-cool-outline </v-icon></div>
    </div>
    <div class="my-3 text-center headline">
      What are the features of the application?
    </div>
    <div class="my-3">
      <ol>
        <li>
          A dashboard for uploading items to database, receiving and attending to customers's orders.
          <div class="my-5">
            <video src="aboutbuyhub.mov" autoplay loop width="100%" id="video"> </video>
          </div>
        </li>
        <li>
          <div>A robust search functionality.</div>
          <div>
            Users can browse through your products by using the search field to enter names of items. <br>
            They can search for items by category; search for items by delivery mode (free delivery or paid delivery), and search for items by price.
          </div>
        </li>
        <li>
          Payment integration
          <div>
            Currently, the application is based on a <kbd> pay on delivery</kbd> scheme. <br>
            But if your business requires customers to make payment online before placing order for an item, then I can implement a secure payment integration e.g with Paystack.
          </div>
        </li>
      </ol>
    </div>
  </v-container>
</template>

<script>
export default {
  mounted() {
    document.getElementById("video").play()
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
  kbd {
    padding: 5px;
  }
  ol li {
    padding-bottom: 5px;
  }
</style>