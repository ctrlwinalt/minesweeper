const log = console.log.bind(console)

const e = function(selector) {
    return document.querySelector(selector)
}

const es = function(selector) {
    return document.querySelectorAll(selector)
}

const random01 = function() {
    let num = Math.random()
    if (num > 0.8) {
        return 1
    } else {
        return 0
    }
}

const randomLine01 = function(n) {
    let l = []
    for (let i = 0; i < n; i++) {
        let num = random01()
        l.push(num)
    }
    return l
}

const randomSquare01 = function(n) {
    let l = []
    for (let i = 0; i < n; i++) {
        let num = randomLine01(n)
        l.push(num)
    }
    return l
}

const randomLine09 = function(n) {
    let l = []
    let line = randomLine01(n)
    for (let i = 0; i < line.length; i++) {
        if (line[i] === 1) {
            l.push(9)
        } else {
            l.push(line[i])
        }
    }
    return l
}

const randomSquare09 = function(n) {
    let l = []
    for (let i = 0; i < n; i++) {
        let num = randomLine09(n)
        l.push(num)
    }
    return l
}

const clonedSquare = function(array) {
    let r = []
    for (let i = 0; i < array.length; i++) {
        let line = array[i].slice(0)
        r.push(line)
    }
    return r
}

const addOne = function(n) {
    if (n !== 9) {
        return n += 1
    }
    return n
}

const markTopLine = function(square, a, b) {
    for (let i = 0; i < 3; i++) {
        let x = a - 1
        let y = b - 1 + i
        let bool = x > -1 && y > -1 && y < square[a].length
        if (bool) {
            let num = square[x][y]
            if (num !== 9) {
                square[x][y] = addOne(num)
            }
        }
    }
}

const markMidLine = function(square, a, b) {
    for (let i = 0; i < 3; i += 2) {
        let x = a
        let y = b - 1 + i
        let bool = y > -1 && y < square[a].length
        if (bool) {
            let num = square[x][y]
            if (num !== 9) {
                square[x][y] = addOne(num)
            }
        }
    }
}

const markBottomLine = function(square, a, b) {
    for (let i = 0; i < 3; i++) {
        let x = a + 1
        let y = b - 1 + i
        let bool = x < square.length && y > -1 && y < square[a].length
        if (bool) {
            let num = square[x][y]
            if (num !== 9) {
                square[x][y] = addOne(num)
            }
        }
    }
}

const markAround = function(square, i, j) {
    let n = square[i][j]
    if (n === 9) {
        markTopLine(square, i, j)
        markMidLine(square, i, j)
        markBottomLine(square, i, j)
    }
}

const markedSquare = function(array) {
    let square = clonedSquare(array)
    for (let i = 0; i < square.length; i++) {
        let line = square[i]
        for (let j = 0; j < line.length; j++) {
            markAround(square, i, j)
        }
    }
    return square
}

const templateNum = function(n) {
    let t = `
    <div class="gua-num">${n}</div>
    `
    return t

}

const templateLine = function(n) {
    let t = `
    <div class="gua-line">
        ${n}
    </div>
    `
    return t
}

const insertHtml = function(line) {
    let div = e('#id-gua-square')
    div.insertAdjacentHTML("beforeend", line)
}

const drawSquare = function(arr) {
    let array = arr
    for (let i = 0; i < array.length; i++) {
        let line = array[i]
        let r = ''
        for (let j = 0; j < line.length; j++) {
            let numHtml = templateNum(line[j])
            r += numHtml
        }
        let gualine = templateLine(r)
        insertHtml(gualine)
    }
}

const nChangeToXY = function(i) {
    let r = []
    let eachLineNum = es('.gua-num').length / es('.gua-line').length
    let x = Math.floor(i / eachLineNum)
    let y = i % eachLineNum
    r.push(x)
    r.push(y)
    return r

}

const xyChangeToN = function(x, y) {
    let eachLineNum = es('.gua-num').length / es('.gua-line').length
    let n = eachLineNum * x + y
    return n

}

const htmlFormXY = function(nums, x, y) {
    let eachLineNum = es('.gua-num').length / es('.gua-line').length
    let n = eachLineNum * x + y
    return nums[n]
}

