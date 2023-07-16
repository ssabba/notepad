import { useEffect, useRef } from "react";

export default function useGame() {
  const container = document.getElementById("container");
  const startPage = document.getElementById("start-page");
  const legInput = document.getElementById("leg-input");
  const menuPage = document.getElementById("menu-page");
  const oldMenuPage = menuPage?.cloneNode(true);
  const runPage = document.getElementById("run-page");
  const runPageCopy = runPage?.cloneNode(true);
  const resultPage = document.getElementById("result-page");
  const resultPageCopy = resultPage?.cloneNode(true);
  let ghostLegCrt = document.getElementById("ghost-leg-container");
  let resultContainer = document.getElementById("results");
  let ghostLegCrtCopy = ghostLegCrt?.cloneNode(true);
  let legShow = {};
  let topInput = {};
  let middleLine = {};
  let bottomInout = {};
  let pScrollBtn = {};
  let nScrollBtn = {};
  let runPScrollBtn = {};
  let runNScrollBtn = {};
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  const startBtn = document.getElementById("start-btn");

  const config = {
    minLegs: 2,
    maxLegs: 20,
    chunkSize: 5,
  };

  const state = {
    legNumber: 5,
    legScrollPosition: 0,
    topValues: [],
    bottomValues: [],
    hLinesNum: [2, 8],
  };

  const runPageLeg = {
    path: [],
    legContainer: {},
    vLinesPoints: [],
    colors: [
      "DarkBlue",
      "DarkCyan",
      "DarkGoldenRod",
      "DarkGray",
      "DarkGrey",
      "DarkGreen",
      "DarkKhaki",
      "DarkMagenta",
      "DarkOliveGreen",
      "DarkOrange",
      "DarkOrchid",
      "DarkRed",
      "DarkSalmon",
      "DarkSeaGreen",
      "DarkSlateBlue",
      "DarkSlateGray",
      "DarkSlateGrey",
      "DarkTurquoise",
      "DarkViolet",
      "DeepPink",
      "DeepSkyBlue",
      "DimGray",
      "DimGrey",
      "DodgerBlue",
    ],
    viewed: [],
    legScrollPosition: 0,
    loop: {},
  };

  const docs = {
    topInputs: [],
    bottomInputs: [],
    topDataInput: {},
    bottomDataInput: {},
  };

  const init = () => {
    const easterEgg = document.getElementById("easterEgg-page");
    unhideElement(startPage);
    if (legInput && legInput.value) {
      legInput.value = config.minLegs;
    }
    hideElement(menuPage);
    hideElement(runPage);
    hideElement(resultPage);
    hideElement(easterEgg);
    //start(null);
  };

  const increaseLeg = () => {
    if (legInput.value < config.maxLegs) return legInput.value++;
    legInput.value = config.maxLegs;
  };

  const decreaseLeg = () => {
    if (legInput?.value > config.minLegs) return legInput.value--;
    legInput.value = config.minLegs;
  };

  legInput?.addEventListener("change", () => {
    let v = parseInt(this.value);
    if (v < config.minLegs) this.value = config.minLegs;
    else if (v > config.maxLegs) this.value = config.maxLegs;
  });

  legInput?.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      startBtn.click();
    }
  });

  const openFullscreen = async () => {
    if (!document.fullscreenElement) {
      await container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const start = e => {
    e.preventDefault();
    if (config.minLegs <= legInput.value && legInput.value <= config.maxLegs) {
      state.legNumber = parseInt(legInput.value);
      hideElement(startPage);
      startMenuPage();
      return false;
    } else {
      alert("Leg must be in 2 to 20");
      return false;
    }
    return false;
  };

  startBtn?.addEventListener("click", start);

  const leftScrollLegShow = element => {
    state.legScrollPosition = legShow.scrollLeft;
    legShow.scrollLeft += legShow.offsetWidth;
  };

  const rightScrollLegShow = element => {
    state.legScrollPosition = legShow.scrollLeft;
    legShow.scrollLeft -= legShow.offsetWidth;
  };

  const checkSliders = () => {
    if (legShow.scrollLeft < 5) {
      hideElement(pScrollBtn);
    } else {
      unhideElement(pScrollBtn);
    }
    if (legShow.scrollLeft + legShow.offsetWidth > legShow.scrollWidth - 5) {
      hideElement(nScrollBtn);
    } else {
      unhideElement(nScrollBtn);
    }
  };

  const hideElement = element => {
    const hideClass = "hide-element";
    if (element && !element.classList.contains(hideClass)) {
      element.classList.add(hideClass);
    }
  };

  const unhideElement = element => {
    const hideClass = "hide-element";
    if (element?.classList.contains(hideClass)) {
      element.classList.remove(hideClass);
    }
  };

  const showElement = element => {
    const hideClass = "hide-element";
    if (element.classList.contains(hideClass)) {
      element.classList.remove(hideClass);
    }
  };

  const createTopInput = id => {
    const value = id.slice(id.indexOf("-") + 1);
    const td = document.createElement("td");
    const input = document.createElement("input");
    input.classList.add("top-input");
    input.type = "text";
    input.maxLength = `${config.chunkSize}`;
    input.setAttribute("id", id);
    input.value = value;
    td.appendChild(input);
    docs.topInputs[parseInt(value)] = input;
    return td;
  };

  const createMiddleLine = () => {
    const td = document.createElement("td");
    const div = document.createElement("div");
    div.classList.add("connect-line");
    td.appendChild(div);
    return td;
  };

  const createBottomInput = id => {
    const value = id.slice(id.indexOf("-") + 1);
    const td = document.createElement("td");
    const input = document.createElement("input");
    input.classList.add("top-input");
    input.type = "text";
    input.maxLength = `${config.chunkSize}`;
    input.setAttribute("id", id);
    input.value = value;
    td.appendChild(input);
    docs.bottomInputs[parseInt(value)] = input;
    return td;
  };

  const createLegTable = () => {
    for (let i = 0; i < state.legNumber; i++) {
      topInput.appendChild(createTopInput(`topInput-${i}`));
      middleLine.appendChild(createMiddleLine());
      bottomInout.appendChild(createBottomInput(`bottomInput-${i}`));
    }
  };

  const createDataInputNumber = numb => {
    const numbers = document.createElement("p");
    numbers.setAttribute("class", "input-numbers");
    let text = "";
    for (let i = 0; i < numb; i++) {
      text += `${i + 1}.\n`;
    }
    let textElement = document.createTextNode(text.toString());
    numbers.appendChild(textElement);
    return numbers;
  };

  const createDataInput = () => {
    const textarea = document.createElement("textarea");
    const td = document.getElementById("top-input-cont");
    console.log({textarea})
    textarea.type = "text";
    textarea.setAttribute("id", "top-data-input");
    textarea.setAttribute("oninput", "checkInput(this)");
    textarea.maxLength = (
      state.legNumber +
      state.legNumber * config.chunkSize
    ).toString();
    textarea.classList.add("entry-table-textarea");
    // for (let i = 0; i < state.legNumber; i++) {
    //   textarea.value += `${i}\n`;
    // }
    let numbers = createDataInputNumber(state.legNumber);
    td.appendChild(numbers);
    td.appendChild(textarea);
    const td2 = document.getElementById("bottom-input-cont");
    const bottom = textarea.cloneNode();
    bottom.setAttribute("id", "bottom-data-input");
    numbers = createDataInputNumber(state.legNumber);
    td2.appendChild(numbers);
    td2.appendChild(bottom);
    docs.topDataInput = textarea;
    docs.bottomDataInput = bottom;
  };

  function sliceStringInChunks(string, values, chunkSize) {
    string = string.trim();
    string = string.replace(/ /g, "");
    const charArray = [...string];
    const valuesArray = new Array(values).fill("");
    let value = "";
    let valueCount = 0;
    charArray.every((char, index) => {
      value += char;
      if (!value.startsWith("\n")) {
        if (
          value.length >= chunkSize ||
          value.endsWith("\n") ||
          value.endsWith(",") ||
          index === charArray.length - 1
        ) {
          value = value.trim();
          value = value.replace(/,/, "");
          value = value.replace(/\n/, "");
          valuesArray[valueCount] = value;
          valueCount++;
          value = "";
        }
      } else {
        value = "";
      }
      return true;
    });
    return valuesArray;
  }

  const insertInputValues = () => {
    const topString = docs.topDataInput.value;
    if (topString.length > 0) {
      docs.topDataInput.value = topString.trim();
      let stringArray = sliceStringInChunks(
        topString,
        docs.topInputs.length,
        config.chunkSize
      );
      docs.topInputs.forEach((topInput, index) => {
        topInput.value = stringArray[index];
      });
    }

    const bottomString = docs.bottomDataInput.value;
    if (bottomString.length > 0) {
      docs.bottomDataInput.value = bottomString.trim();
      stringArray = sliceStringInChunks(
        bottomString,
        docs.bottomInputs.length,
        config.chunkSize
      );
      docs.bottomInputs.forEach((bottomInput, index) => {
        bottomInput.value = stringArray[index];
      });
    }

    updateValueState();
  };

  const updateValueState = () => {
    docs.topInputs.forEach(topInput => {
      const index = topInput.id.slice(topInput.id.indexOf("-") + 1);
      state.topValues[index] = topInput.value;
    });
    docs.bottomInputs.forEach(bottomInput => {
      const index = bottomInput.id.slice(bottomInput.id.indexOf("-") + 1);
      state.bottomValues[index] = bottomInput.value;
    });
  };

  const updateBoxValues = () => {
    docs.topInputs.forEach(topInput => {
      const index = topInput.id.slice(topInput.id.indexOf("-") + 1);
      topInput.value = state.topValues[index];
    });
    docs.bottomInputs.forEach(bottomInput => {
      const index = bottomInput.id.slice(bottomInput.id.indexOf("-") + 1);
      bottomInput.value = state.bottomValues[index];
    });
  };

  const shuffler = valuesArr => {
    const values = valuesArr.length;
    let newArray = Array(values)
      .fill()
      .map((_, i) => i);
    let newValues = [];
    let arrLength = newArray.length;
    for (let i = 0; i < arrLength; i++) {
      let randIndex = getRndInteger(0, newArray.length - 1);
      let value = newArray.splice(randIndex, 1);
      newValues.push(valuesArr[value[0]]);
    }
    return newValues;
  };

  const shuffle = () => {
    updateValueState();
    state.topValues = shuffler(state.topValues);
    state.bottomValues = shuffler(state.bottomValues);
    updateBoxValues();
  };

  const setUserHLineReq = () => {
    const minLen = document.getElementById("h-line-min");
    const maxLen = document.getElementById("h-line-max");
    minLen.oninput = function () {
      let max = parseInt(this.max);
      let min = parseInt(this.min);
      if (parseInt(this.value) > max) {
        return (this.value = max);
      } else if (parseInt(this.value) < min) {
        return (this.value = min);
      }
      if (parseInt(this.value) > state.hLinesNum[1]) {
        return (this.value = state.hLinesNum[1]);
      }
      state.hLinesNum[0] = parseInt(this.value);
    };
    maxLen.oninput = function () {
      let max = parseInt(this.max);
      let min = parseInt(this.min);
      if (parseInt(this.value) > max) {
        return (this.value = max);
      } else if (parseInt(this.value) < min) {
        return (this.value = min);
      }
      if (parseInt(this.value) < state.hLinesNum[0]) {
        return (this.value = state.hLinesNum[0]);
      }
      state.hLinesNum[1] = this.value;
    };
  };

  const gotoRunPage = () => {
    updateValueState();
    hideElement(menuPage);
    renderRunPage();
  };

  const startMenuPage = () => {
    unhideElement(menuPage);
    menuPage.innerHTML = oldMenuPage.innerHTML;
    docs.topInputs = [];
    docs.bottomInputs = [];
    docs.topDataInput = {};
    docs.bottomDataInput = {};
    state.legScrollPosition = 0;
    state.topValues = [];
    state.bottomValues = [];
    state.hLinesNum = [2, 8];
    legShow = document.getElementById("leg-show");
    topInput = document.getElementById("top-input-row");
    middleLine = document.getElementById("middle-connect-line");
    bottomInout = document.getElementById("bottom-input-row");
    createLegTable();
    createDataInput();
    setUserHLineReq();
    pScrollBtn = document.getElementById("scroll-btn-p");
    nScrollBtn = document.getElementById("scroll-btn-n");
    if (legShow.offsetWidth === legShow.scrollWidth) {
      hideElement(pScrollBtn);
      hideElement(nScrollBtn);
    } else {
      unhideElement(pScrollBtn);
      unhideElement(nScrollBtn);
    }
    checkSliders();
    document.getElementById("top-input-cont").addEventListener("click", () => {
      document.getElementById("top-data-input").focus();
    });
    document
      .getElementById("bottom-input-cont")
      .addEventListener("click", () => {
        document.getElementById("bottom-data-input").focus();
      });
    document.getElementById("insert-btn").addEventListener("click", () => {
      if (mediaQuery.matches) {
        document.getElementById("main").classList.remove("main-shift");
      }
    });

    if (mediaQuery.matches) {
      document.getElementById("main").classList.add("main-shift");
      document
        .getElementById("mobile-scroll-left")
        .classList.add("mobile-scroll-show");
    }

    mediaQuery.addListener(e => {
      if (e.matches) {
        document.getElementById("main").classList.add("main-shift");
      }
    });
  };

  const slideMobileLegLeft = () => {
    if (mediaQuery.matches) {
      const element = document.getElementById("mobile-scroll-left");
      document.getElementById("main").classList.remove("main-shift");
      element.classList.remove("mobile-scroll-show");
      document
        .getElementById("mobile-scroll-right")
        .classList.add("mobile-scroll-show");
    }
    insertInputValues();
  };

  const slideMobileLegRight = element => {
    if (mediaQuery.matches) {
      document.getElementById("main").classList.add("main-shift");
      element.classList.remove("mobile-scroll-show");
      document
        .getElementById("mobile-scroll-left")
        .classList.add("mobile-scroll-show");
      insertInputValues();
    }
  };

  function checkInput(element) {
    let val = element.value;
    let newVal = "";
    let checkLen;
    let nNumbers = "";
    val = [...val];
    val.every((value, index) => {
      if (nNumbers.length + 1 > state.legNumber) return false;
      newVal += value;
      if (value === "\n") nNumbers += value;
      return true;
    });
    element.value = newVal;
    if (newVal.lastIndexOf("\n") == -1) {
      checkLen = newVal.length;
    } else {
      checkLen = newVal.length - newVal.lastIndexOf("\n") - 1;
    }
    if (checkLen <= config.chunkSize) {
      const checkChars =
        element.value.length >=
        state.legNumber * config.chunkSize + (newVal.split(/\n/g).length - 1);
      const checkN = newVal.split(/\n/g).length - 1 >= state.legNumber;
      if (checkChars || checkN) {
        insertInputValues();
        element.blur();
      }
    } else if (newVal.at(-1) != /\n/) {
      element.value = newVal.substring(0, newVal.length - 1);
    }
  }

  const gotoMenuPage = () => {
    unhideElement(menuPage);
    hideElement(runPage);
  };

  const goToStart = () => {
    hideElement(menuPage);
    unhideElement(startPage);
  };

  const calculateVLines = (number, height, width, startPoint = [0, 0]) => {
    const lines = [];
    let startX = startPoint[0];
    let startY = startPoint[1];
    let endX = startX;
    let endY = startY + height;
    for (let i = 0; i < number; i++) {
      const line = [startX, startY, endX, endY];
      lines.push(line);
      startX += width;
      endX = startX;
    }
    return lines;
  };

  const getRandomValues = (values, minHLines) => {
    const currentValues = [...values];
    const nextValues = [...values];
    const points = getRndInteger(minHLines, values.length);
    const current = [];
    const next = [];
    for (let i = 0; i < points; i++) {
      let randomIndex = getRndInteger(0, currentValues.length - 1);
      current.push(currentValues.splice(randomIndex, 1)[0]);
      randomIndex = getRndInteger(0, nextValues.length - 1);
      next.push(nextValues.splice(randomIndex, 1)[0]);
    }
    return { current, next };
  };

  const calculateHLines = (
    vLinesPoints,
    minHLines,
    maxHLines = 8,
    paddingV = 25
  ) => {
    const minY = vLinesPoints[0][1] + paddingV;
    const maxY = vLinesPoints[0][3] - paddingV;
    const distance = Math.round((maxY - minY) / maxHLines);
    const HLines = [];
    const currentLineYPoints = [];
    const nextLineYPoints = [];
    vLinesPoints.every((vLinePoints, index) => {
      if (index === vLinesPoints.length - 1) return;
      let currentPoints = range(minY, maxY, distance);
      if (index % 2 === 0)
        currentPoints = range(minY + Math.round(distance / 2), maxY, distance);
      let { current, next } = getRandomValues(currentPoints, minHLines);
      current.sort((a, b) => a - b);
      next.sort((a, b) => a - b);
      current.every((val, ind) => {
        HLines.push([
          vLinePoints[0],
          val,
          vLinesPoints[index + 1][0],
          next[ind],
        ]);
        return true;
      });
      return true;
    });
    return HLines;
  };

  function range(start, stop, step) {
    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
      result.push(i);
    }

    return result;
  }

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function calculatePath(hLinesPoints, vLinesPoints) {
    const paths = [];
    vLinesPoints.every((vLinePoints, index) => {
      const path = [[vLinePoints[0], vLinePoints[1]]];
      let breakPoint = 0;
      while (breakPoint < 100) {
        const contLines = [];
        hLinesPoints.forEach((hLinePoints, ind) => {
          if (hLinePoints[0] === path.at(-1)[0]) {
            if (hLinePoints[1] > path.at(-1)[1]) {
              contLines.push(hLinePoints);
            }
          }
          if (hLinePoints[2] === path.at(-1)[0]) {
            if (hLinePoints[3] > path.at(-1)[1]) {
              contLines.push(hLinePoints);
            }
          }
        });
        if (contLines.length === 0) {
          path.push([path.at(-1)[0], vLinePoints[3]]);
          break;
        }
        const distances = [];
        contLines.forEach((contPoint, ind) => {
          if (contPoint[0] === path.at(-1)[0]) {
            distances.push([contPoint[1] - path.at(-1)[1], ind]);
          } else if (contPoint[2] === path.at(-1)[0]) {
            distances.push([contPoint[3] - path.at(-1)[1], ind]);
          }
        });
        distances.sort((a, b) => a[0] - b[0]);
        const closestHLine = contLines[distances[0][1]];
        let isSameLine;
        if (closestHLine[0] === path.at(-1)[0]) {
          path.push([closestHLine[0], closestHLine[1]]);
          path.push([closestHLine[2], closestHLine[3]]);
          isSameLine = true;
        } else if (closestHLine[2] === path.at(-1)[0]) {
          path.push([closestHLine[2], closestHLine[3]]);
          path.push([closestHLine[0], closestHLine[1]]);
          isSameLine = false;
        }

        breakPoint++;
      }
      paths.push(path);
      return true;
    });

    return paths;
  }

  function createLeg(
    topValues,
    botValues,
    height = 300,
    minHLines = 2,
    maxHLines = 8,
    distBLines = 120
  ) {
    const textHeight = 25;
    const padding = 10;
    const totalPaddingForText = (padding + textHeight + padding) * 2;
    const vLineNumbers = topValues.length;
    const lineHeight = height - totalPaddingForText;
    const startPoint = [50, Math.round(totalPaddingForText / 2)];
    const dims = `0,0,${distBLines * vLineNumbers},${height}`;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const TextFontSize = 20;
    const lineSize = `5`;
    const lineColor = "black";
    svg.setAttribute("viewBox", dims);
    svg.setAttribute("class", "svg-leg");
    svg.setAttribute("height", `${height}`);
    svg.setAttribute("width", `${distBLines * topValues.length}`);
    const vLinesPoints = calculateVLines(
      vLineNumbers,
      lineHeight,
      distBLines,
      startPoint
    );
    vLinesPoints.forEach((vLinePoints, index) => {
      let newLine = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      newLine.setAttribute("id", `V-line-${index}`);
      newLine.setAttribute("x1", `${vLinePoints[0]}`);
      newLine.setAttribute("y1", `${vLinePoints[1]}`);
      newLine.setAttribute("x2", `${vLinePoints[2]}`);
      newLine.setAttribute("y2", `${vLinePoints[3]}`);
      newLine.setAttribute("stroke", lineColor);
      newLine.setAttribute("stroke-width", lineSize);
      svg.appendChild(newLine);
      let newTopText = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      newTopText.setAttribute("id", `top-text-${index}`);
      newTopText.setAttribute(
        "x",
        `${
          vLinePoints[0] -
          Math.round(
            (topValues[index].toString().length *
              Math.round(TextFontSize / 2)) /
              2
          )
        }`
      );
      newTopText.setAttribute("y", `${vLinePoints[1] - padding}`);
      newTopText.setAttribute("class", "leg-text-btn");
      var text = document.createTextNode(`${topValues[index]}`);
      newTopText.appendChild(text);
      svg.appendChild(newTopText);
      let newBottomText = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      newBottomText.setAttribute("id", `bottom-text-${index}`);
      newBottomText.setAttribute(
        "x",
        `${
          vLinePoints[0] -
          Math.round(
            (botValues[index].toString().length *
              Math.round(TextFontSize / 2)) /
              2
          )
        }`
      );
      newBottomText.setAttribute("y", `${vLinePoints[3] + padding + padding}`);
      newBottomText.setAttribute("class", "leg-text-btn");
      var text = document.createTextNode(`${botValues[index]}`);
      newBottomText.appendChild(text);
      svg.appendChild(newBottomText);
    });
    const hLinesPoints = calculateHLines(vLinesPoints, minHLines, maxHLines);
    hLinesPoints.forEach((hLinePoints, index) => {
      let newLine = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      newLine.setAttribute("id", `H-line-${index}`);
      newLine.setAttribute("x1", `${hLinePoints[0]}`);
      newLine.setAttribute("y1", `${hLinePoints[1]}`);
      newLine.setAttribute("x2", `${hLinePoints[2]}`);
      newLine.setAttribute("y2", `${hLinePoints[3]}`);
      newLine.setAttribute("stroke", lineColor);
      newLine.setAttribute("stroke-width", lineSize);
      svg.appendChild(newLine);
    });
    const pathForLines = calculatePath(hLinesPoints, vLinesPoints);

    return { svg, pathForLines, vLinesPoints };
  }

  function getSvgPath(path) {
    const lineWidth = `3`;
    let newPolyLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polyline"
    );
    newPolyLine.setAttribute("points", path[0]);
    newPolyLine.setAttribute("stroke", "red");
    newPolyLine.setAttribute("fill", "none");
    newPolyLine.setAttribute("stroke-width", lineWidth);
    return newPolyLine;
  }

  function animatePath(path, element, topLabelIndex, bottomLabelIndex, isTop) {
    let findClicked;
    if (!isTop) {
      findClicked = runPage.viewed.find(
        elem => elem[0] === path.at(-1)[0] && elem[1] === path.at(-1)[1]
      );
    } else {
      findClicked = runPage.viewed.find(
        elem => elem[0] === path.at(0)[0] && elem[1] === path.at(0)[1]
      );
    }
    if (!findClicked) {
      if (!isTop) {
        runPage.viewed.push(path.at(-1));
      } else {
        runPage.viewed.push(path[0]);
      }
      const highResPoints = [];
      path.forEach((pathPoint, index) => {
        if (index >= path.length - 1) return;
        highResPoints.push(...calcPoints(pathPoint, path[index + 1]));
      });

      let i = 1;
      function myLoop() {
        runPage.loop = setTimeout(function () {
          let oldPath = `${element.getAttribute("points")} `;
          let newPath = (oldPath += `${highResPoints[i]}`);
          element.setAttribute("points", newPath);
          i++;
          if (i < highResPoints.length) {
            scrollToPathPosition(highResPoints[i][0]);
            myLoop();
          } else {
            setColorToFindItem(topLabelIndex, bottomLabelIndex);
          }
        }, 3);
      }

      myLoop();
    } else {
      clearTimeout(runPage.loop);
      path.forEach(pathPoint => {
        let oldPath = `${element.getAttribute("points")} `;
        let newPath = (oldPath += `${pathPoint}`);
        element.setAttribute("points", newPath);
      });
      scrollToPathPoint(path.at(-1)[0]);
      setColorToFindItem(topLabelIndex, bottomLabelIndex);
    }
  }

  const scrollToPathPosition = pathPoint => {
    if (pathPoint > ghostLegCrt.offsetWidth + ghostLegCrt.scrollLeft) {
      ghostLegCrt.scrollLeft += 20;
    } else if (pathPoint < ghostLegCrt.scrollLeft) {
      ghostLegCrt.scrollLeft -= 20;
    }
  };

  const scrollToPathPoint = pathPoint => {
    if (pathPoint > ghostLegCrt.offsetWidth + ghostLegCrt.scrollLeft) {
      ghostLegCrt.scrollLeft +=
        pathPoint - Math.round(ghostLegCrt.offsetWidth / 2);
    } else if (pathPoint < ghostLegCrt.scrollLeft) {
      ghostLegCrt.scrollLeft -=
        pathPoint + Math.round(ghostLegCrt.offsetWidth / 2);
    }
  };

  const calcPoints = (point1, point2) => {
    const x1 = point1[0];
    const y1 = point1[1];
    const x2 = point2[0];
    const y2 = point2[1];
    const linePoints = [];
    if (x1 === x2) {
      let x = x1;
      if (y1 < y2) {
        for (let y = y1; y <= y2; y++) {
          linePoints.push([x, y]);
        }
      } else if (y1 > y2) {
        for (let y = y1; y >= y2; y--) {
          linePoints.push([x, y]);
        }
      }
    } else if (y1 === y2) {
      let y = y1;
      if (x1 < x2) {
        for (let x = x1; x <= x2; x++) {
          linePoints.push([x, y]);
        }
      } else if (x1 > x2) {
        for (let x = x1; x >= x2; x--) {
          linePoints.push([x, y]);
        }
      }
    } else if (x1 < x2) {
      const m = (y2 - y1) / (x2 - x1);
      const b = y1 - m * x1;
      for (let x = x1; x <= x2; x++) {
        const y = Math.round(m * x + b);
        linePoints.push([x, y]);
      }
    } else if (x1 > x2) {
      const m = (y2 - y1) / (x2 - x1);
      const b = y1 - m * x1;
      for (let x = x1; x >= x2; x--) {
        const y = Math.round(m * x + b);
        linePoints.push([x, y]);
      }
    }

    return linePoints;
  };

  function setColorToFindItem(topLabelIndex, bottomLabelIndex) {
    let color =
      runPageLeg.colors[getRndInteger(0, runPageLeg.colors.length - 1)];
    const topLabelElement = document.getElementById(
      `top-text-${topLabelIndex}`
    );
    topLabelElement.setAttribute("stroke", color);
    topLabelElement.setAttribute("fill", color);
    const bottomLabeElement = document.getElementById(
      `bottom-text-${bottomLabelIndex}`
    );
    bottomLabeElement.setAttribute("stroke", color);
    bottomLabeElement.setAttribute("fill", color);
  }

  const createHomeButton = () => {
    const xmlns = "http://www.w3.org/2000/svg";
    const btnContainer = document.createElement("table");
    btnContainer.setAttribute("class", "home-container");
    btnContainer.setAttribute("onclick", "gotoMenuPage()");
    const btnBody = document.createElement("tbody");
    const trBtn = document.createElement("tr");
    const tdTitle = document.createElement("td");
    const btnTitle = document.createElement("h1");
    Object.assign(btnTitle, {
      id: "home-btn-title",
      innerHTML: "Home",
    });
    btnTitle.setAttribute("class", "home-title");
    tdTitle.appendChild(btnTitle);
    const tdIcon = document.createElement("td");
    const btnIcon = document.createElementNS(xmlns, "svg");
    Object.assign(btnIcon, {
      id: "home-btn-icon",
    });
    btnIcon.setAttribute("class", "home-btn");
    btnIcon.setAttribute("viewBox", "0 0 60 60");
    btnIcon.setAttribute("x", "0");
    btnIcon.setAttribute("y", "0");
    btnIcon.innerHTML = `<path style=" stroke-linejoin: round; fill-rule: evenodd; stroke: #333333; stroke-linecap: round; stroke-width: 3.125; fill: #b3b3b3; " d="m55.78 30.357c0.149-14.104-11.187-25.651-25.291-25.8-14.104-0.1491-25.651 11.156-25.8 25.26-0.1491 14.104 11.156 25.682 25.26 25.831s25.682-11.187 25.831-25.291zm-20.208-18.84l-0.145 13.656-0.242 11.092-0.137 12.968-18.613-18.979 19.137-18.737z" sodipodi:stroke-cmyk="(0 0 0 0.8)" />`;
    tdIcon.appendChild(btnIcon);
    trBtn.appendChild(tdIcon);
    trBtn.appendChild(tdTitle);
    btnBody.appendChild(trBtn);
    btnContainer.appendChild(btnBody);
    return btnContainer;
  };

  const renderRunPage = () => {
    runPage.innerHTML = runPageCopy.innerHTML;
    runPage.classList.remove("hide-element");
    ghostLegCrt = document.getElementById("ghost-leg-container");
    ghostLegCrtCopy = ghostLegCrt.cloneNode();
    runNScrollBtn = document.getElementById("ghost-scroll-btn-n");
    runPScrollBtn = document.getElementById("ghost-scroll-btn-p");
    const homeBtn = createHomeButton();
    runPage.prepend(homeBtn);
    reGenerate();
    if (ghostLegCrt.offsetWidth === ghostLegCrt.scrollWidth) {
      hideElement(runPScrollBtn);
      hideElement(runNScrollBtn);
    } else {
      unhideElement(runPScrollBtn);
      unhideElement(runNScrollBtn);
    }
  };

  const runLeftScrollLegShow = element => {
    runPage.legScrollPosition = ghostLegCrt.scrollLeft;
    ghostLegCrt.scrollLeft += ghostLegCrt.offsetWidth;
  };

  const runRightScrollLegShow = element => {
    runPage.legScrollPosition = ghostLegCrt.scrollLeft;
    ghostLegCrt.scrollLeft -= ghostLegCrt.offsetWidth;
  };

  const runCheckSliders = () => {
    if (ghostLegCrt.scrollLeft < 5) {
      hideElement(runPScrollBtn);
    } else {
      unhideElement(runPScrollBtn);
    }
    if (
      ghostLegCrt.scrollLeft + ghostLegCrt.offsetWidth >
      ghostLegCrt.scrollWidth - 5
    ) {
      hideElement(runNScrollBtn);
    } else {
      unhideElement(runNScrollBtn);
    }
  };

  function createSvg() {
    return createLeg(
      state.topValues,
      state.bottomValues,
      ghostLegCrt.clientHeight - 10,
      state.hLinesNum[0],
      state.hLinesNum[1]
    );
  }

  const reGenerate = () => {
    ghostLegCrt.innerHTML = ghostLegCrtCopy.innerHTML;
    ghostLegCrt.style.width = `${state.topValues.length * 100}px`;
    const { svg, pathForLines, vLinesPoints } = createSvg();
    runPageLeg.legContainer = svg;
    runPageLeg.path = pathForLines;
    runPageLeg.vLinesPoints = vLinesPoints;
    matchPairs();
    runPage.viewed = [];
    ghostLegCrt.appendChild(runPageLeg.legContainer);
    createEventListersForRunPage();
  };

  const drawLine = (indexOfValue, isTop) => {
    const oldLines = document.getElementsByTagName("polyline");
    const lineNumber = oldLines.length;
    const pathPoints = [...runPageLeg.path[indexOfValue]];
    if (lineNumber != 0) {
      for (let i = 0; i < lineNumber; i++) {
        runPageLeg.legContainer.removeChild(oldLines[i]);
      }
    }

    const bottomLabelIndex = runPageLeg.vLinesPoints.findIndex(
      (value, index) => {
        return value[0] === pathPoints[pathPoints.length - 1][0];
      }
    );
    const topLabelIndex = indexOfValue;
    if (!isTop) {
      pathPoints.reverse();
    }
    const newSvgPath = getSvgPath(pathPoints);
    runPageLeg.legContainer.appendChild(newSvgPath);
    animatePath(pathPoints, newSvgPath, topLabelIndex, bottomLabelIndex, isTop);
  };

  function createEventListersForRunPage() {
    state.topValues.forEach((topValue, index) => {
      const text = document.getElementById(`top-text-${index}`);
      text.addEventListener("click", () => {
        drawLine(state.results[index][0], true);
      });
    });

    state.bottomValues.forEach((bottomValue, oldIndex) => {
      const text = document.getElementById(`bottom-text-${oldIndex}`);
      text.addEventListener("click", () => {
        let resultIndex;
        state.results.forEach((result, index) => {
          if (result[1] === oldIndex) {
            resultIndex = index;
          }
        });
        drawLine(resultIndex, false);
      });
    });
  }

  function matchPairs() {
    state.results = [];
    let results = [];
    runPageLeg.path.forEach((path, index) => {
      results.push([path[0][0], path.at(-1)[0]]);
    });
    let resVal = [];
    results.forEach((result1, index1) => {
      let top = index1;
      let bot = 0;
      results.forEach((result2, index2) => {
        if (result1[1] === result2[0]) {
          bot = index2;
        }
      });
      resVal.push([top, bot]);
    });
    console.log(resVal);
    state.results = resVal;
  }

  function renderResultPage() {
    resultPage.innerHTML = resultPageCopy.innerHTML;
    resultPage.classList.remove("hide-element");
    resultContainer = document.getElementById("results");
    if (showTheResult()) {
      hideElement(startPage);
      hideElement(menuPage);
      hideElement(runPage);
      hideElement(resultPage);
      const esterPage = document.getElementById("easterEgg-page");
      unhideElement(esterPage);
      esterPage.style.display = "flex";
      esterPage.style.alignItem = "center";
      esterPage.style.justifyContent = "center";
      esterPage.innerHTML = `<h1>Easter Egg Leela</h1>`;
    }
  }

  function groupResults() {
    let resultsValues = [];
    state.results.forEach((result, index) => {
      resultsValues.push([
        state.topValues[result[0]],
        state.bottomValues[result[1]],
      ]);
    });
    let resultGroup = [];
    let indexList = [];
    resultsValues.forEach((result, index) => {
      if (indexList.indexOf(result[1]) !== -1) return;
      let len = indexList.length;
      resultsValues.forEach((res, ind) => {
        if (ind === index) return;
        if (result[1] === res[1]) {
          resultGroup.push([result[1], [result[0], res[0]]]);
          indexList.push(result[1]);
        }
      });
      if (indexList.length === len) resultGroup.push([result[1], [result[0]]]);
    });
    return resultGroup;
  }

  function showTheResult() {
    let esterEgg = false;
    const table = document.createElement("div");
    table.setAttribute("class", "result-table-grid");
    let results = groupResults();
    results.forEach((result, index) => {
      const resultField = document.createElement("div");
      resultField.setAttribute("class", "result-field");
      const resultText = document.createElement("h1");
      resultText.setAttribute("class", "result-text");
      let resGroupText = "";
      result[1].forEach((res, index) => {
        if (index === result[1].length - 1) {
          resGroupText += `${res}.`;
        } else {
          resGroupText += `${res}, `;
        }
      });
      resultText.innerHTML = `${index + 1}. ${result[0]} -> ${resGroupText}`;
      resultField.appendChild(resultText);
      table.appendChild(resultField);
      if (
        state.topValues[result[0]] === "deep" &&
        state.bottomValues[result[1]] === "leelu"
      ) {
        esterEgg = true;
      }
    });
    resultContainer.appendChild(table);
    return esterEgg;
  }

  function gotoResult() {
    hideElement(runPage);
    renderResultPage();
  }

  function restart() {
    init();
  }

  init();

  return {
    restart,
    openFullscreen,
    increaseLeg,
    decreaseLeg,
    start,
    slideMobileLegLeft,
    goToStart,
    slideMobileLegRight,
    rightScrollLegShow,
    checkSliders,
    leftScrollLegShow,
    gotoRunPage,
    shuffler,
    slideMobileLegLeft,
    runRightScrollLegShow,
    runCheckSliders,
    runLeftScrollLegShow,
    gotoResult,
    reGenerate,
  };
}
