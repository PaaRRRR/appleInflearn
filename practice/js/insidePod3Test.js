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

const firstLoadingSequence = 71;
let firstSceneSequence = firstLoadingSequence;

const FIRST_CANVAS = {
  mobile: {
    width: 360,
    height: 640,
    videoImage: "pivoVideo4_mobile",
    imageCount: 260,
    podSVGInitialScale: 0.4,
    images: []
  },
  desktop: {
    width: 1440,
    height: 1080,
    videoImage: "pivoVideo4_desktop",
    imageCount: 277,
    podSVGInitialScale: 0.2,
    images: []
  }
};

const SECOND_CANVAS = {
  width: 1141,
  height: 543.28,
  imageScale: 1,
  imageRoute: "images",
  imageCount: 1,
  podSVGInitialScale: 0.4,
  images: ""
};

let currentDeviceType, currentFirstCanvasDevice;

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
      gradientOverlay: document.querySelector(
        "#scroll-section-0 .gradient-overlay"
      ),
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
      videoImages: [],

      videoContainer: document.querySelector(".videoContainer2"),
      imageCanvas: document.querySelector("#image-canvas"),
      imageContext: document.querySelector("#image-canvas").getContext("2d"),
      image: ""
    },
    values: {
      videoImageCount: 211,
      // this is loading animation
      messageAUp_opacity_in: [0, 1, { start: 0.1, end: 0.14 }],
      messageAUp_translateY_in: [20, 0, { start: 0.1, end: 0.14 }],
      messageADown_opacity_in: [0, 1, { start: 0.15, end: 0.28 }],
      messageADown_translateY_in: [20, 0, { start: 0.15, end: 0.28 }],
      messageBUp_opacity_in: [0, 1, { start: 0.28, end: 0.4 }],
      messageBUp_translateY_in: [20, 0, { start: 0.28, end: 0.4 }],
      messageBDown_opacity_in: [0, 1, { start: 0.28, end: 0.4 }],
      messageBDown_translateY_in: [20, 0, { start: 0.28, end: 0.4 }],

      // start first animation (0 ~ 0.5)
      imageSequence: [firstLoadingSequence, 210, { start: 0.05, end: 0.4 }],
      canvas_opacity: [1, 0, { start: 0.41, end: 0.5 }],

      messageA_opacity_out: [1, 0, { start: 0, end: 0.05 }],
      messageB_opacity_out: [1, 0, { start: 0, end: 0.05 }],
      messageA_translateY_out: [0, -20, { start: 0, end: 0.05 }],
      messageB_translateY_out: [0, -20, { start: 0, end: 0.05 }],

      messageC_opacity_in: [0, 1, { start: 0.185, end: 0.265 }],
      messageC_translateY_in: [7, 0, { start: 0.185, end: 0.265 }],
      messageC_opacity_out: [1, 0, { start: 0.295, end: 0.31 }],
      messageC_translateY_out: [0, -7, { start: 0.295, end: 0.31 }],
      gradientOverlay: [1, 0, { start: 0.225, end: 0.25 }],

      // start second animation (0.5 ~ 1)
      svg_opacity_in: [0, 1, { start: 0.41, end: 0.5 }],
      svg_scale: [0.4, 12, { start: 0.5, end: 0.7 }],
      svg_rotate: [0, 720, { start: 0.5, end: 0.7 }],
      video_opacity_in: [0, 1, { start: 0.5375, end: 0.7 }],
      video_scale: [1, 0.75, { start: 0.75, end: 0.9 }],
      video_opacity_out: [1, 0, { start: 0.925, end: 1 }]
    }
  }
];

function setCanvasImages() {
  var newDeviceType = checkDevice();
  var firstCanvasDevice = FIRST_CANVAS[newDeviceType];

  // first canvas
  if (firstCanvasDevice.images.length === 0) {
    let imgElem;

    for (let i = 0; i < firstCanvasDevice.imageCount; i += 1) {
      imgElem = new Image();
      if (newDeviceType == "mobile") {
        imgElem.src = `./assets/${
          firstCanvasDevice.videoImage
        }/2020.06.24_Animation_06.351.${1 + i}.png`;
      } else {
        imgElem.src = `./assets/${
          firstCanvasDevice.videoImage
        }/2020.06.24_Animation_06.353.${1 + i}.png`;
      }

      firstCanvasDevice.images.push(imgElem);
    }
  }

  // second canvas
  if (!SECOND_CANVAS.images) {
    let imgElem2 = new Image();
    // imgElem2.src = "./assets/images/LightBox.jpg";
    imgElem2.src = "./assets/images/pod_logo_final.svg";
    SECOND_CANVAS.images = imgElem2;

    sceneInfo[0].objs.image = imgElem2;
    // let imgWidth = imgElem2.width;
    // let imgHeight = imgElem2.height;
    // sceneInfo[1].objs.imageWHRatio = imgWidth / imgHeight;
  }

  if (currentDeviceType !== newDeviceType) {
    // check if prev status is same
    // if same -> not doit
    currentDeviceType = newDeviceType;

    sceneInfo[0].values.svg_scale[0] =
      FIRST_CANVAS[currentDeviceType].podSVGInitialScale;

    sceneInfo[0].values.videoImageCount = firstCanvasDevice.imageCount;
    sceneInfo[0].values.imageSequence[1] = firstCanvasDevice.imageCount - 1;

    sceneInfo[0].objs.videoImages = firstCanvasDevice.images;
  }
}

