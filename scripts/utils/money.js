export function currency(priceCents){
    priceCents=Math.round(priceCents);
    return ((priceCents/100).toFixed(2));
}
export function tax(subTotal){
return(subTotal/10);
}