const numColor = function(element) {
    let o = {
        '1': 'num1',
        '2': 'num2',
        '3': 'num3',
        '4': 'num4',
        '5': 'num4',
        '6': 'num4',
        '7': 'num4',
        '8': 'num4',
    }
    let key = element.innerHTML
    element.classList.add(o[key])

}

const showAll09 = function(nums) {
    for (let i = 0; i < nums.length; i++) {
        let num = nums[i]
        if (num.innerHTML === '9') {
            num.classList.add('show09')
        }
    }
}

const showOneToEight = function(nums, x, y) {
    let element = htmlFormXY(nums, x, y)
    if (!element.classList.contains('show')) {
        element.classList.add('show')
    }

}

const show00 = function(nums, x, y) {
    let element = htmlFormXY(nums, x, y)
    if (!element.classList.contains('show')) {
        element.classList.add('show')
        element.classList.add('zero')
    }
}

const topLineNum = function(a, b) {
    let r = []
    let eachLineNum = es('.gua-num').length / es('.gua-line').length
    for (let i = 0; i < 3; i++) {
        let x = a - 1
        let y = b - 1 + i
        if (x >= 0 && y >= 0 && y < eachLineNum) {
            let xy = [x, y]
            r.push(xy)
        }
    }
    return r
}
const midLineNum = function(a, b) {
    let r = []
    let eachLineNum = es('.gua-num').length / es('.gua-line').length
    for (let i = 0; i < 3; i += 2) {
        let x = a
        let y = b - 1 + i
        if (y >= 0 && y < eachLineNum) {
            let xy = [x, y]
            r.push(xy)
        }
    }
    return r
}
const bottomLineNum = function(a, b) {
    let r = []
    let eachLineNum = es('.gua-num').length / es('.gua-line').length
    for (let i = 0; i < 3; i++) {
        let x = a + 1
        let y = b - 1 + i
        if (x < es('.gua-line').length && y >= 0 && y < eachLineNum) {
            let xy = [x, y]
            r.push(xy)
        }
    }
    return r
}

const aroundNum = function(a, b) {
    let r = []
    let r1 = topLineNum(a, b)
    let r2 = midLineNum(a, b)
    let r3 = bottomLineNum(a, b)

    for (let i = 0; i < r1.length; i++) {
        r.push(r1[i])
    }

    for (let i = 0; i < r2.length; i++) {
        r.push(r2[i])
    }

    for (let i = 0; i < r3.length; i++) {
        r.push(r3[i])
    }

    return r
}

const showAround = function(nums, x, y) {
    let arounds = aroundNum(x, y)
    for (let i = 0; i < arounds.length; i++) {
        let n = htmlFormXY(nums, arounds[i][0], arounds[i][1])
        if (!n.classList.contains('show') && n.innerHTML !== '9') {
            if (n.innerHTML === '0') {
                show00(nums, arounds[i][0], arounds[i][1])
                if (n.classList.contains('zero') && n.innerHTML !== '9') {
                    showAround(nums, arounds[i][0], arounds[i][1])
                }
            } else if (n.innerHTML !== '0' && n.innerHTML !== '9') {
                showOneToEight(nums, arounds[i][0], arounds[i][1])
                numColor(n)
            }
        }
    }

}

const bindEventNum = function() {
    let nums = es('.gua-num')

    for (let i = 0; i < nums.length; i++) {
        let num = nums[i]
        num.addEventListener('click', function() {
            let x = nChangeToXY(i)[0]
            let y = nChangeToXY(i)[1]
            let index = xyChangeToN(x, y)
            if (nums[index].innerHTML === '0') {
                show00(nums, x, y)
                showAround(nums, x, y)
            } else if (nums[index].innerHTML === '9') {
                showAll09(nums)
            } else {
                showOneToEight(nums, x, y)
                numColor(nums[index])
            }
        })
    }
}

const __main = function() {
    let randomSqu = randomSquare09(10)
    let markedSqu = markedSquare(randomSqu)
    drawSquare(markedSqu)
    bindEventNum()
}

__main()