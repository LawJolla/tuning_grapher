import Parse from 'papaparse';

const defaultConfig = {
  header: true
};

function parseCSV(csv, config = defaultConfig) {
  console.log('parse', Parse.parse(csv, config));
  return Parse.parse(csv, config);
}

export default parseCSV;