function checkMenu() {
  // if (sceneInfo[2].prevScrollHeight) {
  //   const prevScrollHeight = sceneInfo[2].prevScrollHeight;
  //   if (yOffset > prevScrollHeight - sceneHeight) {
  //     document.body.classList.remove("local-nav-sticky");
  //   } else {
  //     document.body.classList.add("local-nav-sticky");
  //   }
  //   if (
  //     yOffset > prevScrollHeight - sceneHeight &&
  //     yOffset <
  //       prevScrollHeight +
  //         sceneInfo[2].scrollHeight * sceneInfo[2].values.video_scale[2].end
  //   ) {
  //     sceneInfo[2].objs.videoContainer.classList.add("stickyVideo");
  //   } else {
  //     sceneInfo[2].objs.videoContainer.classList.remove("stickyVideo");
  //   }
  // }
}

function setLayout() {
  yOffset = window.pageYOffset;

  // handle container size
  if (sceneHeight !== window.innerHeight) {
    console.log("do it again", sceneHeight);

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
  }

  // handle canvas size
  if (sceneInfo[0].objs) {
    const objs = sceneInfo[0].objs;
    const firstCanvas = objs.canvas;
    const firstContext = objs.context;
    currentFirstCanvasDevice = FIRST_CANVAS[currentDeviceType];
    const secondCanvas = objs.imageCanvas;
    const secondContext = objs.imageContext;

    if (firstCanvas) {
      firstCanvas.width = currentFirstCanvasDevice.width;
      firstCanvas.height = currentFirstCanvasDevice.height;

      console.log("asdfasdfasdf", firstCanvas.width, firstCanvas.height);

      const canvasHeight = firstCanvas.height;
      const heightRatio = sceneHeight / canvasHeight;

      // Scale(1.2 -> 1) --> 114px -> 0 // 8.5% -> 0
      // firstCanvas.style.transform = `translate3d(-50%, 0px, 0) scale(${heightRatio})`;
      firstCanvas.style.transform = `translate3d(-50%, -50%, 0)`;

      firstContext.clearRect(0, 0, firstCanvas.width, firstCanvas.height);
      firstContext.drawImage(objs.videoImages[firstSceneSequence], 0, 0);
    }

    if (secondCanvas) {
      const canvasWidth = window.document.documentElement.clientWidth;
      const canvasHeight = window.innerHeight;

      secondCanvas.width = canvasWidth;
      secondCanvas.height = canvasHeight;

      const imageScale = SECOND_CANVAS.imageScale;
      const imageWHRatio = SECOND_CANVAS.width / SECOND_CANVAS.height;

      let calcImgWidth = canvasWidth * imageScale;
      let calcImgHeight = canvasHeight * imageScale;

      console.log("xxx", calcImgWidth, calcImgHeight);

      const calcImgWidthFromHeight = calcImgHeight * imageWHRatio;

      if (calcImgWidthFromHeight < calcImgWidth) {
        calcImgWidth = calcImgWidthFromHeight;
      } else {
        calcImgHeight = calcImgWidth / imageWHRatio;
      }

      SECOND_CANVAS.images.width = calcImgWidth;
      SECOND_CANVAS.images.height = calcImgHeight;

      secondCanvas.style.transform = `translate3d(-50%, -50%, 0)`;
      secondContext.fillStyle = "#446a78";
    }
  }
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

      objs.gradientOverlay.style.opacity = calcValues(
        values.gradientOverlay,
        currentYOffset
      );

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

        objs.messageC.style.transform = `translate3d(0, ${calcValues(
          values.messageC_translateY_in,
          currentYOffset
        )}%, 0)`;
      } else {
        // out
        objs.messageC.style.opacity = calcValues(
          values.messageC_opacity_out,
          currentYOffset
        );
        objs.messageC.style.transform = `translate3d(0, ${calcValues(
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
      secondContext.clearRect(0, 0, secondCanvasWidth, secondCanvasHeight);

      const secondScaleValue = calcValues(values.svg_scale, currentYOffset);
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

      secondContext.drawImage(
        objs.image,
        -recalculatedImgWidth * 0.5,
        -recalculatedImgHeight * 0.5,
        recalculatedImgWidth,
        recalculatedImgHeight
      );

      secondContext.restore();

      console.log("asdfasdfasd");

      // objs.podSVG.style.transform = `translate3d(-50%, -50%, 0) scale(${calcValues(
      //   values.svg_scale,
      //   currentYOffset
      // )}) rotate(${calcValues(values.svg_rotate, currentYOffset)}deg)`;

      objs.imageCanvas.style.opacity = calcValues(
        values.svg_opacity_in,
        currentYOffset
      );

      // objs.podSVG.style.opacity = 1;

      // objs.podSVG.style.marginTop = "0";

      objs.videoContainer.style.opacity = calcValues(
        values.video_opacity_in,
        currentYOffset
      );
      if (scrollRatio > 0.4) {
        objs.videoContainer.style.transform = `scale(${calcValues(
          values.video_scale,
          currentYOffset
        )})`;

        const whenEnd = values.video_scale[2].end;

        if (scrollRatio > whenEnd) {
          objs.videoContainer.classList.remove("sticky-elem2");
          objs.videoContainer.style.marginTop = `${scrollHeight * whenEnd -
            objs.videoContainer.clientHeight / 2}px`;
          // this should be improve
          objs.videoContainer.style.position = "unset";
        } else {
          objs.videoContainer.classList.add("sticky-elem2");
          objs.videoContainer.style.marginTop = "0";
          // this should be improve
          objs.videoContainer.style.position = "";
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

function loadingAnimation() {
  var loadingCount = 0;
  var roundedCount = 0;

  var loadingElArray = [
    "messageAUp_opacity_in",
    "messageAUp_translateY_in",
    "messageADown_opacity_in",
    "messageADown_translateY_in",
    "messageBUp_opacity_in",
    "messageBUp_translateY_in",
    "messageBDown_opacity_in",
    "messageBDown_translateY_in"
  ];

  var loadingElObj = {
    messageAUp_opacity_in: "messageAUp",
    messageAUp_translateY_in: "messageAUp",
    messageADown_opacity_in: "messageADown",
    messageADown_translateY_in: "messageADown",
    messageBUp_opacity_in: "messageBUp",
    messageBUp_translateY_in: "messageBUp",
    messageBDown_opacity_in: "messageBDown",
    messageBDown_translateY_in: "messageBDown"
  };

  (function loadingFunction() {
    // this is for only first time load..
    let targetSceneNum = 0;

    const targetScene = sceneInfo[targetSceneNum];
    const objs = targetScene.objs;

    if (loadingCount <= firstLoadingSequence) {
      roundedCount = Math.round(loadingCount);
      // if (roundedCount <= 10) {
      //   roundedCount = 0;
      // }
      objs.context.clearRect(0, 0, objs.canvas.width, objs.canvas.height);
      objs.context.drawImage(objs.videoImages[roundedCount], 0, 0);
    } else {
      const values = targetScene.values;
      let percentageHow =
        (loadingCount - firstLoadingSequence) / firstLoadingSequence;

      loadingElArray.forEach(cur => {
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
            objs[loadingElObj[cur]].style.opacity = processValue;
          } else {
            objs[
              loadingElObj[cur]
            ].style.transform = `translate3d(0%, ${processValue}%, 0)`;
          }
        }
      });
    }

    if (loadingCount <= 2 * firstLoadingSequence) {
      loadingCount += 0.75;

      moveRafId = requestAnimationFrame(loadingFunction);
    } else {
      cancelAnimationFrame(moveRafId);
    }
  })();
}

function checkDevice() {
  const deviceWidth = window.document.documentElement.clientWidth;

  if (deviceWidth > 700) {
    return "desktop";
  } else {
    return "mobile";
  }
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
      if (objs.videoImages[sequence]) {
        // objs.context.drawImage(objs.videoImages[0], 0, 0);
        objs.context.clearRect(0, 0, objs.canvas.width, objs.canvas.height);
        objs.context.drawImage(objs.videoImages[sequence], 0, 0);
      }
    }
  }

  rafId = requestAnimationFrame(loop);

  if (Math.abs(window.pageYOffset - delayedYOffset) < 1) {
    cancelAnimationFrame(rafId);
    rafState = false;
  }
}

window.addEventListener("load", () => {
  setCanvasImages();
  document.body.classList.remove("before-load");
  // this can be improve -> init();

  setLayout();
  sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);

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
    loadingAnimation();
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
    // currentFirstCanvasDevice = FIRST_CANVAS[currentDeviceType];
    // sceneInfo[0].values.svg_scale[0] = currentFirstCanvasDevice.podSVGInitialScale;
    // console.log("adasfxxx", currentFirstCanvasDevice.podSVGInitialScale);
    setCanvasImages();
  });

  // window.addEventListener("orientationchange", () => {
  //   setTimeout(setLayout, 500);
  // });

  document.querySelector(".loading").addEventListener("transitionend", e => {
    document.body.removeChild(e.currentTarget);
  });
});

function init() {}
