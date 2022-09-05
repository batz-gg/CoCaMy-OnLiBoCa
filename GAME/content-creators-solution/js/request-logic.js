function getContentType(filename) {
  const extension = filename.match(/.*\.([^\.]*)$/)[1];

  if (extension === 'html') {
    return 'text/html';
  } else if (extension === 'css') {
    return 'text/css';
  } else if (extension === 'jpg' || extension === 'jpeg') {
    return 'image/jpeg';
  }

  return 'text/plain';
}