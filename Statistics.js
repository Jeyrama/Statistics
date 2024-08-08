/*
Create a class, DataSet, that has the following properties and methods:
  data - Contains an array of the data
  mean - Contains the value of the mean average of the data
  variance - Contains the value of the variance of the data
  stdDeviation - Contains the standard deviation of the data
  setMean() - A function that calculates the mean, updates this.mean and returns the value of the mean
  setVar() - Sets/resets the variance and the standard deviation of the data set and returns the variance

For example, if I initiate a DataSet with the following data:
  let myData = new DataSet(1,2,3,4,5,6,7);

The following properties will be automatically set:
  myData.data === [1,2,3,4,5,6,7];
  myData.mean === 4
  myData.variance === 4
  myData.stdDeviation === 2

Furthermore, if I then alter some of the entries in myData.data and 
then call the functions setMean() and setVar(), the mean, standard deviation and 
variance of the data should be recalculated and the value of the new mean and variance returned.

Notes:
  Regarding Float Handling and Precision

In this challenge, the computed values of your variance and stdDeviation need only be correct to 3 decimal places 
(the author's solution being the standard for correct values), so you may assume float arithmetic is commutative.
*/


// Solution

function mean(list) {
	return list.reduce((sum, n) => sum + n) / list.length;
}

class DataSet {
	constructor(...data) {
  	this.data = data;
    this.setMean();
    this.setVar();
	}
  
  setMean() {
  	return this.mean = mean(this.data);
  }
  
  setVar() {
  	const m = mean(this.data);
		this.variance = mean(this.data.map(x => (x - m) ** 2));
    this.stdDeviation = Math.sqrt(this.variance);
    return this.variance;
  }
}

// or

const DataSet = function(...data) {
  const calcMean = d => d.reduce((c,p)=>c+p,0)/d.length;
  const calcVariance = (d, m) => calcMean(d.map(a => Math.pow(a-m,2)));

  let _data = data;
  let _mean = calcMean(_data);
  let _variance = calcVariance(_data,_mean);
  let _stdDeviation = Math.sqrt(_variance);
    
  return {
    get mean() { return _mean; },
    get data() { return _data; },
    set data(d) { _data = d; },
    get variance() { return _variance },
    get stdDeviation() { return _stdDeviation },
    setMean:_=> {
      _mean = calcMean(_data);
      return _mean;
    },
    setVar:_=> {
      _variance = calcVariance(_data,_mean);
      _stdDeviation = Math.sqrt(_variance);
      return _variance;
    }
  };
}