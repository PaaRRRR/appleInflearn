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

const DEVICE = {
  mobile: {
    width: 360,
    height: 640,
    videoImage: "pivoMobile"
  },
  desktop: {
    width: 1440,
    height: 1080,
    videoImage: "pivoVideo3"
  }
};
let currentDeviceType = "mobile";
let currentDevice = DEVICE[currentDeviceType];

const sceneInfo = [
  {
    // 0
    type: "sticky",
    heightNum: 8.5, // 브라우저 높이의 5배로 scrollHeight 세팅
    scrollHeight: 0,
    prevScrollHeight: 0,
    objs: {
      container: document.querySelector("#scroll-section-0"),
      messageA: document.querySelector("#scroll-section-0 .main-message.a"),
      messageB: document.querySelector("#scroll-section-0 .main-message.b"),
      messageC: document.querySelector("#scroll-section-0 .main-message.c"),
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
      }
    },
    values: {
      videoImageCount: 196,
      imageSequence: [firstLoadingSequence, 195, { start: 0.4, end: 0.8 }],
      canvas_opacity: [1, 0, { start: 0.85, end: 0.9 }],

      messageAUp_opacity_in: [0, 1, { start: 0.2, end: 0.28 }],
      messageAUp_translateY_in: [20, 0, { start: 0.2, end: 0.28 }],

      messageADown_opacity_in: [0, 1, { start: 0.3, end: 0.56 }],
      messageADown_translateY_in: [20, 0, { start: 0.3, end: 0.56 }],

      messageBUp_opacity_in: [0, 1, { start: 0.56, end: 0.8 }],
      messageBUp_translateY_in: [20, 0, { start: 0.56, end: 0.8 }],

      messageBDown_opacity_in: [0, 1, { start: 0.56, end: 0.8 }],
      messageBDown_translateY_in: [20, 0, { start: 0.56, end: 0.8 }],

      messageA_opacity_out: [1, 0, { start: 0, end: 0.4 }],
      messageB_opacity_out: [1, 0, { start: 0, end: 0.4 }],
      messageA_translateY_out: [0, -20, { start: 0, end: 0.4 }],
      messageB_translateY_out: [0, -20, { start: 0, end: 0.4 }],

      // messageC_opacity_in: [0, 1, { start: 0.48, end: 0.56 }],
      // messageC_translateY_in: [20, 0, { start: 0.48, end: 0.56 }],
      messageC_opacity_in: [0, 1, { start: 0.6, end: 0.7 }],
      messageC_translateY_in: [20, 0, { start: 0.6, end: 0.7 }],
      messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
      messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
    }
  },
  {
    // 1
    type: "sticky",
    heightNum: 5,
    scrollHeight: 0,
    prevScrollHeight: 0,
    objs: {
      container: document.querySelector("#scroll-section-1"),
      podSVG: document.querySelector("#scroll-section-1 .svgAnimationLetter")
    },
    values: {
      opacity: [0, 1, { start: 0, end: 0.4 }],
      svg_scale: [0.5, 1, { start: 0, end: 0.4 }],
      svg_rotate: [0, 180, { start: 0, end: 0.4 }]
    }
  },
  {
    type: "sticky",
    heightNum: 5,
    scrollHeight: 0,
    prevScrollHeight: 0,
    objs: {
      container: document.querySelector("#scroll-section-2"),
      videoContainer: document.querySelector(".videoContainer")
    },
    values: {
      video_scale: [1, 0.75, { start: 0, end: 0.8 }]
    }
  }
  // this is imageBlend
  // {
  //   // 2
  //   type: "sticky",
  //   heightNum: 5,
  //   scrollHeight: 0,
  //   prevScrollHeight: 0,
  //   objs: {
  //     container: document.querySelector("#scroll-section-2"),
  //     canvasCaption: document.querySelector(".canvas-caption"),
  //     canvas: document.querySelector(".image-blend-canvas"),
  //     context: document.querySelector(".image-blend-canvas").getContext("2d"),
  //     imagesPath: [
  //       "../assets/images/blend-image-1.jpg",
  //       "../assets/images/blend-image-2.jpg"
  //     ],
  //     images: []
  //   },
  //   values: {
  //     rect1X: [0, 0, { start: 0, end: 0 }],
  //     rect2X: [0, 0, { start: 0, end: 0 }],
  //     blendHeight: [0, 0, { start: 0, end: 0 }],
  //     canvas_scale: [0, 0, { start: 0, end: 0 }],
  //     canvasCaption_opacity: [0, 1, { start: 0, end: 0 }],
  //     canvasCaption_translateY: [20, 0, { start: 0, end: 0 }],
  //     rectStartY: 0
  //   }
  // }
];

