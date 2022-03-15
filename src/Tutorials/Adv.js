import { Grid } from "../grid.js";
import { SlideContent } from "../SlideContent.js";
import { MathJax } from "better-react-mathjax";
import graph from "../pvalue.png";

let WINDOW_HEIGHT_PIXELS = window.innerHeight;
let NUM_ROWS = 40;
let NUM_COLS = 40;
let CELL_WIDTH = 4;
let CELL_HEIGHT = 4;
let NUM_INFECTED_ROWS = NUM_ROWS / (CELL_HEIGHT * 2);
let NUM_INFECTED_ROWS_EX_2 = (9 * NUM_ROWS) / (CELL_HEIGHT * 10);

const intoSlide2 = (scrollHeight, grid, outline, math) => {
  let outlineOpacity =
    ((scrollHeight - WINDOW_HEIGHT_PIXELS) / WINDOW_HEIGHT_PIXELS) ** 5;

  outline.childNodes[0].style.opacity = outlineOpacity;
  outline.childNodes[1].style.opacity = outlineOpacity;

  let littleSep = (scrollHeight - WINDOW_HEIGHT_PIXELS) / 64;
  let bigSep = (scrollHeight - WINDOW_HEIGHT_PIXELS) / 16;

  let rotation = scrollHeight / WINDOW_HEIGHT_PIXELS - 1;

  let backgroundOpacity = (scrollHeight / WINDOW_HEIGHT_PIXELS - 1) * 0.5;

  for (const row of grid.childNodes) {
    let index = Number(row.getAttribute("index"));

    // Split half of uninfected people
    if (index < NUM_INFECTED_ROWS) {
      for (const block of row.childNodes) {
        let blockIndex = Number(block.getAttribute("index"));
        if (blockIndex < NUM_COLS / CELL_WIDTH / 2) {
          if (index === NUM_INFECTED_ROWS - 1 && blockIndex === 0) {
            block.style.transform =
              "translateX(" +
              -(bigSep + littleSep) +
              "px) translateY(" +
              (littleSep - bigSep) +
              "px) rotate(" +
              rotation +
              "turn)";
            block.style.background = "rgba(255,0,0," + backgroundOpacity + ")";
          } else {
            block.style.background = "rgba(0,255,0," + backgroundOpacity + ")";
            block.style.transform =
              "translateX(" + -bigSep + "px) translateY(" + -bigSep + "px)";
          }
        } else {
          block.style.transform =
            "translateX(" + bigSep + "px) translateY(" + -bigSep + "px)";
        }
      }
    } else {
      row.style.background = "rgba(0,0,0,0)";
      row.style.transform =
        "translateX(" + -bigSep + "px) translateY(" + bigSep + "px)";
      for (const block of row.childNodes) {
        block.style.background = "rgba(255,0,0," + backgroundOpacity + ")";
        let blockIndex = Number(block.getAttribute("index"));
        if (blockIndex < NUM_COLS / CELL_WIDTH / 2) {
          if (index < 10 && blockIndex === 0) {
            block.style.transform =
              "translateX(" +
              -littleSep +
              "px) translateY(" +
              -littleSep +
              "px)";
            block.style.background = "rgba(0,255,0," + backgroundOpacity + ")";
          }
        }
      }
    }
  }
  // prep math visual
  if (scrollHeight === 2 * WINDOW_HEIGHT_PIXELS) {
    math.style.opacity = 1;
    math.style.fontSize = "30px";

    let index = 0;
    for (const equation of math.childNodes) {
      equation.style.display = "block";
      if (index === 0) {
        equation.style.transform =
          "translateX(200px) translateY(" + WINDOW_HEIGHT_PIXELS + "px)";
      } else {
        equation.style.transform =
          "translateX(60px) translateY(" + 2 * WINDOW_HEIGHT_PIXELS + "px)";
      }
      index++;
    }
  }
};

