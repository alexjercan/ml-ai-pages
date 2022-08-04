class LinearRegression {
  constructor(learningRate, maxIter) {
    this.learningRate = learningRate;
    this.maxIter = maxIter;
  }

  fit(X, y) {
    this.bias = 0;
    this.weights = new Array(X[0].length);
    this.errors = new Array();
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = 1;
    }
    for (let i = 0; i < this.maxIter; i++) {
      const error = this.gradientDescent(X, y);
      this.errors.push(error);
      if (i > 0 && Math.abs(this.errors[i] - this.errors[i - 1]) < 0.001 || this.errors[i] >= this.errors[i - 1]) {
        break;
      }
    }
  }

  gradientDescent(X, y) {
    let totalError = 0;
    let error = 0;
    for (let i = 0; i < X.length; i++) {
      let output = this.predict(X[i]);
      error = y[i] - output;
      for (let j = 0; j < this.weights.length; j++) {
        this.weights[j] += this.learningRate * error * X[i][j];
      }
      this.bias += 0.1 * error;

      totalError += error * error;
    }

    return totalError;
  }

  predict(x) {
    let output = this.bias;
    for (let i = 0; i < this.weights.length; i++) {
      output += this.weights[i] * x[i];
    }
    return output;
  }
}
