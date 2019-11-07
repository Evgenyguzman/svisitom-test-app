import namor from 'namor'

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => {
  const statusChance = Math.random()
  var dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }
  function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  return {
    name: namor.generate({ words: 1, numbers: 0 }),
    id: Math.floor(Math.random() * 1000000),
    // date: Date.now() - (Math.random() * 10000),
    date: randomDate(new Date(2016, 0, 1), new Date()).toLocaleString("ru", dateOptions),
    status:
      statusChance > 0.25
        ? 'В работе'
        : statusChance > 0.125
          ? 'Требует обслуживания'
          : 'Авария',
  }
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
