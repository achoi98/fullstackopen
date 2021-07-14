const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.likes
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (previousValue, currentValue) => {
        if (currentValue.likes > previousValue.likes) return currentValue
        else return previousValue
    }
    const favorite = blogs.reduce(reducer, { 'likes': -1 })
    //console.log('favorite blog:',favorite)
    if (favorite.likes > -1) return {
        'title': favorite.title,
        'author': favorite.author,
        'likes': favorite.likes
    }
    else return null
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}