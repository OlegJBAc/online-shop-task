<template>
  <div class="paginator">
    <button @click="changePortion('prev')">
      <span>Prev</span>
    </button>
    <button v-for="page in currentPagesPortion"
            @click="changePage(page)"
            class="paginator__page-button"
            :class="{ 'current': currentPage === page }"
    >
      <span>{{ page }}</span>
    </button>
    <button @click="changePortion('next')">
      <span>Next</span>
    </button>

  </div>

</template>

<script>
export default {

  data() {
    return {
      pages: [],
      currentPagesPortion: null,
      leftPortionPageNumber: null,
      rightPortionPageNumber: null,
      portionSize: 10,
      countPages: null,
      countPortions: null,
      currentPortion: null,
    }
  },
  props: {
      currentPage: {
        type: Number,
        required: true,
      },

      totalItemsCount: {
        type: Number,
        required: true,
      },

      pageSize: {
        type: Number,
        required: true,
      }
  },

  methods: {
    changePage(page) {
      this.$emit('changePage', page)
    },

    initializePortionPages() {
      this.leftPortionPageNumber = (this.currentPortion + 1) * this.portionSize - 10
      this.rightPortionPageNumber = this.leftPortionPageNumber + this.portionSize

      this.currentPagesPortion = this.pages.filter(page => page >= this.leftPortionPageNumber && page <= this.rightPortionPageNumber)
    },

    initializePaginator() {
      this.countPages = Math.ceil(this.totalItemsCount / this.pageSize)
      this.countPortions = Math.ceil(this.countPages / this.portionSize)

      let localPages = []
      for (let i = 1; i <= this.countPages; i++) {
        localPages.push(i)
        this.pages = localPages
      }
      this.initializePortionPages()
    },

    changePortion(prevOrNext) {
      if(prevOrNext === 'prev'){
        if(this.currentPortion > 0) {
          this.currentPortion -= 1
          localStorage.setItem('currentPagesPortion', JSON.stringify(this.currentPortion))
          this.initializePortionPages()
        }
      }else{
        if(this.currentPortion < this.countPortions - 1) {
          this.currentPortion += 1
          localStorage.setItem('currentPagesPortion', JSON.stringify(this.currentPortion))
          this.initializePortionPages()
        }
      }
    },
  },

  created() {
    const localStorageCurrentPortion = localStorage.getItem('currentPagesPortion')
    if(localStorageCurrentPortion) {
      const localStorageCurrentPortionParse = JSON.parse(localStorageCurrentPortion)
      this.currentPortion = localStorageCurrentPortionParse
    }else{
      this.currentPortion = 0
      localStorage.setItem('currentPagesPortion', JSON.stringify(0))
    }

    this.initializePaginator()

  }

}
</script>
