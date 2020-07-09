<template>
    <div class="text-center">
        <div class="display-1 py-5">
            404 NOT FOUND
        </div>
        <div class="py-3 headline">
            The page you are looking for does not exist
        </div>
        <router-link to = "/">
            <v-btn text class="info"> Go back to home page </v-btn>
        </router-link>
    </div>
</template>

<style scoped>
    a {
        text-decoration: none;
    }
</style>