function OnlyMyFilter(){
  return function(input, active, tasks) {

    if (!active) return input;

    return input.filter(el => {
      return tasks.includes(el._id)
    })

  }
}

export default OnlyMyFilter;
