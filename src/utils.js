export const LIST_VIEW = 'list'
export const CHART_VIEW = 'chart'


export const range = (size, startAt=0) => {
  const arr = []

  for(let i =0; i<size; i++){
    arr[i]  = startAt + i;
  }

  return arr
}

export const parseToYearAndMonth = (str) => {
  const date = str ? new Date(str) : new Date();

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1
  }
}