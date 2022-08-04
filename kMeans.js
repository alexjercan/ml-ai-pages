class KMeans {
  constructor(k, maxIter) {
    this.k = k;
    this.maxIter = maxIter;
  }

  fit(X) {
    this.errors = new Array();
    this.centroids = this.initCentroids(X);
    this.clusters = this.initClusters(X);
    for (let i = 0; i < this.maxIter; i++) {
      const error = this.computeError(X);
      this.errors.push(error);
      if (i > 0 && Math.abs(this.errors[i] - this.errors[i - 1]) < 0.001 || this.errors[i] >= this.errors[i - 1]) {
        break;
      }

      this.updateClusters(X);
      this.updateCentroids(X);
    }
  }

  computeError(X) {
    let error = 0;
    for (let i = 0; i < X.length; i++) {
      error += this.distance(X[i], this.centroids[this.clusters[i]]);
    }
    return error;
  }

  initCentroids(X) {
    const centroids = new Array(this.k);
    for (let k = 0; k < this.k; k++) {
      let centroid = X[Math.floor(Math.random() * X.length)];
      while (centroids.some(c => this.distance(c, centroid) < 0.1)) {
        centroid = X[Math.floor(Math.random() * X.length)];
      }
      centroids[k] = centroid;
    }
    return centroids;
  }

  initClusters(X) {
    const clusters = new Array(X.length);
    for (let i = 0; i < X.length; i++) {
      clusters[i] = Math.floor(Math.random() * this.k);
    }
    return clusters;
  }

  updateClusters(X) {
    for (let i = 0; i < X.length; i++) {
      let minDistance = Number.MAX_VALUE;
      let minIndex = 0;
      for (let k = 0; k < this.k; k++) {
        const distance = this.distance(X[i], this.centroids[k]);
        if (distance < minDistance) {
          minDistance = distance;
          minIndex = k;
        }
      }
      this.clusters[i] = minIndex;
    }
  }

  updateCentroids(X) {
    for (let k = 0; k < this.k; k++) {
      const cluster = X.filter((_, i) => this.clusters[i] === k);
      this.centroids[k] = this.centroid(cluster);
    }
  }

  centroid(X) {
    const centroid = new Array(X[0].length);
    for (let i = 0; i < X[0].length; i++) {
      let sum = 0;
      for (let j = 0; j < X.length; j++) {
        sum += X[j][i];
      }
      centroid[i] = sum / X.length;
    }
    return centroid;
  }

  distance(p1, p2) {
    let sum = 0;
    for (let i = 0; i < p1.length; i++) {
      sum += (p1[i] - p2[i]) * (p1[i] - p2[i]);
    }
    return Math.sqrt(sum);
  }
}
