function add (fooNumber){
  return fooNumber + 5;
};

function calculate (callback){
  const myNumber = 10;
  callback(myNumber);
};

calculate(function (fooNumber) { 
  console.log(add(fooNumber))
}); 