// version(merging scene-0, scene-1)
let yOffset = null; // window.pageYOffset 대신 쓸 변수
let sceneHeight = 0;
let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
let enterNewScene = false; // 새로운 scene이 시작된 순간 true
// let touchDown = false;
let acc = 0.2;
let delayedYOffset = 0;
let rafId;
let rafState;

const firstLoadingSequence = 73;
let firstSceneSequence = firstLoadingSequence;

let secondCanvasScaleRatio = 1;

const colors = [
  "#537581",
  "#8A2BE2",
  "#007BA7",
  "#FF00AF",
  "#800000",
  "#7F00FF",
  "#40826D"
];

let selectedColorIndex = 0;

//  svgAnimationLetter = document.getElementById("svgAnimationLetter");

const texttexttext = document.getElementById("texttexttext");
const buyNow_btn1 = document.getElementById("buyNow_btn1");
const globalNav = document.querySelector(".global-nav");

buyNow_btn1.addEventListener("click", function() {
  sceneInfo[0].heightNum = Number(texttexttext.value);
  setLayout();

  selectedColorIndex += 1;

  if (selectedColorIndex >= colors.length) {
    selectedColorIndex - colors.length;
  }

  globalNav.style.background = colors[selectedColorIndex];
});
const DEVICE = {
  mobile: {
    width: 1080,
    height: 1510,
    videoImage: "superFinal_Mobile",
    imageCount: 264,
    podSVGInitialScale: 0.25,
    scaleRatio: 1
  },
  desktop: {
    width: 1920,
    height: 1080,
    videoImage: "superFinal_Desktop",
    imageCount: 264,
    podSVGInitialScale: 0.2,
    scaleRatio: 1
    // podSVGInitialScale: 0.072,
    // scaleRatio: 0.8
  }
};

let currentDeviceType = "mobile";
let currentDevice = DEVICE[currentDeviceType];

const sceneInfo = [
  {
    // 0
    type: "sticky",
    // heightNum: 6, // 브라우저 높이의 5배로 scrollHeight 세팅
    heightNum: 24,
    scrollHeight: 0,
    prevScrollHeight: 0,
    objs: {
      container: document.querySelector("#scroll-section-0"),
      messageA: document.querySelector("#scroll-section-0 .main-message.a"),
      messageB: document.querySelector("#scroll-section-0 .main-message.b"),
      messageC: document.querySelector("#scroll-section-0 .main-message.c"),
      // gradientOverlay: document.querySelector(
      //   "#scroll-section-0 .gradient-overlay"
      // ),
      messageAUp: document.querySelector(
        "#scroll-section-0 .main-message-a-up"
      ),
      messageADown: document.querySelector(
        "#scroll-section-0 .main-message-a-down"
      ),
      messageBUp: document.querySelector(
        "#scroll-section-0 .main-message-b-up"
      ),
      messageBDown: document.querySelector(
        "#scroll-section-0 .main-message-b-down"
      ),
      canvas: document.querySelector("#video-canvas-0"),
      context: document.querySelector("#video-canvas-0").getContext("2d"),
      videoImages: {
        mobile: [],
        desktop: []
      },

      videoContainer: document.querySelector(".videoContainer2"),
      imageCanvas: document.querySelector("#image-canvas"),
      imageContext: document.querySelector("#image-canvas").getContext("2d"),
      imageCanvas1: document.querySelector("#image-canvas1"),
      imageContext1: document.querySelector("#image-canvas1").getContext("2d"),
      image: "",
      image1: "",
      image2: "",
      imageWHRatio: 1141 / 543.28,
      imageScale: 1
    },
    values: {
      videoImageCount: 264,
      imageSequence: [firstLoadingSequence, 264, { start: 0.05, end: 0.4 }],
      canvas_opacity: [1, 0, { start: 0.41, end: 0.5 }],

      messageAUp_opacity_in: [0, 1, { start: 0.2, end: 0.4 }],
      messageAUp_translateY_in: [20, 0, { start: 0.2, end: 0.4 }],
      messageADown_opacity_in: [0, 1, { start: 0.42, end: 0.62 }],
      messageADown_translateY_in: [20, 0, { start: 0.42, end: 0.62 }],
      messageBUp_opacity_in: [0, 1, { start: 0.62, end: 0.8 }],
      messageBUp_translateY_in: [20, 0, { start: 0.62, end: 0.8 }],
      messageBDown_opacity_in: [0, 1, { start: 0.62, end: 0.8 }],
      messageBDown_translateY_in: [20, 0, { start: 0.62, end: 0.8 }],

      messageA_opacity_out: [1, 0, { start: 0, end: 0.05 }],
      messageB_opacity_out: [1, 0, { start: 0, end: 0.05 }],
      messageA_translateY_out: [0, -20, { start: 0, end: 0.05 }],
      messageB_translateY_out: [0, -20, { start: 0, end: 0.05 }],

      messageC_opacity_in: [0, 1, { start: 0.185, end: 0.265 }],
      messageC_translateY_in: [7, 0, { start: 0.185, end: 0.265 }],
      messageC_opacity_out: [1, 0, { start: 0.295, end: 0.31 }],
      messageC_translateY_out: [0, -7, { start: 0.295, end: 0.31 }],
      // gradientOverlay: [1, 0, { start: 0.225, end: 0.25 }],

      // svg_opacity_in: [0, 1, { start: 0.41, end: 0.5 }],
      // svg_scale: [0.4, 15, { start: 0.5, end: 0.7 }],
      // svg_rotate: [0, 720, { start: 0.5, end: 0.7 }],
      // video_opacity_in: [0, 1, { start: 0.5375, end: 0.7 }],
      // video_scale: [1, 0.75, { start: 0.75, end: 0.9 }],

      svg_opacity_in: [0, 1, { start: 0.465, end: 0.476 }],
      svg_PD_opacity_in: [0, 1, { start: 0.476, end: 0.5 }],
      // svg_scale: [0.4, 15, { start: 0.5, end: 0.7 }],
      svg_rotate: [0, 180, { start: 0.52, end: 0.6 }],
      svg_scale0: [0.4, 0.4005, { start: 0.5, end: 0.52 }],
      svg_scale1: [0.4005, 0.2, { start: 0.6, end: 0.66 }],
      svg_scale2: [0.2, 15, { start: 0.66, end: 0.76 }],
      video_opacity_in: [0, 1, { start: 0.66, end: 0.73 }],
      video_scale: [1, 0.75, { start: 0.78, end: 1 }],
      video_opacity_out: [1, 0, { start: 0.8, end: 0.9 }]
    }
  }
];

