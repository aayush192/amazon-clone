export function currency(priceCents){
    return ((priceCents/100).toFixed(2));
}
export function tax(subTotal){
return(subTotal/10);
}
