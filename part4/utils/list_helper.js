const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, currentBlog) => accumulator + currentBlog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((accumulator, currentBlog) => {
    return accumulator.likes > currentBlog.likes ? accumulator : currentBlog;
  } )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
