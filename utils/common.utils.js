
exports.fileOrFolderNameValidator = (name) => {
  return /^[\w\-. ]+$/.test(name);
}

exports.throwLocalError = (error) => {
  throw error;
}