const effects = {
  vanilla: (seriously, src, target) => {
    target.source = src;
    seriously.go();
  },
  ascii: (seriously, src, target) => {
    const ascii = seriously.effect("ascii");
    connectEffect(seriously, src, target, ascii);
  },
  daltonize: (seriously, src, target) => {
    const daltonize = seriously.effect("daltonize");
    daltonize.type = "0.8";
    connectEffect(seriously, src, target, daltonize);
  },
  hex: (seriously, src, target) => {
    const hex = seriously.effect("hex");
    hex.size = 0.03;
    connectEffect(seriously, src, target, hex);
  }
};
const effectNames = Object.keys(effects);
let currentIndex = 0;

exports.choose = (seriously, src, target, effectName = "vanilla") => {
  effects[effectName](seriously, src, target);
  setIndexToEffectIndex(effectName);
};

exports.cycle = (seriously, src, target) => {
  setNextIndex();
  effects[effectNames[currentIndex]](seriously, src, target);
};

function setNextIndex() {
  ++currentIndex;
  if (currentIndex > effectNames.length) currentIndex = 0;
  return currentIndex;
}

function setIndexToEffectIndex(effectName) {
  currentIndex = effectNames.indexOf(effectName);
  return currentIndex;
}

function connectEffect(seriously, src, target, effect) {
  effect.source = src;
  target.source = effect;
  seriously.go();
}
