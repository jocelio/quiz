import _ from 'lodash'
import uuidv1 from 'uuid/v1';
import CryptoJS from 'crypto-js'

export const CREATE_QUIZ = 'FETCH_QUIZ';
export const CREATE_QUESTION = 'CREATE_QUESTION'
export const SET_QUESTION_STATEMENT = 'SET_QUESTION_STATEMENT'
export const CREATE_ANSWER='CREATE_ANSWER'
export const SET_ANSWER_STATEMENT= 'SET_ANSWER_STATEMENT'
export const SAVE_QUIZ='SAVE_QUIZ';
export const LOAD_QUIZZES='LOAD_QUIZZES'

/*
* Chave usada para cifrar o json armazenado em localstorage
*/
const KEY = '5db62d50-74ab-11e8-99c8-07a12d3b99f3'

/*
* Método responsável por despachar um novo quiz no redux
*/
export function createQuiz(quizName){
    return {
        type: CREATE_QUIZ,
        payload: { quizName, uid: uuidv1() } /* retorna um novo uid para o quiz */
    };
}

/*
* Método responsável por adicionar questoes a um dado quiz
*/
export function createQuestion(quiz, question){
    return {
        type: CREATE_QUESTION,
        payload: {...quiz, questions: [...quiz.questions || {}, question]}
    };
}

/*
* Método responsável por adicionar respostas para uma dada questao em um dado quiz
*/
export function createAnswer(quiz, questionUid, answer){


    const q = _(quiz.questions)
        .filter(q => q.props.uid == questionUid) /* Filtra no quiz a questão em que a resposta será adicionada */
        .map(q => ({...q, props: {...q.props, answers:_.isArray(answer)?[...q.props.answers || {}, ...answer] : [...q.props.answers || {}, answer] }})) /* Adiciona a resposta no props daquela determinada questao  */
        .head() /* pega a primeira questao na lista (deve haver apenas uma, pois o filtro é realizado por unique id) */

    const questions = [...quiz.questions.filter(f => f.props.uid != questionUid) || {}, q] /* filtra no quiz todas as qustoes diferentes da questao que recebeu a resposta, e junta o resultado desse filtro com a nova questao que foi criada anteriormente criando assim uma nova lista de questoes no qual apenas uma foi modificada mas sem alteração de estado */

    return {
        type: CREATE_ANSWER,
        payload: {...quiz, questions: sorted(questions)} /* retorna o quiz e suas questoes ordenadas */
    };
}
/*
* Método usado para settar o texto de uma data questão.
*/
export function setQuestionStatement(quiz, statement, uid){

    const q = _(quiz.questions)
                  .filter(q => q.props.uid == uid) /* filtra questoes no quiz */
                  .map(q => ({...q, props: {...q.props, statement: statement}})) /* com o resultado do filtro anterior, atribui uma variavel no props desse componente contendo o statment, no caso o texto da questao. */
                  .head(); /*pega o promeiro item (deve haver apenas um pois o filtro é realizado por unique id)*/

    const questions = [...quiz.questions.filter(f => f.props.uid != uid) || {}, q] /* filtra no quiz todas as qustoes diferentes da questao que recebeu a resposta, e junta o resultado desse filtro com a nova questao que foi criada anteriormente criando assim uma nova lista de questoes no qual apenas uma foi modificada mas sem alteração de estado */

    return {
        type: SET_QUESTION_STATEMENT,
        payload: {...quiz, questions: sorted(questions)} /* retorna o quiz e suas questoes ordenadas */
    };
}

/*
* Método usado para settar o texto de uma dada resposta.
*/
export function setAnswerStatement(quiz, answerStatements, questionUid, answerUid){

  const question = _(quiz.questions)
                .filter(q => q.props.uid == questionUid)
                .head(); /* filtro para pegar a questao no qual a resposta que vamos settar está */

  const answer = _(question.props.answers)
                .filter(a => a.props.uid == answerUid) /* filtra na questao a resposta que precisamos settar o texto */
                .map(a => ({...a, props: {...a.props, answerStatements: answerStatements}})) /* o map modifica o props da resposta para adicionar uma propriedade answerStatement que é o texto da resposta */
                .head();  /* pega o primeiro e unico item na lista */

  const otherAnswers = _(question.props.answers)
                .filter(a => a.props.uid != answerUid).value() /* filtra todas as outras respostas */

  const allAnswer = _.sortBy([...otherAnswers, answer], a => a.props.uid) /* concatena todas as resposta numa unica lista */

  const newQuestion = {...question, props: {...question.props, answers: allAnswer}}; /* cria uma nova questao para substituir a questao anterior no qual teve uma resposta alterada */

  const questions = [...quiz.questions.filter(f => f.props.uid != questionUid) || {}, newQuestion] /* filtra todas as questoes diferentes da que foi alterada e ediciona a nova questao alterada */

  return {
      type: SET_ANSWER_STATEMENT,
      payload: {...quiz, questions: sorted(questions)} /* retorna o quiz e suas questoes ordenadas */
  };
}

export function saveQuiz(quiz){

  const ciphertext = localStorage.getItem('quizzes'); /* recupera os quizzes cifrados e armazenados em localStorage */

  const quizzes = _.isNil(ciphertext)? []: decrypt(ciphertext) /* se o texto cifrado for vazio, retorna uma lista vazia, se não, decifra o texto e retorna um json de quizzes*/

  localStorage.setItem('quizzes', encrypt([...quizzes, quiz])) /* adiciona o novo quiz à lista de quizzes, cifra essa lista e armazena novamente em localstorage */

  return {
      type: SAVE_QUIZ,
      payload: quizzes
  };

}

export function loadQuizzes(){

  const ciphertext = localStorage.getItem('quizzes'); /* recupera os quizzes cifrados e armazenados em localStorage */

  const quizzes = _.isNil(ciphertext)? []: decrypt(ciphertext) /* se o texto cifrado for vazio, retorna uma lista vazia, se não, decifra o texto e retorna um json de quizzes*/

  return {
      type: LOAD_QUIZZES,
      payload: quizzes
  };

}

/*
* Funcao que encripta o objeto json para uma string cifrada usando a KEY predeterminada.
*/
function encrypt(obj){
    return CryptoJS.AES.encrypt(JSON.stringify(obj), KEY);
}

/*
* Funcao que decripta o texto cifrado e retorna um objeto json
*/
function decrypt(ciphertext){
  const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

/*
* Funcao que ordena as questoes baseadas nos seus respectivos unique id
*/
function sorted(questions){ return _.sortBy(questions, q => q.props.uid)}
