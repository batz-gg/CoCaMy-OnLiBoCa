const listify = (words) => {
  let listed = '[';
  let first_pass = true;
  if (words.length > 0) {
    for (letter of words) {
      if (!first_pass) {
        listed += ' '
      }

      listed += '\'' + letter + '\',';
      first_pass = false;
    }
    listed = listed.slice(0, -1) + ']'
    return listed;
  }
  else {
    return '';
  }
}

const updateDetails = () => {
  const hash_string = document.getElementById('string').value
  if (hash_string.length === 0) {
    return;
  }

  const hash_listified_string = listify(hash_string)
  document.getElementById('hashed-into').value = hash_listified_string

  let codes = []
  for (let i = 0; i < hash_string.length; i++) {
    codes.push(hash_string.codePointAt(i))
  }
  const codes_listified_string = listify(codes)
  document.getElementById('code-points').value = codes_listified_string

  let add_them_up = '';
  let firstpass = true;
  for (code of codes) {
    if (!firstpass) {
      add_them_up += ' ';
    }
    add_them_up += code + ' +';
    firstpass = false;
  }
  add_them_up = add_them_up.slice(0, -1) + '=';
  document.getElementById('add-them-up').value = add_them_up

  const hash_value = codes.reduce((a, b) => a + b, 0)

  document.getElementById('hash-value').value = hash_value
}