function calcPodORatio() {
  let firstCanvasRatio;
  const secondCanvasRatio = 0.5;
  const firstCanvas = sceneInfo[0].objs.canvas;
  const secondCanvas = sceneInfo[0].objs.imageCanvas;

  const secondCanvasHeight = secondCanvas.offsetHeight;
  const secondCanvasHeightFromWidth =
    window.innerWidth / sceneInfo[0].objs.imageWHRatio;
  const secondCanvasPodRatio = 370 / 684.56;

  let secondPodSize;

  if (currentDeviceType === "desktop") {
    firstCanvasRatio = 0.0448;

    if (firstCanvas.parentElement.offsetHeight >= 1080) {
      secondPodSize =
        secondCanvasHeight *
        secondCanvasScaleRatio *
        secondCanvasPodRatio *
        secondCanvasRatio;
    } else {
      secondPodSize =
        secondCanvasHeight * secondCanvasPodRatio * secondCanvasRatio;
    }
  } else {
    firstCanvasRatio = 0.03415;
    secondPodSize = secondCanvasHeightFromWidth * secondCanvasRatio;
  }

  const currentPodSize =
    sceneInfo[0].objs.canvas.offsetHeight * firstCanvasRatio;

  return currentPodSize / secondPodSize;
}

function setCanvasImages() {
  sceneInfo[0].values.videoImageCount = currentDevice.imageCount;
  sceneInfo[0].values.imageSequence[1] = currentDevice.imageCount;
  // sceneInfo[0].values.imageSequence[1] = currentDevice.imageCount - 1;

  if (
    sceneInfo[0].objs.videoImages[currentDeviceType] &&
    sceneInfo[0].objs.videoImages[currentDeviceType].length > 0
  ) {
    return;
  }

  let imgElem;

  for (let i = 1; i <= sceneInfo[0].values.videoImageCount; i++) {
    imgElem = new Image();
    imgElem.src = `./assets/${currentDevice.videoImage}/${i}.jpg`;

    sceneInfo[0].objs.videoImages[currentDeviceType].push(imgElem);
  }

  let imgElem2 = new Image();
  // imgElem2.src = "./assets/images/apple.svg";
  // imgElem2.src = "./assets/images/pod_logo_final.svg";

  imgElem2.src = "./assets/images/POD_logo_big.svg";
  // imgElem2.src =
  //   "blob:https://www.apple.com/3ecd2363-111b-4b19-9c96-f1bc05e1445d";
  // imgElem2.src = "http://www.w3.org/html/logo/img/mark-word-icon.png";
  sceneInfo[0].objs.image = imgElem2;

  let imgElem3 = new Image();
  imgElem3.src = "./assets/images/JUST_POD_O.svg";
  sceneInfo[0].objs.image1 = imgElem3;

  let imgElem4 = new Image();
  imgElem4.src = "./assets/images/JUST_POD_PD.svg";
  sceneInfo[0].objs.image2 = imgElem4;

  // let imgWidth = imgElem2.width;
  // let imgHeight = imgElem2.height;

  // sceneInfo[1].objs.imageWHRatio = imgWidth / imgHeight;
}

