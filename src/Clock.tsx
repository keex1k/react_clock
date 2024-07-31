import React from 'react';

type State = {
  time: Date;
};

type Props = {
  name: string;
};

export class Clock extends React.Component<Props, State> {
  state = {
    time: new Date(),
  };

  timerId = 0;

  componentDidMount(): void {
    this.timerId = window.setInterval(() => {
      this.setState(
        {
          time: new Date(this.state.time.getTime() + 1000),
        },
        () => {
          // eslint-disable-next-line no-console
          console.log(this.state.time.toUTCString().slice(-12, -4));
        },
      );
    }, 1000);
  }

  componentWillUnmount(): void {
    window.clearInterval(this.timerId);
  }

  render() {
    return this.state.time.toUTCString().slice(-12, -4);
  }
}
