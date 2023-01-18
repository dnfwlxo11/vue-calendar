<template>
    <div id="plans-modal">
        <div class="modal">
            <div class="modal-header">
                <div class="header-left"></div>
                일정 보기
                <div class="mdi mdi-close header-right" @click="$emit('action:close')"></div>
            </div>
            <div class="modal-body">
                <div class="plans-title">
                    <div class="week" :class="{}">{{ week[modalPlansInfor[0].date] }}</div>
                    <div class="day">{{ modalPlansInfor[0].day }}</div>
                </div>
                <div class="plans">
                    <div class="plan" v-for="(plan, idx) of modalPlansInfor" 
                        :key="idx"
                        @click="updateData(plan)">
                        <span class="plan-title">{{ plan.title }}</span> 
                        - <span class="plan-content">{{ plan.content }}</span>
                    </div>
                </div>
            </div>
        </div>
        <plan-submit-menu 
            v-if="isSubmitModal" 
            :modalDateInfor="targetDate"
            @action:close="isSubmitModal=false"
            @update:submit="submit"
            @delete:data="deleteData" />
    </div>
</template>

<script>
import PlanSubmitMenu from '@/components/PlanSubmitMenu.vue'

export default {
    name: 'PlansModal',
    components: {
        PlanSubmitMenu,
    },
    props: {
        modalPlansInfor: {
            type: Array,
            default: () => {return []},
        },
    },
    data() {
        return {
            isProcessing: false,
            isSubmitModal: false,
            targetDate: null,
            week: ['일', '월', '화', '수', '목', '금', '토'],
        }
    },
    created() {
        window.addEventListener('keyup', this.keyEventListener);
    },
    methods: {
        updateData(plan) {
            this.targetDate = { ...plan, type: true };
            this.isSubmitModal = true;
        },
        submit(value) {
            this.$emit('update:submit', value)
            this.isSubmitModal = false;
        },
        keyEventListener(evt) {
            // 중복 방지
            if(this.isProcessing) return false;
            this.isProcessing = true;

            switch (evt.key) {
            case 'Enter':
                this.$emit('action:close');
                break;
            case 'Escape':
                this.$emit('action:close');
                break;
            default:
                break;
            }

            this.isProcessing = false
        },
        deleteData(value) {
            this.$emit('delete:data', value);
            this.isSubmitModal = false;
        },
    },
    destroyed() {
        window.removeEventListener('keyup', this.keyEventListener, false);
    }
}
</script>

<style lang="scss">
#plans-modal {
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
        height: calc(90% - 40px);
        text-align: center;
        padding: 20px 20px 20px 20px;
        background: white;

        & .week {
            color: grey;
            font-size: 16px;
        }

        & .day {
            font-weight: 600;
            font-size: 20px;
        }

        & .plans-title {
            margin-bottom: 20px;
        }

        & .plans {
            width: 90%;
            margin: 0 auto 0 auto;
            text-align: left;

            & .plan-title {
                font-size: 16px;
                font-weight: 600;
            }

            & .plan-content {
                font-size: 14px;
                font-weight: 400;
            }

            & .plan {
                width: calc(100% - 20px);
                padding: 3px 10px 3px 10px;
                margin: 0 0 4px 0;
                background: #EEDDFF;
                font-weight: 600;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow-x: hidden;
                overflow-y: auto;
                border-radius: 0.25rem;
            }
        }
    }
}
</style>