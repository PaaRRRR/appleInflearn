// version(merging scene-0, scene-1)
(function() {
  let yOffset = null; // window.pageYOffset 대신 쓸 변수
  let sceneWidth = 0;
  let sceneHeight = 0;
  let enterNewScene = false;
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
  // let touchDown = false;
  let acc = 0.2;
  let delayedYOffset = 0;
  let rafId;
  let rafState;
  let whenStickyElemEnd;

  const firstLoadingSequence = 73;
  let firstSceneSequence = firstLoadingSequence;

  let firstCanvasScaleRatio = 1;
  let secondCanvasScaleRatio = 1;

  let calcImgWidth;
  let calcImgHeight;

  var currentSequence;

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

  // let currentDeviceType = "mobile";
  // let currentDevice = DEVICE[currentDeviceType];

  let currentDeviceType, currentDevice;
  let isInternetFast, downloadStartTime;

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
        staticVideoImages: {
          mobile: "",
          desktop: ""
        },

        videoContainer: document.querySelector(".videoContainer2"),
        videoContainer2LocalVideo: document.querySelector(
          ".videoContainer2LocalVideo"
        ),
        videoContainer2PlayBtn: document.querySelector(
          ".videoContainer2PlayBtn"
        ),
        imageCanvas: document.querySelector("#image-canvas"),
        imageContext: document.querySelector("#image-canvas").getContext("2d"),
        imageCanvas1: document.querySelector("#image-canvas1"),
        imageContext1: document
          .querySelector("#image-canvas1")
          .getContext("2d"),
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
        video_opacity_out: [1, 0, { start: 0.8, end: 0.95 }]
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
      firstCanvasRatio = 0.048;

      if (firstCanvas.parentElement.offsetHeight >= 1080) {
        firstCanvasRatio /= firstCanvasScaleRatio;
      }
      secondPodSize =
        calcImgHeight * secondCanvasScaleRatio * secondCanvasRatio;
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

    /* liquid comment */
    // for (let i = 1; i <= sceneInfo[0].values.videoImageCount; i++) {
    //   imgElem = new Image();
    //   // imgElem.src = `./assets/${currentDevice.videoImage}/${i}.jpg`;
    //   if (currentDeviceType === "mobile") {
    //     var imgSrc = `${i}.jpg`;
    //     imgElem.src = "{{ 'imgSrc' | asset_url }}";
    //   } else {
    //     var imgSrc = 'superFinal_Desktop' + i + '.jpg';
    //     var imgSrc = 'superFinal_Desktop1.jpg'
    //     imgElem.src = "{{ '" +  i + ".jpg' | asset_url }}";

    //     console.log('hi imgElem', imgElem.src);
    //   }

    //   sceneInfo[0].objs.videoImages[currentDeviceType].push(imgElem);
    // }

    let imgElem3 = new Image();
    // imgElem3.src = "./assets/images/JUST_POD_O.svg";
    // imgElem3.src = "./JUST_POD_O.svg";
    imgElem3.src = "./assets/images/JUST_POD_O.svg";
    sceneInfo[0].objs.image1 = imgElem3;

    let imgElem4 = new Image();
    // imgElem4.src = "./assets/images/JUST_POD_PD.svg";
    // imgElem4.src = "./JUST_POD_PD.svg";
    imgElem4.src = "./assets/images/JUST_POD_PD.svg";
    sceneInfo[0].objs.image2 = imgElem4;

    let imgElem5 = new Image();
    imgElem5.src = "./assets/pod_image_mobile/264.jpg";
    sceneInfo[0].objs.staticVideoImages.desktop = imgElem5;

    imgElem5.src = "./assets/pod_image_desktop/superFinal_Desktop264.jpg";
    sceneInfo[0].objs.staticVideoImages.mobile = imgElem5;

    /* liquid comment */
    // downloadStartTime = (new Date()).getTime();

    let imgElem2 = new Image();
    /* liquid comment */
    // imgElem2.onload = checkWhetherInternetFast;

    imgElem2.src = "./assets/images/POD_logo_big.svg";
    sceneInfo[0].objs.image = imgElem2;

    isInternetFast = checkWhetherInternetFast();

    if (isInternetFast) {
      getFirstAnimationVideoImage();
    }

    /* liquid comment */
    // getFirstAnimationVideoImage();

    // let imgWidth = imgElem2.width;
    // let imgHeight = imgElem2.height;

    // sceneInfo[1].objs.imageWHRatio = imgWidth / imgHeight;
  }

  function getFirstAnimationVideoImage() {
    let imgElem;

    if (currentDeviceType === "mobile") {
      for (var i = 1; i <= 264; i += 1) {
        imgElem = new Image();
        imgElem.src = "./assets/pod_image_mobile/" + i + ".jpg";
        sceneInfo[0].objs.videoImages[currentDeviceType].push(imgElem);
      }
    } else {
      for (var i = 1; i <= 264; i += 1) {
        imgElem = new Image();
        imgElem.src =
          "./assets/pod_image_desktop/superFinal_Desktop" + i + ".jpg";
        sceneInfo[0].objs.videoImages[currentDeviceType].push(imgElem);
      }
    }
  }

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    sceneWidth = window.document.documentElement.clientWidth;
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

    if (sceneInfo[0].objs) {
      const objs = sceneInfo[0].objs;

      const firstCanvas = objs.canvas;
      const firstContext = objs.context;
      const secondCanvas = objs.imageCanvas;
      const secondContext = objs.imageContext;

      const thirdCanvas = objs.imageCanvas1;
      const thirdContext = objs.imageContext1;

      if (firstCanvas) {
        firstCanvas.width = currentDevice.width;
        firstCanvas.height = currentDevice.height;

        firstCanvasScaleRatio =
          firstCanvas.parentElement.offsetHeight / firstCanvas.offsetHeight;

        let scaleRatio = currentDevice.scaleRatio;

        if (
          currentDevice.width < sceneWidth &&
          currentDevice.height < sceneHeight
        ) {
          scaleRatio = 1;
        }

        // this should be checked..
        firstCanvas.style.transform = `translate3d(-50%, -50%, 0) scale(${firstCanvasScaleRatio})`;
        // firstCanvas.style.transform = `translate3d(-50%, -50%, 0)`;

        sceneInfo[0].objs.messageC.parentElement.style.width =
          firstCanvas.offsetWidth + "px";
      }

      if (secondCanvas) {
        secondCanvas.width = currentDevice.width;
        secondCanvas.height = currentDevice.height;

        thirdCanvas.width = currentDevice.width;
        thirdCanvas.height = currentDevice.height;

        calcImgWidth = sceneWidth * objs.imageScale;
        calcImgHeight = sceneHeight * objs.imageScale;

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

        const widthRatio = sceneWidth / secondCanvas.width;
        const heightRatio = (sceneHeight - 70) / secondCanvas.height;
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
    currentDeviceType = checkDeviceRatio();
    currentDevice = DEVICE[currentDeviceType];
    // sceneInfo[0].values.svg_scale0[0] = currentDevice.podSVGInitialScale;
    sceneInfo[0].values.svg_scale0[0] = calcPodORatio();

    sceneInfo[0].values.video_scale[2].end =
      (targetScrollHeight - window.innerHeight * 2) / targetScrollHeight;

    whenStickyElemEnd =
      (targetScrollHeight - window.innerHeight) / targetScrollHeight;

    yOffset = window.pageYOffset;
    console.log("this is yOffset from setlayout", yOffset);
  }

  function calcValues(values, currentYOffset) {
    let rv;
    // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
    const scrollHeight = sceneInfo[0].scrollHeight;
    // const currentYOffset = window.pageYOffset;
    const scrollRatio = currentYOffset / scrollHeight;

    if (values[2].videoEnd) {
      rv =
        (scrollRatio / values[2].videoEnd) * (values[1] - values[0]) +
        values[0];
    } else {
      // start ~ end 사이에 애니메이션 실행
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (
        currentYOffset >= partScrollStart &&
        currentYOffset <= partScrollEnd
      ) {
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
  let isVideoPlaying = false;
  let isWistiaVideoAdded = false;

  function playAnimation() {
    switch (currentScene) {
      case 0:
        const targetScene = sceneInfo[currentScene];
        const objs = targetScene.objs;
        const values = targetScene.values;
        const currentYOffset = yOffset;
        const scrollHeight = targetScene.scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

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

        const stickyElem = objs.container.children[0];

        if (scrollRatio < 0.75) {
          objs.videoContainer.style.opacity = calcValues(
            values.video_opacity_in,
            currentYOffset
          );
          stickyElem.style.background = "#0ca4d3";
        } else {
          // objs.videoContainer.style.opacity = calcValues(
          //   values.video_opacity_out,
          //   currentYOffset
          // );

          stickyElem.style.background = "#fff";
        }
        if (scrollRatio > 0.4) {
          objs.videoContainer.style.transform = `scale(${calcValues(
            values.video_scale,
            currentYOffset
          )})`;

          if (whenStickyElemEnd) {
            if (scrollRatio > whenStickyElemEnd) {
              stickyElem.classList.remove("sticky-elem");
              stickyElem.style.marginTop = `${scrollHeight * whenStickyElemEnd -
                objs.videoContainer.clientHeight / 2}px`;

              // this should be improve
              stickyElem.style.position = "unset";
            } else {
              stickyElem.classList.add("sticky-elem");
              stickyElem.style.marginTop = "0";
              // this should be improve
              stickyElem.style.position = "";
            }
          }

          // const whenEnd = values.video_scale[2].end;
          const whenEnd = values.svg_scale2[2].end;

          if (scrollRatio > whenEnd) {
            if (isVideoPlaying) {
              // objs.videoContainer2LocalVideo.pause();
              objs.videoContainer2PlayBtn.style.display = "block";
              isVideoPlaying = false;
            }

            objs.videoContainer.classList.add("zIndex5");
          } else {
            if (!isVideoPlaying) {
              objs.videoContainer2LocalVideo.play();
              objs.videoContainer2PlayBtn.style.display = "none";
              isVideoPlaying = true;
            }

            objs.videoContainer.classList.remove("zIndex5");
          }
        }

        break;
    }
  }

  sceneInfo[0].objs.videoContainer2PlayBtn.addEventListener(
    "click",
    function() {
      sceneInfo[0].objs.videoContainer2LocalVideo.pause();

      /* liquid comment */
      //  wistiaFullVideo.bind("popovershow", function() {
      //   wistiaFullVideo.popover.hide();
      //   history.pushState(null, null, document.URL);
      //   window.addEventListener('popstate', function () {
      //       history.pushState(null, null, document.URL);
      //   });

      //   wistiaFullVideo.bind("popoverhide", function() {
      //     wistiaFullVideo.bind("popovershow", null);
      //   })
      // });

      /* liquid comment */
      // if (isWistiaVideoAdded) {
      //   playWistiaVideo('u95be3ftux');
      // } else {
      //   sceneInfo[0].objs.videoContainer2WistiaVideo.classList.add('wistia_async_u95be3ftux');
      //   isWistiaVideoAdded = true;
      // }

      // console.log('hello!');

      // sceneInfo[0].objs.videoContainer2PlayBtn.style.display = 'none';
    }
  );

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
      if (sceneInfo[0].objs.videoImages[currentDeviceType].length > 0) {
        objs.context.drawImage(
          objs.videoImages[currentDeviceType][roundedCount],
          0,
          0
        );
      } else {
        objs.context.drawImage(objs.staticVideoImages[currentDeviceType], 0, 0);
      }
      currentSequence = roundedCount + "a";
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

  // function checkDevice() {
  //   if (sceneWidth > 700) {
  //     return "desktop";
  //   } else {
  //     return "mobile";
  //   }
  // }

  function android() {
    return navigator.userAgent.match(/android/i);
    // return navigator.userAgent.match(/(iPad|iPhone|iPod)/i);
  }

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;

    if (delayedYOffset > sceneInfo[0].scrollHeight && currentScene == 0) {
      enterNewScene = true;
      currentScene = "non-sticky";
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    } else if (
      delayedYOffset < sceneInfo[0].scrollHeight &&
      currentScene == "non-sticky"
    ) {
      enterNewScene = true;
      if (currentScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
      currentScene = 0;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (enterNewScene) return;

    playAnimation();
  }

  function loop() {
    delayedYOffset =
      delayedYOffset + (window.pageYOffset - delayedYOffset) * acc;

    if (currentScene === 0) {
      // this can be improve
      const currentYOffset = delayedYOffset - prevScrollHeight;
      const objs = sceneInfo[currentScene].objs;
      const values = sceneInfo[currentScene].values;

      if (!enterNewScene) {
        // this should be not work when firstCanvas over
        let sequence = Math.round(calcValues(values.imageSequence, yOffset));
        firstSceneSequence = sequence;
        if (objs.videoImages[currentDeviceType][sequence]) {
          // objs.context.drawImage(objs.videoImages[0], 0, 0);
          // this is for jpg
          // if (currentDeviceType == "desktop") {
          //   objs.context.clearRect(0, 0, objs.canvas.width, objs.canvas.height);
          // }
          if (objs.videoImages[currentDeviceType].length > 0) {
            objs.context.drawImage(
              objs.videoImages[currentDeviceType][sequence],
              0,
              0
            );
          }

          currentSequence = sequence + "b";
        }
      }
    }

    rafId = requestAnimationFrame(loop);

    if (Math.abs(window.pageYOffset - delayedYOffset) < 1) {
      cancelAnimationFrame(rafId);
      rafState = false;
    }
  }

  function checkDeviceRatio() {
    const givenRatio = 0.75;
    let curDeviceType;

    sceneWidth = window.document.documentElement.clientWidth;
    sceneHeight = window.innerHeight;

    if (sceneWidth >= sceneHeight * givenRatio) {
      curDeviceType = "desktop";
    } else {
      curDeviceType = "mobile";
    }

    return curDeviceType;
  }

  function checkWhetherInternetFast() {
    var connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    var type;
    if (connection) {
      type = connection.effectiveType;
    } else {
      return true;
    }

    return !(type == "slow-2g" || type == "2g");

    /* liquid comment */
    // var bothImgSize = 1456;

    // var downloadEndTime = (new Date().getTime());

    // var duration = ( downloadEndTime - downloadStartTime ) / 1000;

    // console.log('hello!!!', downloadStartTime, downloadEndTime, (downloadEndTime - downloadStartTime), duration, bothImgSize / (duration * 1024 * 1024));

    // if (duration < 20) {
    //   isInternetFast = true;
    //   getFirstAnimationVideoImage();
    // }
  }

  window.addEventListener("load", () => {
    document.body.classList.remove("before-load");
    // this can be improve -> init();
    if (android()) {
      sceneInfo[0].heightNum = 100;
      sceneInfo[0].heightNum = 24;
    } else {
      sceneInfo[0].heightNum = 24;
    }
    setLayout();

    let tempYOffset = yOffset;
    let tempScrollCount = 0;

    console.log("hello right after setlayout", yOffset, window.pageYOffset);

    if (tempYOffset > 0 && tempYOffset <= sceneInfo[0].scrollHeight) {
      sceneInfo[0].objs.messageAUp.style.opacity = 1;
      sceneInfo[0].objs.messageADown.style.opacity = 1;
      sceneInfo[0].objs.messageBUp.style.opacity = 1;
      sceneInfo[0].objs.messageBDown.style.opacity = 1;

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
    } else {
      if (sceneInfo[0].objs.videoImages[currentDeviceType].length > 0) {
        sceneInfo[0].objs.context.drawImage(
          sceneInfo[0].objs.videoImages[currentDeviceType][
            currentDevice.imageCount - 1
          ],
          0,
          0
        );
      } else {
        sceneInfo[0].objs.context.drawImage(
          sceneInfo[0].objs.staticVideoImages[currentDeviceType],
          0,
          0
        );
      }

      currentSequence = currentDevice.imageCount - 1 + "c";
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

    window.addEventListener("scroll", function() {
      yOffset = window.pageYOffset;
      scrollLoop();

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

      currentDeviceType = checkDeviceRatio();
      currentDevice = DEVICE[currentDeviceType];
      sceneInfo[0].values.svg_scale0[0] = calcPodORatio();
      setCanvasImages();

      // this is imageBlend
      // this can be improve
      if (currentScene === 0 && currentDeviceType === "desktop") {
        // 추가 코드
        // Scene 3의 요소들은 위치나 크기가 미리 정해지지 않고
        // 현재 창 사이즈나 스크롤 위치에 따라 가변적으로 변하기 때문에
        // 리사이즈에 일일이 대응시키기가 까다롭습니다.
        // Scene 3에 진입 시점에 요소들의 위치와 크기가 결정이 되는 특징을 이용해서
        // 현재 Scene이 3일 경우에는 좀 위로 스크롤이 되도록 해서
        // Scene 3의 시작 지점 이전으로 돌리는 식으로 요소들의 레이아웃이 깨지는 현상을 방지해 줍니다.
        // 시작 지점 이전으로 스크롤을 이동 시키는 동작은
        // 바로 위 518 라인의 자동 스크롤 코드를 그대로 활용했습니다.
        if (window.scrollY == 0) {
          if (sceneInfo[0].objs.videoImages[currentDeviceType].length > 0) {
            sceneInfo[0].objs.context.drawImage(
              sceneInfo[0].objs.videoImages[currentDeviceType][
                firstLoadingSequence
              ],
              0,
              0
            );
          }
        } else {
          let tempYOffset = yOffset;
          let tempScrollCount = 0;
          if (tempYOffset > 0) {
            let siId = setInterval(() => {
              scrollTo(0, tempYOffset);
              tempYOffset -= 50;

              if (tempScrollCount > 20) {
                clearInterval(siId);
              }
              tempScrollCount++;
            }, 20);
          }
        }
      }
    });

    window.addEventListener("orientationchange", () => {
      setTimeout(setLayout, 500);
    });

    /* liquid comment */
    // document.querySelector(".loading").addEventListener("transitionend", e => {
    //   document.body.removeChild(e.currentTarget);
    // });
  });

  (function init() {
    currentDeviceType = checkDeviceRatio();
    currentDevice = DEVICE[currentDeviceType];
    setCanvasImages();
  })();
})();
