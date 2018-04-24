const createCountdown = (self, type, initialValue) => {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      if (self.state[type] > 0) {
        self.setState({
          [type]: self.state[type] - 1
        });
      } else {
        clearInterval(interval);

        self.setState({
          [type]: initialValue
        });

        resolve();
      }
    }, 1000);
  });
};

export default createCountdown;