function checkMenu() {
  if (sceneInfo[2].prevScrollHeight) {
    const prevScrollHeight = sceneInfo[2].prevScrollHeight;
    if (yOffset > prevScrollHeight - sceneHeight) {
      document.body.classList.remove("local-nav-sticky");
    } else {
      document.body.classList.add("local-nav-sticky");
    }

    if (
      yOffset > prevScrollHeight - sceneHeight &&
      yOffset <
        prevScrollHeight +
          sceneInfo[2].scrollHeight * sceneInfo[2].values.video_scale[2].end
    ) {
      sceneInfo[2].objs.videoContainer.classList.add("stickyVideo");
    } else {
      sceneInfo[2].objs.videoContainer.classList.remove("stickyVideo");
    }
  }
}

function setLayout() {
  // 각 스크롤 섹션의 높이 세팅
  yOffset = window.pageYOffset;

  // if (sceneHeight !== window.innerHeight) {
  console.log("this is from setLayout", yOffset);

  sceneHeight = window.innerHeight;
  let totalScrollHeight = 0;
  let targetScrollHeight = 0;
  let handler = true;
  for (let i = 0; i < sceneInfo.length; i += 1) {
    if (sceneInfo[i].type === "sticky") {
      targetScrollHeight = sceneInfo[i].heightNum * sceneHeight;
    } else if (sceneInfo[i].type === "normal") {
      targetScrollHeight = sceneInfo[i].objs.container.offsetHeight;
    }

    sceneInfo[i].scrollHeight = targetScrollHeight;

    sceneInfo[i].objs.container.style.height = `${targetScrollHeight}px`;

    sceneInfo[i].prevScrollHeight = totalScrollHeight;
    totalScrollHeight += targetScrollHeight;

    if (handler && totalScrollHeight >= window.pageYOffset) {
      currentScene = i;
      handler = false;
    }
  }

  document.body.setAttribute("id", `show-scene-${currentScene}`);
  // if (currentScene === 0 || currentScene === 1) {
  //   sceneInfo[0].objs.container.classList.add("stickyy");
  // } else {
  //   sceneInfo[0].objs.container.classList.remove("stickyy");
  // }

  // this can be improve
  // const heightRatio = sceneHeight / 1080;
  // sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  // sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0)`;

  if (sceneInfo[0].objs) {
    const objs = sceneInfo[0].objs;
    const deviceWidth = window.document.documentElement.clientWidth;
    const deviceHeight = window.innerHeight;

    const firstCanvas = objs.canvas;
    const firstContext = objs.context;
    const secondCanvas = objs.imageCanvas;
    const secondContext = objs.imageContext;

    const thirdCanvas = objs.imageCanvas1;
    const thirdContext = objs.imageContext1;

    if (firstCanvas) {
      // let canvasRatio = currentDevice.width / currentDevice.height;

      // let canvasWidth = deviceWidth;
      // let canvasHeight = deviceHeight;

      // let calcImgWidthFromHeight = canvasHeight * canvasRatio;
      // let calcImgHeightFromWidth = canvasWidth / canvasRatio;

      // console.log(
      //   "hello!",
      //   canvasWidth,
      //   canvasHeight,
      //   canvasRatio,
      //   calcImgWidthFromHeight,
      //   calcImgHeightFromWidth
      // );

      // if (calcImgWidthFromHeight < deviceWidth) {
      //   canvasWidth = deviceWidth;
      //   canvasHeight = calcImgHeightFromWidth;
      // } else if (calcImgHeightFromWidth < deviceHeight) {
      //   canvasHeight = deviceHeight;
      //   canvasWidth = calcImgWidthFromHeight;
      // }

      // firstCanvas.width = canvasWidth;
      // firstCanvas.height = canvasHeight;

      firstCanvas.width = currentDevice.width;
      firstCanvas.height = currentDevice.height;

      const heightRatio =
        firstCanvas.parentElement.offsetHeight / firstCanvas.offsetHeight;

      let scaleRatio = currentDevice.scaleRatio;

      // Scale(1.2 -> 1) --> 114px -> 0 // 8.5% -> 0

      if (
        currentDevice.width < deviceWidth &&
        currentDevice.height < deviceHeight
      ) {
        scaleRatio = 1;
      }

      // this should be checked..
      firstCanvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
      // firstCanvas.style.transform = `translate3d(-50%, -50%, 0)`;

      // firstContext.clearRect(0, 0, firstCanvas.width, firstCanvas.height);
      firstContext.drawImage(
        objs.videoImages[currentDeviceType][firstSceneSequence],
        0,
        0
      );
    }

    if (secondCanvas) {
      secondCanvas.width = currentDevice.width;
      secondCanvas.height = currentDevice.height;

      thirdCanvas.width = currentDevice.width;
      thirdCanvas.height = currentDevice.height;

      let calcImgWidth = deviceWidth * objs.imageScale;
      let calcImgHeight = deviceHeight * objs.imageScale;

      const calcImgWidthFromHeight = calcImgHeight * objs.imageWHRatio;

      if (calcImgWidthFromHeight < calcImgWidth) {
        calcImgWidth = calcImgWidthFromHeight;
      } else {
        calcImgHeight = calcImgWidth / objs.imageWHRatio;
      }

      objs.image.width = calcImgWidth;
      objs.image.height = calcImgHeight;

      objs.image1.width = calcImgWidth;
      objs.image1.height = calcImgHeight;

      objs.image2.width = calcImgWidth;
      objs.image2.height = calcImgHeight;

      secondContext.fillStyle = "#0CA4D3";
      thirdContext.fillStyle = "#0CA4D3";

      const widthRatio = deviceWidth / secondCanvas.width;
      const heightRatio = (deviceHeight - 70) / secondCanvas.height;
      let canvasScaleRatio;

      if (widthRatio <= heightRatio) {
        // 캔버스보다 브라우저 창이 홀쭉한 경우
        canvasScaleRatio = heightRatio;
      } else {
        // 캔버스보다 브라우저 창이 납작한 경우
        canvasScaleRatio = widthRatio;
      }

      if (canvasScaleRatio < 1) {
        canvasScaleRatio = 1;
      }

      secondCanvasScaleRatio = canvasScaleRatio;

      secondCanvas.style.transform = `translate3d(-50%, -50%, 0) scale(${canvasScaleRatio})`;
      thirdCanvas.style.transform = `translate3d(-50%, -50%, 0) scale(${canvasScaleRatio})`;

      if (
        secondCanvas.offsetHeight * canvasScaleRatio <
        secondCanvas.parentElement.offsetHeight
      ) {
        secondCanvas.style.height = "100%";
        thirdCanvas.style.height = "100%";
      } else {
        secondCanvas.style.height = "unset";
        thirdCanvas.style.height = "unset";
      }
    }
  }
  // }

  currentDeviceType = checkDevice();
  checkDeviceRatio();
  currentDevice = DEVICE[currentDeviceType];
  sceneInfo[0].values.svg_scale0[0] = currentDevice.podSVGInitialScale;
  sceneInfo[0].values.svg_scale0[0] = calcPodORatio();

  // svgAnimationLetter.style.transform = `scale(${calcPodORatio()})`;

  console.log("adasfxxx", currentDevice.podSVGInitialScale, calcPodORatio());
}

