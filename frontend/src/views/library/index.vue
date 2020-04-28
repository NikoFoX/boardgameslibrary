<template>
  <div>
    <v-row justify-start>
      <v-col cols="6" sm="3" md="3" lg="3" v-for="game in library" :key="game.id">
        <v-card class="game-card" raised @click="gameDetails()">
          <v-img :src="game.cover" alt="Image here"></v-img>
        </v-card>
      </v-col>
    </v-row>
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
      },
      {
        id: 3,
        name: "Pandemic Legacy",
        cover:
          "https://cf.geekdo-images.com/imagepage/img/vuhGm0iS67iW8Z1019HsPmijRUU=/fit-in/900x600/filters:no_upscale()/pic2452831.png",
        bggLink:
          "https://boardgamegeek.com/boardgame/161936/pandemic-legacy-season-1"
      },
      {
        id: 4,
        name: "Neuroshima Hex 3.0",
        cover:
          "https://cf.geekdo-images.com/imagepage/img/yzaaayLuV4qUbO3M22T31gXiyYQ=/fit-in/900x600/filters:no_upscale()/pic1844819.jpg",
        bggLink: "https://boardgamegeek.com/boardgame/21241/neuroshima-hex-30"
      }
    ]
  }),
  methods: {
    gameDetails() {
      console.log("game details");
    }
  }
};
</script>

<style lang="scss" scoped>
.game {
  &-card {
  }
  &-title {
    padding: 5px;
    font-size: 2.3vmax;
    word-break: normal;
    line-height: normal;
  }
}
</style>
