<template>
  <Dashboard>
    <section>
      <div class="budget">
        <div class="group">
          <div class="group-title">Housing</div>

          <div class="categories">
            <div class="category">
              <div class="title">Rent</div>
              <div class="amount">$1,000</div>
              <div class="amount">$1,000</div>
            </div>
          </div>
        </div>

        <div class="group">
          <div class="group-title">Transportation</div>

          <div class="categories">
            <div class="category">
              <div class="title">Auto Loan</div>
              <div class="amount">$400</div>
              <div class="amount">$250</div>
            </div>

            <div class="category">
              <div class="title">Fuel</div>
              <div class="amount">$100</div>
              <div class="amount">$28</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Dashboard>
</template>

<script>
import Dashboard from '../layouts/dashboard';

export default {
  components: {
    Dashboard
  }
}
</script>


<style lang="scss" scoped>
  .budget{
    width: 70%;
  }

  .group{
    background-color: #fff;
    box-shadow: 0 5px 20px rgba(#000, 0.1);
    border-radius: 6px;
    margin-bottom: 2em;

    .group-title{
      font-size: 20px;
      padding: 1em;
    }

    .categories{
      border-top: 1px solid #ddd;
      margin: 0 1em;
      font-size: 18px;
    }

    .category{
      display: flex;
      padding: 1em 0;

      .title{
        margin-right: auto;
      }

      .amount{
        color: #888;
        width: 100px;
        margin-left: 1em;
      }
    }
  }
</style>
