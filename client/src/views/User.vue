<template>
  <div class='user-page'>
    <div class='user__container'>
      <div class='user__color' :style='{backgroundColor: user.color}' />
      <div class='user__content'>
        <div class='user__info'>
          <div :style='{backgroundImage: `url(${user.avatar})`}' class='user__avatar' />
          <div class='user__data'>
            <span
              class='user__username'>{{ user.username.split('#')[0][0].toUpperCase() + user.username.split('#')[0].substring(1) }}<span>#{{ user.username.split('#')[1] }}</span></span>
          </div>
        </div>
        <div class='user__settings'>
          <div class='user__settings-option'>
            <div class='option__info'>
              <span class='option__title'>USERNAME</span>
              <span class='option__value'>{{ user.username }}</span>
            </div>
            <button class='option__edit-button'>Edit</button>
          </div>
          <div class='user__settings-option'>
            <div class='option__info'>
              <span class='option__title'>COLOR</span>
              <span class='option__value'>{{ user.color }}</span>
            </div>
            <button class='option__edit-button'>Edit</button>
          </div>
          <div class='user__settings-option'>
            <div class='option__info'>
              <span class='option__title'>AVATAR</span>
              <span class='option__value'>{{ user.avatar }}</span>
            </div>
            <button class='option__edit-button'>Edit</button>
          </div>
        </div>
      </div>
    </div>
    <!--      <button @click='exitButtonHandler'>Exit</button>-->
  </div>
</template>

<script>
export default {
  name: 'UserPage',
  methods: {
    exitButtonHandler() {
      this.$store.commit('setUser', { authorized: false, token: '' });
      localStorage.removeItem('token');
      localStorage.removeItem('userID');
      this.router('/login');
    },
  },
  mounted() {
    localStorage.setItem('lastPage', '/user');
  },
};
</script>

<style lang='scss' scoped>

.user-page {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .user__container {
    height: 60%;
    width: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;

    .user__color {
      height: 25%;
      width: 100%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    .user__content {
      background-color: var(--background-thirty);
      height: 75%;
      width: 100%;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      padding-inline: 20px;
    }

    .user__info {
      display: flex;
      //align-items: center;

      .user__avatar {
        margin-top: -40px;
        height: 100px;
        width: 100px;
        background-position: 50%;
        background-color: var(--background-thirty);
        background-size: cover;
        background-repeat: no-repeat;
        border: 6px solid var(--background-thirty);
        border-radius: 50%;
      }

      .user__data {
        margin: 15px 15px;

        .user__username {
          line-height: 100%;
          font-family: var(--font-header);
          font-size: 28px;
          font-weight: 500;

          & span {
            font-family: var(--font-primary);
            color: var(--text-secondary);
            font-weight: 600;
          }
        }
      }
    }

    .user__settings {
      width: 100%;
      height: 71%;
      margin-top: 20px;
      background-color: var(--background-primary);
      border-radius: 10px;
      padding: 5px 20px;

      .user__settings-option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;

        .option__info {
          display: flex;
          flex-direction: column;

          .option__title {
            font-family: var(--font-header);
            font-weight: 500;
            font-size: 15px;
            color: var(--text-secondary);
          }

          .option__value {
            font-size: 15px;
            font-family: var(--font-header);
            font-weight: 500;
          }
        }

        .option__edit-button {
          padding-inline: 20px;
          padding-block: 8px;
          border: none;
          background-color: var(--background-secondary);
          color: var(--text-primary);
          user-select: none;
          border-radius: 3px;
          font-family: var(--font-header);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }
      }
    }
  }
}

</style>