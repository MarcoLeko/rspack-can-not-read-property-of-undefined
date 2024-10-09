function buildHtml(scriptPath, body, initialData) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <title>My App</title>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://unpkg.com/react@18.2.0/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js"></script>
  </head>
  <body>
    <div id="root">${body}</div>
    <script src="hydrator.js"></script>
    <script src="index.js"></script>
    <link rel="stylesheet" href="index.css">
    <script defer>
        window.addEventListener("DOMContentLoaded", function (e) {
            window.custom = { data: ${initialData} };
            const root = document.querySelector("#root");
            window.hydrator.index.init(document.querySelector("#root"));
        });
    </script>
  </body>
</html>
      `.trim();
}

export { buildHtml };
