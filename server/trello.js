require("isomorphic-fetch")

const Koa = require('koa')
const Router = require('koa-router')

const KEY = process.env.KEY;
const TOKEN = process.env.TOKEN;
const router = new Router()

if (!KEY) throw Error("no KEY env set")
if (!TOKEN) throw Error("no TOKEN env set")

function getUrl(prefix, query) {
    let fullUrl = `https://api.trello.com/1${prefix}?`;
    let strQuery = ""
    if (query) {
        for (let k in query) {
            strQuery = `${k}=${query[k]}&`
        }
        strQuery = strQuery.substring(0, strQuery.length - 1)
    }
    fullUrl = `${fullUrl}${strQuery}&key=${KEY}&token=${TOKEN}`
    return fullUrl
}

async function boards(ctx) {
    const url = getUrl("/members/551b80cd2e9ceb5d9f1e9746/boards", {
        filter: "organization%2Copen%2Cpublic",
        fields: "name,shortLink,shortUrl,dateLastActivity,idOrganization",
    })
    const rst = await fetch(url)
    const body = await rst.json()
    ctx.body = body.filter(v => v.idOrganization === "5329101efbf34c6619789e26")
}


async function cards(ctx) {
    const {
        query: {
            boardId
        }
    } = ctx

    const url = getUrl(`/boards/${boardId}/cards/open`, {
        fields: "name,shortUrl,idList"
    })


    const rsp = await fetch(url)
    const body = await rsp.json()
    const cardListUrl = getUrl(`/boards/${boardId}/lists/open`)

    const cardListRsp = await fetch(cardListUrl)
    const cardList = await cardListRsp.json()
    ctx.body = body.map(v => {
        let listName = ''
        const queryRst = cardList.filter(l => v.idList === l.id)
        if (queryRst.length > 0) {
            listName = queryRst[0].name
        }
        return Object.assign(v, {
            listName: listName
        })
    }).filter(v => {
        if (/日报模板/.test(v.listName)) {
            return false
        }
        if (!/今日工作\[/.test(v.name)) {
            return false
        }
        return !/今日工作\[1\s*.\s*;\s*2.\s*;\s*3.\s*]/.test(v.name)
    })
}

router.get("/boards", boards)
    .get("/cards", cards)

module.exports = router