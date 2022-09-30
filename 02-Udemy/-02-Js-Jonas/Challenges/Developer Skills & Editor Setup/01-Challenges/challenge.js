const printForecast = (arr) => {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str += `${arr[i]}ºC in ${i+1} days ... `;
  }

  console.log(`... ${str}`);
};
