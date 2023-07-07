import React, { useState, useEffect } from 'react';

const TestComponent = () => {
  const [tests, setTests] = useState([]);

  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    const newQuestion = {
      description: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      optionE: '',
      correctOption: ''
    };

    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const save = () => {
    let testDescricao = document.getElementById('test-descricao').value;

    let newTest = {
      title: testDescricao,
      questions: questions,
    };

    testDescricao = '';

    fetch("http://localhost:8080/api/tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTest),
    })
      .then(() => {
        loadPage();
      });
  };

  const modify = (teste) => {

    let testeEditado = {
      title: teste.description,
      questions: teste.questions,
    };

    fetch(`http://localhost:8080/api/tests/${teste._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testeEditado),
    })
      .then(() => {
        loadPage();
      });
  };

  const loadPage = () => {
    fetch(`http://localhost:8080/api/tests`, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        setTests(data);
      });
  };

  const deleteTeste = (id) => {
    fetch(`http://localhost:8080/api/tests/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((data) => {
        loadPage();
      });
  };

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <div className="w-full mt-3 px-4">
      <h2 className="text-center text-3xl font-semibold border-b-2 border-black mb-3 pb-2">Testes</h2>
      <div className="w-full mt-3 px-4">
        <div className="mb-3">
          <div className="col-md-12">
            <button type="button" className="px-4 py-2 bg-sky-500 text-white text-sm mr-3 rounded rounded-xl" data-bs-toggle="modal" data-bs-target="#cadModal" >
              Cadastrar
            </button>
            <a className="px-4 py-2 bg-gray-500 text-white text-sm mr-3 rounded rounded-xl" href="/">Voltar</a>
          </div>
        </div>
        <div id="contTable">
          <div className="text-center mt-4 mb-4 d-none" id="loading">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Carregando...</span>
            </div>
          </div>
          <table className="table-auto w-full text-sm divide-y divide-gray-200 hover:shadow-xl border mb-3" id="main-table">
            <thead>
              <tr>
                <th width="10%" className='text-center border px-2 mx-2'>ID</th>
                <th width="80%" className='border px-2 mx-2'>Descrição</th>
                <th width="10%" className='text-center border px-2 mx-2'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test._id}>
                  <td className="text-center border px-2 mx-2">{test._id}</td>
                  <td className='border px-2 mx-2'>{test.title}</td>
                  <td className="text-center border px-2 mx-2">
                    <button type="button" className="px-2 py-1 bg-blue-500 text-white text-sm rounded m-1 hover:bg-blue-700" data-bs-toggle="modal" data-bs-target={`#cadModal-${test._id}`}>
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button type="button" onClick={() => deleteTeste(test._id)} className="px-2 py-1 bg-red-500 text-white text-sm rounded m-1 hover:bg-red-700">
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="modal fade custom-modal bg-zinc-400/50" id="cadModal" tabIndex="-1" role="dialog" aria-labelledby="cadModal" aria-hidden="true">
        <div className="modal-dialog modal-xl " role="document">
          <div className="modal-content bg-neutral-100">
            <div className="modal-header">
              <h5 className="text-3xl font-semibold" id="cadModal">Cadastrar novo questionário</h5>
            </div>
            <div className="p-4">
              <label>Assunto</label>
              <input type="text" name="descricao" id='test-descricao' className="w-full px-3 py-2 border rounded-md outline-none text-gray-700 focus:shadow-outline" />
            </div>
            <hr className='m-3' ></hr>
            <div className='row p-3'>
              <div className='col-2'>
                <button type="button" className="px-4 py-2 bg-green-600 hover:bg-green-800 text-white text-sm font-semibold mr-3 rounded rounded-xl" onClick={addQuestion}>
                  Adicionar Questão
                </button>
              </div>
            </div>
            <div className='table-responsive p-3'>
              <table className='table table-sm table-borderless table-hover font-12 table-bordered m-auto'>
                <thead className='thead-dark'>
                  <tr>
                    <th width="31%">Pergunta</th>
                    <th width="13%">Opção A</th>
                    <th width="13%">Opção B</th>
                    <th width="13%">Opção C</th>
                    <th width="13%">Opção D</th>
                    <th width="13%">Opção E</th>
                    <th width="2%">Correta</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question, index) => (
                    <tr key={question.id}>
                      <td><input className='w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500' value={question.description} onChange={(e) => handleQuestionChange(index, 'description', e.target.value)} /></td>
                      <td><input className='w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500' value={question.optionA} onChange={(e) => handleQuestionChange(index, 'optionA', e.target.value)} /></td>
                      <td><input className='w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500' value={question.optionB} onChange={(e) => handleQuestionChange(index, 'optionB', e.target.value)} /></td>
                      <td><input className='w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500' value={question.optionC} onChange={(e) => handleQuestionChange(index, 'optionC', e.target.value)} /></td>
                      <td><input className='w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500' value={question.optionD} onChange={(e) => handleQuestionChange(index, 'optionD', e.target.value)} /></td>
                      <td><input className='w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500' value={question.optionE} onChange={(e) => handleQuestionChange(index, 'optionE', e.target.value)} /></td>
                      <td><input className='w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500' value={question.correctOption} onChange={(e) => handleQuestionChange(index, 'correctOption', e.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={save} data-bs-dismiss="modal" className="px-4 py-2 bg-green-500 text-white rounded rounded-xl">Salvar</button>
              <button type="button" className="px-4 py-2 bg-red-500 text-white rounded rounded-xl" data-bs-dismiss="modal" >Cancelar</button>
            </div>
          </div>
        </div>
      </div>

      {tests.map((test) => (
        <div className="modal fade custom-modal" id={`cadModal-${test._id}`} tabIndex="-1" role="dialog" aria-labelledby={`cadModal-${test._id}`} aria-hidden="true" key={test._id}>
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="text-3xl font-semibold" id={`cadModal-${test._id}`}>Editar Teste</h5>
              </div>
              <div className="modal-body">
                <div className='row justify-content-center'>
                  <div className='col-12'>
                    <label htmlFor={`test-descricao-${test._id}`}>Assunto </label>
                    <input type="text" name="descricao" id={`test-descricao-${test._id}`} defaultValue={test.title} className="w-full px-3 py-2 border rounded-md outline-none text-gray-700 focus:shadow-outline" />
                  </div>
                </div>
                <div className='table-responsive mt-3'>

                  <table className='table table-sm table-borderless table-hover font-12 table-bordered m-auto'>
                    <thead className='thead-dark'>
                      <tr>
                        <th width="31%">Pergunta</th>
                        <th width="13%">Opção A</th>
                        <th width="13%">Opção B</th>
                        <th width="13%">Opção C</th>
                        <th width="13%">Opção D</th>
                        <th width="13%">Opção E</th>
                        <th width="2%">Correta</th>
                      </tr>
                    </thead>
                    <tbody>
                      {test.questions.map((question, index) => (
                        <tr key={question._id}>
                          <td><input className='w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500' id={`description-${index}`} defaultValue={question.description} /></td>
                          <td><input className='w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500' id={`optionA-${index}`} defaultValue={question.optionA} /></td>
                          <td><input className='w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500' id={`optionB-${index}`} defaultValue={question.optionB} /></td>
                          <td><input className='w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500' id={`optionC-${index}`} defaultValue={question.optionC} /></td>
                          <td><input className='w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500' id={`optionD-${index}`} defaultValue={question.optionD} /></td>
                          <td><input className='w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500' id={`optionE-${index}`} defaultValue={question.optionE} /></td>
                          <td><input className='w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500' id={`correctOption-${index}`} defaultValue={question.correctOption} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => modify(test)} data-bs-dismiss="modal" className="px-4 py-2 bg-green-500 text-white rounded rounded-xl">Salvar</button>
                <button type="button" className="px-4 py-2 bg-red-500 text-white rounded rounded-xl" data-bs-dismiss="modal">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestComponent;
