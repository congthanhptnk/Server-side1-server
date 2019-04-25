exports.getFileName = (original) => {
  const splitString = original.split("/");
  let filename = "";

  if(splitString.length !== 0){
    filename = splitString[splitString.length - 1]
  }
  return filename
};