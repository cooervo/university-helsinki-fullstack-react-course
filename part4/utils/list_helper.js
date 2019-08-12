const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce(b => b.likes);
}

module.exports = {
  dummy,
  totalLikes
}