function calcValues(values, currentYOffset) {
  let rv;
  // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
  const scrollHeight = sceneInfo[currentScene].scrollHeight;
  const scrollRatio = currentYOffset / scrollHeight;

  if (values[2].videoEnd) {
    rv =
      (scrollRatio / values[2].videoEnd) * (values[1] - values[0]) + values[0];
  } else {
    // start ~ end 사이에 애니메이션 실행
    const partScrollStart = values[2].start * scrollHeight;
    const partScrollEnd = values[2].end * scrollHeight;
    const partScrollHeight = partScrollEnd - partScrollStart;

    if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
      rv =
        ((currentYOffset - partScrollStart) / partScrollHeight) *
          (values[1] - values[0]) +
        values[0];
    } else if (currentYOffset < partScrollStart) {
      rv = values[0];
    } else if (currentYOffset > partScrollEnd) {
      rv = values[1];
    }
  }

  // if (values.length === 3) {
  //   // start ~ end 사이에 애니메이션 실행
  //   const partScrollStart = values[2].start * scrollHeight;
  //   const partScrollEnd = values[2].end * scrollHeight;
  //   const partScrollHeight = partScrollEnd - partScrollStart;

  //   if (
  //     currentYOffset >= partScrollStart &&
  //     currentYOffset <= partScrollEnd
  //   ) {
  //     rv =
  //       ((currentYOffset - partScrollStart) / partScrollHeight) *
  //         (values[1] - values[0]) +
  //       values[0];
  //   } else if (currentYOffset < partScrollStart) {
  //     rv = values[0];
  //   } else if (currentYOffset > partScrollEnd) {
  //     rv = values[1];
  //   }
  // } else {
  //   rv = scrollRatio * (values[1] - values[0]) + values[0];
  // }

  return rv;
}

/***
 *
 *
 *
 *
 *
 *
 *
 * animation
 *
 *
 *
 *
 *
 */

let isCleared = false;