const intoSlide3 = (scrollHeight, grid, outline, math) => {
  let sep = scrollHeight - 2 * WINDOW_HEIGHT_PIXELS;

  grid.style.transform = "translateY(" + -sep + "px)";
  outline.style.transform = "translateY(" + -sep + "px)";

  let index = 0;
  for (const equation of math.childNodes) {
    if (index === 0) {
      equation.style.transform =
        "translateX(200px) translateY(" + (WINDOW_HEIGHT_PIXELS - sep) + "px)";
    } else {
      equation.style.transform =
        "translateX(60px) translateY(" +
        (2 * WINDOW_HEIGHT_PIXELS - sep) +
        "px)";
    }
    index++;
  }
};

const intoSlide4 = (scrollHeight, grid, outline, math, graph) => {
  let prevVertSep = WINDOW_HEIGHT_PIXELS;
  let sep = scrollHeight - 3 * WINDOW_HEIGHT_PIXELS;
  let vertAdj = 105;

  grid.style.transform = "translateY(" + -(prevVertSep + sep) + "px)";
  outline.style.transform = "translateY(" + -(prevVertSep + sep) + "px)";

  let index = 0;
  for (const equation of math.childNodes) {
    if (index === 0) {
      equation.style.transform = "translateX(200px) translateY(" + -sep + "px)";
    } else {
      equation.style.transform =
        "translateX(60px) translateY(" +
        (WINDOW_HEIGHT_PIXELS - sep - vertAdj) +
        "px)";
    }
    index++;
  }

  // Prep graph visual
  if (scrollHeight == 4 * WINDOW_HEIGHT_PIXELS) {
    graph.style.transform = "translateY(" + WINDOW_HEIGHT_PIXELS + "px)";
    graph.style.opacity = 1;
  }
};

const intoSlide6 = (scrollHeight, grid, outline, math, graph, graphCover) => {
  let sep = scrollHeight - 5 * WINDOW_HEIGHT_PIXELS;
  let widthChange =
    (100 - (scrollHeight / WINDOW_HEIGHT_PIXELS - 5) * 100) ** 1 / 3;

  math.style.transform = "translateY(" + -sep + "px)";

  // Bring in the graph
  graph.style.transform = "translateY(" + (WINDOW_HEIGHT_PIXELS - sep) + "px)";
  graphCover.style.width = widthChange + "%";

  if (scrollHeight === 6 * WINDOW_HEIGHT_PIXELS) {
    grid.style.transform = "translateY(" + WINDOW_HEIGHT_PIXELS + "px)";
    outline.style.transform = "translateY(" + WINDOW_HEIGHT_PIXELS + "px)";
    outline.style.opacity = 1;
  }
};

const intoSlide7 = (scrollHeight, grid, outline, graph, graphCover) => {
  let sep = scrollHeight - 6 * WINDOW_HEIGHT_PIXELS;

  let widthChange = ((scrollHeight / WINDOW_HEIGHT_PIXELS - 6) * 100) ** 1 / 3;

  // push the graph out
  graph.style.transform = "translateY(" + -sep + "px)";
  graphCover.style.width = widthChange + "%";

  grid.style.transform = "translateY(" + (WINDOW_HEIGHT_PIXELS - sep) + "px)";
  outline.style.transform =
    "translateY(" + (WINDOW_HEIGHT_PIXELS - sep) + "px)";
};

