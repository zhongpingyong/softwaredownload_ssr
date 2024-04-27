<template>
  <div class="error-wrap">
    <img
      v-if="error.statusCode === 404"
      src="/404.png"
      width="140"
      height="140"
      class="img ml-auto mr-auto"
      alt="404"
    />
    <img
      v-else
      src="/empty.png"
      width="140"
      height="140"
      class="img ml-auto mr-auto"
      alt="empty"
    />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  error: {
    url: string
    statusCode: number
    statusMessage: string
    message: string
    description: string
    data: any
  }
}
defineProps<Props>()
</script>

<style lang="scss" scoped>
  .error-wrap {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    .img {
      margin: 0 auto;
    }
  }
</style>