function playAnimation() {
  const targetScene = sceneInfo[currentScene];
  const objs = targetScene.objs;
  const values = targetScene.values;
  const currentYOffset = window.pageYOffset - prevScrollHeight;
  const scrollHeight = targetScene.scrollHeight;
  const scrollRatio = currentYOffset / scrollHeight;

  switch (currentScene) {
    case 0:
      // console.log('0 play');
      // let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
      // objs.context.drawImage(objs.videoImages[sequence], 0, 0);
      objs.canvas.style.opacity = calcValues(
        values.canvas_opacity,
        currentYOffset
      );
      // objs.gradientOverlay.style.opacity = calcValues(
      //   values.gradientOverlay,
      //   currentYOffset
      // );

      // first video animation
      objs.messageA.style.opacity = calcValues(
        values.messageA_opacity_out,
        currentYOffset
      );
      objs.messageA.style.transform = `translate3d(0, ${calcValues(
        values.messageA_translateY_out,
        currentYOffset
      )}%, 0)`;

      objs.messageB.style.opacity = calcValues(
        values.messageB_opacity_out,
        currentYOffset
      );
      objs.messageB.style.transform = `translate3d(0, ${calcValues(
        values.messageB_translateY_out,
        currentYOffset
      )}%, 0)`;

      if (scrollRatio <= 0.27) {
        // in
        objs.messageC.style.opacity = calcValues(
          values.messageC_opacity_in,
          currentYOffset
        );

        objs.messageC.style.transform = `translate3d(-50%, ${calcValues(
          values.messageC_translateY_in,
          currentYOffset
        )}%, 0)`;
      } else {
        // out
        objs.messageC.style.opacity = calcValues(
          values.messageC_opacity_out,
          currentYOffset
        );
        objs.messageC.style.transform = `translate3d(-50%, ${calcValues(
          values.messageC_translateY_out,
          currentYOffset
        )}%, 0)`;
      }

      // second pod letter + video animation
      const secondCanvas = objs.imageCanvas;
      const secondContext = objs.imageContext;
      const secondCanvasWidth = secondCanvas.width;
      const secondCanvasHeight = secondCanvas.height;

      secondContext.save();
      // secondContext.globalAlpha = 1;
      secondContext.clearRect(0, 0, secondCanvasWidth, secondCanvasHeight);

      let secondScaleValue = "";

      if (scrollRatio < 0.53) {
        secondScaleValue = calcValues(values.svg_scale0, currentYOffset);
      } else if (scrollRatio <= 0.66) {
        secondScaleValue = calcValues(values.svg_scale1, currentYOffset);
      } else {
        secondScaleValue = calcValues(values.svg_scale2, currentYOffset);
      }
      // const secondScaleValue = calcValues(values.svg_scale, currentYOffset);

      // secondScaleValue = 1;
      const recalculatedImgWidth = objs.image.width * secondScaleValue;
      const recalculatedImgHeight = objs.image.height * secondScaleValue;

      // drawing mask
      drawing(secondCanvas, secondContext, recalculatedImgHeight / 5);

      // drawing pod image
      secondContext.translate(
        secondCanvasWidth * 0.5,
        secondCanvasHeight * 0.5
      );

      secondContext.rotate(
        DegToRad(calcValues(values.svg_rotate, currentYOffset))
      );

      if (scrollRatio < 0.49) {
        secondContext.drawImage(
          objs.image1,
          parseFloat((-recalculatedImgWidth * 0.5).toFixed(2)),
          parseFloat((-recalculatedImgHeight * 0.5).toFixed(2)),
          parseFloat(recalculatedImgWidth.toFixed(2)),
          parseFloat(recalculatedImgHeight.toFixed(2))
        );
      } else {
        secondContext.drawImage(
          objs.image,
          parseFloat((-recalculatedImgWidth * 0.5).toFixed(2)),
          parseFloat((-recalculatedImgHeight * 0.5).toFixed(2)),
          parseFloat(recalculatedImgWidth.toFixed(2)),
          parseFloat(recalculatedImgHeight.toFixed(2))
        );
      }

      secondContext.restore();

      /* third canvas start */

      const thirdCanvas = objs.imageCanvas1;
      const thirdContext = objs.imageContext1;

      if (scrollRatio < 0.49) {
        thirdContext.save();
        thirdContext.clearRect(0, 0, secondCanvasWidth, secondCanvasHeight);

        // drawing mask

        // drawing pod image
        thirdContext.translate(
          secondCanvasWidth * 0.5,
          secondCanvasHeight * 0.5
        );

        thirdContext.rotate(
          DegToRad(calcValues(values.svg_rotate, currentYOffset))
        );

        thirdContext.drawImage(
          objs.image2,
          -recalculatedImgWidth * 0.5,
          -recalculatedImgHeight * 0.5,
          recalculatedImgWidth,
          recalculatedImgHeight
        );

        thirdContext.restore();
        thirdCanvas.style.opacity = 1;

        /* third canvas end */
      } else {
        thirdCanvas.style.opacity = 0;
      }

      // objs.podSVG.style.transform = `translate3d(-50%, -50%, 0) scale(${calcValues(
      //   values.svg_scale,
      //   currentYOffset
      // )}) rotate(${calcValues(values.svg_rotate, currentYOffset)}deg)`;

      if (scrollRatio > values.video_scale[2].start) {
        objs.imageCanvas.style.opacity = 0;
        objs.imageCanvas1.style.opacity = 0;
      } else {
        objs.imageCanvas.style.opacity = calcValues(
          values.svg_opacity_in,
          currentYOffset
        );

        if (scrollRatio < 0.49) {
          objs.imageCanvas1.style.opacity = calcValues(
            values.svg_PD_opacity_in,
            currentYOffset
          );
        } else {
          objs.imageCanvas1.style.opacity = 0;
        }

        if (scrollRatio < values.video_opacity_in[2].start) {
          objs.imageCanvas.style.background = "#0CA4D3";
        } else {
          objs.imageCanvas.style.background = "unset";
        }
      }

      // objs.podSVG.style.opacity = 1;

      // objs.podSVG.style.marginTop = "0";

      const stickyElem = objs.videoContainer.parentElement.parentElement;

      if (scrollRatio < 0.75) {
        objs.videoContainer.style.opacity = calcValues(
          values.video_opacity_in,
          currentYOffset
        );
        stickyElem.style.background = "#0ca4d3";
      } else {
        objs.videoContainer.style.opacity = calcValues(
          values.video_opacity_out,
          currentYOffset
        );

        stickyElem.style.background = "wheat";
      }
      if (scrollRatio > 0.4) {
        // objs.videoContainer.style.transform = `scale(${calcValues(
        //   values.video_scale,
        //   currentYOffset
        // )})`;

        const whenEnd = values.video_scale[2].end;

        if (scrollRatio > whenEnd) {
          stickyElem.classList.remove("sticky-elem");
          stickyElem.style.marginTop = `${scrollHeight * whenEnd -
            objs.videoContainer.clientHeight / 2}px`;

          stickyElem.style.marginTop = `${scrollHeight * whenEnd -
            stickyElem.clientHeight / 2}px`;
          // this should be improve
          stickyElem.style.position = "unset";
        } else {
          stickyElem.classList.add("sticky-elem");
          stickyElem.style.marginTop = "0";
          // this should be improve
          stickyElem.style.position = "";
        }
      }

      break;
  }
}

