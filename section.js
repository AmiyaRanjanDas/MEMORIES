/* ========================================================================= */
/* ================================section-1================================ */
/* ========================================================================= */
var randomScale, sec3_var1, sec3_var2;

window.onload = function () {
  if (window.innerWidth < 600) {
    randomScale = Math.random() * 0.3 + 0.3;
    sec3_var1 = 600;
    sec3_var2 = 1;
  } else {
    randomScale = Math.random() * 0.6 + 0.5;
    sec3_var1 = 700;
    sec3_var2 = 2;
  }
  var panel = document.querySelector(".main_body");
  panel.style.overflow = "hidden"; // Set initial height to 100vh

  // After 4 seconds, set height back to auto (or any other desired height)
  setTimeout(function () {
    panel.style.overflow = "visible"; // Set height back to auto after 4 seconds
  }, 0); //7000 real value
  setTimeout(function () {
    document.querySelector(".blocks").style.display = "none";
  }, 0); //8000 real value
};

const timeline1 = gsap.timeline({ delay: 1.75 });

gsap.set(".container1 h1", { y: 100 });
gsap.set(".container1 .counter p", { y: 35 });

timeline1.to(".container1 h1", {
  y: 0,
  duration: 1,
  ease: "power3.out",
  stagger: 0.1,
});

timeline1.to(
  ".container1 .counter p",
  {
    y: 0,
    duration: 0.5,
    ease: "power3.out",
  },
  "-=0.5"
);
timeline1.to(
  ".container1 .counter p",
  {
    y: -35,
    duration: 0.5,
    ease: "power3.out",
    delay: 0.7,
  },
  "-=0.5"
);
timeline1.to(".container1 .counter p", {
  y: -70,
  duration: 0.5,
  ease: "power3.out",
  delay: 0.3,
});
timeline1.to(".container1 .counter p", {
  y: -105,
  duration: 0.5,
  ease: "power3.out",
  delay: 0.3,
});

timeline1.from(
  ".container1 .tagline",
  {
    y: 40,
    opacity: 0,
  },
  "-=4"
);

timeline1.to(".container1 h1", {
  fontSize: "15vw",
  duration: 1,
  ease: "power3.out",
});

timeline1.to(
  ".container1 .header-item",
  {
    clipPath: "none",
    duration: 0.1,
  },
  "<"
);

timeline1.to(
  ".container1 .block",
  {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    duration: 0.5,
    stagger: {
      amount: 0.5,
      from: "random",
      ease: "power3.out",
    },
  },
  "<"
);

/* ========================================================================= */
/* ================================section-2================================ */
/* ========================================================================= */

const itemsArray = [];

document.querySelector(".pop_img").addEventListener("click", function (event) {
  let container = document.createElement("div");
  let elementWidth = sec3_var1;

  const imgNumber = Math.floor(Math.random() * 1) + 1;
  container.innerHTML = `<div class="img_container">
                    <img src="./assets/img-${imgNumber}.jpg" alt="" />
                    </div>`;

  const appendedElement = container.firstChild;
  document.querySelector(".items-container").appendChild(appendedElement);
  appendedElement.style.left = `${event.clientX - elementWidth / 2}px`;
  appendedElement.style.top = `${event.clientY}px`;
  const randomRotation = Math.random() * 10 - 5;

  gsap.set(appendedElement, {
    scale: sec3_var2,
    rotation: randomRotation,
    transformOrigin: "center",
  });

  const timeline2 = gsap.timeline();

  timeline2.to(appendedElement, {
    scale: randomScale,
    duration: 0.5,
    delay: 0.1,
  });
  timeline2
    .to(
      appendedElement,
      {
        y: () => `-=500`,
        opacity: 1,
        duration: 4,
        ease: "none",
      },
      "<"
    )
    .to(
      appendedElement,
      {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          appendedElement.parentNode.removeChild(appendedElement);
          const index = itemsArray.indexOf(appendedElement);
          if (index > -1) {
            itemsArray.splice(index, 1);
          }
        },
      },
      "-=0.5"
    );
});

/* ========================================================================= */
/* ================================section-3================================ */
/* ========================================================================= */