function setCanvasImages() {
  if (
    sceneInfo[0].objs.videoImages[currentDeviceType] &&
    sceneInfo[0].objs.videoImages[currentDeviceType].length > 0
  ) {
    return;
  }

  let imgElem;

  for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
    imgElem = new Image();
    imgElem.src = `./assets/${currentDevice.videoImage}/Frame (${1 + i}).png`;
    sceneInfo[0].objs.videoImages[currentDeviceType].push(imgElem);
  }

  // this is imageBlend
  // let imgElem2;
  // for (let i = 0; i < sceneInfo[2].objs.imagesPath.length; i++) {
  //   imgElem2 = new Image();
  //   imgElem2.src = sceneInfo[2].objs.imagesPath[i];
  //   sceneInfo[2].objs.images.push(imgElem2);
  // }
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

  if (sceneHeight !== window.innerHeight) {
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

    if (sceneInfo[0].objs.canvas) {
      const objs = sceneInfo[0].objs;
      const firstCanvas = objs.canvas;
      const firstContext = objs.context;
      firstCanvas.width = currentDevice.width;
      firstCanvas.height = currentDevice.height;

      const canvasHeight = firstCanvas.height;
      const heightRatio = sceneHeight / canvasHeight;

      // Scale(1.2 -> 1) --> 114px -> 0 // 8.5% -> 0
      // firstCanvas.style.transform = `translate3d(-50%, 0px, 0) scale(${heightRatio})`;
      firstCanvas.style.transform = `translate3d(-50%, -51%, 0)`;

      firstContext.clearRect(0, 0, firstCanvas.width, firstCanvas.height);
      firstContext.drawImage(
        objs.videoImages[currentDeviceType][firstSceneSequence],
        0,
        0
      );
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

      if (scrollRatio <= 0.8) {
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

      break;

    case 1:
      if (scrollRatio < 0.7) {
        objs.podSVG.classList.add("stickySVG");

        objs.podSVG.style.transform = `translate3d(-50%, -50%, 0) scale(${calcValues(
          values.svg_scale,
          currentYOffset
        )}) rotate(${calcValues(values.svg_rotate, currentYOffset)}deg)`;

        objs.podSVG.style.opacity = calcValues(values.opacity, currentYOffset);

        objs.podSVG.style.marginTop = "0";
      } else {
        objs.podSVG.classList.remove("stickySVG");
        objs.podSVG.style.marginTop = `${scrollHeight * 0.7}px`;
        objs.podSVG.style.transform = "translate3d(0, -50%, 0) scale(1)";

        // if (touchDown) {
        //   sceneInfo[2].objs.videoContainer.classList.add("stickyVideo");
        // } else {
        //   sceneInfo[2].objs.videoContainer.classList.remove("stickyVideo");
        // }
      }

      // this is imageBlend
      // currentScene 3에서 쓰는 캔버스를 미리 그려주기 시작
      // if (scrollRatio > 0.9) {
      //   const objs = sceneInfo[2].objs;
      //   const values = sceneInfo[2].values;
      //   const widthRatio = window.innerWidth / objs.canvas.width;
      //   const heightRatio = window.innerHeight / objs.canvas.height;
      //   let canvasScaleRatio;

      //   if (widthRatio <= heightRatio) {
      //     // 캔버스보다 브라우저 창이 홀쭉한 경우
      //     canvasScaleRatio = heightRatio;
      //   } else {
      //     // 캔버스보다 브라우저 창이 납작한 경우
      //     canvasScaleRatio = widthRatio;
      //   }

      //   objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
      //   objs.context.fillStyle = "white";
      //   objs.context.drawImage(objs.images[0], 0, 0);

      //   // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
      //   const recalculatedInnerWidth =
      //     document.body.offsetWidth / canvasScaleRatio;
      //   const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

      //   const whiteRectWidth = recalculatedInnerWidth * 0.15;
      //   values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
      //   values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
      //   values.rect2X[0] =
      //     values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
      //   values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

      //   // 좌우 흰색 박스 그리기
      //   objs.context.fillRect(
      //     parseInt(values.rect1X[0]),
      //     0,
      //     parseInt(whiteRectWidth),
      //     objs.canvas.height
      //   );
      //   objs.context.fillRect(
      //     parseInt(values.rect2X[0]),
      //     0,
      //     parseInt(whiteRectWidth),
      //     objs.canvas.height
      //   );
      // }

      break;

    case 2:
      objs.videoContainer.style.transform = `scale(${calcValues(
        values.video_scale,
        currentYOffset
      )})`;

      const whenEnd = values.video_scale[2].end;

      if (scrollRatio > whenEnd) {
        objs.videoContainer.classList.remove("stickyVideo");
        objs.videoContainer.style.marginTop = `${scrollHeight * whenEnd -
          objs.videoContainer.clientHeight / 2}px`;
      } else {
        objs.videoContainer.classList.add("stickyVideo");
        objs.videoContainer.style.marginTop = "0";
      }

      break;

    // this is imageBlend
    // case 2:
    //   // console.log('3 play');
    //   let step = 0;
    //   // 가로/세로 모두 꽉 차게 하기 위해 여기서 세팅(계산 필요)
    //   const widthRatio = sceneHeight / objs.canvas.width;
    //   const heightRatio = sceneHeight / objs.canvas.height;
    //   let canvasScaleRatio;

    //   if (widthRatio <= heightRatio) {
    //     // 캔버스보다 브라우저 창이 홀쭉한 경우
    //     canvasScaleRatio = heightRatio;
    //   } else {
    //     // 캔버스보다 브라우저 창이 납작한 경우
    //     canvasScaleRatio = widthRatio;
    //   }

    //   objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
    //   objs.context.fillStyle = "white";
    //   objs.context.drawImage(objs.images[0], 0, 0);

    //   // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
    //   const recalculatedInnerWidth =
    //     document.body.offsetWidth / canvasScaleRatio;
    //   const recalculatedInnerHeight = sceneHeight / canvasScaleRatio;

    //   if (!values.rectStartY) {
    //     // values.rectStartY = objs.canvas.getBoundingClientRect().top;
    //     values.rectStartY =
    //       objs.canvas.offsetTop +
    //       (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
    //     values.rect1X[2].start = sceneHeight / 2 / scrollHeight;
    //     values.rect2X[2].start = values.rect1X[2].start;
    //     values.rect1X[2].end = values.rectStartY / scrollHeight;
    //     values.rect2X[2].end = values.rect1X[2].end;
    //   }
    //  // this can be improve (if (!values.rectStartY))
    //   const whiteRectWidth = recalculatedInnerWidth * 0.15;
    //   values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
    //   values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
    //   values.rect2X[0] =
    //     values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
    //   values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

    //   // 좌우 흰색 박스 그리기
    //   objs.context.fillRect(
    //     parseInt(calcValues(values.rect1X, currentYOffset)),
    //     0,
    //     parseInt(whiteRectWidth),
    //     objs.canvas.height
    //   );
    //   objs.context.fillRect(
    //     parseInt(calcValues(values.rect2X, currentYOffset)),
    //     0,
    //     parseInt(whiteRectWidth),
    //     objs.canvas.height
    //   );

    //   if (scrollRatio < values.rect1X[2].end) {
    //     step = 1;
    //     // console.log('캔버스 닿기 전');
    //     objs.canvas.classList.remove("sticky");
    //   } else {
    //     step = 2;
    //     // console.log('캔버스 닿은 후');
    //     // 이미지 블렌드
    //     // values.blendHeight: [ 0, 0, { start: 0, end: 0 } ]
    //  // this can be improve (if (!values.rectStartY))
    //     values.blendHeight[0] = 0;
    //     values.blendHeight[1] = objs.canvas.height;
    //     values.blendHeight[2].start = values.rect1X[2].end;
    //     values.blendHeight[2].end = values.blendHeight[2].start + 0.2;
    //     const blendHeight = calcValues(values.blendHeight, currentYOffset);

    //     objs.context.drawImage(
    //       objs.images[1],
    //       0,
    //       objs.canvas.height - blendHeight,
    //       objs.canvas.width,
    //       blendHeight,
    //       0,
    //       objs.canvas.height - blendHeight,
    //       objs.canvas.width,
    //       blendHeight
    //     );

    //     objs.canvas.classList.add("sticky");
    //     objs.canvas.style.top = `${-(
    //       objs.canvas.height -
    //       objs.canvas.height * canvasScaleRatio
    //     ) / 2}px`;

    //  // this can be improve (if (!values.rectStartY))
    //     if (scrollRatio > values.blendHeight[2].end) {
    //       values.canvas_scale[0] = canvasScaleRatio;
    //       values.canvas_scale[1] =
    //         document.body.offsetWidth / (1.5 * objs.canvas.width);
    //       values.canvas_scale[2].start = values.blendHeight[2].end;
    //       values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

    //       objs.canvas.style.transform = `scale(${calcValues(
    //         values.canvas_scale,
    //         currentYOffset
    //       )})`;
    //       objs.canvas.style.marginTop = 0;
    //     }

    //     if (
    //       scrollRatio > values.canvas_scale[2].end &&
    //       values.canvas_scale[2].end > 0
    //     ) {
    //       objs.canvas.classList.remove("sticky");
    //       objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;

    //       values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;
    //       values.canvasCaption_opacity[2].end =
    //         values.canvasCaption_opacity[2].start + 0.1;
    //       values.canvasCaption_translateY[2].start =
    //         values.canvasCaption_opacity[2].start;
    //       values.canvasCaption_translateY[2].end =
    //         values.canvasCaption_opacity[2].end;
    //       objs.canvasCaption.style.opacity = calcValues(
    //         values.canvasCaption_opacity,
    //         currentYOffset
    //       );
    //       objs.canvasCaption.style.transform = `translate3d(0, ${calcValues(
    //         values.canvasCaption_translateY,
    //         currentYOffset
    //       )}%, 0)`;
    //     }
    //   }

    //   break;
  }
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
    // touchDown = false;
    document.body.setAttribute("id", `show-scene-${currentScene}`);
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
    objs.context.clearRect(0, 0, objs.canvas.width, objs.canvas.height);
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

function loop() {
  delayedYOffset = delayedYOffset + (window.pageYOffset - delayedYOffset) * acc;

  if (!enterNewScene) {
    // this can be improve
    if (currentScene === 0) {
      const currentYOffset = delayedYOffset - prevScrollHeight;
      const objs = sceneInfo[currentScene].objs;
      const values = sceneInfo[currentScene].values;
      let sequence = Math.round(
        calcValues(values.imageSequence, currentYOffset)
      );
      firstSceneSequence = sequence;
      if (objs.videoImages[currentDeviceType][sequence]) {
        // objs.context.drawImage(objs.videoImages[0], 0, 0);
        objs.context.clearRect(0, 0, objs.canvas.width, objs.canvas.height);
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

window.addEventListener("load", () => {
  document.body.classList.remove("before-load");
  // this can be improve -> init();
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
      // console.log("asdfasdfasdf", tempYOffset);

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
  //     // console.log("asdfasdfasdf", tempYOffset);

  //     if (tempScrollCount > 20) {
  //       clearInterval(siId);
  //     }
  //     tempScrollCount++;
  //   }, 20);
  // }

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
    checkMenu();

    if (!rafState) {
      rafId = requestAnimationFrame(loop);
      rafState = true;
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      // setLayout();
      // this is imageBlend
      // this can be improve
      // sceneInfo[2].values.rectStartY = 0;
    }

    currentDeviceType = checkDevice();
    currentDevice = DEVICE[currentDeviceType];
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
currentDevice = DEVICE[currentDeviceType];
setCanvasImages();

function init() {}