function drawing(canvas, context, radius) {
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const ctx3 = context;
  // ctx3.save();
  // ctx3.clearRect(0, 0, canvasWidth, canvasHeight);
  // ctx3.fillRect(0, 0, canvasWidth, canvasHeight / 2 - radius);
  // ctx3.fillRect(
  //   0,
  //   canvasHeight / 2 + radius,
  //   canvasWidth,
  //   canvasHeight / 2 - radius
  // );
  ctx3.beginPath();
  // left
  ctx3.moveTo(0, 0);
  ctx3.lineTo(canvasWidth / 2, 0);
  ctx3.lineTo(canvasWidth / 2, canvasHeight / 2 - radius);
  ctx3.arc(
    canvasWidth * 0.5,
    canvasHeight * 0.5,
    radius,
    -Math.PI / 2,
    Math.PI / 2,
    true
  );
  ctx3.lineTo(canvasWidth / 2, canvasHeight);
  ctx3.lineTo(0, canvasHeight);
  ctx3.lineTo(0, 0);
  // right
  ctx3.moveTo(canvasWidth, 0);
  ctx3.lineTo(canvasWidth / 2, 0);
  ctx3.lineTo(canvasWidth / 2, canvasHeight / 2 - radius);
  ctx3.arc(
    canvasWidth * 0.5,
    canvasHeight * 0.5,
    radius,
    -Math.PI / 2,
    Math.PI / 2,
    false
  );
  ctx3.lineTo(canvasWidth / 2, canvasHeight);
  ctx3.lineTo(canvasWidth, canvasHeight);
  ctx3.lineTo(canvasWidth, 0);
  ctx3.fill();
  // ctx3.restore();
}

function DegToRad(d) {
  // Converts degrees to radians
  return d * 0.01745;
}

/**** end of animation */

