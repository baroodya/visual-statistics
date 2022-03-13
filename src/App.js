import "./App.css";
import { Grid, Row, Cell } from "./grid.js";
import personIcon from "./person-icon-16.png";
import { SlideContent } from "./SlideContent.js";
import { MathJaxContext, MathJax } from "better-react-mathjax";
import { BasicTutorial, onPageScrollBasic } from "./Tutorials/Basic.js";
import { InterTutorial, onPageScrollInter } from "./Tutorials/Inter.js";

/* Constants ******************************************************************/

let WINDOW_HEIGHT_PIXELS = window.innerHeight;
// let WINDOW_WIDTH_PIXELS = window.innerWidth;
let NUM_ROWS = 40;
let NUM_COLS = 40;
let CELL_WIDTH = 4;
let CELL_HEIGHT = 4;
let TOTAL_SLIDES = 7;
let BASIC_SLIDES = 7;
let INTER_SLIDES = 0;
let ADV_SLIDES = 0;
let TOTAL_HEIGHT = (TOTAL_SLIDES - 1) * WINDOW_HEIGHT_PIXELS; // start at height 0
let BASIC_HEIGHT = (BASIC_SLIDES - 1) * WINDOW_HEIGHT_PIXELS;
let INTER_HEIGHT = (INTER_SLIDES - 1) * WINDOW_HEIGHT_PIXELS;
let ADV_HEIGHT = (ADV_SLIDES - 1) * WINDOW_HEIGHT_PIXELS;

function App() {
  /* Functions ****************************************************************/

  // Update on user scroll
  function onPageScroll() {
    let scrollHeight = document.documentElement.scrollTop;

    // Update the arrows
    setArrowVisibility(scrollHeight);

    switch (true) {
      // Slide 0 / Title Page
      case scrollHeight <= WINDOW_HEIGHT_PIXELS: {
        let grid = document.getElementById("tutorial-visual-grid");

        // default settings for all changes
        for (const row of grid.childNodes) {
          row.style.transform = "translateY(0px)";
          row.style.background = "rgba(0,255,0,0)";
        }
        break;
      }
      // Basic Tutorial
      case scrollHeight <= BASIC_HEIGHT: {
        onPageScrollBasic(scrollHeight);
        break;
      }

      case scrollHeight <= INTER_HEIGHT: {
        break;
      }

      case scrollHeight <= ADV_HEIGHT: {
        break;
      }

      default:
        break;
    }
  }

  // Scroll to previous page when user clicks up arrow; check the arrow opacity
  function onUpArrowClick() {
    let slideNum = Math.floor(
      -0.001 + document.documentElement.scrollTop / WINDOW_HEIGHT_PIXELS
    );
    let newHeight = slideNum * WINDOW_HEIGHT_PIXELS;
    window.scroll({ top: newHeight, behavior: "smooth" });

    setArrowVisibility(newHeight);
  }

  // Scroll to next page when user clicks down arrow; check the arrow opacity
  function onDownArrowClick() {
    let slideNum = Math.ceil(
      0.001 + document.documentElement.scrollTop / WINDOW_HEIGHT_PIXELS
    );
    let newHeight = slideNum * WINDOW_HEIGHT_PIXELS;
    window.scroll({ top: newHeight, behavior: "smooth" });

    setArrowVisibility(newHeight);
  }

  // Transition arrow opacities based on scroll height
  function setArrowVisibility(scrollHeight) {
    let upArrow = document.getElementById("up-arrow");
    let downArrow = document.getElementById("down-arrow");

    // If on title page, make only down arrow usable
    if (scrollHeight / WINDOW_HEIGHT_PIXELS < 1) {
      upArrow.value = "disabled";
      upArrow.style.cursor = "default";
      upArrow.style.opacity = 0;

      downArrow.value = "regular";
      downArrow.style.cursor = "pointer";
      downArrow.style.opacity = 1;
    }
    // If in the middle, make both arrows usuable
    else if (scrollHeight / WINDOW_HEIGHT_PIXELS < TOTAL_SLIDES - 1) {
      upArrow.value = "regular";
      upArrow.style.cursor = "pointer";
      upArrow.style.opacity = 1;

      downArrow.value = "regular";
      downArrow.style.cursor = "pointer";
      downArrow.style.opacity = 1;
    }
    // If on last page, make only up arrow usable
    else {
      upArrow.value = "regular";
      upArrow.style.cursor = "pointer";
      upArrow.style.opacity = 1;

      downArrow.value = "disabled";
      downArrow.style.cursor = "default";
      downArrow.style.opacity = 0;
    }
  }

  // Make Visual Grid
  function makeGrid() {
    // Make Row of blocks for visual
    function makeRow() {
      let row = [];
      for (let i = 0; i < NUM_COLS / CELL_WIDTH; i++) {
        let el = (
          <Cell key={i} index={i}>
            <img src={personIcon} alt="icon representing a person" />
          </Cell>
        );
        row.push(el);
      }
      return row;
    }

    let grid = [];
    for (var i = 0; i < NUM_ROWS / CELL_HEIGHT; i++) {
      let row = makeRow();
      grid.push(
        <Row key={i} index={i}>
          {row}
        </Row>
      );
    }

    return grid;
  }

  /* Stuff that happens on page load ******************************************/

  // Reset to top of page
  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
  };

  let grid = makeGrid();
  window.onscroll = onPageScroll;

  /* HTML Rendering ***********************************************************/

  return (
    <MathJaxContext>
      <div className="App">
        {/* Title Page */}
        <header className="App-header">
          <div id="up-arrow" className="arrow up" onClick={onUpArrowClick} />
          <p>Visual Statistics</p>
          <p className="App-sub-header">
            An Independent Work Project by Alex Baroody
          </p>
          <div
            id="down-arrow"
            className="arrow down"
            onClick={onDownArrowClick}
          />
        </header>
        {/* Visual and Slides */}
        {/* <BasicTutorial grid={grid} /> */}
        <InterTutorial grid={grid} />
      </div>
    </MathJaxContext>
  );
}

export default App;
