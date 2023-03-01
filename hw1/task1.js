function toLowerCaseWithFirstInUpperCase(str) {

  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1).toLowerCase();

}


function correctSpaces(str) {

  if (!str) return str;

  let punctuationMarks = ['.', '?', '!', '…', ':', ';', ',', '—'];
  let arr = str.split(' ');

  for (let i = 0; i < arr.length; i++) {

    if (arr[i] === '' || punctuationMarks.includes(arr[i])) {

      if (i != 0) {
        arr[i - 1] = arr[i - 1] + arr[i];
      }
      arr.splice(i, 1);
      i--;

    } else {

      for (let j = 0; j < arr[i].length - 1; j++) {

        if (punctuationMarks.includes(arr[i][j])) {
          let tail = arr[i].slice(j + 1);
          arr[i] = arr[i].slice(0, j + 1);
          arr.splice(i + 1, 0, tail);
          break;
        }

      }

    }

  }

  return arr.join(' ');

}


function countNumberOfWords(str) {
  return correctSpaces(str)?.split(' ').length;
}


function countUniqueWords(str) {

  if (!str) return str;

  let punctuationMarks = ['.', '?', '!', '…', ':', ';', ',', '—'];

  let arr = correctSpaces(str).split(' ');

  let map = new Map();

  for (let str of arr) {

    let word = (punctuationMarks.includes(str.at(-1))) ? str.slice(0, str.length - 1) : str;
    word = word.toLowerCase();

    let count = map.get(word);

    console.log(count);

    if (count) {
      map.set(word, count + 1)
    } else {
      map.set(word, 1);
    }

  }

  return map;

}