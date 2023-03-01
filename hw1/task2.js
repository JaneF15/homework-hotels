function sum(s1, s2) {

  if (!isFinite(s1) || !isFinite(s2)) return NaN;

  let a1 = s1.split('').reverse();
  let a2 = s2.split('').reverse();

  let result = [];
  let carry = 0;

  for (let i = 0; i < Math.max(a1.length, a2.length); i++) {

    let a = (a1[i]) ? +a1[i] : 0;
    let b = (a2[i]) ? +a2[i] : 0;

    let sum = a + b + carry;
    carry = Math.floor(sum / 10);

    result.push(sum % 10);

  }

  if (carry != 0) result.push(carry);

  removeLeadingZeros(result);

  return result.reverse().join('');

}


function diff(s1, s2) {

  if (!isFinite(s1) || !isFinite(s2)) return NaN;

  let sign = '';

  if (s1.length < s2.length || (s1.length == s2.length && s1 < s2)) {
    [s1, s2] = [s2, s1];
    sign = '-';
  }

  let a1 = s1.split('').reverse();
  let a2 = s2.split('').reverse();

  let result = [];
  let carry = 0;

  for (let i = 0; i < a1.length; i++) {

    let a = (a1[i]) ? +a1[i] : 0;
    let b = (a2[i]) ? +a2[i] : 0;

    let diff = a - b - carry;
    carry = (diff < 0) ? 1 : 0;

    result.push((diff + 10) % 10);

  }

  removeLeadingZeros(result);

  return sign + result.reverse().join('');

}


function mult(s1, s2) {

  if (!isFinite(s1) || !isFinite(s2)) return NaN;

  if (s1.length < s2.length) {
    [s1, s2] = [s2, s1];
  }

  let a1 = s1.split('').reverse();
  let a2 = s2.split('').reverse();

  let result = [];
  let carry = 0;
  let partialSum = '';
  let zeros = '';

  for (let j = 0; j < a2.length; j++) {

    carry = 0;
    let b = +a2[j];

    result.push(zeros);
    zeros += '0';

    for (let i = 0; i < a1.length; i++) {

      let a = +a1[i];

      let mult = a * b + carry;
      carry = Math.floor(mult / 10);

      result.push(mult % 10);

    }

    if (carry != 0) result.push(carry);

    partialSum = sum(partialSum, result.reverse().join(''));

    result.length = 0;

  }

  return partialSum;

}


function div(s1, s2) {

  if (!isFinite(s1) || !isFinite(s2)) return NaN;

  s1 = removeLeadingZeros(s1.split('').reverse()).reverse().join('');
  s2 = removeLeadingZeros(s2.split('').reverse()).reverse().join('');

  if (s2 == '0') return Infinity;

  let d = s1.length - s2.length;

  let subMult = (d > 1) ? Math.pow(10, d - 1) : 1;
  subMult = String(subMult);

  let partialDiff = s1;
  let count = 0;
  let result = '';
  let multS2BySubMult = mult(s2, subMult);

  while (compareNumInStr(partialDiff, multS2BySubMult) == 1) {

    partialDiff = diff(partialDiff, multS2BySubMult);
    count++;

    if (compareNumInStr(partialDiff, multS2BySubMult) == 0) {
      subMult = subMult.slice(0, subMult.length - 1);
      multS2BySubMult = mult(s2, subMult);
      result += String(count);
      count = 0;

      if (subMult == '') break;
    }

  }

  //округляем до ближайшего целого (как round())
  if (compareNumInStr(partialDiff, s2) == 0) {
    let multByTwo = mult(partialDiff, '2');

    result = +result + compareNumInStr(multByTwo, s2);
  }

  return String(result);

}



function removeLeadingZeros(arr) {
  while (arr.at(-1) == '0' && arr.length != 1) {
    arr.pop();
  }
  return arr;
}

function compareNumInStr(s1, s2) {
  return (s1.length < s2.length || (s1.length == s2.length && s1 < s2)) ? 0 : 1;
}