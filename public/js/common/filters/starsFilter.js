function StarsFilter(){
  return function(input, val, includeLess) {
    if (typeof val === 'undefined') return input;

    return input.filter(el => {
      return includeLess ? el.level <= parseInt(val) : el.level === parseInt(val)
    })
    
  }
}

export default StarsFilter;