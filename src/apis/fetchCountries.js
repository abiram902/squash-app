const fetchCountries = () => {
  let returnArray = [];
  fetch("https://restcountries.eu/rest/v2/all")
    .then((res) => res.json())
    .then((data) => {
      for (let item of data) {
        returnArray.push({
          name: item.name,
          id: item.alpha2Code.toLowerCase(),
          phoneCode: item.callingCodes[0],
          flag: `https://flagcdn.com/w80/${item.alpha2Code.toLowerCase()}.png`,
        });
      }
    })
    .catch((err) => console.log(err.message));

  return returnArray;
};
export default fetchCountries;
