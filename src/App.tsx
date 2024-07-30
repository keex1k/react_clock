import React from 'react';
import './App.scss';
import { Clock } from './Clock';

type State = {
  hasClock: boolean;
  clockName: string;
};

export class App extends React.Component<{}, State> {
  state = {
    hasClock: true,
    clockName: '0',
  };

  handleRightClick = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  handleLeftClick = (event: MouseEvent) => {
    if (event.button === 0) {
      // Sprawdzamy czy kliknięto lewy przycisk myszy
      this.setState({ hasClock: true });
    }
  };

  componentDidMount(): void {
    document.addEventListener('contextmenu', this.handleRightClick);
    document.addEventListener('click', this.handleLeftClick);
    window.setInterval(() => {
      this.setState({ clockName: Date.now().toString().slice(-4) });
    }, 3300);
  }

  componentWillUnmount(): void {
    document.removeEventListener('contextmenu', this.handleRightClick);
    document.removeEventListener('click', this.handleLeftClick);
  }

  componentDidUpdate(
    _prevProps: Readonly<{}>,
    prevState: Readonly<State>,
  ): void {
    // eslint-disable-next-line no-console
    console.debug(
      `Renamed from ${prevState.clockName} to ${this.state.clockName}`,
    );
  }

  render() {
    const content = (
      <div className="Clock">
        <strong className="Clock__name">Clock-{this.state.clockName}</strong>

        {' time is '}

        <span className="Clock__time">
          <Clock name={this.state.clockName} />
        </span>
      </div>
    );

    return (
      <div className="App">
        <h1>React clock</h1>

        {this.state.hasClock ? content : null}
      </div>
    );
  }
}
/*
export const App: React.FC = () => {
  //const today = new Date();
  let clockName = 'Clock-0';

  // This code starts a timer
  const timerId = window.setInterval(() => {
    clockName = getRandomName();
  }, 3300);

  // this code stops the timer
  window.clearInterval(timerId);

  return (
    <div className="App">
      <h1>React clock</h1>

      <div className="Clock">
        <strong className="Clock__name">{clockName}</strong>

        {' time is '}

        <span className="Clock__time">
          <Clock />
        </span>
      </div>
    </div>
  );
};
*/
