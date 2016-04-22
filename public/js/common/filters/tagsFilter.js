function TagsFilter(){
  return function(input, tags) {

    let activeTags = tags.filter(t => t.selected);
    if (activeTags.length === 0) return input;

    return input.filter(item => {
      let matches = 0;
      activeTags.forEach(tag => {
        if (item.tags.indexOf(tag.label) > -1) matches++;
      })
      return matches === activeTags.length
    });
  }
}

export default TagsFilter;