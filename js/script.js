const correctButton = document.getElementById('correct');
const incorrectButton = document.getElementById('incorrect');
const currentQuiz = document.querySelector('.is-current');

correctButton.addEventListener('click', function () {
    currentQuiz.classList.add('is-correct');
    /*
    // is-currentの次の要素を取得
    const nextQuiz = currentQuiz.previousElementSibling;
    // is-currentの要素を消去
    currentQuiz.remove();
    // is-currentを次の要素につける
    nextQuiz.classList.add('is-current');
    // 問題数を-1する
    */
})

incorrectButton.addEventListener('click', function () {
    currentQuiz.classList.add('is-incorrect');
/*
    // .is-current クラスが付いている要素の親要素を取得
    const parentElement = currentQuiz.parentElement;

    // .is-current クラスを外す
    removedElement.classList.remove('is-current');

    // is-currentの要素を親要素の最初の子要素として挿入する
    parentElement.insertBefore(removedElement, parentElement.firstChild);

    // .is-current クラスが付いている要素を親要素から一度取り外す
    const removedElement = parentElement.removeChild(currentQuiz);

    */

    

   /* 
   
   
   */

})

// 答えの表示非表示
currentQuiz.addEventListener('click', function () {
    const currentAnswer = currentQuiz.querySelector('.answer');
    currentAnswer.classList.toggle('is-shown');
})