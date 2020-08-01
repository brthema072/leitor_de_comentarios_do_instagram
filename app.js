const puppeteer = require('puppeteer')

start()
async function start(){

    async function loadMore(page, selector){
        const moreButton = await page.$(selector)
        if(moreButton){
            console.log('More')
            await moreButton.click()
            await page.waitFor(selector,{timeout: 3000}).catch(()=>console.log("timeout"))
            await loadMore(page, selector)
        }
    }
    async function getComments(page, selector){
        const comments = await page.$$eval(selector, myComments => myComments.map(c => c.innerText))

        return comments;
    }
    const browser = await puppeteer.launch()

    const page = await browser.newPage()

    await page.goto('URL DA POSTAGEM')

    await loadMore(page, '.dCJp8')
    const comments = await getComments(page, '.C4VMK h3')

    const counted = count(comments)
    const sorted = sort(counted)

    sorted.forEach(comment=>{console.log(comment)})

    await browser.close();
}

function count(arrobas){
    const count ={  }

    arrobas.forEach(arroba => {
        count[arroba] = (count[arroba] || 0)+1;
    });

    return count;
}

function sort(counted){
    const entries = []

    for(prop in counted){
        entries.push([prop, counted[prop]])
    }

    const sorted = entries.sort((a, b)=> b[1] - a[1])
    return sorted;
}