//all cursor effect
document.addEventListener("mousemove", function (e) {
  updateCursorPosition(e.clientX, e.clientY);
});

document.addEventListener("scroll", function () {
  updateCursorPosition(lastMouseX, lastMouseY);
});

var lastMouseX = 0;
var lastMouseY = 0;

function updateCursorPosition(mouseX, mouseY) {
  lastMouseX = mouseX;
  lastMouseY = mouseY;

  gsap.to(".maskington", {
    duration: 0,
    left: mouseX + window.pageXOffset,
    top: mouseY + window.pageYOffset - (200 * window.innerHeight) / 100 - 5,
    ease: "power2.out",
  });

  gsap.to(".maskington .module", {
    duration: 0,
    x: -(mouseX + window.pageXOffset),
    y: -(mouseY + window.pageYOffset - (200 * window.innerHeight) / 100 - 5),
    ease: "power2.out",
  });
}

/* ========================================================================= */
/* ================================section-4================================ */
/* ========================================================================= */
let box = document.querySelector(".box");
ScrollTrigger.create({
  trigger: ".panelwrap",
  start: "top top",
  end: "bottom bottom",
  scrub: 0.15,
  snap: 1 / 6,
  onUpdate: (self) => {
    box.style.setProperty("--progress", self.progress * 21.5);
    box.style.setProperty("--velocity", Math.abs(self.getVelocity() / 4000));
  },
  onScrubComplete: () => {
    box.style.setProperty("--velocity", 0);
  },
  onEnter: () => {
    box.style.setProperty("--velocity", 0);
  },
  onEnterBack: () => {
    box.style.setProperty("--velocity", 0);
  },
  onLeaveBack: () => {
    box.style.setProperty("--velocity", 0);
  },
});

/* ========================================================================= */
/* ================================section-5================================ */
/* ========================================================================= */
gsap.to("#col1,#col3", {
  y: () => innerWidth * 2.2,
  // ease: "power2.inOut",
  scrollTrigger: {
    trigger: ".box",
    start: "bottom bottom",
    end: `+=300%`,
    scrub: 1,
  },
});
gsap.to("#col2,#col4", {
  y: () => innerWidth * -1.5,
  // ease: "power2.inOut",
  scrollTrigger: {
    trigger: ".box",
    start: "bottom bottom",
    end: `+=300%`,
    scrub: 1,
  },
});

/* ========================================================================= */
/* ================================section-6================================ */
/* ========================================================================= */
gsap.registerPlugin(ScrollTrigger);
document.addEventListener("DOMContentLoaded", function () {
  const cards = [
    { id: "#sec6card1", endTranslateX: -2000, rotate: 45 },
    { id: "#sec6card2", endTranslateX: -1000, rotate: -30 },
    { id: "#sec6card3", endTranslateX: -2000, rotate: 45 },
    { id: "#sec6card4", endTranslateX: -1500, rotate: -30 },
  ];
  ScrollTrigger.create({
    trigger: ".horizontal_scroll .wrapperz",
    start: "top top",
    end: "+=1700vh",
    scrub: 1,
    pin: true,
    onUpdate: (self) => {
      gsap.to(".horizontal_scroll .wrapperz", {
        x: `${-350 * self.progress}vw`,
        duration: 0.5,
        ease: "power3.out",
      });
    },
  });

  cards.forEach((card) => {
    ScrollTrigger.create({
      trigger: ".horizontal_scroll .wrapperz",
      start: "top top",
      end: "+=1700vh",
      scrub: 1,
      onUpdate: (self) => {
        gsap.to(card.id, {
          x: `${card.endTranslateX * self.progress}px`,
          rotate: `${card.rotate * self.progress * 2}`,
          duration: 0.5,
          ease: "power3.out",
        });
      },
    });
  });
});

/* ========================================================================= */
/* ================================section-7================================ */
/* ========================================================================= */



/* ========================================================================= */
/* ================================Footer=================================== */
/* ========================================================================= */
const textElements = gsap.utils.toArray('.footer_container .text');

textElements.forEach(text => {
  gsap.to(text, {
    backgroundSize: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: text,
      start: 'center 80%',
      end: 'center 20%',
      scrub: true,
    },
  });
});