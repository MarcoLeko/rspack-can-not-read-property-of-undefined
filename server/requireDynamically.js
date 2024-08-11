function requireDynamically(path) {
  return eval(`require('${path.split("\\").join("/")}');`);
}

export { requireDynamically };
