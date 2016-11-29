import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { sagas, bindSagaShuttle, shuttle as author } from './sagaShuttle';
import createShuttleTree from 'src/lib/createShuttleTree';

const reducers = createShuttleTree({ author });
const sagaMiddleware = createSagaMiddleware();
const enhancer = window.devToolsExtension ? window.devToolsExtension() : f => f;
const store = createStore(reducers, compose(applyMiddleware(sagaMiddleware), enhancer));
store.runSaga = sagaMiddleware.run;
store.close = () => store.dispatch(END);
store.runSaga(sagas);

@bindSagaShuttle
class App extends Component {

  setList() {
    const props = this.props;

    props.actions.setList(['Winter', 'is', 'coming.']);
  }

  fetchList() {
    const props = this.props;

    props.actions.fetchList();
  }

  sagaSelect() {
    const props = this.props;

    props.actions.sagaSelect();
  }

  toggleModal() {
    const props = this.props;

    props.actions.toggleModal();
  }

  render() {
    const props = this.props;

    console.log(props);

    return (
      <div>
        <p>Hello world.</p>
        <p>{ props.list.join(' ') }</p>
        <p><button onClick={::this.setList}>Set List</button></p>
        <p><button onClick={::this.fetchList}>Fetch List</button></p>
        <p><button onClick={::this.sagaSelect}>Saga Select</button></p>
        <p><button onClick={::this.toggleModal}>custom generator</button></p>
      </div>
    )
  }
};

ReactDom.render(
  <Provider store={store}>
    <App name="jaylone" />
  </Provider>,
  document.getElementById('root')
);
