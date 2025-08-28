const svg = document.getElementById("drawingCanvas");

let isDrawing = false;
let currentPath = null;
let pathData = '';

svg.addEventListener("mousedown", (e) => {
  isDrawing = true;

  const { x, y } = getMousePosition(e);
  pathData = `M ${x} ${y}`; // ✅ fixed with backticks

  currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  currentPath.setAttribute("stroke", "blue");
  currentPath.setAttribute("stroke-width", 2);
  currentPath.setAttribute("fill", "none");
  currentPath.setAttribute("d", pathData);

  svg.appendChild(currentPath);
});

svg.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;

  const { x, y } = getMousePosition(e);
  pathData += ` L ${x} ${y}`;
  currentPath.setAttribute("d", pathData);
});

svg.addEventListener("mouseup", () => {
  isDrawing = false;
  currentPath = null;
});

svg.addEventListener("mouseleave", () => {
  isDrawing = false;
  currentPath = null;
});

function getMousePosition(evt) {
  const CTM = svg.getScreenCTM();
  return {
    x: (evt.clientX - CTM.e) / CTM.a,
    y: (evt.clientY - CTM.f) / CTM.d
  };
}