function scrollLoop() {
  enterNewScene = false;

  const targetScene = sceneInfo[currentScene];
  prevScrollHeight = targetScene.prevScrollHeight;

  const scrollHeight = targetScene.scrollHeight;

  const currentTotalHeight = prevScrollHeight + scrollHeight;

  // this can be merged..
  if (delayedYOffset > currentTotalHeight) {
    if (currentScene === sceneInfo.length - 1) return;
    currentScene++;
    enterNewScene = true;
  } else if (delayedYOffset < prevScrollHeight) {
    if (currentScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
    currentScene--;
    enterNewScene = true;
  }

  // if (delayedYOffset > currentTotalHeight - sceneHeight) {
  //   touchDown = true;
  // } else {
  //   touchDown = false;
  // }

  if (enterNewScene) {
    if (currentScene < sceneInfo.length) {
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    } else {
      document.body.setAttribute("id", "");
    }
    // if (currentScene === 0 || currentScene === 1) {
    //   sceneInfo[0].objs.container.classList.add("stickyy");
    // } else {
    //   sceneInfo[0].objs.container.classList.remove("stickyy");
    // }

    return;
  }

  playAnimation();
}

let count = 0;
let roundedCount = 0;

const testArr = [
  "messageAUp_opacity_in",
  "messageAUp_translateY_in",
  "messageADown_opacity_in",
  "messageADown_translateY_in",
  "messageBUp_opacity_in",
  "messageBUp_translateY_in",
  "messageBDown_opacity_in",
  "messageBDown_translateY_in"
];

const testObj = {
  messageAUp_opacity_in: "messageAUp",
  messageAUp_translateY_in: "messageAUp",
  messageADown_opacity_in: "messageADown",
  messageADown_translateY_in: "messageADown",
  messageBUp_opacity_in: "messageBUp",
  messageBUp_translateY_in: "messageBUp",
  messageBDown_opacity_in: "messageBDown",
  messageBDown_translateY_in: "messageBDown"
};

// function moveAnimation() {
//   // this is for only first time load..
//   let targetSceneNum = 0;

//   if (count <= firstLoadingSequence) {
//     const targetScene = sceneInfo[targetSceneNum];
//     const objs = targetScene.objs;
//     const values = targetScene.values;

//     let percentageHow = count / firstLoadingSequence;

//     testArr.forEach(cur => {
//       const targetValues = values[cur];

//       if (
//         percentageHow >= targetValues[2].start &&
//         percentageHow <= targetValues[2].end
//       ) {
//         let howMuchGoOn =
//           (percentageHow - targetValues[2].start) /
//           (targetValues[2].end - targetValues[2].start);
//         let processValue =
//           howMuchGoOn * (targetValues[1] - targetValues[0]) + targetValues[0];
//         if (cur.includes("opacity")) {
//           objs[testObj[cur]].style.opacity = processValue;
//         } else {
//           objs[
//             testObj[cur]
//           ].style.transform = `translate3d(0%, ${processValue}%, 0)`;
//         }
//       }
//     });

//     roundedCount = Math.round(count);
//     objs.context.clearRect(0, 0, objs.canvas.width, objs.canvas.height);
//     objs.context.drawImage(
//       objs.videoImages[currentDeviceType][roundedCount],
//       0,
//       0
//     );
//     count += 0.75;

//     moveRafId = requestAnimationFrame(moveAnimation);
//   } else {
//     cancelAnimationFrame(moveRafId);
//   }
// }

function moveAnimation() {
  // this is for only first time load..
  let targetSceneNum = 0;

  const targetScene = sceneInfo[targetSceneNum];
  const objs = targetScene.objs;

  if (count <= firstLoadingSequence) {
    roundedCount = Math.round(count);
    // if (roundedCount <= 10) {
    //   roundedCount = 0;
    // }
    // this is for jpg
    // if (currentDeviceType == "desktop") {
    //   objs.context.clearRect(0, 0, objs.canvas.width, objs.canvas.height);
    // }
    objs.context.drawImage(
      objs.videoImages[currentDeviceType][roundedCount],
      0,
      0
    );
  } else {
    const values = targetScene.values;
    let percentageHow = (count - firstLoadingSequence) / firstLoadingSequence;

    testArr.forEach(cur => {
      const targetValues = values[cur];

      if (
        percentageHow >= targetValues[2].start &&
        percentageHow <= targetValues[2].end
      ) {
        let howMuchGoOn =
          (percentageHow - targetValues[2].start) /
          (targetValues[2].end - targetValues[2].start);
        let processValue =
          howMuchGoOn * (targetValues[1] - targetValues[0]) + targetValues[0];
        if (cur.includes("opacity")) {
          objs[testObj[cur]].style.opacity = processValue;
        } else {
          objs[
            testObj[cur]
          ].style.transform = `translate3d(0%, ${processValue}%, 0)`;
        }
      }
    });
  }

  if (count <= 2 * firstLoadingSequence) {
    count += 0.75;

    moveRafId = requestAnimationFrame(moveAnimation);
  } else {
    cancelAnimationFrame(moveRafId);
  }
}

function checkDevice() {
  const deviceWidth = window.document.documentElement.clientWidth;

  if (deviceWidth > 700) {
    return "desktop";
  } else {
    return "mobile";
  }
}

function android() {
  return navigator.userAgent.match(/android/i);
  // return navigator.userAgent.match(/(iPad|iPhone|iPod)/i);
}

function loop() {
  delayedYOffset = delayedYOffset + (window.pageYOffset - delayedYOffset) * acc;

  if (!enterNewScene) {
    // this can be improve
    const currentYOffset = delayedYOffset - prevScrollHeight;
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;

    if (currentScene === 0) {
      // this should be not work when firstCanvas over
      let sequence = Math.round(
        calcValues(values.imageSequence, currentYOffset)
      );
      firstSceneSequence = sequence;
      if (objs.videoImages[currentDeviceType][sequence]) {
        // objs.context.drawImage(objs.videoImages[0], 0, 0);
        // this is for jpg
        // if (currentDeviceType == "desktop") {
        //   objs.context.clearRect(0, 0, objs.canvas.width, objs.canvas.height);
        // }
        objs.context.drawImage(
          objs.videoImages[currentDeviceType][sequence],
          0,
          0
        );
      }
    }
  }

  rafId = requestAnimationFrame(loop);

  if (Math.abs(window.pageYOffset - delayedYOffset) < 1) {
    cancelAnimationFrame(rafId);
    rafState = false;
  }
}

var sceneHeight1, sceneWidth1;
var givenRatio = 0.75;
var shouldChange = false;

function checkDeviceRatio() {
  sceneHeight1 = window.innerHeight;
  sceneWidth1 = window.document.documentElement.clientWidth;

  shouldChange = false;

  if (sceneWidth1 >= sceneHeight1 * givenRatio) {
    if (currentDeviceType !== "desktop") {
      shouldChange = true;
    }

    currentDeviceType = "desktop";
  } else {
    if (currentDeviceType !== "mobile") {
      shouldChange = true;
    }

    currentDeviceType = "mobile";
  }
}

window.addEventListener("load", () => {
  document.body.classList.remove("before-load");
  // this can be improve -> init();
  if (android()) {
    sceneInfo[0].heightNum = 100;
  } else {
    sceneInfo[0].heightNum = 24;
  }
  setLayout();
  sceneInfo[0].objs.context.drawImage(
    sceneInfo[0].objs.videoImages[currentDeviceType][0],
    0,
    0
  );

  let tempYOffset = window.pageYOffset;
  let tempScrollCount = 0;

  if (tempYOffset > 0) {
    let siId = setInterval(() => {
      scrollTo(0, tempYOffset);
      tempYOffset += 5;

      if (tempScrollCount > 20) {
        clearInterval(siId);
      }
      tempScrollCount++;
    }, 20);
  } else if (tempYOffset === 0) {
    moveAnimation();
  }

  // if (tempYOffset > 0) {
  //   let siId = setInterval(() => {
  //     scrollTo(0, tempYOffset);
  //     tempYOffset += 5;

  //     if (tempScrollCount > 20) {
  //       clearInterval(siId);
  //     }
  //     tempScrollCount++;
  //   }, 20);
  // }

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
    // checkMenu();

    if (!rafState) {
      rafId = requestAnimationFrame(loop);
      rafState = true;
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      setLayout();
      // this is imageBlend
      // this can be improve
      // sceneInfo[2].values.rectStartY = 0;
    }
    currentDeviceType = checkDevice();
    checkDeviceRatio();
    currentDevice = DEVICE[currentDeviceType];
    sceneInfo[0].values.svg_scale0[0] = currentDevice.podSVGInitialScale;
    setCanvasImages();

    // this is imageBlend
    // this can be improve
    // if (currentScene === 2) {
    //   // 추가 코드
    //   // Scene 3의 요소들은 위치나 크기가 미리 정해지지 않고
    //   // 현재 창 사이즈나 스크롤 위치에 따라 가변적으로 변하기 때문에
    //   // 리사이즈에 일일이 대응시키기가 까다롭습니다.
    //   // Scene 3에 진입 시점에 요소들의 위치와 크기가 결정이 되는 특징을 이용해서
    //   // 현재 Scene이 3일 경우에는 좀 위로 스크롤이 되도록 해서
    //   // Scene 3의 시작 지점 이전으로 돌리는 식으로 요소들의 레이아웃이 깨지는 현상을 방지해 줍니다.
    //   // 시작 지점 이전으로 스크롤을 이동 시키는 동작은
    //   // 바로 위 518 라인의 자동 스크롤 코드를 그대로 활용했습니다.
    //   let tempYOffset = yOffset;
    //   let tempScrollCount = 0;
    //   if (tempYOffset > 0) {
    //     let siId = setInterval(() => {
    //       scrollTo(0, tempYOffset);
    //       tempYOffset -= 50;

    //       if (tempScrollCount > 20) {
    //         clearInterval(siId);
    //       }
    //       tempScrollCount++;
    //     }, 20);
    //   }
    // }
  });

  window.addEventListener("orientationchange", () => {
    setTimeout(setLayout, 500);
  });

  document.querySelector(".loading").addEventListener("transitionend", e => {
    document.body.removeChild(e.currentTarget);
  });
});

currentDeviceType = checkDevice();
checkDeviceRatio();
currentDevice = DEVICE[currentDeviceType];
sceneInfo[0].values.svg_scale0[0] = currentDevice.podSVGInitialScale;
setCanvasImages();

function init() {}
