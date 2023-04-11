"use strict";
class TodoListImpl {
    constructor($target) {
        this.$target = $target;
        this.setEvent();
    }
    setEvent() {
        //버튼 클릭했을 때 모달창 activate
        this.$target.addEventListener('click', (e) => {
            const target = e.target;
            if (!(target instanceof HTMLButtonElement))
                return;
            const modal = document.body.querySelector('.modal');
            modal === null || modal === void 0 ? void 0 : modal.classList.toggle('active_modal');
        });
        //모달 창에서 취소버튼이나 더하기버튼 누르면 모달창 닫기
        const modal = document.body.querySelector('.modal');
        modal === null || modal === void 0 ? void 0 : modal.addEventListener('click', (e) => {
            const $target = e.target;
            const cancelButton = $target === null || $target === void 0 ? void 0 : $target.closest('.cancel_btn');
            const addButton = $target.closest('button');
        });
    }
}
const todolist = document.querySelector('.todo__list');
new TodoListImpl(todolist);
//# sourceMappingURL=main.js.map