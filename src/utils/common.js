function getRandomColor() {
  const color = ["#0DB6A3", "#CE8ABE", "#FDA348", "#E90076", "#787DB6", "#47AFE8", "#BBDB70", "#FF4229", "#FCCEC6", "#7DD7E0"]
  const rand = Math.ceil(Math.random()*10);
  return {'background-color': color[rand]}
}

export default {
  getRandomColor
}
