<template>
  <div v-if='user.authorized' class='user-page'>
    <div class='user__container'>
      <div :style='{backgroundColor: user.color}' class='user__color' />
      <div class='user__content'>
        <div class='user__info'>
          <div :style='{backgroundImage: `url(${user.avatar})`}' class='user__avatar' />
          <div class='user__data'>
            <span
              class='user__username'>{{ username }}<span>{{ userHashTag }}</span></span>
          </div>
        </div>
        <div class='user__settings'>
          <div class='user__settings-option'>
            <div class='option__info'>
              <span class='option__title'>TOKEN</span>
              <span class='option__value'>{{ userToken }}</span>
            </div>
            <button class='option__edit-button' @click='showFullToken = !showFullToken'>
              {{ showFullToken ? 'Hide' : 'Show' }}
            </button>
          </div>
          <div v-for='setting in userSettings' class='user__settings-option'>
            <div class='option__info'>
              <span class='option__title'>{{ setting.title }}</span>
              <span class='option__value'>{{ setting.value() }}</span>
            </div>
            <button v-if='setting.handler' class='option__edit-button' @click='setting.handler()'>
              Edit
            </button>
          </div>
          <div class='settings__buttons'>
            <button @click='deleteAccountButtonHandler' v-if='showDeleteButton' class='buttons__delete-account-button'>
              Delete account
            </button>
            <button @click='showDeleteButton = !showDeleteButton' class='buttons__show-delete-button'>
              <i class='uil uil-ellipsis-h'></i>
            </button>
            <button class='buttons__exit-button' @click='exitButtonHandler'>
              Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <EditUsernameModal :visible='editNameModal' @visible='editNameModal = $event' />
  <EditUserColorModal :visible='editColorModal' @visible='editColorModal = $event' />
  <EditUserAvatarModal :visible='editAvatarModal' @visible='editAvatarModal = $event' />
</template>

<script>
import EditUsernameModal from '../components/EditUsernameModal.js';
import EditUserColorModal from '../components/EditUserColorModal.js';
import EditUserAvatarModal from '../components/EditUserAvatarModal.js';

export default {
  name: 'UserPage',
  components: { EditUserAvatarModal, EditUserColorModal, EditUsernameModal },
  data() {
    return {
      editNameModal: false,
      editColorModal: false,
      editAvatarModal: false,
      showDeleteButton: false,
      showFullToken: false,
      userSettings: [
        {
          title: 'USERNAME',
          value: () => this.user.username,
          handler: () => this.editNameModal = true,
        },
        {
          title: 'COLOR',
          value: () => this.user.color,
          handler: () => this.editColorModal = true,
        },
        {
          title: 'AVATAR',
          value: () => this.userAvatar,
          handler: () => this.editAvatarModal = true,
        },
      ],
    };
  },
  methods: {
    exitButtonHandler() {
      this.$store.commit('user/setUser', { authorized: false, token: '' });
      localStorage.removeItem('token');
      localStorage.removeItem('userID');
      this.router('/login');
    },
    deleteAccountButtonHandler() {
      this.socket.emit('user:delete', this.user.id);
      this.exitButtonHandler();
    },
  },
  computed: {
    username() {
      if (this.user.username.split('#')[1]) {
        let username = this.user.username.split('#')[0];
        return username[0].toUpperCase() + username.substring(1);
      } else {
        return this.user.username[0].toUpperCase() + this.user.username.substring(1);
      }
    },
    userHashTag() {
      if (this.user.username.split('#')[1]) {
        return '#' + this.user.username.split('#')[1];
      } else {
        return '';
      }
    },
    userToken() {
      if (this.showFullToken) {
        return this.user.token;
      } else {
        return this.user.token.slice(0, this.user.token.length / 2) + '...';
      }
    },
    userAvatar() {
      if (this.user.avatar.length >= 60) {
        return this.user.avatar.slice(0, 45) + '...';
      }

      return this.user.avatar;
    },
  },
  mounted() {
    if (this.user.authorized) {
      localStorage.setItem('lastPage', '/user');
    }
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
    width: 60%;
    max-width: 700px;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;

    .user__color {
      height: 100px;
      width: 100%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    .user__content {
      background-color: var(--background-thirty);
      width: 100%;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      padding-inline: 20px;
      padding-bottom: 20px;

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
        height: auto;
        margin-top: 20px;
        background-color: var(--background-primary);
        border-radius: 10px;
        padding: 5px 20px;

        .settings__buttons {
          display: flex;
          align-items: center;
          justify-content: right;
          margin-top: 15px;
          margin-bottom: 5px;

          .buttons__exit-button {
            background-color: var(--background-thirty);
            color: var(--text-primary);
            font-family: var(--font-primary);
            font-weight: 600;
            padding-inline: 20px;
            padding-block: 11px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
          }

          .buttons__show-delete-button {
            cursor: pointer;
            background: none;
            border: none;
            height: max-content;
            color: var(--text-primary);
            font-family: var(--font-header);
            font-size: 25px;
            margin-right: 10px;
          }

          .buttons__delete-account-button {
            background-color: var(--background-thirty);
            color: var(--text-primary);
            font-family: var(--font-primary);
            font-weight: 600;
            padding-inline: 20px;
            padding-block: 11px;
            border-radius: 4px;
            border: none;
            cursor: pointer;
            margin-right: 10px;
          }
        }

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
              font-weight: 600;
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
            min-width: 60px;
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
}

</style>