const onPageScrollAdv = (scrollHeight) => {
  let grid = document.getElementById("adv-tutorial-visual-grid");
  let outline = document.getElementById("adv-tutorial-visual-outline");
  let math = document.getElementById("adv-tutorial-visual-math");
  let graph = document.getElementById("adv-tutorial-visual-graph");
  let graphCover = document.getElementById("adv-tutorial-visual-graph-cover");

  switch (true) {
    // Slide 0 - 1 Transition
    case scrollHeight <= WINDOW_HEIGHT_PIXELS:
      break;

    // Slide 1 - 2 Transition
    case scrollHeight <= 2 * WINDOW_HEIGHT_PIXELS: {
      intoSlide2(scrollHeight, grid, outline, math);
      break;
    }

    // Slide 3 - 4 Transition
    case scrollHeight <= 3 * WINDOW_HEIGHT_PIXELS: {
      intoSlide3(scrollHeight, grid, outline, math);
      break;
    }

    // Slide 4 - 5 Transition
    case scrollHeight <= 4 * WINDOW_HEIGHT_PIXELS: {
      intoSlide4(scrollHeight, grid, outline, math, graph);
      break;
    }

    // Slide 5 - 6 Transition
    case scrollHeight <= 5 * WINDOW_HEIGHT_PIXELS: {
      break;
    }

    // Slide 6 - 7 Transition
    case scrollHeight <= 6 * WINDOW_HEIGHT_PIXELS: {
      intoSlide6(scrollHeight, grid, outline, math, graph, graphCover);
      break;
    }

    // Slide 7 - 8 Transition
    case scrollHeight <= 7 * WINDOW_HEIGHT_PIXELS: {
      intoSlide7(scrollHeight, grid, outline, graph, graphCover);
      break;
    }

    default:
      break;
  }
};
const AdvTutorial = ({ id, grid }) => {
  return (
    <div id={id} className="Tutorial-body">
      <div class="Tutorial-visual">
        <div id="adv-tutorial-visual-outline" class="outline">
          <div class="outline-back-bottom" />
          <div class="outline-back-top" />
          <div class="outline-front-bottom" />
          <div class="outline-front-top" />
        </div>
        <Grid id="adv-tutorial-visual-grid" className="adv-grid">
          {grid}
          <div id="ldots" className="ldots">
            <MathJax>{"\\(\\ldots\\)"}</MathJax>
          </div>
        </Grid>
        <div id="adv-tutorial-visual-math" class="visual-math">
          <MathJax>
            {
              "\\(\\mathbb{P}\\{A|B\\} = \\frac{\\mathbb{P}\\{B|A\\} \\cdot \\mathbb{P}\\{A\\}}{\\mathbb{P}\\{B\\}}\\)"
            }
          </MathJax>
          <table>
            <tbody>
              <tr>
                <th />
                <th
                  style={{
                    textAlign: "center",
                    border: "solid",
                    borderWidth: "0 2px 0 2px",
                  }}
                >
                  Assoc.
                </th>
                <th style={{ textAlign: "center" }}>No Assoc.</th>
              </tr>
              <tr>
                <th style={{ textAlign: "end" }}>Reject Null</th>
                <td>Correct</td>
                <td>Type I</td>
              </tr>
              <tr>
                <th style={{ textAlign: "end" }}>Fail to Reject Null</th>
                <td>Type II</td>
                <td>Correct</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="adv-tutorial-visual-graph" class="visual-graph">
          <div id="graph-img">
            <img src={graph} alt="graph displaying a p-value" />
          </div>
          <div
            id="adv-tutorial-visual-graph-cover"
            class="visual-graph-cover"
          />
        </div>
      </div>
      <div className="Tutorial-section first-section">
        <div className="Tutorial-text">
          <div className="Tutorial-header">Advanced Tutorial</div>
          <MathJax>{SlideContent["Adv"][1]}</MathJax>
        </div>
      </div>
      <div className="Tutorial-section">
        <div className="Tutorial-text">
          <MathJax>{SlideContent["Adv"][2]}</MathJax>
        </div>
      </div>
      <div className="Tutorial-section">
        <div className="Tutorial-text">
          <MathJax> {SlideContent["Adv"][3]} </MathJax>
        </div>
      </div>
      <div className="Tutorial-section">
        <div className="Tutorial-text">
          <MathJax>{SlideContent["Adv"][4]}</MathJax>
        </div>
      </div>
      <div className="Tutorial-section">
        <div className="Tutorial-text">
          <MathJax>{SlideContent["Adv"][5]}</MathJax>
        </div>
      </div>
      <div className="Tutorial-section">
        <div className="Tutorial-text">
          <MathJax>{SlideContent["Adv"][6]}</MathJax>
        </div>
      </div>
      <div className="Tutorial-section last-section">
        <div className="Tutorial-text">
          <MathJax>{SlideContent["Adv"][7]}</MathJax>
        </div>
      </div>
    </div>
  );
};

export { AdvTutorial, onPageScrollAdv };