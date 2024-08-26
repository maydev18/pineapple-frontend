export function getFullSize(selectedSize){
    let size;
    if (selectedSize === 'S') size = 'small';
    else if (selectedSize === 'M') size = 'medium';
    else if (selectedSize === 'L') size = 'large';
    else if (selectedSize === 'XL') size = 'extraLarge';
    else if (selectedSize === 'XXL') size = 'doubleExtraLarge';
    return size;
}
export function getsize(size){
    if(size === 'small') return 'S';
    if(size === 'medium') return 'M';
    if(size === 'large') return 'L';
    if(size === 'extraLarge') return 'XL';
    if(size === 'doubleExtraLarge') return 'XXL';
}
