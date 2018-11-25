<template>
  <div class="fab">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
  @import '../colors';

  .fab{
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: #fff;
    border-radius: 50%;
    background: $orange-gradient;
    width: 2em;
    height: 2em;
    box-shadow: 0 1px 5px rgba(#000, 0.3);
    transition: box-shadow 0.15s ease-in-out;
    user-select: none;
    cursor: pointer;
    z-index: 6;

    &:hover{
      box-shadow: 0 5px 20px rgba(#000, 0.3);
    }
  }
</style>
