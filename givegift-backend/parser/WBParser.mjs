// Build the market link for a given product
function genProductLink(productID) {
    return `https://www.wildberries.ru/catalog/${productID}/detail.aspx`
}

// Build the Wildberries search URL for a given query and price range
function getSearchLink(query, minBudget, maxBudget) {
    const encodedQuery = encodeURIComponent(query);
    return [
        'https://search.wb.ru/exactmatch/ru/common/v4/search?appType=1',
        `&curr=rub&dest=-1257786`,
        `&priceU=${minBudget}00;${maxBudget}00`,
        `&page=1&query=${encodedQuery}`,
        `&resultset=catalog&sort=popular&spp=24`,
        `&suppressSpellcheck=false`
    ].join('');
}

// Fetch the search results JSON from Wildberries
async function getQueryData(queryLink) {
    const rawResponse = await fetch(queryLink);
    return await rawResponse.json();
}

// Extract the first product ID & name from the response
function getFirstProductIDAndName(response, adult = false) {
    try {
        const products = response?.data?.products;

        if (!Array.isArray(products) || products.length === 0) return null;

        const product = adult ? products[0] : (products.find(p => !p.isAdult) || null)
        return product && [product?.id, product?.name]
    } catch {
        return null;
    }
}

// Determine basket based on shortID range
/* c8 ignore start */
function getBasket(shortID) {
    const ranges = [
        { threshold: 143, basket: '01' },
        { threshold: 287, basket: '02' },
        { threshold: 431, basket: '03' },
        { threshold: 719, basket: '04' },
        { threshold: 1007, basket: '05' },
        { threshold: 1061, basket: '06' },
        { threshold: 1115, basket: '07' },
        { threshold: 1169, basket: '08' },
        { threshold: 1313, basket: '09' },
        { threshold: 1601, basket: '10' },
        { threshold: 1655, basket: '11' },
        { threshold: 1919, basket: '12' },
        { threshold: 2045, basket: '13' },
        { threshold: 2189, basket: '14' },
        { threshold: 2405, basket: '15' },
        { threshold: 2621, basket: '16' },
        { threshold: 2837, basket: '17' },
        { threshold: 3053, basket: '18' }
    ];

    for (const range of ranges) {
        if (shortID <= range.threshold) {
            return range.basket;
        }
    }

    return '19';
}
/* c8 ignore end */

// Build the image URL for a given product ID
function getImageLink(productID) {
    if (typeof productID !== 'number') return null;
    const shortID = Math.floor(productID / 100000);
    const basket = getBasket(shortID);
    const vol = shortID;
    const part = Math.floor(productID / 1000);
    return `https://basket-${basket}.wbbasket.ru/vol${vol}/part${part}/${productID}/images/big/1.webp`;
}

/* interface IProduct {
    market_link: string;
    title: string;
    img_link: string
} */
export async function getProductInfo(query, minBudget, maxBudget, isAdult = false) {
    try {
        const searchLink = getSearchLink(query, minBudget, maxBudget);
        const response = await getQueryData(searchLink);

        const result = getFirstProductIDAndName(response, isAdult);
        if (!result) return null;

        const [productID, productName] = result;

        return {
            market_link: genProductLink(productID),
            title: productName,
            img_link: getImageLink(productID)
        };
    } catch {
        return null;
    }
}


