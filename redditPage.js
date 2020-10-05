
var websiteUrl;

function coinsToUsd(coins) {
    //500 reddit coins equals 2 dollars, so 1 coin equals... 0.4 cents (200/500)
    return (coins * 0.4) / 100
}

if (location.href.includes('old.reddit.com')) { //if youre using old reddit...
    if (location.href[location.href.length - 1] === "/") { /*theres this weird case where (i think with archived/locked posts) the website url includes a
        ''/'' at the end, normally this / doesnt exist, so I do a check here
        */
        websiteUrl = location.href + '.json';
    }
    else {
        websiteUrl = location.href + '/.json';
    }
    /*from here on the main logic happens, it checks if the webpage is either a frontpage or a reddit post. I later realized that I will need to
    rewrite this entirely into a recursion so replies within comments will also be taken into account, that will come in a later update*/
    fetch(websiteUrl).then((data) => data.json()).then((jsonData) => {
        if (jsonData.length == 2) {//if we are inside a reddit post..
            jsonData.forEach(el => {
                const result = el.data.children.map(function (element) {
                    if (element.data.all_awardings != undefined) {
                        return {
                            id: element.data.name,
                            price: element.data.all_awardings.reduce(function (accumulator, currentElement) {
                                return accumulator + currentElement.coin_price * currentElement.count;
                            }, 0)
                        }
                    }
                })
                for (let i = 0; i < result.length; i++) {
                    if (result[i] != undefined) {
                        $(`<p>${coinsToUsd(result[i].price)}$</p>`).prependTo($(`#thing_${result[i].id} .awardings-bar`)[0]);
                    }
                }
            });
        } else { //if we are on the frontpage or any subreddit page..
            const result = jsonData.data.children.map(function (element) {
                return {
                    id: element.data.name,
                    price: element.data.all_awardings.reduce(function (accumulator, currentElement) {
                        return accumulator + currentElement.coin_price * currentElement.count;
                    }, 0)
                }
            })
            for (let i = 0; i < result.length; i++) {
                $(`<p>${coinsToUsd(result[i].price)}$</p>`).prependTo($(`#thing_${result[i].id} .awardings-bar`)[0]);
            }
        }
    })
}

else {
    if (location.href.includes('reddit.com')) {//if youre using new reddit...
    }
}

