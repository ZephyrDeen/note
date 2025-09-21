import { gsap } from "gsap";

class Animation {
  constructor(target) {
    this.target = target;
  }

  in(timeline) {
    timeline = timeline || gsap.timeline();
    timeline.to(this.target, {
      duration: 0, display: "none", opacity: 0,
      x: 0, y: 40
    })

    timeline.to(this.target, {
      duration: 0.5, display: "flex", opacity: 1,
      x: 0, y: 0
    })
  }

  out(timeline) {
    timeline = timeline || gsap.timeline();
    timeline.to(this.target, {
      duration: 0, display: "flex", opacity: 1,
      x: 0, y: 0
    })

    timeline.to(this.target, {
      duration: 0.5, display: "none", opacity: 0,
      x: 0, y: -40
    })
  }
}

function AtoB(a, b, delay = 0) {
  const timeline = gsap.timeline({ delay: delay })
  a.out(timeline)
  b.in(timeline)
}

const animation = {
  login: new Animation('.login'),
  register: new Animation('.register'),
  welcome: new Animation('.welcome'),
}

function LoginToRegister() {
  AtoB(animation.login, animation.register)
}

function RegisterToLogin() {
  AtoB(animation.register, animation.login)
}

function LoginToWelcome() {
  AtoB(animation.login, animation.welcome)
}

function WelcomeToLogin() {
  AtoB(animation.welcome, animation.login)
}

function backgroundColorFlash(color) {
  const timeline = gsap.timeline()
  timeline.to("body", {
    duration: 0,
    background: "#fff"
  })
  timeline.to("body", {
    duration: 1,
    background: color,
    ease: "power2.inOut"
  })
  timeline.to("body", {
    duration: 1,
    background: "#fff",
    ease: "power2.inOut"
  })
}

function showError() {
  backgroundColorFlash("#ff7875");
}

function showCorrect() {
  backgroundColorFlash("#52c41a");
}

function showUnkonw() {
  backgroundColorFlash("#ffa940");
}

export {
  LoginToRegister,
  RegisterToLogin,
  LoginToWelcome,
  WelcomeToLogin,
  showCorrect,
  showError,
  showUnkonw
}; 