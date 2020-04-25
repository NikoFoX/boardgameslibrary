<template>
  <div>
    <v-container grid-list-xs>
      <v-row justify-start>
        <v-col cols="auto" v-for="game in library" :key="game.id">
          <v-card max-width="250" elevation="10">
            <v-card-title primary-title>{{ game.name }}</v-card-title>
            <v-card-text>
              <v-img :src="game.cover" max-width="200" contain alt="Image here"></v-img>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Library",
  data: () => ({
    library: [
      {
        id: 1,
        name: "Pandemic",
        cover:
          "https://cf.geekdo-images.com/imagepage/img/3mRLkaz_shArWqExOXUS59cQowY=/fit-in/900x600/filters:no_upscale()/pic1534148.jpg",
        bggLink: "https://boardgamegeek.com/boardgame/30549/pandemic"
      },
      {
        id: 2,
        name: "Arkham Horror 3rd Ed",
        cover:
          "https://cf.geekdo-images.com/imagepage/img/KnbBZ6ioy7OfhM7d0ZsQMm11tII=/fit-in/900x600/filters:no_upscale()/pic4582151.jpg",
        bggLink:
          "https://boardgamegeek.com/boardgame/257499/arkham-horror-third-edition"
      }
    ]
  })
};
</script>

<style lang="scss" scoped>
</style>
