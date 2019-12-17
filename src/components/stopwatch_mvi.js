// https://codepen.io/liammclennan/pen/bMgWVG?editors=0010
import React from 'react';
import ReactDOM from 'react-dom';

let model = {
  running: false,
  time: 0
};

let view = (m) => {
  let minutes = Math.floor(m.time / 60);
  let seconds = m.time - (minutes * 60);
  let secondsFormatted =  `${seconds < 10 ? '0' : ''}${seconds}`;
  let handler = (event) => {
    model = update(model, m.running ? 'STOP' : 'START');
  };
  
  return <div>
    <h4>STOPWATCH MVI</h4>
    <p>{minutes}:{secondsFormatted}</p>
    <button onClick={handler}>{m.running ? 'Stop' : 'Start'}</button>
  </div>;
};

const update = (model, intent) => {
  const updates = {
    'START': (model) => Object.assign(model, {running: true}),
    'STOP': (model) => Object.assign(model, {running: false}),
    'TICK': (model) => Object.assign(model, {time: model.time + (model.running ? 1 : 0)})
  };
  return updates[intent](model);
};

const render = () => {
  ReactDOM.render(view(model),
    document.getElementById('root1')
  );
};

render();

setInterval(() => {
  model = update(model, 'TICK');
  render();
}, 1000);
