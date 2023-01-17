<template>
  <div id="plan-submit-modal">
    <div class="modal">
      <div class="modal-header">
        <div class="header-left"></div>
        일정 등록
        <div class="mdi mdi-close header-right" @click="$emit('on-close')"></div>
      </div>
      <div class="modal-body">
        <div class="body-title">
          <div style="width: 24px;"></div>
          <input class="title-input" type="text" placeholder="제목">
        </div>
        <div class="body-date">
          <div class="mdi mdi-calendar-month-outline"></div>
          <input style="margin-right: 10px;" type="date" :value="targetDate">
          <div style="margin: auto 0 auto 0;">
            <button :class="isFullDay ? 'btn' : 'btn-outline'"
              @click="isFullDay=!isFullDay">{{isFullDay ? '종일' : '시간대'}}</button>
          </div>
        </div>
        <div v-if="!isFullDay" class="body-time">
          <div class="mdi mdi-clock-time-four-outline"></div>
          <input style="margin-right: 10px;" type="time" :value="targetTime">
        </div>
        <div class="body-content">
          <div class="mdi mdi-text-long"></div>
          <textarea cols="50" rows="8" placeholder="내용을 적어주세요."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn" @click="$emit('on-submit')">저장</button>
      </div>
    </div>
  </div>    
</template>

<script>
export default {
    name: 'PlanSubmitModal',
    props: {
      modalDateInfor: {
        type: Object,
        default: () => {},
      }
    },
    data() {
      return {
        targetDate: null,
        targetTime: '08:00:00',
        isFullDay: true,
      }
    },
    mounted() {      
      this.setTargetDate();
      
    },
    methods: {
      setTargetDate() {
        const year = this.modalDateInfor.year;
        const month = this.modalDateInfor.month;
        const day = this.modalDateInfor.day;

        this.targetDate = `${year}-${month}-${day.toString().padStart(2, '0')}`;
      },
    },
}
</script>

<style lang="scss" scoped>
#plan-submit-modal {
  position: absolute;
  top: calc(50% - 25%);
  left: calc(50% - 15%);

  min-width: 300px;
  min-height: 400px;
  height: 50%;
  width: 30%;

  @media (pointer:coarse) {
    top: calc(50% - 35%);
    left: calc(50% - 45%);

    height: 70%;
    width: 90%;
  }
}

.modal {
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 15px;

  & .modal-header, .modal-footer {
    padding: 0 20px 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .modal-header {
    font-weight: 600;

    & .header-right, .header-left {
      width: 30px;
    }

    & .header-left {
      margin-right: auto;
    }

    & .header-right {
      margin-left: auto;

      &:hover {
        cursor: pointer;
      }
    }

    height: 10%;
    background: #F1F3F5;
  }

  & .modal-body {
    width: calc(100% - 40px);
    height: calc(80% - 60px);
    text-align: center;
    padding: 30px 20px 30px 20px;
    background: white;

    & .mdi {
      width: 24px;
      font-size: 24px;
      color: grey;
    }

    & .body-title {
      width: 100%;
      margin-bottom: 40px;

      & .title-input {
        
        padding: 7px;
        width: 80%;
        font-size: 18px;
        border: none;
        border-bottom: 1px solid lightgray;
      }
    }

    & .body-date, .body-time, .body-content {
      display: flex;
      margin-bottom: 20px;

      & .mdi {
        margin-right: 10px;
      }

      & input[type=radio] {
        box-sizing: border-box;
        appearance: none;
        background: white;
        outline: 2px solid #333;
        border: 4px solid white;
        width: 5px;
        height: 5px;

        &:checked {
          background: #333;
        }
      }
    }

    & .body-date {
      & input {
        border: none;
        border-bottom: 1px solid grey;
      }
    }

    & .body-time {
      position: relative;
      height: 30px;
    }

    & .body-content {
      & textarea {
        padding: 5px;
        background: #F1F3F5;
        border: none;
        border-radius: 0.25rem;
        resize: none;
      }
    }
  }

  & .modal-footer {
    height: 10%;
    background: white;
    justify-content: flex-end;
  }
}

.btn {
  height: 70%;
  background: #413BF7;
  color: white;
  min-width: 50px;
  border-radius: 0.25rem;
  border: none;
  font-weight: 600;

  &:hover {
    cursor: pointer;
  }
}

.btn-outline {
  height: 70%;
  background: white;
  color: #413BF7;
  min-width: 50px;
  border-radius: 0.25rem;
  border: 1px solid #413BF7;
  font-weight: 600;

  &:hover {
    cursor: pointer;
  }
}
</style>