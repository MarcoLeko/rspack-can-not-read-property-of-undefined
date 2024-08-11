function buildHtml(scriptPath, body) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <title>My App</title>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="${scriptPath}" defer></script>
  </head>
  <body>
    <div id="root">${body}</div>
  </body>
</html>
      `.trim();
}

export { buildHtml };
